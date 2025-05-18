# Social Publishing Platform

API built using Laravel 11, controllers structured using resource controller pattern (https://laravel.com/docs/11.x/controllers#resource-controllers)
## Prerequisites

- Node.js and npm
- PHP and Composer
- SQLite for the database
- Angular CLI

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd social-publishing-platform
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

### Frontend Setup (Angular)

1. **Navigate to the Angular frontend directory:**

   ```bash
   cd ../angular-frontend
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
