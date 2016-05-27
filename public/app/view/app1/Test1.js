/**
 * Created by liubin on 15/10/22.
 */
Ext.define('App.view.app1.Test1', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.controllers.app1.Test1Controller',
        'App.model.app1.Test1'
    ],
    controller: 'test1',
    xtype: 'test1',
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
            test1: {
                model: 'App.model.app1.Test1',
                pageSize: 20,
                autoLoad: true
            }
        }
    },
    bind: {
        store: '{test1}'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{test1}'
        },
        displayInfo: true
    }],
    initComponent: function () {
        this.columns = [{
            text: '用户名',
            sortable: false,
            dataIndex: 'username1',
            flex: 1
        }, {
            text: '年龄',
            sortable: false,
            dataIndex: 'age1'
        }, {
            text: '性别',
            sortable: false,
            dataIndex: 'sex1',
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