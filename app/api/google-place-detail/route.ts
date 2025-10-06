import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
    const { placeName } = await request.json();
    const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': process?.env?.GOOGLE_API_KEY || '',
            'X-Goog-FieldMask': [
                'places.photos',
                'places.displayName',
                'places.id',
            ]
        },
    };

    try {
    const result = await axios.post(BASE_URL, {
        textQuery: placeName
    }, 
        config );

    const placeRefName=result?.data?.places?.photos[0]?.name;
    const PhotoRefUrl=`https://places.googleapis.com/v1/${placeRefName}/media?maxHeightPx=1000&maxWidthPx=1000&key=${process?.env?.GOOGLE_API_KEY || ''}`;

    return NextResponse.json(PhotoRefUrl);

}
catch (error) {
    return NextResponse.json ({ error: 'Error fetching place details' }, { status: 500 });
}
}