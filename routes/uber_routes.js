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
			if (results.length != 0) {
				var issues_str = (results[0].issues).split(",") || [];
				var issues_num = [];

				ques_marks = '';
				for (var i = 0; i < issues_str.length; i++) {
					ques_marks += "id = ?";
					issues_num[i] = Number(issues_str[i]);
					if (i < issues_str.length-1) {
						ques_marks += " OR "
					};
				};
				// console.log(results, issues_str, ques_marks, issues_num)

				connection.query("SELECT issue FROM issues_table where "+ ques_marks, issues_num, function(err, issues){
					if (err) {
						console.log(err, results)
						return next(err);
					};
					res.render('driver_prop', {
						driver_details : results,
						issues : issues
					});
				});
			}
			else {
				res.render('ref_nos', {msg : "Reference number unregistered OR not booked for today"})
			}
		})
	})
}