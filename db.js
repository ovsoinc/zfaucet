r = require('rethinkdb');

function setup_table() {
  r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if(err) throw err;
    r.db('test').tableCreate('payouts').run(conn, function(err, res) {
      if(err) throw err;
      console.log(res);
    });
  });
}

function createDrip(payoutAddress) {
  r.connect({ host: 'localhost', port: 28015 }, function(err, conn) {
    if(err) throw err;

    // build payout object for database insertion
    payoutObj = { payoutAddress: payoutAddress,
       timestamp: new Date(),
       processed: false,
       transactionId: ""
     };

    r.table('payouts').insert(payoutObj).run(conn, function(err, res) {
      if(err) throw err;
      console.log(res);
    });
  });
}

module.exports.createDrip = createDrip;

//setup_table();
//createDrip('0x3c2f77619da4225a56b02eae4f9a1e2873435c5b');
