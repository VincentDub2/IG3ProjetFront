import Container from "@/app/components/Container";

import getListings, {
    IListingsParams
} from "@/app/actions/getListings";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import MealsMenu from "@/app/components/meals/MealsMenu";



interface HomeProps {
    searchParams: IListingsParams
};

const Home = async ({ searchParams }: HomeProps) => {

    return (
        <ClientOnly>
            <Container>
                <div
                    className="
            pt-14
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
          "
                >
                    <MealsMenu />
                </div>
            </Container>
        </ClientOnly>
    )
}

export default Home;