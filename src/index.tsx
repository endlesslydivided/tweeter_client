import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from './store/store';
import App from './App';
import { Card, ConfigProvider,theme  } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: 'rgb(47,128,250,1)',
            colorBgBase:'white',
            fontFamily: 'Poppins, Montserrat',
          },
          components:
          {
            Layout:
            {
              colorBgHeader:'white',            
            },
          }
         
        }}
      >
        <BrowserRouter>
            <App/>
        </BrowserRouter>
      </ConfigProvider>

    </Provider>
);


