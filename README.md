# vreal.fi_task
## Find the Project snap shots & guidelines to run the website here:
![Screenshot_10-12-2024_214531_localhost](https://github.com/user-attachments/assets/a966c3e2-fdea-4d7f-8bf8-06777c0d6e0b)


## Backend setup:
### Step 1: Clone the repository
Clone the project repository to your local machine:
>> git clone https://github.com/yourusername/repository-name.git
>> cd repository-name


### Step 2: Install PHP dependencies
Navigate to the backend directory and install the PHP dependencies:
>> cd backend
>> composer install

### Step 3: Set up environment variables
Copy the .env.example file to .env:
>> cp .env.example .env

Edit the .env file and update the database configuration to match your local MySQL setup:
>> DB_CONNECTION=mysql,
>> DB_HOST=127.0.0.1,
>> DB_PORT=3306,
>> DB_DATABASE=your_database_name,
>> DB_USERNAME=your_mysql_user,
>> DB_PASSWORD=your_mysql_password

### Step 4: Generate the application key
Generate the Laravel application key:
>> php artisan key:generate


### Step 5: Run database migrations (optional)
If the project requires a database schema, run the following command to apply migrations:
>> php artisan migrate

### Step 6: Start the Laravel server
Start the Laravel development server:
>> php artisan serve



## Frontend setup:
### Step 1: Install Node.js dependencies
Navigate to the frontend directory and install the required Node.js dependencies:
>> cd frontend
>> npm install

### Step 2: Start the React development server
Start the React frontend development server:
npm start



## MySQL Setup:
Ensure MySQL(or use it in phpmyadmin) is installed and running on your system. Follow these steps to set up the database:

#### Step 1: Log into MySQL
Log into the MySQL server:
mysql -u root -p

### Step 2: Create the database
Create a new database for the project:
CREATE DATABASE your_database_name;

### Step 3: Verify the setup
Ensure that Laravel can connect to the MySQL database by running the migrations or checking the functionality of the application.


### Additional Notes
Once both the backend and frontend are running, the Laravel backend should be accessible via API requests at http://127.0.0.1:8000, and the React frontend will be served at http://localhost:5173/


