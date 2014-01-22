// var querystring = require("querystring");

var isRiftServerRunning = false;
var RiftServerChild;

function route(pathname, query, response) {
  console.log("Path: " + pathname);
  console.log("Query: " + query);
  
  if (pathname == "/panorift")
  {
	var filename = query["file"];	
	startPanoRift(filename);	
  }	
  else if (pathname == "/streetview")
  {
	startRiftServer(response);
  }
  
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("URL query acknowledged..");
  response.end();

}

exports.route = route;


function startPanoRift(filename)
{
	console.log("Is server running? :", isRiftServerRunning);
	if (isRiftServerRunning == true)
	{
		closeRiftServer();
		setTimeout(function(){ 
		
			execPanoRift(filename)}
			
			
			,1000);
	}
	else { execPanoRift(filename);}
	
	
}

function execPanoRift(filename)
{
	var filename = filename + '.jpg';
	console.log("Execute panorift.exe " + filename);
	
	var exec = require('child_process').exec;
	
	var child = exec('panorift.exe ' + filename, { cwd: 'I:/git/immovr-demo/nodeserver/' }, function( error, stdout, stderr) 
	//var child = exec('panorift.exe ' + filename, { cwd: './apps/panorift' }, function( error, stdout, stderr) 
	   {
		   if ( error != null ) {				
				console.log(error);
				console.log(stderr);
				// error handling & exit
		   }		   
	});	
	
	child.on('exit', function(code) {
		console.log("Panorift.exe " + filename + " closed.");
	});
}


function startRiftServer(response)

{
	console.log("Start rift server. ");	
	var exec = require('child_process').exec;
	// var execFile = require('child_process').execFile;
	var child = exec('riftserver.exe', { cwd: './apps/riftserver_0_3/bin' }, function( error, stdout, stderr) 
	//var child = exec('riftserver.exe', function( error, stdout, stderr) 
	   {
		   if ( error != null ) {				
				console.log(error);
				console.log(stderr);
				// error handling & exit
		   }
		   		   
		   response.writeHead(200, {"Content-Type": "text/plain"});
		   response.end();
	});
	
	child.on('exit', function(code) {
		console.log("Riftserver closed.");
	});
	
	isRiftServerRunning = true;
	RiftServerChild = child;
}

function closeRiftServer()
{

	console.log("-------------- Close RiftServer.");	
	
	var exec = require('child_process').exec;
	// var execFile = require('child_process').execFile;
	var child = exec('TASKKILL /F /IM riftserver.exe', { cwd: './apps/riftserver_0_3/bin' }, function( error, stdout, stderr) 
	   {
		   if ( error != null ) {				
				console.log(error);
				console.log(stderr);
				// error handling & exit
		   }	   
		   
	});
	
	isRiftServerRunning = false;
	
}



/*


                               url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring(string)["foo"]    |
                                            |
                         querystring(string)["hello"]
*/					