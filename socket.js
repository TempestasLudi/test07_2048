var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: 8081});

sockets = [];

setInterval(persons, 50);
setInterval(cleanup, 5000);

wss.on('connection', function(ws) {
	console.log('new connection');
	ws.on('message', function(e) {
		message = JSON.parse(e);
		var resp = {};
		if(message.action == 'set'){
			for(i in message){
				if(i != 'action'){
					ws[i] = message[i];
				}
			}
		}
		if(message.action == 'init'){
			console.log(message.name+' connected');
			ws.name = message.name;
			ws.id = sockets.length;
			ws.position = {x: Math.random()*640, y: Math.random()*480};
			ws.active = true;
			sockets[sockets.length] = ws;
		}
	});
	ws.on('close', function(){
		console.log(ws.name+' disconnected');
		ws.active = false;
	});
});
console.log('wsServer created');

function send(resp){
	for(i in sockets){
		if(sockets[i].active){
			try{
				sockets[i].send(JSON.stringify(resp));
			}
			catch(err){
				console.log(err);
			}
		}
	}
}

function persons(){
	var persons = [];
	for(i in sockets){
		if(sockets[i].active){
			persons[sockets[i].id] = {name: sockets[i].name, position: sockets[i].position};
		}
	}
	send({action: 'persons', persons: persons});
}

function cleanup(){
	
}