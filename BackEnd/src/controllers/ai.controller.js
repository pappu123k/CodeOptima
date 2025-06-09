const aiProcessor = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    try {
        const { code: userCode } = req.body;
        if (!userCode) return res.status(400).json({ review: "Code input is required." });

        const reviewFeedback = await aiProcessor(userCode);

        // Send JSON response with key 'review'
        res.json({ review: reviewFeedback });
    } catch (error) {
        console.error("Error processing review:", error);
        res.status(500).json({ review: "Internal Server Error" });
    }
};
