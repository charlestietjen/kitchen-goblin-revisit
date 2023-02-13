import Image from "next/image";
import { Box, Heading, Text, Stack, Avatar, useColorModeValue, Card, CardBody } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";

const defaultImage =
  "https://images.unsplash.com/photo-1579208030886-b937da0925dc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

export default function RecipeCard({ type, imageSrc = defaultImage, title, description }) {
  const theme = useTheme();

  return (
    <Card maxW="md" rounded="2xl" boxShadow="2xl">
      <Box h={"210px"} pos={"relative"} rounded="2xl">
        <Image
          src={imageSrc}
          fill
          style={{ borderTopLeftRadius: theme.radii["2xl"], borderTopRightRadius: theme.radii["2xl"], objectFit: "cover" }}
        />
      </Box>
      <CardBody>
        <Stack>
          {type && (
            <Text color={"green.500"} textTransform={"uppercase"} fontWeight={800} fontSize={"sm"} letterSpacing={1.1}>
              {type}
            </Text>
          )}

          <Heading color={useColorModeValue("gray.700", "white")} fontSize={"2xl"} fontFamily={"body"}>
            {title}
          </Heading>
          <Text color={"gray.500"}>{description}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={"https://images.immediate.co.uk/production/volatile/sites/3/2020/03/phil-mitchell-0c43ad0.jpg"} alt={"Author"} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>Phil Mitchell</Text>
            <Text color={"gray.500"}>Feb 08, 2021 · 15min prep</Text>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}
