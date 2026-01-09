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
            v-model="form.PERSON_LIABLEID"
            size="small"
            placeholder="请输入工号"
            style="width: 100px;"
            @input="handleSearch"
          />
          <el-input
            v-model="form.PERSON_LIABLE_NAME"
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
            prop="PERSON_LIABLEID"
          />
          <el-table-column
            label="姓名"
            prop="PERSON_LIABLE_NAME"
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
import {
  findPersonLiableNameList,
  findLiablePersonByNameOrNo
} from '@/lib/EquipPrecisManage/ApiURL01'
import { user_findAllUser } from '@/lib/EquipPrecisManage/ApiURLWHB'
import { post } from '@/lib/Util'
export default {
  name: 'UserSelect2',
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
        PERSON_LIABLEID: '',
        PERSON_LIABLE_NAME: ''
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
      console.log('===computed', this.form.value)
      if (!this.form.value) return []
      return this.form.value.split(',').map(item => item.split('|'))
    }
  },
  watch: {
    value: function(newVal) {
      console.log('===watch', newVal)
      this.form.value = newVal
    }
  },
  // emits: ['input', 'on-change'],
  created() {
    this.handleSearch()
    console.log('showList', this.showList)
  },
  methods: {
    async handleSearch() {
      const { data } = await post(findLiablePersonByNameOrNo, {
        userNo: this.form.PERSON_LIABLEID,
        userName: this.form.PERSON_LIABLE_NAME
      })
      this.tableData = data ? data : []
      /*const { data1 } = await post(
        user_findAllUser,
        Object.assign({}, this.form)
      )*/
    },
    nodeClick(data, node = null) {
      console.log(data)
      console.log('showList---nodeClick', this.showList)
      if (this.showList.filter(item => item[0] === data.userNo).length)
        return this.$message.warning('该用户已选择！')
      this.form.value +=
        (this.form.value ? ',' : '') +
        data.PERSON_LIABLEID +
        '|' +
        data.PERSON_LIABLE_NAME +
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
