import axios from 'axios';

function updateCart(data) {
    axios.post('/update-cart',data).then((res)=>{
        console.log(res);
    })
}

!(function (e) {
    "use strict";
    var t = {
        initialised: !1,
        mobile: !1,
        init: function () {
            this.initialised ||
            ((this.initialised = !0),
                this.checkMobile(),
                this.stickyHeader(),
                this.mMenuIcons(),
                this.mMenuToggle(),
                this.mobileMenu(),
                this.scrollToTop(),
                this.quantityInputs(),
                this.countTo(),
                this.tooltip(),
                this.popover(),
                this.changePassToggle(),
                this.changeBillToggle(),
                this.catAccordion(),
                this.ajaxLoadProduct(),
                this.toggleFilter(),
                this.toggleSidebar(),
                this.productTabSroll(),
                this.scrollToElement(),
                this.loginPopup(),
                this.modalView(),
                this.productManage(),
                this.ratingTooltip(),
                this.windowClick(),
                this.popupMenu(),
                this.headerSearchToggle(),
                this.parallax(),
                this.appearMap(),
                this.appearAnimate(),
            e.fn.isotope && this.isotopes(),
            e.fn.superfish && this.menuInit(),
            e.fn.owlCarousel && this.owlCarousels(),
            "object" == typeof noUiSlider && this.filterSlider(),
            e.fn.themeSticky && this.stickySidebar(),
            e.fn.magnificPopup && this.lightBox(),
            e.fn.Morphext && this.wordRotate());
        },
        checkMobile: function () {
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
                ? (this.mobile = !0)
                : (this.mobile = !1);
        },
        menuInit: function () {
            e(".menu").superfish({
                popUpSelector: "ul, .megamenu",
                hoverClass: "show",
                delay: 0,
                speed: 80,
                speedOut: 80,
                autoArrows: !0
            });
        },
        stickyHeader: function () {
            var t = !1,
                i = null,
                a = null,
                o = function (t, i) {
                    t.hasClass("fixed") &&
                    (t.removeClass("fixed"),
                        t.css("top", ""),
                    i.changes &&
                    i.changes.forEach(function (e) {
                        e.removeClass && t.find(e.item).addClass(e.removeClass),
                        e.addClass && t.find(e.item).removeClass(e.addClass);
                    }),
                    i.move &&
                    i.move.forEach(function (i) {
                        if (i.clone) t.find(i.item).hide();
                        else {
                            var a = 0;
                            t.find(i.item).each(function () {
                                e(
                                    '.sticky-placeholder[data-sticky-placeholder="' +
                                    (i.indexStart + ++a) +
                                    '"]'
                                ).replaceWith(e(this));
                            });
                        }
                    }),
                        t.parent().css("min-height", ""));
                },
                n = function () {
                    if (992 > e(window).width())
                        t &&
                        i.each(function (t) {
                            o(e(this), a[t]);
                        });
                    else {
                        t ||
                        (function () {
                            var o = 0;
                            (a = []),
                                (i = e(".sticky-header").each(function () {
                                    var t = e(this),
                                        i = t.data("sticky-options"),
                                        n = {};
                                    i &&
                                    (n = JSON.parse(i.replace(/'/g, '"').replace(";", ""))),
                                    n.move &&
                                    n.move.forEach(function (t) {
                                        t.clone ||
                                        ((t.indexStart = o), (o += e(t.item).length));
                                    }),
                                        (n.height = t.outerHeight()),
                                        (n.offset = t.offset().top),
                                        (n.paddingTop = parseInt(t.css("padding-top"))),
                                        a.push(n),
                                        t.wrap('<div class="sticky-wrapper"></div>');
                                })),
                                (t = !0);
                        })();
                        var n = e(window).scrollTop(),
                            s = 0;
                        i.each(function (i) {
                            var r = e(this),
                                l = a[i];
                            n + s >= l.offset + l.paddingTop
                                ? (r.hasClass("fixed") ||
                                (function (t, i, a) {
                                    t.hasClass("fixed") ||
                                    (t.parent().css("min-height", i.height),
                                    i.move &&
                                    i.move.forEach(function (a) {
                                        if (a.clone) t.find(a.item).show();
                                        else {
                                            var o = t.find(i.moveTo),
                                                n = 0;
                                            e(a.item).each(function () {
                                                var t = e(this);
                                                t.wrap(
                                                    '<div class="sticky-placeholder" style="width:' +
                                                    t.outerWidth() +
                                                    "px;height:" +
                                                    t.outerHeight() +
                                                    "px;margin:" +
                                                    t.css("margin") +
                                                    ';" data-sticky-placeholder="' +
                                                    (a.indexStart + ++n) +
                                                    '"></div>'
                                                ),
                                                    "end" == a.position
                                                        ? t.appendTo(o)
                                                        : t.prependTo(o);
                                            });
                                        }
                                    }),
                                    i.changes &&
                                    i.changes.forEach(function (e) {
                                        e.removeClass &&
                                        t.find(e.item).removeClass(e.removeClass),
                                        e.addClass && t.find(e.item).addClass(e.addClass);
                                    }),
                                        t
                                            .addClass("fixed")
                                            .css("top", -i.height)
                                            .animate({
                                                top: a
                                            }));
                                })(r, l, s),
                                    (s += r.outerHeight()))
                                : (!r.hasClass("fixed") && t) || o(r, l);
                        });
                    }
                };
            setTimeout(n, 500),
            e.fn.smartresize && e(window).smartresize(n),
                e(window).on("scroll", n);
        },
        mMenuToggle: function () {
            e(".mobile-menu-toggler").on("click", function (t) {
                e("body").toggleClass("mmenu-active"),
                    e(this).toggleClass("active"),
                    t.preventDefault();
            }),
                e(".mobile-menu-overlay, .mobile-menu-close").on("click", function (t) {
                    e("body").removeClass("mmenu-active"),
                        e(".menu-toggler").removeClass("active"),
                        t.preventDefault();
                });
        },
        mMenuIcons: function () {
            e(".mobile-menu")
                .find("li")
                .each(function () {
                    var t = e(this);
                    t.find("ul").length &&
                    e("<span/>", {
                        class: "mmenu-btn"
                    }).appendTo(t.children("a"));
                });
        },
        mobileMenu: function () {
            e(".mmenu-btn").on("click", function (t) {
                var i = e(this).closest("li"),
                    a = i.find("ul").eq(0);
                i.hasClass("open")
                    ? a.slideUp(300, function () {
                        i.removeClass("open");
                    })
                    : a.slideDown(300, function () {
                        i.addClass("open");
                    }),
                    t.stopPropagation(),
                    t.preventDefault();
            });
        },
        owlCarousels: function () {
            var t = {
                    loop: !0,
                    margin: 0,
                    responsiveClass: !0,
                    nav: !1,
                    navText: [
                        '<i class="icon-angle-left">',
                        '<i class="icon-angle-right">'
                    ],
                    dots: !0,
                    autoplay: !0,
                    autoplayTimeout: 15e3,
                    items: 1
                },
                i = function (i, a) {
                    var o;
                    (o = a ? e.extend(!0, {}, t, a) : t),
                    i.hasClass("nav-thin") &&
                    (o.navText = [
                        '<i class="icon-left-open-big">',
                        '<i class="icon-right-open-big">'
                    ]);
                    var n = i.data("owl-options");
                    "string" == typeof n &&
                    ((n = JSON.parse(n.replace(/'/g, '"').replace(";", ""))),
                        (o = e.extend(!0, {}, o, n))),
                        i.owlCarousel(o);
                },
                a = {
                    ".home-slider": {
                        lazyLoad: !0,
                        autoplay: !1,
                        dots: !1,
                        nav: !0,
                        autoplayTimeout: 12e3,
                        animateOut: "fadeOut",
                        navText: [
                            '<i class="icon-angle-left">',
                            '<i class="icon-angle-right">'
                        ],
                        loop: !0
                    },
                    ".testimonials-carousel": {
                        lazyLoad: !0,
                        autoHeight: !0,
                        responsive: {
                            992: {
                                items: 2
                            }
                        }
                    },
                    ".featured-products": {
                        loop: !1,
                        margin: 30,
                        autoplay: !1,
                        responsive: {
                            0: {
                                items: 2
                            },
                            700: {
                                items: 3,
                                margin: 15
                            },
                            1200: {
                                items: 4
                            }
                        }
                    },
                    ".cats-slider": {
                        loop: !1,
                        margin: 20,
                        autoplay: !1,
                        nav: !0,
                        dots: !1,
                        items: 2,
                        responsive: {
                            576: {
                                items: 3
                            },
                            992: {
                                items: 4
                            },
                            1200: {
                                items: 5
                            },
                            1400: {
                                items: 6
                            }
                        }
                    },
                    ".products-slider": {
                        loop: !1,
                        margin: 20,
                        autoplay: !1,
                        dots: !0,
                        items: 2,
                        responsive: {
                            576: {
                                items: 3
                            },
                            992: {
                                items: 4
                            }
                        }
                    },
                    ".categories-slider": {
                        loop: !1,
                        margin: 20,
                        autoplay: !1,
                        nav: !0,
                        dots: !1,
                        items: 2,
                        responsive: {
                            576: {
                                items: 3
                            },
                            992: {
                                items: 5
                            }
                        }
                    },
                    ".quantity-inputs": {
                        items: 2,
                        margin: 20,
                        dots: !1,
                        nav: !0,
                        responsive: {
                            992: {
                                items: 4
                            },
                            768: {
                                items: 3
                            }
                        },
                        onInitialized: function () {
                            this.$element.find(".horizontal-quantity").val(1);
                        }
                    },
                    ".banners-slider": {
                        dots: !0,
                        loop: !1,
                        margin: 20,
                        responsive: {
                            576: {
                                items: 2
                            },
                            992: {
                                items: 3
                            }
                        }
                    },
                    ".brands-slider": {
                        loop: !1,
                        margin: 20,
                        autoHeight: !0,
                        autoplay: !1,
                        dots: !1,
                        items: 2,
                        responsive: {
                            576: {
                                items: 4
                            },
                            768: {
                                items: 6
                            }
                        }
                    },
                    ".widget-featured-products": {
                        lazyLoad: !0,
                        nav: !0,
                        navText: [
                            '<i class="icon-angle-left">',
                            '<i class="icon-angle-right">'
                        ],
                        dots: !1,
                        autoHeight: !0
                    },
                    ".entry-slider": {
                        margin: 2,
                        lazyLoad: !0
                    },
                    ".related-posts-carousel": {
                        loop: !1,
                        margin: 30,
                        autoplay: !1,
                        responsive: {
                            480: {
                                items: 2
                            },
                            1200: {
                                items: 3
                            }
                        }
                    },
                    ".boxed-slider": {
                        lazyLoad: !0,
                        autoplayTimeout: 2e4,
                        animateOut: "fadeOut",
                        dots: !1
                    },
                    ".about-slider": {
                        margin: 2,
                        lazyLoad: !0
                    },
                    ".product-single-default .product-single-carousel": {
                        nav: !0,
                        dotsContainer: "#carousel-custom-dots",
                        autoplay: !1,
                        onInitialized: function () {
                            var t = this.$element;
                            e.fn.elevateZoom &&
                            t.find("img").each(function () {
                                var t = e(this),
                                    i = {
                                        responsive: !0,
                                        zoomWindowFadeIn: 350,
                                        zoomWindowFadeOut: 200,
                                        borderSize: 0,
                                        zoomContainer: t.parent(),
                                        zoomType: "inner",
                                        cursor: "grab"
                                    };
                                t.elevateZoom(i);
                            });
                        }
                    },
                    ".product-single-extended .product-single-carousel": {
                        dots: !1,
                        autoplay: !1,
                        center: !0,
                        items: 1,
                        responsive: {
                            768: {
                                items: 3
                            }
                        }
                    }
                };
            Object.keys(a).forEach(function (t) {
                e(t + ".owl-carousel").each(function () {
                    i(e(this), a[t]);
                });
            }),
                e(".owl-carousel").each(function () {
                    e(this).data("owl.carousel") || i(e(this), i);
                }),
                e(".home-slider").on("loaded.owl.lazy", function (t) {
                    e(t.element)
                        .closest(".home-slide")
                        .addClass("loaded"),
                        e(t.element)
                            .closest(".home-slider")
                            .addClass("loaded");
                }),
                e(".boxed-slider").on("loaded.owl.lazy", function (t) {
                    e(t.element)
                        .closest(".category-slide")
                        .addClass("loaded");
                }),
                e(".about-slider").on("loaded.owl.lazy", function (t) {
                    e(t.element)
                        .closest("div")
                        .addClass("loaded");
                }),
                e("#carousel-custom-dots .owl-dot").click(function () {
                    e(".product-single-carousel").trigger("to.owl.carousel", [
                        e(this).index(),
                        300
                    ]);
                });
        },
        filterSlider: function () {
            var t = document.getElementById("price-slider");
            null != t &&
            (noUiSlider.create(t, {
                start: [200, 700],
                connect: !0,
                step: 100,
                margin: 100,
                range: {
                    min: 0,
                    max: 1e3
                }
            }),
                t.noUiSlider.on("update", function (t, i) {
                    t = t.map(function (e) {
                        return "$" + e;
                    });
                    e("#filter-price-range").text(t.join(" - "));
                }));
        },
        stickySidebar: function () {
            e(".sidebar-wrapper, .sticky-slider").themeSticky({
                autoInit: !0,
                minWidth: 991,
                containerSelector: ".row, .container",
                autoFit: !0,
                paddingOffsetBottom: 10,
                paddingOffsetTop: 60
            });
        },
        countTo: function () {
            e.fn.countTo
                ? e.fn.waypoint
                ? e(".count").waypoint(
                    function () {
                        e(this.element).countTo();
                    },
                    {
                        offset: "90%",
                        triggerOnce: !0
                    }
                )
                : e(".count").countTo()
                : e(".count").each(function () {
                    var t = e(this),
                        i = t.data("to");
                    t.text(i);
                });
        },
        tooltip: function () {
            e.fn.tooltip &&
            e('[data-toggle="tooltip"]').tooltip({
                trigger: "hover focus"
            });
        },
        popover: function () {
            e.fn.popover &&
            e('[data-toggle="popover"]').popover({
                trigger: "focus"
            });
        },
        changePassToggle: function () {
            e("#change-pass-checkbox").on("change", function () {
                e("#account-chage-pass").toggleClass("show");
            });
        },
        changeBillToggle: function () {
            e("#change-bill-address").on("change", function () {
                e("#checkout-shipping-address").toggleClass("show"),
                    e("#new-checkout-address").toggleClass("show");
            });
        },
        catAccordion: function () {
            e(".catAccordion")
                .on("shown.bs.collapse", function (t) {
                    var i = e(t.target).closest("li");
                    i.hasClass("open") || i.addClass("open");
                })
                .on("hidden.bs.collapse", function (t) {
                    var i = e(t.target).closest("li");
                    i.hasClass("open") && i.removeClass("open");
                });
        },
        scrollBtnAppear: function () {
            e(window).scrollTop() >= 400
                ? e("#scroll-top").addClass("fixed")
                : e("#scroll-top").removeClass("fixed");
        },
        scrollToTop: function () {
            e("#scroll-top").on("click", function (t) {
                e("html, body").animate(
                    {
                        scrollTop: 0
                    },
                    1200
                ),
                    t.preventDefault();
            });
        },
        newsletterPopup: function () {
            e.magnificPopup.open({
                items: {
                    src: "#newsletter-popup-form"
                },
                type: "inline",
                mainClass: "mfp-newsletter",
                removalDelay: 350
            });
        },
        lightBox: function () {
            document.getElementById("newsletter-popup-form") &&
            setTimeout(function () {
                var i = e.magnificPopup.instance;
                i.isOpen
                    ? (i.close(),
                        setTimeout(function () {
                            t.newsletterPopup();
                        }, 360))
                    : t.newsletterPopup();
            }, 1e4);
            var i = [],
                a = e(
                    0 === e(".product-single-carousel .owl-item:not(.cloned) img").length
                        ? ".product-single-gallery img"
                        : ".product-single-carousel .owl-item:not(.cloned) img"
                );
            a.each(function () {
                i.push({
                    src: e(this).attr("data-zoom-image")
                });
            }),
                e(".prod-full-screen").click(function (t) {
                    var o;
                    (o = t.currentTarget.closest(".product-slider-container")
                        ? (e(".product-single-carousel")
                            .data("owl.carousel")
                            .current() +
                        a.length -
                        Math.ceil(a.length / 2)) %
                        a.length
                        : e(t.currentTarget)
                            .closest(".product-item")
                            .index()),
                        e.magnificPopup.open(
                            {
                                items: i,
                                navigateByImgClick: !0,
                                type: "image",
                                gallery: {
                                    enabled: !0
                                }
                            },
                            o
                        );
                }),
                e("body").on("click", "a.btn-quickview", function (i) {
                    i.preventDefault(), t.ajaxLoading();
                    var a = e(this).attr("href");
                    setTimeout(function () {
                        e.magnificPopup.open({
                            type: "ajax",
                            mainClass: "mfp-ajax-product",
                            tLoading: "",
                            preloader: !1,
                            removalDelay: 350,
                            items: {
                                src: a
                            },
                            callbacks: {
                                open: function () {
                                    if (e(".sticky-header.fixed")) {
                                        var t =
                                            Number(
                                                e(".sticky-header.fixed")
                                                    .css("margin-right")
                                                    .slice(0, -2)
                                            ) +
                                            17 +
                                            "px";
                                        e(".sticky-header.fixed").css("margin-right", t),
                                            e(".sticky-header.fixed-nav").css("margin-right", t),
                                            e("#scroll-top").css("margin-right", t);
                                    }
                                },
                                ajaxContentAdded: function () {
                                    t.owlCarousels(),
                                        t.quantityInputs(),
                                        "undefined" != typeof addthis
                                            ? addthis.layers.refresh()
                                            : e.getScript(
                                            "https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5b927288a03dbde6"
                                            );
                                },
                                beforeClose: function () {
                                    e(".ajax-overlay").remove();
                                },
                                afterClose: function () {
                                    if (e(".sticky-header.fixed")) {
                                        var t =
                                            Number(
                                                e(".sticky-header.fixed")
                                                    .css("margin-right")
                                                    .slice(0, -2)
                                            ) -
                                            17 +
                                            "px";
                                        e(".sticky-header.fixed").css("margin-right", t),
                                            e(".sticky-header.fixed-nav").css("margin-right", t),
                                            e("#scroll-top").css("margin-right", t);
                                    }
                                }
                            },
                            ajax: {
                                tError: ""
                            }
                        });
                    }, 500);
                });
        },
        productTabSroll: function () {
            e(".rating-link").on("click", function (t) {
                if (e(".product-single-tabs").length)
                    e("#product-tab-reviews").tab("show");
                else {
                    if (!e(".product-single-collapse").length) return;
                    e("#product-reviews-content").collapse("show");
                }
                e("#product-reviews-content").length &&
                setTimeout(function () {
                    var t = e("#product-reviews-content").offset().top - 60;
                    e("html, body")
                        .stop()
                        .animate(
                            {
                                scrollTop: t
                            },
                            800
                        );
                }, 250),
                    t.preventDefault();
            });
        },
        quantityInputs: function () {
            e.fn.TouchSpin &&
            (e(".vertical-quantity").TouchSpin({
                verticalbuttons: !0,
                verticalup: "",
                verticaldown: "",
                verticalupclass: "icon-up-dir",
                verticaldownclass: "icon-down-dir",
                buttondown_class: "btn btn-outline",
                buttonup_class: "btn btn-outline",
                initval: 1,
                min: 1
            }),
                e(".horizontal-quantity").TouchSpin({
                    verticalbuttons: !1,
                    buttonup_txt: "",
                    buttondown_txt: "",
                    buttondown_class: "btn btn-outline btn-down-icon",
                    buttonup_class: "btn btn-outline btn-up-icon",
                    initval: 1,
                    min: 1
                }));
        },
        ajaxLoading: function () {
            e("body").append(
                "<div class='ajax-overlay'><i class='porto-loading-icon'></i></div>"
            );
        },
        wordRotate: function () {
            e(".word-rotater").each(function () {
                e(this).Morphext({
                    animation: "bounceIn",
                    separator: ",",
                    speed: 2e3
                });
            });
        },
        ajaxLoadProduct: function () {
            var t = 0;
            i.click(function (a) {
                a.preventDefault(),
                    e(this).text("Loading ..."),
                    e.ajax({
                        url: "ajax/category-ajax-products.html",
                        success: function (a) {
                            var o = e(a);
                            setTimeout(function () {
                                o
                                    .hide()
                                    .appendTo(".product-ajax-grid")
                                    .fadeIn(),
                                    i.text("Load More"),
                                ++t >= 2 && i.hide();
                            }, 350);
                        },
                        failure: function () {
                            i.text("Sorry something went wrong.");
                        }
                    });
            });
        },
        toggleFilter: function () {
            e(".filter-toggle a").click(function (t) {
                t.preventDefault(),
                    e(".filter-toggle").toggleClass("opened"),
                    e("main").toggleClass("sidebar-opened");
            }),
                e(".sidebar-overlay").click(function (t) {
                    e(".filter-toggle").removeClass("opened"),
                        e("main").removeClass("sidebar-opened");
                }),
                e(".sort-menu-trigger").click(function (t) {
                    t.preventDefault(),
                        e(".select-custom").removeClass("opened"),
                        e(t.target)
                            .closest(".select-custom")
                            .toggleClass("opened");
                });
        },
        toggleSidebar: function () {
            e(".sidebar-toggle").click(function () {
                e("main").toggleClass("sidebar-opened");
            });
        },
        scrollToElement: function () {
            e('.scrolling-box a[href^="#"]').on("click", function (t) {
                var i = e(this.getAttribute("href"));
                i.length &&
                (t.preventDefault(),
                    e("html, body")
                        .stop()
                        .animate(
                            {
                                scrollTop: i.offset().top - 90
                            },
                            700
                        ));
            });
        },
        loginPopup: function () {
            e(".login-link").click(function (i) {
                i.preventDefault(), t.ajaxLoading();
                setTimeout(function () {
                    e.magnificPopup.open({
                        type: "ajax",
                        mainClass: "login-popup",
                        tLoading: "",
                        preloader: !1,
                        removalDelay: 350,
                        items: {
                            src: "ajax/login-popup.html"
                        },
                        callbacks: {
                            open: function () {
                                if (e(".sticky-header.fixed")) {
                                    var t =
                                        Number(
                                            e(".sticky-header.fixed")
                                                .css("margin-right")
                                                .slice(0, -2)
                                        ) +
                                        17 +
                                        "px";
                                    e(".sticky-header.fixed").css("margin-right", t),
                                        e(".sticky-header.fixed-nav").css("margin-right", t),
                                        e("#scroll-top").css("margin-right", t);
                                }
                            },
                            beforeClose: function () {
                                e(".ajax-overlay").remove();
                            },
                            afterClose: function () {
                                if (e(".sticky-header.fixed")) {
                                    var t =
                                        Number(
                                            e(".sticky-header.fixed")
                                                .css("margin-right")
                                                .slice(0, -2)
                                        ) -
                                        17 +
                                        "px";
                                    e(".sticky-header.fixed").css("margin-right", t),
                                        e(".sticky-header.fixed-nav").css("margin-right", t),
                                        e("#scroll-top").css("margin-right", t);
                                }
                            }
                        },
                        ajax: {
                            tError: ""
                        }
                    });
                }, 1500);
            });
        },
        modalView: function () {
            $(".btn-add-cart").on("click", function (t) {
                let data = JSON.parse($(this).val());
                updateCart(data);
                if (
                    (e(".add-cart-box #productImage").attr(
                        "src",
                        e(this)
                            .parents(".product-default")
                            .find("figure img")
                            .attr("src")
                    ),
                        e(".add-cart-box #productTitle").text(
                            e(this)
                                .parents(".product-default")
                                .find(".product-title")
                                .text()
                        ),
                        e(".sticky-header.fixed").css("margin-right"))
                ) {
                    var i =
                        Number(
                            e(".sticky-header.fixed")
                                .css("margin-right")
                                .slice(0, -2)
                        ) +
                        17 +
                        "px";
                    e(".sticky-header.fixed").css("margin-right", i),
                        e(".sticky-header.fixed-nav").css("margin-right", i),
                        e("#scroll-top").css("margin-right", i);
                }
            }),
                e(".modal#addCartModal").on("hidden.bs.modal", function (t) {
                    if (e(".sticky-header.fixed").css("margin-right")) {
                        var i =
                            Number(
                                e(".sticky-header.fixed")
                                    .css("margin-right")
                                    .slice(0, -2)
                            ) -
                            17 +
                            "px";
                        e(".sticky-header.fixed").css("margin-right", i),
                            e(".sticky-header.fixed-nav").css("margin-right", i),
                            e("#scroll-top").css("margin-right", i);
                    }
                });
        },
        productManage: function () {
            e(".product-select").click(function (t) {
                e(this)
                    .parents(".product-default")
                    .find("figure img")
                    .attr("src", e(this).data("src")),
                    e(this)
                        .addClass("checked")
                        .siblings()
                        .removeClass("checked");
            });
        },
        ratingTooltip: function () {
            e(".product-ratings").hover(function (t) {
                var i =
                    (e(this)
                            .find(".ratings")
                            .width() /
                        e(this).width()) *
                    5;
                e(this)
                    .find(".tooltiptext")
                    .text(i ? i.toFixed(2) : i);
            });
        },
        windowClick: function () {
            e(document).click(function (t) {
                e(t.target).closest(".toolbox-item.select-custom").length ||
                e(".select-custom").removeClass("opened");
            });
        },
        popupMenu: function () {
            if (!(e(".popup-menu").length <= 0)) {
                var t = e(".popup-menu-ul"),
                    i = t.parent().width() - t.children().width();
                i >= 0 && t.css("margin-right", "-" + i + "px"),
                    t.css("margin-top", i + "px"),
                    e(".popup-menu-toggler").on("click", function (t) {
                        t.preventDefault(),
                            e(this)
                                .siblings(".popup-menu")
                                .addClass("open"),
                            e(document).on("keydown.popup-menu", function (t) {
                                "Escape" == t.key &&
                                (e(".popup-menu").removeClass("open"),
                                    e(document).off("keydown.popup-menu"));
                            });
                    }),
                    e("body").on("click", ".popup-menu-close", function (t) {
                        e(".popup-menu").removeClass("open"),
                            e(document).off("keydown.popup-menu"),
                            t.preventDefault();
                    }),
                    e("body").on("click", ".popup-menu a", function (t) {
                        var i = e(this).siblings("ul");
                        i.length > 0 && (i.toggleClass("open"), t.preventDefault());
                    });
            }
        },
        headerSearchToggle: function () {
            e(".header-search").length &&
            e("body")
                .on("click", ".header-search", function (e) {
                    e.stopPropagation();
                })
                .on("click", ".search-toggle", function (t) {
                    var i = e(this).closest(".header-search");
                    i.toggleClass("show"),
                        e(".header-search-wrapper").toggleClass("show"),
                    i.hasClass("show") && i.find("input.a-control").focus(),
                        t.preventDefault();
                })
                .on("click", function (t) {
                    e(".header-search").removeClass("show"),
                        e(".header-search-wrapper").removeClass("show"),
                        e("body").removeClass("is-search-active");
                });
            var t = function () {
                e(".header-search").each(function () {
                    var t = e(this);
                    t.find(".header-search-wrapper").css(
                        e(window).width() < 576
                            ? {
                                left: 15 - t.offset().left + "px",
                                right:
                                    15 + t.offset().left + t.width() - e(window).width() + "px"
                            }
                            : {
                                left: "",
                                right: ""
                            }
                    );
                });
            };
            t(),
                e.fn.smartresize ? e(window).smartresize(t) : e(window).on("resize", t);
        },
        parallax: function () {
            var i = e("[data-parallax]"),
                a = {
                    speed: 1.5,
                    horizontalPosition: "50%",
                    offset: 0,
                    enableOnMobile: !0
                };
            i.length &&
            i.each(function () {
                var i = e(this),
                    o = i.data("parallax");
                o && (o = JSON.parse(o.replace(/'/g, '"').replace(";", "")));
                var n,
                    s,
                    r,
                    l,
                    c = e.extend(!0, {}, a, o),
                    d = e(window);
                l = e('<div class="parallax-background"></div>');
                var u = i.data("image-src")
                    ? "url(" + i.data("image-src") + ")"
                    : i.css("background-image");
                if (
                    (l.css({
                        "background-image": u,
                        "background-size": "cover",
                        "background-position": "50% 0%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: 100 * c.speed + "%"
                    }),
                        i.prepend(l),
                        i.css({
                            position: "relative",
                            overflow: "hidden"
                        }),
                    !t.mobile || c.enableOnMobile)
                ) {
                    var p = function () {
                        (n = i.offset()),
                            (s = -(d.scrollTop() - (n.top - 100)) / (c.speed + 2)),
                            (r = s < 0 ? Math.abs(s) : -Math.abs(s)),
                            l.css({
                                transform: "translate3d(0, " + (r - 50 + c.offset) + "px, 0)",
                                "background-position-x": c.horizontalPosition
                            });
                    };
                    e(window).on("scroll resize", p), p();
                } else i.addClass("parallax-disabled");
            });
        },

        appearMap:function(){
            function initialize() {
                var mapProp = {
                    center:new google.maps.LatLng(31.523083,74.306576),
                    zoom:15,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                };
                var map=new google.maps.Map(document.getElementById("map"), mapProp);
            }
            google.maps.event.addDomListener(window, 'load', initialize);
        },
        appearAnimate: function () {
            if (e.fn.appear) {
                var t = new Array();
                e('.owl-item [data-animation-name="splitRight"]').each(function () {
                    var t = e(this).text(),
                        i = e(this).data("animation-delay")
                            ? e(this).data("animation-delay")
                            : "0";
                    e(this).text("");
                    for (var a = t.length - 1; a >= 0; a--)
                        e(this).prepend(
                            '<div class="d-inline-block appear-animate" data-animation-delay="' +
                            (i + 90 * a) +
                            '">' +
                            (" " === t[a] ? "&nbsp" : t[a]) +
                            "</div>"
                        );
                }),
                    e(".appear-animate").each(function () {
                        e(this).hasClass("animated") ||
                        e(this).appear(
                            function () {
                                var i = e(this);
                                if (
                                    !(
                                        i.closest(".owl-carousel.slide-animate").length > 0 &&
                                        0 === i.closest(".owl-item.active").length
                                    )
                                ) {
                                    var a, o, n;
                                    (a = i.data("animation-name")
                                        ? i.data("animation-name")
                                        : "fadeIn"),
                                        (n = i.data("animation-duration")
                                            ? i.data("animation-duration")
                                            : "750"),
                                        (o = i.data("animation-delay")
                                            ? i.data("animation-delay")
                                            : "0"),
                                        i.addClass(a),
                                        i.css("animationDelay", o + "ms"),
                                        i.css("animationDuration", n + "ms"),
                                        i.addClass("animated");
                                    var s = setTimeout(function () {
                                        i.addClass("appear-animation-visible");
                                    }, parseInt(o || 0));
                                    i.closest(".owl-carousel.slide-animate").length > 0 &&
                                    t.push(s);
                                }
                            },
                            {
                                accX: e(this).data("x") ? e(this).data("x") : 0,
                                accY: e(this).data("y") ? e(this).data("y") : -50
                            }
                        );
                    }),
                    e(".owl-carousel.slide-animate").each(function () {
                        var i;
                        e(this).on("translate.owl.carousel", function (t) {
                            i = e(this).find(".owl-item.active");
                        }),
                            e(this).on("translated.owl.carousel", function (a) {
                                var o = e(this);
                                if (e(this).find(".owl-item.active")[0] !== i[0]) {
                                    for (var n = 0; n < t.length; n++) clearTimeout(t[n]);
                                    (t = t.splice()),
                                        i
                                            .find(".appear-animate")
                                            .removeClass("appear-animation-visible"),
                                        i.find(".appear-animate").css("animationDelay", ""),
                                        i.find(".appear-animate").css("animationDuration", ""),
                                        i.find(".appear-animate").removeClass("animated"),
                                        i.find(".appear-animate").each(function () {
                                            var t,
                                                i = e(this);
                                            (t = i.data("animation-name")
                                                ? i.data("animation-name")
                                                : "fadeIn"),
                                                i.removeClass(t);
                                        });
                                }
                                o.find(".owl-item.active .appear-animate").each(function () {
                                    var i,
                                        a,
                                        o,
                                        n = e(this);
                                    (i = n.data("animation-name")
                                        ? n.data("animation-name")
                                        : "fadeIn"),
                                        (o = n.data("animation-duration")
                                            ? n.data("animation-duration")
                                            : "750"),
                                        (a = n.data("animation-delay")
                                            ? n.data("animation-delay")
                                            : "0"),
                                        n.addClass(i),
                                    "splitRight" != i &&
                                    (n.css("animationDelay", a + "ms"),
                                        n.css("animationDuration", o + "ms")),
                                        n.addClass("animated");
                                    var s = setTimeout(function () {
                                        n.addClass("appear-animation-visible");
                                    }, parseInt(a || 0));
                                    t.push(s);
                                });
                            });
                    });
            }
        },
        isotopes: function () {
            var t = {
                itemsSelector: ".grid-item",
                masonry: {
                    columnWidth: ".grid-col-sizer"
                },
                percentPosition: !0,
                sortBy: "original-order",
                getSortData: {
                    "md-order": "[data-md-order] parseInt"
                },
                sortReorder: !1
            };
            e(".grid").each(function () {
                var i = e(this),
                    a = i.data("grid-options");
                a && (a = JSON.parse(a.replace(/'/g, '"').replace(";", "")));
                var o = e.extend(!0, {}, t, a),
                    n = i.isotope(o);
                if (o.sortReorder) {
                    var s = function () {
                        var t = e(window).width();
                        n.isotope({
                            sortBy: t < 768 && t > 400 ? "md-order" : "original-order"
                        });
                    };
                    e.fn.smartresize
                        ? e(window).smartresize(s)
                        : e(window).on("resize", s);
                }
            });
        }
    };
    e("body").prepend(
        '<div class="loading-overlay"><div class="bounce-loader"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div></div>'
    );
    var i = e(".loadmore .btn");
    jQuery(document).ready(function () {
        t.init();
    }),
        e(window).on("load", function () {
            e("body").addClass("loaded"), t.scrollBtnAppear();
        }),
        e(window).on("scroll", function () {
            t.scrollBtnAppear();
        });
})(jQuery);
