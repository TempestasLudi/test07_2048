exports.display = function(){
	var page = '<html><head><title>Simple game</title><link rel="stylesheet" href="common.css" /><script src="jquery.js"></script><script src="game.js"></script></head><body><div class="game-wrapper">';
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
			page += '<div style="'+style+'" class="grid-cell">&nbsp</div>';
		}
		page += '</div>';
	}
	page += '</div></body></html>';
	return page;
}