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
        initializer: function () {
            var self = this;

            self.like();
        },

        like: function () {
            var self = this;
            var $card = $('.card');
            // $card.on('touchstart', self.touchStart());

            $card.on('touchstart', self.touchStart).on('touchend', self.touchEnd);
        },

        touchStart: function () {
            $(this).addClass('like');
        },

        touchEnd: function () {
            $(this).addClass('leave');
            $(this).fadeOut(400);
        }
    };


    (function() {
        framework.initializer();
        card.initializer();
    }());

});
