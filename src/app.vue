<template>
  <div id="app">
        <div id="cover"></div>
        <Header></Header>
        <todo></todo>
        <Footer></Footer>
  </div>
</template>

<script>
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'
export default {
    data(){
        return {
        }
    },
    components: {
        Header,
        Footer,
        Todo
    }
}
</script>

<style lang="stylus" scoped>
#app{
    position relative
    left 0
    right 0
    top 0
    bottom 0
    width 100% //需要加上宽高100%才能铺满
    height 100%
    }

    #cover{
        position absolute
        left 0
        right 0
        top 0
        bottom 0
        background-color #999999
        opacity .9
        z-index -1
        }
</style>