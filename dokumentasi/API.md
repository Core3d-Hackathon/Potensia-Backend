# Potensia Backend API

Dokumentasi ini merangkum seluruh endpoint backend yang saat ini tersedia dalam satu file.

## Base URL

Saat development lokal:

```text
http://localhost:5000
```

API prefix aktif saat ini:

```text
/v1
```

Jadi contoh full endpoint:

```text
http://localhost:5000/v1/curriculum/jenjang
```

## Format Response Umum

Response sukses:

```json
{
  "success": true,
  "message": "Request success message",
  "data": {},
  "meta": {
    "requestId": "string",
    "timestamp": "2026-05-16T09:00:00.000Z",
    "path": "/v1/example",
    "method": "GET"
  }
}
```

Response error:

```json
{
  "success": false,
  "message": "Error message",
  "meta": {
    "requestId": "string",
    "timestamp": "2026-05-16T09:00:00.000Z",
    "path": "/v1/example",
    "method": "GET"
  }
}
```

## Authentication

Saat ini sebagian endpoint auth menggunakan middleware `authenticate`.

Endpoint yang memerlukan bearer token:

- `GET /v1/auth/me`
- `GET /v1/leaderboard/me`

Header:

```http
Authorization: Bearer <clerk_token>
```

## Endpoints

### 1. Root

#### `GET /`

Untuk mengecek bahwa backend utama berjalan.

Contoh response:

```json
{
  "success": true,
  "message": "Potensia backend is running",
  "data": {
    "name": "backend",
    "version": "v1"
  }
}
```

### 2. Health Check

#### `GET /v1/health`

Untuk health check service.

Contoh response:

```json
{
  "success": true,
  "message": "Service is healthy",
  "data": {
    "service": "Potensia backend",
    "status": "up"
  }
}
```

### 3. Auth

#### `GET /v1/auth/config`

Mengambil konfigurasi auth yang perlu diketahui frontend.

Auth required: `No`

Contoh response:

```json
{
  "success": true,
  "message": "Authentication config fetched successfully",
  "data": {
    "provider": "google_oauth",
    "authProvider": "clerk",
    "loginFlow": "frontend_redirect",
    "notes": [
      "Frontend should start login with Clerk using the oauth_google strategy.",
      "Backend accepts the Clerk bearer token after Google sign-in succeeds.",
      "Frontend should handle logout directly with Clerk."
    ],
    "endpoints": {
      "me": "/v1/auth/me"
    }
  }
}
```

#### `GET /v1/auth/me`

Mengambil data user yang sedang login sekaligus sinkronisasi user ke database.

Auth required: `Yes`

Header:

```http
Authorization: Bearer <clerk_token>
```

Contoh response:

```json
{
  "success": true,
  "message": "Authenticated user fetched successfully",
  "data": {
    "auth": {
      "clerkUserId": "user_xxx",
      "sessionId": "sess_xxx"
    },
    "user": {
      "id": "uuid",
      "clerkId": "user_xxx",
      "name": "John Doe",
      "email": "john@example.com",
      "imageUrl": "https://example.com/image.png",
      "points": 0,
      "createdAt": "2026-05-16T09:00:00.000Z"
    },
    "clerkProfile": {
      "clerkId": "user_xxx",
      "email": "john@example.com",
      "name": "John Doe",
      "imageUrl": "https://example.com/image.png",
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe"
    }
  }
}
```

### 4. Leaderboard

#### `GET /v1/leaderboard`

Mengambil top 10 user dengan poin tertinggi untuk kebutuhan gamifikasi.

Auth required: `No`

Data yang ditampilkan per user:

- `rank`
- `id`
- `clerkId`
- `name`
- `email`
- `imageUrl`
- `totalPoints`
- `totalModules`

Contoh response:

```json
{
  "success": true,
  "message": "Leaderboard fetched successfully",
  "data": {
    "leaderboard": [
      {
        "rank": 1,
        "id": "uuid",
        "clerkId": "user_xxx",
        "name": "John Doe",
        "email": "john@example.com",
        "imageUrl": "https://example.com/image.png",
        "totalPoints": 120,
        "totalModules": 5
      }
    ]
  }
}
```

#### `GET /v1/leaderboard/me`

Mengambil peringkat user yang sedang login.

Auth required: `Yes`

Header:

```http
Authorization: Bearer <clerk_token>
```

Data yang ditampilkan:

- `name`
- `rank`
- `totalPoints`

Contoh response:

```json
{
  "success": true,
  "message": "Authenticated user leaderboard rank fetched successfully",
  "data": {
    "user": {
      "name": "John Doe",
      "rank": 4,
      "totalPoints": 120
    }
  }
}
```

### 5. Curriculum

Semua endpoint curriculum saat ini belum memakai auth middleware, jadi bisa dipanggil langsung.

#### Flow Berantai yang Disarankan

1. Ambil list jenjang
2. Pilih satu jenjang lalu ambil fase
3. Pilih satu fase lalu ambil mata pelajaran
4. Pilih satu mata pelajaran lalu ambil capaian

#### `GET /v1/curriculum/jenjang`

Mengambil list seluruh jenjang.

Contoh response:

```json
{
  "success": true,
  "message": "Curriculum jenjang list fetched successfully",
  "data": {
    "jenjang": [
      {
        "key": "sd",
        "label": "SD/MI",
        "faseCodes": ["A", "B", "C"],
        "grades": [
          "Kelas 1",
          "Kelas 2",
          "Kelas 3",
          "Kelas 4",
          "Kelas 5",
          "Kelas 6"
        ]
      },
      {
        "key": "smp",
        "label": "SMP/MTs",
        "faseCodes": ["D"],
        "grades": ["Kelas 7", "Kelas 8", "Kelas 9"]
      },
      {
        "key": "sma",
        "label": "SMA/MA",
        "faseCodes": ["E", "F"],
        "grades": ["Kelas 10", "Kelas 11", "Kelas 12"]
      }
    ]
  }
}
```

#### `GET /v1/curriculum/fase`

Mengambil list seluruh fase.

Contoh response:

```json
{
  "success": true,
  "message": "Curriculum fase list fetched successfully",
  "data": {
    "fase": [
      {
        "code": "A",
        "label": "Fase A",
        "jenjangKey": "sd",
        "jenjangLabel": "SD/MI",
        "grades": ["Kelas 1", "Kelas 2"],
        "subjects": ["Bahasa Indonesia", "Matematika"]
      }
    ]
  }
}
```

#### `GET /v1/curriculum/jenjang/:jenjangKey/fase`

Mengambil list fase berdasarkan jenjang yang dipilih.

Path params:

- `jenjangKey`: `sd | smp | sma`

Contoh request:

```http
GET /v1/curriculum/jenjang/sd/fase
```

Contoh response:

```json
{
  "success": true,
  "message": "Curriculum fase list by jenjang fetched successfully",
  "data": {
    "jenjang": {
      "key": "sd",
      "label": "SD/MI",
      "faseCodes": ["A", "B", "C"],
      "grades": [
        "Kelas 1",
        "Kelas 2",
        "Kelas 3",
        "Kelas 4",
        "Kelas 5",
        "Kelas 6"
      ]
    },
    "fase": [
      {
        "code": "A",
        "label": "Fase A",
        "jenjangKey": "sd",
        "jenjangLabel": "SD/MI",
        "grades": ["Kelas 1", "Kelas 2"],
        "subjects": ["Bahasa Indonesia", "Matematika"]
      },
      {
        "code": "B",
        "label": "Fase B",
        "jenjangKey": "sd",
        "jenjangLabel": "SD/MI",
        "grades": ["Kelas 3", "Kelas 4"],
        "subjects": ["Bahasa Indonesia", "Matematika", "IPAS"]
      }
    ]
  }
}
```

#### `GET /v1/curriculum/fase/:faseCode/subjects`

Mengambil list mata pelajaran berdasarkan fase yang dipilih.

Path params:

- `faseCode`: `A | B | C | D | E | F`

Contoh request:

```http
GET /v1/curriculum/fase/B/subjects
```

Contoh response:

```json
{
  "success": true,
  "message": "Curriculum subject list by fase fetched successfully",
  "data": {
    "fase": {
      "code": "B",
      "label": "Fase B",
      "jenjangKey": "sd",
      "jenjangLabel": "SD/MI",
      "grades": ["Kelas 3", "Kelas 4"],
      "subjects": ["Bahasa Indonesia", "Matematika", "IPAS"]
    },
    "subjects": ["Bahasa Indonesia", "Matematika", "IPAS"]
  }
}
```

#### `GET /v1/curriculum/fase/:faseCode/subjects/:subjectName/capaian`

Mengambil detail capaian berdasarkan fase dan mata pelajaran yang dipilih.

Path params:

- `faseCode`: `A | B | C | D | E | F`
- `subjectName`: nama mata pelajaran

Catatan:

- Jika nama mapel mengandung spasi, kirim dalam bentuk URL encoded.
- Contoh `Bahasa Indonesia` menjadi `Bahasa%20Indonesia`

Contoh request:

```http
GET /v1/curriculum/fase/B/subjects/Matematika/capaian
```

Atau:

```http
GET /v1/curriculum/fase/B/subjects/Bahasa%20Indonesia/capaian
```

Contoh response:

```json
{
  "success": true,
  "message": "Curriculum capaian by fase and subject fetched successfully",
  "data": {
    "jenjang": {
      "key": "sd",
      "label": "SD/MI",
      "faseCodes": ["A", "B", "C"],
      "grades": [
        "Kelas 1",
        "Kelas 2",
        "Kelas 3",
        "Kelas 4",
        "Kelas 5",
        "Kelas 6"
      ]
    },
    "fase": {
      "code": "B",
      "label": "Fase B",
      "jenjangKey": "sd",
      "jenjangLabel": "SD/MI",
      "grades": ["Kelas 3", "Kelas 4"],
      "subjects": ["Bahasa Indonesia", "Matematika", "IPAS"]
    },
    "subject": {
      "name": "Matematika",
      "capaianKeys": [
        "Bilangan",
        "Aljabar",
        "Pengukuran",
        "Geometri",
        "Analisis Data dan Peluang"
      ],
      "capaian": {
        "Bilangan": "Peserta didik menunjukkan pemahaman dan intuisi bilangan...",
        "Aljabar": "Peserta didik dapat mengisi nilai yang belum diketahui...",
        "Pengukuran": "Peserta didik dapat mengukur panjang dan berat benda...",
        "Geometri": "Peserta didik dapat mendeskripsikan ciri berbagai bentuk bangun datar...",
        "Analisis Data dan Peluang": "Peserta didik dapat mengurutkan, membandingkan..."
      }
    }
  }
}
```

### 6. Modules

#### `GET /v1/modules`

Mengambil seluruh daftar modul (Arsip) yang pernah dibuat oleh pengguna yang sedang login.

Auth required: `Yes`

Header:
```http
Authorization: Bearer <clerk_token>
```

#### `GET /v1/modules/:id`

Mengambil detail dari sebuah modul berdasarkan UUID.

Auth required: `No`

#### `POST /v1/modules`

Menyimpan modul baru ke database.

Auth required: `Yes`

Header:

```http
Authorization: Bearer <clerk_token>
```

Contoh Request Body:

```json
{
  "judul_modul": "Modul Matematika SD",
  "jenjang": "sd",
  "fase_kelas": "A",
  "mapel": "Matematika",
  "materi": "Bilangan",
  "kategori_wilayah": "Pesisir",
  "content_json": {},
  "status": "DRAFT"
}
```

#### `POST /v1/modules/:id/publish`

Mengubah status modul dari `DRAFT` menjadi `PUBLISHED`. Author akan secara otomatis mendapatkan **+50 Poin**. Hanya author pemilik modul yang bisa melakukan aksi ini.

Auth required: `Yes`

#### `PATCH /v1/modules/:id`

Mengubah/update data modul yang sudah ada (termasuk status dan `content_json`). Bisa digunakan untuk menyimpan auto-save atau update status.

Auth required: `Yes`

#### `POST /v1/modules/generate/tp`

Menghasilkan draf Tujuan Pembelajaran (TP) menggunakan AI.

Auth required: `No`

#### `POST /v1/modules/generate/atp`

Menghasilkan Alur Tujuan Pembelajaran (ATP) menggunakan AI.

Auth required: `No`

#### `POST /v1/modules/generate/modul`

Menghasilkan Modul Ajar dan panduan LKPD lengkap menggunakan AI.

Auth required: `No`

### 7. Community

#### `GET /v1/community`

Mengambil daftar modul dari seluruh user yang statusnya **"PUBLISHED"** untuk ditampilkan di halaman komunitas. Hasil kembalian akan otomatis diacak (_shuffled_).

Auth required: `No`

Query Parameters (Semua Opsional):

- `search`: mencari kata di judul, mapel, atau materi (contoh: `?search=bilangan`)
- `jenjang`
- `fase_kelas`
- `mapel`
- `materi`
- `kategori_wilayah`
- `sortBy`: Pengurutan data (`random` | `popular` | `newest`). Default: `random`.
- `limit`: Jumlah data maksimal yang dikembalikan (maksimal `100`). Default: `50`.

*Catatan: Endpoint ini menggunakan prisma `select`, sehingga tidak mengembalikan payload `content_json` yang berat untuk mempercepat waktu loading list di Frontend.*

#### `POST /v1/community/:id/upvote`

Melakukan aksi **Upvote** pada sebuah modul komunitas. Aksi ini bersifat _toggle_ (jika sudah di-upvote, maka memanggil ini lagi akan menghapus upvote-nya).
Setiap upvote memberikan **+10 Poin** kepada author modul tersebut.

Auth required: `Yes`

Header:

```http
Authorization: Bearer <clerk_token>
```

Contoh Response (Jika Upvote Berhasil):

```json
{
  "success": true,
  "message": "Module upvoted successfully",
  "data": {
    "upvoted": true
  }
}
```

Contoh Response (Jika Upvote Dibatalkan):

```json
{
  "success": true,
  "message": "Module upvote removed",
  "data": {
    "upvoted": false
  }
}
```

### 8. Dashboard

#### `GET /v1/dashboard`

Mengambil data statistik user yang sedang login untuk ditampilkan di halaman Dashboard (Total Poin, Total Modul, dan 5 Aktifitas Modul Terakhir).

Auth required: `Yes`

Header:
```http
Authorization: Bearer <clerk_token>
```

Contoh Response:
```json
{
  "success": true,
  "message": "Dashboard data fetched successfully",
  "data": {
    "totalPoints": 120,
    "totalModules": 8,
    "recentModules": [
      {
        "id": "uuid",
        "judul_modul": "Modul Matematika SD",
        "jenjang": "sd",
        "fase_kelas": "A",
        "mapel": "Matematika",
        "materi": "Bilangan",
        "kategori_wilayah": "Pesisir",
        "status": "DRAFT",
        "upvote_count": 0,
        "createdAt": "2026-05-16T10:00:00.000Z",
        "updatedAt": "2026-05-16T10:00:00.000Z"
      }
    ]
  }
}
```

## Contoh Urutan Pemakaian Frontend

### 1. Ambil jenjang

```http
GET /v1/curriculum/jenjang
```

### 2. User pilih `sd`, lalu ambil fase

```http
GET /v1/curriculum/jenjang/sd/fase
```

### 3. User pilih `B`, lalu ambil mata pelajaran

```http
GET /v1/curriculum/fase/B/subjects
```

### 4. User pilih `Matematika`, lalu ambil capaian

```http
GET /v1/curriculum/fase/B/subjects/Matematika/capaian
```

## Daftar Endpoint Singkat

- `GET /`
- `GET /v1/health`
- `GET /v1/auth/config`
- `GET /v1/auth/me`
- `GET /v1/dashboard`
- `GET /v1/leaderboard`
- `GET /v1/leaderboard/me`
- `GET /v1/curriculum/jenjang`
- `GET /v1/curriculum/fase`
- `GET /v1/curriculum/jenjang/:jenjangKey/fase`
- `GET /v1/curriculum/fase/:faseCode/subjects`
- `GET /v1/curriculum/fase/:faseCode/subjects/:subjectName/capaian`
- `GET /v1/modules`
- `GET /v1/modules/:id`
- `POST /v1/modules`
- `POST /v1/modules/:id/publish`
- `PATCH /v1/modules/:id`
- `POST /v1/modules/generate/tp`
- `POST /v1/modules/generate/atp`
- `POST /v1/modules/generate/modul`
- `GET /v1/community`
- `POST /v1/community/:id/upvote`

## Catatan Penting

- Pastikan server membaca `API_PREFIX` yang aktif. Saat ini dokumentasi ini memakai `/v1`.
- Jika kamu menjalankan `npm start`, lakukan `npm run build` dulu setelah ada perubahan route.
- Jika route baru tidak terbaca, biasanya server masih memakai build lama di folder `dist`.
