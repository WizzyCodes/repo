import { connect } from "mongoose";
import env from "dotenv";
env.config();

export const dbConfig = async () => {
  try {
    await connect(process.env.DB_URL as string).then(() => {
      console.clear();
      console.log("connected ❤🧡❤❣💥💢💥");
    });
  } catch (error) {
    console.log(error);
  }
};
