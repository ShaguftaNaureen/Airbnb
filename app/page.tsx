import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";

interface HomeProps{
  searchParams: IListingsParams
}
const Home = async ({searchParams}: HomeProps) => {
  console.log("searchParams", searchParams)
  const listings = await getListings(searchParams)
  const currentUser= await getCurrentUser()
  if(listings.length === 0){
    return (
      <EmptyState showReset/>
    )
  }

  return (
  //  <ClientOnly>
    <Container>
      <div className="pt-24 grid gri-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6
      gap-8">
        {
          listings.map((listing:any)=>{
            return(
              <ListingCard
              key={listing._id}
              currentUser={currentUser}
              data={listing}
              />
            )
          })
        }
      </div>
    </Container>
  //  </ClientOnly>
  )
}

export default Home