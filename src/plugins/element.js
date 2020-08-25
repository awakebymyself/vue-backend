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
    menuItem,
    breadcrumbItem,
    breadcrumb,
    card,
    row,
    col,
    table,
    tableColumn,
    tooltip,
    pagination

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
Vue.use(breadcrumbItem)
Vue.use(breadcrumb)
Vue.use(card)
Vue.use(row)
Vue.use(col)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(tooltip)
Vue.use(pagination)


Vue.prototype.$message = Message