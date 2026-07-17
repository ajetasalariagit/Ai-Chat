const ai = require("../config/gemini");

class ChatController {

    async suggestReply(req, res) {

        try {

            const { message } = req.body;

            if (!message) {

                return res.status(400).json({
                    success: false,
                    message: "Message is required"
                });

            }

            const prompt = `
Suggest one short, friendly reply to this message.

Message:
"${message}"

Rules:

- Reply only.
- No explanation.
- Maximum 20 words.
`;

            const response = await ai.models.generateContent({

               model: "gemini-2.5-flash-lite",

                contents: prompt,

            });

            res.json({

                success: true,

                reply: response.text,

            });

        } catch (error) {

            console.log(error);

            res.status(500).json({

                success: false,

                message: error.message,

            });

        }

    }

}

module.exports = new ChatController();