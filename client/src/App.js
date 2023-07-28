import { Route, Routes , BrowserRouter as Router,} from "react-router-dom";
import AddClientModal from "./component/AddClientModal";
import Client from "./component/Client";
import Header from "./component/Header";
import Project from "./pages/Project"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache:cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
        <Header />
        <div className="container">
          <Routes>
          <Route path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/' element={<Home />} />
          </Routes>
          </div>
          </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
