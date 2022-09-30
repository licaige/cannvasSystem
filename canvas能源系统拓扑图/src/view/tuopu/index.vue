<template>
  <div class="layout">
    <Layout>
      <Header :style="{position: 'fixed', width: '100%',padding:0}">
        <Menu mode="horizontal" theme="dark" active-name="0" @on-select="onSelect">
          <div class="layout-nav">
            <MenuItem v-for="(v,i) in dataAll" :name="i">
              <Icon type="ios-navigate"></Icon>
              {{v.nodeName}}
            </MenuItem>
            <!--<MenuItem name="item2">
              <Icon type="ios-keypad"></Icon>
              采暖系统
            </MenuItem>-->
            <div style="clear: both"></div>
          </div>
        </Menu>
      </Header>
      <Content :style="{margin: '64px 0px 0', background: '#333', minHeight: '600px'}">
        <component :is="activeSolt" :propsData="propsData"></component>
      </Content>
    </Layout>
  </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import item0 from './item0'
    import item1 from './item1'
    export default {
        name: "index",
        mixins: [],
        props: {},
        components: {
          item0,
          item1
        },
        computed: {},
        data() {
            return {
              activeSolt:"item0",
              dataAll:[],
              propsData:{}
            }
        },
        methods: {
          ...mapActions(['getAll']),
          init(){
            this.getData();
          },
          //切换
          onSelect(name){
            this.activeSolt = `item${name}`;
            this.$set(this,'propsData',this.dataAll[name]);
          },
          getData(){
            let params = {},
                callback = res => {
                  if(res.status === 200){
                    this.dataAll = res.data.memberNodes;
                    this.propsData = res.data.memberNodes[0];
                  }else {
                    this.$Message.error('异常')
                  }
                };
            this.getAll(params).then(res => callback(res))
          },
        },
        created() {
        },
        mounted() {
          this.init();
        }
    }
</script>

<style scoped>
  .layout{
    border: 0;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 240px;
    margin: 0 auto;
  }
  .layout-footer-center{
    text-align: center;
  }
</style>
