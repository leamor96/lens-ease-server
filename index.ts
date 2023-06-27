import express from "express";
import morgan from "morgan";
import { connect } from "./db/connect.js";
import { notFound } from "./middleware/not-found.js";
import { lensesRouter } from "./routes/lenses.js";
import { authRouter } from "./routes/users.js";
import cors from "cors";
import { submitFormRouter } from "./routes/submitForm.js";
import { proLensesRouter } from "./routes/proLenses.js";
import { submitProFormRouter } from "./routes/submitProForm.js";

const app = express();

connect().catch((e) => {
  console.log(e);
});

app.use(
  cors({
    origin:"https://lens-ease-client.web.app",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/lenses", lensesRouter);
app.use("/api/auth", authRouter);
app.use("/api/submit-form", submitFormRouter);
app.use("/api/pro-lenses", proLensesRouter);
app.use("/api/submit-pro-form", submitProFormRouter);

app.use(notFound);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));
