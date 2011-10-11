// This file is to be launched with Node.js

var http = require('http'),
fs = require('fs'),
util = require('util'),
url = require('url'),
rpcHandler = require('./jsonrpc').RPCHandler;

var logPath = 'log.txt';

function among(command, possibilities) {
	var result = [];
	for (var i in possibilities) {
		var possibility = possibilities[i];
		if (possibility.substr(0, command.length) == command) {
			result.push(possibility);;
		}
	};
	return result;
};

var rpcMethods = {
	'complete' : function(rpc, args) {
		switch (args[0]) {
		case 'log':
			rpc.response(among(args[args.length - 1], [ 'foobar', 'foo', 'bar' ]));
			break;
			
		default:
			rpc.response();
			break;
		}
	},
	'execute' : function(rpc, args) {
		switch (args[0]) {
		case 'log':
			rpc.response([]);
			console.log(args.slice(1).join('\n'));
			break;
			
		default:
			rpc.response();
			break;
		}
	}
};

var route = {
	'/' : {
		contentType : 'text/html',
		path : 'index.html'
	},
	'/jquery.terminal.css' : {
		contentType : 'text/css',
		path : '../../jquery.terminal.css'
	},
	'/jquery.terminal.js' : {
		contentType : 'text/javascript',
		path : '../../jquery.terminal.js'
	}
};

http.createServer(function(request, response) {
	var parsed = url.parse(request.url);
	if (parsed.pathname == '/endpoint') {
		new rpcHandler(request, response, rpcMethods);
	} else {
		var routed = route[parsed.pathname];
		if(routed) {
			response.writeHead(200, {'content-type': routed.contentType});
			var rs = fs.createReadStream(routed.path);
			util.pump(rs, response);
		} else {
			response.writeHead(404, {'content-type': 'text/html'});
			response.end();
		}
	}
}).listen(8080, 'localhost');