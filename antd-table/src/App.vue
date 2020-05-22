<template>
  <div id="app">
    <a-locale-provider :locale="zh_CN">
      <antd-table></antd-table>
    </a-locale-provider>
  </div>
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

import antdTable from './components/antdTable'

export default {
  name: 'App',
  components:{
    antdTable
  },
  data(){
    return {
      zh_CN
    }
  }
}
</script>

<style scoped>
  #app {
    padding: 10px;
  }
</style>
