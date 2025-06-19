// メニューの開閉
$(document).ready(function () {
    const isSPView = () => window.innerWidth <= 768;

    function getHeaderHeight() {
        return isSPView() ? $(".header").outerHeight() : 0;
    }

    // ハンバーガーメニュー切り替え
    $(".menu-trigger").click(function () {
        $(this).toggleClass("active");
        $(".header__nav").toggleClass("active");
        $("body").toggleClass("active");
    });

    // ヘッダー内リンククリック処理
    $(".header__item a").on("click", function (e) {
        const href = $(this).attr("href");
        const isAnchor = href.startsWith("#") || href.startsWith(location.pathname + "#") || href.startsWith("./#");

        if (isAnchor) {
            e.preventDefault();

            const anchorId = href.split("#")[1];
            const target = $("#" + anchorId);

            if (target.length) {
                $("html, body").animate({
                    scrollTop: target.offset().top - getHeaderHeight()
                }, 600);
            }

            $(".menu-trigger, .header__nav, body").removeClass("active");
        }
    });


    $('.header__link-group').hover(
        function () {
            $(this).find('.header__sub-menu').stop(true, true).slideDown(600);
        },
        function () {
            $(this).find('.header__sub-menu').stop(true, true).slideUp(600);
        }
    );


    // ロード時のハッシュスクロール
    $(window).on("load", function () {
        const hash = location.hash;

        if (hash) {
            $("html, body").scrollTop(0);

            setTimeout(function () {
                const target = $(hash);
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - getHeaderHeight()
                    }, 600);
                }
            }, 100);
        }
    });

    // ページナビリンククリック時のスクロール
    $(".page__nav a").click(function (e) {
        const targetId = $(this).attr("href");
        const target = $(targetId);

        if (target.length) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: target.offset().top - getHeaderHeight()
            }, 600);
        }
    });

    // スクロールでフェードイン
    $(window).on("scroll", function () {
        $(".fade-in-up").each(function () {
            const elemTop = $(this).offset().top;
            const scroll = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (scroll > elemTop - windowHeight + 250) {
                $(this).addClass("active");
            }
        });
    });

    $(window).trigger("scroll");

    // スクロールダウンボタン
    $('.scroll-down').on('click', function (e) {
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - getHeaderHeight()
            }, 600);
        }
    });

    // Swiper 初期化
    const swiper = new Swiper(".swiper", {
        loop: true,
        slidesPerView: 1.8,
        speed: 6000,
        spaceBetween: 16,
        allowTouchMove: false,
        autoplay: {
            delay: 0
        },
        breakpoints: {
            767: {
                slidesPerView: 2.25,
                spaceBetween: 24
            },
            1024: {
                slidesPerView: 2.75,
                spaceBetween: 48
            }
        }
    });

    // viewport幅固定処理
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
        const value = window.outerWidth > 375
            ? 'width=device-width,initial-scale=1'
            : 'width=375';
        if (viewport.getAttribute('content') !== value) {
            viewport.setAttribute('content', value);
        }
    }
    addEventListener('resize', switchViewport, false);
    switchViewport();

    // モーダル初期化
    MicroModal.init({
        openClass: 'is-open',
        disableScroll: true,
        onShow: (modal) => {
            const container = modal.querySelector('.modal__container');
            if (container) container.scrollTop = 0;
        }
    });

});

$(document).ready(function () {
    const $form = $('.contact__form');
    const $submitBtn = $('#submit');

    $form.on('input change', function () {
        const isRadioChecked = $form.find('input[type="radio"]:checked').length > 0;
        const isTextFilled = $form.find('input[type="text"]').filter(function () {
            return $(this).val().trim() === '';
        }).length === 0;
        const isEmailFilled = $form.find('input[type="email"]').val().trim() !== '';
        const isAddressFilled = $form.find('input[name="address"]').val().trim() !== '';
        const isChecked = $('#confirmationCheck').is(':checked');

        if (isRadioChecked && isTextFilled && isEmailFilled && isAddressFilled && isChecked) {
            $submitBtn.prop('disabled', false);
        } else {
            $submitBtn.prop('disabled', true);
        }
    });
});

// ローディング画面表示（初回のみ）
window.addEventListener('load', function () {
    const isFirstLoad = sessionStorage.getItem('isFirstLoad');
    const loadingElement = document.querySelector('.loading');
    const contentsElement = document.querySelector('.contents.hidden');

    if (isFirstLoad !== 'true') {
        loadingElement.classList.add('active');
        setTimeout(() => {
            loadingElement.classList.remove('active');
            contentsElement.classList.remove('hidden');
            sessionStorage.setItem('isFirstLoad', 'true');
        }, 2000);
        setTimeout(() => {
            loadingElement.style.display = 'none';
        }, 2500);
    } else {
        contentsElement.classList.remove('hidden');
    }
});



