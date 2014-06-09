$(document).ready(function() {

    var framework = {
        initializer: function() {
            var self = this;

            self.pageTransitions();
        },

        pageTransitions: function () {
            $('.nav li').on('click', function (e) {
                e.preventDefault();

                // Initiates transition
                $('.content').hide('fast', function () {
                    $.ajax({
                        url: 'newContent.html',
                        dataType: 'html',
                    }).done(function (response) {
                        $('.content').html(response);
                        $('.content').show();
                    }) ;
                });
            });
        }
    };

    var card = {

        xCoordinateStart: 0,
        xCoordinateEnd: 0,
        yCoordinateStart: 0,
        xCoordinateEnd: 0,

        initializer: function () {
            var self = this;

            self.like();
        },

        like: function () {
            var self = this;
            var $card = $('.card');

            $card.on('touchstart', function (event) {
                self.touchStart(event, this);
            }).on('touchend', function (e) {
                self.touchEnd(event, this);
            });
        },

        touchStart: function (e, context) {
            var touch = e.originalEvent.touches[0];

            // $(context).addClass('like');
            card.xCoordinateStart = touch.pageX;
            card.yCoordinateStart = touch.pageY;

        },

        touchEnd: function (e, context) {
            var self = this,
                userIntent,
                touch = e.changedTouches[0];

            card.xCoordinateEnd = touch.pageX;
            card.yCoordinateEnd = touch.pageY;

            userIntent = self.computeIntent();

            if (userIntent === 'left') {
                $(context).addClass('leaveLeft');
            } else {
                $(context).addClass('leaveRight');
            }

            $(context).fadeOut(400);
        },

        computeIntent: function() {
            var intent;

            if ((card.xCoordinateEnd - card.xCoordinateStart) > 0) {
                intent = 'right';
            } else {
                intent = 'left';
            }

            return intent;
        }
    };

    var menu = {
        initializer: function() {
            var self = this;

            self.menuTransition();
        },

        menuTransition:function() {
            $(".navIcon").click(function(){
                $("#panel").toggleClass("bodySlide");
                $(".sideMenuContainer").show();
                
            });
            
        }
    };


    (function() {
        framework.initializer();
        card.initializer();
        menu.initializer();
    }());

});
