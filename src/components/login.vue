<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 表单区 -->
      <el-form label-width="0" ref="loginFormRef" :model="login_data" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-yonghu2" v-model="login_data.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password" prefix-icon="iconfont icon-mimalan" v-model="login_data.password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLogin">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login_data: {
        username: 'admin',
        password: '123456'
      },
      //  登录验证规则
      loginFormRules: {
        // 验证用户名
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '请输入3-10位的用户名哦 ', trigger: 'blur' }
        ],
        //  验证密码
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 15, message: ' 请输入6-15位的密码哦', trigger: 'blur' }
        ]
      }
    }
  },
  created() {},
  methods: {
    //  重置
    resetLogin() {
      this.$refs.loginFormRef.resetFields()
    },
    //  表单预验证
    login() {
      //  validate 回调函数 valid 预验证合格valid返回true 非则返回false
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid)
        if (!valid) return
        const { data: res } = await this.$axios.post('login', this.login_data)
        if (res.meta.status !== 200) {
          return this.$message.error('用户名或密码错误')
        }
        this.$message.success('登录成功')

        // console.log(res)
        //  将登录的token值放到sessionStroage 因为浏览器关闭就没有了
        window.sessionStorage.setItem('token', res.data.token)
        console.log(this.$router)
        //  实现页面跳转
        this.$router.push('/home')
        console.log(this.$router)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -30%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
