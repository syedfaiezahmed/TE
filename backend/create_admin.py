from sqlmodel import Session, select
from database import engine, create_db_and_tables
from models import AdminUser
from auth import get_password_hash
import sys

def create_admin(email, password):
    with Session(engine) as session:
        # Check if user already exists
        statement = select(AdminUser).where(AdminUser.email == email)
        existing_user = session.exec(statement).first()
        
        if existing_user:
            print(f"User {email} already exists.")
            return

        hashed_password = get_password_hash(password)
        admin_user = AdminUser(email=email, password_hash=hashed_password)
        
        session.add(admin_user)
        session.commit()
        session.refresh(admin_user)
        
        print(f"Successfully created admin user: {email}")

if __name__ == "__main__":
    # Ensure tables exist
    create_db_and_tables()
    
    print("Create Admin User")
    print("-----------------")
    
    if len(sys.argv) == 3:
        email = sys.argv[1]
        password = sys.argv[2]
    else:
        email = input("Enter email: ")
        password = input("Enter password: ")
    
    if not email or not password:
        print("Email and password are required.")
    else:
        create_admin(email, password)
