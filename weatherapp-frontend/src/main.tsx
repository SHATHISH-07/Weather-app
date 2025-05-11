import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { client } from "./apollo/client.ts";
import { store } from "./app/store.ts";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ApolloProvider>
);
