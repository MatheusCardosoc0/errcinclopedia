import { google } from "googleapis"
import { NextResponse } from "next/server"

type mainData = {
    id: number
    title: string
    image: string
    context: string
    resolution: string
    infoExtra: string
    status: string
}

export async function POST(
    request: Request
) {
    const body = await request.json() as mainData

    try {
        //const uniqueID = uuidv4()

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
            range: `${body.status}!A:H`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [body.id, body.title, body.image, body.context, body.resolution, body.infoExtra, 0, body.status]
                ]
            }
        })

        return NextResponse.json(response.data)
    } catch (error) {
        return new NextResponse("Error", { status: 500 })
    }
}
