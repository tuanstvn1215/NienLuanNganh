$(window).scroll(function () {
    let header__bottom = document.getElementsByClassName('header--bottom')[0]
    if (window.pageYOffset > 30) {
        header__bottom.style.position = 'fixed'
        header__bottom.style.top = '0px'
    } else {
        header__bottom.style.top = '0px'
        header__bottom.style.position = 'relative'
    }
})
$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 150) {
            $('.goToTop').fadeIn()
        } else {
            $('.goToTop').fadeOut()
        }
    })

    // scroll body to 0px on click
    $('.goToTop').click(function () {
        $('body,html').animate(
            {
                scrollTop: 0,
            },
            1000
        )
        return false
    })
})
