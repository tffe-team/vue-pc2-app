<template>
  <div class="m-login">
    <Form ref="loginForm" :rules="validationLogin" :model="formInfo">
      <h2 class="login-title">业务系统</h2>
      <FormItem prop="userName" label="用户名">
        <Input placeholder="请输入用户名" v-model="formInfo.userName"></Input>
      </FormItem>
      <FormItem prop="userPassword" label="密码">
        <Input type="password" placeholder="请输入密码" v-model="formInfo.userPassword"></Input>
      </FormItem>
      <FormItem>
        <div class="remember">
          <Checkbox v-model="remember">记住我</Checkbox>
        </div>
      </FormItem>
      <FormItem>
        <Button type="primary" long class="login-btn" @click="submitLogin" :loading="btnLoading">登录</Button>
      </FormItem>
    </Form>
    <p class="copy-right">©️版权信息归时光金科所有</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { login } from '@/api/index'
@Component
export default class Login extends Vue {
  btnLoading = false
  remember = false
  formInfo: any = {
    userName: '',
    userPassword: ''
  }
  validationLogin = {}
  validateUserName = (rule: string, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('请输入姓名'))
    } else {
      callback()
    }
  }
  validateUserPassword = (rule: string, value: string, callback: Function) => {
    if (!value) {
      callback(new Error('请输入密码'))
    } else {
      callback()
    }
  }
  created() {
    this.validationLogin = {
      userName: { validator: this.validateUserName, trigger: 'blur' },
      userPassword: { validator: this.validateUserPassword, trigger: 'blur' }
    }
    this._getLoginInfo()
  }
  submitLogin(): void {
    const myForm: any = this.$refs.loginForm
    myForm.validate((valid: any) => {
      if (valid) {
        this.btnLoading = true
        login({
          username: this.formInfo.userName,
          password: this.formInfo.userPassword
        }, (res: any) => {
          if (res.code === 200) {
              localStorage.setItem('realName', res.data.chinesename)
              if (this.remember) {
                localStorage.setItem('loginInfo', [this.formInfo.userName, this.formInfo.userPassword].join('_'))
              } else {
                localStorage.removeItem('loginInfo')
              }
              this.$Message.success({
                content: '登录成功',
                onClose: (): void => {
                  window.location.href = '/home'
                }
              })
          } else {
            this.btnLoading = false
          }
        })
      }
    })
  }
  _getLoginInfo(): void {
    const loginInfo = localStorage.getItem('loginInfo')
    if (loginInfo) {
      this.remember = true
      this.formInfo.userName = loginInfo.split('_')[0]
      this.formInfo.userPassword = loginInfo.split('_')[1]
    }
  }
}
</script>

<style lang="scss" scoped>
.m-login {
  height: 80%;
  width: 100%;
  position: relative;
  background: url(../assets/bg.svg);
  background-position: center 10%;
  background-size: cover;
  color: hsla(0, 0%, 100%, 0.6);
  .remember {
    color: #515a6e;
    text-align: left;
  }
  .login-title {
    border-bottom: 1px solid #e8eaec;
    padding-bottom: 10px;
    font-size: 16px;
    color: #17233d;
    font-weight: 700;
    text-align: left;
    margin-bottom: 10px;
  }
  .ivu-form {
    position: absolute;
    top: 25%;
    left: 50%;
    padding: 20px;
    transform: translateX(-50%);
    width: 400px;
    background-color: #fff;
    margin: 0 auto;
    border-radius: 5px;
    font-size: 14px;
  }
  .login-btn {
    height: 40px;
  }
  .copy-right {
    position: absolute;
    bottom: -32px;
    width: 100%;
    color: #2b3137;
  }
}
</style>
