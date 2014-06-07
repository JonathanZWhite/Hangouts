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

            $card.on('touchstart', function (e) {
                self.touchStart(e);
            }).on('touchend', function (e) {
                self.touchEnd(e);
            });
        },

        touchStart: function (e) {
            var touch = e.originalEvent.touches[0];

            $(this).addClass('like');
            card.xCoordinateStart = touch.pageX;
            card.yCoordinateStart = touch.pageY;
        },

        touchEnd: function (e) {
            var self = this,
                coordinateLogic,
                touch = e.originalEvent.changedTouches[0];

            card.xCoordinateEnd = touch.pageX;
            card.yCoordinateEnd = touch.pageY;

            coordinateLogic = self.computeIntent();

            $(this).addClass('leave');
            $(this).fadeOut(400);
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
