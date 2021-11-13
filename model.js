const mongoose=require('mongoose')

let MongooseSchema=mongoose.Schema

const movieSchema=new MongooseSchema(
    {
        username:String,
        movieName:String,
        review:String,
        comments:String,

    }
)

var movieModel=mongoose.model("movies",movieSchema)

module.exports={movieModel}