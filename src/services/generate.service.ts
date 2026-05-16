import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCapaianByFaseAndSubject, FaseCode } from "../data/curriculumData";
import {
  GenerateTpInput,
  GenerateAtpInput,
  GenerateModulAjarInput,
} from "../schemas/generate.schema";

// ==========================================
// 1. HELPERS: API Keys & JSON Extractor
// ==========================================
const getRandomApiKey = (): string => {
  const keysString = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY;
  if (!keysString) throw new Error("GEMINI_API_KEYS is not configured in env");

  // 🌟 PERBAIKAN: Split, lalu paksa hapus spasi DAN hapus tanda kutip sisa pembungkus env
  const keys = keysString
    .split(",")
    .map((k) => k.trim().replace(/^["']|["']$/g, "")) // Sikat tanda kutip di ujung string
    .filter(Boolean);

  if (keys.length === 0) {
    throw new Error("No valid Gemini API keys found");
  }

  // Pilih acak dari key yang sudah bersih steril
  return keys[Math.floor(Math.random() * keys.length)]!;
};

const formatCapaian = (capaian: Record<string, string> | null) => {
  if (!capaian) return "Capaian pembelajaran tidak ditemukan.";
  return Object.entries(capaian)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");
};

const cleanJsonText = (text: string) => {
  try {
    const rawJson = text
      .replace(/\`\`\`json/g, "")
      .replace(/\`\`\`/g, "")
      .trim();
    const jsonMatch = rawJson.match(/\{[\s\S]*\}/);
    return jsonMatch ? jsonMatch[0].trim() : rawJson;
  } catch (error) {
    console.error("Error ekstraksi JSON:", error);
    return text;
  }
};

// ==========================================
// 2. CORE AI RUNNER
// ==========================================
const runAIGeneration = async (prompt: string) => {
  // Gunakan nama model yang sesuai dengan kode asli Anda dan terbukti aktif di Google AI Studio Anda
  const primaryModel = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
  const fallbackModel = "gemini-2.5-flash"; // Cadangan menggunakan seri 2.5
  const modelsToTry = [primaryModel, fallbackModel];

  let lastError: unknown = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`[AI Engine] Mengeksekusi prompt dengan: ${modelName}...`);
      const genAI = new GoogleGenerativeAI(getRandomApiKey());
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { temperature: 0.4, topP: 0.9, topK: 32 },
      });

      const result = await model.generateContent(prompt);
      return JSON.parse(cleanJsonText(result.response.text()));
    } catch (error) {
      lastError = error;
      console.warn(
        `[AI Engine] Model ${modelName} gagal, beralih ke cadangan...`,
      );
    }
  }
  console.error("[AI Engine] CRITICAL: Semua model gagal.", lastError);
  throw new Error("Gagal menyusun modul menggunakan AI. Silakan coba lagi.");
};

// ==========================================
// 3. SERVICE FUNCTIONS (Wizard Flow)
// ==========================================

export const generateTPDraft = async (payload: GenerateTpInput) => {
  const capaian = getCapaianByFaseAndSubject(
    payload.fase_kelas as FaseCode,
    payload.mapel,
  );

  const prompt = `
Anda adalah ahli penyusun RPP Kurikulum Merdeka.
Tugas: Buat 4-6 Tujuan Pembelajaran (TP) yang terukur mencakup Kognitif, Afektif, Psikomotorik.
Konteks: ${payload.jenjang} Kelas ${payload.fase_kelas}, Mapel ${payload.mapel}, Materi: ${payload.materi}.
Isu Lokal: ${payload.isu_lokal}, Kearifan Lokal: ${payload.kearifan_lokal}.
Capaian Pembelajaran: ${formatCapaian(capaian)}

OUTPUT WAJIB JSON VALID (TANPA MARKDOWN):
{
  "tujuan_pembelajaran": [
    {
      "kode_tp": "TP.1",
      "kategori": "Kognitif",
      "konteks": "Sesuai isu lokal",
      "deskripsi": "Siswa mampu..."
    }
  ]
}`;
  return await runAIGeneration(prompt);
};

export const generateATPDraft = async (payload: GenerateAtpInput) => {
  const tps = JSON.stringify(payload.tujuan_pembelajaran_terpilih);

  const prompt = `
Tugas: Susun Tujuan Pembelajaran (TP) berikut menjadi Alur Pertemuan (ATP) yang logis.
Total Pertemuan: ${payload.jumlah_pertemuan}. Alokasi Waktu: ${payload.alokasi_waktu}.
Daftar TP: ${tps}

OUTPUT WAJIB JSON VALID (TANPA MARKDOWN):
{
  "total_pertemuan": ${payload.jumlah_pertemuan},
  "alur_pertemuan": [
    {
      "pertemuan_ke": 1,
      "alokasi_jp": 2,
      "materi_pokok": "Judul singkat materi",
      "tujuan_pembelajaran": ["Deskripsi TP 1", "Deskripsi TP 2"]
    }
  ]
}`;
  return await runAIGeneration(prompt);
};

export const generateModulDraft = async (payload: GenerateModulAjarInput) => {
  const atp = JSON.stringify(payload.alur_pertemuan);

  const prompt = `
Anda adalah ahli RPP Kurikulum Merdeka. Buat detail Modul Ajar berdasarkan ATP berikut:
${atp}

Konteks Umum: Mapel ${payload.mapel} (${payload.materi}), Sekolah: ${payload.satuan_pendidikan}.
Model Pembelajaran: ${payload.model_pembelajaran}.
Fasilitas Terbatas: ${payload.fasilitas.join(", ")}.

OUTPUT WAJIB JSON VALID (TANPA MARKDOWN). Susun array "lampiran_lkpd" sebagai panduan praktikum komprehensif seperti contoh berikut:
{
  "identitas_modul": {
    "satuan_pendidikan": "${payload.satuan_pendidikan}",
    "fase_kelas": "${payload.fase_kelas}",
    "mata_pelajaran": "${payload.mapel}",
    "alokasi_waktu": "${payload.alokasi_waktu}"
  },
  "langkah_pembelajaran": [
    {
      "pertemuan_ke": 1,
      "materi_pokok": "Dari ATP",
      "kegiatan_awal": ["15 Menit: Apersepsi..."],
      "kegiatan_inti": ["50 Menit: Sintaks 1..."],
      "kegiatan_penutup": ["15 Menit: Refleksi..."]
    }
  ],
  "asesmen": {
    "formatif": ["..."],
    "rubrik": [
      { "kriteria": "", "mahir": "", "berkembang": "" }
    ]
  },
  "lampiran_lkpd": [
    "A. TUJUAN PERCOBAAN: Menyelidiki hubungan antara gaya dan... (sesuaikan materi)",
    "B. ALAT DAN BAHAN: 1. Alat A (1 buah)\\n2. Bahan B (Secukupnya)",
    "C. PERCOBAAN AWAL (APERSEPSI): Diskusikan dalam kelompok: Jika kamu melihat fenomena [Isu Lokal] di sekitarmu, apa yang kamu rasakan?",
    "D. LANGKAH PENGAMATAN / PROSEDUR KERJA: 1. Susunlah alat seperti...\\n2. Lakukan pengukuran pada...",
    "E. DATA PENGAMATAN: Buatlah tabel yang berisi kolom massa, jarak, dan gaya...",
    "F. PENYUSUNAN KONSEP & KESIMPULAN: Berdasarkan percobaan di atas, jelaskan perbandingan antara... Tuliskan kesimpulan akhirmu!"
  ]
}`;
  return await runAIGeneration(prompt);
};
