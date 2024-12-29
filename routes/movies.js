import express from "express";
import {
  getMovieContent,
  getMovieById,
  getMovieByParam,
  addReviewToMovie,
  deleteMovieReview,
  createNewMovie,
  removeMovieEntry,
  addWatchAgain,
  addViews,
} from "../models/content.js";

const router = express.Router();

// GET
// Gets back all the movies
router.get("/", async (req, res) => {
  const all_content = await getMovieContent();
  res.json(all_content);
});

// GET
// Gets back specific movie by ID
router.get("/:id", async (req, res) => {
  const movie = await getMovieById(req.params.id);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

// GET
// Gets back specific movie by any param
router.get("/:field/:value", async (req, res) => {
  let { field, value } = req.params;
  console.log(field);
  if (field === "release_year") {
    value = Number(value);
  }
  const movie = await getMovieByParam(field, value);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

//PATCH
//Add a "Review" field to selected movie objectFit:
router.patch("/:id", async (req, res) => {
  try {
    let { review } = req.body;
    const data = await addReviewToMovie(req.params.id, review);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
});

//DELETE
//Delete a "Review" field to selected movie objectFit:
router.delete("/:id", async (req, res) => {
  try {
    const data = await deleteMovieReview(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
});

//POST
//Create a new movie object in database
router.post("/", async (req, res) => {
  try {
    const data = await createNewMovie(req.body);
    res.json(data);
  } catch (error) {
    res.status(501).json({ message: "Movie profile not updated" });
  }
});

//DELETE
//Delete an entry from the database
router.delete("/remove/:id", async (req, res) => {
  try {
    const data = await removeMovieEntry(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
});

// PATCH
// Add the watch again value and set to true

router.patch("/watch-again/:id", async (req, res) => {
  try {
    const data = await addWatchAgain(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
});

// PATCH
// Add the view count value and set to 1
// If it already has a view count, incremenet by one

router.patch("/view-count/:id", async (req, res) => {
  try {
    const data = await addViews(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ message: "Movie not found" });
  }
});

export default router;
