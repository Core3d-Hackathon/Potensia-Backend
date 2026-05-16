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
- `POST /v1/auth/logout`

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
      "Backend accepts the Clerk bearer token after Google sign-in succeeds."
    ],
    "endpoints": {
      "me": "/api/v1/auth/me",
      "logout": "/api/v1/auth/logout"
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

#### `POST /v1/auth/logout`

Logout sesi Clerk aktif.

Auth required: `Yes`

Header:

```http
Authorization: Bearer <clerk_token>
```

Body:

```json
{
  "sessionId": "sess_xxx"
}
```

Catatan:

- Jika `sessionId` tidak dikirim di body, backend akan mencoba memakai `sessionId` dari auth context.

Contoh response:

```json
{
  "success": true,
  "message": "Logout successful",
  "data": {
    "session": {
      "id": "sess_xxx",
      "userId": "user_xxx",
      "status": "revoked"
    }
  }
}
```

### 4. Curriculum

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
        "grades": ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"]
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
      "grades": ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"]
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
      "grades": ["Kelas 1", "Kelas 2", "Kelas 3", "Kelas 4", "Kelas 5", "Kelas 6"]
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
- `POST /v1/auth/logout`
- `GET /v1/curriculum/jenjang`
- `GET /v1/curriculum/fase`
- `GET /v1/curriculum/jenjang/:jenjangKey/fase`
- `GET /v1/curriculum/fase/:faseCode/subjects`
- `GET /v1/curriculum/fase/:faseCode/subjects/:subjectName/capaian`

## Catatan Penting

- Pastikan server membaca `API_PREFIX` yang aktif. Saat ini dokumentasi ini memakai `/v1`.
- Jika kamu menjalankan `npm start`, lakukan `npm run build` dulu setelah ada perubahan route.
- Jika route baru tidak terbaca, biasanya server masih memakai build lama di folder `dist`.
