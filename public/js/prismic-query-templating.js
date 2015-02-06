(function(global) {
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
			},
			article : function(ctx, item){
				return {
								displayName : item.getText("organisation.displayName"),
								about : item.getText("organisation.about"),
								image : item.getImage("organisation.illustration").views.icon.url,
								link : item.getLink("organisation.website").value.url
							};
			},
			
		}
	var getContainer = function(){
		var containerSelector = "#template_container";
		var container = $(containerSelector);
		if(container.length === 0){
			throw "can not find '" + containerSelector + "'";
		}
		return container;
	}
	//arguments to this function will be used as the predicates for the query
	global.getResources = function(){
		predicates = arguments;
		
		Helpers.withPrismic(function(ctx) {
			var container = getContainer();
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
							container.loadTemplate("/templates/" + type + ".html", mappedItem, {append:true, isFile:true});
						});
				});
		});
	};
	global.getArticle = function(id, slug){
		Helpers.withPrismic(function(ctx) {
			var container = getContainer();
			ctx.api.form('everything')
				.ref(ctx.api.master())
				.query(Prismic.Predicates.at("document.id", id), Prismic.Predicates.at("document.type", "article"))
				.submit(function(err, docs) {
					if (err) {
              console.log(err);
              done();
            }
					var doc = docs.results[0];
										
					// If the slug doesn't match
					if(doc.slug != slug) {
							// If this is an old valid slug, redirect
							if(doc.slugs.indexOf(slug) > -1) {
									document.location = ctx.linkResolver(ctx, doc);
							} else {
									document.location = 'notfound.html';
							}
					}
										
					if(!doc || doc.type !== 'article') {
							document.location = 'notfound.html';
					}
					container.append(doc.asHtml());
				});
		});
	};
}(window));