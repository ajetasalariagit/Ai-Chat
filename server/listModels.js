require("dotenv").config();

async function listModels() {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
  );

  const data = await response.json();

  data.models.forEach((model) => {
    if (
      model.supportedGenerationMethods &&
      model.supportedGenerationMethods.includes("generateContent")
    ) {
      console.log(model.name);
    }
  });
}

listModels();