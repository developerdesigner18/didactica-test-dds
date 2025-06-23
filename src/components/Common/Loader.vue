<template>
  <div :class="['lxp-loader', loaderClass]">
    <b-spinner :variant="variant"></b-spinner>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary"
    },
    loaderClass: {
      type: String
    }
  }
};
</script>

<style lang="scss">
.lxp-loader {
  min-height: 200px;
  @include flex-horizontal-center;
  .spinner-border {
    &.text-primary {
      color: $brand-primary-400 !important;
    }
  }
}
</style>
