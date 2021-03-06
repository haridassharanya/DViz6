/**
 * @author Sharanya Haridas
 */


var stemURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Kg4n_bZlh1j5xK_KG8KxJWFjRz4Ia4r-HS8-iCUZ+WHERE+DATE%3E%20";
var key = "&key=AIzaSyDo19_AYa5DRvvwPl9RmRIlsSxnmlbklqg";


function showNewData(e) {
	
	var myID = e.target.id; //e.g. "year_2000"
	console.log(myID);
	var myNameArray = myID.split("_");// splits into array, 2000 will be second
	console.log(myNameArray);
	
	var myYear = myNameArray[1]; //grab the year
	
	$.get(stemURL+"'"+myYear+"-12-01'"+key, dataLoaded, "json");
	
	
}


/*Outline:
 
    This program aims to use an API to a google fusion table as a means 
	 to get the data into a chart to be displayed on our webpage.
	 The data is from the FRED database and is on Civilian Unemployment  rate over the years.
	 We only want to display the data from a specified time post 2000 in a Line chart
 * Initial steps:
 /*1)FRED data on Civilian Unemployment is saved as a csv file to our local folder
 * 2)Index.html and scripts.js from previous assignment for are saved to the same folder to be modified 
 * e.g. by converting unneccessary to code to comment to do a way with it and then changing the code
 * 3)A copy of the data is saved as a fusion table on the Google Drive
 * The link for this is: https://www.google.com/fusiontables/DataSource?docid=1Kg4n_bZlh1j5xK_KG8KxJWFjRz4Ia4r-HS8-iCUZ#rows:id=1
 * A json array of array style format of the data is generated online as a link using google fusion table id and the sql api key
 */



/*As part of the assignment, I changed varible and function names as follows:
 *googleChart to gChart,
 * gDataTable to gTable
 * UNEMPDATA to CIVUNEMP
 * ChartOptions to ChartOpt
 * options to mOptions
 * googleVizloaded to gVizloaded
 * pageDone to mDone*/

//the following function loads data in CIVUNEMP

function dataLoaded(CIVUNEMP) {
	console.log(CIVUNEMP);
	
	//the following variable calls for a table gTable with two columns and multiple rows
	//when I add columns, the first parameter is the data type in that column
	//the second parameter is the name of that column

	var gTable = new google.visualization.DataTable();

	

	gTable.addColumn('string', CIVUNEMP.columns[0]);
	gTable.addColumn('number', CIVUNEMP.columns[1]);

	gTable.addRows(CIVUNEMP.rows);



	var ChartOpt = {

		title : "Unemployment since 1948"
	};

	//the below code says to to create a line chart of data from 2000 to present

	var mOptions = {
		title : "Unemployment Data: 2000 to present"
	};

	//document.getelementbyid is the equivalent of jquery's $ sign with div name
	//this variable gChart is referenced by the index.html file in creating a div for the page heading
	
	var gChart = new google.visualization.LineChart(document.getElementById("mChartDiv"));

	gChart.draw(gTable, mOptions);

}

//the following function asks to load the google visualization table

function gVizloaded() {

	console.log("google visualization is loaded!");
	$(".btn-success").on("click", showNewData);

	//get function for loading data from google fusion tables using sql api. 
	
	/*
	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Kg4n_bZlh1j5xK_KG8KxJWFjRz4Ia4r-HS8-iCUZ+WHERE+DATE%3E%20'2000-12-01'&key=AIzaSyDo19_AYa5DRvvwPl9RmRIlsSxnmlbklqg", dataLoaded, "json");
	*/
	
	
$("#year_2000").click();

//$("#year_2000")= $() means this is a jquery function, the # means "year_2000" is the id of the div 
	
	
	//$.get(stemURL+"'2000-12-01'"+key, dataLoaded, "json");
}


   //the link in the first parameter essentially says, SELECT everything(*) FROM the given fusion table id where 
	//the DATE property is as explained and 
	//the SQL API key is as given after the &key=
	//the second parameter activates the function dataLoaded and the third explains that it is a json format online

//the fucntion below is to load the page and notify the same in the console

function mDone() {
	console.log("page done!");

	//the below loads google charting package

	google.load("visualization", "1", {
		packages : ["corechart"],
		"callback" : gVizloaded
	});
}

/*

function setNav() {
	
	console.log("setNav");
	
	$(".btn-success").on("click", function(e) {
		var myId = e.target.id
		
		console.log(myId);
		
	});
	
}


*/
//document ready function: asks to run the mDone function as soon as the document is ready to be manipulated

$(document).ready(mDone);
