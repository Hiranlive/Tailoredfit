var express  = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/api/upload', function function_name(req, res) {
	console.log(req.files.image.originalFilename);
	console.log(req.files.image.path);
	fs.readFile(req.files.image.path, function (err, data){
		var date = new Date();

		var newPath = "./uploads/" + req.body.name + ".png";

		fs.writeFile(newPath, data, function (err) {
			if(err){
				res.json({'response':"Error"+err});
			}else {
				res.json({'response':"Saved"});		  
			}
		});
	});
});

router.get('/api/upload/:file', function function_name(req, res) {
	file = req.params.file;
	var img = fs.readFileSync("./uploads/" + file);
	res.writeHead(200, {'Content-Type': 'image/jpg' });
	res.end(img, 'binary');
});


module.exports = router;