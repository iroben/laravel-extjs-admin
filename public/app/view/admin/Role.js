/**
 * Created by liubin on 15/10/22.
 */
Ext.define('App.view.admin.Role', {
    extend: 'Ext.tree.Panel',
    requires: [
        'App.view.controllers.admin.RoleController'
    ],
    controller: 'adminrole',
    xtype: 'adminrole',
    rootVisible: false,
    rowLines: true,
    autoHeight: true,
    //useArrows: true,
    columnLines: true,
    viewConfig: {
        stripeRows: true,
        plugins: {
            ptype: 'treeviewdragdrop',
            enableDrag: true,
            enableDrop: true,
            appendOnly: true
        },
        listeners: {
            nodedragover: 'nodedragover',
            drop: 'dragdrop'
        }
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
            operations: {
                type: 'tree',
                model: 'App.model.admin.Operation',
                root: {
                    text: '',
                    id: 0
                },
                autoLoad: true
            }
        }
    },
    bind: {
        store: '{roles}'
    },
    initComponent: function () {
        this.columns = [{
            xtype: 'treecolumn',
            text: '功能',
            flex: 1,
            sortable: false,
            dataIndex: 'roleName',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            text: '描述',
            flex: 1,
            sortable: false,
            dataIndex: 'description',
            editor: {
                xtype: 'textfield',
                allowBlank: false
            }
        }, {
            xtype: 'actioncolumn',
            sortable: false,
            width: 100,
            menuDisabled: true,
            items: [{
                iconCls: 'app-setting margin2',
                tooltip: '授权',
                handler: 'roleAddOperation'
            }, {
                iconCls: 'app-edit margin2',
                tooltip: '编辑',
                handler: 'editRole'
            }, {
                iconCls: 'app-add margin2',
                tooltip: '添加子角色',
                handler: 'addRoleHandler'
            }, {
                iconCls: 'app-remove margin2',
                toolTip: '删除角色',
                handler: 'removeHandler'
            }]
        }
        ];
        this.tbar = [{
            text: '添加角色',
            iconCls: 'app-add',
            handler: 'addRoleHandler'
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
});