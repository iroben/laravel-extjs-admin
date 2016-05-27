/**
 * Created by liubin on 15/10/22.
 */

Ext.define('App.model.app1.Test1', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'username1',
        'age1',
        'sex1'
    ],
    proxy: {
        type: 'rest',
        url: '/test1',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});