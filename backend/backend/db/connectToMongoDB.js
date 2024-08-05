const mongoose = require("mongoose");

const uri = "mongodb+srv://moqbelsami:J7NFbevut18rJbdw@cluster0.de6zbja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected To DB")
    } catch (error) {
        console.log(`Error Connecting to DB ${error.message}`)
    }
}

module.exports = connectToMongoDB; 