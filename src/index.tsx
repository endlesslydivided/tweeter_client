import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {store} from './store/store';
import App from './App';
import { ConfigProvider,theme  } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: '#1010ff',
            colorBgBase:'white'
          },
          components:
          {
            Layout:
            {
              colorBgHeader:'white',            
            }
          }
         
        }}
      >
        <BrowserRouter>
            <App/>
        </BrowserRouter>
      </ConfigProvider>

    </Provider>
);


