<template>
  <div :class="['lxp-progress', `lxp-progress--${size}`]">
    <b-progress
      :value="value"
      :max="max"
      :show-progress="showProgress"
      :animated="animated"
      :show-value="showValue"
      :variant="progressVariant"
      :striped="striped"
    ></b-progress>
    <span class="lxp-progress__value" v-if="showProgressValue">{{
      hasError ? "Error" : `${value} %`
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value) => {
        return (
          [
            "primary",
            "success",
            "grey",
            "warning",
            "danger",
            "secondary1"
          ].indexOf(value) !== -1
        );
      }
    },
    size: {
      type: String,
      default: "small",
      validator: (value) => {
        return ["small", "large"].indexOf(value) !== -1;
      }
    },
    value: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 0
    },
    showProgress: {
      type: Boolean,
      default: false
    },
    showValue: {
      type: Boolean,
      default: false
    },
    animated: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    hasError: {
      type: Boolean,
      default: false
    },
    showProgressValue: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    progressVariant() {
      let variant = this.variant;
      if (this.value >= this.max) {
        variant = "success";
      }
      if (this.hasError) {
        variant = "danger";
      }
      return variant;
    }
  }
};
</script>

<style lang="scss">
$progress-height-sm: 4px;
$progress-height-lg: 8px;
.lxp-progress {
  @include flex-horizontal-center;
  &.lxp-progress--small {
    .progress {
      height: $progress-height-sm;
    }
  }
  .progress {
    flex-grow: 1;
    height: $progress-height-lg;
    background-color: $brand-primary-75;
    .progress-bar {
      &.bg-secondary1 {
        background-color: $brand-secondary1-400 !important;
      }
    }
  }

  .lxp-progress__value {
    @include label-large;
    margin-left: 15px;
  }
}
</style>
