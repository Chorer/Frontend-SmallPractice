<template>
  <div class="info-form">
    <a-form layout="inline" @submit="handleSubmit" :form="form">
      <a-form-item class="info-item">
        <span class="information">登录名</span>
        <a-input
        class="input"  
        v-decorator="['loginName', { rules: [{ required: true, message: '请填写登录名！' }] }]"
        placeholder="请输入"
        ></a-input>
      </a-form-item>  
      <a-form-item class="info-item">
        <span class="information">手机</span>
        <a-input  
        class="input"
        v-decorator="['phoneNumber', { rules: [{ required: true, message: '请填写手机号码！' }] }]"
        placeholder="请输入"
        ></a-input>
      </a-form-item>  
      <a-form-item class="info-item">
        <a-button class="addBtn" type="primary" html-type="submit">添加</a-button>
      </a-form-item>        
    </a-form>
  </div>
</template>

<script>
export default {
  name:'info',
  data(){
    return {
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods:{
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$emit('handle',values)
          this.form.resetFields()
        } 
      });
      // setTimeout(this.form.resetFields,500)
    }
  }
}
</script>

<style scoped lang="stylus">
  .info-form {
    margin-bottom:20px
    .info-item {
      .input {
        width: 160px
        height: 40px
        border-radius: 3px
        border:1.5px solid rgb(232,232,232)
      }
      &>>>.ant-form-explain {
        margin-top:4px
        text-align:center
      }
      .information {
        font-weight: bold
        font-size: 16px
        margin-right: 20px
      }
      .addBtn {
        background-color:#569289
        border-radius:2px
        height: 35px
        width: 65px
        font-size: 14px
      }
    }
  }

</style>



