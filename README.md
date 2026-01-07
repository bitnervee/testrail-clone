# TestRail Clone

A comprehensive Test Management Tool clone built with a modern technology stack. This project mimics core functionalities of TestRail, allowing users to manage test cases, runs, and results efficiently.

## 🚀 Tech Stack

### Frontend
- **Framework**: React.js (Vite)
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS / CSS Modules
- **State Management**: React Hooks

### Backend
- **Framework**: Spring Boot 3
- **Language**: Java 17
- **Database**: H2 In-Memory Database (Development)
- **Build Tool**: Maven

## 🛠️ Prerequisites

Ensure you have the following installed:
- **Java JDK 17** or higher
- **Node.js** (v18+ recommended)
- **Maven** (optional, wrapper/homebrew supported)
- **Git**

## 🏁 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/bitnervee/testrail-clone.git
cd testrail-clone
```

### 2. Start the Backend
The backend runs on port `8080`.
```bash
cd backend
mvn spring-boot:run
```
*Access the H2 Console at `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:testdb`)*

### 3. Start the Frontend
The frontend runs on port `5173` (or `5175` if 5173 is busy).
```bash
cd frontend
npm install
npm run dev
```

## 📂 Project Structure

```
testrail-clone/
├── backend/            # Spring Boot Application
│   ├── src/
│   └── pom.xml
├── frontend/           # React Vite Application
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## 🤝 Contribution
Feel free to fork the repository and submit pull requests.

## 📄 License
MIT License
