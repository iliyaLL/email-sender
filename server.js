const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config( {path: './.env'} );
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const multer = require('multer');


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());



// Render the index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pages/index.html'));
});


// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Handle form submission
app.post('/send-email', upload.single('attachment'), async (req, res) => {
    const { recipient, subject, message } = req.body;
    const attachment = req.file;

    try {
        const result = await sendEmail(recipient, subject, message, attachment);
        if (result) {
            res.send('Email sent successfully!');
        } else {
            res.status(500).send('Failed to send email.');
        }
    } catch (error) {
        console.error('Error occurred while sending email:', error);
        res.status(500).send('Failed to send email.');
    }
});

// Function to send email
async function sendEmail(recipient, subject, message, attachment) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });


        let info;
        if (attachment) {
            info = ({
                from: process.env.EMAIL_USER,
                to: recipient,
                subject: subject,
                html: message,
                attachments: [
                    {   // utf-8 string as an attachment
                        filename: attachment.originalname,
                        content: attachment.buffer
                    }
                ]
            });
        } else {
            info = ({
                from: process.env.EMAIL_USER,
                to: recipient,
                subject: subject,
                html: message
            });
        }

        
        const user = {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        };
        await transporter.sendMail(info);
        console.log('Email sent', user);

        return true;
    } catch (err) {
        console.error('Error occurred while sending email:', err);
        return false;
    }
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
