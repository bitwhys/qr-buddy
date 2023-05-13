import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import * as Toast from '@radix-ui/react-toast'

import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/700.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Toast.Provider>
      <App />
      <Toast.Viewport
        className="fixed right-0 top-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw]
          list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]"
      />
    </Toast.Provider>
  </React.StrictMode>
)
