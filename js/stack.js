var msg = new SpeechSynthesisUtterance();
speak =  function(speech){
    msg.lang = "en-EN";
    msg.text = speech;
    msg.name = "Google UK English Male";
    window.speechSynthesis.speak(msg);
};


//Function to allow swiping of cards
prepareForTouches = function(element) {


    function dragElement(event) {
        var elementToDrag = $(event.target).parent('.card')[0];
        // deltaX tracks the distance dragged along the x-axis since the initial touch.
        if(elementToDrag != undefined) elementToDrag.style.left = event.gesture.deltaX + 'px';

    }

    function deleteElement(event) {
        var elementToDelete = event.target;
        // Stop detecting touches on element when it's no longer needed. Can prevent odd behaviour.
        event.gesture.stopDetect();
        //!todo get next element
        speech  = $(elementToDelete).prev().data('speech');
        //read message
        msg = new SpeechSynthesisUtterance(speech);
        window.speechSynthesis.speak(msg);

        if( $(elementToDelete).hasClass('bottom') ) {
            $parentContainer = $(elementToDelete).parents('.stack-container').next();
            $('html, body').animate({
                scrollTop: $parentContainer.offset().top
            }, 1000);
            speech  = $( $($parentContainer).find('.card').last() ).data('speech');
            //read message
            speak(speech);
        }


        //kill the card
        if($(elementToDelete).hasClass('card')){
            $(elementToDelete).remove();
        }else{
          $(elementToDelete).parent().remove()
        }

    }


    // Swipe options as recommended by:
    // https://github.com/EightMedia/hammer.js/wiki/Tips-&-Tricks#horizontal-swipe-and-drag
    var swipeOptions = { dragLockToAxis: true, dragBlockHorizontal: true };

    function initTouchListeners(touchableElement) {
        var touchControl = new Hammer(touchableElement, swipeOptions);
        touchControl.on("dragright", dragElement)
            .on("swiperight", deleteElement)
            .on("dragleft", dragElement)
            .on("swipeleft", deleteElement)

    }

    var listItems = $('#'+element).children('.card');

    $.each( listItems, function( i, card){
        initTouchListeners(card);
    });


};
