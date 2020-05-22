<template>
  <div class="antd-table">
    <info @handle="handle"></info>
    <my-table ref="mytable" 
      :columns="columns" 
      :data-source="dataSource"
      :editingKey="editingKey"
      @save="save"  
      @cancel="cancel"
      @edit="edit"
      @handleChange="handleChange"
      @deleteItem="deleteItem"
    ></my-table>
  </div>
</template>

<script>
import info from './info'
import myTable from './myTable'

const dataSource = []

export default {
  name:'antdTable',
  components:{
    info,
    myTable
  },
  data(){
    this.cacheData = dataSource.map(item => ({ ...item }))
    return {
      columns:[
        {
          title:'ID',
          dataIndex:'id',
          sorter:(a,b) => a.id - b.id,
          scopedSlots: { customRender: 'id' }
        },
        {
          title:'登录名',
          dataIndex:'loginName',
          scopedSlots: { customRender: 'loginName' }
        },
        {
          title:'手机',
          dataIndex:'phone',
          scopedSlots: { customRender: 'phone' }
        },
        {
          title:'邮箱',
          dataIndex:'mail',
          scopedSlots: { customRender: 'mail' }
        },
        {
          title:'角色',
          dataIndex:'role',
          scopedSlots: { customRender: 'role' }
        },
        {
          title:'加入时间',
          dataIndex:'date',
          sorter:(a,b) => a.date - b.date,
          scopedSlots: { customRender: 'date' }
        },
        {
          title:'审核状态',
          dataIndex:'state',
          align: 'center',
          scopedSlots: { customRender: 'state' }
        },
        {
          title:'操作',
          dataIndex:'operation',
          align: 'center', 
          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource,
      count:1,
      editingKey: ''
    }
  },
  methods:{
    getCurrentDate(){   // 加入新项目的日期
      let date = new Date();
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); 
      return date.toJSON().substr(0, 11).replace(/[-T]/g, ''); 
    },
    addOne(values){     // 增加新项目
      const {count,dataSource} = this
      const mail = `${count}@qq.com`
      const role = dataSource.length == 0?'超级管理员':'管理员'
      const date = this.getCurrentDate()
      const newItem = {
        key:count,
        id:1000 + count,
        loginName:values.loginName,
        phone:values.phoneNumber,
        mail:mail,
        role:role,
        date:date,
        state:false
      }
      this.dataSource = [...dataSource,newItem]
      this.count ++
      this.$refs.mytable.changePage()
    },
    handle(values){    // 增加事件
      this.addOne(values)
    },
    handleChange(value, key, column) {    // 监听项目的修改
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.dataSource = newData;
      }
    },
    edit(key) {                      // 修改项目
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.dataSource = newData;
      }
    },
    save(key) {                        // 保存项目修改
      this.cacheData = this.dataSource.map(item => ({ ...item }))
      const newData = [...this.dataSource];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.dataSource = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    cancel(key) {                 // 取消项目的修改
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.dataSource = newData;
      }
    },
    deleteItem(key){
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    }
  }
}
</script>

<style scoped>

</style>