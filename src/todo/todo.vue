<template>
    <section class="real-app">
        <input 
            type="text" 
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要去做什么"
            @keyup.enter="addTodo">
            <Item 
            v-for="todo in filterCompleted"
            :key="todo.id"
            :todo="todo" 
            @del="deleteTodo"/><!--不能随便加括号，不然拿不到值why-->
            <tabs 
                :filter="filter" 
                :todos=todos 
                @toggle='toggleFilter'
                @clearAll='clearAllcompleted'
            />
    </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
    data() {
        return {
            todos:[],
            filter: 'all'
        }
    },
    components:{Item, Tabs},
    computed: {
        filterCompleted(){
            if (this.filter == 'all') {
                return this.todos
            } 
            const completedFlag = this.filter === 'completed'
            return this.todos.filter(todo => todo.completed === completedFlag)

            //这段代码要是我写估计得下面这样子……
            // switch (this.filter) {
            //     case 'all':
            //         return this.todos
            //         break;
            //     case 'completed':
            //         return this.todos.filter(todo => todo.completed === true)
            //         break;
            //     case 'active':
            //         return this.todos.filter(todo => todo.completed === false)
            //         break;
            
            //     default:
            //         break;
            // }
        }
    },
    methods: {
        addTodo(e) {
            this.todos.unshift({
                id: id++,
                content: e.target.value.trim(),
                completed: false
            })
            e.target.value = ''
        },
        deleteTodo(_id){
            this.todos.splice(this.todos.findIndex(todo => todo.id === _id), 1)
        },
        toggleFilter(state){
            this.filter = state
        },
        clearAllcompleted(){
            this.todos = this.todos.filter(todo => !todo.completed)
            //我是这么写的……
            // this.todos = this.todos.filter(todo => todo.completed === false)
        }
    }
}
</script>
<style lang="stylus" scoped>
.real-app {
        width 600px
        margin 0 auto
        box-shadow 0 0 5px #666
    }
    .add-input {
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        box-sizing: border-box;
        font-smoothing: antialiased;
        padding: 16px 16px 16px 36px;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
    }
</style>