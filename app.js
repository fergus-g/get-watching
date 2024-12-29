import express from "express";

import moviesRouter from "./routes/movies.js";
import TVRouter from "./routes/tvshows.js";

const app = express();

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/tv", TVRouter);

export default app;