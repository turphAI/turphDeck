import { mount } from 'svelte'
import { inject } from '@vercel/analytics'
import './app.css'
import App from './App.svelte'

// Initialize Vercel Web Analytics
// In development, set mode to 'development' to test without sending data
// In production (on Vercel), this will automatically track page views
inject({
  mode: import.meta.env.PROD ? 'production' : 'development',
  debug: !import.meta.env.PROD
})

const app = mount(App, { target: document.getElementById('app') })

export default app
