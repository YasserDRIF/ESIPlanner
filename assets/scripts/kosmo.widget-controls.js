(function ($, window) {
    "use strict";

    $.fn.KosmoWidgetControls = function(options) {
        var settings = $.extend($.fn.KosmoWidgetControls.defaults, options);

        return this.each(function() {
            var element = $(this);
            var content = element.find('[data-widget-content]');

            element.find('[data-control-content-visible]').on('click', function () {
                var control = $(this);
                var controlIcon = control.find('[data-control-icon]');

                element.toggleClass(settings.contentHiddenClass);

                if (content.is(":visible")) {
                    content.hide();
                    controlIcon.removeClass(control.data('icon-visible')).addClass(control.data('icon-hidden'));
                } else {
                    content.show();
                    controlIcon.removeClass(control.data('icon-hidden')).addClass(control.data('icon-visible'));
                }

                return false;
            });

            element.find('[data-control-fullscreen]').on('click', function () {
                element.toggleClass(settings.fullScreenClass);
                settings.onFullScreen(element, element.hasClass(settings.fullScreenClass));

                return false;
            });

            element.find('[data-control-refresh]').on('click', function () {
                if (!element.hasClass(settings.contentHiddenClass)) {
                    settings.onRefresh(element);
                }

                return false;
            });

            element.find('[data-control-close]').on('click', function () {
                settings.onClose(element, function () {
                    element.attr('data-widget-closed', true);
                    element.hide();
                });

                return false;
            });
        });
    };

    $.fn.KosmoWidgetControls.defaults = {
        fullScreenClass: 'ks-dashboard-widget-fullscreen',
        contentHiddenClass: 'ks-dashboard-widget-content-hidden',
        onFullScreen: function (element, isFullScreen) {},
        onRefresh: function (element) {},
        onClose: function (element, closeCallback) {
            closeCallback();
        }
    };
}(jQuery, window));