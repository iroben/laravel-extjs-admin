/**
 * Created by liubin on 15/10/22.
 */
Ext.define('App.view.admin.Operation', {
    extend: 'Ext.tree.Panel',
    requires: [
        'App.view.controllers.admin.OperationController'
    ],
    controller: 'adminoperation',
    xtype: 'adminoperation',
    rootVisible: false,
    rowLines: true,
    autoHeight: true,
    useArrows: true,
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
            operations: {
                type: 'tree',
                model: 'App.model.admin.Operation',
                autoLoad: true
            }
        }
    },
    bind: {
        store: '{operations}'
    },
    initComponent: function () {
        this.columns = [{
            xtype: 'treecolumn',
            text: '功能',
            flex: 1,
            sortable: false,
            dataIndex: 'text'
        }, {
            text: '图标样式',
            flex: 1,
            sortable: false,
            dataIndex: 'iconCls',
            renderer: function (val) {
                if (val) {
                    return '<span class="' + val + '"> (' + val + ') </span>';
                }
                return val;
            }
        }, {
            text: 'xtype',
            flex: 1,
            sortable: false,
            dataIndex: 'xtype'
        }, {
            text: '命名空间',
            sortable: false,
            flex: 1,
            dataIndex: 'rbnamespace'
        }, {
            text: '类名',
            sortable: false,
            flex: 1,
            dataIndex: 'rbclass'
        }, {
            text: '方法',
            sortable: false,
            flex: 1,
            dataIndex: 'method'
        }, {
            text: '是否是菜单',
            sortable: false,
            dataIndex: 'isMenu',
            renderer: function (val) {
                return val ? '是' : '否';
            }
        }, {
            text: '序号',
            sortable: false,
            dataIndex: 'order'
        }, {
            xtype: 'actioncolumn',
            sortable: false,
            width: 75,
            menuDisabled: true,
            items: [{
                iconCls: 'app-edit margin2',
                tooltip: '编辑',
                handler: 'editCategory'
            }, {
                iconCls: 'app-add margin2',
                tooltip: '添加子功能',
                handler: 'addCategoryHandler'
            }, {
                iconCls: 'app-remove margin2',
                toolTip: '删除功能',
                handler: 'removeHandler'
            }]
        }];
        this.tbar = [{
            text: '添加功能',
            iconCls: 'app-add',
            handler: 'addCategoryHandler'
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