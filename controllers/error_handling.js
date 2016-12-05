// Custom Error-Handling middleware
module.exports = {
	404 : function (err, req, res, next){
		if(err.status !== 404) {
			console.log('not 404');
			return next(err);
		}
		console.log('still going');
	  res.status(404);

	  // respond with html page
	  if (req.accepts('html')) {
	    res.sendFile(process.cwd() + '/public/' + '404.html');
	    return;
	  }

	  // respond with json
	  if (req.accepts('json')) {
	    res.send({ error: 'Not found' });
	    return;
	  }

	  // default to plain-text. send()
	  res.type('txt').send('Not found');
	},
	500 : function (err, req, res, next) {
		console.log(err);
	  res.status(500);
	  res.sendFile(process.cwd() + '/public/' + '500.html');
	  return;
	}
};