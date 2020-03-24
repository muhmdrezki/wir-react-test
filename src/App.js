import React from 'react';
import ContactList from './components/Contact/List'
import { Provider } from "react-redux";
import store from "./redux/store/index";

function App() {
  return (
    <Provider store={store}>
      <ContactList/>
    </Provider>
  );
}

export default App;
