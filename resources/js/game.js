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
		connection.send(JSON.stringify({action: 'init', name: getName()}));
	};
	
	connection.onerror = function(error) {
		console.log('WebSocket Error ', error);
	};
	
	connection.onmessage = function(e){
		var message = JSON.parse(e.data);
	};
	
	$('button.set-screen').click(function(){
		var elem = $('.'+$(this).attr('data-screen'));
		var left = parseFloat($(elem).position().left / $(elem).parent().width() * 100);
		var top = parseFloat($(elem).position().top / $(elem).parent().height() * 100);
		console.log(left, top);
		$('.screen').each(function(){
			posLeft = parseFloat($(this).position().left / $(this).parent().width() * 100);
			posTop = parseFloat($(this).position().top / $(this).parent().height() * 100);
			$(this).animate({left: (posLeft - left)+'%', top: (posTop - top)+'%'});
		});
	});
});