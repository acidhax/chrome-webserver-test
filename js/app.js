var someText = document.getElementById('some-text');

var server = new Server();
server.listen(5556, '127.0.0.1');

server.on('request', function(req, res) {
	res.setHeader('Content-Type', 'text/html');
	res.send('<html><head></head><body><video src="http://localhost:5556/video.mp4"></body></html>');
});

server.on('/video.mp4', function(req, res) {
	res.setHeader('Content-Type', 'video/mp4');
	res.setHeader('Content-Length', '1000000');
	res.setHeader('Accept-Ranges', 'bytes');
	if (req.isStreaming()) {
		req.getRange(function (start, end) {
			console.log("getRange", start, end);
			res.setStatusCode(206);
			res.setHeader("Content-Range", "bytes startbyte-endbyte/1000000"); // Should match content-length? Also use byte-byte/* for unknown lengths.
			req.getChunkSize(function (size) {
				if (size == 0) {

				}
			});
		});
	}
});