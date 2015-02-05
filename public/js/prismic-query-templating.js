(function(global) {
	//arguments to this function will be used as the predicates for the query
	global.getResources = function(){
		predicates = arguments;
		var maps = {
			person: function(ctx, item){
				return {
								name : item.getText("person.first_name") + " " + item.getText("person.surname"),
								title : item.getText("person.title"),
								organisation : item.getText("person.organisation"),
								position : item.getText("person.position"),
								description : item.getText("person.description"),
								image : item.getImage("person.image").views.icon.url,
								link : ctx.linkResolver(ctx, item)
							};
			},
			organisation : function(ctx, item){
				return {
								displayName : item.getText("organisation.displayName"),
								about : item.getText("organisation.about"),
								image : item.getImage("organisation.illustration").views.icon.url,
								link : item.getLink("organisation.website").value.url
							};
			}
		}

		Helpers.withPrismic(function(ctx) {
			var containerSelector = "#template_container";
			if($(containerSelector).length === 0){
				console.error("can not find '" + containerSelector + "'");
				return
			}
			var queryBuilder = ctx.api.form('everything')
														.ref(ctx.api.master());
				queryBuilder.query.apply(queryBuilder, predicates)
				//.query(predicates)// BUG if this is an array it needs to be turned to args eg http://stackoverflow.com/questions/1316371/converting-a-javascript-array-to-a-function-arguments-list
					.submit(function (err, response) {
            if (err) {
              console.log(err);
              done();
            }
						theResponse = response;
						if(response.total_results_size === 0){
							console.log("No results returned");
						}
							
						response.results.forEach(function(item){
							var type = item.type;
							if(typeof maps[type]  === 'undefined'){ console.log("no map found for " + type);return;}
							var mappedItem = maps[type](ctx, item);
							$(containerSelector).loadTemplate("/templates/" + type + ".html", mappedItem, {append:true, isFile:true});
						});
						//$("#template_holder").loadTemplate("/templates/person.html",people, {append:true, isFile:true});
        });
		});
	};
}(window));