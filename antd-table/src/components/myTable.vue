<template>
  <div>
    <a-table :data-source="dataSource" 
      :columns="columns" bordered  class="Mytable" rowKey="key" :pagination="pagination">
      <template
        v-for="col in ['id','loginName','phone','mail','role','date']"
        :slot="col"
        slot-scope="text,record,index">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="handleChange($event,record.key,col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="state" slot-scope="text,record">
        <span :class="{'active-state':record.state}">{{record.state?'已审核':'未审核'}}</span>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <a-button class="judge" @click="change(record)">{{record.state?'撤销':'通过'}}</a-button>
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="save(record.key)">保存</a>
            <a-popconfirm title="确定要取消更改吗？" @confirm="cancel(record.key)">
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a-button icon="edit" class="edit" :disabled="editingKey !== ''" @click="edit(record.key)">编辑</a-button>
          </span>
        </div>
        <a-popconfirm
          v-if="dataSource.length && record.role != '超级管理员'"
          title="确定要删除该项吗？"
          @confirm="onDelete(record.key)"
        >
          <a-button class="delete" icon="delete">删除</a-button>
        </a-popconfirm>
        <span v-else>
          <a-button class="delete prohibit" icon="delete">删除</a-button>
        </span>
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name:'myTable',
  props:{
    columns:Array,
    dataSource:Array,
    editingKey:String|Number
  },
  data(){
    return {
      pagination: {
        pageSize: 2, // 默认每页显示数量
        showQuickJumper:true,
        showLessItems:true,
        current:1,
        // 写法1 （生效，可以跳转）
        // onChange:this.onPagerChange,

        // 写法2（不生效，无法跳转，vue devtools 监听不到 current 的改变）
        // onChange(page,pageSize){
        //   this.current = page
        // }
        // 写法3（不声明onChange方法，也可以跳转）
			}
    }
  },
  methods:{
    // 写法1 （生效，可以跳转）
    // onPagerChange(page,pageSize){
    //   this.pagination.current = page
    // },
    change(record){
      record.state = !record.state
    },
    save(key){
      this.$emit('save',key)
    },
    cancel(key){
      this.$emit('cancel',key)
    },
    edit(key){
      this.$emit('edit',key)
    },
    handleChange(e,key,col){
      this.$emit('handleChange',e.target.value,key,col)
    },
    onDelete(key){
      this.$emit('deleteItem',key)
    },
    changePage(){
      // let lastPage = Math.ceil((this.dataSource.length+1)/this.pagination.pageSize)
      // this.pagination.current = lastPage
    }
  }
}
</script>

<style scoped lang="stylus">
  .Mytable {
    position:relative
    &>>>.ant-table-content {
      td,th {
        padding:12px 8px
      }
      td div{
        width:100px
      }
      td:last-child {
        display:flex
        justify-content: space-evenly
      }
      .ant-table-thead {
        th {
          background-color: #f1f2f3
        }
        .ant-table-column-sorter {
          vertical-align: initial
          .anticon {
            font-size:16px
          }
        }
      }
      .ant-table-tbody {
        .active-state {
          background-color:#569289
          padding: 3px 5px
          color: white
          font-size: 13px
          border-radius: 2px
        }
        .ant-btn {
          font-size: 13px
          height: 27px;
          padding: 0 5px;
          border-radius: 3px
          color:white
        }
        .ant-btn.judge {
          background-color:#41b883
        }
        .ant-btn.delete {
          background-color:#d96b42
        }
        .ant-btn.delete.prohibit {
          background-color:white
          color:gray
          cursor:no-drop
        }
        .editable-row-operations {
          .ant-btn.edit{
            background-color:#56a0f3
          }
          a {
            margin-right:15px
          }
        }
      }
    }
    &>>>.ant-pagination {
      position:absolute
      left:50%
      transform:translateX(-50%)
    }
  }
</style>