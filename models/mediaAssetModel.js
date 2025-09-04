import mongoose from "mongoose";

const mediaAssetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["video", "audio"],
        required: true
    },
    file_url: {
        type: String,
        required: true
    },

    created_at: {
        type: Date,
        default: Date.now
    },
});


const mediaAssetModel = mongoose.model("mediaAsset", mediaAssetSchema);

export default mediaAssetModel
