import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@fontsource/press-start-2p'
import './styles/base.css'
import './styles/components.css'
import './styles/pages.css'

createApp(App).use(router).mount('#app')
