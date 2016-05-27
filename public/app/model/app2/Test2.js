/**
 * Created by liubin on 15/10/22.
 */

Ext.define('App.model.app2.Test2', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'username2',
        'age2',
        'sex2'
    ],
    proxy: {
        type: 'rest',
        url: '/test2',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});