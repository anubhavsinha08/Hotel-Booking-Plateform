const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://unsplash.com/photos/desert-landscape-at-sunset-with-rock-formations-iDzq4O8Lw3c",
            set: (v) => v === "" ? "https://unsplash.com/photos/desert-landscape-at-sunset-with-rock-formations-iDzq4O8Lw3c" : v
        }
    },
    price: Number,
    location: String,
    country: String
})

const listing = mongoose.model("listing", ListingSchema);
module.exports = listing;