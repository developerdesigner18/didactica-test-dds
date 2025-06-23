<template>
  <b-button
    @click="$emit('click')"
    :variant="variant"
    :pill="pill"
    :disabled="disabled"
    :class="rootClasses"
    :size="size"
    :block="block"
    ><slot></slot
  ></b-button>
</template>
<script>
export default {
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value) => {
        // The value must match one of these strings
        return (
          [
            "primary",
            "outline-primary",
            "accent",
            "outline-accent",
            "success",
            "outline-success",
            "grey",
            "warning",
            "outline-warning",
            "link",
            "danger",
            "outline-danger",
            "link-danger",
            "secondary1",
            "outline-secondary1",
            "link-secondary1"
          ].indexOf(value) !== -1
        );
      }
    },
    pill: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: "sm",
      validator: (value) => {
        return ["sm", "lg", "default"].indexOf(value) !== -1;
      }
    },
    round: {
      type: Boolean,
      default: false
    },
    elevate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    rootClasses() {
      return [
        "lxp-button",
        this.className,
        { "lxp-button__round": this.round },
        { "lxp-button__elevate": this.elevate }
      ];
    }
  }
};
</script>
<style lang="scss" scoped>
.lxp-button {
  &.btn {
    border-radius: 100px;
    height: $btn-default-height;
    padding: $btn-padding-x-default $btn-padding-y-default;
    @include flex-horizontal-center;

    &:focus {
      box-shadow: none;
    }
    // disabled
    &.disabled {
      cursor: not-allowed;
      border-color: $brand-neutral-75;
      background-color: $brand-neutral-75 !important;
      color: $brand-neutral-300 !important;
    }

    // size
    &.btn-sm {
      padding: $btn-padding-x-sm $btn-padding-y-sm;
      height: $btn-sm-height;
      @include button-small;
    }
    &.btn-lg {
      padding: $btn-padding-x-lg $btn-padding-y-lg;
      height: $btn-lg-height;
      @include button-large;
    }
    &.btn-default {
      @include button-medium;
    }

    // outline-primary
    &.btn-outline-primary {
      color: $brand-primary;
      border-color: $brand-primary;

      &:hover,
      &:focus {
        background-color: $brand-primary-100;
      }
      &:active {
        border-color: $brand-primary;
        color: $brand-primary;
        background-color: #fff;
        &:focus {
          box-shadow: none;
        }
      }
    }
    &.btn-outline-accent {
      color: $brand-primary-400;
      border-color: $brand-primary-400;

      &:hover,
      &:focus,
      &:active {
        color: $brand-primary-400;
        border-color: $brand-primary-400;
        background-color: $brand-primary-100;
        box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
      }
    }

    // outline style
    &.btn-outline-success,
    &.btn-outline-primary,
    &.btn-outline-accent,
    &.btn-outline-primary-vle,
    &.btn-outline-warning,
    &.btn-outline-danger {
      box-shadow: none;
      border: 2px solid;
      outline: none;
      background-color: transparent;
      &.disabled {
        background-color: #fff !important;
        border: 2px solid $brand-neutral-300;
        color: $brand-neutral-300;
      }
    }
    // round button
    &.lxp-button__round {
      padding: $btn-padding-x-sm;
      width: $btn-default-height;
      height: $btn-default-height;
      // size
      &.btn-sm {
        width: $btn-sm-height;
        height: $btn-sm-height;
      }
      &.btn-lg {
        width: $btn-sm-height;
        height: $btn-lg-height;
      }
    }

    // elevated
    &.lxp-button__elevate {
      box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
    }
  }

  // primary
  &.btn-primary {
    border: none;
    background-color: $brand-primary;
    color: $button-primary-text;
    &:hover,
    &:focus {
      background-color: $button-primary-hover;
      color: $button-primary-hover-text;
      box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
    }
    &:active {
      background-color: $brand-primary !important;
      color: $button-primary-text !important;
      border: none !important;
    }
    &:focus,
    &:active {
      box-shadow: none !important;
    }
  }

  // accent
  &.btn-accent {
    background-color: $brand-primary-400;
    color: $brand-primary-50;
    &:hover,
    &:focus,
    &:active {
      background-color: $button-primary-hover !important;
      color: $brand-primary-50 !important;
    }
  }

  // danger
  &.btn-danger {
    background: $brand-error-400;
    border: 2px solid $brand-error-400;
    color: #fff;
    &:hover,
    &:focus {
      background-color: $brand-error-600;
    }
  }

  // outline-danger
  &.btn-outline-danger {
    color: $brand-error-400 !important;
    border-color: $brand-error-400 !important;
    &:hover,
    &:focus {
      background-color: $brand-error-100;
    }
    &:active {
      background-color: #fff !important;
      &:focus {
        box-shadow: none !important;
      }
    }
  }
  // link danger
  &.btn-link-danger {
    color: $brand-error-400;
    text-decoration: none;
    &.disabled {
      background: #fff !important;
      border: none;
    }
    &:hover,
    &:focus {
      background: $brand-error-100;
      color: $brand-error-400;
    }
  }

  // success
  &.btn-success {
    border: $brand-success-400;
    background-color: $brand-success-400;
    color: #fff;
    &:hover {
      border: $brand-success-600;
      background-color: $brand-success-600;
    }
  }

  // outline-info
  &.btn-outline-success {
    color: $brand-success-400;
    border-color: $brand-success-400;
    background: transparent;
    &:hover {
      background-color: $brand-success-100;
    }
  }

  // outline-info
  &.btn-outline-transparent {
    border: 1px solid #0057e0;
    border-radius: 100px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
    color: #0057e0;
    background-color: white;

    &:hover {
      background-color: white;
    }
  }
  // warning
  &.btn-warning {
    background: $brand-warning-400;
    border-color: $brand-warning-400;
    color: white !important;
    border: none;
    &:hover,
    &:focus {
      background-color: $brand-warning-600;
    }
  }
  &.btn-outline-warning {
    color: $brand-warning-400 !important;
    border: none;
    &:hover,
    &:active {
      background: $brand-warning-100 !important;
    }
  }

  // link
  &.btn-link {
    color: $brand-primary;
    text-decoration: none;
    &.disabled {
      background: #fff !important;
      border: none;
    }
    &:hover,
    &:focus {
      background: $brand-primary-100;
      color: $brand-primary-400;
    }
    &:active {
      background: #fff;
      color: $brand-primary;
    }
  }

  // block button
  &.btn-block {
    display: block;
    width: 100%;
  }

  // secondary1
  &.btn-secondary1 {
    background: $brand-secondary1-400;
    border-color: $brand-secondary1-400;
    color: white !important;
    border: none;
    &:hover,
    &:focus {
      background-color: $brand-secondary1-600;
    }
  }
  &.btn-outline-secondary1 {
    color: $brand-secondary1-400 !important;
    border-width: 2px;
    &:hover,
    &:active {
      background: $brand-secondary1-100 !important;
    }
  }

  // link secondary1
  &.btn-link-secondary1 {
    color: $brand-secondary1-400;
    text-decoration: none;
    &.disabled {
      background: #fff !important;
      border: none;
    }
    &:hover,
    &:focus {
      background: $brand-secondary1-100;
      color: $brand-secondary1-400;
    }
  }
}
</style>
