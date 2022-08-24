$(document).ready(function(){
    $('#carrossel').slick({
        centerMode: true,
        centerPadding: '10px',
        slidesToShow: 3.01,
        slidesToScroll: 1.09,
        // infinite: false,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: '<div class="prev-btn"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
        nextArrow: '<div class="next-btn"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '135px',
                    slidesToShow: 1.3
                }
            },
            {
                breakpoint: 660,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '90px',
                    slidesToShow: 1.2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 1.03
                }
            },
            {
                breakpoint: 400,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '4px',
                    slidesToShow: 1.01
                }
            }
        ]
    });



    $('.tipos_ofc').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        prevArrow: '<div class="prev-btn" id="prev-ofc"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
        nextArrow: '<div class="next-btn" id="next-ofc"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 660,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 2.5,
                    slidesToScroll: 2.7
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    // centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    arrows: false,
                    // centerMode: true,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            }
        ]
      });

      $('.produtos_destaque').slick({
        slidesToShow: 6,
        slidesToScroll: 6,
        prevArrow: '<div class="prev-btn" id="prev-ofc"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
        nextArrow: '<div class="next-btn" id="next-ofc"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 660,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '10px',
                    slidesToShow: 2.5,
                    slidesToScroll: 2.7
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    // centerMode: true,
                    slidesToShow: 2,
                    // slidesToShow: 1.62,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 400,
                settings: {
                    arrows: false,
                    // centerMode: true,
                    slidesToShow: 2,
                    // slidesToShow: 1.32,
                    slidesToScroll: 2
                }
            }
        ]
      });
})