const mongoURI = "mongodb://127.0.0.1/";
const mongoPort = "27017";
const dbName = "iskcon-busapp";

const dbConfig = {
  db: mongoURI + dbName,
  mongoPort
};

module.exports = dbConfig;
