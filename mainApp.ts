import { Application, Response, Request } from "express";
import user from "./router/authRouter";
import transfer from "./router/transactionRouter";

export const mainApp = (app: Application) => {
  try {
    app.use("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Welcome" });
    });
    app.use("/api", user);
    app.use("/api", transfer);
  } catch (error) {
    return error;
  }
};
user;
