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
const dbUser = `${process.env.DB_USER}`;
const dbPass = `${process.env.DB_PASS}`;
const dbServer = `${process.env.DB_SERVER}`;
const db = dbUser;
const url = `mongodb+srv://${dbUser}:${dbPass}@${dbServer}/${db}?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

console.log("User Name:", dbUser, "& Server URL:", dbServer);

async function run() {
  try {
    await client.connect();
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

    //post demo data
    app.get('/demo/post', async (req, res) => {
      const booking =
      {
        address: "C and B Road",
        city: "Barishal",
        country: "Bangladesh",
        date_pickup: "2022-04-24",
        destination_01: "Brown Compound Road",
        destination_02: "",
        destination_03: "",
        destination_04: "",
        destination_05: "",
        email: "sajidmahamud835@gmail.com",
        first_name: "Sajid",
        flight_number: "123213",
        last_name: "Mahamud",
        luggage_weight: "32432",
        phone: "01304854562",
        postal_code: "8200",
        start_address: "C and B Road",
        time_pickup: "22:14",
        total_people: "10",
      };
      console.log('Pushing demo data to database', booking);
      const result = await bookingsCollection.insertOne(booking);
      console.log(result);
      res.json(result);
    });

    // Get bookings api
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