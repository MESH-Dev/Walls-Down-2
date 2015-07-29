  /*------------------PANEL SCROLLING-----------------*/
 
$(document).ready(function() {
 
  //Initialize Slider
  Slider = $('#slider').Swipe({
    continuous: false,
    disableScroll: false,
    stopPropagation: false,
     transitionEnd: function(index, elem) { //set new hash after transistion
        var hash = window.location.hash;
        var this_hash = $(elem).attr('id');
        if (this_hash.indexOf("#/") >= 0)
        {
          if(this_hash.indexOf("#/title") >= 0){
            window.location.hash = hash;
          }
 
        }
        else{
          window.location.hash = this_hash;
        }
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
 


  //MAIN MENU CLICKS - SCROLL
  $('a.slide-nav').click(function(e) {
    e.preventDefault();
    var idx = $(this).attr('data-index-number');
    Slider.slide(idx);
  });


  //Slideout menus
  $("#credit-link").click(function(e){
    $('body').removeClass("issues-open");
    $('body').addClass("credits-open");
    $('.credits-menu-left').fadeIn('slow');
    e.preventDefault();
  });

  $("#issues-link").click(function(e){
    $('body').addClass("issues-open");
    $('body').removeClass("credits-open");
    $('.credits-menu-left').fadeIn('slow');
    
    e.preventDefault();
  });

    // hide active menu if close menu button is clicked  
  $(".close-credits-menu").click(function(){
      $('body').removeClass("credits-open");
      $('body').removeClass("issues-open");
      $('.credits-menu-left').fadeOut();
       
  });
 
   
  /*------------------ MENU ACTIVE/Hover TOGGLE from hash-----------------*/

  //Check initial hash and slide to panel
  var hash = window.location.hash ? window.location.hash : '#wallsdown';
  if (hash.indexOf("#coverage") >= 0) hash ="#/title";
  if (hash.indexOf("#/") >= 0) {
     idx = 3;
  }
  else{
     idx = $('a[href='+hash+']').attr('data-index-number');
  }
  $('.main-menu a[data-index-number="'+ idx +'"]').children(".menu-item").addClass('menu-active');
  $('.secondary-menu li a[data-index-number="'+ idx +'"]').parent("li").addClass('menu-active');
  Slider.slide(idx);


  window.addEventListener("hashchange", function () {
      var hash = window.location.hash ? window.location.hash : '#home';
      if (hash.indexOf("#coverage") >= 0) hash ="#/title";
      
      $(".main-menu a div").removeClass('menu-active');
      $(".secondary-menu li").removeClass('menu-active');

      if (hash.indexOf("#/") >= 0) {
         idx = 3;
      }
      else{
         idx = $('a[href='+hash+']').attr('data-index-number');
      }

      $('.main-menu a[data-index-number="'+ idx +'"]').children(".menu-item").addClass('menu-active');
      $('.secondary-menu li a[data-index-number="'+ idx +'"]').parent("li").addClass('menu-active');

    
 
 
   }, false);



  /* -----HOUSECALL CLICKS AND HASHES ----------*/

  
  if(hash == '#peter' ||hash == '#vcu' || hash == '#sun-seeker'){
    Slider.slide(1);
 
  }

 $('a.grid__item').click(function(){
      var this_hash = $(this).attr('id');
      window.location.hash = this_hash;

 });

 $('a.story-next').click(function(e) {
      e.preventDefault();
      hideContent();
      //$('a#vcu')[0].click();
 });


 


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

    if (hash.indexOf("#coverage") >= 0) hash ="#/title";

    var initmap = false;
    if (hash.indexOf("#/") >= 0) initmap = true;
    
    if (initmap) {
      map.init();
      map.goto(hash);
      hash = hash.replace('/','');
      $(hash).show();
      $('#title').delay(100).fadeIn('slow');
      $('.slide-topic').delay(3000).fadeIn('slow');
      $('#instruction').delay(3000).css('opacity','1');
    }



    window.addEventListener("hashchange", function () {
      hash = window.location.hash;

      if (hash == "#/title") {
          map.init();
          map.goto(0);
          $('#title').delay(100).fadeIn('slow');
          $('.slide-topic').delay(3000).fadeIn('slow');
          $('#instruction').delay(3000).css('opacity','1');
        }

      if (hash.indexOf("#/") >= 0){
        hash = hash.replace('/','');
        if(hash.indexOf("story") >= 0){
          type = 'story';
        }
        if(hash.indexOf("topic") >= 0){
          type = 'topic';
        }
        
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
      hash = hash.replace('-topic','');
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


 

 

//*************************** FORM INPUT EFFECT ************************************//
/**
 * selectFx.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
  
  'use strict';

  /**
   * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
   */
  function hasParent( e, p ) {
    if (!e) return false;
    var el = e.target||e.srcElement||e||false;
    while (el && el != p) {
      el = el.parentNode||false;
    }
    return (el!==false);
  };
  
  /**
   * extend obj function
   */
  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  /**
   * SelectFx function
   */
  function SelectFx( el, options ) {  
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );
    this._init();
  }

  /**
   * SelectFx options
   */
  SelectFx.prototype.options = {
    // if true all the links will open in a new tab.
    // if we want to be redirected when we click an option, we need to define a data-link attr on the option of the native select element
    newTab : true,
    // when opening the select element, the default placeholder (if any) is shown
    stickyPlaceholder : true,
    // callback when changing the value
    onChange : function( val ) { return false; }
  }

  /**
   * init function
   * initialize and cache some vars
   */
  SelectFx.prototype._init = function() {
    // check if we are using a placeholder for the native select box
    // we assume the placeholder is disabled and selected by default
    var selectedOpt = this.el.querySelector( 'option[selected]' );
    this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;

    // get selected option (either the first option with attr selected or just the first option)
    this.selectedOpt = selectedOpt || this.el.querySelector( 'option' );

    // create structure
    this._createSelectEl();

    // all options
    this.selOpts = [].slice.call( this.selEl.querySelectorAll( 'li[data-option]' ) );
    
    // total options
    this.selOptsCount = this.selOpts.length;
    
    // current index
    this.current = this.selOpts.indexOf( this.selEl.querySelector( 'li.cs-selected' ) ) || -1;
    
    // placeholder elem
    this.selPlaceholder = this.selEl.querySelector( 'span.cs-placeholder' );

    // init events
    this._initEvents();
  }

  /**
   * creates the structure for the select element
   */
  SelectFx.prototype._createSelectEl = function() {
    var self = this, options = '', createOptionHTML = function(el) {
      var optclass = '', classes = '', link = '';

      if( el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder ) {
        classes += 'cs-selected ';
        this.foundSelected = true;
      }
      // extra classes
      if( el.getAttribute( 'data-class' ) ) {
        classes += el.getAttribute( 'data-class' );
      }
      // link options
      if( el.getAttribute( 'data-link' ) ) {
        link = 'data-link=' + el.getAttribute( 'data-link' );
      }

      if( classes !== '' ) {
        optclass = 'class="' + classes + '" ';
      }

      return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent + '</span></li>';
    };

    [].slice.call( this.el.children ).forEach( function(el) {
      if( el.disabled ) { return; }

      var tag = el.tagName.toLowerCase();

      if( tag === 'option' ) {
        options += createOptionHTML(el);
      }
      else if( tag === 'optgroup' ) {
        options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
        [].slice.call( el.children ).forEach( function(opt) {
          options += createOptionHTML(opt);
        } );
        options += '</ul></li>';
      }
    } );

    var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
    this.selEl = document.createElement( 'div' );
    this.selEl.className = this.el.className;
    this.selEl.tabIndex = this.el.tabIndex;
    this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
    this.el.parentNode.appendChild( this.selEl );
    this.selEl.appendChild( this.el );
  }

  /**
   * initialize the events
   */
  SelectFx.prototype._initEvents = function() {
    var self = this;

    // open/close select
    this.selPlaceholder.addEventListener( 'click', function() {
      self._toggleSelect();
    } );

    // clicking the options
    this.selOpts.forEach( function(opt, idx) {
      opt.addEventListener( 'click', function() {
        self.current = idx;
        self._changeOption();
        // close select elem
        self._toggleSelect();
      } );
    } );

    // close the select element if the target it´s not the select element or one of its descendants..
    document.addEventListener( 'click', function(ev) {
      var target = ev.target;
      if( self._isOpen() && target !== self.selEl && !hasParent( target, self.selEl ) ) {
        self._toggleSelect();
      }
    } );

    // keyboard navigation events
    this.selEl.addEventListener( 'keydown', function( ev ) {
      var keyCode = ev.keyCode || ev.which;

      switch (keyCode) {
        // up key
        case 38:
          ev.preventDefault();
          self._navigateOpts('prev');
          break;
        // down key
        case 40:
          ev.preventDefault();
          self._navigateOpts('next');
          break;
        // space key
        case 32:
          ev.preventDefault();
          if( self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1 ) {
            self._changeOption();
          }
          self._toggleSelect();
          break;
        // enter key
        case 13:
          ev.preventDefault();
          if( self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1 ) {
            self._changeOption();
            self._toggleSelect();
          }
          break;
        // esc key
        case 27:
          ev.preventDefault();
          if( self._isOpen() ) {
            self._toggleSelect();
          }
          break;
      }
    } );
  }

  /**
   * navigate with up/dpwn keys
   */
  SelectFx.prototype._navigateOpts = function(dir) {
    if( !this._isOpen() ) {
      this._toggleSelect();
    }

    var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;
    
    if( dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1 ) {
      // save pre selected current - if we click on option, or press enter, or press space this is going to be the index of the current option
      this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
      // remove focus class if any..
      this._removeFocus();
      // add class focus - track which option we are navigating
      classie.add( this.selOpts[this.preSelCurrent], 'cs-focus' );
    }
  }

  /**
   * open/close select
   * when opened show the default placeholder if any
   */
  SelectFx.prototype._toggleSelect = function() {
    // remove focus class if any..
    this._removeFocus();
    
    if( this._isOpen() ) {
      if( this.current !== -1 ) {
        // update placeholder text
        this.selPlaceholder.textContent = this.selOpts[ this.current ].textContent;
      }
      classie.remove( this.selEl, 'cs-active' );
    }
    else {
      if( this.hasDefaultPlaceholder && this.options.stickyPlaceholder ) {
        // everytime we open we wanna see the default placeholder text
        this.selPlaceholder.textContent = this.selectedOpt.textContent;
      }
      classie.add( this.selEl, 'cs-active' );
    }
  }

  /**
   * change option - the new value is set
   */
  SelectFx.prototype._changeOption = function() {
    // if pre selected current (if we navigate with the keyboard)...
    if( typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ) {
      this.current = this.preSelCurrent;
      this.preSelCurrent = -1;
    }

    // current option
    var opt = this.selOpts[ this.current ];

    // update current selected value
    this.selPlaceholder.textContent = opt.textContent;
    
    // change native select element´s value
    this.el.value = opt.getAttribute( 'data-value' );

    // remove class cs-selected from old selected option and add it to current selected option
    var oldOpt = this.selEl.querySelector( 'li.cs-selected' );
    if( oldOpt ) {
      classie.remove( oldOpt, 'cs-selected' );
    }
    classie.add( opt, 'cs-selected' );

    // if there´s a link defined
    if( opt.getAttribute( 'data-link' ) ) {
      // open in new tab?
      if( this.options.newTab ) {
        window.open( opt.getAttribute( 'data-link' ), '_blank' );
      }
      else {
        window.location = opt.getAttribute( 'data-link' );
      }
    }

    // callback
    this.options.onChange( this.el.value );
  }

  /**
   * returns true if select element is opened
   */
  SelectFx.prototype._isOpen = function(opt) {
    return classie.has( this.selEl, 'cs-active' );
  }

  /**
   * removes the focus class from the option
   */
  SelectFx.prototype._removeFocus = function(opt) {
    var focusEl = this.selEl.querySelector( 'li.cs-focus' )
    if( focusEl ) {
      classie.remove( focusEl, 'cs-focus' );
    }
  }

  /**
   * add to global namespace
   */
  window.SelectFx = SelectFx;

} )( window );

 

(function() {
  [].slice.call( document.querySelectorAll( 'select.cs-select' ) ).forEach( function(el) {  
    new SelectFx(el);
  } );
})();




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
    thebod = document.getElementsByClassName("view-single");
    closeCtrlall = bodyEl.querySelector('div:not(.content)');
    closeCtrlall.addEventListener('click', function() {
      // hide content
      hideContent();
    });

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

$(document).ready(function() {
 
  $('.magazine .cs-select .cs-options').click(function() {
      $('#fav').fadeIn('slow');
  });

  $('#fav .cs-select .cs-options').click(function() {
      $('#share').fadeIn('slow');
  });

  $('#share .cs-select .cs-options').click(function() {
      $('#learn').fadeIn('slow');
  });

  $('#learned').focus(function() {
      $('#tell').fadeIn('slow');
  });

  $('#more').focus(function() {
      $('#hosp').fadeIn('slow');
  });

  $('#hosp .cs-select .cs-options').click(function() {
      $('#ind').fadeIn('slow');
  });

  $('#job').focus(function() {
      $('button#submit-form').fadeIn('slow');
  });


 

});


 


