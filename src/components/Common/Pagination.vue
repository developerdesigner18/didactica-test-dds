<template>
  <div class="lxp-pagination">
    <b-pagination
      v-model="cPage"
      :total-rows="rows"
      :per-page="perPage"
      first-number
    ></b-pagination>
  </div>
</template>

<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 10
    },
    perPage: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      cPage: 0
    };
  },
  watch: {
    cPage(newValue) {
      this.$emit("update:currentPage", newValue);
    }
  },
  created() {
    this.cPage = this.currentPage;
  }
};
</script>

<style lang="scss">
$border-radius: 100px;
.lxp-pagination {
  .page-item {
    background: $brand-primary-75;
    &:first-child,
    &:first-child .page-link {
      border-top-left-radius: $border-radius;
      border-bottom-left-radius: $border-radius;
    }
    &:last-child,
    &:last-child .page-link {
      border-top-right-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
    &.active {
      .page-link {
        background: $brand-primary-100;
        border-radius: $border-radius;
        color: $brand-primary-400;
      }
    }
    &.disabled {
      .page-link {
        background: $brand-primary-75;
      }
    }
    .page-link {
      border: none;
      background: $brand-primary-75;
      @include body-medium;
      color: #092c4e;
    }
  }
}
</style>
