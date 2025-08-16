# Role-Based Task Management API (Backend Only)🚀

A **backend-only RESTful API** for managing tasks with role-based access control.  
Built with **Node.js** and **Supabase (PostgreSQL)**, this project allows **Users, Managers, and Admins** to register, authenticate, and manage tasks according to their roles.  

## ✨ Features

- 🔑 **User Authentication**: Secure registration and login using Supabase Auth + JWT tokens  
- 📝 **Task Management**: Users can create, update, and view only their own tasks  
- 📋 **Manager Operations**: Managers can assign tasks to users and monitor progress  
- 🛠️ **Admin Control**: Admins can manage all users and tasks system-wide  
- 📮 **RESTful API**: All endpoints tested with Postman for reliability  

## 🛠️ Tech Stack

- **Node.js** – JavaScript runtime  
- **Express** – Web framework for Node.js  
- **Supabase** – Authentication + PostgreSQL database  
- **PostgreSQL** – Relational database  
- **JWT** – JSON Web Tokens for authentication  
- **Postman** – API testing  

## 🗄️ Database Schema

### profiles
- `id` (UUID, primary key)  
- `user_id` (UUID, foreign key referencing users.id)  
- `name` (Text, user’s full name)  
- `role` (Enum: user, manager, admin)  
- `created_at` (Timestamp)  

### tasks
- `id` (UUID, primary key)  
- `title` (Text, task title)  
- `description` (Text, task description)  
- `assigned_to` (UUID, user_id of assigned user)  
- `created_by` (UUID, user_id of creator)  
- `status` (Enum: pending, in_progress, completed)  
- `due_date` (Date/Timestamp)  
- `created_at` (Timestamp)  

## ⚙️ Setup and Installation

1. Clone the repository  
   ```bash
   git clone https://github.com/your-username/role-based-task-api.git
   cd role-based-task-api
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Configure Supabase  
   - Create a Supabase project  
   - Enable **Email/Password Authentication** under Auth settings  
   - Create `profiles` and `tasks` tables using the schema above  
   - Copy your project URL and API keys  

4. Create a `.env` file in the root folder  
   ```env
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-public-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

5. Run the server  
   ```bash
   npm run dev
   ```  
   API will be available at 👉 `http://localhost:3000`

## 🔐 Role-Based Access Control

- **User** 👤  
  - Can view, create, update, and delete **only their own** tasks  
  - Cannot access or modify other users’ data  

- **Manager** 🧑‍💼  
  - Inherits all **User** permissions  
  - Can assign tasks to users and track their progress  

- **Admin** 👑  
  - Full system access  
  - Can manage **all users, roles, and tasks**  

## 📡 API Endpoints

- **Authentication**  
  - `POST /api/auth/register` → Register a new user (name, email, password, role)  
  - `POST /api/auth/login` → Login and receive JWT  

- **Users (Admin only)**  
  - `GET /api/users` → List all users  
  - `GET /api/users/:id` → Get a specific user profile  
  - `PUT /api/users/:id` → Update user profile or role  
  - `DELETE /api/users/:id` → Delete a user  

- **Tasks**  
  - `GET /api/tasks` → Fetch tasks (role-based visibility)  
  - `GET /api/tasks/:id` → Fetch a task by ID  
  - `POST /api/tasks` → Create a new task  
  - `PUT /api/tasks/:id` → Update a task  
  - `DELETE /api/tasks/:id` → Delete a task  

📌 A Postman collection is included in this project for easy testing.  

## 🌐 Future Frontend Integration

To integrate with a frontend in the future, **any client-side application** (web app, mobile app, or even another backend service) can communicate with this backend REST API by making HTTP requests to its exposed endpoints.  

Here’s how integration typically works:  

1. **HTTP Requests** 📬  
   - The frontend sends standard HTTP requests (GET, POST, PUT, DELETE) to backend endpoints.  
   - Example:  
     - `GET /tasks` → retrieve a list of tasks  
     - `POST /tasks` → create a new task  

2. **JSON Data Exchange** 🔄  
   - The frontend sends JSON in the request body (e.g., creating/updating tasks).  
   - The backend responds with JSON containing data or status.  

3. **API Endpoints** 🔗  
   - The frontend developer must know available endpoints and request/response formats.  
   - The provided `postman_collection.json` documents all endpoints for quick reference.  

4. **Authentication** 🔑  
   - The frontend sends login credentials to `/api/auth/login`.  
   - Backend returns a JWT token.  
   - All subsequent requests include the JWT in the `Authorization` header.  

5. **Client-Side Technologies** 🖥️📱  
   - Web Apps: React, Angular, Vue.js, or plain JavaScript (`fetch` / `axios`)  
   - Mobile Apps: Swift/Kotlin for iOS/Android, React Native, or Flutter  

✅ **In summary:** The frontend acts as the user interface (input + display), while this backend handles business logic, data storage, and security. Both communicate through **HTTP + JSON** for a clean separation of concerns.  

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs for fixes, improvements, or new features.  

## 👨‍💻 Author

**NARENDRANATH JUTHUGA**  
