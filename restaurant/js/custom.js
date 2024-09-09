var baseUrl = 'http://localhost:8081'
let clientSession = localStorage.getItem('RestaurantClient')?localStorage.getItem('RestaurantClient'):false;
clientSession = JSON.parse(clientSession);
var orders = localStorage.getItem('RestaurantClientOrder')?JSON.parse(localStorage.getItem('RestaurantClientOrder')):[];
$('#cartBadge').html(orders.length);

if(!clientSession){
    $('#btnLogIn').show();
    $('#btnLogOut').hide();
}else{
    $('#btnLogIn').hide();
    $('#btnLogOut').show();
}

$(document).on('click', '#btnLogIn', function(){
    location.assign('signin.html');
})
$(document).on('click', '#btnLogOut', function(){
    localStorage.removeItem('RestaurantClient');
    location.assign(`index.html`);
})

$(document).on('click', '.addCart', function(){
    var k = $(this).attr('id');
    var product = productsData[k];
    product.qty = 1;
    
    orders.push(product);
    
    localStorage.setItem('RestaurantClientOrder', JSON.stringify(orders));
    $('#cartBadge').html(orders.length);
})

// to get current year
function getYear() {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();


// isotope js
$(window).on('load', function () {
    // $('.filters_menu li').click(function () {
    //     $('.filters_menu li').removeClass('active');
    //     $(this).addClass('active');

    //     var data = $(this).attr('data-filter');
    //     $grid.isotope({
    //         filter: data
    //     })
    // });

    // var $grid = $(".grid").isotope({
    //     itemSelector: ".all",
    //     percentPosition: false,
    //     masonry: {
    //         columnWidth: ".all"
    //     }
    // })
});

// nice select
$(document).ready(function() {
    $('select').niceSelect();
  });

/** google_map js **/
function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

// client section owl carousel
$(".client_owl-carousel").owlCarousel({
    loop: true,
    margin: 0,
    dots: false,
    nav: true,
    navText: [],
    autoplay: true,
    autoplayHoverPause: true,
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});