import { NextRequest, NextResponse } from "next/server";
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
- Associate Software Engineer at WiseTech Global, India (July 2024 - Present)

Professional Summary:
- Self-taught Software Engineer with a Mechanical Engineering degree from IIT Roorkee
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

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "arcee-ai/trinity-large-preview:free";

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    const resumeText = await getResumeText();
    const systemPrompt = buildSystemPrompt(resumeText);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenRouter error:", response.status, errBody);
      return NextResponse.json(
        { error: `AI error: ${response.status} - ${errBody}` },
        { status: 502 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
