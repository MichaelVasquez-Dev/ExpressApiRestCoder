import mongoose from "mongoose";

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) {
    console.log("📦 MongoDB ya estaba conectado.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("✅ MongoDB conectado.");
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
};

//tambien este es un singleton
class MongoDB {
  static instance = null;

  constructor() {
    if (MongoDB.instance) {
      return MongoDB.instance;
    }

    MongoDB.instance = this;
    this.isConnected = false;
  }

  async connect() {
    if (this.isConnected) {
      console.log("📦 MongoDB ya estaba conectado.");
      return;
    }

    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      this.isConnected = true;
      console.log("✅ MongoDB conectado.");
    } catch (error) {
      console.error("❌ Error al conectar a MongoDB:", error);
      process.exit(1);
    }
  }
}



export default dbConnect;