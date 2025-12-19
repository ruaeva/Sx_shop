import {createSSRApp} from "vue";
import App from "./App.vue";
import uviewPlus from 'uview-plus';
import axios from "axios";
import {createPinia} from "pinia";

export function createApp() {
    const pinia = createPinia()
    const app = createSSRApp(App)

    // axios基础配置
    app.config.globalProperties.$axios = axios;
    axios.defaults.baseURL = 'http://localhost:8888';
    axios.defaults.timeout = 10000;

    app.use(uviewPlus)
    app.use(pinia)

    return {
        app,
    };
}
