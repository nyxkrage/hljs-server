const net = require('net');
const fs = require('fs');
const hljs = require('highlight.js');  // require only the core library

var server = net.createServer(function(client) {
	client.setEncoding('utf8');
	client.on('data', (d) => {
		console.log(d);
		let data = d.split(":");
		let lang = data[0];
		let content = data.slice(1).join(':');
		console.log(lang + "\n" + content);
		const hc = hljs.highlight(lang,content).value;
		client.write(hc);
		client.destroy()
	});
});

server.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
        var clientSocket = new net.Socket();
        clientSocket.on('error', function(e) { // handle error trying to talk to server
            if (e.code == 'ECONNREFUSED') {  // No other server listening
                fs.unlinkSync('/tmp/sfss/sfss.sock');
                server.listen('/tmp/sfss/sfss.sock', function() { //'listening' listener
                    console.log('server recovered');
                });
            }
        });
        clientSocket.connect({path: '/tmp/sfss/sfss.sock'}, function() { 
            console.log('Server running, giving up...');
            process.exit();
        });
    }
});

console.log("Started");
server.listen('/tmp/sfss/sfss.sock');
