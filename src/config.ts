import dotenv from "dotenv";
import * as process from "process";

const envFound = dotenv.config();

if (!envFound) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  environment: {
    production: process.env.NODE_ENV === "production" || false,
  },
  port: parseInt(process.env.PORT || "7000", 10) || 7000,
  salt:
    process.env.SALT ||
    "$2a$10$STZsLN64.jjDD4s2BWMuY.r1G/Aj9.brGZvmEkh3rg514wkg3HX1K",
  jwt: {
    secretKey:
      process.env.JWT_SECRET_KEY || "kasbdjasbdbasdbasjdbjasbdbsajbdasbjdbajbd",
  },
  mongo: {
    uri:
      (process.env.MONGODB_CONNECTION_URI as string) ||
      "mongodb://localhost:27017/",
  },
};
