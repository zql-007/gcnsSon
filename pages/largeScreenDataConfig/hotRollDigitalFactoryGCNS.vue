<template>
  <div>
    <el-row
      v-for="(item, index) in collapseConfig"
      :style="index !== 0 ? { 'margin-top': '16px' } : {}"
      :key="index + '0'">
      <el-col :span="24">
        <el-card
          class="CardTable"
          shadow="never">
          <el-collapse
            v-model="activeNames"
            accordion>
            <!-- 遍历配置生成折叠项 -->
            <el-collapse-item
              :key="index"
              :title="item.title"
              :name="item.titleCode"
            >
              <div style="display: flex;justify-content: space-between;">
                <!-- 遍历每个折叠项中的表单字段 -->
                <div
                  :class="['fields-container']"
                >
                  <!-- 遍历每个折叠项中的表单字段 -->
                  <div
                    v-for="(field, fieldIndex) in item.dictModelVos"
                    :key="fieldIndex"
                    :style="{ marginRight: '20px' }"
                    class="form-item"
                  >
                    <span class="field-label">{{ field.text }}</span>
                    <el-input
                      v-model="formData[field.code]"
                      :disabled="field.disabled"
                      :style="{ width: field.width || '200px' }"
                      :class="{ 'invalid-input': validationStatus[field.code] === false }"
                      @blur="validateField(field)"
                      @input="handleInput(field)"
                    ></el-input>
                    <!-- 新增错误提示信息 -->
                    <span
                      v-if="validationStatus[field.code] === false"
                      class="error-message">
                    </span>
                  </div>
                </div>
                <div style="display: flex; flex-direction: column; gap: 10px">
                  <el-tag
                    :class="[tapButActCurrent===false?'tagStyle':'tagStyleActive']"
                    @click="clickTabCurrent(item.titleCode)"><span
                      class="spanStyle">编辑</span></el-tag>
                  <el-tag
                    :class="[tapButActCurrentSave===false?'tagStyleSave':'tagStyleActiveSave']"
                    @click="handleSave(item.titleCode)"><span
                      class="spanStyle">保存</span></el-tag>
                  <el-tag
                    :class="[tapButActCurrentCancel===false?'tagStyleCancel':'tagStyleActiveCancel']"
                    @click="handleCancel(item.titleCode)"><span
                      class="spanStyle">取消</span></el-tag>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import NercarEcharts from '~/components/NercarEcharts.vue'
import {
  getDataConfig,
  saveDataConfig
} from '@/lib/largeScreenDataApi/hotRollDigitalFactoryGCNS'
import { post } from '@/lib/Util'

export default {
  name: 'hotRollDigitalFactoryGCNS',
  components: { NercarEcharts },
  data() {
    return {
      tapButActCurrent: false,
      tapButActCurrentSave: false,
      tapButActCurrentCancel: false,
      activeNames: ['1'],
      // 表单数据存储对象
      formData: {},
      // 存储每个字段的验证状态
      validationStatus: {},
      // 存储原始值用于取消操作时恢复
      originalFormData: {},
      // 折叠面板配置 - 可动态修改此配置来改变表单
      collapseConfig: [
        /*{
          titleCode: '1',
          title: '产线产量',
          dictModelVos: [
            {
              text: '月产(t)',
              code: 'monthlyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '日产(t)',
              code: 'dailyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '时产(t)',
              code: 'hourlyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '日产卷数(卷)',
              code: 'dayOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '年产量(t)',
              code: 'yearlyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '班产(t)',
              code: 'shiftOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '月产(t)',
              code: 'monthlyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '日产(t)',
              code: 'dailyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '时产(t)',
              code: 'hourlyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '日产卷数(卷)',
              code: 'dayOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '年产量(t)',
              code: 'yearlyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '班产(t)',
              code: 'shiftOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '时产(t)',
              code: 'hourlyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '日产卷数(卷)',
              code: 'dayOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '年产量(t)',
              code: 'yearlyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '班产(t)',
              code: 'shiftOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '月产(t)',
              code: 'monthlyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            },
            {
              text: '日产(t)',
              code: 'dailyOutput',
              width: '150px',
              disabled: true,
              value: '11'
            }
          ]
        }*/
        /*{
          titleCode: '2',
          title: '产线运行',
          dictModelVos: [
            {
              label: '运行时长(h)',
              prop: 'runTime',
              width: '150px',
              disabled: true
            },
            {
              label: '停机次数',
              prop: 'stopTimes',
              width: '150px',
              disabled: true
            },
            {
              label: '运行效率(%)',
              prop: 'runEfficiency',
              width: '150px',
              disabled: true
            }
          ]
        },
        {
          name: '3',
          title: '设备状态',
          fields: [
            {
              label: '设备完好率(%)',
              prop: 'equipmentAvailability',
              width: '150px',
              disabled: true
            },
            {
              label: '故障率(%)',
              prop: 'failureRate',
              width: '150px',
              disabled: true
            },
            {
              label: '维护次数',
              prop: 'maintenanceTimes',
              width: '150px',
              disabled: true
            }
          ]
        }*/
      ],
      // 添加编辑状态跟踪对象，按分组管理
      isEditing: {}
    }
  },
  mounted() {
    this.getDataConfigFun()
  },
  methods: {
    // 新增保存处理方法
    handleSave(titleCode) {
      if (this.isEditing[titleCode]) {
        this.clickTabCurrentSave(titleCode)
      } else {
        this.$message.error('请先点击编辑按钮进入编辑状态')
      }
    },

    // 新增取消处理方法
    handleCancel(titleCode) {
      if (this.isEditing[titleCode]) {
        this.clickTabCurrentCancel(titleCode)
      } else {
        this.$message.error('请先点击编辑按钮进入编辑状态')
      }
    },

    //初始化时强制验证所有字段
    initFormData() {
      this.collapseConfig.forEach(item => {
        item.dictModelVos.forEach(val => {
          this.$set(this.formData, val.code, val.value)

          this.$set(this.originalFormData, val.code, val.value)
          // 初始化时就验证
          this.validateField(val)
        })
      })
    },
    // 验证单个字段 - 使用cheek属性的正则表达式
    validateField(field) {
      const value = this.formData[field.code]
      let isValid = false
      let regex = null

      // 处理空值情况
      if (value === undefined || value === null || value === '') {
        isValid = false
      }
      // 验证正则表达式
      else if (field.cheek) {
        // 如果是字符串，尝试转换为正则对象
        if (typeof field.cheek === 'string') {
          try {
            // 支持带修饰符的正则（如 "/^\d+$/.test()" 格式）
            const match = field.cheek.match(/^\/(.*)\/([gimuy]*)$/)
            if (match) {
              regex = new RegExp(match[1], match[2])
            } else {
              // 纯正则内容，默认不添加修饰符
              regex = new RegExp(field.cheek)
            }
          } catch (e) {
            console.error('正则表达式格式错误:', e)
            regex = null
          }
        }
        // 如果已经是正则对象，直接使用
        else if (field.cheek instanceof RegExp) {
          regex = field.cheek
        }

        // 执行验证
        if (regex) {
          isValid = regex.test(value.trim())
        } else {
          // 正则无效时默认不通过
          isValid = false
        }
      }
      // 没有验证规则默认通过
      else {
        isValid = true
      }

      this.$set(this.validationStatus, field.code, isValid)
      return isValid
    },
    // 输入时处理
    handleInput(field) {
      // 移除延迟，实时验证
      this.validateField(field)
    },
    // 验证指定分组的所有字段
    validateGroup(titleCode) {
      let isValid = true
      this.collapseConfig.forEach(item => {
        if (item.titleCode === titleCode) {
          item.dictModelVos.forEach(val => {
            if (!this.validateField(val)) {
              isValid = false
            }
          })
        }
      })
      return isValid
    },
    //编辑
    clickTabCurrent(titleCode) {
      this.$confirm('是否进行编辑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.tapButActCurrent = true
          // 设置当前分组为编辑状态
          this.$set(this.isEditing, titleCode, true)

          this.collapseConfig.forEach(item => {
            item.dictModelVos.forEach(val => {
              if (item.titleCode === titleCode) {
                val.disabled = false
              }
            })
          })

          setTimeout(() => {
            this.tapButActCurrent = false
          }, 500)
        })
        .catch(() => {})
    },
    //保存
    clickTabCurrentSave(titleCode) {
      // 验证是否处于编辑状态
      if (!this.isEditing[titleCode]) return

      // 先验证当前分组的所有字段
      const isValid = this.validateGroup(titleCode)

      if (!isValid) {
        this.$message.error('未通过正则校验，请修正后再保存！')
        return // 验证不通过则直接返回，不执行保存逻辑
      }

      // 查找当前分组信息
      const currentGroup = this.collapseConfig.find(
        item => item.titleCode === titleCode
      )
      if (!currentGroup) {
        this.$message.error('未找到对应的分组信息！')
        return
      }

      // 构建保存接口需要的参数
      const saveParams = {
        titleCode: currentGroup.titleCode,
        title: currentGroup.title,
        dictModelVos: currentGroup.dictModelVos.map(val => ({
          code: val.code,
          value: this.formData[val.code], // 从表单数据中获取对应的值
          text: val.text || '' // 如无text则默认为空
        }))
      }

      this.$confirm('是否保存编辑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.tapButActCurrentSave = true

          this.collapseConfig.forEach(item => {
            item.dictModelVos.forEach(val => {
              if (item.titleCode === titleCode) {
                val.disabled = true
                // 保存时更新原始值，用于后续可能的取消操作
                this.$set(
                  this.originalFormData,
                  val.code,
                  this.formData[val.code]
                )
              }
            })
          })
          // 保存成功后退出编辑状态
          this.$set(this.isEditing, titleCode, false)

          // 这里可以添加实际的保存接口调用逻辑
          // 调用保存接口并传入构建好的参数
          try {
            await this.saveDataToServer(saveParams)
            setTimeout(() => {
              this.tapButActCurrentSave = false
            }, 500)
          } catch (error) {
            this.tapButActCurrentSave = false
            this.$message.error('保存失败：' + (error.message || '未知错误'))
          }
        })
        .catch(() => {
          this.$message.info('已取消保存')
        })
    },
    async saveDataToServer(saveParams) {
      const res = await post(saveDataConfig, saveParams)
      if (res.success) {
        this.$message.success('保存成功！')
        await this.getDataConfigFun() //保存后刷新数据
      }
    },
    //取消
    clickTabCurrentCancel(titleCode) {
      // 验证是否处于编辑状态
      if (!this.isEditing[titleCode]) return

      this.$confirm('是否取消编辑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          this.tapButActCurrentCancel = true

          this.collapseConfig.forEach(item => {
            item.dictModelVos.forEach(val => {
              if (item.titleCode === titleCode) {
                val.disabled = true
              }
            })
          })
          // 取消后退出编辑状态
          this.$set(this.isEditing, titleCode, false)

          await this.getDataConfigFun() //取消后刷新数据

          setTimeout(() => {
            this.tapButActCurrentCancel = false
          }, 500)
        })
        .catch(() => {})
    },
    //获取数据接口
    async getDataConfigFun() {
      const res = await post(getDataConfig, {
        productionLineCode: 'GCNS'
      })
      if (res.success) {
        // res.data[0].dictModelVos[0].value = '6666666'
        this.collapseConfig = [...res.data]
        // 为每个dictModelVos对象添加disabled: true属性
        this.collapseConfig = this.collapseConfig.map(item => ({
          ...item,
          dictModelVos: item.dictModelVos.map(v => ({
            ...v,
            // 如果 value 是 null，则转为 0，否则保持原值
            value: v.value === null ? '0' : v.value,
            disabled: true
          }))
        }))
        // 初始化所有分组为非编辑状态
        this.collapseConfig.forEach(item => {
          this.$set(this.isEditing, item.titleCode, false)
        })

        this.initFormData()
      }
    }
  }
}
</script>

<style scoped lang="less">
.CardTable {
  border: 0;
  border-radius: 6px;
  box-sizing: border-box;
  .spanHead {
    font-family: 'Noto Sans SC';
    font-style: normal;
    font-weight: 900;
    font-size: 18px;
    line-height: 28px;
  }
  .spanHeadTwo {
    font-family: Source Han Sans CN;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
    vertical-align: middle;
  }
}
/* 修改整个手风琴的背景色 */
::v-deep .el-collapse {
  background-color: #ffffff; /* 浅蓝底色 */
  border-radius: 6px;
  //padding: 10px;
}

/* 修改标题栏默认状态的背景色 */
::v-deep .el-collapse-item__header {
  background-color: #ffffff; /* 淡蓝色 */
  color: #000000; /* 文字颜色 */
  font-family: Source Han Sans CN;
  font-weight: 700;
  font-size: 20px;
  leading-trim: NONE;
  line-height: 100%;
  vertical-align: middle;

  border-radius: 4px;
  margin-bottom: 5px;
}

/* 修改标题栏hover状态的背景色 */
::v-deep .el-collapse-item__header:hover {
  background-color: #ffffff; /* 稍深的蓝色 */
}

/* 修改标题栏展开状态的背景色 */
::v-deep .el-collapse-item.is-active .el-collapse-item__header {
  background-color: #ffffff; /* 展开时的蓝色 */
  font-weight: bold;
}

/* 修改内容区域的背景色 */
/deep/ .el-collapse-item__content {
  background-color: #ffffff; /* 白色背景 */
  padding: 15px;
  border-radius: 4px;
}
/* 核心布局修改 */
.fields-container {
  display: grid;
  /* 每列最小250px，自动填充容器，最多4列 */
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: calc(250px * 4 + 20px * 3); /* 最大宽度限制为4列 */
  overflow-x: hidden; /* 移除横向滚动 */
}

.form-item {
  width: 250px; /* 增加整体宽度 */
  display: flex;
  align-items: center;
}

.field-label {
  width: 150px; /* 增加标签宽度 */
  min-width: 150px; /* 确保最小宽度 */
  text-align: right;
  margin-right: 10px;
  font-size: 14px;
  white-space: nowrap; /* 禁止文字换行 */
}

/* 基础样式：去除所有边框线 */
::v-deep .el-collapse-item {
  border: none !important;
}

::v-deep .el-collapse {
  border: none !important;
}

/* 内容区域默认隐藏边框 */
::v-deep .el-collapse-item__wrap {
  border: none !important;
}
/* 内容区域默认隐藏所有边框（包括标题与内容间的横线） */
::v-deep .el-collapse-item__wrap {
  border: none !important;
  /* 额外去除可能存在的内边距边框 */
  box-shadow: none !important;
}
/* 标题区域与内容区域之间的横线默认隐藏 */
::v-deep .el-collapse-item__header {
  border-bottom: none !important;
  /* 防止鼠标悬停时标题变绿 */
  &:hover {
    color: inherit !important; /* 保持原有文字颜色 */
    background-color: transparent !important; /* 保持原有背景色 */
  }
}
/* 当手风琴项展开时，为内容区域添加上下边框 */
::v-deep .el-collapse-item.is-active {
  .el-collapse-item__wrap {
    border-top: 1px solid #dadada !important; /* 上边框 */
    //border-bottom: 1px solid #e4e7ed !important; /* 下边框 */
  }
}

.tagStyle {
  background-color: #cfe5ff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  .spanStyle {
    color: #000000;
  }
}
.tagStyleActive {
  background-color: #3391ff;
  display: flex;
  justify-content: center;
  .spanStyle {
    color: #ffffff;
  }
}
.tagStyleSave {
  background-color: #ebf6ec;
  cursor: pointer;
  display: flex;
  justify-content: center;
  .spanStyle {
    color: #000000;
  }
}
.tagStyleActiveSave {
  background-color: #5db362;
  display: flex;
  justify-content: center;
  .spanStyle {
    color: #ffffff;
  }
}
.tagStyleCancel {
  background-color: #ffd6d3;
  cursor: pointer;
  display: flex;
  justify-content: center;
  .spanStyle {
    color: #000000;
  }
}
.tagStyleActiveCancel {
  background-color: #f45549;
  display: flex;
  justify-content: center;
  .spanStyle {
    color: #ffffff;
  }
}
/deep/.el-input__inner {
  -webkit-appearance: none;
  background-color: #ffffff;
  background-image: none;
  border-radius: 4px;
  //border: 1px solid #d5ddd5;
  box-sizing: border-box;
  color: #2e382e;
  display: inline-block;
  font-size: inherit;
  height: 28px;
  //width: 150px;
  line-height: 28px;
  outline: 0;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
/deep/ input[disabled],
input:disabled,
input.disabled {
  -webkit-text-fill-color: #3a3f63; /*disabled里面字的颜色*/
  background: #f5f7fa;
  -webkit-opacity: 1;
  opacity: 1;
  cursor: not-allowed;
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}

/* 添加输入框验证失败样式 */
::v-deep .invalid-input .el-input__inner {
  border-color: #f56c6c !important;
}

::v-deep .invalid-input .el-input__inner:focus {
  border-color: #f56c6c !important;
  box-shadow: 0 0 0 2px rgba(245, 108, 108, 0.2) !important;
}

/* 错误提示信息样式 */
.error-message {
  color: #f56c6c;
  //font-size: 12px;
  //margin-top: 4px;
  //margin-left: 90px;
}
</style>
