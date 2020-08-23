import Vue from 'vue'
import {
    Button,
    Form,
    FormItem,
    Input,
    Message,
    container,
    header,
    aside,
    main,
    menu,
    submenu,
    menuItemGroup,
    menuItem
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(container)
Vue.use(header)
Vue.use(aside)
Vue.use(main)

Vue.use(menu)
Vue.use(submenu)
Vue.use(menuItemGroup)
Vue.use(menuItem)


Vue.prototype.$message = Message


