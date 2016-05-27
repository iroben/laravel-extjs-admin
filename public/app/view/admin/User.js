/**
 * Created by liubin on 15/10/22.
 */
Ext.define('App.view.admin.User', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.controllers.admin.UserController'
    ],
    controller: 'adminuser',
    xtype: 'adminuser',
    rowLines: true,
    autoHeight: true,
    useArrows: true,
    columnLines: true,
    viewConfig: {
        emptyText: '还没有添加用户数据...'
        /*deferEmptyText: false*/
        //stripeRows: true
    },
    selModel: {
        type: 'checkboxmodel',
        listeners: {
            selectionchange: 'onSelectionChange'
        }
    },
    viewModel: {
        stores: {
            roles: {
                type: 'tree',
                model: 'App.model.admin.Role',
                root: {
                    text: '',
                    id: 0
                },
                autoLoad: true
            },
            users: {
                model: 'App.model.admin.User',
                pageSize: 20,
                autoLoad: true
            }
        }
    },
    bind: {
        store: '{users}'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{users}'
        },
        displayInfo: true
    }],
    initComponent: function () {
        this.columns = [{
            text: '用户名',
            sortable: false,
            dataIndex: 'username',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            text: '密码',
            sortable: false,
            dataIndex: 'password',
            flex: 1,
            renderer: function (val) {
                return '********';
            },
            editor: {
                xtype: 'textfield',
                inputType: 'password'
            }
        }, {
            text: '管理员',
            sortable: false,
            dataIndex: 'isAdmin',
            renderer: function (val) {
                return val == 2 ? '是' : '否';
            },
            editor: {
                xtype: 'combo',
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
            }
        }, {
            text: '邮箱',
            sortable: false,
            dataIndex: 'email',
            flex: 1,
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                vtype: 'email'
            }
        }, {
            text: '创建时间',
            dataIndex: 'createDate'
        }, {
            xtype: 'actioncolumn',
            sortable: false,
            width: 75,
            menuDisabled: true,
            items: [{
                iconCls: 'app-users margin2',
                tooltip: '授权角色',
                handler: 'addRole'
            }, {
                iconCls: 'app-edit margin2',
                tooltip: '编辑',
                handler: 'editUser'
            }, {
                iconCls: 'app-remove margin2',
                toolTip: '删除',
                handler: 'removeHandler'
            }
            ]
        }
        ];
        this.tbar = [{
            text: '添加用户',
            iconCls: 'app-add',
            handler: 'addUserHandler'
        }, '-', {
            text: '删除选中',
            iconCls: 'app-remove',
            disabled: true,
            reference: 'removeSelected',
            handler: 'removeSelectedHandler'
        }
        ];
        this.callParent();
    }
})
;