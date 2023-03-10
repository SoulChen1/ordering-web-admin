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
                <a-select allowClear="true" placeholder="请选择" v-model="form.category_id">
                  <a-select-option v-for="item in categories" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="商品名称" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                <a-input placeholder="请输入" v-model="form.name"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="状态" :labelCol="{span: 5}" :wrapperCol="{span: 18, offset: 1}">
                <a-select placeholder="请选择" v-model="form.status">
                  <a-select-option value="0">已下架</a-select-option>
                  <a-select-option value="1">已上架</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </div>
        <span style="float: right; margin-top: 3px;">
          <a-button type="primary" @click="selectedProd">查询</a-button>
          <a-button style="margin-left: 8px" @click="clearForm">重置</a-button>
        </span>
      </a-form>
    </div>
    <!--  数据表格  -->
    <div>
      <a-space class="operator">
        <a-button @click="addProd" type="primary">新建</a-button>
        <a-button @click="deleteProd">删除</a-button>
      </a-space>
      <standard-table
          :columns="columns"
          :dataSource="dataSource"
          :selectedRows.sync="selectedRows"
          :row-key="item => item.id"
          :pagination="pagination"
          :loading="loading"
          @clear="onClear"
          @change="onChange"
          @selectedRowChange="onSelectChange">

        <div slot="action" slot-scope="{text, prod}">
          <a style="margin-right: 8px">
            <a-icon type="plus"/>新增
          </a>
          <a style="margin-right: 8px">
            <a-icon type="edit"/>修改
          </a>
          <a @click="deletedProd(prod.id)">
            <a-icon type="delete"/>删除
          </a>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle"/>
        </template>
      </standard-table>
    </div>

    <!-- 新增商品对话框 -->
    <a-modal v-model="visible" title="新增商品" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCencel">
          取消
        </a-button>
        <a-button key="submit" type="primary" :loading="loading" @click="handleSubmit"></a-button>
      </template>
      <a-form-model :model="prod" label-col="{ span: 4 }" wrapper-col="{ span: 14 }">
        <a-form-model-item label="商品名称">
          <a-input v-model="prod.name"></a-input>
        </a-form-model-item>
        <a-form-model-item label="商品描述">
          <a-input v-model="prod.description" type="textarea"></a-input>
        </a-form-model-item>
        <a-form-model-item label="商品价格">
          <a-input v-model="prod.price"></a-input>
        </a-form-model-item>
        <a-form-model-item label="排序">
          <a-input v-model="prod.sort"></a-input>
        </a-form-model-item>
        <a-form-model-item label="商品图片">
          <a-input v-model="prod.img"></a-input>
        </a-form-model-item>
        <a-form-model-item label="状态">
          <a-input v-model="prod.status"></a-input>
        </a-form-model-item>
        <a-form-model-item label="店铺">
          <a-input v-model="prod.store_id"></a-input>
        </a-form-model-item>
        <a-form-model-item label="商品分类">
          <a-input v-model="prod.category_id"></a-input>
        </a-form-model-item>
        <a-form-model-item label="库存">
          <a-input v-model="prod.stock"></a-input>
        </a-form-model-item>
        <a-form-model-item label="是否推荐">
          <a-input v-model="prod.is_recommend"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-card>
</template>

<script>
import StandardTable from "@/components/table/StandardTable"
import {getProductList} from "@/services/product"
import {getCategoryOption} from "@/services/category"

const dataSource = [];
let categories = {};
const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '商品名称',
    dataIndex: 'name'
  },
  {
    title: '商品描述',
    dataIndex: 'description',

    ellipsis: true
  },
  {
    title: '商品分类',
    dataIndex: 'category_id',
    customRender: (category) => {
      return categories[category].name ? categories[category].name : category;
    }
  },
  {
    title: '价格',
    dataIndex: 'price',
    customRender: (price) => '￥' + price
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: (status) => {
      if(status == 1){
        return '已上架';
      }else if(status == 0){
        return '已下架';
      }
    }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action'}
  }
];


export default {
  name: "ProductList",
  components: {StandardTable},
  data() {
    return {
      advanced: true,
      columns: columns,
      dataSource: dataSource,
      selectedRows: [],
      pagination: {},
      loading: false,
      categories: categories,
      form: {}
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getDataSource()
      this.getCategories()
    },
    getDataSource(params = {}){
      this.loading = true;
      getProductList({
        ...params
      }).then(res => {
        this.dataSource = res.data.data;
        this.pagination = res.data.meta.pagination;
        this.loading = false;
      });
    },
    getCategories() {
      getCategoryOption().then(res => {
        categories = res.data;
        this.categories = res.data;
      });
    },
    selectedProd() {
      this.getDataSource(this.form);
    },
    clearForm() {
      this.form = {};
    },
    addProd() {
      console.log('添加商品');
    },
    deleteProd() {
      console.log('批量删除');
    },
    onClear() {
      console.log('clear');
    },
    onChange(pagination) {
      const pager = {...this.pagination};
      pager.current = pagination.current;
      this.pagination = pager;
      this.getDataSource({
        page: pagination.current
      });
    },
    onSelectChange() {
      console.log('select')
    },
    deletedProd(id){
      console.log('删除');
      console.log(id);
    },
    onStatusTitleClick() {
      console.log('状态改变');
    }
  }
}
</script>

<style scoped>
 .fold{
   width: calc(100% - 216px);
   display: inline-block;
 }
 .operator{
   margin-bottom: 18px;
 }
 @media screen and (max-width: 900px) {
   .fold{
     width: 100%;
   }
 }
</style>