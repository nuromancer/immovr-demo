function route(pathname) {
  console.log("About to route a request for " + pathname);
}

exports.route = route;


function startPanoRift()
{
	console.log("Execute panorift.exe ...");
	var theJobType = 'p1.jpg';
	var exec = require('child_process').exec;
	var child = exec('panorift.exe ' + theJobType, { cwd: '../apps/panorift/' }, function( error, stdout, stderr) 
	   {
		   if ( error != null ) {				
				console.log(error);
				console.log(stderr);
				// error handling & exit
		   }

		   // normal 

	   });

}