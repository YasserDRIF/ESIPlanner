"use strict";

(function($, window) {
    /**
     * Default overlay settings
     */
    $.LoadingOverlaySetup({
        image: "assets/img/loaders/svg-loaders/three-dots.svg",
        /*image       : "",
         fontawesome : "fa fa-refresh fa-spin",*/
        zIndex: 1,
        size: 0,
        color: '#fff'
    });

    /**
     * Show overlay for an entire page
     */
    $.LoadingOverlay("show", {
        fade: false,
        zIndex: 99999
    });

    window.Kosmo = {
        screen: {
            breakpoints: {
                xxl: 1441,
                xl: 1440,
                lg: 992,
                md: 768,
                sm: 544,
                xs: 320
            }
        },
        initSidebarScrollBar: function(ksSidebar, isSidebarFixed) {
            if (isSidebarFixed) {
                ksSidebar.find('.ks-sidebar-wrapper').jScrollPane({
                    autoReinitialise: false,
                    autoReinitialiseDelay: 300
                });
            }

            $(document).on('sidebar:height:changed', function () {
                var api = ksSidebar.find('.ks-sidebar-wrapper').data('jsp');
                api.reinitialise();
            });
        },
        makeScrollable: function (selector) {
            $(selector).jScrollPane({
                autoReinitialise: true,
                autoReinitialiseDelay: 300
            });
        }
    };

    Response.create({
        prop : "width",
        breakpoints: [
            Kosmo.screen.breakpoints.xxl,
            Kosmo.screen.breakpoints.xl,
            Kosmo.screen.breakpoints.lg,
            Kosmo.screen.breakpoints.md,
            Kosmo.screen.breakpoints.sm,
            Kosmo.screen.breakpoints.xs,
            0
        ]
    });

    $(document).ready(function() {
        window.Kosmo.window = {
            height: $(window).height()
        };

        var ksBody = $('body');
        var ksSidebar = $('.ks-sidebar');
        var ksSidebarToggle = $('.ks-sidebar-toggle');
        var ksSidebarMobileToggle = $('.ks-sidebar-mobile-toggle');
        var isSidebarFixed = ksBody.hasClass('ks-sidebar-position-fixed');
        var isSidebarCompact = ksBody.hasClass('ks-sidebar-compact');
        var ksMobileOverlay = $('.ks-mobile-overlay');
        var ksNavbarMenu = $('.ks-navbar-menu');
        var ksNavbarMenuToggle = $('.ks-navbar-menu-toggle');
        var ksNavbarActions = $('.ks-navbar .ks-navbar-actions');
        var ksNavbarActionsToggle = $('.ks-navbar-actions-toggle');
        var ksSearchOpen = $('.ks-search-open');
        var ksSearchClose = $('.ks-search-close');
        var ksSettingsSlideControl = $('.ks-settings-slide-control');
        var ksSettingsSlideCloseControl = $('.ks-settings-slide-close-control');

        Response.crossover('width', function() {
            if (Response.band(Kosmo.screen.breakpoints.xxl)) {
                if (!isSidebarCompact) {
                    ksBody.removeClass('ks-sidebar-compact');
                }

                ksBody.removeClass('ks-sidebar-collapsed');
            } else if (Response.band(Kosmo.screen.breakpoints.lg, Kosmo.screen.breakpoints.xl)) {
                ksBody.removeClass('ks-sidebar-collapsed').addClass('ks-sidebar-compact');
            } else if (Response.band(0, Kosmo.screen.breakpoints.lg)) {
                if (!isSidebarCompact) {
                    ksBody.removeClass('ks-sidebar-compact');
                }

                ksBody.addClass('ks-sidebar-collapsed');
            }
        });

        Response.ready(function() {
            $(window).trigger('resize');
        });

        setTimeout(function() {
            $.LoadingOverlay("hide");
            ksBody.removeClass('ks-page-loading');
        }, 1000);

        // Replace default dropdown logic for sidebar
        ksSidebar.find('.dropdown-toggle').on('click', function() {
            if ($(this).closest('.dropdown-menu').size()) {
                if ($(this).closest('.dropdown-menu').find('.dropdown.open > .dropdown-toggle')[0] != $(this)[0]) {
                    $(this).closest('.dropdown-menu').find('.dropdown.open').removeClass('open');
                }

                $(this).closest('.dropdown').toggleClass('open');
            } else {
                if ($('.ks-sidebar .dropdown.open > .dropdown-toggle')[0] != $(this)[0]) {
                    $('.ks-sidebar .dropdown.open').removeClass('open');
                }

                $(this).closest('.dropdown').toggleClass('open');
            }
        });

        /**
         * Toggle sidebar to compact size
         */
        ksSidebarToggle.on('click', function() {
            if (!isSidebarCompact) {
                if (ksBody.hasClass('ks-sidebar-compact')) {
                    ksBody.removeClass('ks-sidebar-compact');
                } else {
                    ksBody.addClass('ks-sidebar-compact');
                }
            }
        });

        ksSidebar.on({
            mouseenter: function () {
                if (ksBody.hasClass('ks-sidebar-compact')) {
                    ksBody.addClass('ks-sidebar-compact-open');
                }
            },
            mouseleave: function () {
                if (ksBody.hasClass('ks-sidebar-compact')) {
                    ksBody.removeClass('ks-sidebar-compact-open');
                    ksSidebar.find('.open').removeClass('open');
                }
            }
        });

        // Navbar toggle
        ksNavbarMenuToggle.on('click', function() {
            var self = $(this);

            if (ksMobileOverlay.hasClass('ks-open') && !self.hasClass('ks-open')) {
                ksMobileOverlay.removeClass('ks-open');
                ksSidebar.removeClass('ks-open');
                ksSidebarMobileToggle.removeClass('ks-open');
                ksNavbarActions.removeClass('ks-open');
                ksNavbarActionsToggle.removeClass('ks-open');
            }

            self.toggleClass('ks-open');
            ksNavbarMenu.toggleClass('ks-open');
            ksMobileOverlay.toggleClass('ks-open');
        });

        ksSidebarMobileToggle.on('click', function() {
            var self = $(this);

            if (ksMobileOverlay.hasClass('ks-open') && !self.hasClass('ks-open')) {
                ksMobileOverlay.removeClass('ks-open');
                ksNavbarMenu.removeClass('ks-open');
                ksNavbarMenuToggle.removeClass('ks-open');
                ksNavbarActions.removeClass('ks-open');
                ksNavbarActionsToggle.removeClass('ks-open');
            }

            self.toggleClass('ks-open');
            ksSidebar.toggleClass('ks-open');
            ksMobileOverlay.toggleClass('ks-open');
        });

        ksNavbarActionsToggle.on('click', function() {
            var self = $(this);

            if (ksMobileOverlay.hasClass('ks-open') && !self.hasClass('ks-open')) {
                ksMobileOverlay.removeClass('ks-open');
                ksNavbarMenu.removeClass('ks-open');
                ksNavbarMenuToggle.removeClass('ks-open');
                ksSidebar.removeClass('ks-open');
                ksSidebarMobileToggle.removeClass('ks-open');
            }

            self.toggleClass('ks-open');
            ksNavbarActions.toggleClass('ks-open');
            ksMobileOverlay.toggleClass('ks-open');
        });

        ksMobileOverlay.on('click', function() {
            if (ksSidebar.hasClass('ks-open')) {
                ksSidebar.toggleClass('ks-open');
            } else if (ksNavbarMenu.hasClass('ks-open')) {
                ksNavbarMenu.toggleClass('ks-open');
            } else if (ksNavbarActions.hasClass('ks-open')) {
                ksNavbarActions.toggleClass('ks-open');
            }

            if (ksSidebarMobileToggle.hasClass('ks-open')) {
                ksSidebarMobileToggle.toggleClass('ks-open');
            }

            if (ksNavbarMenuToggle.hasClass('ks-open')) {
                ksNavbarMenuToggle.toggleClass('ks-open');
            }

            if (ksNavbarActionsToggle.hasClass('ks-open')) {
                ksNavbarActionsToggle.toggleClass('ks-open');
            }

            ksMobileOverlay.toggleClass('ks-open');
        });

        ksSearchOpen.on('click', function() {
            $(this).closest('.ks-navbar-menu').toggleClass('ks-open');
            $('.ks-search-form .form-control').focus();
        });

        ksSearchClose.on('click', function() {
            $(this).closest('.ks-navbar-menu').toggleClass('ks-open');
            $('.ks-search-form .form-control').val('').blur();
        });

        ksSettingsSlideControl.on('click', function() {
            $(this).closest('.ks-settings-slide-block').toggleClass('ks-open');
        });

        ksSettingsSlideCloseControl.on('click', function() {
            $(this).closest('.ks-settings-slide-block').removeClass('ks-open');
        });

        /**
         * Prevent default events for messages dropdown
         */
        $('.ks-navbar .ks-messages .nav-tabs .nav-link').on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).tab('show');
        });

        /**
         * Prevent default events for notifications dropdown
         */
        $('.ks-navbar .ks-notifications .nav-tabs .nav-link').on('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).tab('show');
        });

        /**
         * Prevent default events for nested dropdown menus
         */
        $('.ks-navbar .dropdown-menu .dropdown-toggle').on('click', function(e) {
            var self = $(this);
            var parent = self.closest('.dropdown');
            e.stopPropagation();
            e.preventDefault();

            parent.toggleClass('show');
        });

        $(document).on('change', '.btn-file :file', function(e) {
            var input = $(this);
            var label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            $(e.target).closest('.btn').find('.text').text(label);
        });

        $('.ks-document-viewer .ks-view-toggle').on('click', function() {
            var docViewer = $(this).closest('.ks-document-viewer');

            if (!$(this).closest('.ks-document-viewer').hasClass('ks-expanded')) {
                docViewer.addClass('ks-expanded');
                $(this).find('.ks-icon').removeClass('fa-expand').addClass('fa-compress');
            } else {
                docViewer.removeClass('ks-expanded');
                $(this).find('.ks-icon').removeClass('fa-compress').addClass('fa-expand');
            }
        });

        /**
         * Set fixed height to blocks
         */
        $('[data-height]').each(function() {
            $(this).height($(this).data('height'));
        });

        /**
         * Set min height to blocks
         */
        $('[data-min-height]').each(function() {
            $(this).css('min-height', $(this).data('min-height'));
        });

        /**
         * Set auto height for blocks
         */
        $('[data-auto-height]').each(function() {
            var self = $(this);
            var autoHeight = self.data('auto-height');
            var height = Kosmo.window.height - self.offset().top;
            var fixHeight = parseInt(self.data('fix-height'), 10);
            var reduceHeight = self.data('reduce-height');
            var scrollableIfHasClass = $(this).data('scrollable-if-has-class');

            if (!scrollableIfHasClass || (scrollableIfHasClass && ($(this).hasClass(scrollableIfHasClass) || (Response.band(0, Kosmo.screen.breakpoints.lg))))) {
                if (autoHeight) {
                    if (autoHeight == 'parent') {
                        height = self.parent().height();
                    } else {
                        height = self.closest(autoHeight).height();
                    }
                } else {
                    if (reduceHeight) {
                        $.each(self.parent().find(reduceHeight), function (index, element) {
                            height -= $(element).height();
                        });
                    }

                    if (fixHeight > 0 && height > 0) {
                        height -= fixHeight;
                    }

                    if (height <= 0) {
                        if (self.data('min-height')) {
                            height = parseInt(self.data('min-height'), 10);
                        } else {
                            height = 200;
                        }
                    }
                }

                self.height(height);
            }
        });

        /**
         * Add scroll to blocks
         */
        $('.ks-scrollable').each(function(index, item) {
            var scrollableIfHasClass = $(this).data('scrollable-if-has-class');

            if (!scrollableIfHasClass || (scrollableIfHasClass && ($(this).hasClass(scrollableIfHasClass) || Response.band(0, Kosmo.screen.breakpoints.lg)))) {
                $(item).jScrollPane({
                    autoReinitialise: true,
                    autoReinitialiseDelay: 100
                });
            }
        });

        /**
         * Toggle hidden responsive menus
         */
        $('[data-block-toggle]').on('click', function() {
            var self = $(this);
            var query = $(this).data('block-toggle');
            var block = $(query);

            self.toggleClass('ks-open');
            block.toggleClass('ks-open');
        });

        /**
         * Make Responsive Horizontal Navigation
         * @type {*|jQuery|HTMLElement}
         */
        if ($('.ks-navbar-horizontal').size()) {
            var ksNavbarHorizontalResponsiveDropdown = $('.ks-navbar-horizontal > .nav > .ks-navbar-horizontal-responsive');
            var ksNavbarHorizontalWidth = $('.ks-navbar-horizontal > .nav').width() + 60;
            var ksNavbarHorizontalScrollWidth = $('.ks-navbar-horizontal').get(0).scrollWidth;

            if (ksNavbarHorizontalScrollWidth > ksNavbarHorizontalWidth) {
                ksNavbarHorizontalWidth -= 220;

                var menuItems = $('.ks-navbar-horizontal > .nav > .nav-item:not(.ks-navbar-horizontal-responsive)');
                var menuItemsLength = menuItems.length;

                for (var i = menuItemsLength; i >= 0; i--) {
                    var element = menuItems.get(i);
                    var elementWidth = $(element).width();

                    if ((ksNavbarHorizontalScrollWidth - elementWidth) > ksNavbarHorizontalWidth) {
                        ksNavbarHorizontalScrollWidth -= elementWidth;
                        var clone = $(element).clone();

                        clone.find('.dropdown-toggle').on('click', function (e) {
                            $(this).closest('.dropdown').toggleClass('show');

                            return false;
                        });

                        clone.removeClass('nav-item').addClass('dropdown-item');
                        $('.ks-navbar-horizontal-responsive > .dropdown-menu').prepend(clone);

                        $(element).remove();
                    }
                }

                ksNavbarHorizontalResponsiveDropdown.show();
            }
        }

        /**
         * Toggle sidebar
         */
        $('.ks-sidebar-checkbox-toggle :checkbox').on('change', function () {
            $('.ks-sidebar-toggle').trigger('click');
        });

        /**
         * Toggle page header to fixed or unfixed position
         */
        $('.ks-page-header-checkbox-toggle :checkbox').on('change', function () {
            ksBody.toggleClass('ks-page-header-fixed');
        });

        /**
         * NOTICE: DELETE IN PRODUCTION!
         *
         * Toggle sidebar dark or light style
         */
        $('.ks-sidebar-style-checkbox-toggle :checkbox').on('change', function () {
            if (this.checked) {
                $('html head').append('<link class="ks-sidebar-dark-style" rel="stylesheet" type="text/css" href="assets/styles/themes/sidebar-black.min.css">');
            } else {
                $('.ks-sidebar-dark-style').remove();
            }
        });

        /**
         * NOTICE: DELETE IN THE PRODUCTION!
         *
         * Toggle main content gray or white style
         */
        $('.ks-content-bg-checkbox-toggle :checkbox').on('change', function () {
            ksBody.toggleClass('ks-content-solid-bg');
        });

        Kosmo.initSidebarScrollBar(ksSidebar, isSidebarFixed);

        $(document).find('.ks-sidebar .dropdown-toggle').on('click', function () {
            var parent = $(this).parent();
            var menu = parent.find('> .dropdown-menu');

            if (parent.hasClass('open')) {
                menu.show();
                var height = menu.height();
                menu.height(0);
                menu.velocity({
                    height: height
                }, {
                    duration: 300,
                    easing: "easeOut",
                    complete: function () {
                        menu.removeAttr('style');
                        $(document).trigger('sidebar:height:changed');
                    }
                });
            } else {
                menu.hide();
                menu.removeAttr('style');
                $(document).trigger('sidebar:height:changed');
            }
        });
        
        $(window).trigger('resize');
    });
})(jQuery, window);
