exports.get_ref_info = function(req, res, next){
	req.getConnection(function(err, connection){
		if (err) {
			return next(err);
		};

		var input = JSON.parse(JSON.stringify(req.body));

		connection.query("SELECT ref_no, date, name, surname, cell_number, email, issues FROM ref_table INNER JOIN driver_details ON driver_details_id=driver_details.id WHERE ref_no=?", input.ref_no, function(err, results){
			if (err) {
				console.log(err, results)
				return next(err);
			};
			console.log(results)
			res.render('driver_prop', {
				driver_details : results
				// issues : issues
			});
		})
	})
}