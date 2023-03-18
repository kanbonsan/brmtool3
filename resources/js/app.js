import './bootstrap';
import {createApp}from 'vue/dist/vue.esm-bundler'
import vueCounter from './vueCounter'


createApp({
    setup(){
        const counter  = vueCounter()
        return {
            counter
        }
    }
}).mount('#counter')
