import { StrictMode } from 'react';
import Providers from "./providers";
import App from '@/pages/_app'

export default function Page() {
  return (
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>
  )
}

