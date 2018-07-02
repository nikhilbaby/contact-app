const express = require('express');
const router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "mysql",
    user: "nikhil",
    password: "Nikhil_123",
    database : "users"
});

/* GET api listing. */
router.get('/', function (req, res, next) {
    res.send("Api working");
});

router.get('/getUsers', function (req, res, next) {
  sql_string = "SELECT * from users";
  con.query(sql_string, function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    var data = [];
    for (var i=0; i< result.length; i++) {
      var row = "{\"id\": "+result[i].id+", \"firstname\": \""+result[i].firstname+"\",\"lastname\": \""+result[i].lastname+"\", \"phone\": \""+result[i].phone+ "\", \"email\": \""+result[i].email+ "\", \"description\": \""+result[i].description+ "\", \"profile_picture\": \""+result[i].profile_picture+"\", \"organization\": \""+result[i].organization+"\", \"title\": \""+result[i].title+"\"}";
      data.push(JSON.parse(row));
    }
    // res.status(200).json({
    //   data: data,
    //   msg: "data"
    // });

    res.send(data);
  });
});

router.get('/getUsers/:id', function (req, res, next) {
  var id = req.params.id;
  sql_string = "SELECT * from users where id ="+id+";";
  con.query(sql_string, function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    var row = "{\"id\": "+result[0].id+", \"firstname\": \""+result[0].firstname+"\",\"lastname\": \""+result[0].lastname+"\", \"phone\": \""+result[0].phone+ "\", \"email\": \""+result[0].email+ "\", \"description\": \""+result[0].description+ "\", \"profile_picture\": \""+result[0].profile_picture+"\", \"organization\": \""+result[0].organization+"\", \"title\": \""+result[0].title+"\"}";
    // res.status(200).json({
    //   data: data,
    //   msg: "data"
    // });

    res.send(JSON.parse(row));
  });
});

router.post('/updateUsers/', function (req, res, next) {
  console.log(req.body);
  sql_string = "UPDATE `users` SET `firstname` = '"+ req.body.firstname+"',`lastname` = '"+ req.body.lastname+"',`phone` = '"+ req.body.phone+"',`email` = '"+ req.body.email+"',`description` = '"+ req.body.description+"',`profile_picture` = '"+ req.body.image_url+"',`organization` = '"+ req.body.organization+"',`title` = '"+ req.body.title+"' WHERE `id` = "+ req.body.id +";";
  con.query(sql_string, function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'User updated'
    });
  });
});

router.post('/deleteUser/', function (req, res, next) {
  console.log(req.body);
  sql_string = "delete from users where id = "+req.body.id+";";
  con.query(sql_string, function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'User deleted'
    });
  });
});

router.post('/addUser/', function (req, res, next) {
  console.log(req.body);
  sql_string = "INSERT INTO `users` (`firstname`,`lastname`,`phone`,`email`,`description`,`profile_picture`,`organization`,`title`) VALUES('"+req.body.firstname+"','"+req.body.lastname+"','"+req.body.phone+"','"+req.body.email+"','"+req.body.description+"','"+req.body.image_url+"','"+req.body.organization+"','"+req.body.title+"');";
  console.log(sql_string);
  con.query(sql_string, function (err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      });
    }
    res.status(200).json({
      message: 'User updated'
    });
  });
});

module.exports = router;
