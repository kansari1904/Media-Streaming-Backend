import mediaAssetModel from "../models/mediaAssetModel.js"
import mediaViewModel from "../models/mediaViewModel.js"
import jwt from 'jsonwebtoken'

export const addMedia = async (req, res) => {
    try {
        const { title, type, file_url } = req.body;

        const media = new mediaAssetModel({ title, type, file_url });
        await media.save();

        res.status(201).json(media);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getStreamUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const ip = req.ip;

        await mediaViewModel.create({ media_id: id, viewed_by_ip: ip });

        const streamToken = jwt.sign({ mediaId: id }, process.env.SECRET_KEY, {
            expiresIn: "10m",
        });

        const streamUrl = `${process.env.BASE_URL}/media/stream/${id}?token=${streamToken}`;

        res.json({ streamUrl });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
