# Quick Notes Web App

The Quick Notes Web App is a straightforward web application designed for creating, reading, updating, and deleting notes. It provides a seamless user experience for managing notes efficiently.  Or it would if I had a little more time to work on styling and features.

## DemoLink: 

https://solace-chat-challenge-df-055aa7cf2ceb.herokuapp.com/

## Technologies

- **Frontend**: Developed using Create React App with TypeScript, ensuring robust and type-safe code for enhanced maintainability.
- **Backend**: Built with Node.js and Express, utilizing TypeScript to ensure a scalable and maintainable backend architecture.
- **Database**: Relies on MySQL for data storage, ensuring data integrity and reliability.

## Requirements

To run the Notes Web App locally, ensure you have the following prerequisites installed:

- **Node.js**: Required for running both the frontend and backend servers.
- **MySQL**: Needed for storing and managing note data.

## Running MySQL Locally

To set up a local MySQL environment for the Notes Web App, follow these steps:

1. **Download MySQL**: Visit the [MySQL Community Downloads](https://dev.mysql.com/downloads/mysql/) page and download the appropriate MySQL Community Server version for your operating system.

2. **Install MySQL**: Follow the installation instructions provided for your operating system to install MySQL.

3. **Start MySQL Server**: Once installed, start the MySQL server using the appropriate command for your system. Typically, this involves running a command such as `mysql.server start` or `sudo service mysql start`.

4. **Access MySQL**: Access MySQL using the MySQL command-line client. Open a terminal window and enter the command `mysql -u root -p` to log in with the root user. Provide the root password you specified during installation when prompted.

## Running The Application Locally

To run the Notes Web App locally, follow these steps:

1. **Update Environment Variables**: In the client-side `.env` file, set the value for `REACT_APP_API_URL` to the localhost URL where your backend server is running (e.g., `http://localhost:3001`). In the backend `.env` file, fill in the necessary details from your MySQL configuration. Refer to the `.env.example` file for the required keys.

2. **Install Dependencies**: Navigate to both the backend and client folders in your terminal and run `npm install` to install the project dependencies.

3. **Start the Application**: Run `npm start` in separate terminal windows for both the backend and client folders. This command will start the backend and frontend servers. You can then access the application by navigating to `http://localhost:3000` in your web browser (assuming that's the port you're configured for).
