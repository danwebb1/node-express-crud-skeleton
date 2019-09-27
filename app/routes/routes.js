var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
  app.get('/messages/', (req, res) => {
    const coll = db.collection('message');
    coll.find({}).toArray(function (err, result) {
      if (err) {
          res.send(err);
      } else {

          res.send(JSON.stringify(result));
      }
  })
  });
  app.get('/message/:id', (req, res) => {
    const id = req.params.id;
    const details = {'_id': new ObjectID(id)};
    db.collection('message').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });
  const collection = 
  app.post('/message', (req, res) => {
    const note = { text: req.body.body, title: req.body.title };
    db.collection('message').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.redirect('http://localhost:3000');
       // res.send(result.ops[0]);
        
      }
    });
  });
    app.delete('/message/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('message').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  });
  
    app.put('/message/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('message').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
};



