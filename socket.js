var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: 8081});

sockets = [];
games = [[game:{},players[]]];

wss.on('connection', function(ws) {
	console.log('new connection');
	ws.on('message', function(e) {
		message = JSON.parse(e);
		var resp = {};
		if(message.action == 'move'){
			
		}
		if(message.action == 'init'){
			console.log(message.name+' connected');
			ws.name = message.name;
			ws.id = sockets.length;
			ws.game = games.length - 1;
			ws.active = true;
			sockets[sockets.length] = ws;
			ws.field = games[games.length-1].length;
			games[games.length-1].push(ws);
			if(games[games.length-1].length == 4){
				games.push([]);
			}
		}
	});
	ws.on('close', function(){
		console.log(ws.name+' disconnected');
		ws.active = false;
	});
});
console.log('wsServer created');