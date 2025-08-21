
import { Chat } from "../models/Chat.js";
import { Conversation } from "../models/Conversation.js";

export const createChat = async (req, res) => {
  try {
    const userId = req.user._id;
    const chat = await Chat.create({ user: userId });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addConversation = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id); // ✅ consistent param
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    const conversation = await Conversation.create({
      chat: chat._id,
      question: req.body.question,
      answer: req.body.answer,
    });

    const updatedChat = await Chat.findByIdAndUpdate(
      req.params.id,
      { latestMessage: req.body.answer },
      { new: true }
    );

    res.json({ conversation, updatedChat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({ chat: req.params.id });
    if (conversation.length === 0) {
      return res.status(404).json({ message: "Conversation not found" });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteChat = async(req,res) =>{
    try {
        const chat = await Chat.findById(req.params.id);
        if(!chat) return res.status(404).json({
            message: "Chat not found",
        });
        if(chat.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You are not authorized to delete this chat",
            });
        }
        await chat.deleteOne();
        res.json({
            message: "Chat deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}
// import { Chat } from "../models/Chat.js";
// import { Conversation } from "../models/Conversation.js";

// export const createChat = async(req, res) => {
//     try {
//         const userId = req.user._id;
//         const chat = await Chat.create({
//             user: userId
//         })
//         res.json(chat);
//     } catch (error) {
//         res.status(500).json({
//             message: error.message, 
//     });
//     }
// }

// export const getAllChats = async(req,res) =>{
//     try {
//         const chats = await Chat.find({user:req.user._id}).sort({
//             createdAt: -1,
//         })
//         res.json(chats);
//     } catch (error) {
//          res.status(500).json({
//             message: error.message, 
//     });
//     }
// }

// export const addConversation = async(req,res) =>{
//     try {
//         const chat = await Chat.findById(req.params.chatId)
//         if(!chat) return res.status(404).json({
//             message: "Chat not found",
//         });
//         const conversation = await Conversation.create({
//             chat: chat._id,
//             question: req.body.question,
//             answer: req.body.answer,
//         });
//         const updatedChat = await Chat.findByIdAndUpdate(
//             req.params.id,
//             {latestMessage:req.body.answer},
//             {new:true}
//         );
//         res.json({
//             conversation,
//             updatedChat,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: error.message, 
//         });
//     }
// }

// export const getConversation = async(req,res) =>{
//     try {
//         const conversation = await Conversation.find({
//             chat: req.params.id
//         })
//          if(!conversation) return res.status(404).json({
//             message: "Conversation not found",
//         });
//         res.json(conversation);
//     } catch (error) {
//          res.status(500).json({
//             message: error.message, 
//         });
//     }
// }