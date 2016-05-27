/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.controllers.admin.HeaderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.header',
    modifyPasswd: function () {
        var win = Ext.create('Ext.window.Window', {
            title: '修改密码',
            width: 300,
            height: 230,
            layout: 'fit',
            modal: true,
            closable: false,
            items: [{
                xtype: 'form',
                itemId: 'passwdform',
                margin: '10 15 10 15',
                defaultType: 'textfield',
                defaults: {
                    labelWidth: 80,
                    inputType: 'password'
                },
                items: [{
                    fieldLabel: '原密码',
                    allowBlank: false,
                    name: 'oldpasswd'
                }, {
                    fieldLabel: '新密码',
                    allowBlank: false,
                    name: 'newpasswd'
                }, {
                    fieldLabel: '确认密码',
                    allowBlank: false,
                    name: 'renewpasswd'
                }]
            }],
            buttons: [
                {
                    text: '修改',
                    handler: function () {
                        var form = win.getComponent('passwdform');
                        if (form.isValid()) {
                            var val = form.getValues();
                            if (val.newpasswd !== val.renewpasswd) {
                                Ext.admin.msg('两次密码输入不一样');
                                return false;
                            }
                            form.submit({
                                url: '/repasswd',
                                success: function () {
                                    Ext.admin.msg('修改成功，2S后重新登录');
                                    setTimeout(function () {
                                        window.location.reload();
                                    }, 2000);

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
            ]
        });

        win.show();
    },
    logout: function () {
        Ext.Ajax.request({
            url: '/logout',
            success: function () {
                window.location.reload();
            }
        })
    }
});
