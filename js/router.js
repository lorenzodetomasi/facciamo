Facciamo.Router.map(function () {
  this.resource('splash', { path: '/' });
  this.resource('index');
		this.resource('dove_sei');
		this.resource('chicchirichi');
		this.resource('due');
		this.resource('cattivo');
		this.resource('boccuccia');
		this.resource('bimbo');
		this.resource('giocoliere');
		this.resource('e_gli_occhi');
		this.resource('silenzioso');
		this.resource('ma_si');
		this.resource('cucu');
		this.resource('raffreddato');
		this.resource('alieno');
		this.resource('oh');
		this.resource('che_buio');
		this.resource('arrossisco');
		this.resource('nero');
		this.resource('testa_scura');
		this.resource('ciao');
		this.resource('ovale');
		this.resource('non_ce');
  this.resource('for_parents');
});

Facciamo.SplashRoute = Ember.Route.extend({
  enter: function () {
				Ember.run.later(this, function () {
								$('#splash').css("opacity",1);
				}, 1);
				Ember.run.later(this, function () {
						currentRoute = this;
						$('#splash').css("opacity",0);
						$('#splash').one("transitionend", function(){
								currentRoute.transitionTo('index');
						});
				}, 3000);
		}
});
Facciamo.IndexRoute = Ember.Route.extend({
		enter: function () {
				Ember.run.later(this, function () {
						$('#index').css("opacity",1);
				}, 1);
		},
  model: function () {
    return Facciamo.Face.find();
  }
});
Facciamo.For_parentsRoute = Ember.Route.extend({
		
});
