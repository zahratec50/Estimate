// import mongoose from "mongoose";

// const connectToDB = async () => {
//   try {
//     // اگر قبلاً به DB وصل شده باشیم، دوباره اتصال نزن
//     if (mongoose.connection.readyState >= 1) {
//       return;
//     }

//     await mongoose.connect("mongodb://127.0.0.1:27017/building", {
//       // تنظیمات اختیاری که خطاهای اتصال رو کمتر می‌کنن
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     });

//     console.log("✅ Connected to MongoDB in utils/db.js");
//   } catch (err) {
//     console.error("❌ Error connecting to DB:", err);
//     throw err; // بهتره خطا رو مجدداً پرتاب کنیم تا جای دیگه هم اطلاع داشته باشیم
//   }
// };

// export default connectToDB;

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}
