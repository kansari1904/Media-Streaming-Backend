import mediaAssetModel from "../models/mediaAssetModel.js"
import mediaViewModel from "../models/mediaViewModel.js"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";


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

export const logView = async (req, res) => {
    try {
        const { id } = req.params;
        const ip = req.ip;

        const media = await mediaAssetModel.findById(id);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        await mediaViewModel.create({
            media_id: id,
            viewed_by_ip: ip,
        });

        res.status(201).json({ message: "View logged successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getAnalytics = async (req, res) => {
    try {
        const { id } = req.params;

        const media = await mediaAssetModel.findById(id);
        if (!media) {
            return res.status(404).json({ message: "Media not found" });
        }

        const stats = await mediaViewModel.aggregate([
            { $match: { media_id: new mongoose.Types.ObjectId(id) } },
            {
                $group: {
                    _id: {
                        day: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                        ip: "$viewed_by_ip",
                    },
                    count: { $sum: 1 },
                },
            },
        ]);

        let totalViews = 0;
        const viewsPerDay = {};
        const uniqueIps = new Set();

        stats.forEach((record) => {
            totalViews += record.count;
            uniqueIps.add(record._id.ip);

            if (!viewsPerDay[record._id.day]) {
                viewsPerDay[record._id.day] = 0;
            }
            viewsPerDay[record._id.day] += record.count;
        });

        res.json({
            total_views: totalViews,
            unique_ips: uniqueIps.size,
            views_per_day: viewsPerDay,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
