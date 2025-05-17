// // import express, { response } from "express";
// // import * as dotenv from "dotenv";
// // import OpenAI from "openai";

// // dotenv.config();

// // const router = express.Router();

// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // // const openai2 = new OpenAIApi(config);

// // router.route("/").get((req, res) => {
// //   res.status(200).send({ message: "hello from DALL-E routes" });
// // });

// // router.route("/").post(async (req, res) => {
// //   try {
// //     const { prompt } = req.body;

// //     const response = await openai.createImage({
// //       prompt,
// //       n: 1,
// //       size: "1024x1024",
// //       response_format: "b64_json",
// //     });

// //     console.log("OpenAI Response:", response);

// //     const image = response.data.data[0].b64_json;
    


// //     res.status(200).json({ photo: image });
// //   } catch (error) {
// //     res.status(500).json({ message: "Something went Wrong" });
// //   }
// // });

// // export default router;


// Working dalle api code


// import express from "express";
// import * as dotenv from "dotenv";
// import OpenAI from "openai";

// dotenv.config();

// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // Test route
// router.route("/").get((req, res) => {
//   res.status(200).send({ message: "Hello from DALL·E route" });
// });

// // Image generation route
// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ message: "Prompt is required." });
//     }

//     const response = await openai.images.generate({
//       prompt,
//       n: 1,
//       size: "1024x1024",
//       response_format: "b64_json",
//     });

//     const imageData = response.data?.[0]?.b64_json;

//     if (!imageData) {
//       return res.status(500).json({ message: "Image generation failed." });
//     }

//     res.status(200).json({ photo: imageData });
//   } catch (error) {
//     console.error("DALL·E API Error:", error.response?.data || error.message || error);
//     res.status(500).json({ message: "Something went Wrong" });
//   }
// });

// export default router;
















// import express from "express";
// import * as dotenv from "dotenv";
// import Replicate from "replicate";

// dotenv.config();

// const router = express.Router();

// // Initialize Replicate API client
// const replicate = new Replicate({
//   auth: process.env.REPLICATE_API_TOKEN, // Make sure this is correct in your .env file
// });

// // Basic route to check the API
// router.route("/").get((req, res) => {
//   res.status(200).send({ message: "hello from DALL-E routes" });
// });

// // POST route to handle image generation
// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     // Ensure prompt is provided
//     if (!prompt) {
//       return res.status(400).json({ message: "Prompt is required" });
//     }

//     // Generate image using Replicate
//     const output = await replicate.run(
//       "stability-ai/sdxl", // Use a valid model name here
//       {
//         input: {
//           prompt, // Provide the prompt to the model
//         },
//       }
//     );

//     // Check if output is available and return the image
//     if (!output || !output[0]) {
//       throw new Error("No image returned from the model.");
//     }

//     // Send the generated image to the client as a base64-encoded string
//     res.status(200).json({ photo: output[0].url }); // Make sure to send URL or base64
//   } catch (error) {
//     console.error("Replicate API error:", error);
//     res.status(500).json({ message: error.message || "Something went wrong with Replicate" });
//   }
// });

// export default router;


// The working Replicate API code
// import express from "express";
// import * as dotenv from "dotenv";
// import fetch from "node-fetch"; // Make sure to install node-fetch


// dotenv.config();

// const router = express.Router();

// // Replicate API Configuration
// const REPLICATE_API_HOST = "https://api.replicate.com";
// const REPLICATE_API_VERSION = "v1";
// const STABLE_DIFFUSION_MODEL = "stability-ai/sdxl";
// const STABLE_DIFFUSION_VERSION = "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b";

// // Health check route
// router.route("/").get((req, res) => {
//   res.status(200).json({ message: "Hello from Stable Diffusion route" });
// });

// // Image generation route
// router.route("/").post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ message: "Prompt is required" });
//     }

//     // Start prediction
//     const startResponse = await fetch(
//       `${REPLICATE_API_HOST}/${REPLICATE_API_VERSION}/predictions`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
//         },
//         body: JSON.stringify({
//           version: STABLE_DIFFUSION_VERSION,
//           input: {
//             prompt,
//             width: 1024,
//             height: 1024,
//             num_outputs: 1,
//             refine: "expert_ensemble_refiner",
//             scheduler: "K_EULER",
//             num_inference_steps: 25,
//           },
//         }),
//       }
//     );

//     if (!startResponse.ok) {
//       const error = await startResponse.json();
//       throw new Error(error.detail || "Failed to start prediction");
//     }

//     const startData = await startResponse.json();
//     const predictionId = startData.id;

//     // Poll for results
//     let prediction;
//     let attempts = 0;
//     const maxAttempts = 20; // ~20 seconds timeout

//     while (attempts < maxAttempts) {
//       await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

//       const statusResponse = await fetch(
//         `${REPLICATE_API_HOST}/${REPLICATE_API_VERSION}/predictions/${predictionId}`,
//         {
//           headers: {
//             Authorization: `Token ${process.env.REPLICATE_API_KEY}`,
//           },
//         }
//       );

//       prediction = await statusResponse.json();

//       if (prediction.status === "succeeded") {
//         const imageUrl = prediction.output[0];
        
//         // Fetch the actual image data
//         const imageResponse = await fetch(imageUrl);
//         const imageBuffer = await imageResponse.buffer();
//         const base64Image = imageBuffer.toString('base64');
        
//         return res.status(200).json({ 
//           photo: base64Image,
//           imageUrl: imageUrl // Optional: return URL as well
//         });
//       } else if (prediction.status === "failed") {
//         throw new Error("Image generation failed");
//       }

//       attempts++;
//     }

//     throw new Error("Prediction timed out");

//   } catch (error) {
//     console.error("Stable Diffusion API Error:", error);
//     res.status(500).json({ 
//       message: error.message || "Something went wrong",
//       details: process.env.NODE_ENV === "development" ? error.stack : undefined
//     });
//   }
// });

// export default router;



import express from "express";
import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const router = express.Router();

// Hugging Face Configuration
const HF_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
const HF_TOKEN = process.env.HF_API_TOKEN; // Get from https://huggingface.co/settings/tokens

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        inputs: prompt,
        options: { wait_for_model: true } // Important for free tier
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Hugging Face API error: ${error}`);
    }

    const imageBuffer = await response.buffer();
    res.status(200).json({
      photo: imageBuffer.toString('base64')
    });

  } catch (error) {
    console.error("Hugging Face Error:", error);
    res.status(500).json({ 
      error: error.message,
      details: "Ensure your HF token is valid and model is loaded (may take 20s first time)"
    });
  }
});

export default router;