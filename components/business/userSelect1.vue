<template>
  <el-popover
    v-model="visible"
    :disabled="disable"
    placement="bottom"
    width="500"
    trigger="click"
  >
    <div class="tree-box">
      <div class="tree-mode">
        <el-form
          ref="searchForm"
          :label-width="'80px'"
          :model="form"
          size="mini"
          inline
          @keyup.enter.native="handleSearch"
        >
          <el-input
            v-model="form.userNo"
            size="small"
            placeholder="请输入工号"
            style="width: 100px;"
            @input="handleSearch"
          />
          <el-input
            v-model="form.userName"
            size="small"
            placeholder="请输入姓名"
            style="width: 100px;"
            @input="handleSearch"
          />
          <el-button
            size="small"
            @click="handleSearch"
          >
            搜索
          </el-button>
        </el-form>
      </div>
      <div class="tree-table">
        <el-table
          :data="tableData"
          :show-header="false"
          :size="'small'"
          border
          style="width: 100%"
          @row-click="nodeClick"
        >
          <el-table-column
            label="工号"
            prop="userNo"
          />
          <el-table-column
            label="姓名"
            prop="userName"
          />
        </el-table>
      </div>
    </div>
    <div
      slot="reference"
      class="input-border"
    >
      <el-tag
        v-for="(tag, index) in showList"
        :key="index"
        :type="'info'"
        size="small"
        closable
        @close="removeTag(index)"
      >
        {{ tag[0] }}
      </el-tag>
    </div>
  </el-popover>
</template>

<script>
import { user_findAllUser } from '@/lib/EquipPrecisManage/ApiURLWHB'
import { post } from '@/lib/Util'
export default {
  name: 'UserSelect',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      disable: false,
      mode: false,
      form: {
        value: this.value,
        name: null,
        userNo: '',
        userName: ''
      },
      page: {
        pageIndex: 1,
        pageSize: 20,
        total: 0
      },
      tableData: []
    }
  },
  computed: {
    showList: function() {
      console.log(this.form.value)
      if (!this.form.value) return []
      return this.form.value.split(',').map(item => item.split('|'))
    }
  },
  watch: {
    value: function(newVal) {
      console.log('=======', newVal)
      this.form.value = newVal
    }
  },
  emits: ['input', 'on-change'],
  created() {
    this.handleSearch()
  },
  methods: {
    async handleSearch() {
      const { data } = await post(
        user_findAllUser,
        Object.assign({}, this.form, {
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize
        })
      )
      this.tableData = data ? data.content : []
    },
    nodeClick(data, node = null) {
      console.log(data)
      if (this.showList.filter(item => item[0] === data.userNo).length)
        return this.$message.warning('该用户已选择！')
      this.form.value +=
        (this.form.value ? ',' : '') +
        data.userNo +
        '|' +
        data.userName +
        '|' +
        data.mobPhone
      this.$emit('input', this.form.value)
      // 推送变化
      this.$emit('on-change', this.form.value)
      this.visible = false
      this.disable = true
    },
    handleReset() {
      this.form.searchKey = ''
      this.showSearch = false
      this.tableData = []
    },
    show() {
      console.log(this.form.name)
    },
    getName() {
      if (!this.form.id) return (this.form.name = '')
      const match = this.menuData.find(item => item.id === this.form.id)
      this.form.name = match ? match.name : ''
    },
    removeTag($index) {
      //
      this.form.value = this.showList
        .filter((item, index) => index !== $index)
        .map(item => item.join('|'))
        .join(',')
      this.$emit('input', this.form.value)
      // 推送变化
      this.$emit('on-change', this.form.value)
      this.disable = false
    }
  }
}
</script>

<style scoped lang="less">
.tree-box {
  .tree-table {
    max-height: 300px;
    overflow: auto;
  }
}
.tree-mode {
  margin-bottom: 8px;
}
.input-border {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #3a3f63;
  font-size: inherit;
  line-height: 40px;
  min-height: 40px;
  outline: 0;
  padding: 0px 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 214px;
  .el-tag + .el-tag {
    margin-left: 5px;
  }
}
</style>
