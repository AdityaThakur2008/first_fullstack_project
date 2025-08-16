const mongoose = require("mongoose");
const initData = require("./data");
const listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/WonderLust";

main()
  .then(() => {
    console.log("conected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await listing.deleteMany({});
  let data = initData.data.map((obj) => ({
    ...obj,
    owner: "688a22d361c91d3b1ff5b8c1",
  }));
  await listing.insertMany(data);
  console.log(" data was initailized");
};

initDB();
