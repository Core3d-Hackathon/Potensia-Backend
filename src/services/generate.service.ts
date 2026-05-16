import { GoogleGenerativeAI } from "@google/generative-ai";
import { getCapaianByFaseAndSubject, FaseCode } from "../data/curriculumData";
import { GenerateModuleInput } from "../schemas/generate.schema";
import {
  generatedDocumentSchema,
  GeneratedDocumentOutput,
} from "../schemas/generated-document.schema";

const getApiKeys = (): string[] => {
  const keysString = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY;

  if (!keysString) {
    throw new Error("GEMINI_API_KEY is not configured in environment variables");
  }

  return keysString
    .split(",")
    .map((key) => key.trim())
    .filter(Boolean);
};

const getRandomApiKey = (): string => {
  const keys = getApiKeys();
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
};

const formatCapaian = (capaian: Record<string, string> | null) => {
  if (!capaian) {
    return "Capaian pembelajaran tidak ditemukan.";
  }

  return Object.entries(capaian)
    .map(([key, value]) => `- ${key}: ${value}`)
    .join("\n");
};

const cleanJsonText = (text: string) => {
  try {
    const rawJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonMatch = rawJson.match(/\{[\s\S]*\}/);
    return jsonMatch ? jsonMatch[0].trim() : rawJson;
  } catch (error) {
    console.error("Error dalam ekstraksi JSON:", error);
    return text;
  }
};

const buildPrompt = (payload: GenerateModuleInput, capaianText: string) => `
Anda adalah penyusun dokumen pembelajaran Kurikulum Merdeka yang sangat teliti.

Tugas Anda adalah menghasilkan output JSON valid saja untuk ATP dan Modul Ajar/Projek lengkap.

ATURAN UMUM:
1. Gunakan bahasa Indonesia formal, jelas, rinci, dan siap pakai untuk dokumen sekolah.
2. Output HARUS berupa JSON valid saja.
3. Jangan menambahkan penjelasan di luar JSON.
4. Semua bagian wajib terisi lengkap. Jika data tidak tersedia, isi dengan nilai yang masuk akal, kontekstual, dan realistis.
5. ATP harus memuat identitas, capaian pembelajaran fase, alur tujuan pembelajaran per semester, alokasi waktu, rekap total JP, dan pengesahan.
6. Modul ajar/projek harus memuat identitas, kata pengantar, rasional, tujuan umum, target pencapaian, alur projek, rancangan aktivitas, tahapan perkembangan kompetensi, RPP detail per aktivitas, asesmen, rubrik, LKPD, refleksi, dan pengesahan.
7. Jika lingkup berupa projek atau kokurikuler, gunakan tahap Temukan, Bayangkan, Lakukan, Bagikan.
8. Setiap aktivitas wajib punya tujuan pembelajaran, praktik pedagogis, lingkungan pembelajaran, pemanfaatan digital, kemitraan, langkah pembelajaran pembukaan-inti-penutup, asesmen formatif, asesmen sumatif, tabel penilaian, dan lampiran LKPD.
9. Gunakan istilah yang konsisten dan realistis untuk konteks sekolah Indonesia.
10. Jangan ada field kosong penting.

KONTEKS INPUT:
- Jenjang: ${payload.jenjang}
- Fase/Kelas: ${payload.fase_kelas}
- Mata pelajaran: ${payload.mapel}
- Materi: ${payload.materi}
- Tema: ${payload.tema}
- Topik: ${payload.topik}
- Nama projek: ${payload.nama_projek}
- Lingkup: ${payload.lingkup}
- Kategori wilayah: ${payload.kategori_wilayah}
- Kearifan lokal: ${payload.kearifan_lokal}
- Isu lokal: ${payload.isu_lokal}
- Fasilitas: ${payload.fasilitas.join(", ")}
- Gaya belajar: ${payload.gaya_belajar.join(", ")}
- Latar belakang siswa: ${payload.latar_belakang_siswa}
- Karakter peserta didik: ${payload.karakter_peserta_didik}
- Model pembelajaran: ${payload.model_pembelajaran}
- Jenis asesmen: ${payload.jenis_asesmen.join(", ")}
- Alokasi waktu: ${payload.alokasi_waktu}
- Tahun ajaran: ${payload.tahun_ajaran}
- Penyusun: ${payload.penyusun}
- Satuan pendidikan: ${payload.satuan_pendidikan}
- Lokasi: ${payload.lokasi}
- Profil target: ${payload.profil_target.join(", ")}
- Jumlah aktivitas: ${payload.jumlah_aktivitas}
- Jumlah pertemuan: ${payload.jumlah_pertemuan}
- Output akhir: ${payload.output_akhir}
- Fasilitas digital: ${payload.fasilitas_digital.join(", ")}
- Kemitraan tersedia: ${payload.kemitraan_tersedia.join(", ")}
- Kepala sekolah: ${payload.kepala_sekolah}

CAPAIAN PEMBELAJARAN:
${capaianText}

Keluarkan hanya JSON valid tanpa markdown, tanpa komentar, tanpa backtick.

Gunakan struktur JSON berikut secara ketat:
{
  "dokumen": {
    "jenis": "paket_pembelajaran",
    "versi_schema": "1.0.0",
    "bahasa": "id",
    "dibuat_pada": "",
    "sumber_format": {
      "atp": "contoh_atp",
      "modul_ajar": "contoh_modul_projek"
    }
  },
  "identitas": {
    "satuan_pendidikan": "",
    "kelas": "",
    "fase": "",
    "semester_opsi": ["ganjil", "genap"],
    "tahun_ajaran": "",
    "penyusun": "",
    "mata_pelajaran": [""],
    "tema": "",
    "topik": "",
    "nama_projek": "",
    "lingkup": "",
    "lintas_disiplin": true,
    "disiplin_terkait": [""],
    "alokasi_waktu_total_jp": 0,
    "jumlah_pertemuan": 0,
    "profil_target": [""],
    "lokasi": "",
    "tanggal_penyusunan": "",
    "kepala_sekolah": {
      "nama": "",
      "nip_opsional": "",
      "jabatan": "Kepala Sekolah"
    },
    "guru_penyusun": {
      "nama": "",
      "nip_opsional": "",
      "jabatan": "Guru"
    }
  },
  "atp": {
    "judul": "ALUR TUJUAN PEMBELAJARAN",
    "capaian_pembelajaran_fase": "",
    "deskripsi_umum": "",
    "semester": [
      {
        "nama_semester": "Semester 1",
        "label": "ganjil",
        "items": [
          {
            "no": 1,
            "elemen": "",
            "bab_opsional": "",
            "capaian_pembelajaran_per_elemen": "",
            "materi_pokok": "",
            "tujuan_pembelajaran": [
              {
                "kode_tp": "TP-1",
                "deskripsi": "",
                "profil_pelajar_pancasila": [""],
                "asesmen_awal_opsional": ""
              }
            ],
            "alokasi_waktu_jp": 0,
            "estimasi_pertemuan": 0,
            "catatan_opsional": ""
          }
        ]
      }
    ],
    "rekap": {
      "total_jp": 0,
      "total_tp": 0,
      "catatan": ""
    },
    "pengesahan": {
      "tempat": "",
      "tanggal": "",
      "mengetahui": true,
      "ttd_kepala_sekolah": true,
      "ttd_guru": true
    }
  },
  "modul_ajar": {
    "judul_modul": "",
    "kata_pengantar": "",
    "rasional": "",
    "tujuan_umum": [""],
    "target_pencapaian": [""],
    "alur_projek": {
      "nama_tahap": ["Temukan", "Bayangkan", "Lakukan", "Bagikan"],
      "deskripsi_tahap": [
        {
          "tahap": "Temukan",
          "deskripsi": "",
          "fokus_asesmen": ""
        }
      ]
    },
    "rancangan_aktivitas_projek": [
      {
        "no": 1,
        "tahap": "Temukan",
        "nama_aktivitas": "",
        "deskripsi_kegiatan": "",
        "asesmen": {
          "jenis": "",
          "metode": "",
          "bentuk": "",
          "fokus_bernalar_kritis": "",
          "fokus_kemandirian": ""
        }
      }
    ],
    "tahapan_perkembangan_kompetensi": {
      "profil_dikembangkan": ["Bernalar Kritis", "Mandiri"],
      "level": ["Sangat Berkembang", "Berkembang Sesuai Harapan", "Sedang Berkembang", "Mulai Berkembang"],
      "indikator": {
        "bernalar_kritis": [
          {
            "level": "Sangat Berkembang",
            "deskripsi": ""
          }
        ],
        "mandiri": [
          {
            "level": "Sangat Berkembang",
            "deskripsi": ""
          }
        ]
      },
      "cara_penggunaan_untuk_guru": ["", "", "", ""]
    },
    "aktivitas_detail": [
      {
        "nomor": 1,
        "nama_projek": "",
        "nama_aktivitas": "",
        "alokasi_waktu": {
          "jp": 0,
          "pertemuan": 1,
          "durasi_naratif": ""
        },
        "profil_target": ["Bernalar Kritis", "Mandiri"],
        "kelas": "",
        "disiplin_ilmu_terkait": [""],
        "tujuan_pembelajaran": [""],
        "praktik_pedagogis": [""],
        "lingkungan_pembelajaran": "",
        "pemanfaatan_digital": {
          "alat": [""],
          "kegiatan": [""],
          "platform": [""]
        },
        "kemitraan_pembelajaran": {
          "internal": [""],
          "eksternal": [""]
        },
        "kegiatan_pembelajaran": {
          "pembukaan": {
            "waktu": "",
            "kegiatan_guru": [""],
            "kegiatan_peserta_didik": [""],
            "asesmen_formatif": [""]
          },
          "inti": {
            "waktu": "",
            "kegiatan_guru": [""],
            "kegiatan_peserta_didik": [""],
            "asesmen_formatif": [""]
          },
          "penutup": {
            "waktu": "",
            "kegiatan_guru": [""],
            "kegiatan_peserta_didik": [""],
            "asesmen_sumatif": [""]
          }
        },
        "tabel_asesmen_sumatif": {
          "judul": "",
          "kolom": [""],
          "baris_template": [""],
          "kriteria": {
            "SB": "",
            "BSH": "",
            "MB": "",
            "BB": ""
          }
        },
        "lampiran_lkpd": {
          "judul": "",
          "nama_kelompok_opsional": true,
          "anggota": true,
          "hari_tanggal": true,
          "petunjuk": "",
          "bagian": [
            {
              "judul": "",
              "jenis": "tabel",
              "isi_template": {}
            }
          ],
          "refleksi_individu": [""],
          "kriteria_peran": [""]
        }
      }
    ],
    "refleksi_akhir": {
      "untuk_siswa": [""],
      "untuk_guru": [""],
      "komitmen_tindak_lanjut": [""]
    },
    "lampiran_opsional": {
      "media_pendukung": [""],
      "contoh_produk": [""],
      "lembar_peer_assessment": [""],
      "jurnal_refleksi": [""],
      "daftar_bahan_alat": [""]
    },
    "pengesahan": {
      "tempat": "",
      "tanggal": "",
      "kepala_sekolah": "",
      "guru_penyusun": ""
    }
  }
}
`;

const generateWithModel = async (
  modelName: string,
  prompt: string,
): Promise<GeneratedDocumentOutput> => {
  const genAI = new GoogleGenerativeAI(getRandomApiKey());
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      temperature: 0.4,
      topP: 0.9,
      topK: 32,
    },
  });

  const result = await model.generateContent(prompt);
  const cleanedText = cleanJsonText(result.response.text());
  const parsed = JSON.parse(cleanedText);
  return generatedDocumentSchema.parse(parsed);
};

export const generateModule = async (
  payload: GenerateModuleInput,
): Promise<GeneratedDocumentOutput> => {
  const capaian = getCapaianByFaseAndSubject(
    payload.fase_kelas as FaseCode,
    payload.mapel,
  );

  const capaianText = formatCapaian(capaian);
  const prompt = buildPrompt(payload, capaianText);

  const primaryModel = process.env.GEMINI_MODEL || "gemini-3-flash-preview";
  const fallbackModels = ["gemini-3.1-flash-lite", "gemini-2.5-flash"];
  const modelsToTry = [primaryModel, ...fallbackModels];

  let lastError: unknown = null;

  for (const modelName of modelsToTry) {
    try {
      console.log(`[AI Gen] Memulai dengan model: ${modelName}`);
      return await generateWithModel(modelName, prompt);
    } catch (error) {
      lastError = error;
      console.warn(`[AI Gen] Gagal dengan model ${modelName}`);
    }
  }

  console.error("[AI Gen] Gagal dengan semua model AI:", lastError);
  throw new Error("AI response is not valid JSON or API is busy.");
};

export const generateModuleDraft = generateModule;