/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',
    requires: [
        'App.view.Header',
        'App.view.Menus',

        'App.view.controllers.BaseController',
        'App.view.controllers.MainController',

        'App.view.admin.Operation',
        'App.view.admin.Role',
        'App.view.admin.User',

        'App.view.app1.Test1',
        'App.view.app2.Test2'

    ],
    controller: 'main',
    layout: 'border',
    initComponent: function () {
        this.checkLogin();
        this.callParent();
    },
    checkLogin: function () {
        var that = this;
        Ext.Ajax.request({
            url: '/login',
            async: false,
            success: function () {
                that.init();
            },
            failure: function () {
                login();
            }
        });
    },
    init: function () {
        this.items = [
            {
                xtype: 'dreamheader',
                region: 'north'
            },
            {
                region: 'west',
                title: '功能导航',
                width: 250,
                split: true,
                scrollable: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                collapsible: true,
                items: [{
                    xtype: 'menus'
                }]
            },
            {
                region: 'center',
                layout: 'fit',
                items: [
                    {
                        xtype: 'tabpanel',
                        id: 'maintabpanel',
                        items: [{
                            title: 'Home',
                            iconCls: 'x-fa fa-home'
                        }]
                    }
                ]
            }
        ]
    }
});

var login = (function () {
    var loginWin = null, loginForm = null;
    return function () {
        if (!loginForm) {
            loginForm = Ext.create('Ext.form.Panel', {
                defaultType: 'textfield',
                viewModel: {
                    data: {
                        userInfo: {}
                    }
                },
                margin: '15 0 15 0',
                defaults: {
                    msgTarget: 'side',
                    labelWidth: 60,
                    anchor: '95%',
                    labelAlign: 'right'
                },
                items: [{
                    fieldLabel: '用户名',
                    allowBlank: false,

                    bind: {
                        value: '{userInfo.username}'
                    }
                }, {
                    fieldLabel: '密码',
                    inputType: 'password',
                    allowBlank: false,
                    bind: {
                        value: '{userInfo.password}'
                    }
                }, {
                    fieldLabel: '验证码',
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        allowBlank: false,
                        width: '50%',
                        bind: {
                            value: '{userInfo.verifyCode}'
                        }
                    }, {
                        xtype: 'image',
                        margin: '0 0 0 10',
                        width: '50%',
                        height: 32,
                        id: 'captchaCmp',
                        src: '/captcha',
                        listeners: {
                            el: {
                                click: function () {
                                    Ext.getCmp(this.id).setSrc('/captcha?d=' + (+new Date()));
                                }
                            }
                        }
                    }]
                }]
            });
        }
        if (!loginWin) {
            loginWin = Ext.create('Ext.window.Window', {
                title: '追梦后台登录',
                width: 300,
                height: 240,
                modal: true,
                layout: 'fit',
                closable: false,
                items: loginForm,
                listeners: {
                    boxready: function (win) {
                        new Ext.KeyMap(win.getEl(), {
                            key: 13,
                            fn: this.handlerfn,
                            scope: win
                        });
                    }
                },
                buttons: [{
                    text: '登录',
                    handler: function () {
                        loginWin.handlerfn();
                    }
                }],
                handlerfn: function () {

                    if (loginForm.isValid()) {
                        var userInfo = loginForm.getViewModel().get('userInfo');
                        Ext.Ajax.request({
                            url: '/login',
                            method: 'POST',
                            jsonData: userInfo,
                            success: function () {
                                Ext.admin.msg('登录成功');
                                setTimeout(function () {
                                    /*loginForm.reset();
                                     loginWin.hide();*/
                                    window.location.reload();
                                }, 1000);
                            },
                            failure: function (response) {
                                /*var txt = Ext.JSON.decode(response.responseText);
                                 Ext.admin.msg(txt.message);*/
                                Ext.getCmp('captchaCmp').setSrc('/captcha?d=' + (+new Date()));
                            }
                        });
                    }
                }
            });
        }
        loginWin.show();
    }
})();