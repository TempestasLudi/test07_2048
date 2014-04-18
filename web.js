var http = require('http'),
	path = require('path'),
	fs = require('fs');

var pages = {
	'\\': 'index.html',
	'\\index': 'index.html',
	'\\index.html': 'index.html'
};
var resources = {
	'.css': {location: 'css', mime: 'text/css'},
	'.js': {location: 'js', mime: 'text/javascript'},
	'.png': {location: 'img', mime: 'image/png'}
}

http.createServer(function(req, resp){
	if(path.basename(req.url) != 'favicon.ico'){
		if(resources[path.extname(req.url)] != undefined){
			console.log('new resource request: '+req.url);
			var url = 'resources/'+resources[path.extname(req.url)].location+'/'+path.basename(req.url);
			fs.readFile(url, function(err, data){
				if (err){
					resp.writeHead(404);
					resp.end();
				}
				else{
					resp.writeHead(200, {'Content-Type': resources[path.extname(req.url)].mime});
					resp.write(data);
					resp.end();
				}
			});
		}
		else if(pages[path.normalize(req.url)] != undefined){
			console.log('new page request: '+req.url);
			var url = 'resources/html/'+pages[path.normalize(req.url)];
			fs.readFile('resources/html/'+pages[path.normalize(req.url)], {'encoding':'UTF-8'}, function(err, data){
				if(err){
					console.log(err);
				}
				resp.writeHead(200, {'Content-Type': 'text/html'});
				resp.write(data);
				resp.end();
			});
		}
		else{
			console.log('new rejected request: '+req.url);
			resp.writeHead(404);
			resp.end();
		}
	}
	else{
		console.log('new favicon request: '+req.url);
		resp.writeHead(404);
		resp.end();
	}
}).listen(8080);
console.log('server created');