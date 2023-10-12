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

interface IParams {
    rangeForError: string
}

export async function PUT(
    request: Request,
    { params }: { params: IParams }
) {
    const decode = decodeURIComponent(params.rangeForError)
    const divideInPart = decode.split("-")

    const part1 = divideInPart[0]
    const part2 = divideInPart[1]
    const body = await request.json() as mainData

    try {

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

        const response = await sheets.spreadsheets.values.update({
            spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
            range: `${body.status}!${part1}:${part2}`,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [body.id, body.title, body.image, body.context, body.resolution, body.infoExtra, new Date(), body.status]
                ]
            }
        })

        return NextResponse.json(response.data)
    } catch (error) {
        return new NextResponse("Error", { status: 500 })
    }
}
