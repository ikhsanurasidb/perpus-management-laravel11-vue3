# Login Form and Authentication

Email: hello@gmail.com
Password: hello

## Log-in and Log-out
![login-logout](https://github.com/user-attachments/assets/5f4ef8bc-fc6c-49cf-82d3-ea0f0f56ff58)

## Register
<img width="600" alt="image" src="https://github.com/user-attachments/assets/f15ec694-73db-452d-b780-e32552a9a142">



# CRUD Operation
## Read
![read](https://github.com/user-attachments/assets/37d53a78-2f08-465a-bf42-a66174ccaa91)

## Create
![create](https://github.com/user-attachments/assets/08342518-e876-4d83-a942-adbaa450a0b3)

## Update
![update](https://github.com/user-attachments/assets/484a81a3-f5fb-4b46-8217-e6d062480c0d)

## Delete
![delete](https://github.com/user-attachments/assets/3ca8c3cb-5588-420c-a8ff-b464bc0bfb5c)

# Setup

Requirements:

* PHP 8.2+
* Composer
* Node.js & NPM
* Git

1. Clone Repository
```
git clone https://github.com/ikhsanurasidb/perpus-management-laravel11-vue3.git
cd perpus-management-laravel11-vue3
```

2. Setup Backend (Laravel)
```
# Install dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Setup database in .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nama_database
DB_USERNAME=root
DB_PASSWORD=

# Run migration
php artisan migrate
```

3. Setup Frontend (Vue 3)
```
# Install dependencies
npm install
```

4. Run App in Devlopment Mode
```
# Terminal 1 - Laravel Server
php artisan serve

# Terminal 2 - Vite Development Server
npm run dev
```

