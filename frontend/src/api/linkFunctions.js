import { API_URL } from "../assets/dataAssets"

export const verifyURLFromDBlink = async (URL) => {
    try {
        let response = await fetch(
            "http://localhost:8000/link/verifyURL",
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

export const createNewLinkURL = async (data) => {
    let response = await fetch(
        `${API_URL}/link/createNewLink`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data),
        }
    )
    let responseData = await response.json()
    return responseData;
}

export const initialLinkCheck = async (linkId) => {
    let response = await fetch(
        `${API_URL}/link/fetchLinkData`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({linkId}),
        }
    )
    let responseData = await response.json()
    return responseData;
}


export const fetchProtectedLink = async (linkId,password) => {
    let response = await fetch(
        `${API_URL}/link/fetchProtectedLink`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({linkId,password}),
        }
    )
    let responseData = await response.json()
    return responseData;
}