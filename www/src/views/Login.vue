<template>
    <div class="container">
        <div role="form">
            <div class="form-group">
                <label>Username</label>
                <input type="text" v-model="username" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="password" class="form-control" placeholder="Password">
            </div>
            <button class="btn btn-primary btn-block" @click="token">Get Token</button>
        </div>
        <div v-show="msg">
            <p>
                <div class="alert alert-success">{{ msg }}</div>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
                username: 'zhangsan',
                password: '123456',
                msg: ''
            }
        },
        methods: {
            token () {
                this.$http({
                    url: 'http://localhost:3000/api/login',
                    method: 'post',
                    body: {
                        username: this.username,
                        password: this.password
                    },
                    headers: {
                        'x-access-token': 'BasicYXBpOnBhc3N3b3Jk'
                    },
                    emulateJSON: true
                })
                .then((res) => {
                    //res.headers.set('x-access-token','Basic YXBpOnBhc3N3b3Jk');
                    console.log(res.body)
                    this.$set(this,'msg',JSON.stringify(res.body))
                },(res) => {
                    console.log('error')
                })
            }
        }
    }
</script>