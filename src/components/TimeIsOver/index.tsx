import React from 'react';
import { Box, Text } from '@chakra-ui/react';

import { Container } from './styles';

function TimeIsOver() {
  return (
    <Box>
      <Text
        fontSize="xl"
        align="center"
        casing="uppercase"
        color="red.500"
        fontWeight="black"
      >
        Time is Over!!!
      </Text>
    </Box>
  );
}

export default TimeIsOver;
