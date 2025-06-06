$(document).ready(function () {
    $(".menu-trigger").click(function () {
        $(this).toggleClass("active");
        $(".header__nav, .overlay").toggleClass("active");

    })

    const swiper = new Swiper(".swiper", {
        loop: true, // ループ有効
        slidesPerView: 3, // 一度に表示する枚数
        speed: 6000, // ループの時間
        spaceBetween: 48,
        allowTouchMove: false, // スワイプ無効
        autoplay: {
          delay: 0, // 途切れなくループ
        },
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
