/**
 * HomepageSlider javascript functionality
 **/

function RunSlider(){

    if($('.slider-nav').length){
        ChangeByNav();
    }
    else{
        ChangeByArrows();
    }
}

function ChangeByNav(){
    // when slider nav button is clicked
    $(document).on('click', '.slider-nav a:not(.current)', function(){

        // change the slide
        ChangeSlideAndUpdateNav($(this));

        // stop the autoslide, if it's been started
        if($('.slider.autoslide').length){
            clearInterval(timer);
        }

    });
}

function ChangeByArrows(){
    // when slider nav button is clicked
    $(document).on('click', '.slider-nav-arrow', function(){

        var current_slide = $('.slide.current');
        var direction = $(this).data('direction');

        // if next has been clicked
        if(direction == 'next'){
            // determine the next slide
            if(current_slide.next('.slide').length){
                // if there's a slide after the current one, target it
                var next_slide = current_slide.next('.slide');
                
            }else{
                // otherwise we're at the start of the list; loop back to the first slide
                var next_slide = $('.slide').first();
            }

        }

        // if prev has been clicked
        else{

            // determine the next slide
            if(current_slide.prev('.slide').length){
                // if there's a slide before the current one, target it
                var next_slide = current_slide.prev('.slide');
                
            }else{
                // otherwise we're at the end of the list; loop back to the last slide in the list
                var next_slide = $('.slide').last();
            }
        }

        // change the slide
        ChangeSlide(current_slide, next_slide);

        clearInterval(timer);

    });
}

/**
 * Fade out the current slide and fade in the next one
 * @param {slide obj} current_slide [the slide to be faded out]
 * @param {slide obj} next_slide    [the slide to be faded in]
 */
function ChangeSlide(current_slide, next_slide){

    // update slides
    current_slide.stop().fadeOut().removeClass('current');
    next_slide.stop().fadeIn().addClass('current');

}

/**
 * Change to slide corresponding to the nav button clicked
 * @param {button obj} trigger [the trigger button]
 */
function ChangeSlideAndUpdateNav(trigger){

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

            if($('.slider-nav').length){
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
                ChangeSlideAndUpdateNav(trigger);
            }
            else{

                // get the current slide
                var current_slide = $('.slide.current');

                // determine the next slide
                if(current_slide.next('.slide').length){
                    // if there's a slide after the current one, target it
                    var next_slide = current_slide.next('.slide');
                    
                }else{
                    // otherwise we're at the start of the list; loop back to the first slide
                    var next_slide = $('.slide').first();
                }

                ChangeSlide(current_slide, next_slide);

            }
        },
        5000
    );
}

/*
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
            ChangeSlideAndUpdateNav(trigger);
        },
        5000
    );
}
*/

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