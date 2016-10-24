<template>
    <div class="container">
        <ul class="list-group">
            <li class="list-group-item" v-for="v in list" @mouseover="hover" @mouseout="outhover">
                {{ v.full }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
                list: []
            }
        },
        mounted () {
            this.$http.get('http://localhost:3000/api/users')
            .then((res) => {
                this.$set(this, 'list', res.body.list)
            },(res) => {
                console.log('error')
            })
        },
        methods: {
            hover (el) {
                el.target.style.cssText = 'background-color:#FFFFF2; color:#f00'
            },
            outhover (el) {
                el.target.style.cssText = 'background-color:#fff; color:#333'
            }
        }
    }
</script>