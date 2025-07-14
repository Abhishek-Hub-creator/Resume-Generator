const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/generate-resume', async (req, res) => {
    const resumeData = req.body;

    const prompt = `
        Generate a professional resume summary, work experience descriptions, and education section
        based on this structured data: ${JSON.stringify(resumeData, null, 2)}.
    `;

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GEMINI_API_KEY,
            {
                contents: [{
                    parts: [{ text: prompt }]
                }]
            }
        );

        const result = response.data.candidates[0].content.parts[0].text;
        res.json({ result });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'AI generation failed.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
