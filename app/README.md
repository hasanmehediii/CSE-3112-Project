# KhaiKhai Student for Android

The Flutter client is intentionally student-only and uses the same FastAPI server as the React website. It supports student registration/login, live meals, pickup orders, order tracking, complaints, and profile management.

## Run

```powershell
flutter pub get
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:8000
```

Tokens are stored with Android secure storage. The app rejects expired tokens and any token whose role is not `student`.

Only Android is maintained in this repository. Other Flutter targets can be regenerated later with `flutter create . --platforms=ios` or the appropriate platform list.
