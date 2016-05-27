/**
 * Created by liubin on 15/10/22.
 */

Ext.define('App.model.admin.User', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'username',
        'password',
        'email',
        'created',
        'createDate',
        'isAdmin'
    ],
    proxy: {
        type: 'rest',
        url: '/users',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});