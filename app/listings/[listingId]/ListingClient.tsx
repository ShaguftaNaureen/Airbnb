'use client'
import Container from '@/app/components/Container'
import ListingHead from '@/app/components/listings/ListingHead'
import { categories } from '@/app/components/navbar/Categories'
import { Listing, Reservation, User } from '@prisma/client'
import React, { useMemo } from 'react'

interface ListingClientProps{
    reservations?: Reservation[]
    listing: Listing & {
        user: User
    }
    currentUser?: User | null
}

const ListingClient:React.FC<ListingClientProps> = ({
    listing,
    currentUser
}) => {
    const category = useMemo(()=>{
        return categories.find((item)=>{
            item.label === listing.category
        })
    },[listing])
  return (
    <Container>
        <div className='max-w-screen-lg mx-auto'>
            <div className='flex flex-col gap-6'>
                <ListingHead 
                    title={listing.title}
                    imageSrc={listing.imageSrc}
                    locationValue={listing.locationValue}
                    id={listing.id}
                    currentUser={currentUser}
                />
            </div>
        </div>
    </Container>
  )
}

export default ListingClient