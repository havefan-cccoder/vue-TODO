import Vue from 'vue'
import APP from './app.vue'

// import './assets/styles/test.css'
import './assets/images/图片1.png'
import './assets/styles/test.stylus.styl'
import './assets/styles/test.scss'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render:  (h) => h(APP)//h参数是vue里的create App参数。把App挂载到HTML里.App 来着vue文件。这是需要挂载的内容
}).$mount(root)//这一步挂载到HTML节点。root就是被挂载的节点。来着body里的子节点