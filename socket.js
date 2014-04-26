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
				ws.id = players.length;
				ws.active = true;
				ws.lobby = 0;
				ws.game = -1;
				players.push(ws);
			break;
			case 'nameChange':
				console.log(ws.name+' changed name to '+message.name);
				ws.name = message.name;
			break;
			case 'createGame':
				var game = {};
				game.status = 0;
				game.players = [ws.id];
				game.playerCount = message.playerCount;
				game.name = message.name;
				game.board = [];
				for(var i=0;i<8;i++){
					game.board[i] = [];
					for(var j=0;j<8;j++){
						game.board[i][j] = 0;
					}
				}
				game.id = ws.game = games.length;
				games.push(game);
				
				sendLobbyList();
				sendPlayerList(game);
				
				console.log(ws.name+' created game '+message.name);
			break;
			case 'joinLobby':
				ws.lobby = 1;
				console.log(ws.name+' joined lobby');
				var resp = JSON.stringify({action: 'lobbyList', games: createLobbyList()});
				ws.send(resp);
			break;
			case 'leaveLobby':
				ws.lobby = 0;
				console.log(ws.name+' left lobby');
			break;
			case 'joinGame':
				var game = games[message.id];
				if(game.status == 0 && ws.game == -1){
					ws.game = message.id;
					ws.lobby = 0;
					game.players.push(ws.id);
					console.log(ws.name+' joined game '+game.name);
					if(game.players.length == game.playerCount){
						game.status = 1;
						
						for(var i=0;i<8;i++){
							spawnNew(game, Math.floor(i/2));
						}
						
						for(var i=0;i<game.players.length;i++){
							if(players[game.players[i]].active == 1){
								resp = JSON.stringify({action: 'gameStart', game: game, field: i});
								players[game.players[i]].field = i;
								players[game.players[i]].send(resp);
							}
						}
						console.log('game '+game.name+' started');
					}
					sendLobbyList();
					sendPlayerList(game);
				}
			break;
			case 'leaveGame':
				if(ws.game != -1){
					var game = games[ws.game]
					if(game.status == 0){
						var index = game.players.indexOf(ws.id);
						game.players.splice(index, 1);
						ws.game = -1;
						console.log(ws.name+' left game '+game.name);
						if(game.players.length == 0){
							game.status = 4;
							console.log(game.name+' wasn\'t very popular and was removed therefore');
						}
						else{
							sendPlayerList(game);
						}
						sendLobbyList();
					}
				}
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

function sendLobbyList(){
	var list = createLobbyList();
	var resp = JSON.stringify({action: 'lobbyList', games: list});
	for(var i=0;i<players.length;i++){
		if(players[i].lobby == 1 && players[i].active == true){
			players[i].send(resp);
		}
	}
}

function createLobbyList(){
	var gameList = [];
	for(var i=0;i<games.length;i++){
		if(games[i].status == 0){
			gameList.push({players: games[i].players, playerCount: games[i].playerCount, name: games[i].name, id: i});
		}
	}
	return gameList;
}

function sendPlayerList(game){
	var list = createPlayerList(game);
	var resp = JSON.stringify({action: 'playerList', players: list});
	for(var i=0;i<game.players.length;i++){
		if(players[game.players[i]].active == true){
			players[game.players[i]].send(resp);
		}
	}
}

function createPlayerList(game){
	var playerList = [];
	for(var i=0;i<game.players.length;i++){
		playerList.push({name: players[game.players[i]].name});
	}
	return playerList;
}

function spawnNew(game, field){
	var board = game.board;
	var free = [];
	var xPlus = 0;
	var yPlus = 0;
	if(field > 1){
		yPlus = 4;
	}
	if(field/2 != Math.round(field/2)){
		xPlus = 4;
	}
	for(var i in board){
		for(var j in board[i]){
			if(board[i][j] == 0 && j >= xPlus && j < xPlus + 4 && i >= yPlus && i < yPlus + 4){
				free.push({y: i, x: j});
			}
		}
	}
	var tile = free[Math.floor(Math.random()*free.length)];
	var four = Math.floor(Math.random() * 1.25);
	if(four){
		board[tile.y][tile.x] = 4;
	}
	else{
		board[tile.y][tile.x] = 2;
	}
}