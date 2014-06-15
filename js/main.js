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
                $lastCard = $('.card').last(),
                $newCard = $('.card').first(),
                cardTemplate = '<section class="card"><img class="cardProfile" src=""><header class="overflowAuto"><div class="cardHeaderContainer"><h1 class="cardAuthor"></h1><p class="cardLocation"></p></div></header><div class="cardEventContainer"><h1 class="cardTitle" id="cardTitle"></h1><p class="cardCopy" id="description"></p><h1 class="cardTitle">When</h1><p class="cardCopy" id="when"></p><h1 class="cardTitle">Where</h1><p class="cardCopy" id="where">Swipe right to find out!</p><h1 class="cardTitle">Going</h1><p class="cardCopy" id="going"></p></div></section>',
                mockData = {
                    "card_list": [
                        {
                            "img": "img/profile1.png",
                            "author": "Andrea",
                            "location": "Santa Monica",
                            "title": "Example 1",
                            "description": "test1",
                            "when": "test1",
                            "going": "test1"
                        },
                        {
                            "img": "img/profile1.png",
                            "author": "Andrea",
                            "location": "Orange County",
                            "title": "Example 2",
                            "description": "test2",
                            "when": "test2",
                            "going": "test2"
                        },
                        {
                            "img": "img/profile1.png",
                            "author": "Andrea",
                            "location": "Orange County",
                            "title": "Example 3",
                            "description": "test3",
                            "when": "test3",
                            "going": "test3"
                        },
                        {
                            "img": "img/profile1.png",
                            "author": "Andrea",
                            "location": "Orange County",
                            "title": "Example 4",
                            "description": "test4",
                            "when": "test4",
                            "going": "test4"
                        }
                    ]    
                };

            card.xCoordinateEnd = touch.pageX;
            card.yCoordinateEnd = touch.pageY;

            userIntent = self.computeIntent();

            // Prepends new card template
            $('.card').before(cardTemplate);
            // Sets values of card template
            $('.cardProfile').first().attr('src', mockData.card_list[self.cardIndex].img);
            $('.cardAuthor').first().html(mockData.card_list[self.cardIndex].author);
            $('.cardLocation').first().html('in ' + mockData.card_list[self.cardIndex].location);
            $('#cardTitle').first().html(mockData.card_list[self.cardIndex].title);
            $('#description').first().html(mockData.card_list[self.cardIndex].description);
            $('#when').first().html(mockData.card_list[self.cardIndex].when);
            $('#going').first().html(mockData.card_list[self.cardIndex].going);

            if (userIntent === 'left') {
                $lastCard.addClass('leaveLeft');
            } else {
                $lastCard.addClass('leaveRight');
            }

            $('.card').last().fadeOut(400, function () {
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
