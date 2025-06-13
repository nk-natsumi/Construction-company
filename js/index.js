$(document).ready(function () {
    $(".menu-trigger").click(function () {
        $(this).toggleClass("active");
        $(".header__nav,.header__item , .header__sp-menu .header__link-title  , .header__sub-menu , .header__item-more").toggleClass("active");

    })


    /* ナビリンククリックでスクロール＆メニューを閉じる */
    $(".page__nav a").click(function (e) {
        const targetId = $(this).attr("href");
        const target = $(targetId);

        if (target.length) {
            e.preventDefault();
            $("html, body").animate(
                {
                    scrollTop: target.offset().top
                },
                600
            );
        }
    });


    /* スクロールでfade-in */
    $(window).on("scroll", function () {
        $(".fade-in-up").each(function () {
            const elemPos = $(this).offset().top;
            const scroll = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (scroll > elemPos - windowHeight + 200) {
                $(this).addClass("active");
            }
        });
    });

    $(window).trigger("scroll");




    const swiper = new Swiper(".swiper", {
        loop: true, // ループ有効
        slidesPerView: 1.8, // 一度に表示する枚数
        speed: 6000, // ループの時間
        spaceBetween: 16,
        allowTouchMove: false, // スワイプ無効
        autoplay: {
            delay: 0, // 途切れなくループ
        },


        breakpoints: {
            767: {
                slidesPerView: 2.25,
                spaceBetween: 24,
            },

            1024: {
                slidesPerView: 2.75,
                spaceBetween: 48,
            }
        }
    });



    // レスポンシブの375px未満のviewport画面幅を固定
    const viewport = document.querySelector('meta[name="viewport"]');
    function switchViewport() {
        const value =
            window.outerWidth > 375
                ? 'width=device-width,initial-scale=1'
                : 'width=375';
        if (viewport.getAttribute('content') !== value) {
            viewport.setAttribute('content', value);
        }
    }
    addEventListener('resize', switchViewport, false);
    switchViewport();


    /* モーダル */
    MicroModal.init({
        openClass: 'is-open',
        disableScroll: true,
        onShow: (modal) => {
            const container = modal.querySelector('.modal__container');
            if (container) {
                container.scrollTop = 0;
            }
        }
    });

});



// セッションストレージからフラグを取得
const isFirstLoad = sessionStorage.getItem('isFirstLoad');

// ページの読み込みが完了したときに実行される関数
window.addEventListener('load', function () {
    // フラグが 'true' でない場合（初回アクセス時またはフラグが削除された場合）
    if (isFirstLoad !== 'true') {
        // ローディング画面を表示
        const loadingElement = document.querySelector('.loading');
        loadingElement.classList.add('active');

        // 2秒後にローディング画面を非表示にする
        setTimeout(function () {
            // ローディング画面を非表示にする
            loadingElement.classList.remove('active');
            // コンテンツ要素を表示
            const contentsElement = document.querySelector('.contents.hidden');
            contentsElement.classList.remove('hidden'); // hiddenクラスを取り除くことでコンテンツを表示
            // セッションストレージにフラグを保存
            sessionStorage.setItem('isFirstLoad', 'true');
        }, 2000);
        setTimeout(function () {
            loadingElement.style.display = 'none'; // 非表示にする
        }, 2500);
    } else {
        // 2回目以降のアクセス時の処理を記述
        // コンテンツ要素を表示
        const contentsElement = document.querySelector('.contents.hidden');
        contentsElement.classList.remove('hidden'); // hiddenクラスを取り除くことでコンテンツを表示
    }
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

