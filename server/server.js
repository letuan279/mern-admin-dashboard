const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
}).catch(error => {
    console.log(error);
});

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});