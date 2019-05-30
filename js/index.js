$(document).ready(function(){

 var img = [
'https://octodex.github.com/images/steroidtocat.png',
'https://octodex.github.com/images/megacat-2.png',
'https://octodex.github.com/images/dodgetocat_v2.png',
'https://octodex.github.com/images/mcefeeline.jpg',
'https://octodex.github.com/images/ironcat.jpg',
'https://octodex.github.com/images/gracehoppertocat.jpg',
'https://octodex.github.com/images/spidertocat.png',
'https://octodex.github.com/images/octocat-de-los-muertos.jpg',
'https://octodex.github.com/images/saritocat.png',
'https://octodex.github.com/images/plumber.jpg',
'https://octodex.github.com/images/linktocat.jpg',
'https://octodex.github.com/images/kimonotocat.png'	
]	

var	 total = 0,
	 move = 0,
	 count = 1,
	 first_card=null,
  	 secn_card=null ;

var stop_fa = false ,
	stop_fc = true,
 	stop_time = true;


var $card = $('.card'),
	$board = $('.board'),
	$start = $('.start'),
	$again = $('.again') ;


//4*6 card group;
var card_id=0 
 for(i=0; i<4; i++){
	for(j=0; j<6; j++){
		$('.room').append('	<div class="card" data-id="'+card_id+'"><div class="front face"></div><div  data-bid="0" class="back face" ></div></div>')
		card_id++;
		}
		$('.room').append('<br>')
	}




$start.click(function(){
	total = 0;
	stop_fa = true;
	stop_fc = false;
	stop_time = false;
	$('.card').removeClass('flip');
	$start.hide();
	randomIMG();
})

$again.click(function(){
	stop_fa = false;
	stop_fc = true;
	$start.show();
	$board.hide();
	$('.card').removeClass('fliped');
	randomIMG();
	flip_auto();
	flip_auto();
})

$board.hide();
randomIMG();
flip_auto();
flip_auto();
flip_auto();
flip_click();

// $('.card').addClass('fliped');

function randomIMG(){
	
	var c_array = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12];
	var c_length = c_array.length;
	var $card = $('.card');
	

	$card.each(function(){
		var r_id = Math.floor(Math.random() * (c_length - 1));	// Get Random Number 
		
		
		var temp = c_array[r_id];							    //Swaping
		c_array[r_id]= c_array[c_length - 1];
		c_array[c_length - 1] = temp;


		c_length--												// decrement c_length by 1
		
		$(this).find('.back').css({								// Set css
			'background-image' : 'url('+img[temp-1]+')',
			'background-repeat' : 'no-repeat',
			'background-size': '100%'
		})

		$(this).find('.back').attr('data-bid',temp)		// Set data attribute
	})

	return 0;
}





function flip_click(){
	 total = 0;  
	 move = 0;
	 count = 1;
	 var i =0
	 first_card=null;
  	 secn_card=null ;
	var $card = $('.card');
	


	$card.find('.front').click(function(){

		if(stop_fc == true){
			return 0;
		}
   	

	$(this).parent('.card').toggleClass('flip');
	move++;
	$('.c_move').html(move);

	if(count == 1){
		first_card = $(this).parent('.card').find('.back').attr('data-bid');
	}
	else if(count == 2){
		secn_card = $(this).parent('.card').find('.back').attr('data-bid');
	}

	
	if(first_card == secn_card){
		
		$('[data-bid="'+first_card+'"]').parent('.card').addClass('fliped')
		total++;
		if (total == 12) {

			stop_time = true;
			

      		var sec_f = pad(++sec%60) , 
    		   min_f = pad(parseInt(sec/60,10)) ;
		stop_fc = reset(move,sec_f,min_f);
		stop_fc = true;
		move = 0;
		}

	}
	if(stop_fc){
		return
	}
count++
		if(count>2){
			console.log(first_card,secn_card)
			first_card=null;
			secn_card=null;
			count = 1;
		setTimeout(function(){
			$card.removeClass('flip');
			
		},400)
	}		
	});


	var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval( function(){
	if(stop_time){
    sec=0
		return
	}
    $(".sec").html(pad(++sec%60));
    $(".min").html(pad(parseInt(sec/60,10)));
}, 1000);


}


function flip_auto(time){	

  setTimeout( function(){
  	if(stop_fa){
	return ;
	}

	var r_ran = randomNum(1,24)
	$('[data-id="'+r_ran+'"]').toggleClass('flip')

	var newTime = randomNum(500,1000);	
	flip_auto(newTime)
  }, time)
}

 function randomNum( min, max ) {
    return Math.floor(Math.random() * ((max - min)+1) + min);
  }



function reset(move,sec,min) {
$board.show()
$board.find('.scr_moves').html(move);
$board.find('.scr_sec').html(sec);
$board.find('.scr_min').html(min);
return true;
}





});