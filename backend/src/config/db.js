import mongoose from 'mongoose';

const db_password = 'heyyou77'
const db_username = 'bing'
const uri = `mongodb+srv://${db_username}:${db_password}@nasacluster.es1vg.mongodb.net/test_apod?retryWrites=true&w=majority`;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
export async function connectDB() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("You successfully connected to MongoDB!");
    } finally {
      // await mongoose.disconnect();
    }
  }