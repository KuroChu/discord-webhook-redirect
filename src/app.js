const express = require("express");
const axios = require("axios");
const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.post("/webhook", async (req, res) => {
  // Extract the webhook path, Discord webhook URL, and embed flag from query parameters
  const webhookPath = req.query["webhook-path"];
  const discordWebhookUrl = req.query["discord-webhook-url"];
  const isEmbed = req.query["is-embed"] === "true";

  // Check if required query parameters are provided
  if (!webhookPath || !discordWebhookUrl) {
    return res.status(400).send("Missing webhook path or Discord webhook URL");
  }

  try {
    let message;

    if (isEmbed) {
      // Prepare the Discord embed
      message = {
        embeds: [
          {
            title: "Webhook Data",
            description: "Received new data from webhook",
            fields: Object.keys(req.body).map((key) => ({
              name: key,
              value: JSON.stringify(req.body[key], null, 2),
              inline: false,
            })),
            color: 3447003, // Blue color
          },
        ],
      };
    } else {
      // Prepare a normal message
      message = { content: JSON.stringify(req.body, null, 2) };
    }

    // Send data to the Discord webhook
    await axios.post(discordWebhookUrl, message);

    res.status(200).send("Webhook data forwarded to Discord");
  } catch (error) {
    console.error("Error forwarding webhook data:", error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
