// PORT
process.env.PORT = process.env.PORT || 8080;

// ENV

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// JWT
process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 30;
process.env.SEED = process.env.SEED || "THIS KEY IS VERY EASY";

// DB

let urlDb;

if (process.env.NODE_ENV === "dev") urlDb = "mongodb://localhost:27017/coffe";
else urlDb = process.env.MONGO_URI;

process.env.URL_DB = urlDb;