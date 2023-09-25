import { google } from "googleapis"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from 'uuid' // Importando a função para gerar IDs únicos.

type mainData = {
    ID: string
    Title: string
    Image: string
    Context: string
    Resolution: string
    InfoExtra: string
}

export async function POST(
    request: Request
) {
    const body = await request.json() as mainData

    try {
        const uniqueID = uuidv4()

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.NEXT_PUBLIC_EMAIL,
                private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY?.replace(/\\n/g, '\n')
            },
            scopes: [
                "https://www.googleapis.com/auth/drive",
                "https://www.googleapis.com/auth/drive.file",
                "https://www.googleapis.com/auth/spreadsheets"
            ]
        })

        const sheets = google.sheets({
            auth,
            version: 'v4'
        })

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
            range: 'A1:F1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [uniqueID, body.Title, body.Image, body.Context, body.Resolution, body.InfoExtra]
                ]
            }
        })

        return NextResponse.json(response.data)
    } catch (error) {
        return new NextResponse("Error", { status: 500 })
    }
}