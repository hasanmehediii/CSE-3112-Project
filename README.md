# KhaiKhai

KhaiKhai is a campus meal-ordering platform for the University of Dhaka pilot. Students use the web or Android app, canteen teams manage menus and orders on the web, and university administrators control accounts and complaints.

The production web client is available at [khaikhai.vercel.app](https://khaikhai.vercel.app).

## Repository

```text
client/  React 19 + TypeScript website for students, canteens, and admins
server/  FastAPI + SQLAlchemy API shared by web and Android
app/     Android-first Flutter student app
docs/    Product screenshots and project documentation
```

The retired `frontend`, `backend`, and `khaikhai` implementations were removed. The recovery point before consolidation is Git tag `recovery/pre-consolidation-20260815`.

## Local setup

Copy `.env.example` to `.env` and provide a PostgreSQL connection, a random JWT secret of at least 32 characters, and the allowed frontend origins. Never commit `.env`.

### API

```powershell
cd server
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements-dev.txt
alembic upgrade head
uvicorn app.main:app --reload
```

For a database that already contains the original KhaiKhai tables, inspect the schema and establish the migration baseline once with `alembic stamp 0001` instead of recreating the tables.

Create the first administrator from the server directory:

```powershell
python -m app.bootstrap_admin --name "University Admin" --email admin@example.com
```

Students can self-register. Canteen accounts can only be provisioned by an authenticated administrator through `POST /admin/users`.

### Website

```powershell
cd client
npm ci
npm run dev
```

Set `VITE_BACKEND_URL` in `client/.env.local` when the API does not run at `http://127.0.0.1:8000`.

### Android app

```powershell
cd app
flutter pub get
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:8000
```

Use `10.0.2.2` for the Android emulator and the computer's LAN address for a physical development device. Production builds should use the deployed HTTPS API:

```powershell
flutter build apk --release --dart-define=API_BASE_URL=https://khaikhaiserver.vercel.app
```

## API and deployment

- Run `alembic upgrade head` as a deployment/release step before starting a new API version.
- Configure `ENVIRONMENT=production`, `DATABASE_URL`, `JWT_SECRET`, `FRONTEND_URLS`, and optionally `ACCESS_TOKEN_EXPIRE_SECONDS` in the backend environment.
- Configure `VITE_BACKEND_URL` in the Vercel client project.
- Use `/health` for process checks and `/ready` for database readiness checks.
- The API reports `X-Request-ID` and `X-Response-Time-Ms` headers for diagnostics.
- Rotate any database or JWT credentials that were ever stored in the formerly tracked root `.env`; removing a file does not remove it from Git history.

The React client remains on Vercel. Backend hosting stays unchanged for this hardening release while cold-start and database latency are measured.

## Quality checks

```powershell
# API
cd server
pytest -q

# Website
cd client
npm run lint
npm run build

# Android app
cd app
flutter analyze
flutter test
flutter build apk --debug --dart-define=API_BASE_URL=http://10.0.2.2:8000
```

## Product boundaries

- This release is a single-campus pilot, not a multi-tenant billing product.
- The Android app accepts student accounts only.
- Students may also use the website.
- Budget planning, expense reports, and legacy recommendation features are intentionally out of scope. “Low-cost meals” simply sorts currently available meals by price.
