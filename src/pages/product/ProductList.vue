<template>
  <!-- 选项卡组件 -->
  <a-card>
  <!--  筛选框  -->
    <div class="search">
      <a-form layout="horizontal">
        <div class="fold">
          <a-row>
            <a-col :md="8" :sm="24">
              <a-form-item label="商品类别" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                <a-input placeholder="请输入"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="商品名称" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                <a-input placeholder="请输入"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="状态" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                <a-select placeholder="请选择">
                  <a-select-option value="0">已下架</a-select-option>
                  <a-select-option value="1">已上架</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary">查询</a-button>
          <a-button style="margin-left: 8px">重置</a-button>
        </span>
      </a-form>
    </div>
    <!--  数据表格  -->
    <div>
      <a-space class="operator">
        <a-button @click="addProd" type="primary">新建</a-button>
        <a-button @click="deleteProd">删除</a-button>
      </a-space>
      <standard-table></standard-table>
    </div>
  </a-card>
</template>

<script>
import StandardTable from "@/components/table/StandardTable"
export default {
  name: "ProductList",
  components: {StandardTable},
  data() {
    return {
      advanced: true,
      columns: [],
      dataSource: [],
      selectedRows: []
    }
  }
}
</script>

<style scoped>

</style>