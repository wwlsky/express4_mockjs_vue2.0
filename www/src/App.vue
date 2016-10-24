<template>
    <div id="app">
        <CommonHeader></CommonHeader>
        <router-view></router-view>
        <CommonFooter></CommonFooter>
    </div>
</template>

<script>
import CommonHeader from './components/Header'
import CommonFooter from './components/Footer'

export default {
    name: 'app',
    components: {
        CommonHeader,
        CommonFooter
    }
}
</script>

<style lang="less">
    @color: #f00;
    span, small, p {
        color: @color;
    }
</style>