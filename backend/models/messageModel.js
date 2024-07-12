import mongoose from "mongoose";

const messageModel = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    createdAtIST: {
        type: Date,
        default: Date.now
    },
    updatedAtIST: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

messageModel.pre('save', function(next) {
    const nowUTC = new Date();
    const nowIST = new Date(nowUTC.getTime() + (5.5 * 60 * 60 * 1000)); // Convert to IST (+5:30 hours)
    this.createdAtIST = nowIST;
    this.updatedAtIST = nowIST;
    next();
});

// Pre-update hook to update the updatedAtIST field to IST
messageModel.pre('findOneAndUpdate', function(next) {
    const nowUTC = new Date();
    const nowIST = new Date(nowUTC.getTime() + (5.5 * 60 * 60 * 1000)); // Convert to IST (+5:30 hours)
    this._update.updatedAtIST = nowIST;
    next();
})
export const Message = mongoose.model("Message", messageModel);