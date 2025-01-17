import { Stack, Box, Heading, Flex, Image } from '@chakra-ui/core';
import React from 'react';

const Landing = () => {
    return(
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            wrap="no-wrap"
            minH="70vh"
            px={8}
            mb={16}
        >
            <Stack
                spacing={4}
                w={{ base: "80%", md: "40%" }}
                align={["center", "center", "flex-start", "flex-start"]}
            >
                <Heading
                as="h1"
                size="xl"
                fontWeight="bold"
                color="primary.800"
                textAlign={["center", "center", "left", "left"]}
                >
                    The place to view all your classes
                </Heading>
                <Heading
                as="h2"
                size="md"
                color="primary.800"
                opacity="0.8"
                fontWeight="normal"
                lineHeight={1.5}
                textAlign={["center", "center", "left", "left"]}
                >
                    Never miss a class again
                </Heading>
            </Stack>
            <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
                <Image src="https://source.unsplash.com/collection/4447249/800x600" size="100%" rounded="1rem" shadow="2xl" />
            </Box>
        </Flex>
    );
}

export default Landing;