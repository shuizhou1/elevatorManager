<template>
  <el-form v-loading="loading">
    <h2>布局设置</h2><hr/>
    <el-form-item>
      <el-radio-group v-model="skinStyle">
        <el-row :gutter="10">
          <el-col class="col-content" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
            <img class="theme-img" @click='checkTheme("classicStyle")' src="./images/classicStyle.png">
            <el-radio class="iteme-btn" label="classicStyle" border>经典样式</el-radio>
          </el-col>
          <el-col class="col-content" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
            <img class="theme-img" @click='checkTheme("violetStyle")' src="./images/violetStyle.png">
            <el-radio class="iteme-btn" label="violetStyle" border>紫色精简</el-radio>
          </el-col>
          <el-col class="col-content" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
            <img class="theme-img" @click='checkTheme("greenStyle")' src="./images/greenStyle.png">
            <el-radio class="iteme-btn" label="greenStyle" border>绿色护眼</el-radio>
          </el-col>
        </el-row>

      </el-radio-group>
    </el-form-item>

  </el-form>
</template>

<script>
export default {
  data () {
    return {
      loading: true
    }
  },
  computed: {
    // 属性皮肤样式
    skinStyle: {
      get () {
        var localSkinStyle = window.localStorage.getItem('VUE_SKIN_STYLE') // 获取本地存储的localSkinStyle
        // 判断本地本地存储的localSkinStyle是否存在，不存在使用默认值
        if (localSkinStyle === null || localSkinStyle === 'undefined') {
          localSkinStyle = this.$store.state.theme.skinStyle
        }
        return localSkinStyle
      },
      set (value) {
        if (value !== null && value === 'classicStyle') {
          // 设置主题样式
          window.localStorage.setItem('VUE_THEME_STYLE', '#17B3A3')
          this.$store.dispatch('theme/updateThemeStyle', '#17B3A3')
          // navbar头部header样式
          window.localStorage.setItem('VUE_NABAR_LAYOUT_HEADER_STYLE', 'header--2c7eff')
          this.$store.commit('theme/updateNavbarLayoutHeaderStyle', 'header--2c7eff')
          // navbar头部body样式
          window.localStorage.setItem('VUE_NABAR_LAYOUT_BODY_STYLE', 'body--2c7eff')
          this.$store.commit('theme/updateNavbarLayoutBodyStyle', 'body--2c7eff')
          // 菜单样式
          window.localStorage.setItem('VUE_SIDE_BAR_LAYOUT_SKIN_STYLE', 'menu--4080ff')
          this.$store.commit('theme/updateSidebarLayoutSkinStyle', 'menu--4080ff')
          // 背景颜色
          window.localStorage.setItem('VUE_EL_CARD_BGC_STYLE', 'FFFFFF')
          this.$store.commit('theme/updateElCardBgcStyle', 'FFFFFF')
        } else if (value !== null && value === 'violetStyle') {
          // 设置主题样式
          window.localStorage.setItem('VUE_THEME_STYLE', '#9463F7')
          this.$store.dispatch('theme/updateThemeStyle', '#9463F7')
          // navbar头部header样式
          window.localStorage.setItem('VUE_NABAR_LAYOUT_HEADER_STYLE', 'header--7F63F4')
          this.$store.commit('theme/updateNavbarLayoutHeaderStyle', 'header--7F63F4')
          // navbar头部body样式
          window.localStorage.setItem('VUE_NABAR_LAYOUT_BODY_STYLE', 'body--7F63F4')
          this.$store.commit('theme/updateNavbarLayoutBodyStyle', 'body--7F63F4')
          // 菜单样式
          window.localStorage.setItem('VUE_SIDE_BAR_LAYOUT_SKIN_STYLE', 'menu--7F63F4')
          this.$store.commit('theme/updateSidebarLayoutSkinStyle', 'menu--7F63F4')
          // 背景颜色
          window.localStorage.setItem('VUE_EL_CARD_BGC_STYLE', 'F3F6F9')
          this.$store.commit('theme/updateElCardBgcStyle', 'F3F6F9')
        } else if (value !== null && value === 'greenStyle') {
          // 设置主题样式
          window.localStorage.setItem('VUE_THEME_STYLE', '#997B71')
          this.$store.dispatch('theme/updateThemeStyle', '#997B71')
          // navbar头部header样式
          window.localStorage.setItem('VUE_NABAR_LAYOUT_HEADER_STYLE', 'header--997B71')
          this.$store.commit('theme/updateNavbarLayoutHeaderStyle', 'header--997B71')
          // navbar头部body样式
          window.localStorage.setItem('VUE_NABAR_LAYOUT_BODY_STYLE', 'body--997B71')
          this.$store.commit('theme/updateNavbarLayoutBodyStyle', 'body--997B71')
          // 菜单样式
          window.localStorage.setItem('VUE_SIDE_BAR_LAYOUT_SKIN_STYLE', 'menu--997B71')
          this.$store.commit('theme/updateSidebarLayoutSkinStyle', 'menu--997B71')
          // 背景颜色
          window.localStorage.setItem('VUE_EL_CARD_BGC_STYLE', '997B71')
          this.$store.commit('theme/updateElCardBgcStyle', '997B71')
        }

        // 设置皮肤样式参数值
        window.localStorage.setItem('VUE_SKIN_STYLE', value)
        this.$store.commit('theme/updateSkinStyle', value)
        window.location.reload()
      }
    }
  },
  beforeCreate () {
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  methods: {
    checkTheme (value) {
      if (value !== null) {
        this.changeSkinStyle(value)
      }
    },
    changeSkinStyle (value) {
      if (value !== null && value === 'classicStyle') {
        // 设置主题样式
        window.localStorage.setItem('VUE_THEME_STYLE', '#17B3A3')
        this.$store.dispatch('theme/updateThemeStyle', '#17B3A3')
        // navbar头部header样式
        window.localStorage.setItem('VUE_NABAR_LAYOUT_HEADER_STYLE', 'header--23262E')
        this.$store.commit('theme/updateNavbarLayoutHeaderStyle', 'header--23262E')
        // navbar头部body样式
        window.localStorage.setItem('VUE_NABAR_LAYOUT_BODY_STYLE', 'body--23262E')
        this.$store.commit('theme/updateNavbarLayoutBodyStyle', 'body--23262E')
        // 菜单样式
        window.localStorage.setItem('VUE_SIDE_BAR_LAYOUT_SKIN_STYLE', 'menu--393D49')
        this.$store.commit('theme/updateSidebarLayoutSkinStyle', 'menu--393D49')
        // 背景颜色
        window.localStorage.setItem('VUE_EL_CARD_BGC_STYLE', 'FFFFFF')
        this.$store.commit('theme/updateElCardBgcStyle', 'FFFFFF')
      } else if (value !== null && value === 'violetStyle') {
        // 设置主题样式
        window.localStorage.setItem('VUE_THEME_STYLE', '#9463F7')
        this.$store.dispatch('theme/updateThemeStyle', '#9463F7')
        // navbar头部header样式
        window.localStorage.setItem('VUE_NABAR_LAYOUT_HEADER_STYLE', 'header--7F63F4')
        this.$store.commit('theme/updateNavbarLayoutHeaderStyle', 'header--7F63F4')
        // navbar头部body样式
        window.localStorage.setItem('VUE_NABAR_LAYOUT_BODY_STYLE', 'body--7F63F4')
        this.$store.commit('theme/updateNavbarLayoutBodyStyle', 'body--7F63F4')
        // 菜单样式
        window.localStorage.setItem('VUE_SIDE_BAR_LAYOUT_SKIN_STYLE', 'menu--7F63F4')
        this.$store.commit('theme/updateSidebarLayoutSkinStyle', 'menu--7F63F4')
        // 背景颜色
        window.localStorage.setItem('VUE_EL_CARD_BGC_STYLE', 'F3F6F9')
        this.$store.commit('theme/updateElCardBgcStyle', 'F3F6F9')
      } else if (value !== null && value === 'greenStyle') {
        // 设置主题样式
        window.localStorage.setItem('VUE_THEME_STYLE', '#997B71')
        this.$store.dispatch('theme/updateThemeStyle', '#997B71')
        // navbar头部header样式
        window.localStorage.setItem('VUE_NABAR_LAYOUT_HEADER_STYLE', 'header--997B71')
        this.$store.commit('theme/updateNavbarLayoutHeaderStyle', 'header--997B71')
        // navbar头部body样式
        window.localStorage.setItem('VUE_NABAR_LAYOUT_BODY_STYLE', 'body--997B71')
        this.$store.commit('theme/updateNavbarLayoutBodyStyle', 'body--997B71')
        // 菜单样式
        window.localStorage.setItem('VUE_SIDE_BAR_LAYOUT_SKIN_STYLE', 'menu--997B71')
        this.$store.commit('theme/updateSidebarLayoutSkinStyle', 'menu--997B71')
        // 背景颜色
        window.localStorage.setItem('VUE_EL_CARD_BGC_STYLE', '997B71')
        this.$store.commit('theme/updateElCardBgcStyle', '997B71')
      }

      // 设置皮肤样式参数值
      window.localStorage.setItem('VUE_SKIN_STYLE', value)
      this.$store.commit('theme/updateSkinStyle', value)
      window.location.reload()
    }
  }
}
</script>

<style>
  .col-content{
    min-height: 45px;
  }
  .ebi-display{
    display: none;
  }
  .el-radio-group{
    /* 响应式布局重新el-radio-group样式*/
    display: block;
  }

  .theme-img{
    width: 90%;
    height: auto;
    padding: 10px 5%;
  }
  .iteme-btn{
    width: 90%;
    padding-left: 5%;
  }
</style>
