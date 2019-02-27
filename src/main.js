import Vue from 'vue';
import iView from 'iview';
import router from './router/index';
import App from './app.vue';
import store from './store/index'
import 'iview/dist/styles/iview.css';
import VueAreaLinkage from 'vue-area-linkage';
Vue.use(VueAreaLinkage)

Vue.use(iView);
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
