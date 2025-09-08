
# Recipe App – Full-Stack CRUD Application  

A minimal recipe management application built with **Node.js**, **Express**, **PostgreSQL**, **EJS**, and **Bootstrap**.  
This project demonstrates a full-stack **CRUD (Create, Read, Update, Delete)** workflow with image uploads.  

---

## Features
- **Create** – Add new recipes with name, category, intro, ingredients, comments, and an optional image.  
- **Read** – View all recipes in a responsive Bootstrap-powered interface.  
- **Update** – Edit existing recipes.  
- **Delete** – Remove recipes from the database.  
- **Image Upload** – Upload images for recipes (stored locally).  
- **Responsive Design** – Built with **Bootstrap** for a clean, mobile-friendly UI.  

---

## Tech Stack
- **Backend:** Node.js, Express  
- **Database:** PostgreSQL  
- **Frontend:** EJS, Bootstrap, HTML, CSS, JavaScript, jQuery  
- **Other:** Multer for image upload  

---
## Getting Started with Github

### 1. Clone the repository
```bash
git clone https://github.com/emregokyar/recipe-app.git
cd recipe-app
````

### 2. Install dependencies

```bash
npm install
```

### 3. Setup PostgreSQL database

1. Use `sql-scripts/setup.sql` to initialize tables and seed data.
2. Update your `.env` file with your DB credentials.

### 4. Run the app

```bash
node app.js
```

Then open http://localhost:3000 in your browser.

---

## Runnig with Docker

### 1. Prepare the environment
Make sure you have Docker and Docker Compose installed. Update your .env file with the required values.

### 2. Start containers
```bash
docker-compose up --build   
````
### 3. Access the services

- App: http://localhost:3000
- PostgreSQL: localhost:5432
---

## Media


https://github.com/user-attachments/assets/ec932708-0661-4b5d-b983-0f601e972180





