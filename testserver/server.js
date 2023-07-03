require('dotenv').config()
const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://mongodb:${process.env.MONGO_PASSWORD}@test-cluster.kl8ch15.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const add = async (data) => {
    try {
        await client.connect();
        const myDB = client.db("test");
        const myColl = myDB.collection("products");
        const result = await myColl.insertOne(data);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}

const app = express(); 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/add-json', async (req, res) => {
    console.log(req.body);
    await add(req.body).catch(console.dir);
    res.json({"response": "ok"});
});

const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
    console.log("HTTP Server running on port 3000")
});