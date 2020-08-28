$(document).ready(function() {
	var source = $("#entry-template").html();
	var template = Handlebars.compile(source);
	$.ajax(
		{
			url: "https://flynn.boolean.careers/exercises/api/array/music",
			method : "GET",
			success: function (data) {
				var cds = data.response;
				console.log(cds);
				for (var i=0; i<cds.length; i++){
					var cd = {
						"poster" : cds[i].poster,
						"title" : cds[i].title,
						"author" : cds[i].author,
						"genre" : cds[i].genre,
						"year" : cds[i].year,
					}
					var html = template(cd);
					$(".cds-container").append(html);
				}
			},
			error: function (){
				alert("Errore");
			}
		}
	)
});