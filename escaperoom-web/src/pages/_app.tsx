import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import {
  ApolloProvider,
} from "@apollo/client";
import { createApolloClient } from '../untilies/createApolloClient';



function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={createApolloClient}>
      <ChakraProvider resetCSS>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
