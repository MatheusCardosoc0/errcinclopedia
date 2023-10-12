import { google } from "googleapis"
import { NextRequest, NextResponse } from "next/server"


interface IParams {
    sheetName: 'notasFiscais' | 'Outros'
}

export const revalidate = 0
export async function GET(
    request: NextRequest,
    { params }: { params: IParams }
) {
    try {
        const { sheetName } = params

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

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.NEXT_PUBLIC_SHEET_ID,
            range: `${sheetName}!A:H`,
            dateTimeRenderOption: 'FORMATTED_STRING',
            majorDimension: 'ROWS',
            valueRenderOption: 'FORMATTED_VALUE'
        })

        return NextResponse.json(response.data)
    } catch (error) {
        return new NextResponse("Error", { status: 500 })
    }
}