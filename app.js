var app = new function() {
	var dataURL = "terms.json", // "http://hawttrends.appspot.com/api/terms/"
		customSearchKey = "AIzaSyC3osdR6-pmEJ6n_o-iQd9wku_4b_qlbng",
		container = $("#content"),
		imageSearch;

	this.fetch = function() {
		$.getJSON(dataURL, handleTrends);
	};

	var handleTrends = function(data) {
		$.each(data, function(index, terms) {
			$.each(terms, search);
		});
	};

	var search = function(index, term) {
		var title = $("<h2/>").text(term);
		var row = $("<div/>").addClass("row").append(title).appendTo(container);

		var imageSearch = new google.search.ImageSearch();
		imageSearch.setResultSetSize(6);
		imageSearch.setSearchCompleteCallback(this, function(searcher) {
			$.each(searcher.results, function(index, result) {
				display(row, result);
			});
		}, [imageSearch]);
		imageSearch.execute(term);
	};

	var display = function(row, result) {
		var title = $("<h3/>").html(result.titleNoFormatting);
		var img = $("<img/>", { src: result.tbUrl });
		$("<div/>").addClass("cell").append(img).append(title).appendTo(row);
	};
};

google.load("search", "1");
google.setOnLoadCallback(app.fetch);