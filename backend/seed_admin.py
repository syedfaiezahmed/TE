from sqlmodel import Session, select
from database import engine, create_db_and_tables
from models import AdminUser
from auth import get_password_hash

def seed_admin():
    create_db_and_tables()
    with Session(engine) as session:
        statement = select(AdminUser).where(AdminUser.email == "admin@example.com")
        admin = session.exec(statement).first()
        
        if not admin:
            print("Creating admin user...")
            hashed_password = get_password_hash("admin123")
            admin = AdminUser(email="admin@example.com", password_hash=hashed_password)
            session.add(admin)
            session.commit()
            print("Admin user created successfully.")
            print("Email: admin@example.com")
            print("Password: admin123")
        else:
            print("Admin user already exists.")
            print("Email: admin@example.com")
            # We don't print the password here as we can't retrieve it, but we know it should be admin123 if we set it.
            # If user forgot, we can update it.
            
            # Update password just in case
            print("Resetting password to 'admin123'...")
            admin.password_hash = get_password_hash("admin123")
            session.add(admin)
            session.commit()
            print("Password reset to 'admin123'.")

if __name__ == "__main__":
    seed_admin()
