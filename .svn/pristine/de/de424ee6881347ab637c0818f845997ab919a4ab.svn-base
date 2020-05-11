export default {
    namespaced: true,
    state: {
        // 页面文档可视高度(随窗口改变大小)
        documentClientHeight: 0,
        mainClientWidth: 0,
        mainClientHeight: 0,
        // 导航条, 布局风格, defalut(默认) / inverse(反向)
        navbarLayoutHeaderType: 'default',
        // 侧边栏, , light(浅色) / dark(黑色)布局皮肤
        sidebarLayoutSkin: 'dark',
        // 侧边栏, 折叠状态
        sidebarFold: false,
        // 侧边栏, 菜单
        menuList: [],
        menuActiveName: '',
        // 主入口标签页
        mainTabs: [],
        mainTabsActiveName: '',
        // 主题样式
        themeStyle: '#997B71'
    },
    mutations: {
        updateMainClientWidth(state, width) {
            state.mainClientWidth = width
        },
        updateDocumentClientHeight(state, height) {
            state.documentClientHeight = height
        },
        updateMainClientHeight(state, height) {
            state.mainClientHeight = height
        },
        updateNavbarLayoutHeaderType(state, type) {
            state.navbarLayoutHeaderType = type
        },
        updateSidebarLayoutSkin(state, skin) {
            state.sidebarLayoutSkin = skin
        },
        updateSidebarFold(state, fold) {
            state.sidebarFold = fold
        },
        updateMenuList(state, list) {
            state.menuList = list
        },
        updateMenuActiveName(state, name) {
            state.menuActiveName = name
        },
        updateMainTabs(state, tabs) {
            state.mainTabs = tabs
        },
        updateMainTabsActiveName(state, name) {
            state.mainTabsActiveName = name
        },
        updateThemeStyle(state, themeStyle) {
            state.themeStyle = themeStyle
        }
    },
    actions: {
        updateThemeStyle({ commit }, themeStyle) {
            // 提交mutation的请求
            commit('updateThemeStyle', { themeStyle })
        }
    },
    getter: {
        themeStyle(state) {
            return this.state.themeStyle
        }
    }
}
