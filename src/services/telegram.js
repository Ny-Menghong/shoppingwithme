import axios from "axios"

const BOT_TOKEN = "8915732727:AAFNoW88W8bitaHBXlCIXY2V_S9ce5oZqWw"
const CHAT_ID = "1677541616"

// Send message to Telegram
export const sendTelegram = async (text) => {
  try {
    return await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML"
      }
    )
  } catch (error) {
    console.log("Telegram error:", error)
  }
}