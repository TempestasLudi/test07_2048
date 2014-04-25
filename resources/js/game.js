$(document).ready(function(){
	var url;
	if(window.location.hostname == '127.0.0.1' || window.location.hostname.substr(0, 7) == '192.168' || window.location.hostname == 'localhost'){
		url = 'ws://'+window.location.hostname+':8081';
	}
	else{
		url = 'ws://'+window.location.hostname+':81';
	}

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
                                
                            break;
                            case 'gameStart':
                                
                            break;
                            case 'playerList':
                                
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
                        connection.send(JSON.stringify({action: 'createGame', name: $('.game-creator .name').val(), playerCount:$('.game-creator .players')}))
		moveView('waiting-room');
	});
            
            $('.name-wrapper .name').change(function(){
                        connection.send(JSON.stringify({action: 'nameChange', name: $('.name-wrapper .name').val()}));
            });
            
            $('.set-screen[data-screen="lobby"]').click(function(){
                        connection.send(JSON.stringify({action: 'joinLobby'}));
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

