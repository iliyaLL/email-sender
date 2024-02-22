# Email Sender App

This is a simple web application built with Node.js and Express.js that allows users to send emails with attachments.

## Features

- Send emails to recipients with specified subject, message, and optional attachment.
- Supports file uploads for attachments.
- Uses Nodemailer to send emails.
- Uses Multer middleware for handling file uploads.

## Installation
1. Navigate to the project directory
2. Install dependencies: npm install
3. Create a `.env` file in the root directory and add the following environment variables:
   PORT=5000
   EMAIL_HOST=your_email_host
   EMAIL_PORT=your_email_port
   EMAIL_USER=your_email_username
   EMAIL_PASS=your_email_password

Run ```npm start```


## Technologies Used

- Node.js
- Express.js
- Nodemailer
- Multer