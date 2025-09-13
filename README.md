# KhaiKhai - Your Meal Planner

<p align="center">
  <img src="docs/diet.png" alt="Website Logo" width="150" height="150"/>
  <br><br>
  <strong>A Hybrid Platform for mobile app and website to guide your food plan whole month :)</strong>
</p>


## 🥗 About The Project

**KhaiKhai** is a smart meal planning platform designed to help students and busy individuals manage their daily food choices effectively.
Our goal is to make eating both affordable and healthy, while also considering canteen availability, personal budget, and even weather conditions.


## ✨ What We Do

**📅 Daily Meal Planning:** Get a personalized plan for breakfast, lunch, snacks, and dinner.

**💰 Budget-Friendly Choices:** Input your monthly pocket money, and KhaiKhai ensures you never overspend.

**🍴 Canteen Integration:** See real menus from nearby canteens and get suggestions on where to eat.

**🌦️ Weather-Aware Recommendations:** Whether it’s a sunny or rainy day, KhaiKhai suggests meals that fit the weather.

**🥦 Health Focused:** Balanced diet suggestions to keep you energized throughout the day.


## 🚀 Why KhaiKhai?

Managing food expenses and making healthy choices can be difficult for students and young professionals. KhaiKhai bridges the gap between budget constraints and nutritional needs, providing a hybrid solution accessible from both Flutter mobile apps and React web apps, powered by a robust FastAPI backend and MongoDB database.


## 🌟 Features

**🍽️ Smart Meal Planning:** Generates a 30-day meal plan including breakfast, lunch, snacks, and dinner. Balances nutrition and budget to ensure affordable healthy meals.

**💰 Budget Management:**
Enter your monthly pocket money. Automatically suggests meals that fit within your budget. Tracks spending to avoid overshooting your balance.

**🍴 Canteen Integration:** Connects with campus canteens and shows real-time menus. 
Suggests meals from available items with nutritional details. Tracks canteen orders and earnings.

**🌦️ Weather-Aware Recommendations:**
Adjusts food suggestions based on daily weather (e.g., light meals on hot days, warm soups on rainy days).

**👤 User & Student Profiles:**
Manage accounts with role-based access (student, admin, canteen owner). Students can view personalized meal plans and history. Owners can manage menus, update availability, and track earnings.

**📊 Orders & Complaints System:** Students can place orders directly from the app. Integrated complaint box to report issues and track resolutions.

**🔒 Secure & Scalable:** User authentication with secure password storage. Built using FastAPI backend, MongoDB database, and accessible via Flutter app and React website.


## 🛠️ Tech Stack

| Layer               | Technology                          |
|--------------------|------------------------------------|
| Backend             | FastAPI                             |
| Frontend (Web)      | React.js                            |
| Frontend (Mobile)   | Flutter                             |
| Database            | MongoDB                             |
| Deployment          | Vercel (frontend), Render (backend)|


## 📡 API Endpoints

You can test these endpoints via Postman or a browser.

| Method | Endpoint           | Description                     |
|--------|------------------|---------------------------------|
| GET    | /users/           | Retrieve all users              |
| GET    | /students/        | Retrieve all students           |
| GET    | /canteens/        | Retrieve all canteens           |
| GET    | /mealplans/       | Retrieve a student's meal plan  |
| GET    | /weather/         | Get current weather info        |
| POST   | /orders/          | Place a new order               |
| POST   | /complaints/      | Submit a complaint              |



