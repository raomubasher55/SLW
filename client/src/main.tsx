import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@radix-ui/themes/styles.css'
import App from './App.tsx'
import { Theme } from '@radix-ui/themes'
import { BrowserRouter } from 'react-router-dom'
import { AppProviders } from './contexts/AppProviders'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme
      appearance="dark"
      accentColor="blue"
      grayColor="slate"
      radius="large"
      panelBackground="solid"
      scaling="95%"
      hasBackground={false}
    >
      <AppProviders>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProviders>
    </Theme>
  </StrictMode>,
)
