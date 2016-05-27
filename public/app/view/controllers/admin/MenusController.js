/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.controllers.admin.MenusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.menus',
    idPrefix: 'd_' + (+new Date()) + '_',
    onSelect: function (obj, record, index, eOpts) {
        /*if (record.isLeaf()) {*/
        var _id = this.idPrefix + record.get('id'),
            mainTabPanel = Ext.getCmp('maintabpanel'),
            tabItem = Ext.getCmp(_id);

        var xtype = record.get('xtype');
        if (xtype) {

            if (!tabItem) {
                tabItem = mainTabPanel.add({
                    title: record.get('text'),
                    id: _id,
                    iconCls: record.get('iconCls'),
                    closable: true,
                    xtype: xtype
                });
            }
            mainTabPanel.setActiveItem(tabItem);
        }

        /*}*/
    },

    filterStore: function (obj, newVal, oldVal) {
        var store = this.getViewModel().getStore('operations');
        var that = this;
        store.clearFilter();
        if (newVal) {
            store.filterBy(function (record) {
                var flag = record.get('text').indexOf(newVal) !== -1;
                if (!flag) {
                    flag = that.getChildFlag(record, newVal);
                }
                return flag;
            });
        }
    },
    getChildFlag: function (record, newVal) {
        var flag = false;
        var that = this;
        Ext.each(record.childNodes, function (val) {
            if (val.get('text').indexOf(newVal) !== -1) {
                flag = true;
            } else {
                flag = that.getChildFlag(val, newVal);
            }
            /**
             * 当其中一个子分类匹配用户输入的时候就返回
             */
            if (flag) {
                return false;
            }
        });
        return flag;
    }
});
