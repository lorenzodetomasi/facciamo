var facciamoJson;
		$.ajax({
    url: 'js/facciamo.json',
    dataType: 'json',
    async: false,
    success: function(data) {
						facciamoJson = data;
				}
		});
Ember.I18n.translations = facciamoJson;
});