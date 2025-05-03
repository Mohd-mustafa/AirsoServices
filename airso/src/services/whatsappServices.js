import axios from "axios";

const WHATSAPP_API_URL = "https://graph.facebook.com/v18.0";
const PHONE_NUMBER_ID = "612420008611074"; // Replace with your WhatsApp Phone Number ID
const ACCESS_TOKEN = "EAAZApXXkIEb4BOZCzuQVKh5Yd03eKQC2Q5LCQGZBNBxdI9umvt2jVqZAT0TGmO1D3ogepIFfNf567XSD4X6ILNoMRkvlSmZAi7pi5lNZATD3YWujUzlvgUkbgb12Iq4jqfh0axZCzyG06bo9ZChgs67aYLForA2L2PvYfVF7K1Amw0h9wZCnsJvIYXUkgFmFvy2ZCs9k77qpT59KryZBhOd4MzY9vXfg2oZD";


const sendWhatsAppMessage = async (recipient, message) => {
  try {
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: recipient, // User's WhatsApp number (with country code)
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Message Sent Successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Sending Message:", error.response?.data || error);
    throw error;
  }
};


export { sendWhatsAppMessage };
