import express from "express";
import multer from "multer";
import fs from "fs";
import {
  generateOutput,
  generatePrompt,
  loadAndSplitTheDocs,
  vectorSaveAndSearch,
} from "./rag.js";

const PORT = 3000;

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "data"); // Specify the directory to store uploaded files
    },
    filename: (req, file, cb) => {
      const splittedFileName = file.originalname.split(".");
      const fileExtension = splittedFileName[splittedFileName.length-1];
      const fileName = "sample." + fileExtension;
      cb(null, fileName);
    },
  }),
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const question = req.body.question;
    
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Process the PDF and store in vector database
    const splits = await loadAndSplitTheDocs("./data/sample.pdf");
    const searches = await vectorSaveAndSearch(splits, question);
    const prompt = await generatePrompt(searches, question);
    const result = await generateOutput(prompt);

    // Clean up the uploaded file
    fs.unlink("data/sample.pdf", (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      }
    });

    res.json({
      message: "Content has been processed and stored successfully.",
      data: {
        content: result.content,
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      message: "Error processing the request",
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`API is running on \nhttp//localhost:${PORT}`);
});