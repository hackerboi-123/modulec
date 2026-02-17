const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://magnusanand1907_db_user:P4tMMjd66lqtLjjq@cluster0.v5rj7kp.mongodb.net/formDB?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);
    await client.connect();
    const db = client.db("formDB");
    const collection = db.collection("submissions");

    await collection.insertOne(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Form submitted successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  } finally {
    await client.close();
  }
};
