/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('App.Application', {
    extend: 'Ext.app.Application',

    name: 'App',

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        Ext.tip.QuickTipManager.init();
        initModule();
        Ext.Ajax.on('requestexception', function (conn, response, options) {
            setTimeout(function(){
                Ext.Msg.alert('系统提示', '<font color="red"><b>' +
                (response.responseText || response.statusText) + '</b></font>');
            },500);
        });
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
function initModule() {

    Ext.admin = function () {
        var msgCt;
        var currentIndex = parseInt(localStorage['msgIndex']) || -1;

        function createBox(t, s) {
            // return ['<div class="msg">',
            //         '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
            //         '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
            //         '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
            //         '</div>'].join('');
            return '<div class="msg ' + Ext.baseCSSPrefix + 'border-box"><h3>' + t + '</h3><p>' + s + '</p></div>';
        }

        return {
            failure: function () {
                this.msg('<font color="red"><b>操作失败，请联系BB</b></font>');
            },
            msg: function (title) {
                // Ensure message container is last in the DOM so it cannot interfere with
                // layout#isValidParent's DOM ordering requirements.

                var format = '';
                if (arguments.length == 1) {
                    format = Array.prototype.slice.call(arguments, 0);
                    title = '系统提示';
                } else {
                    format = Array.prototype.slice.call(arguments, 1);
                }
                var msgdiv = Ext.get('msg-div');
                if (msgdiv) {
                    if (msgdiv.query('.msg').length > 5) {
                        msgdiv.remove();
                        msgCt = null;
                        var msgs = [
                            '请按提示来操作！',
                            '哥，请看提示！',
                            '哥，你不知道看提示吗？'
                        ];
                        currentIndex += 1;
                        var msgIndex = currentIndex >= msgs.length ?
                            Math.floor(Math.random() * (msgs.length - 2)) : currentIndex;
                        localStorage['msgIndex'] = currentIndex;
                        Ext.Msg.show({
                            title: '系统警告',
                            id: 'errorWin',
                            message: '<b>' + msgs[msgIndex] + '</b>',
                            closable: false,
                            modal: true,
                            icon: Ext.MessageBox.ERROR //'admin-danger'
                        });
                        setTimeout(function () {
                            Ext.Msg.hide();
                        }, 3000);
                        return false;
                    }
                }
                if (msgCt) {
                    document.body.appendChild(msgCt.dom);
                } else {
                    msgCt = Ext.DomHelper.append(document.body, {id: 'msg-div'}, true);
                }
                var s = Ext.String.format.apply(String, format);
                var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
                m.hide();
                m.slideIn('t', {
                    easing: 'elasticIn'
                }).ghost("t", {
                    /*easing: 'elasticIn',*/
                    delay: 2000,
                    remove: true
                });
            }
        };
    }();
}
