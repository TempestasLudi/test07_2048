exports.display = function(){
	var page = '<html><head><title>Simple game</title><link rel="stylesheet" href="common.css" /><script src="jquery.js"></script><script src="game.js"></script></head><body>';
	
	page += '<div class="menu-wrapper screen">';
	page += '<button class="set-screen" data-screen="name-wrapper">Set name</button>';
	page += '<button class="set-screen" data-screen="game-creator">Create game</button>';
	page += '<button class="set-screen" data-screen="games-wrapper">Join game</button>';
	page += '</div>';
	
	page += '<div class="game-wrapper screen">';
	page += '<div class="board">';
	for(var i=0;i<8;i++){
		page += '<div class="grid-row">';
		for(var j=0;j<8;j++){
			var style = '';
			if(j == 3 || j == 7){
				style += 'border-right:1px solid black;';
			}
			if(i == 3 || i == 7){
				style += 'border-bottom:1px solid black;';
			}
			if(j == 0 || j == 4){
				style += 'border-left:1px solid black;';
			}
			if(i == 0 || i == 4){
				style += 'border-top:1px solid black;';
			}
			page += '<div style="'+style+'" class="grid-cell"></div>';
		}
		page += '</div>';
	}
	page += '</div>';
	page += '</div>';
	
	page += '<div class="name-wrapper screen">';
	page += '<div class="form"><label>Name</label><input type="text" class="name" value="shuffler'+(Math.floor(Math.random()*900)+100)+'" /><button class="set-screen" data-screen="menu-wrapper">Back to menu</button></div>';
	page += '</div>';
	
	page += '<div class="games-wrapper screen">';
	page += '</div>';
	
	page += '<div class="game-creator screen">';
	page += '<div class="form">';
	page += '<label>Players</label><input type="text" class="players" value="4" />';
	page += '<label>Name</label><input type="text" class="name" />';
	page += '</div>';
	page += '</div>';
	
	page += '</body></html>';
	return page;
}