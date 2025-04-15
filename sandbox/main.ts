import { createApp } from 'vue';
import App from './app.vue';
import imhoIndustriesUI from '@imho-industries/components';

const app = createApp(App);
app.use(imhoIndustriesUI);

app.mount('#app');
