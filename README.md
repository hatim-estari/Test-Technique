# Project-Task-Management
# Project & Task Manager

**full-stack application** built with **Spring Boot** (Backend) and **Angular** (Frontend) to manage projects and their tasks efficiently.  

---

## Features  

**Projects CRUD** – Create, Read, Update, and Delete projects.  
**Tasks Management** – Assign tasks to projects with status tracking.  
**Smart Filtering** – Search tasks by title or filter by status (`pending`, `in_progress`, `completed`).  
**Clean UI** – Built with **Angular Material** for a smooth user experience.  
**Bonus**: Pagination support for large task lists!  

---

##  Setup & Installation  

### Prerequisites  

- **Backend**: Java 11+, Maven, H2/MySQL  
- **Frontend**: Node.js, Angular CLI  

### Steps  

1. **Clone the repo**  
   ```bash
   git clone https://github.com/your-username/project-task-manager.git
   cd project-task-manager
   ```

2. **Run the Backend (Spring Boot)**  
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   The API will start at `http://localhost:8080`.  

3. **Run the Frontend (Angular)**  
   ```bash
   cd frontend
   npm install
   ng serve
   ```
   Open `http://localhost:4200` in your browser.  

---

## 🎥 Demo  

Check out this quick demo to see the app in action:  
[**Video **](

---

## 📂 Project Structure  

```
project-task-manager/  
├── backend/         # Spring Boot (REST API, JPA, H2)  
├── frontend/        # Angular (Components, Services, Material UI)  
└── README.md        # You're here!  
```
## Need Help?  

If you run into issues:  
- Check the console logs for errors.  
- Ensure both backend and frontend are running.  
---

## License  

MIT © EL-mestari Hatim  

