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
        },
	};


	(function() {
		framework.initializer();
	}());

});
