import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "triz-musk-duck-proxy is running"
  });
});

app.post("/", async (req, res) => {
  try {
    const { model, messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        ok: false,
        error: "Request body must include a messages array"
      });
    }

    // For now this returns the user prompt in a usable way for your frontend
    const combined = messages
      .map(m => `${m.role.toUpperCase()}:\n${m.content}`)
      .join("\n\n");

    return res.status(200).json({
      ok: true,
      response: `AI proxy test successful.\n\nModel: ${model || "unspecified"}\n\n${combined}`
    });
  } catch (err) {
    console.error("POST / error:", err);
    return res.status(500).json({
      ok: false,
      error: "Internal server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
