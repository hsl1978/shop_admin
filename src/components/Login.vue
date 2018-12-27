<template>
  <div class="login">
    <!--
      el-form:是个组件
      model:收集表单数据的
      label-width：用于设置label的宽度，就是前面的宽度

      el-form-item:一个表单项
      label:每一项的提示消息
      在elementui中，所有的组件，在渲染的时候，都会加上和组件名一样的类名
      el-input ======> <input class="el-input">
      el-form =======> <form class="el-form"></form>

      表单校验第一步：
         给el-form传入一个校验规则  :rules="rules" props:['rules']
         2.给需要校验的el-form-item身上指定一个prop属性，值对应了校验规则
      status-icon : 表示错误和对的图标
     -->
      <el-form :model="form" ref="form" status-icon :rules="rules" label-width="80px">
        <img src="@/assets/avatar.jpg" alt="">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 表单的校验规则
      rules: {
        // 配置username的校验规则。可以有多个
        // required:必填的
        // trigger：blur表示失去焦点时候触发
        // trigger: change表示你在改变这个值的时候就触发
        username: [
          { required: true, message: '用户名不能为空', trigger: 'change' },
          { min: 3, max: 9, message: '长度在 3 到 9个字符', trigger: 'change' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    // 重置表单
    reset() {
      // 获取到表单组件，调用resetFields
      this.$refs.form.resetFields()
    },
    // 登录
    login() {
      // await所在的函数必须使用async修饰
      this.$refs.form.validate(valid => {
        if (!valid) return false
        // 发送ajax请求
        // console.log('校验通过了')
        axios({
          url: 'http://localhost:8888/api/private/v1/login',
          method: 'post',
          data: this.form
        }).then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            // 登录成功
            this.$message({
              message: '登录成功了',
              type: 'success',
              duration: 1000
            })
            // 存储token 先存储tooken
            localStorage.setItem('token', res.data.data.token)
            // 跳转到Home组件
            this.$router.push('/home')
          } else {
            this.$message.error(res.data.meta.msg)

            // 登录失败
            // this.$message({
            //   message: res.data.meta.msg,
            //   type: 'error'
            // })
          }
        })
      })
    }
  }
}
</script>

<style lang="less">
/* lang="less"：表示使用less写css */
.login {
  width: 100%;
  height: 100%;
  background-color: #2d434c;
  overflow: hidden;
  .el-form {
    width: 400px;

    background-color: #fff;
    margin: 200px auto;
    padding: 75px 40px 15px;
    border-radius: 20px;
    position: relative;

    img{
      position: absolute;
      left: 50%;
      top: -80px;
      transform:translate(-50%);
      border-radius: 50%;
      border: 10px solid #fff;

    }
    // +  ~表示下一个兄弟
    .el-button + .el-button {
      margin-left: 70px;
    }
  }
}
</style>
