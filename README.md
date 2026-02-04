# KhaiKhai - Your Meal Planner

<p align="center">
  <img src="docs/diet.png" alt="Website Logo" width="150" height="150"/>
  <br><br>
  <strong>A Hybrid Platform in mobile app and website to guide your food plan whole month :)</strong>
</p>

<p align="center">
  <img src="docs/KhaiKhai.png"/>
  <br>
</p>

## 🥗 About The Project

**KhaiKhai** is a smart meal planning platform designed for students and busy individuals to manage their daily food choices effectively.

Our goal is to make eating **affordable**, **healthy**, and **convenient**, while considering:

- Personal budget  
- Canteen menu & availability  
- Weather conditions  
- User preferences  

There are mainly **two types of users**:

- 🎓 **Students** – Use the mobile app to set their budget, view the best deal for each day, and get personalized food recommendations.  
- 🍽️ **Canteen Owners** – Use the web dashboard to upload daily menus, set prices, and manage orders.  

There is also an **Admin panel** (assumed as University Authority) to monitor the system, handle complaints, and manage both students and canteen owners.

---

## ✨ What KhaiKhai Offers

- 📅 **Daily meal planning** (breakfast, lunch, snacks, dinner)  
- 💰 **Budget-aware recommendations**  
- 🍴 **Canteen-integrated menus & ordering**  
- 🌦️ **Weather-aware suggestions**  
- 🥦 **Balanced and health-focused meals**  
- 🧾 **Order & complaint management**  

---

## Website
| Page | Screenshot |
|---|---|
| Welcome Page | ![Welcome](docs/home.png) |
| Menu Upload Page | ![meal](docs/mealupload.png) |
| Profile Page | ![profile](docs/profile.png) |
| Student Page | ![dashboard](docs/student.png) |
| Complaint Page | ![complaint](docs/complain.png) |
## Mobile App
![Home Page](docs/appdemo.jpg)


## 🚀 Why KhaiKhai?

Managing food expenses and maintaining a healthy diet is hard for students and young professionals.

**KhaiKhai** bridges this gap by:

- Combining **budget planning** and **meal planning**  
- Offering a **hybrid solution** – Flutter mobile app + React web app  
- Backed by a **FastAPI** backend and **database** for persistent storage  
- Designed with **role-based access** for students, canteen owners, and admins  

---

## 🌟 Core Features

### 🍽️ Smart 30-Day Meal Planning
- Generates a **30-day meal plan** for:
  - Breakfast
  - Lunch
  - Snacks
  - Dinner
- Balances **nutrition** and **budget**.
- Tailored specifically for **students** and **campus environments**.

---

### 💰 Budget Management
- Students input their **monthly pocket money**.
- KhaiKhai:
  - Suggests meals that stay within the budget.
  - Tracks daily & monthly spending.
  - Prevents overshooting the remaining balance.

---

### 🍴 Canteen Integration
- Canteen owners:
  - Upload **daily menus** with prices.
  - Update item **availability**.
  - Track **orders** and **earnings**.
- Students:
  - See **real-time canteen menus**.
  - Get **meal suggestions** directly from available items.
  - View **nutrition details** (where available).

---

### 👤 User Roles & Profiles

- **Student**
  - Personalized dashboard  
  - View 30-day meal plan  
  - Track orders and spending  
  - Submit complaints  

- **Canteen Owner**
  - Manage menu items (add/update/delete)  
  - Track daily orders  
  - View earnings and popularity of items  

- **Admin / University Authority**
  - Manage users (students & canteen owners)  
  - Approve/monitor canteens  
  - View and resolve complaints  

---

### 📊 Orders & Complaints System

- Students can:
  - Place orders directly from the app  
  - Track order status  
  - Submit complaints (food quality, delay, behavior, etc.)

- Admins can:
  - View all complaints  
  - Change complaint status (open / in-progress / resolved)  
  - Maintain transparency between students and canteen owners  

---

### 🔒 Secure & Scalable

- **User authentication** with secure credential handling  
- Built using:
  - ⚙️ **FastAPI** backend  
  - 🗃️ **Database** (e.g., MongoDB / SQL via ORM)  
  - 🌐 **React** web frontend  
  - 📱 **Flutter** mobile app  
- Designed for:
  - Modular growth  
  - Easy deployment  
  - Clean, user-friendly UI  

---

## 🚀 Getting Started

### ✅ Prerequisites

Before running the project, make sure you have:

- **Python 3.8+**
- **pip** (Python package installer)

> Optional but recommended: a **virtual environment** (venv) to keep dependencies isolated.

---

### 🔧 Installation & Backend Setup

Follow these steps to set up and run the **FastAPI backend**:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/hasanmehediii/CSE-3112-Project.git

# 2️⃣ Go to the backend folder
cd server

# 3️⃣ (Optional) Create a virtual environment
python -m venv venv

# 4️⃣ Activate the virtual environment
# On Linux / macOS:
source venv/bin/activate

# On Windows (PowerShell):
# .\venv\Scripts\Activate.ps1

# On Windows (CMD):
# venv\Scripts\activate

# 5️⃣ Install required dependencies
pip install -r requirements.txt

# 6️⃣ Run the FastAPI development server
uvicorn app.main:app --reload
```

### Setup .env in server (Schema are in ```database.psql```):
```bash
DATABASE_URL="postgresql://<db_user>:<db_password>@<host>/<db_name>?sslmode=require"
JWT_SECRET="<your_super_secret_jwt_key_here>"
PORT=8000

FRONTEND_URL="http://localhost:5173"
SERVER_URL="http://localhost:8000"
```

### Frontend Setup
Follow these steps to set up and run the **React frontend**:

```bash
# 1️⃣ Go to the frontend folder
cd client
# 2️⃣ Install required dependencies
npm install
# 3️⃣ Run the React development server
npm run dev
```

## 🛠️ Tech Stack

| Layer               | Technology                          |
|--------------------|------------------------------------|
| Backend             | FastAPI                             |
| Frontend (Web)      | React.js                            |
| Frontend (Mobile)   | Flutter                             |
| Database            | MongoDB, PostgreSQL                           |
| Deployment          | Vercel (frontend + backend) |


---

## ❤️ Acknowledgements

- Department of Computer Science & Engineering, University of Dhaka
- All teachers and friends who inspired this project

## 📌 Future Enhancements (Ideas)

- Detailed nutrition breakdown for each meal
- AI-based meal recommendation using past choices
- Push notifications for meal reminders & low-balance alerts
- Analytics dashboard for admin & canteen owners


## 👨‍💻 Developers

- ### Mehedi Hasan
- GitHub: https://github.com/hasanmehediii
- Email: mehedi200105075@gmail.com
