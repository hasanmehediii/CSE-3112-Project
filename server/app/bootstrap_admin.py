"""Create the first administrator without exposing public admin registration.

Usage:
    python -m app.bootstrap_admin --name "Admin" --email admin@example.com
The password is requested without echoing it.
"""

import argparse
import getpass

from passlib.hash import pbkdf2_sha256

from .database import SessionLocal
from .models.user import User


def main() -> None:
    parser = argparse.ArgumentParser(description="Create a KhaiKhai administrator")
    parser.add_argument("--name", required=True)
    parser.add_argument("--email", required=True)
    args = parser.parse_args()
    password = getpass.getpass("Admin password: ")
    if len(password) < 8 or not any(c.isalpha() for c in password) or not any(c.isdigit() for c in password):
        raise SystemExit("Password must be 8+ characters and contain a letter and number")

    with SessionLocal() as db:
        email = args.email.strip().lower()
        if db.query(User).filter(User.email == email).first():
            raise SystemExit("An account with that email already exists")
        db.add(
            User(
                role="admin",
                name=args.name.strip(),
                email=email,
                password_hash=pbkdf2_sha256.hash(password),
            )
        )
        db.commit()
    print("Administrator created")


if __name__ == "__main__":
    main()

