$(document).ready(function() {
	// creo il template per i cd con handlebars
	var source = $("#entry-template").html();
	var template = Handlebars.compile(source);

	var select = $("select");

	// funzione che mostra soltanto i cd che appartengono alla categoria selezionata nel select
	select.change(function (){
		var selectedGenre = select.find(":selected").val();
		if (selectedGenre == "All"){
			$(".cd").show();
			return 0;
		}
		$(".cd").each(function(){
			if ($(this).hasClass(selectedGenre)){
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	})
	
	// creo tutti i cd con i dati restituiti dall'API
	$.ajax(
		{
			url: "https://flynn.boolean.careers/exercises/api/array/music",
			method : "GET",
			success: function (data) {
				var cds = data.response;
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