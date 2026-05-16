# Auth Flow Documentation

Dokumentasi ini menjelaskan alur login untuk setup `Google OAuth + Clerk + Backend Express` pada project backend Potensia.

## Tujuan

- Frontend menangani login Google lewat Clerk.
- Backend tidak menangani login Google langsung.
- Backend memverifikasi token Clerk, mengambil identitas user, sinkron ke database, lalu melayani API aplikasi.

## Komponen

- Google: provider OAuth.
- Clerk: auth provider dan session manager.
- Frontend Next.js: memulai login dan mengirim token ke backend.
- Backend Express: verifikasi token dan proses data user.

## Konfigurasi Yang Harus Ada

### Frontend

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

### Backend

- `CLERK_SECRET_KEY`
- `CLERK_JWT_KEY` opsional
- `DATABASE_URL`
- `FRONTEND_URL`
- `CLIENT_ORIGIN`

### Clerk Dashboard

- Google `Client ID`
- Google `Client Secret`

### Google Cloud Console

- OAuth Client
- Authorized Redirect URI dari Clerk

## Flow Lengkap

1. User membuka frontend.
2. User klik tombol `Login with Google`.
3. Frontend memanggil Clerk login flow.
4. Clerk redirect user ke Google.
5. User login di Google.
6. Google redirect balik ke Clerk.
7. Clerk membuat session user.
8. Frontend mendeteksi user sudah login.
9. Frontend mengambil token Clerk.
10. Frontend mengirim request ke backend dengan bearer token.
11. Backend memverifikasi token.
12. Backend mengambil `clerkUserId`.
13. Backend mengambil profil user dari Clerk Backend API.
14. Backend melakukan `upsert` user ke database lokal.
15. Backend mengembalikan response user ke frontend.

## Tugas Frontend

Frontend harus:

- menampilkan tombol login Google
- memanggil Clerk sign-in
- mengambil token session Clerk
- mengirim token ke backend pada request yang butuh auth

Contoh pengambilan token:

```ts
const token = await session?.getToken();
```

Contoh header yang dikirim frontend:

```http
Authorization: Bearer <CLERK_SESSION_TOKEN>
```

## Yang Harus Dikirim Frontend Ke Backend

Untuk endpoint auth/protected:

- Header `Authorization: Bearer <token>`

Contoh:

```http
GET /v1/auth/me
Authorization: Bearer eyJ...
```

## Tugas Backend

Backend harus:

- membaca header `Authorization`
- ekstrak bearer token
- verifikasi token dengan Clerk
- ambil `clerkUserId` dari payload
- ambil profil user dari Clerk
- sinkron user ke database
- balas data user

## Cara Backend Memvalidasi Token

Backend memakai `verifyToken()` dari `@clerk/backend` dan `CLERK_SECRET_KEY`.

Contoh konsep:

```ts
const payload = await verifyToken(token, {
  secretKey: env.CLERK_SECRET_KEY,
});
```

Jika valid:

- `payload.sub` = `clerkUserId`
- `payload.sid` = `sessionId`

## Endpoint Backend Yang Dipakai

### `GET /v1/auth/config`

- tanpa token
- untuk cek konfigurasi auth

### `GET /v1/auth/me`

- wajib bearer token
- verifikasi token
- sync user ke DB
- balas data user

## Contoh Response `/auth/me`

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
      "id": "local-db-id",
      "clerkId": "user_xxx",
      "name": "John Doe",
      "email": "john@gmail.com",
      "imageUrl": "https://...",
      "points": 0,
      "createdAt": "2026-05-16T00:00:00.000Z"
    },
    "clerkProfile": {
      "clerkId": "user_xxx",
      "email": "john@gmail.com",
      "name": "John Doe",
      "imageUrl": "https://..."
    }
  },
  "meta": {
    "requestId": "uuid",
    "timestamp": "2026-05-16T00:00:00.000Z",
    "path": "/v1/auth/me",
    "method": "GET"
  }
}
```

## User Baru Saat Login Pertama

Saat login pertama:

- frontend berhasil login lewat Google + Clerk
- frontend memanggil `/v1/auth/me`
- backend memanggil `syncAuthenticatedUser()`
- jika `clerk_id` belum ada di DB, backend membuat user baru

Jadi user lokal biasanya tercipta saat request pertama ke backend setelah login berhasil.

## Apa Yang Tidak Dilakukan Backend

Backend ini tidak:

- memanggil Google login page
- menerima callback OAuth Google
- menyimpan Google Client ID di database
- membuat token auth sendiri untuk login Google

## Ringkasan Pengiriman Data

### Frontend ke Backend

- `Authorization: Bearer <Clerk session token>`

### Backend ke Clerk

- verifikasi token
- ambil user profile

### Backend ke Frontend

- status login user
- data user lokal
- data profile Clerk
- `meta`

## Checklist Implementasi Frontend

- pasang `ClerkProvider`
- tombol login Google
- ambil token `session.getToken()`
- kirim token ke backend
- simpan state user dari response `/auth/me`

## Checklist Implementasi Backend

- `CLERK_SECRET_KEY` valid
- middleware auth aktif
- endpoint `/auth/me` aktif
- tabel `User` punya kolom `clerk_id`
