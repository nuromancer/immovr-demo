
$( function() {

	$( document ).ready(function() {
		// Handler for .ready() called.
		
		openRiftServer();
	});
	
	$("#sv-button").click(function() {
		$("#test-div").text("Open street view.");
		$.ajax({
			url: 'http://127.0.0.1:8888/streetview',
			//dataType: "jsonp",
			//jsonpCallback: "_testcb",
			//cache: false,
			//timeout: 5000,
			success: function(response) {
				$("#test-div").text("Succesfully started riftserver.exe");
				window.open("http://oculusstreetview.eu.pn/?lat=44.301996&lng=9.211584000000016&q=3&s=false&heading=0");
			}
		});
		
	});
	
	$("#ec-button").click(function() {
		$("#test-div").text("Open epic citadel demo.");
		window.open("http://www.unrealengine.com/html5/");
	});
	
	$("#tp-button").click(function() {
		$("#test-div").text("Open tropical paradise.");
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
		$("#test-div").text("Open inside view.");			
		
		$.ajax({
			url: 'http://127.0.0.1:8888/panorift?file=p1',
			//dataType: "jsonp",
			//jsonpCallback: "_testcb",
			//cache: false,
			//timeout: 5000,
			success: function(response) {
				$("#test-div").text("Succesfully started panorift.exe");
			}
		});
		
	}
	
});


