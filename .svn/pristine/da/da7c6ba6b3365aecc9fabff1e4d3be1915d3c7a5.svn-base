<!--  -->
<template>
  <div class="popover_reference">
    <div class="chart_popover">
        <div class="popover_title"></div>
        <div class="popover_content">
          <slot></slot>
        </div>
      </div>
    <slot name="reference" class="reference">
      
    </slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.popover_reference {
  position: relative;
  display: inline-block;
}
.popover_reference:hover {
  .chart_popover {
    display: block;
  }
}
.reference{}
.chart_popover {
  position: absolute;
  text-align: left;
  z-index: 9999;
  border-radius: 2px;
  // left: -330px;
  right: 20px;
  top: 10px;
  white-space: nowrap;
  display: none;
  background: #6fa8bc;
  border-color: #6fa8bc;
}
.popover_content {
  line-height: 24px;
  font-size: 14px;
  padding: 3px 8px;
  color: #eee;
}
</style>