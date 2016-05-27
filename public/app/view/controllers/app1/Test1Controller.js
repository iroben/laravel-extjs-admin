/**
 * Created by liubin on 15/10/23.
 */

Ext.define('App.view.controllers.app1.Test1Controller', {
    extend: 'App.view.controllers.BaseController',
    alias: 'controller.test1',
    requires: [
        'App.model.app1.Test1'
    ],
    win: null,
    roleTreePanel: null,
    addUserHandler: function (sm, index, column) {
        var record = Ext.create('App.model.app1.Test1', {
            username1: '',
            age1: 26,
            sex1: 1
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
                        value: '{record.username1}'
                    }
                }, {
                    fieldLabel: '年龄',
                    xtype: 'numberfield',
                    bind: {
                        value: '{record.age1}'
                    }
                }, {
                    fieldLabel: '性别',
                    xtype: 'combo',
                    bind: {
                        value: '{record.sex1}'
                    },
                    store: Ext.create('Ext.data.Store', {
                        data: [
                            {
                                text: '男',
                                val: 1
                            }, {
                                text: '女',
                                val: 2
                            }
                        ]
                    }),
                    displayField: 'text',
                    valueField: 'val'
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
    }
});