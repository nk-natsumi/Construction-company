$(document).ready(function () {
    $(".menu-trigger").click(function () {
        $(this).toggleClass("active");
        $(".header__nav, .overlay").toggleClass("active");

    })




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
