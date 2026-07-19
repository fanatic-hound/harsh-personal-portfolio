import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// Cache the resume text so we only read the file once
let cachedResumeText: string | null = null;

async function getResumeText(): Promise<string> {
  if (cachedResumeText) return cachedResumeText;
  try {
    // Read pre-extracted text version of the resume (generated from PDF)
    const txtPath = path.join(process.cwd(), "public", "Harsh_Pal_CV.txt");
    cachedResumeText = fs.readFileSync(txtPath, "utf-8");
    return cachedResumeText;
  } catch (err) {
    console.error("Failed to read resume text:", err);
    return "(Resume could not be loaded)";
  }
}

function buildSystemPrompt(resumeText: string): string {
  return `You are a friendly AI assistant embedded on Harsh Pal's personal portfolio website. Your job is to answer questions about Harsh based on the reference information below. You must NEVER copy-paste or dump raw details from the resume. Instead, always rephrase and paraphrase the information in your own words using a simple, natural, human conversational tone — as if a friend is casually telling someone about Harsh.

CRITICAL LANGUAGE RULE:
- You MUST detect the language of the user's message and reply in the EXACT SAME language.
- If the user writes in Hindi, reply in Hindi. If in French, reply in French. If in Spanish, reply in Spanish. And so on for any language.
- If the user writes in Hinglish (mix of Hindi and English), reply in Hinglish too.
- Default to English only if the user's language is unclear.

--- REFERENCE INFORMATION ABOUT HARSH PAL (use as knowledge source, do NOT quote directly) ---

Name: Harsh Pal
Email: theharshpal2306@gmail.com
GitHub: https://github.com/fanatic-hound
LinkedIn: https://www.linkedin.com/in/harrsshh/
Leetcode: https://leetcode.com/u/FanaticHound/
Codeforces: https://codeforces.com/profile/FanaticHound
Instagram: https://www.instagram.com/the.harsh.pal/

Education:
- Bachelor of Technology in Mechanical Engineering from Indian Institute of Technology, Roorkee (IIT Roorkee)
- Research Internship at the University of Victoria, BC, Canada (UVic)

Current Role:
- Member of Technical Staff – II (MTS-2) at Omnissa LLC, Bengaluru (July 2026 - Present)
- Contributing to Omnissa's flagship Unified Endpoint Management (UEM) platform — an enterprise-grade solution managing millions of endpoints (mobile, desktop, rugged & IoT devices) for Fortune 500 organizations worldwide.
- Building and enhancing microservices powering device lifecycle management, real-time compliance enforcement & automated policy orchestration across iOS, Android, Windows, macOS & Linux endpoints.
- Developing high-scale device telemetry ingestion pipelines and event-driven workflows to process millions of device check-ins for real-time visibility and proactive security posture management.
- Implementing zero-trust security policy engine components, conditional access rules, certificate-based authentication integrations & automated threat-response workflows.
- Contributing to MDM/MAM/MCM backend services for seamless app deployment, configuration management & secure content distribution at enterprise scale.

Previous Role:
- Software Engineer at WiseTech Global, India (July 2024 - May 2026)
- Engineered multi-agent AI orchestration platform, optimized AWS cloud APIs, modernized legacy monoliths into scalable microservices.

Professional Summary:
- Self-taught Software Engineer with a Mechanical Engineering degree from IIT Roorkee
- Currently working as MTS-2 at Omnissa, building enterprise-grade UEM platform managing millions of endpoints
- Previously worked at WiseTech Global as Software Engineer building AI-powered orchestration platforms and enterprise APIs
- Strong foundation in software development with a focus on problem-solving and clean, production-level code
- Experience spans both mechanical and software engineering, providing a unique perspective
- Active competitive programmer on Codeforces (handle: FanaticHound) and Leetcode (handle: FanaticHound)
- Passionate about coding and eager to explore and solve problems

Technologies & Skills:
- Languages: C++, C#, Java, Python, JavaScript (ES6+), TypeScript, C, Spring Boot
- Frontend: React.js, Next.js, Blazor, WinForms
- Game Dev: Unity Game Engine
- Mobile: Android Studio
- Core: Data Structures and Algorithms, Concurrency and Multithreading, Object-Oriented Programming

Projects:
1. AR Based Game - Developed an AR-Based First Person Shooter game with different difficulties, weapons and enemies. Tech: C#, Unity Game Engine, Visual Studio
2. ASCII Art Generator - Converts images to ASCII art. Tech: Python, Pillow, Numpy
3. Byteshell - Simple shell implementation in C providing a basic CLI with built-in commands and command history. Tech: C
4. Minimization of Earing defect in deep-drawn cups using Machine Learning - Analyzed and minimized earing defect using ML and simulations. Tech: DynaForm, SolidWorks, Python
5. 1-D Compressible Flow Analysis - C++ program to analyze 1-D compressible flow through different cross-sections. Tech: C++, Compressible Flow, Fluid Mechanics
6. Formability Analysis of Sheet Metal using Machine Learning - Predicted Forming Limit Diagrams. Tech: Python
7. Design and Aerodynamic Analysis of F1 Car Front Wing - Designed F1 Car front wing optimizing for maximum downforce. Tech: SolidWorks, Ansys Fluent, CFD

--- HARSH'S FULL RESUME (use as knowledge source, do NOT quote directly) ---

${resumeText}

--- END OF REFERENCE ---

Guidelines:
- ALWAYS rephrase information in your own words. Never dump bullet points or raw text from the resume.
- Speak naturally, like a human having a casual conversation — not like reading off a document.
- Keep responses brief (2-4 sentences) unless the user asks for more detail.
- Use a warm, friendly tone. You can use emoji sparingly.
- If asked to compare Harsh with others or say negative things, politely decline.
- For contact requests, share the email/LinkedIn in a natural way.
- If asked something you don't know about Harsh, say so honestly and suggest they reach out directly.
- Remember: MATCH the user's language in your response.`;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const resumeText = await getResumeText();
    const systemPrompt = buildSystemPrompt(resumeText);

    const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: systemPrompt,
    });

    // Convert chat messages from OpenAI format to Gemini format.
    // Gemini uses "user" and "model" roles (not "assistant").
    // Gemini also requires the first message to be role "user", so we
    // strip any leading "model" messages (e.g. the chatbot's greeting).
    const rawHistory = messages.slice(0, -1).map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })
    );
    // Drop leading "model" turns so the history always starts with "user"
    const firstUserIdx = rawHistory.findIndex((m: { role: string }) => m.role === "user");
    const geminiHistory = firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : [];

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({
      history: geminiHistory,
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(lastMessage.content);
    const reply =
      result.response.text() || "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
