const express= require("express");
const app = express();
const mongoose= require("mongoose");
const listing = require("./models/listing")
const path = require("path")
const mongoUrl="mongodb://127.0.0.1:27017/WonderLust";
const methodOverride= require("method-override")
const ejsMate = require('ejs-mate');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);


// mongoose
main()
.then(()=>{
    console.log("db conected successfully")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoUrl);
}


// root directory
app.get("/",(req,res)=>{
    res.send("root directory works properly")
})

// Index Route
app.get("/listings",async (req,res)=>{
    const allListings = await listing.find({})
    res.render("listings/index.ejs",{allListings})
})
// create route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs")
})
app.post("/listings",async (req,res)=>{
    // let listing=req.body.listing;
    // console.log(listing);
    const newListing = new listing(req.body.listing);
    await newListing.save().then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log(err)
    });
    res.redirect("/listings")
})

// edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let listings= await listing.findById(id)
    res.render(`listings/edit`,{listings})
})
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let check= await listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log(check)
    res.redirect(`/listings/${id}`);
})

app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletecheck = await listing.findByIdAndDelete(id);
    console.log(id)
    res.redirect("/listings");

})

// Show route
app.get("/listings/:id",async (req,res)=>{
    let {id}= req.params;
    const listings = await listing.findById(id);
    res.render("listings/show.ejs",{listings})
})

// creating server
app.listen(8080,()=>{
    console.log("server will work on port 8080")
})