<template>
  <div class="login-container">
    <div class="login-panel">
      <h1>登录到Web-IDE</h1>
      <el-form :model="formData" label-width="120px" label-position="top">
        <el-form-item>
          <el-input v-model="formData.username" type="text" id="name" name="username" placeholder="用户名">
            <template #prepend>
              <el-icon>
                <User />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.password" type="password" show-password placeholder="密码">
            <template #prepend>
              <el-icon>
                <Lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="loginSubmit">登录</el-button>
      <p class="register-container">
        <span>还未注册？</span>
        <router-link to="/register/">立即注册新账号</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data () {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async loginSubmit () {
      if (this.formData.username === '') {
        this.$message.warning('请输入用户名')
        return
      }
      if (this.formData.password === '') {
        this.$message.warning('请输入密码')
        return
      }
      const response = await this.$axios.post('/api/login/', this.formData)
      if (response.data !== 'failed') {
        this.$router.push('/')
      } else {
        this.$message.error('登录失败')
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  box-sizing: border-box;
  height: 100vh;
  padding-top: 15vh;

  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  background-position: 200% 150%;
}

.login-panel {
  margin: 0 auto;
  padding: 32px;
  width: 20%;

  background: #FAFCFF;
  border-radius: 10px;
  font-size: 14px;
}

.login-panel>h1 {
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 2px;
  font-weight: 100;
}

.el-form {
  margin: 48px 0;
}

.el-button {
  width: 100%;
  font-size: 16px;
  letter-spacing: 2px;
  padding: 16px 0;
}

.register-container>span {
  color: #909399;
}
</style>
