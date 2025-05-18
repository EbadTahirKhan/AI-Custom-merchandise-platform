import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import uploadRoutes from './routes/upload.routes.js';

import dalleRoutes from "./routes/dalle.routes.js";

dotenv.config();

console.log("Is HF API Key loaded?", process.env.HF_API_KEY ? 'Yes' : 'No');


const app = express();
app.use(cors({
  origin: 'https://ai-custom-merchandise-platform-ey0zvsfs0.vercel.app',
  methods: ['GET', 'POST'],
}));

app.use(express.json({limit: "50mb"}));

app.use('/api/v1/dalle', dalleRoutes);


app.use('/api/upload', uploadRoutes);  // New upload endpoint



app.get("/", (req, res) => {
  res.status(200).send({message:"hello from DALL.E"});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// import express from "express";
// import * as dotenv from "dotenv";
// import cors from "cors";
// import dalleRoutes from "./routes/dalle.routes.js";

// dotenv.config();

// // Verify Replicate API key is loaded
// console.log("Is Replicate API Key loaded?", process.env.REPLICATE_API_KEY ? 'Yes' : 'No');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));

// // Routes
// app.use('/api/v1/dalle', dalleRoutes);

// // Health check endpoint
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "AI Image Generation API (Powered by Replicate.com)" });
// });

// // Start server
// app.listen(8080, () => {
//   console.log("Server is running on port 8080");
//  });