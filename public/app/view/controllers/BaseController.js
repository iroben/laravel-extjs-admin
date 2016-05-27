/**
 * Created by LiuBin on 2016/5/25.
 */
Ext.define('App.view.controllers.BaseController', {
    extend: 'Ext.app.ViewController',
    mask: null,
    showMask: function (text, target) {
        if (this.mask) {
            this.mask.hide();
        }
        this.mask = Ext.create('Ext.LoadMask', {
            msg: '请骚等, ' + text,
            target: target || this.getView()
        });
        this.mask.show();
    },
    hideMask: function () {
        if (this.mask) {
            this.mask.hide();
        }
    },
    removeConfirm: function (callback) {
        Ext.Msg.show({
            title: '操作提示',
            message: '<b>你确定要删除吗？</b>',
            buttons: Ext.Msg.YESNO,
            icon: 'app-danger',
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    callback.call(this);
                }
            }
        });
    },
    confirm: function (msg, callback) {
        Ext.Msg.show({
            title: '操作提示',
            message: '<b>你确定要' + msg + '吗？</b>',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.WARNING,
            scope: this,
            fn: function (btn) {
                if (btn === 'yes') {
                    callback.call(this);
                }
            }
        });
    },
    onSelectionChange: function (sm, selectieons) {
        this.lookupReference('removeSelected')
            .setDisabled(selectieons.length === 0);
    },
    removeHandler: function (sm, index, column) {
        var that = this;
        this.removeConfirm(function () {
            this.showMask('正在删除');
            this.getView().getStore().getAt(index).erase({
                success: function () {
                    that.hideMask();
                    Ext.admin.msg('删除成功');
                    that.getView().getStore().reload();
                }, failure: function () {
                    that.hideMask();
                }
            });
        });
    },
    removeSelectedHandler: function () {
        var that = this;
        this.removeConfirm(function () {
            var selected = this.getView().getSelection();
            this.showMask('正在删除');
            var count = 0;
            Ext.each(selected, function (val) {
                val.erase({
                    success: function () {
                        count += 1;
                        if (count === selected.length) {
                            that.hideMask();
                            Ext.admin.msg('删除成功');
                            that.getView().getStore().reload();
                        }
                    }, failure: function () {
                        that.hideMask();
                    }
                });
            });
        });
    },
    nodedragover: function () {
        return true;
    },
    dragdrop: function (tree, dragData, targetNode, position) {
        var pid, records = dragData.records;
        if (position === 'append') {
            pid = targetNode.get('id');
        } else {
            pid = targetNode.get('pid');
        }
        var that = this;
        this.showMask();
        var j = 0;
        for (var i = 0; i < records.length; ++i) {
            records[i].set('pid', pid);
            records[i].save({
                callback: function () {
                    ++j;
                    if (j === records.length) {
                        that.hideMask();
                        that.getView().getStore().reload();
                    }
                }
            });
        }
    },

    setChecked: function (rootNode, selected, checkedParent) {
        var length = rootNode.childNodes.length,
            items = selected.getData().items,
            seletedLength = items.length;
        var parentIsChecked = false,
            flag = false,
            returnVal = false;
        for (var i = 0; i < length; ++i) {
            returnVal = this.setChecked(rootNode.childNodes[i], selected, checkedParent);
            parentIsChecked = returnVal || parentIsChecked;
            flag = false;
            for (var j = 0; j < seletedLength; ++j) {
                if (rootNode.childNodes[i].get('id') === items[j].get('id')) {
                    rootNode.childNodes[i].set('checked', true);
                    rootNode.childNodes[i].set('isRoleAdmin', items[j].get('pivot').isAdmin);
                    parentIsChecked = true;
                    flag = true;
                    break;
                }
            }
            if (!flag && checkedParent) {
                rootNode.childNodes[i].set('checked', returnVal);
            }
        }
        return parentIsChecked;
    },
    unCheckChildrens: function (node) {
        var that = this;
        Ext.each(node.childNodes || node.items, function (val) {
            val.set('checked', false);
            val.set('isRoleAdmin', false);
            that.unCheckChildrens(val);
        });
    },
    checkParents: function (node) {
        if (node.parentNode) {
            node.parentNode.set('checked', true);
            this.checkParents(node.parentNode);
        }
    },
    checkChildrens: function (node, eOpts) {
        var that = this;
        Ext.each(node.childNodes, function (val) {
            val.set('checked', true);
            if (eOpts && eOpts.isAdminChecked) {
                val.set('isRoleAdmin', true);
            }
            that.checkChildrens(val, eOpts);
        });
    }
});
