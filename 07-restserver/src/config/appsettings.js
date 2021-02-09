// PORT
process.env.PORT = process.env.PORT || 8080;

// ENV

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// DB

let urlDb;

if (process.env.NODE_ENV === "dev") urlDb = "mongodb://localhost:27017/coffe";
else urlDb = process.env.MONGO_URL;

process.env.URL_DB = urlDb;