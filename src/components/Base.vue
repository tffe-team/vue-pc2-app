<template>
  <div class="m-layout">
    <Layout>
      <Header class="header-bar">
        <Menu mode="horizontal" theme="dark" class="menu-warp" :active-name="activeName" :open-names="openName">
          <h2 class="system-name" @click="toHome">后台系统</h2>
          <div v-for="(v,index) in navList" :key="index">
            <Submenu :name="v.name">
              <template slot="title">
                {{v.title}}
              </template>
              <div v-for="(cur,k) in v.subNav" :key="k">
                <MenuItem @click.native="handleSkip(cur.name)" :name="cur.name" >
                  {{cur.title}}
                </MenuItem>
              </div>
            </Submenu>
          </div>
          <ul class="login-info">
            <li>欢迎你，{{userName}}</li>
            <li class="login-out" @click="userLoginOut">退出</li>
          </ul>
        </Menu>
      </Header>
      <Layout>
        <Layout class="main">
          <Breadcrumb>
            <BreadcrumbItem
              :key="index"
              :to="bread.to"
              v-for="(bread, index) in breadcrumbInfo">{{bread.title}}</BreadcrumbItem>
          </Breadcrumb>
          <Content class="main-info">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { loginOut } from '@/api/index'
import { MenuList, MenuItem} from '@/constants/variableType'
import { menuList } from '@/constants/menu'
@Component
export default class Base extends Vue {
  userName: string|null = localStorage.getItem('realName')
  activeName: string|undefined = ''
  openName: string[] = []
  navList: Array<MenuList> = []
  userLoginOut(): void {
    loginOut((res: any) => {
      if (res.code === 200) {
        this.$Message.success({
          content: '退出登录',
          onClose: (): void => {
            window.location.href = '/login'
          }
        })
      }
    })
  }
  toHome() {
    this.$router.push({path: '/home'})
  }
  handleSkip(name: string) {
    this.activeName = name
    this.$router.push({
      name: name
    })
  }
  get breadcrumbInfo () {
    return this._creatBreadcrumb()
  }
  _creatBreadcrumb() {
    const breadInfo: any = []
    const curName = this.$route.name
    this.navList.forEach((root: MenuList) => {
      if (root.subNav && root.subNav.length) {
        root.subNav.forEach((child: MenuItem) => {
          if (child.name === curName) {
            breadInfo.push({
              title: root.title
            })
            breadInfo.push({
              title: child.title,
              to: { name: child.name }
            })
          }
        })
      }
    })
    return breadInfo
  }
  created() {
    this.navList = menuList
    this._handleMenuAuto()
  }
  _handleMenuAuto () {
    this.activeName = this.$route.name as string
    this.openName = this.$route.matched.map(match => match.name as string)
  }
}
</script>

<style lang="scss" scoped>
.m-layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  height: 100%;
  text-align: left;
  overflow: auto;
  .ivu-layout {
    height: 100%;
  }
  .header-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    padding: 0 10px;
    .menu-warp {
      height: 64px;
      line-height: 64px;
      background: none;
      .system-name {
        float: left;
        font-size: 26px;
        color: #fff;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
  .ivu-layout-header {
    padding: 0 26px;
    padding: 0 26px;
    background: #2173dc;
    background: -webkit-gradient(linear, left top, right top, from(#1d42ab), color-stop(#2173dc), to(#1e93ff));
    background: linear-gradient(90deg, #1d42ab, #2173dc, #1e93ff);
    background-color: rgb(43, 49, 55);
  }
  .login-info {
    float: right;
    color: #fff;
    li {
      display: inline;
      list-style: none;
      padding-right: 10px;
    }
    .login-out {
      cursor: pointer;
    }
  }
  .layout-logo {
    width: 198px;
    height: 30px;
    float: left;
    position: relative;
    top: 10px;
    left: 0;
    .logo {
      width: 82px;
      height: 37px;
      float: left;
      margin: 4px 4px 0 0;
    }
  }
  .user-info {
    cursor: pointer;
    font-size: 12px;
    .user-icon {
      vertical-align: text-bottom;
      line-height: .85;
      &.power {
        margin-right: 2px;
      }
    }
  }
  .poptip-list {
    li {
      display: block;
      line-height: 2;
      cursor: pointer;
      color: #666;
      &:hover{
        color: #57a3f3;
      }
    }
  }
  .main {
    padding: 64px 20px 20px 20px;
    .ivu-breadcrumb {
      margin: 16px 0px;
    }
    .main-info {
      padding: 24px;
      background: #fff;
    }
  }
}
</style>
