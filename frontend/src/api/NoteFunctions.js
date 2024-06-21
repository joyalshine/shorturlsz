import { API_URL } from "../assets/dataAssets"

export const verifyURLFromDBNote = async (URL) => {
    try {
        let response = await fetch(
            `${API_URL}/note/verifyURL`,
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
        console.log("Error occured at NoteFunction.js verifyURLFromDBNote : " + e)
    }
}

export const createNewNoteURL = async (data) => {
    let response = await fetch(
        `${API_URL}/note/createNewNote`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(data),
        }
    )
    let responseData = await response.json()
    return responseData;
}

export const initialNoteCheck = async (noteId) => {
    let response = await fetch(
        `${API_URL}/note/fetchNoteData`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({noteId}),
        }
    )
    let responseData = await response.json()
    return responseData;
}


export const fetchProtectedNote = async (noteId,password) => {
    let response = await fetch(
        `${API_URL}/note/fetchProtectedNote`,
        {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({noteId,password}),
        }
    )
    let responseData = await response.json()
    return responseData;
}