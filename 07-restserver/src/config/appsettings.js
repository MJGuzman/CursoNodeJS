// PORT
process.env.PORT = process.env.PORT || 8080;

// ENV

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// JWT
process.env.EXPIRATION_TOKEN = "48hr";
process.env.SEED = process.env.SEED || "THIS KEY IS VERY EASY";

// DB

let urlDb;

if (process.env.NODE_ENV === "dev") urlDb = "mongodb://localhost:27017/coffe";
else urlDb = process.env.MONGO_URI;

process.env.URL_DB = urlDb;

// GOOGLE SIGN

process.env.CLIENT_ID =
    process.env.CLIENT_ID ||
    "189549456771-jfm6k6a6v30jur086biivgv5iogao9fe.apps.googleusercontent.com";