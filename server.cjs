var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_genai = require("@google/genai");
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json());
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", appName: "\u0645\u0646\u0635\u0629 \u0628\u0642\u064A\u0629 \u0627\u0644\u0644\u0647 \u0627\u0644\u0623\u0639\u0638\u0645 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629" });
  });
  app.post("/api/ai-assistant", async (req, res) => {
    try {
      const { prompt, mode, userRole } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(400).json({
          text: "\u0645\u0644\u0627\u062D\u0638\u0629: \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0627\u0633\u062A\u0641\u0627\u062F\u0629 \u0645\u0646 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A \u0639\u0646\u062F \u0636\u0628\u0637 \u0645\u0641\u062A\u0627\u062D GEMINI_API_KEY \u0641\u064A \u0644\u0648\u062D\u0629 \u0623\u0633\u0631\u0627\u0631 \u0627\u0644\u0628\u064A\u0626\u0629. \u062D\u0627\u0644\u064A\u0627\u064B \u0647\u0630\u0647 \u0625\u062C\u0627\u0628\u0629 \u062A\u0648\u0636\u064A\u062D\u064A\u0629 \u062A\u062C\u0631\u064A\u0628\u064A\u0629."
        });
      }
      const ai = new import_genai.GoogleGenAI({ apiKey });
      let systemInstruction = `\u0623\u0646\u062A \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A \u0627\u0644\u0630\u0643\u064A \u0627\u0644\u062E\u0628\u064A\u0631 \u0627\u0644\u0645\u062F\u0645\u062C \u0641\u064A '\u0645\u0646\u0635\u0629 \u0628\u0642\u064A\u0629 \u0627\u0644\u0644\u0647 \u0627\u0644\u0623\u0639\u0638\u0645 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A\u0629'.
\u062A\u0633\u0627\u0639\u062F \u0627\u0644\u0645\u0639\u0644\u0645\u064A\u0646 \u0648\u0627\u0644\u0637\u0644\u0627\u0628 \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0633\u0644\u064A\u0645\u0629 \u0648\u0627\u0644\u0623\u0633\u0644\u0648\u0628 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A \u0627\u0644\u0645\u0634\u062C\u0639 \u0648\u0627\u0644\u0631\u0635\u064A\u0646.
\u0627\u0642\u062A\u0635\u0631 \u0641\u064A \u0627\u0644\u0625\u062C\u0627\u0628\u0627\u062A \u0639\u0644\u0649 \u0627\u0644\u0634\u0631\u062D \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u064A \u0627\u0644\u0645\u0628\u0633\u0637\u060C \u062D\u0644 \u0627\u0644\u0645\u0633\u0627\u0626\u0644\u060C \u0625\u0639\u062F\u0627\u062F \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A \u0627\u0644\u062A\u0641\u0627\u0639\u0644\u064A\u0629\u060C \u0648\u0635\u064A\u0627\u063A\u0629 \u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0627\u062A \u0627\u0644\u062A\u0634\u062C\u064A\u0639\u064A\u0629.`;
      if (mode === "quiz_generator") {
        systemInstruction += `
\u0648\u0638\u064A\u0641\u062A\u0643 \u062A\u0648\u0644\u064A\u062F \u0623\u0633\u0626\u0644\u0629 \u0627\u062E\u062A\u0628\u0627\u0631 \u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u0645\u0646 \u0646\u0648\u0639 \u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0646 \u0645\u062A\u0639\u062F\u062F \u0648\u0635\u062D\u064A\u062D/\u062E\u0637\u0623 \u0645\u0639 \u0627\u0644\u0634\u0631\u062D \u0648\u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A \u0648\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0635\u062D\u064A\u062D\u0629.`;
      } else if (mode === "explain_concept") {
        systemInstruction += `
\u0648\u0638\u064A\u0641\u062A\u0643 \u062A\u0628\u0633\u064A\u0637 \u0648\u0641\u0647\u0645 \u0627\u0644\u0641\u0627\u0647\u064A\u0645 \u0627\u0644\u0639\u0644\u0645\u064A\u0629 \u0627\u0644\u0645\u0639\u0642\u062F\u0629 \u0628\u0623\u0633\u0644\u0648\u0628 \u0627\u0644\u0646\u0642\u0627\u0637 \u0648\u0627\u0644\u0623\u0645\u062B\u0644\u0629 \u0627\u0644\u0645\u0628\u0627\u0634\u0631\u0629.`;
      }
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemInstruction}

[\u062F\u0648\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645: ${userRole || "\u0637\u0627\u0644\u0628"}]
\u0627\u0644\u0637\u0644\u0628: ${prompt}`
      });
      res.json({ text: response.text || "\u0644\u0645 \u0623\u062A\u0645\u0643\u0646 \u0645\u0646 \u0627\u0644\u062D\u0635\u0648\u0644 \u0639\u0644\u0649 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629." });
    } catch (err) {
      console.error("Gemini API Error:", err);
      res.status(500).json({
        text: `\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0645\u0633\u0627\u0639\u062F \u0627\u0644\u0630\u0643\u064A: ${err?.message || "\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u0639\u0631\u0648\u0641"}`
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
