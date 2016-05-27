/**
 * Created by liubin on 15/10/23.
 */

Ext.define('App.view.controllers.admin.RoleController', {
    extend: 'App.view.controllers.BaseController',
    alias: 'controller.adminrole',
    requires: [
        'App.model.admin.Operation',
        'App.model.admin.Role'
    ],
    roleId: 0,
    operationTreePanel: null,
    addRoleHandler: function (sm, index, column) {
        /**
         * grid的添加按钮会传列信息进来
         */
        var record;

        if (column) {
            var selectedRecord = this.getView().getStore().getAt(index);
            record = Ext.create('App.model.admin.Role', {
                text: '',
                description: '',
                leaf: true,
                expanded: true,
                pid: selectedRecord.get('id')
            });
        } else {
            record = Ext.create('App.model.admin.Role', {
                text: '',
                description: '',
                leaf: true,
                expanded: true,
                pid: 0
            });
        }

        this.openWin(record);
    },
    openWin: function (record) {
        var that = this;
        var win = Ext.create('Ext.window.Window', {
            title: '角色管理',
            width: 300,
            height: 200,
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
                    fieldLabel: '角色名称',
                    allowBlank: false,
                    bind: {
                        value: '{record.roleName}'
                    }
                }, {
                    fieldLabel: '描述',
                    bind: {
                        value: '{record.description}'
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
    editRole: function (sm, index, column) {
        this.openWin(this.getView().getStore().getAt(index));
    },
    roleAddOperation: function (sm, index, column) {
        var that = this;
        var record = sm.getStore().getAt(index);
        this.roleId = record.get('id');
        var roleOperation = Ext.create('Ext.data.TreeStore', {
            model: 'App.model.admin.Operation',
            proxy: {
                type: 'ajax',
                url: '/roles/' + this.roleId + '/operations',
                reade: 'json'
            },
            autoLoad: true,
            listeners: {
                scope: this,
                load: function () {
                    this.unCheckChildrens(this.operationTreePanel.getRootNode());
                    this.setChecked(this.operationTreePanel.getRootNode(), roleOperation, true);
                    that.hideMask();
                }
            }
        });

        var win = Ext.create('Ext.window.Window', {
            modal: true,
            width: 400,
            title: '角色 ' + record.get('roleName') + ' 授权权限',
            height: 600,
            closable: false,
            buttons: [{
                text: '确定',
                handler: function () {
                    that.showMask('正在保存...', win);
                    var records = that.operationTreePanel.getChecked();
                    var selectedOperationIds = [];
                    var id = 0;
                    Ext.each(records, function (record) {
                        id = record.get('id');
                        if (id !== 'root' && id !== 0) {
                            selectedOperationIds.push(record.get('id'));
                        }
                    });
                    if (selectedOperationIds.length) {
                        Ext.Ajax.request({
                            url: '/roles/' + that.roleId + '/operations',
                            method: 'PUT',
                            params: Ext.JSON.encode(selectedOperationIds),
                            success: function () {
                                win.close();
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
                    win.close();
                }
            }
            ],
            layout: 'fit',
            items: [
                this.createOprationTreePanel()
            ]
        });
        win.show();
        that.showMask('正在加载权限数据...', win);
    },
    createOprationTreePanel: function () {

        this.operationTreePanel = Ext.create('Ext.tree.Panel', {
            rootVisible: false,
            //store: store,
            store: this.getViewModel().getStore('operations'),
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
                        this.checkParents(node);
                        this.checkChildrens(node);
                    } else {
                        this.unCheckChildrens(node);
                    }
                }
            }
        });

        return this.operationTreePanel;
    }
});