
$( function() {

	$( document ).ready(function() {
		// Handler for .ready() called.
		
		openRiftServer();
	});
	
	$("#sv-button").click(function() {
		//$("#test-div").text("Open street view.");
		window.open("http://oculusstreetview.eu.pn/?lat=44.301996&lng=9.211584000000016&q=3&s=false&heading=0");
	});
	
	$("#ec-button").click(function() {
		//$("#test-div").text("Open street view.");
		window.open("http://www.unrealengine.com/html5/");
	});
	
	$("#tp-button").click(function() {
		//$("#test-div").text("Open street view.");
		window.open("http://unity3d.com/gallery/demos/live-demos#tropical-paradise");
	});
	
	$("#iv-button").click(function() {
		//$("#test-div").text("Open inside view.");
		openInsideView();
	});
	
	function openRiftServer()
	{
		// open rift server
		//$("#test-div").text("Open Rift Server.");
		
	}


	function openInsideView()
	{
		// open inside view
		
	}
	
});


