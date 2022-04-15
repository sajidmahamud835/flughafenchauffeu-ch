const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fphq6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
  try {
    await client.connect(`${process.env.DB_USER}`);
    const database = client.db();
    const bookingsCollection = database.collection('bookings')

    // // Post api
    app.post('/bookings', async (req, res) => {
      const booking = req.body;
      console.log('Recived booking data form forntend', booking);

      const result = await bookingsCollection.insertOne(booking);
      console.log(result);
      res.json(result);
    });

    // Get products api
    app.get('/bookings', async (req, res) => {
      const cursor = bookingsCollection.find({});
      const bookings = await cursor.toArray();
      const count = await cursor.count();
      res.send({
        count,
        bookings
      });
    })

    //UPDATE API
    app.put('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          status: updatedData.status
        },
      };
      const result = await bookingsCollection.updateOne(filter, updateDoc, options)
      console.log('updating entry', id)
      res.json(result);
    })

    // Delete api
    app.delete('/bookings/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await bookingsCollection.deleteOne(query);
      res.json(result);
    })

  }
  finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('The server for flughafenchauffeur.ch is running.');
})

app.listen(port, () => {
  console.log('server is running at port', port);
})