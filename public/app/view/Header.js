/**
 * Created by liubin on 11/30/15.
 */
Ext.define('App.view.Header', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.controllers.admin.HeaderController'
    ],
    xtype: 'dreamheader',
    controller: 'header',
    tbar: ['<h3 style="color: #25657b">追梦网络科技有限公司</h3>', '->', {
        text: '修改密码',
        handler: 'modifyPasswd'
    }, '-', {
        text: '退出',
        handler: 'logout'
    }]
});
