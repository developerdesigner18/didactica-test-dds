<template>
  <div class="lxp-pills">
    <div class="badge_list">
      <b-badge
        tabindex="0"
        @keydown.enter="$emit('click', item)"
        @click="$emit('click', item)"
        class="pill"
        pill
        >{{ item && item.name }}</b-badge
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {}
  }
};
</script>

<style lang="scss" scoped>
.lxp-pills {
  ul {
    li {
      list-style: none;
      display: inline;
      margin-right: 10px;
    }
  }
  .pill {
    @include label-medium($font-weight: 500);
    background-color: $brand-primary-75;
    color: $brand-primary;
    margin-top: 10px;
    padding: 4px 8px;
    &:hover {
      background-color: $brand-primary;
      color: #fff;
    }
    cursor: pointer;
  }
}
</style>
