import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import ErrorBoundary from './components/AuthComponents/ErrorBoundary';
import MainApp from './MainApp';


const App = () => {

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <MainApp />
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
