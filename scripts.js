/**
 * @author Sharanya Haridas
 */


	

/*As part of the assignment, I changed varible and function names as follows:
 *myChart to mChart,
 * gDataTable to gTable
 * UNEMPDATA to CIVUNEMP
 * ChartOptions to ChartOpt
 * options to mOptions
 * googleVizloaded to gVizloaded
 * pageDone to mDone*/

function dataLoaded(CIVUNEMP) {
	console.log(CIVUNEMP);

	var gTable = new google.visualization.DataTable();

	//when i add columns, the first parameter is the data type in that column
	//the second parameter is the name of that column

	gTable.addColumn('string', CIVUNEMP.columns[0]);
	gTable.addColumn('number', CIVUNEMP.columns[1]);

	gTable.addRows(CIVUNEMP.rows);

	var ChartOpt = {

		title : "Unemployment since 1948"
	};

	//tell it to create a line chart

	/*
	 var myObsArray =CivunempData.observations;
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

	var mOptions = {
		title : "Unemployment Data: 2000 to present"
	};

	//document.getelementbyid is the equivalent of jquery's $ sign with div name
	var mChart = new google.visualization.LineChart(document.getElementById("mChartDiv"));

	mChart.draw(gTable, mOptions);

}

function gVizloaded() {

	console.log("google visualization is loaded!");

	//get function for loading data

	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Kg4n_bZlh1j5xK_KG8KxJWFjRz4Ia4r-HS8-iCUZ+WHERE+DATE%3E%20'2000-12-01'&key=AIzaSyDo19_AYa5DRvvwPl9RmRIlsSxnmlbklqg", dataLoaded, "json");
}

function mDone() {
	console.log("page done!");

	//load google charting package

	google.load("visualization", "1", {
		packages : ["corechart"],
		"callback" : gVizloaded
	});
}

/*document ready function*/

$(document).ready(mDone);
