import { Heading, SimpleGrid } from "@chakra-ui/react";
import LoginButton from "../components/LoginButton";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  return (
    <div>
      <LoginButton />
      <Heading textAlign={["center", "center", "left"]}>Recent Recipes</Heading>
      <SimpleGrid
        minChildWidth="300px"
        spacing={4}
        justifyItems="center"
        pt={4}
      >
        <RecipeCard
          type="Easy Prep"
          title="Fish & Chips"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
        />
        <RecipeCard
          type="Easy Prep"
          title="Fish & Chips"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
        />
        <RecipeCard
          type="Easy Prep"
          title="Fish & Chips"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
        />
        <RecipeCard
          type="Easy Prep"
          title="Fish & Chips"
          description="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod"
        />
      </SimpleGrid>
    </div>
  );
}
