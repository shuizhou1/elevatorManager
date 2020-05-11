const config = {
    typeMapList: {},
    typeList: [
        {
            label: '请选择',
            id: null
        },
        {
            label: '故障',
            id: 0
        },
        {
            label: '困人',
            id: 1
        },
        {
            label: '投诉',
            id: 2
        }
    ],
    stateList: [
        {
            label: '请选择',
            id: null
        },
        {
            label: '待处理',
            id: 0
        },
        {
            label: '完成',
            id: 1
        },
        {
            label: '转办',
            id: 2
        },
        {
            label: '处理中',
            id: 3
        },
        {
            label: '待话务员处理',
            id: 4
        }
    ],
    fromList: [
        {
            label: '请选择',
            id: null
        },
        {
            label: 'PC',
            id: 1
        },
        // {
        //     label: '微信',
        //     id: 2
        // },
        {
            label: '安卓',
            id: 3
        },
        // {
        //     label: 'iOS',
        //     id: 4
        // },
        // {
        //     label: '平板',
        //     id: 5
        // },
        // {
        //     label: '外部某系统',
        //     id: 6
        // },
        {
            label: '96333',
            id: 6
        }
    ],
    color: ['#2F6A92', '#8ec9b8', '#f9e29c', '#28c3d9', '#8cd7c1', '#a9dfcf', '#13b7ce', '#25c6dd', '#3bcce1', '#74b8b9', '#3bcce1', '#16bad1'],
    tableDragend: true,
    tableDragendHandle: function (n, o, item) {
        if (this.tableDragend) {
            item.width = o
        }
    }
}

config.typeList.forEach(item => {
    if (item.id || item.id === 0) {
        config.typeMapList[item.id] = item.label
    }
})

export default config
