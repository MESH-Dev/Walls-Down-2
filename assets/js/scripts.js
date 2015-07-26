  /*------------------PANEL SCROLLING-----------------*/
 
$(document).ready(function() {
 
  //Initialize Slider
  Slider = $('#slider').Swipe({
    continuous: false,
    disableScroll: false,
    stopPropagation: false,
     transitionEnd: function(index, elem) { //set new hash after transistion
        var this_hash = $(elem).attr('id');
 
       window.location.hash = this_hash; //~~~~~~~~~THIS IS CAUSING AN ERROR!!!!~~~~~~
     }
  }).data('Swipe');

  $('.next').on('click', Slider.next);
  $('.prev').on('click', Slider.prev);
 
  //Initialize Sidebar Menu based on screensize. Maybe change based on device?
  var width = $( window ).width();
    if(width < 768){
      $.slidebars({
        scrollLock: false,
        siteClose: true
      });
    }
    else{
       $.slidebars({
        scrollLock: false,
        siteClose: false
      });
      $.slidebars.open('left');
    }
 
  //VERTICAL SCROLL FIX!
  var h = $( window ).height();
  h = h+'px';
  $('.panel').css('height',h);
  $( window ).resize(function() {
    h = $( window ).height();
    h = h+'px';
    $('.panel').css('height',h);
  });

  /*Add in breakpoints to hide/show menu and activate slidebarsloc
  $( window ).resize(function() {
    var width = $( window ).width();
    if(width < 800){
      $.slidebars({
        scrollLock: false,
        siteClose: true
      });
    }
  });*/
 
  //Check initial hash and slide to panel
  var hash = window.location.hash ? window.location.hash : '#wallsdown';
  if (hash.indexOf("#/") >= 0) hash ="#coverage";
 
  var idx = $('a[href='+hash+']').attr('data-index-number');
  Slider.slide(idx);




  //MAIN MENU CLICKS - SCROLL
  $('a.slide-nav').click(function(e) {
    e.preventDefault();
    var idx = $(this).attr('data-index-number');
    Slider.slide(idx);
  });


  //Slideout menus
  $("#credit-link").click(function(e){
    $('body').addClass("credits-open");
    activeSide = "credits-open";
    e.preventDefault();
  });

  $("#issues-link").click(function(e){
    $('body').addClass("issues-open");
    activeSide = "issues-open";
    e.preventDefault();
  });

    // hide active menu if close menu button is clicked  
  $(".close-credits-menu").click(function(){
      $('body').removeClass("credits-open");
      $('body').removeClass("issues-open");
      activeSide = "";
  });
 
   
  /*------------------ MENU ACTIVE/Hover TOGGLE from hash-----------------*/
  $('.main-menu a[href="'+ hash +'"]').children(".menu-item").addClass('menu-active');

  window.addEventListener("hashchange", function () {
      var hash = window.location.hash ? window.location.hash : '#home';
      if (hash.indexOf("#/") >= 0) hash ="#coverage";
      var idx = $('a[href='+hash+']').attr('id');

      $(".main-menu a div").removeClass('menu-active');
      $(".secondary-menu li").removeClass('menu-active');

      $('.main-menu a[href="'+ hash +'"]').children(".menu-item").addClass('menu-active');
      $('.secondary-menu li a[href="'+ hash +'"]').parent("li").addClass('menu-active');
 
 
   }, false);
 
  







// --------------------------------------------------------------------------------------------

 // /* Panel Scroll on keyup */

 
   $('html').keydown(function(e){
     if(e.which == 37) //LEFT ARROW
     {
       Slider.prev();
       e.preventDefault();
     }
 
     if(e.which == 39) //right ARROW
     {
       Slider.next();
       e.preventDefault();
     }
     
   });



/*------------------MAP and IMPRESS-----------------*/


  var isDesktop = (function() {
    return !('ontouchstart' in window) || !('onmsgesturechange' in window); // works on ie10
  })();

  var viewportwidth = $(window).width();
  $(window).resize(function() {
    viewportwidth= $(window).width();
  });
  
  window.isDesktop = isDesktop;
 
  if( isDesktop && viewportwidth >767){
    var map = impress();
    
    if (window.location.hash == "#coverage") {
      map.init();
      map.goto(0);
      $('#title').delay(100).fadeIn('slow');
      $('.slide-topic').delay(3000).fadeIn('slow');
      $('#instruction').delay(3000).fadeIn('slow');

    }
    window.addEventListener("hashchange", function () {
      hash = window.location.hash;

      if (hash == "#coverage") {
          map.init();
          map.goto(0);
          $('#title').delay(100).fadeIn('slow');
          $('.slide-topic').delay(3000).fadeIn('slow');
          $('#instruction').delay(3000).fadeIn('slow');
        }

      if (hash.indexOf("#/") >= 0){
        hash = hash.replace('/','');

        type = hash.split("-").length - 1;
        if (type === 0) type = 'topic';
        if (type > 0) type = 'story';
        
        if (hash == "#coverage") {

        }
        else if(hash =='#title' ){
          gotoTitle();
        }
        else if(type =='topic' ){
          gotoTopic(hash);
        }
        else if(type =='story' ){
          gotoStory(hash);
        }
      }


    }, false);
  }

     function gotoTitle(){
      $('#title').delay(500).fadeIn('slow');
      $('.slide-topic').fadeIn('slow');
      $('.slide-story').fadeOut();
      $('.slide-point').fadeOut();
    }

    function gotoTopic(hash){
      $(hash).fadeIn();
      $(hash).siblings().fadeOut('2000');
      points = hash+"-points";
      $('.slide-point').fadeOut();
      $('#title').fadeOut();
      $(points).delay(500).fadeIn('slow');
      $('.slide-story').fadeOut();

    }

     function gotoStory(hash){
      $(hash).fadeIn('slow');
      $('.slide-point').fadeOut();
    }

  });


 

 







//*************************** GRID ANIMATIONS ************************************//

/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */
(function() {

  var bodyEl = document.body,
    docElem = window.document.documentElement,
    support = { transitions: Modernizr.csstransitions },
    // transition end event name
    transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    onEndTransition = function( el, callback ) {
      var onEndCallbackFn = function( ev ) {
        if( support.transitions ) {
          if( ev.target != this ) return;
          this.removeEventListener( transEndEventName, onEndCallbackFn );
        }
        if( callback && typeof callback === 'function' ) { callback.call(this); }
      };
      if( support.transitions ) {
        el.addEventListener( transEndEventName, onEndCallbackFn );
      }
      else {
        onEndCallbackFn();
      }
    },
    gridEl = document.getElementById('theGrid'),
    gridItemsContainer = gridEl.querySelector('section.grid'),
    contentItemsContainer = gridEl.querySelector('section.content'),
    gridItems = gridItemsContainer.querySelectorAll('.grid__item'),
    contentItems = contentItemsContainer.querySelectorAll('.content__item'),
    closeCtrl1 = contentItemsContainer.querySelector('#close-button-one'),
    closeCtrl2 = contentItemsContainer.querySelector('#close-button-two'),
    closeCtrl3 = contentItemsContainer.querySelector('#close-button-three'),
    closeCtrl = contentItemsContainer.querySelector('.close-button'),
    current = -1,
    lockScroll = false, xscroll, yscroll,
    isAnimating = false;
    
  /**
   * gets the viewport width and height
   * based on http://responsejs.com/labs/dimensions/
   */
  function getViewport( axis ){
    var client, inner;
    if( axis === 'x' ) {
      client = docElem['clientWidth'];
      inner = window['innerWidth'];
    }
    else if( axis === 'y' ) {
      client = docElem['clientHeight'];
      inner = window['innerHeight'];
    }
    
    return client < inner ? inner : client;
  }
  function scrollX() { return window.pageXOffset || docElem.scrollLeft; }
  function scrollY() { return window.pageYOffset || docElem.scrollTop; }

  function init() {
    initEvents();
  }

  function initEvents() {
    [].slice.call(gridItems).forEach(function(item, pos) {
      // grid item click event
      item.addEventListener('click', function(ev) {
        ev.preventDefault();
        if(isAnimating || current === pos) {
          return false;
        }
        isAnimating = true;
        // index of current item
        current = pos;
        // simulate loading time..
        classie.add(item, 'grid__item--loading');
        setTimeout(function() {
          classie.add(item, 'grid__item--animate');
          // reveal/load content after the last element animates out (todo: wait for the last transition to finish)
          setTimeout(function() { loadContent(item); }, 500);
        }, 1000);
      });
    });

    closeCtrl.addEventListener('click', function() {
      // hide content
      hideContent();
    });

    closeCtrl1.addEventListener('click', function() {
      // hide content
      hideContent();
    });

    closeCtrl2.addEventListener('click', function() {
      // hide content
      hideContent();
    });
    closeCtrl3.addEventListener('click', function() {
      // hide content
      hideContent();
    });

    // keyboard esc - hide content
    document.addEventListener('keydown', function(ev) {
      if(!isAnimating && current !== -1) {
        var keyCode = ev.keyCode || ev.which;
        if( keyCode === 27 ) {
          ev.preventDefault();
          if ("activeElement" in document)
              document.activeElement.blur();
          hideContent();
        }
      }
    } );


  }

  function loadContent(item) {
    // add expanding element/placeholder 
    var dummy = document.createElement('div');
    dummy.className = 'placeholder';

    // set the width/heigth and position
    dummy.style.WebkitTransform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';
    dummy.style.transform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/gridItemsContainer.offsetWidth + ',' + item.offsetHeight/getViewport('y') + ',1)';

    // add transition class 
    classie.add(dummy, 'placeholder--trans-in');

    // insert it after all the grid items
    gridItemsContainer.appendChild(dummy);
    
    // body overlay
    classie.add(bodyEl, 'view-single');

    setTimeout(function() {
      // expands the placeholder
      dummy.style.WebkitTransform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
      dummy.style.transform = 'translate3d(-5px, ' + (scrollY() - 5) + 'px, 0px)';
      // disallow scroll
      window.addEventListener('scroll', noscroll);
    }, 25);

    onEndTransition(dummy, function() {
      // add transition class 
      classie.remove(dummy, 'placeholder--trans-in');
      classie.add(dummy, 'placeholder--trans-out');
      // position the content container
      contentItemsContainer.style.top = scrollY() + 'px';
      // show the main content container
      classie.add(contentItemsContainer, 'content--show');
      // show content item:
      classie.add(contentItems[current], 'content__item--show');
      // show close control
      classie.add(closeCtrl, 'close-button--show');
      // sets overflow hidden to the body and allows the switch to the content scroll
      classie.addClass(bodyEl, 'noscroll');

      isAnimating = false;
    });
  }

  function hideContent() {
    var gridItem = gridItems[current], contentItem = contentItems[current];

    classie.remove(contentItem, 'content__item--show');
    classie.remove(contentItemsContainer, 'content--show');
    classie.remove(closeCtrl, 'close-button--show');
    classie.remove(bodyEl, 'view-single');

    setTimeout(function() {
      var dummy = gridItemsContainer.querySelector('.placeholder');

      classie.removeClass(bodyEl, 'noscroll');

      dummy.style.WebkitTransform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';
      dummy.style.transform = 'translate3d(' + gridItem.offsetLeft + 'px, ' + gridItem.offsetTop + 'px, 0px) scale3d(' + gridItem.offsetWidth/gridItemsContainer.offsetWidth + ',' + gridItem.offsetHeight/getViewport('y') + ',1)';

      onEndTransition(dummy, function() {
        // reset content scroll..
        contentItem.parentNode.scrollTop = 0;
        gridItemsContainer.removeChild(dummy);
        classie.remove(gridItem, 'grid__item--loading');
        classie.remove(gridItem, 'grid__item--animate');
        lockScroll = false;
        window.removeEventListener( 'scroll', noscroll );
      });
      
      // reset current
      current = -1;
    }, 25);
  }

  function noscroll() {
    if(!lockScroll) {
      lockScroll = true;
      xscroll = scrollX();
      yscroll = scrollY();
    }
    window.scrollTo(xscroll, yscroll);
  }

  init();

})();
 


