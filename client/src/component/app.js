import Vue from 'vue';
import './item'

export default Vue.component('App', {
    data: () => {
        return {
            message: 'Hello !',
            todo: [{ text: 'AAA' }, { text: 'BBB' }, { text: 'CCC' }]
        }
    },
    template: `<div class='app'> 
        <h1>{{ message }}</h1>
        <item  v-for="(item, index) in todo"  :ele=item :key=index ></item>
    </div>`
})
