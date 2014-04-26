$(document).ready(function(){
	var url;
	if(window.location.hostname == '127.0.0.1' || window.location.hostname.substr(0, 7) == '192.168' || window.location.hostname == 'localhost'){
		url = 'ws://'+window.location.hostname+':8081';
	}
	else{
		url = 'ws://'+window.location.hostname+':81';
	}
	
	game = {status = 0};
	
	keymap = [37: 'left', 38: 'top', 39: 'right', 40: 'bot'];

	connection = new WebSocket(url);
	connection.onopen = function(){
		connection.send(JSON.stringify({action: 'init', name: $('.name-wrapper .name').val()}));
	};
	
	connection.onerror = function(error) {
		console.log('WebSocket Error ', error);
	};
	
	connection.onmessage = function(e){
		var message = JSON.parse(e.data);
		switch (message.action){
			case 'move':
				
			break;
			case 'gameEnd':
				
			break;
			case 'lobbyList':
				createLobby(message.games);
			break;
			case 'gameStart':
				moveView('game');
				game = message.game;
				field = message.field;
				var xPlus = 0;
				var yPlus = 0;
				if(field > 1){
					yPlus = 4;
				}
				if(field/2 != Math.round(field/2)){
					xPlus = 4;
				}
				var y = 0;
				$('.game-wrapper .board .grid-row').each(function(){
					var x = 0;
					$(this).children().each(function(){
						//$(this).attr('data-x', x).attr('data-y', y);
						if(x >= xPlus && x < xPlus + 4 && y >= yPlus && y < yPlus + 4){
							$(this).css('background-color', 'rgba(238, 228, 218, 0.35)');
						}
						x++;
					});
					y++;
				});
				for(var i in game.board){
					for(var j in game.board[i]){
						if(game.board[i][j] != 0){
							$('<div class="tile">'+game.board[i][j]+'</div>').appendTo('.tile-container')
							.css('top', i*72 + 8).css('left', j*72 + 8).attr('data-x', j).attr('data-y', i);
						}
					}
				}
			break;
			case 'playerList':
				createWaitingroom(message.players);
			break;
		}
	};
	
	pages = {};
	pages['menu'] = 'menu-wrapper';
	pages['game'] = 'game-wrapper';
	pages['set-name'] = 'name-wrapper';
	pages['lobby'] = 'games-wrapper';
	pages['create-game'] = 'game-creator';
	pages['waiting-room'] = 'game-waiter';
	
	$('button.set-screen').click(function(){
		moveView($(this).attr('data-screen'));
	});
	
	$('.game-creator button.create').click(function(){
        connection.send(JSON.stringify({action: 'createGame', name: $('.game-creator .name').val(), playerCount:$('.game-creator .players').val()}))
		moveView('waiting-room');
	});
    
	$('.name-wrapper .name').change(function(){
		connection.send(JSON.stringify({action: 'nameChange', name: $('.name-wrapper .name').val()}));
	});
	
	$('.set-screen[data-screen="lobby"]').click(function(){
		connection.send(JSON.stringify({action: 'joinLobby'}));
	});
	
	$('.game-waiter .set-screen[data-screen="lobby"]').click(function(){
		connection.send(JSON.stringify({action: 'leaveGame'}));
	});
	
	$('.games-wrapper .set-screen[data-screen="menu"]').click(function(){
		connection.send(JSON.stringify({action: 'leaveLobby'}));
	});
	
	$('.games-wrapper .set-screen[data-screen="menu"]').click(function(){
		connection.send(JSON.stringify({action: 'leaveLobby'}));
	});
	
	$('.set-screen[data-screen="create-game"]').click(function(){
		$('.game-creator .form .name').focus();
	});
	
	$('body').keypress(function(e){
		if(game.status == 1){
			if(e.which <= 40 && e.which >= 37){
				connection.send(JSON.stringify({action: 'move', direction: keymap[e.which]}));
			}
		}
	});
});

function moveView(screen){
	var title = screen.replace('-', ' ');
	title = title.charAt(0).toUpperCase() + title.slice(1);
	document.title = title;
	var elem = $('.'+pages[screen]);
	var left = parseFloat($(elem).position().left / $(elem).parent().width() * 100);
	var top = parseFloat($(elem).position().top / $(elem).parent().height() * 100);
	$('.screen').each(function(){
		posLeft = parseFloat($(this).position().left / $(this).parent().width() * 100);
		posTop = parseFloat($(this).position().top / $(this).parent().height() * 100);
		$(this).animate({left: (posLeft - left)+'%', top: (posTop - top)+'%'});
	});
}

function createLobby(games){
	$('.games-wrapper .games').html('');
	for(var i in games){
		$('<div class="game" data-game-id="'+games[i].id+'"><span class="name">' + games[i].name + '</span><span class="playercount">' + games[i].players.length + '/' + games[i].playerCount + '</span></div>').appendTo('.games-wrapper .games')
		.click(function(){
			connection.send(JSON.stringify({action:'joinGame', id: $(this).attr('data-game-id')}));
			moveView('waiting-room');
		});
	}
}

function createWaitingroom(players){
	$('.game-waiter .players').html('');
	for(var i in players){
		$('<div class="player"><span class="name">' + players[i].name + '</span></div>').appendTo('.game-waiter .players');
	}
}