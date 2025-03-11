📚 Library Management System
This is a Full Stack Library Management System built using:

Frontend: React.js + Tailwind CSS
Backend: Spring Boot + Spring Data JPA
Database: MySQL
The application is designed to manage books, categories, and users, all operating on a single port without any authentication for simplicity.

✅ Features
1. Books Management
Add, Update, and Delete Books.
View Book Details.
Search and Filter Books.
2. Category Management
Add, Update, and Delete Categories.
View All Categories.
Filter Books by Category.
3. Single Port Deployment
The React.js (Frontend) and Spring Boot (Backend) run on the same port using Spring Boot's embedded Tomcat server.
No need to run them separately.
4. Responsive UI
Built with React.js and Tailwind CSS for a clean and modern user interface.
Simple and easy-to-navigate layout.
🛠 Technologies Used
Frontend: React.js, Tailwind CSS
Backend: Spring Boot, Spring Data JPA (Java Persistence API)
Database: MySQL
API Testing: Postman
Version Control: GitHub

📂 Project Structure
The project contains two main directories:

Frontend: Located in the frontend/ folder. This contains the React.js application.
Backend: Located in the src/main/java/com/library/ folder. This contains the Spring Boot application.
Here’s the folder structure:
library.management.system/
│
├── frontend/    <-- React.js Code
│
├── src/main/java/com/library/  <-- Spring Boot Backend Code
│
├── target/    <-- Compiled JAR Files
│
├── pom.xml    <-- Maven Configuration
│
└── README.md  <-- Project Documentation

🚀 How to Run the Project
✅ Step 1: Clone the Repository
git clone https://github.com/Vijaychand-03/LibraryManagementSystem.git
cd LibraryManagementSystem

✅ Step 2: Run Backend (Spring Boot)
Open the project in IntelliJ or any IDE.
Navigate to:
src/main/java/com/library/LibraryManagementSystemApplication.java
Run the Application.

✅ Step 3: Run Frontend (React.js)
Navigate to the frontend/ folder:
cd frontend
npm install
npm start

✅ Step 4: Access the Application
Open your browser and go to:
http://localhost:8080
Since the project is running on a single port, the React app and Spring Boot API are merged using Spring Boot's embedded Tomcat server.

📜 Notes
This project is built purely for learning purposes to demonstrate a full-stack application.
No authentication or user roles have been implemented.
The primary goal is to showcase the integration of React.js, Spring Boot, and MySQL on a single port.
📥 Contributing
If you would like to contribute or suggest improvements, feel free to fork the repository and submit a pull request.

📧 Contact
Developed by: Vijay Chand Gone
Email: vijaychandgone@gmail.com

