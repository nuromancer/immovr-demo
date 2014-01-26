var http = require("http"); // import module http
var url = require("url");
var querystring = require("querystring");

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		var query = querystring.parse(url.parse(request.url).query);
		
		//console.log("Request for " + pathname + " received with query string:" + query);
		//console.log("Query structure:" + querystring.parse(query));
		//console.log("Queryobject:", querystring.parse(queryobject)["file"]);
		
		
		route(pathname, query, response);

		
	}

	http.createServer(onRequest).listen(8888);

	console.log("Node server started succesfully.");
	
}

// execPanoRift("p1");

exports.start = start; // so external scripts can use the function start()

/*
	var name = 'p1.jpg'
	var exec = require('child_process').exec;
	
	var child = exec('panorift.exe '+ name, { cwd: 'I:/git/immovr-demo/nodeserver/' }, function( error, stdout, stderr) 
	   {
		   if ( error != null ) {				
				console.log(error);
				console.log(stderr);
				// error handling & exit
		   }
		   console.log("Panorift.exe " + filename + " executed.");
	});	
*/


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