/**
 * Created by liubin on 15/10/23.
 */

Ext.define('App.view.controllers.admin.UserController', {
    extend: 'App.view.controllers.BaseController',
    alias: 'controller.adminuser',
    requires: [
        'App.model.admin.User',
        'App.model.admin.Role'
    ],
    win: null,
    roleTreePanel: null,
    addUserHandler: function (sm, index, column) {
        var record = Ext.create('App.model.admin.User', {
            username: '',
            password: '',
            email: '',
            isAdmin: 3
        });
        this.openWin(record);
    },
    editUser: function (sm, index, column) {
        this.openWin(this.getView().getStore().getAt(index));
    },
    openWin: function (record) {
        var that = this;
        var win = Ext.create('Ext.window.Window', {
            title: '用户管理',
            width: 300,
            height: 280,
            modal: true,
            closable: false,
            viewModel: {
                data: {
                    record: record
                }
            },
            items: [{
                xtype: 'form',
                itemId: 'form',
                padding: 5,
                defaults: {
                    labelWidth: 75,
                    xtype: 'textfield',
                    anchor: '98%'
                },
                items: [{
                    fieldLabel: '用户名',
                    allowBlank: false,
                    bind: {
                        value: '{record.username}'
                    }
                }, {
                    fieldLabel: '密码',
                    inputType: 'password',
                    bind: {
                        value: '{record.password}'
                    }
                }, {
                    fieldLabel: '身份',
                    xtype: 'combo',
                    bind: {
                        value: '{record.isAdmin}'
                    },
                    store: Ext.create('Ext.data.Store', {
                        data: [
                            {
                                text: '管理员',
                                val: 2
                            }, {
                                text: '普通用户',
                                val: 3
                            }
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'val'
                }, {
                    fieldLabel: '邮箱',
                    allowBlank: false,
                    vtype: 'email',
                    bind: {
                        value: '{record.email}'
                    }
                }]
            }],
            buttons: [{
                text: '确定',
                handler: function () {
                    if (win.getComponent('form').isValid()) {
                        that.showMask('正在保存...', win);
                        record.save({
                            success: function () {
                                that.hideMask();
                                win.close();
                                that.getView().getStore().reload();
                            },
                            failure: function () {
                                that.hideMask();
                                win.close();
                            }
                        });
                    }
                }
            }, {
                text: '取消',
                handler: function () {
                    record.reject();
                    win.close();
                }
            }]
        });
        win.show();
    },
    addRole: function (sm, index, column) {
        var that = this;
        var record = sm.getStore().getAt(index)
        this.userId = record.get('id');
        var userRole = Ext.create('Ext.data.TreeStore', {
            model: 'App.model.admin.Role',
            proxy: {
                type: 'ajax',
                url: '/users/' + this.userId + '/roles',
                reader: 'json'
            },
            autoLoad: true,
            listeners: {
                scope: this,
                load: function () {
                    this.unCheckChildrens(this.roleTreePanel.getRootNode());
                    this.setChecked(that.roleTreePanel.getRootNode(), userRole, false);
                    that.hideMask();
                }
            }
        });

        if (!this.win) {
            this.win = Ext.create('Ext.window.Window', {
                modal: true,
                width: 450,
                height: 600,
                closable: false,
                buttons: [{
                    text: '确定',
                    handler: function () {
                        var records = that.roleTreePanel.getChecked();
                        that.showMask('正在保存...', that.win);
                        var selectedOperationIds = null;
                        var id = 0;
                        Ext.each(records, function (record) {
                            id = record.get('id');
                            if (id !== 'root' && id !== 0) {
                                if (!selectedOperationIds) {
                                    selectedOperationIds = {};
                                }
                                selectedOperationIds[record.get('id')] = !!record.get('isRoleAdmin');
                            }
                        });
                        if (selectedOperationIds) {
                            Ext.Ajax.request({
                                url: '/users/' + that.userId + '/roles',
                                method: 'PUT',
                                jsonData: selectedOperationIds,
                                success: function () {
                                    that.win.hide();
                                    that.hideMask();
                                    Ext.admin.msg('保存成功');
                                }, failure: function () {
                                    that.hideMask();
                                    /*Ext.admin.msg('哦哦，保存失败了，请联系BB！');*/
                                }
                            });
                        }
                    }
                }, {
                    text: '取消',
                    handler: function () {
                        that.win.hide();
                    }
                }
                ],
                layout: 'fit',
                items: [this.createRoleTreePanel()]
            });
        }
        this.win.setTitle('用户 ' + record.get('username') + ' 授权角色');
        this.win.show();
        that.showMask('正在加载角色数据...', this.win);
    },
    createRoleTreePanel: function () {

        var that = this;

        this.roleTreePanel = Ext.create('Ext.tree.Panel', {
            rootVisible: false,
            store: this.getViewModel().getStore('roles'),
            displayField: 'roleName',
            valueField: 'id',
            multiSelect: true,
            columns: [{
                xtype: 'treecolumn',
                text: '角色',
                flex: 1,
                sortable: false,
                dataIndex: 'roleName'
            }, {

                xtype: 'checkcolumn',
                header: '管理员',
                dataIndex: 'isRoleAdmin',
                width: 100,
                listeners: {
                    checkchange: function (tree, row, checked) {
                        if (checked) {
                            var record = that.roleTreePanel.getStore().getAt(row);
                            record.set('checked', checked);
                            that.roleTreePanel.fireEvent('checkchange', record, checked, {isAdminChecked: true});
                        }
                    }
                }

            }],
            listeners: {
                scope: this,
                render: function (treepanel) {
                    this.unCheckChildrens(treepanel.getStore().getData());
                },
                checkchange: function (node, checked, eOpts) {
                    /**
                     * 子节点选中，所有父节点选中
                     * 父节点选中，所有子节点选中
                     *
                     * 子节点取消，没事
                     * 父节点取消，所有子节点取消
                     */
                    if (checked) {
                        //this.checkParents(node);
                        this.checkChildrens(node, eOpts);
                    } else {
                        node.set('isRoleAdmin', false);
                        this.unCheckChildrens(node, eOpts);
                    }
                }
            }
        });

        return this.roleTreePanel;
    }
});