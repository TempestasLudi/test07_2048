var WebSocketServer = require('ws').Server,
	wss = new WebSocketServer({port: 8081});

players = [];
games = [];

wss.on('connection', function(ws) {
	console.log('new connection');
	ws.on('message', function(e) {
		message = JSON.parse(e);
		var resp = {};
		switch(message.action){
			case 'init':
				console.log(message.name+' connected');
				ws.name = message.name;
				ws.id = sockets.length;
				ws.game = games.length - 1;
				ws.active = true;
				ws.lobby = 0;
				players.push(ws);
			break;
			case 'nameChange':
				console.log(ws.name+' changed name to '+message.name);
				ws.name = message.name;
			break;
			case 'createGame':
				var game = {};
				game.status = 0;
				game.players = [];
				game.playerCount = message.playerCount;
				game.name = ;
				game.board = [];
				for(var i=0;i<8;i++){
					game.board[i] = [];
					for(var j=0;j<8;j++){
						game.board[i][j];
					}
				}
				games.push(game);
				
				var message = JSON.stringify({action: 'lobbyList', games: games});
				for(var i=0;i<players.length;i++){
					if(player[i].lobby == 1 && player[i].active == true){
						players[i].send(message);
					}
				}
				
				console.log(ws.name+' created game '+message.name);
			break;
			case 'joinLobby':
				ws.lobby = 1;
				console.log(ws.name+' joined lobby');
			break;
			case 'leaveLobby':
				ws.lobby = 0;
				console.log(ws.name+' left lobby');
			break;
			case 'joinGame':
				
			break;
			case 'leaveGame':
				
			break;
			case 'move':
				
			break;
		}
	});
	ws.on('close', function(){
		console.log(ws.name+' disconnected');
		ws.active = false;
	});
});
console.log('wsServer created');