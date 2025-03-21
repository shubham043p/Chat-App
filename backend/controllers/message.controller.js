import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        });

       if(!conversation){
          conversation = await Conversation.create({
              participants:[senderId,receiverId],
          });
       }
      
       const newMessage = new Message({
            senderId,
            receiverId,
            message,
       })

       if(newMessage){
          conversation.messages.push(newMessage._id);
       }
    
       // this will run in series
    //    await newMessage.save(); //1sec
    //    await conversation.save();
 

    //SOCKET IO FUNCTIONALITY

    // this will run in parallel
    await Promise.all([newMessage.save(),conversation.save()]);
       res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage: ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages");

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}



//populate() method is used to populate the documents in the messages array of the conversation document.
// The messages array contains the ids of the messages documents.   
// The populate() method will replace the ids with the actual message documents.
// The messages array will now contain the actual message documents.