/*$(document).ready(function(){
	var url;
	if(window.location.hostname == '127.0.0.1' || window.location.hostname.substr(0, 7) == '192.168' || window.location.hostname == 'localhost'){
		url = 'ws://'+window.location.hostname+':8081';
	}
	else{
		url = 'ws://'+window.location.hostname+':81';
	}

	connection = new WebSocket(url);
	connection.onopen = function(){
		//prompt("Please enter your name", getName());
		connection.send(JSON.stringify({action: 'init', name: getName()}));
		init();
	};
	
	connection.onerror = function(error) {
		console.log('WebSocket Error ', error);
	};
	
	connection.onmessage = function(e){
		var message = JSON.parse(e.data);
		if(message.action == 'persons'){
			$('.game-wrapper .cursor').each(function(){
				person = message.persons[$(this).attr('data-id')];
				if(person == undefined){
					$(this).remove();
				}
				else{
					$(this).css('top', person.position.y);
					$(this).css('left', person.position.x);
					message.persons[$(this).attr('data-id')] = undefined;
				}
			});
			for(i in message.persons){
				if(message.persons[i] != undefined){
					$('.game-wrapper').append(
						'<img class="cursor" src="cursor.png"  data-id="'+i+'" style="top:'+message.persons[i].position.y+';left:'+message.persons[i].position.x+'" />'
					);
				}
			}
		}
	};
});

function init(){
	$('.game-wrapper').mousemove(function(e){
		connection.send(JSON.stringify({action: 'set', position: {x: e.pageX - $(this).offset().left, y: e.pageY - $(this).offset().top}}));
	});
}

function getName(){
	part1 = [
		'Sticky',
		'Australian',
		'Dangerous',
		'Fiery',
		'Large',
		'Pink',
		'Lonely',
		'Grilled',
		'Fluffy',
		'Icy',
		'Rich'
	]
	part2 = [
		'ninja',
		'warrior',
		'bear',
		'balloon',
		'bomb',
		'tree',
		'zombie',
		'kangaroo',
		'tomato',
		'book'
	]
	return part1[Math.floor(Math.random()*part1.length)]+' '+part2[Math.floor(Math.random()*part2.length)];
}*/