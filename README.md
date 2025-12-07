**SinarDigital_BE_MiniProject2_Christian_Richard_TPM37**

A simple Express.js web application for managing canteen menu data and handling pre-orders.
Built as **Mini Project 2** for TPM Back End as a continuation of Mini Project 1 (QuickQanteen).

In this version, the application has been upgraded to use a **MySQL database** through **Prisma ORM**, replacing the previous JSON-based storage.

**Features**

- CRUD for menu categories
- CRUD for menu items (name, price, category, image)
- One-to-many relationship between categories and menu items
- Image upload for menu items using Multer
- Seeder script to insert initial categories and 20 sample menu items
- Standardized API responses and basic error handling

**Tech Stack**

- Node.js
- Express.js
- Prisma ORM
- MySQL (XAMPP)
- Multer (file upload)
- dotenv

**How to Run**

1. Install dependencies:
   npm install

2. Setup `.env` based on `.env.example` (configure DATABASE_URL and UPLOAD_DIR).

3. Run Prisma migrations:
   npx prisma migrate dev --name init

4. Seed initial data:
   npm run prisma:seed

5. Start the development server:
   npm run dev

6. The server will run at:
   http://localhost:3000

**Main Endpoints**

Categories

- GET /categories – get all categories
- GET /categories/:id – get category by id
- POST /categories – create new category
- PUT /categories/:id – update category
- DELETE /categories/:id – delete category

**Menu Items**

- GET /items – get all menu items (with category)
- GET /items/:id – get item by id
- POST /items – create new item with image (form-data)
- PUT /items/:id – update item and/or image
- DELETE /items/:id – delete item and its image file
