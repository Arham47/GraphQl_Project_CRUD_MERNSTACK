import Client from "./component/Client";
import Header from "./component/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div className="container">
          <Client/>
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
