📌 Features

Create, Read, Update, and Delete (CRUD) user records

Client-side and server-side validation

RESTful API with standard HTTP methods & status codes

Layered architecture (UI, API, Domain, Repository, Database)

Secure input handling (SQL Injection & XSS prevention)

Error handling with meaningful messages

Responsive UI with Angular Material

Bonus Features (Optional):

Pagination, search, filtering, and sorting

Authentication & Authorization

CI/CD with GitHub Actions

Deployment to Azure (App Service + SQL + Blob Storage)

🏗️ Architecture
Frontend (Angular) -> REST API (ASP.NET Core Web API) -> 
Domain Layer (Business Logic) -> Repository (EF Core) -> SQL Server


Frontend (Angular): UI, services, and form validations

API (Controllers): Handle HTTP requests and responses

Domain Layer: Business logic and entities

Repository Layer: Data access using EF Core (Code First)

Database: SQL Server with EF Core migrations

📂 Project Structure
/UserManagementApp
 ├── /frontend          # Angular application
 ├── /backend           # ASP.NET Core Web API
 │    ├── Controllers
 │    ├── Domain
 │    ├── Repositories
 │    ├── Models
 │    └── Migrations
 └── README.md

📋 Requirements

Node.js (v20+) & Angular CLI (latest)

.NET 8 SDK

SQL Server (latest stable)

Git

Optional:

Azure CLI (if deploying)

Docker (if containerizing)

⚙️ Setup Instructions
1. Clone Repository
git clone https://github.com/<your-username>/user-management-crud.git
cd user-management-crud

2. Backend Setup
cd backend
dotnet restore


Configure appsettings.json with your SQL Server connection:

"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=UserManagementDb;Trusted_Connection=True;TrustServerCertificate=True;"
}


Run migrations and update DB:

dotnet ef migrations add InitialCreate
dotnet ef database update


Start the backend:

dotnet run


Backend runs at: https://localhost:5001

3. Frontend Setup
cd frontend
npm install
ng serve


Frontend runs at: http://localhost:4200

📡 API Endpoints
Method	Endpoint	Description
GET	/api/users	Get all users (with pagination, filtering)
GET	/api/users/{id}	Get a single user
POST	/api/users	Create a new user
PUT	/api/users/{id}	Update an existing user
DELETE	/api/users/{id}	Delete a user
Example Request (POST /api/users)
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "zipCode": "12345"
}

✅ Validation

Frontend (Angular Forms)

Required: FirstName, LastName, Email

Email: Must be valid email format

Phone: Optional, must match phone regex

ZipCode: Optional, supports multiple formats

Backend (Fluent Validation / Data Annotations)

Same rules enforced server-side

🔒 Security

SQL Injection: Prevented using EF Core parameterized queries

XSS: Output encoding, backend sanitization, HTTP headers

CORS: Configured in Web API

Authentication (Optional): JWT tokens

🛠️ Error Handling

Validation errors → 400 Bad Request with details

Not found → 404 Not Found

Server errors → 500 Internal Server Error

🚀 Deployment (Optional)
Deploy to Azure

Backend: Deploy API to Azure App Service

Database: Use Azure SQL Database

Storage: Use Azure Blob Storage for file storage (optional)

CI/CD: Configure GitHub Actions for build & deploy