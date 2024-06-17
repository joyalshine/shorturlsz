import { API_URL } from "../assets/dataAssets"

export const verifyURLFromDB = async (URL) => {
    try {
        let response = await fetch(
            "http://localhost:8000/chat/verifyURL",
            {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ URL }),
            }
        )
        let responseData = await response.json()
        return responseData;
    }
    catch (e) {
        console.log("Error occured at chatFunction.js verifyURLFromDB : " + e)
    }
}

export const createNewChatURL = async (data) => {
    let response = await fetch(
        `${API_URL}/chat/createNewChat`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data),
        }
    )
    let responseData = await response.json()
    return responseData;
}

export const initialChatCheck = async (chatId) => {
    let response = await fetch(
        `${API_URL}/chat/fetchChatData`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({chatId}),
        }
    )
    let responseData = await response.json()
    return responseData;
}


export const fetchProtectedChat = async (chatId,password) => {
    let response = await fetch(
        `${API_URL}/chat/fetchProtectedChat`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({chatId,password}),
        }
    )
    let responseData = await response.json()
    return responseData;
}

export const sendNewMessage = async (chatId,userId,message) => {
    let response = await fetch(
        `${API_URL}/chat/sendNewMessage`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({chatId,userId,message}),
        }
    )
    let responseData = await response.json()
    return responseData;
}
