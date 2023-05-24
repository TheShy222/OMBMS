<template>
    <div id="g-container">
        <div class="g-wrapper">
            <h2>线上商城后台管理系统</h2>
            <el-form class="g-login" :rules="rules" :model="admin" ref="loginFormRef">
                <el-form-item prop="name">
                    <el-input placeholder="请输入用户名" v-model="admin.name">
                        <template #prefix>
                            <el-icon>
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码" v-model="admin.password" show-password>
                        <template #prefix>
                            <el-icon>
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-radio-group v-model="identity">
                        <el-radio :label="0">系统管理员</el-radio>
                        <el-radio :label="1">前台网页管理员</el-radio>
                        <el-radio :label="2">超级管理员</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-row class="bottom">
                    <!-- <el-button type="success" @click="register">前台</el-button> -->
                    <el-button type="primary" @click="bindLogin" class="elbt">登录</el-button>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
import { RequestLogin } from '@/api/login.js'
export default {
    data() {
        return {
            admin: {
                name: '',
                password: '',
            },
            identity: 0,
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                    },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        register() {
            this.$router.push({ path: '/frontPage' })
        },
        bindLogin() {
            const formRef = this.$refs.loginFormRef
            formRef.validate(async valid => {
                const res = await RequestLogin(this.admin.name, this.admin.password,this.identity)
                if (valid) {
                    if (res.data.code === 1) {
                        ElMessage({
                            message: '登录成功!',
                            type: 'success',
                        })
                        // 1. 保存登录状态
                        this.$store.dispatch('loginAccount/save', res.data.resultInfo)
                        // 2. 跳转主界面
                        this.$router.push({ path: '/home' })
                    } else {
                        ElMessage({
                            message: '用户名或密码错误!',
                            type: 'error',
                        })
                    }
                }
            })
        }
    },
}
</script>

<style lang="scss" scoped>
#g-container {
    width: 100%;
    height: 100vh;
    position: relative;
    background: linear-gradient(#141e30, #243b55);

    .g-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 480px;
        height: 330px;
        background: linear-gradient(#141e30, #243b55);
        text-align: center;

        h2 {
            color: #fff;
            margin-top: 10px;
            margin-bottom: 20px;
        }

        .g-login {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 400px;
            padding: 40px;
            background-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 15px 25px rgba(0, 0, 0, 0.4);
            .el-input {
                width: 300px;
            }
            .elbt {
                position: relative;
                color: #03e9f4;
                text-decoration: none;
                &:hover {
                    color: #fff;
                    background-color: #03e9f4;
                    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
                }
            }
            .bottom {
                margin-top: 20px;
            }
        }
    }
}
</style>