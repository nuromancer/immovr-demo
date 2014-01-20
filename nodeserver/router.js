// var querystring = require("querystring");

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
}

exports.route = route;


function startPanoRift(filename)
{
	
	var filename = filename + '.jpg';
	console.log("Execute panorift.exe " + filename);
	
	var exec = require('child_process').exec;
	
	// var child = exec('panorift.exe ' + filename, { cwd: 'I:/git/immovr-demo/nodeserver/' }, function( error, stdout, stderr) 
	var child = exec('panorift.exe ' + filename, { cwd: 'I:/git/immovr-demo/apps/panorift' }, function( error, stdout, stderr) 
	   {
		   if ( error != null ) {				
				console.log(error);
				console.log(stderr);
				// error handling & exit
		   }
		   console.log("Panorift.exe " + filename + " executed.");
	});	
}


function startRiftServer(response)
{
	console.log("Start rift server. ");	
	var exec = require('child_process').exec;
	// var execFile = require('child_process').execFile;
	var child = exec('riftserver.exe', { cwd: 'I:/git/immovr-demo/nodeserver/' }, function( error, stdout, stderr) 
	//var child = exec('riftserver.exe', function( error, stdout, stderr) 
	   {
		   if ( error != null ) {				
				console.log(error);
				console.log(stderr);
				// error handling & exit
		   }
		   console.log("Rift server started.");	
		   response.writeHead(200, {"Content-Type": "text/plain"});
		   response.write("Rift server started.");		
		   response.end();
	});
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