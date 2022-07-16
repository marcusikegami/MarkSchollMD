import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { 
  ApolloClient, 
  InMemoryCache,
  ApolloProvider,
  createHttpLink
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>

      <div className="App">
        <header className="header">
        
        </header>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
