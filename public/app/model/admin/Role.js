/**
 * Created by liubin on 11/5/15.
 */
Ext.define('App.model.admin.Role', {
    extend: 'Ext.data.TreeModel',
    idProperty: 'id',
    fields: [
        'id',
        'roleName',
        'pid',
        'lval',
        'rval',
        'description',
        'isRoleAdmin'
    ],
    root: {
        text: '角色',
        expand: true,
        id: 0
    },
    proxy: {
        type: 'rest',
        url: '/roles',
        reader: 'json'
    }
})
;