import { Application, Request, Response } from "express";
import habit from "./Router/habitRouter";
import user from "./Router/userRouter";
export const mainApp = async (app: Application) => {
  try {
    app.use("/api", user);
    app.use("/api", habit);
    app.use("/", (req: Request, res: Response) => {
      try {
        res.json({
          message: "Welcome to the default api",
        });
      } catch (error) {
        res.status(404).json({ message: "Error reading path" });
      }
    });
  } catch (error) {
    return error;
  }
};
