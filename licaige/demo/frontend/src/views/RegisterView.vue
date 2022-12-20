<template>
  <div class="register-container">
    <div class="register-panel">
      <h1>注册新账号</h1>
      <el-form :model="formData" label-width="120px" label-position="top" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" type="text" id="name" name="username" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" type="password" show-password placeholder="请输入密码">
          </el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirm">
          <el-input v-model="formData.password_confirm" type="password" show-password placeholder="请再次输入密码">
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="registerSubmit">注册</el-button>
      <p class="login-container">
        <router-link to="/login/">返回登录页面</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formData.password_confirm !== '') {
          this.$refs.form.validateField('password_confirm')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        username: '',
        password: '',
        password_confirm: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度应在3到10之间', trigger: 'blur' }
        ],
        password: [
          { required: true, min: 8, max: 20, message: '长度应在8到20之间', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        password_confirm: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    async registerSubmit () {
      await this.$refs.form.validate(async (valid, fields) => {
        if (valid) {
          await this.sendRegisterData()
        } else {
          this.$message.warning('请正确填写注册信息')
        }
      })
    },
    async sendRegisterData () {
      const response = await this.$axios.post('/api/login/register/', this.formData)
      if (response.data === 'suceess') {
        this.$message.success('注册成功')
        this.$router.push('/login/')
      } else {
        this.$message.error('注册失败')
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  box-sizing: border-box;
  height: 100vh;
  padding-top: 15vh;

  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  background-position: 200% 150%;
}

.register-panel {
  margin: 0 auto;
  padding: 32px;
  width: 20%;

  background: #FAFCFF;
  border-radius: 10px;
  font-size: 14px;
}

.register-panel>h1 {
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 2px;
  font-weight: 100;
}

.el-form {
  margin: 48px 0;
  margin-top: 24px;
}

.el-button {
  width: 100%;
  font-size: 16px;
  letter-spacing: 2px;
  padding: 16px 0;
}

.login-container>span {
  color: #909399;
}
</style>
