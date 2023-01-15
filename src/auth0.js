// createAuth0 is set up here so we can directly get auth0 data outside of components.
// This enables the import of auth0 data inside of pinia state management

import { createAuth0 } from '@auth0/auth0-vue'

export const auth0 = createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    client_id: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE
})