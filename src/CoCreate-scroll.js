// SHOW/HIDE NAV on scroll
var didScroll;
var lastScrollTop = 0;
var lastScrollTop1 = 0;

var delta = 3;
var navbar = document.querySelector('.nav');

// var navbarHeight;
// if (navbar) {
//   navbarHeight = navbar.clientHeight;  
// }



window.addEventListener('scroll', function(e) {
  
// 	var body = document.querySelector('body');
  var st = window.scrollY;
  // console.log(st, window.scrollY);
  var scrollEl = document.querySelector('.nav');
  var toggleEl = document.querySelector('.nav-toggle');

  if(scrollEl == null)
  {
    return false;
  }

  var dataScrollEffect = scrollEl.getAttribute('data-scroll_effect');
  var dataScrollPosition = scrollEl.getAttribute('data-scroll_position');
  var dataScrollUp = scrollEl.getAttribute('data-scroll_up');
  var dataScrollDown = scrollEl.getAttribute('data-scroll_down');
  
  
  if (Math.abs(st - lastScrollTop1) <= delta) {
    return; 
  }

  if(st >= dataScrollPosition){
    if(scrollEl && !scrollEl.classList.contains(dataScrollEffect))
      scrollEl.classList.add(dataScrollEffect);
    
    if(toggleEl && toggleEl.classList.contains('open'))
      toggleEl.classList.remove('open');
  }else{
    if(scrollEl && scrollEl.classList.contains(dataScrollEffect))
      scrollEl.classList.remove(dataScrollEffect);
    
    if(toggleEl && !toggleEl.classList.contains('open'))
      toggleEl.classList.add('open');    
  }

  console.log(st - lastScrollTop1);
    
  if (st > lastScrollTop1){
    if(Math.abs(st - lastScrollTop1) >= dataScrollDown && scrollEl.classList.contains('scroll-show-nav'))
        scrollEl.classList.remove('scroll-show-nav');
  }else {
  if(Math.abs(st - lastScrollTop1) >= dataScrollUp && !scrollEl.classList.contains('scroll-show-nav'))
    scrollEl.classList.add('scroll-show-nav');
 }
   
  lastScrollTop1 = st;
})

//show scroll on scroll
window.addEventListener('load', function() {
  	var timer = undefined;
    var els = document.querySelectorAll('.cocreate-scroll');
    for (var i=0; i < els.length; i++) {
		    els[i].addEventListener('scroll', function(e) {
		    	var el = e.target;
			    (function(el){
			      el.classList.add('scroll');
			      clearTimeout(timer);
			      timer = setTimeout(function() {
			        el.classList.remove('scroll');
			      }, 250);
			    })(el);
		    });//end eventListener
    }//end for
});

// var didScroll;
// var lastScrollTop = 0;
// var delta = 5;
// var navbarHeight = $('.nav').outerHeight();

// $(window).scroll(function(event){
//     didScroll = true;
// });

// setInterval(function() {
//     if (didScroll) {
//         hasScrolled();
//         didScroll = false;
//     }
// }, 250);

// function hasScrolled() {
//     var st = $(this).scrollTop();

//     // Make sure they scroll more than delta
//     if(Math.abs(lastScrollTop - st) <= delta)
//         return;

//     // If they scrolled down and are past the navbar, add class .nav-up.
//     // This is necessary so you never see what is "behind" the navbar.
//     if (st > lastScrollTop && st > navbarHeight){
//         // Scroll Down
//         $('.nav').removeClass('show-nav').addClass('hide-nav');
//         // $('.nav-toggle').removeClass('open');
//         // $('.menu-left').removeClass('collapse');
//     } else {
//         // Scroll Up
//         if(st + $(window).height() < $(document).height()) {
//             $('.nav').removeClass('hide-nav').addClass('show-nav');
//         }
//     }

//     lastScrollTop = st;
// }
