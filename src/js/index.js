// import '../styles'

// var current = 1;
// var parentElement = $(".container-wide__content__image")
// var wall =  parentElement.find('.childImage').length;
// console.log(current)
// $(`#indicator${current}`).addClass('active');



// $('#right').on('click', function(){
//     if (current  < wall) {
//     $(`#image${current}`).css('animation', 'moveleftcurrent 1s');
//     $(`#image${current}`).css('left', '-100%');
//     $(`.childIndicator`).removeClass('active');
//     $(`#indicator${current+1}`).addClass('active');

//     $(`#image${current+1}`).css('animation', 'moveleftcoming 1s');
//     $(`#image${current+1}`).css('left', '0');

//     current = current +1;
//   } else {
//     current = 1;
//     $(`#image${wall}`).css('animation', 'moveleftcurrent 1s');
//     $(`#image${wall}`).css('left', '-100%');
//     $(`.childIndicator`).removeClass('active');
//     $(`#indicator${current}`).addClass('active');
//     $(`#image${current}`).css('animation', 'moveleftcoming 1s');
//     $(`#image${current}`).css('left', '0');
//   }
// })

// $('#left').on('click', function(){
//   if (current  > 1  ) {
//     $(`#image${current}`).css('animation', 'moverightcurrent 1s');
//     $(`#image${current}`).css('left', '100%');
//     $(`.childIndicator`).removeClass('active');
//     $(`#indicator${current-1}`).addClass('active');
//     $(`#image${current-1}`).css('animation', 'moverightcoming 1s');
//     $(`#image${current-1}`).css('left', '0');
//     current = current -1;
//   } else {
//     current = wall;
//     $(`#image1`).css('animation', 'moverightcurrent 1s');
//     $(`#image1`).css('left', '100%');
//     $(`.childIndicator`).removeClass('active');
//     $(`#indicator${current}`).addClass('active');
//     $(`#image${current}`).css('animation', 'moverightcoming 1s');
//     $(`#image${current}`).css('left', '0');
//   }
// })

// $('.childIndicator').on('click', function(){
//   var target = $(this).data('ind')
//   if( target < current) {
//     $(`#image${current}`).css('animation', 'moverightcurrent 1s');
//     $(`#image${current}`).css('left', '100%');
//     $(`#image${target}`).css('animation', 'moverightcoming 1s');
//     $(`#image${target}`).css('left', '0');
//   } else if ( target > current ) {
//     $(`#image${current}`).css('animation', 'moveleftcurrent 1s');
//     $(`#image${current}`).css('left', '-100%');
//     $(`#image${target}`).css('animation', 'moveleftcoming 1s');
//     $(`#image${target}`).css('left', '0');
//   }
//   $(`.childIndicator`).removeClass('active');
//   $(`#indicator${target}`).addClass('active');
//   current  = target
// })













import '../styles'

// var current = 1;
var parentElement = $(".container-wide__content__image")
var wall =  parentElement.find('.childImage').length;
// console.log(current)
$(`#indicator1`).addClass('active');


var carouselModule = (function(wall){
  var current = 1;
  var _animateAfterIndicator = (target,current) => {
    var animation, percentage;
    target < current ? animation = 'moveright' : animation= 'moveleft'; 
    target < current ? percentage = '100%' : percentage = '-100%'; 
    $(`#image${current}`).css('animation', animation+'current 1s');
    $(`#image${current}`).css('left', percentage);
    $(`#image${target}`).css('animation', animation+'coming 1s');
    $(`#image${target}`).css('left', '0');
  }
  var clickRight = () => {
    if (current  < wall) {
      $(`#image${current}`).css('animation', 'moveleftcurrent 1s');
      $(`#image${current}`).css('left', '-100%');
      $(`.childIndicator`).removeClass('active');
      $(`#indicator${current+1}`).addClass('active');

      $(`#image${current+1}`).css('animation', 'moveleftcoming 1s');
      $(`#image${current+1}`).css('left', '0');

      current = current +1;
    } else {
      current = 1;
      $(`#image${wall}`).css('animation', 'moveleftcurrent 1s');
      $(`#image${wall}`).css('left', '-100%');
      $(`.childIndicator`).removeClass('active');
      $(`#indicator${current}`).addClass('active');
      $(`#image${current}`).css('animation', 'moveleftcoming 1s');
      $(`#image${current}`).css('left', '0');
    }
  }
  var clickLeft = () => {
    if (current  > 1  ) {
      $(`#image${current}`).css('animation', 'moverightcurrent 1s');
      $(`#image${current}`).css('left', '100%');
      $(`.childIndicator`).removeClass('active');
      $(`#indicator${current-1}`).addClass('active');
      $(`#image${current-1}`).css('animation', 'moverightcoming 1s');
      $(`#image${current-1}`).css('left', '0');
      current = current -1;
    } else {
      current = wall;
      $(`#image1`).css('animation', 'moverightcurrent 1s');
      $(`#image1`).css('left', '100%');
      $(`.childIndicator`).removeClass('active');
      $(`#indicator${current}`).addClass('active');
      $(`#image${current}`).css('animation', 'moverightcoming 1s');
      $(`#image${current}`).css('left', '0');
    }
  }
  
  var clickIndicator = (_this) => {
    var target = _this.data('ind')
    _animateAfterIndicator(target,current)
    $(`.childIndicator`).removeClass('active');
    $(`#indicator${target}`).addClass('active');
    current  = target
  }
  return {
    // clickRight,
    // clickLeft,
    // clickIndicator,
    initModule : ()=>{
      $('#right').on('click',  clickRight);

      $('#left').on('click', clickLeft);
      
      $('.childIndicator').on('click', $event => clickIndicator($($event.target)));
    }
  }
})(wall);

carouselModule.initModule()
