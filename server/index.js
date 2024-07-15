const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userModel = require('./models/user.js');
const bookingModel = require('./models/booking.js');

const app = express();
app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://SenthanVigasM:Msenthan0307@cartrabbit.m6vpxc1.mongodb.net/CartRabbit?retryWrites=true&w=majority&appName=CartRabbit';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.email === 'admin@gmail.com') {
                    if (password === 'Admin-01') {
                        res.json("Login Admin");
                    } else {
                        res.status(401).json({ error: 'Incorrect Password', message: 'Incorrect password for admin account. Please try again.' });
                    }
                } else if (user.password === password) {
                    res.json("Login successful");
                } else {
                    res.status(401).json({ error: 'Incorrect Password', message: 'Incorrect password. Please try again.' });
                }
            } else {
                res.status(404).json({ error: 'User Not Found', message: 'No user found with the provided email.' });
            }
        })
        .catch(err => {
            console.error('Error during login:', err);
            res.status(500).json({ error: 'Server Error', message: 'An error occurred while processing your request. Please try again later.' });
        });
});

app.post('/register', (req, res) => {
    userModel.findOne({ email: req.body.email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ error: "Email already exists", message: "An account with this email address already exists. Please use a different email address." });
            } else {
                userModel.create(req.body)
                    .then(user => res.json(user))
                    .catch(err => res.status(500).json({ error: "Internal server error" }));
            }
        })
        .catch(err => res.status(500).json({ error: "Internal server error" }));
});

app.post('/book-service', async (req, res) => {
    const { name, email, address, phone, vehicleNumber, serviceType, date, time } = req.body;
    try {
      const existingBooking = await bookingModel.findOne({ date, time });
      if (existingBooking) {
        return res.status(400).json({ error: "Date and time already booked", message: "The selected date and time is already booked. Please choose another slot." });
      }
      const newBooking = await bookingModel.create({ name, email, address, phone, vehicleNumber, service: serviceType, date, time });
      console.log('Booking created:', newBooking);
      res.status(201).json({ message: "Service booked successfully" });
    } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/admin', async (req, res) => {
    try {
        const bookings = await bookingModel.find();
        console.log('Fetched bookings:', bookings); 
        res.json(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.delete('/admin/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await bookingModel.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/user-bookings/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
      const bookings = await bookingModel.find({ email: userEmail }); // Filter bookings by userEmail
      res.json(bookings);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
