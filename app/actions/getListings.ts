import prisma from "@/app/libs/prismadb"

export interface IListingsParams{
    userId?: string
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: string;
    endDate?: string;
    locationvalue?: string;
    category?: string
}

export default async function getListings(params: IListingsParams) {
    try{
        const {userId, roomCount, guestCount, bathroomCount, locationvalue, startDate, endDate, category} = params;
        let query: any = {}

        console.log("locationvalue", params)
        if(userId){
            query.userId = userId
        }

        if(category){
            query.category = category
        }

        if(roomCount){
            query.roomCount = {
                gte: +roomCount
            }
        }

        if(guestCount){
            query.guestCount = {
                gte: +guestCount
            }
        }

        if(bathroomCount){
            query.bathroomCount = {
                gte: +bathroomCount
            }
        }

        if(locationvalue){
            query.locationValue = locationvalue
        }

        if(startDate && endDate){
            query.NOT = {
                reservations:{
                    some: {
                        OR:[
                        {
                            endDate: {gte: startDate}, 
                            startDate:{lte: startDate},
                        },
                        {
                            startDate:{lte: endDate}, 
                            endDate:{gte: endDate},
                        }
                    
                    ]
                    }
                }
            }
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy:{
                createdAt:'desc'
            }
        })

        console.log("filterListings", listings,"query", query)
        return listings
    }catch(error: any){
        throw new Error(error)
    }
}