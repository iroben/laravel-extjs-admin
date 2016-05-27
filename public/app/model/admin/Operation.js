/**
 * Created by liubin on 15/10/22.
 */
Ext.define('App.model.admin.Operation', {
    extend: 'Ext.data.TreeModel',
    idProperty: 'id',
    fields: [
        'id',
        'text',
        'leaf',
        'expanded',
        'iconCls',
        'rbnamespace',
        'rbclass',
        'method',
        'xtype',
        'pid',
        'isMenu',
        'order'
    ], root: {
        text: '功能导航',
        expand: true,
        id: 0
    },
    proxy: {
        type: 'rest',
        url: '/operations',
        reader: 'json'
    }
});