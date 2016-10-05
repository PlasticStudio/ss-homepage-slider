/**
 * HomepageSlider javascript functionality
 **/

function RunSlider(){

    // when slider nav button is clicked
    $(document).on('click', '.slider-nav a:not(.current)', function(){

        // change the slide
        ChangeSlide($(this));

        // stop the autoslide, if it's been started
        if($('.slider.autoslide').length){
            clearInterval(timer);
        }


    });
}

function ChangeSlide(trigger){

    // get stuff
    var current_slide = $('.slide.current');
    var id = trigger.data('slide');
    var next_slide = $('#slide-' + id);
    
    // update slides
    current_slide.stop().fadeOut().removeClass('current');
    next_slide.stop().fadeIn().addClass('current');
    
    // update nav
    $('.slider-nav a').removeClass('current');
    trigger.addClass('current');

}


function AutoSlide(){

    timer = setInterval(
        
        function(){

            // get the current slide
            var current_button = $(document).find('.slider-nav a.current').first();

            // determine the next slide
            if(current_button.next().length){
                // if there's a slide after the current one, target it
                var trigger = current_button.next();
            }else{
                // otherwise we're at the end of the list; loop back to the first slide
                var trigger = $('.slider-nav a').first();
            }
            //console.info(trigger);
            ChangeSlide(trigger);
        },
        5000
    );
}

/**
 * On page load
 **/
$(document).ready( function(){
	//console.info('Loaded homepage-slider.js');
    RunSlider();
    if($('.slider.autoslide').length){
        AutoSlide();
    }
});