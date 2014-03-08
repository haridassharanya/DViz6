/**
 * @author Sharanya Haridas
 */

/*Project Steps:
 * 1. Set up document ready
 * 2. Load Google Viz library,Google charts package
 * 3.Load data
 * 4.Render chart
 */

/*page loaded function, responds to document ready*/

function dataLoaded(UNEMPDATA) {
	console.log(UNEMPDATA);

	var gDataTable = new google.visualization.DataTable();

	//when i add columns, the first parameter is the data type in that column
	//the second parameter is the name of that column

	gDataTable.addColumn('string', UNEMPDATA.columns[0]);
	gDataTable.addColumn('number', UNEMPDATA.columns[1]);

	gDataTable.addRows(UNEMPDATA.rows);

	var ChartOptions = {

		title : "Unemployment since 1948"
	};

	//tell it to create a line chart

	/*
	 var myObsArray =unempData.observations;
	 console.log(myObsArray);
	 var myDataList = [];

	 var myHeader = ["Date", "Unemployment"];

	 myDataList.push(myHeader);

	 //converting json data to an array of arrays
	 //using a for loop
	 //this is to create my vizualization

	 for(var i=0; i<myObsArray.length; i++){

	 var myObsObj = myObsArray[i];
	 var myDataArray = [myObsObj.date, Number(myObsObj.value)];
	 myDataList.push(myDataArray);

	 }

	 console.log(myDataList);

	 //data table object
	 var myDataTable = google.visualization.arrayToDataTable(myDataList);
	 */

	var options = {
		title : "Unemployment Data Over Time"
	};

	//document.getelementbyid is the equivalent of jquery's $ sign with div name
	var myChart = new google.visualization.LineChart(document.getElementById("myChartDiv"));

	myChart.draw(gDataTable, options);

}

function googleVizloaded() {

	console.log("google viz loaded!");

	//get function for loading data

	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1TKMNqzrRA4JGaqkJGv2jGnarihWZa-vvJPBYpwv7&key=AIzaSyDo19_AYa5DRvvwPl9RmRIlsSxnmlbklqg", dataLoaded, "json");
}

function pageDone() {
	console.log("page done!");

	//load google charting package

	google.load("visualization", "1", {
		packages : ["corechart"],
		"callback" : googleVizloaded
	});
}

/*document ready function*/

$(document).ready(pageDone);
