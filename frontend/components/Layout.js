import Head from "next/head";
import { Box, Button, Tabs, TabList, Tab, Icon, Container, useBreakpointValue, useColorModeValue, useColorMode } from "@chakra-ui/react";
import { IoHomeSharp, IoLibrarySharp, IoPersonSharp } from "react-icons/io5";
import { useRouter } from "next/router";

const tabRoutes = ["/", "/library", "/profile"];

const Layout = ({ title = "Kitchen Goblin", children }) => {
  const router = useRouter();
  const tabsProps = useBreakpointValue({
    base: { bottom: 0, w: "100%", isFitted: true },
    md: { top: 0, left: 0, orientation: "vertical" },
  });
  const tabsBg = useColorModeValue("gray.200", "gray.900");
  const { colorMode, toggleColorMode } = useColorMode();

  const [, tabPath] = router.pathname.split("/");
  const index = tabRoutes.indexOf(`/${tabPath}`);

  const handleTabsOnChange = (index) => {
    router.push(tabRoutes[index]);
  };

  const onAuthPage = router.pathname === "/login";

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Box position="absolute" right={0} top={0} p={4} display={["none", "none", "block"]}>
        <Button onClick={toggleColorMode}>Toggle {colorMode === "light" ? "Dark" : "Light"}</Button>
      </Box>
      <Container
        as="main"
        pb={["5rem"]}
        maxW="5xl"
        pt={{
          base: "4",
          md: "24",
        }}
        px={{
          base: "0",
          md: "20",
        }}
      >
        {children}
        {!onAuthPage && (
          <Tabs
            bg={tabsBg}
            boxShadow="lg"
            variant="soft-rounded"
            height={["auto", "auto", "100%"]}
            isLazy
            isManual
            position="fixed"
            onChange={handleTabsOnChange}
            index={index}
            colorScheme="green"
            {...tabsProps}
          >
            <TabList>
              <Tab>
                <Icon fontSize={25} as={IoHomeSharp} />
              </Tab>
              <Tab>
                <Icon fontSize={25} as={IoLibrarySharp} />
              </Tab>
              <Tab>
                <Icon fontSize={25} as={IoPersonSharp} />
              </Tab>
            </TabList>
          </Tabs>
        )}
      </Container>
    </div>
  );
};

export default Layout;
