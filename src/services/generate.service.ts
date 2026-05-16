import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCapaianByFaseAndSubject, FaseCode } from "../data/curriculumData";
import { GenerateModuleInput } from "../schemas/generate.schema";

// ==========================================
// 1. ROTASI API KEY & HELPERS
// ==========================================

const getRandomApiKey = (): string => {
  // Mendukung variabel single key (GEMINI_API_KEY) atau multi-key (GEMINI_API_KEYS)
  const keysString = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY;

  if (!keysString) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables");
  }

  const keys = keysString
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  if (keys.length === 0) {
    throw new Error("No valid Gemini API keys were found in environment variables");
  }

  const randomIndex = Math.floor(Math.random() * keys.length);
  const selectedKey = keys[randomIndex];

  if (!selectedKey) {
    throw new Error("Failed to select a Gemini API key");
  }

  return selectedKey;
};

const formatCapaian = (capaian: Record<string, string> | null) => {
  if (!capaian) {
    return "Capaian pembelajaran tidak ditemukan.";
  }

  return Object.entries(capaian)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");
};

// Fungsi Extract JSON yang sudah FIX dari error TypeScript Unterminated Regex
const cleanJsonText = (text: string) => {
  try {
    // Memburu bracket kurawal terluar, memotong basa-basi dari AI
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const rawJson = jsonMatch ? jsonMatch[0] : text;

    return rawJson
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  } catch (error) {
    console.error("Error dalam ekstraksi JSON:", error);
    return text; // Kembalikan teks mentah jika regex gagal
  }
};

// ==========================================
// 2. FUNGSI UTAMA GENERATE (DENGAN FALLBACK)
// ==========================================

export const generateModule = async (payload: GenerateModuleInput) => {
  const capaian = getCapaianByFaseAndSubject(
    payload.fase_kelas as FaseCode,
    payload.mapel,
  );

  const capaianText = formatCapaian(capaian);

  const prompt = `
Kamu adalah asisten perancang modul ajar Kurikulum Merdeka.

Tugasmu adalah membuat draft modul ajar dalam format JSON yang valid dan rapi.
Gunakan konteks input berikut dan sesuaikan dengan capaian pembelajaran.

Konteks input:
- Jenjang: ${payload.jenjang}
- Fase/Kelas: ${payload.fase_kelas}
- Mata pelajaran: ${payload.mapel}
- Materi: ${payload.materi}
- Kategori wilayah: ${payload.kategori_wilayah}
- Kearifan lokal: ${payload.kearifan_lokal}
- Isu lokal: ${payload.isu_lokal}
- Fasilitas: ${payload.fasilitas.join(", ")}
- Gaya belajar: ${payload.gaya_belajar.join(", ")}
- Latar belakang siswa: ${payload.latar_belakang_siswa}
- Model pembelajaran: ${payload.model_pembelajaran}
- Jenis asesmen: ${payload.jenis_asesmen.join(", ")}
- Alokasi waktu: ${payload.alokasi_waktu}

Capaian Pembelajaran:
${capaianText}

Keluarkan hanya JSON valid tanpa markdown, tanpa penjelasan tambahan, tanpa tanda backtick.

Gunakan struktur:
{
  "identitas_modul": {
    "jenjang": "",
    "fase_kelas": "",
    "mata_pelajaran": "",
    "materi": "",
    "alokasi_waktu": ""
  },
  "kompetensi_awal": [],
  "profil_pelajar_pancasila": [],
  "sarana_prasarana": [],
  "target_peserta_didik": "",
  "model_pembelajaran": "",
  "tujuan_pembelajaran": [],
  "pemahaman_bermakna": [],
  "pertanyaan_pemantik": [],
  "kegiatan_pembelajaran": {
    "pendahuluan": [],
    "inti": [],
    "penutup": []
  },
  "asesmen": {
    "diagnostik": [],
    "formatif": [],
    "sumatif": []
  },
  "pengayaan": [],
  "remedial": [],
  "bahan_bacaan": [],
  "glosarium": [],
  "daftar_pustaka": []
}
`;

  // Tentukan Model (Utama & Cadangan)
  const primaryModel = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
  const fallbackModel = "gemini-3.1-flash-lite";
  const config = { temperature: 0.5 };

  try {
    // PERCOBAAN 1: Gunakan model utama dan API Key acak
    const genAI = new GoogleGenerativeAI(getRandomApiKey());
    const model = genAI.getGenerativeModel({
      model: primaryModel,
      generationConfig: config,
    });

    console.log(`[AI Gen] Memulai dengan model: ${primaryModel}`);
    const result = await model.generateContent(prompt);
    const cleanedText = cleanJsonText(result.response.text());

    return JSON.parse(cleanedText);
  } catch (error) {
    console.warn(
      `[AI Gen] Gagal dengan model ${primaryModel}, beralih ke cadangan (${fallbackModel})...`,
      error,
    );

    try {
      // PERCOBAAN 2: Jika error, gunakan model cadangan
      const genAIFallback = new GoogleGenerativeAI(getRandomApiKey());
      const fallback = genAIFallback.getGenerativeModel({
        model: fallbackModel,
        generationConfig: config,
      });

      const resultFallback = await fallback.generateContent(prompt);
      const cleanedTextFallback = cleanJsonText(resultFallback.response.text());

      return JSON.parse(cleanedTextFallback);
    } catch (fallbackError) {
      console.error("[AI Gen] Gagal dengan semua model AI:", fallbackError);
      throw new Error("AI response is not valid JSON or API is busy.");
    }
  }
};

export const generateModuleDraft = generateModule;
