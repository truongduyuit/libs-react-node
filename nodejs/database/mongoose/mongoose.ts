import mongoose from "mongoose";

/** custom your settings */
const connectionString =
  process.env.MONGO_CONNECTION_STRING || "/your-connection/";
const user = process.env.DB_USER;
const pass = process.env.DB_PASS;

class Mongoose {
  private static instance: Mongoose;

  public static getInstance() {
    return Mongoose.instance || new Mongoose();
  }

  init(options: mongoose.ConnectOptions): void {
    mongoose
      .connect(connectionString, { user, pass, ...options })
      .then(() => {
        console.log(`Connect to db: ${connectionString}`);
      })
      .catch((err) => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running.\n" +
            err
        );
        process.exit(1);
      });

    const db = mongoose.connection;

    db.on("error", (err) => console.log("MongoDB error:\n" + err));
  }
}

const mongo = Mongoose.getInstance();
Object.freeze(mongo);
export { mongo };
