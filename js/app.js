var someText = document.getElementById('some-text');
var fileEl = document.getElementById('file');
var filesMap = {};
var file;
fileEl.onchange = function (e) {
	var files = e.target.files;
	for(var i = 0; i < files.length; i++) {
		file = files[i];
		var path = files[i].webkitRelativePath;
		if (path && path.indexOf("/")>=0) {
			filesMap[path.substr(path.indexOf("/"))] = files[i];
		} else {
			filesMap["/"+(files[i].fileName || files[i].name)] = files[i];
		}
	}
}
chrome.socket.getNetworkList(function (results) {
	results.forEach(function (result) {
		console.log(result);
		listener(result.address);
	});
});


function listener (host) {
	var server = new Server();
	server.listen(5556, '127.0.0.1');

	server.on('/', function(req, res) {
		res.setHeader('Content-Type', 'text/html');
		res.send('<html><head></head><body><video src="http://localhost:5556/video.mp4"></body></html>');
	});

	server.on('/video.mp4', function(req, res) {
		// req.setChunkSize(10000);
		res.stream(req, file);
	});
}