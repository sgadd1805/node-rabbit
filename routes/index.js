const express = require('express');
const router = express.Router();
var amqp = require('amqplib/callback_api');


/* GET home page. */
// router.get('/', (req, res) => {
//   res.render('index', { title: 'Express' });
// });

router.post('/rabbit', function(req, res){
  var message = req.body.payload;
  res.send("Received! : "+ message);


amqp.connect('amqp://myuser:mypass@localhost:5672', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = "spring-boot";

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer(message));
    console.log(message);
   // setTimeout(function() { conn.close(); process.exit(0) }, 500);

  });
});
});



module.exports = router;

