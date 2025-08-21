import mongoose from "mongoose";

const schema = new mongoose.Schema({
    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Chat",
        required: true,
    },
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
},
{
    timestamps: true,
}
);

// ✅ Use "Conversation" instead of "Chat"
export const Conversation =
  mongoose.models.Conversation || mongoose.model("Conversation", schema);