/**
 * Created by liubin on 15/10/22.
 */
Ext.define('App.view.app2.Test2', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.controllers.app2.Test2Controller',
        'App.model.app2.Test2'
    ],
    controller: 'test2',
    xtype: 'test2',
    rowLines: true,
    autoHeight: true,
    useArrows: true,
    columnLines: true,
    viewConfig: {
        emptyText: '还没有添加数据...'
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
            test2: {
                model: 'App.model.app2.Test2',
                pageSize: 20,
                autoLoad: true
            }
        }
    },
    bind: {
        store: '{test2}'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{test2}'
        },
        displayInfo: true
    }],
    initComponent: function () {
        this.columns = [{
            text: '用户名',
            sortable: false,
            dataIndex: 'username2',
            flex: 1
        }, {
            text: '年龄',
            sortable: false,
            dataIndex: 'age2'
        }, {
            text: '性别',
            sortable: false,
            dataIndex: 'sex2',
            renderer: function (val) {
                return val == 1 ? '男' : '女';
            }
        }, {
            xtype: 'actioncolumn',
            sortable: false,
            width: 75,
            menuDisabled: true,
            items: [{
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