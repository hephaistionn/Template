import Vue from 'vue';
import './style.scss';

Vue.component('item', {
    props: {
        ele: Object
    },
    data: () => {
        return {
            counter: 0
        }
    },
    methods: {
        doSomething: function () {
            console.log('clik')
            debugger;
            this.counter += 1;
        }
    },
    template: `<li>
        <span  @click="doSomething" >{{ ele.text }}{{ counter }}</span>
    </li>`
})