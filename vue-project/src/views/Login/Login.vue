<template>
  <div id="g-container">
      <div class="g-wrapper">
          <h2>商城后台管理系统</h2>
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
              <el-button type="success" @click="register" class="elreg">注册</el-button>
              <el-button type="primary" @click="bindLogin" class="elbt">登录
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
              </el-button>
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
        register(){
            this.$router.push({path:'/frontPage'})
        },
        bindLogin() {
            const formRef = this.$refs.loginFormRef
            formRef.validate(async valid => {
                const res = await RequestLogin(this.admin.name, this.admin.password)
                if (valid) {
                    if (res.data.code === 1) {
                        ElMessage({
                            message: '登录成功!',
                            type: 'success',
                        })
                        // 1. 保存登录状态
                        this.$store.dispatch('loginAccount/save', res.data.resultInfo)
                        // 2. 跳转主界面
                        this.$router.push({path:'/home'})
                    } else {
                        ElMessage({
                            message: '账号出错!',
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
                width: 250px;
            }
            .elreg{
                margin-left: 10px;
            }

            .elbt {
                position: relative;
                margin-top: 30px;
                color: #03e9f4;
                text-decoration: none;
                transition: all 0.5s;

                &:hover {
                    color: #fff;
                    border-radius: 5px;
                    background-color: #03e9f4;
                    box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4, 0 0 100px #03e9f4;
                }

                span {
                    position: absolute;

                    /*写一下动画 */
                    @keyframes move1 {
                        0% {
                            left: -100%;

                        }

                        50%,
                        100% {
                            left: 100%;
                        }
                    }

                    @keyframes move2 {
                        0% {
                            top: -100%;

                        }

                        50%,
                        100% {
                            top: 100%;
                        }
                    }

                    @keyframes move3 {
                        0% {
                            right: -100%;

                        }

                        50%,
                        100% {
                            right: 100%;
                        }
                    }

                    @keyframes move4 {
                        0% {
                            bottom: -100%;

                        }

                        50%,
                        100% {
                            bottom: 100%;
                        }
                    }

                    &:first-child {
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 2px;
                        background: linear-gradient(to right, transparent, #03e9f4);
                        animation: move1 1s linear infinite;
                    }

                    &:nth-child(2) {
                        right: 0;
                        top: -100%;
                        width: 2px;
                        height: 100%;
                        background: linear-gradient(transparent, #03e6f4);
                        animation: move2 1s linear 0.25s infinite;
                    }

                    &:nth-child(3) {
                        right: -100%;
                        bottom: 0;
                        width: 100%;
                        height: 2px;
                        background: linear-gradient(to left, transparent, #03e9f4);

                        animation: move3 1s linear 0.5s infinite;
                    }

                    &:last-child {
                        left: 0;
                        bottom: -100%;
                        width: 2px;
                        height: 100%;
                        background: linear-gradient(#03e9f4, transparent);
                        animation: move4 1s linear 0.75s infinite;
                    }
                }

            }
        }
    }
}
</style>