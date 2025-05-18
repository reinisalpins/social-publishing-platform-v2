# Social Publishing Platform

## Prerequisites

- Node.js and npm
- PHP and Composer
- SQLite for the database
- Angular CLI

## Installation

### Clone the Repository

```bash
git clone https://github.com/reinisalpins/social-publishing-platform-v2.git
cd social-publishing-platform-v2
```

### Backend Setup (Laravel)

1. **Navigate to the Laravel API directory:**

   ```bash
   cd laravel-api
   ```

2. **Install PHP dependencies:**

   ```bash
   composer install
   ```

3. **Copy the `.env.example` to `.env` and configure your environment variables:**

   ```bash
   cp .env.example .env
   ```

4. **Create the SQLite database file:**

   ```bash
   touch database/database.sqlite
   ```

5. **Generate an application key:**

   ```bash
   php artisan key:generate
   ```

6. **Run migrations and seeders:**

   ```bash
   php artisan migrate --seed
   ```

7. **Serve the Laravel application:**

   ```bash
   php artisan serve
   ```

### Frontend Setup (Angular) in a new terminal window

1. **Navigate to the Angular frontend directory:**

   ```bash
   cd angular-frontend
   ```

2. **Install Node.js dependencies:**

   ```bash
   npm install
   ```

3. **Serve the Angular application:**

   ```bash
   npm run start
   ```

## Accessing the Application

The Angular application will be running at `http://localhost:4200`.

## Login

To access the features, use the following credentials:

   ```bash
  Email: admin@example.com
  Password: password
   ```