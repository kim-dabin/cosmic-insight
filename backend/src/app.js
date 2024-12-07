import express from 'express';
import nasaRoutes from './routes/nasaRoutes.js';
import 'dotenv/config'
import cors from 'cors';

import mongoose from 'mongoose';

const db_password = 'heyyou77'
const db_username = 'bing'
const uri = `mongodb+srv://${db_username}:${db_password}@nasacluster.es1vg.mongodb.net/test_apod?retryWrites=true&w=majority`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error

    // await mongoose.disconnect();
  }
}
run().catch(console.dir);


const app = express();
app.use(cors());

app.use('/api/nasa', nasaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));