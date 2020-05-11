export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0
        }
    },
    methods: {
        // 每页数
        sizeChangeHandle(val) {
            this.pageSize = val;
            this.pageIndex = 1;
            this.getDataList();
        },
        // 当前页
        currentChangeHandle(val) {
            console.log(val);
            this.pageIndex = val;
            console.log(this.pageIndex);
            this.getDataList();
        },
    }
}
