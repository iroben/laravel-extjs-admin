Ext.define("App.view.Menus", {
    extend: "Ext.tree.Panel",
    requires: [
        'App.model.admin.Operation',
        'App.view.controllers.admin.MenusController'
    ],
    controller: "menus",
    xtype: 'menus',
    rootVisible: false,
    useArrows: true,
    id: 'leftmenu',
    viewModel: {
        stores: {
            operations: {
                type: 'tree',
                model: 'App.model.admin.Operation',
                autoLoad: true,
                defaultRootProperty: 'menus',
                proxy: {
                    type: 'ajax',
                    url: '/menus',
                    reader: 'json'
                }
            }
        }
    },
    tbar: [{
        xtype: 'triggerfield',
        flex: 1,
        triggerCls: 'x-form-search-trigger',
        emptyText: 'filter',
        listeners: {
            change: 'filterStore'
        }
    }],
    bind: {
        store: '{operations}'
    },
    listeners: {
        rowclick: 'onSelect'
    }
})
;
