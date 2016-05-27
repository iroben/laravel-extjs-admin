/**
 * Created by liubin on 15/10/23.
 */

Ext.define('App.view.controllers.admin.OperationController', {
    extend: 'App.view.controllers.BaseController',
    requires: [
        'App.model.admin.Operation'
    ],
    alias: 'controller.adminoperation',
    addCategoryHandler: function (sm, index, column) {
        /**
         * grid的添加按钮会传列信息进来
         */
        var record;
        if (column) {
            record = Ext.create('App.model.admin.Operation', {
                text: '',
                iconStyle: '',
                rbnamespace: '',
                rbclass: '',
                'method': '',
                xtype: '',
                leaf: true,
                expanded: true,
                isMenu: 0,
                pid: this.getView().getStore().getAt(index).get('id')
            });
        } else {
            record = Ext.create('App.model.admin.Operation', {
                text: '',
                iconStyle: '',
                rbnamespace: '',
                rbclass: '',
                'method': '',
                xtype: '',
                leaf: true,
                expanded: true,
                isMenu: 1,
                pid: 0
            });
        }
        this.showWin(record, true);
    },
    showWin: function (record, isNew) {
        var namespacesData = null, selectedNamespaces, selectedClassName;
        var that = this;
        Ext.Ajax.request({
            url: '/namespaces',
            sync: false,
            success: function (response, opts) {
                var obj = Ext.decode(response.responseText);
                namespacesData = obj;

                var namespaces = Ext.Array.map(obj, function (val) {
                    return val['className'];
                });
                win.getComponent('operationform').getComponent('namespace')
                    .setStore(namespaces);

            }
        });
        var win = Ext.create('Ext.window.Window', {
            title: '功能管理',
            modal: true,
            height: 450,
            width: 550,
            closable: false,
            layout: 'fit',
            viewModel: {
                data: {
                    record: record
                }
            },
            items: [{
                xtype: 'form',
                padding: 5,
                itemId: 'operationform',
                defaults: {
                    labelAlign: 'right',
                    labelWidth: 70,
                    anchor: '98%'
                },
                autoScroll: true,
                items: [{
                    fieldLabel: '命名空间',
                    xtype: 'combo',
                    itemId: 'namespace',
                    bind: {
                        value: '{record.rbnamespace}'
                    },
                    listeners: {
                        change: function (obj, v) {
                            if (!namespacesData) {
                                return;
                            }
                            var classes = Ext.Array.filter(namespacesData, function (val) {
                                return val['className'] == v;
                            });
                            selectedNamespaces = classes[0];
                            if (!selectedNamespaces) {
                                return;
                            }
                            var classNames = Ext.Array.map(selectedNamespaces['children'], function (val) {
                                return val['className'];
                            });
                            win.getComponent('operationform').getComponent('className')
                                .setStore(classNames);
                        }
                    }
                }, {
                    fieldLabel: '类名',
                    xtype: 'combo',
                    itemId: 'className',
                    bind: {
                        value: '{record.rbclass}'
                    },
                    listeners: {
                        change: function (obj, v) {
                            if (!selectedNamespaces) {
                                return;
                            }
                            var classes = Ext.Array.filter(selectedNamespaces['children'], function (val) {
                                return val['className'] == v;
                            });
                            selectedClassName = classes[0];
                            if (!selectedClassName) {
                                return;
                            }
                            var classNames = Ext.Array.map(selectedClassName['children'], function (val) {
                                return val['method'];
                            });
                            win.getComponent('operationform').getComponent('method')
                                .setStore(classNames);
                        }
                    }
                }, {
                    fieldLabel: '方法',
                    xtype: 'combo',
                    itemId: 'method',
                    bind: {
                        value: '{record.method}'
                    },
                    listeners: {
                        change: function (obj, v) {
                            if (!selectedClassName) {
                                return;
                            }
                            var method = Ext.Array.filter(selectedClassName['children'], function (val) {
                                return val['method'] == v;
                            });
                            var methodComponent = win.getComponent('operationform').getComponent('functionName');
                            if (!methodComponent.getValue()) {
                                methodComponent.setValue(method[0]['text']);
                            }

                        }
                    }
                }, {
                    fieldLabel: '功能名',
                    itemId: 'functionName',
                    bind: {
                        value: '{record.text}'
                    },
                    xtype: 'textfield'
                }, {
                    fieldLabel: '图标样式',
                    bind: {
                        value: '{record.iconCls}'
                    },
                    xtype: 'textfield'
                }, {
                    fieldLabel: 'xtype',
                    bind: {
                        value: '{record.xtype}'
                    },
                    xtype: 'textfield'
                }, {
                    fieldLabel: '是否是菜单',
                    xtype: 'combo',
                    bind: {
                        value: '{record.isMenu}'
                    },
                    store: Ext.create('Ext.data.Store', {
                        data: [{
                            text: '是',
                            value: 1
                        }, {
                            text: '否',
                            value: 0
                        }],
                        proxy: {
                            type: 'memory'
                        }
                    }),
                    displayField: 'text',
                    valueField: 'value'
                }, {
                    fieldLabel: '序号',
                    bind: {
                        value: '{record.order}'
                    },
                    xtype: 'numberfield'
                }],
                buttons: [{
                    text: '保存',
                    handler: function () {
                        that.showMask('正在保存...', win);
                        record.save({
                            callback: function () {
                                that.hideMask();
                                that.getView().getStore().reload();
                                win.close();
                            }
                        });
                    }
                }, {
                    text: '关闭',
                    handler: function () {
                        record.reject();
                        win.close();
                    }
                }]
            }]
        });
        win.show();
    },
    editCategory: function (sm, index, column) {
        this.showWin(this.getView().getStore().getAt(index), false);
    }
});