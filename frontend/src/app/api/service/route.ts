import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url)
    const limit = searchParams.get("limit") 
    const page =  searchParams.get("page")
    const search =  searchParams.get("search")
    const url = `http://localhost:8080/assets?limit=${limit}&page=${page}&search=${search}`
    try {
            const response = await fetch(url,  {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const resPonseData = await response.json()
        return NextResponse.json(resPonseData)
    } catch(err:any){ throw err }
}