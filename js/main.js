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
        cardIndex: 0,

        initializer: function () {
            var self = this;

            self.like();
        },

        like: function () {
            var self = this;
            var $card = $('.card');

            $(document.body).on('touchstart', $card, function (event) {
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
                touch = e.changedTouches[0],
                $lastCard = $('.single').last(),
                $newCard = $('.single').first(),
                cardTemplate = '<div class="single"><div class="content"><h1 class="fw-400 fz-22 mx-10-b darkBrown" id="title"></h1><h2 class="fw-400 fz-18 mx-2-b darkBrown">Hangout</h2><p class="fz-14 mx-5-b w-s-n" id="description"></p><h2 class="fw-400 fz-18 mx-2-b darkBrown">When</h2><p class="copy fz-14 mx-5-b w-s-n" id="when"></p><div class="leftSubhead fl mx-15-b"><h2 class="fw-400 fz-18 mx-2-b darkBrown">Ages</h2><p class="fz-14 mx-5-b" id="ages"></p></div><div class="rightSubhead fl mx-15-b "><h2 class="subhead fw-400 fz-18 mx-2-b darkBrown">Going</h2><p class="copy fz-14 mx-5-b" id="going"></p></div><div class="actions w-s-n"><img class="dismiss" src="img/dismissIcon.png"><img class="attend" src="img/attendIcon.png"></div></div><img class="profile" src="img/profile1.png"><div class="author" id="author"></div>',
                mockData = {
                    "card_list": [
                        {
                            "img": "img/profile1.png",
                            "author": "Andrea",
                            "location": "Santa Monica",
                            "title": "Example 1",
                            "description": "test1",
                            "ages": "123",
                            "when": "test1",
                            "going": "test1"
                        },
                        {
                            "img": "img/profile1.png",
                            "author": "Andrea",
                            "location": "Orange County",
                            "title": "Example 2",
                            "description": "test2",
                            "ages": "123",
                            "when": "test2",
                            "going": "test2"
                        },
                        {
                            "img": "img/profile1.png",
                            "author": "Andrea",
                            "location": "Orange County",
                            "title": "Example 3",
                            "description": "test3",
                            "ages": "123",
                            "when": "test3",
                            "going": "test3"
                        },
                        {
                            "img": "img/profile1.png",
                            "author": "Andrea",
                            "location": "Orange County",
                            "title": "Example 4",
                            "description": "test4",
                            "ages": "123",
                            "when": "test4",
                            "going": "test4"
                        }
                    ]    
                };

            card.xCoordinateEnd = touch.pageX;
            card.yCoordinateEnd = touch.pageY;

            userIntent = self.computeIntent();

            // Prepends new card template
            $('.single').before(cardTemplate);
            // Sets values of card template
            $('#profile').first().attr('src', mockData.card_list[self.cardIndex].img);
            $('#author').first().html(mockData.card_list[self.cardIndex].author);
            $('#location').first().html('in ' + mockData.card_list[self.cardIndex].location);
            $('#title').first().html(mockData.card_list[self.cardIndex].title);
            $('#description').first().html(mockData.card_list[self.cardIndex].description);
            $('#ages').first().html(mockData.card_list[self.cardIndex].ages);
            $('#when').first().html(mockData.card_list[self.cardIndex].when);
            $('#going').first().html(mockData.card_list[self.cardIndex].going);

            if (userIntent === 'left') {
                $lastCard.addClass('leaveLeft');
            } else {
                $lastCard.addClass('leaveRight');
            }

            $('.single').last().fadeOut(400, function () {
                $lastCard.remove();
            });

            self.cardIndex++;
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
        initializer: function () {
            var self = this;

            self.menuTransition();
        },

        menuTransition: function () {
            $(".navIcon").click(function(){
                $("#panel").toggleClass("bodySlide");
                $(".sideMenuContainer").show();
                
            });
            
        }
    };

    var chat = {
        initializer: function () {
            this.modifyTextArea();
        },

        modifyTextArea: function () {
            var scrollHeight = 0;
            $('.inputArea').on('keypress', function() {
                // var inputLength = $(this).val().length;
                // if (inputLength % 40 == 0) {
                    // $('.chat .input').css('height', (inputLength / 40) * 30);
                    // alert((inputLength / 40) * 30);
                    // var inputLength = $(this).val();
                    // alert($('.inputArea').scrollTop());

                // }

                var scrollTop = $(this).scrollTop();

                if (scrollHeight != scrollTop && scrollTop > 5) {
                    var currentHeight = $('.input').height();
                    if (currentHeight < 140) {
                        $('.chat .input').animate({
                            height: currentHeight + 30
                        }, 200);
                    }
                    scrollHeight = $(this).scrollTop();
                } 

            });
        }
    };


    (function() {
        framework.initializer();
        card.initializer();
        menu.initializer();
        chat.initializer();
    }());

});
