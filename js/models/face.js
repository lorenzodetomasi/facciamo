Facciamo.Face = DS.Model.extend({
  id: DS.attr('string'),
  isBought: DS.attr('boolean')
});
Facciamo.Face.FIXTURES = [
		{
				id: "cucu",
				isBought: true
		},
		{
				id: "testa_scura",
				isBought: true
		}
];