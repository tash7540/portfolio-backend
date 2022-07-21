import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    email: String,
    subject:String,
    message: String,
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
