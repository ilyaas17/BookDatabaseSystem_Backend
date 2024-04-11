import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        genre: String,
        ISBN: String,
        availability: Boolean
    },{timestamps:true}
);
const BookDbModel = mongoose.model("bookDatabase",bookSchema);

export default BookDbModel;