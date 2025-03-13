# Employee Management (CRUD)

## Technology Used

Frontend - React.js, shadcn, chart.js

Backend - Node.js, Express.js 

Database - MySQL

# Setup Instructions
1) Clone or Download the Repository

    ```bash
   git clone https://github.com/DhiravPatel/employee_management.git
    ```

# Required 

1) Up and running mysql or xampp(mysql)


# Setup Backend 

1) Navigate to the Backend folder.
2) Install the dependencies.
     ```bash
    npm install
    ```
3) Run the command for migrate the database tables

    ```bash
    npm run migrate
    ```
4) Start the Backend server by running this command
    ```bash
    npm run start
    ```
5) The backend is now running on http://localhost:8080

# Setup Frontend 

1) Navigate to the Frontend folder.
2) Install all the dependencies.

    ```bash
    npm install
    ```
3) Start the frontend by running this command
    ```bash
    npm run dev
    ```
4) The frontend is now running on http://localhost:5173

# Note

1) There are dumy data i have inserted into database. Now, you can add the data from your side and image is not storing into cloudinary, firebase or s3 bucket, instead of right now image is just upload into local uploads folder of backend.

2) There is .env file i have already push because right now there is not a secret in that file , so you don't need to create that and put configuration into, because i have already set.
