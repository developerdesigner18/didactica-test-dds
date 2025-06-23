<template>
  <div :class="['lxp-toggle', { 'lxp-toggle__disabled': disabled }]">
    <input type="checkbox" :id="id" v-model="toggle" />
    <label :for="id">Toggle</label>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "switch"
    },
    toggleState: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toggle: this.toggleState
    };
  },
  watch: {
    toggle(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit("update:toggleState", newValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.lxp-toggle {
  display: flex;
  input[type="checkbox"] {
    height: 0;
    width: 0;
    visibility: hidden;
    &:checked {
      + label {
        background: $brand-success-400;
        &:after {
          left: calc(100% - 5px);
          transform: translateX(-100%);
          background: $brand-success-100;
          box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
        }
      }
    }
  }
  label {
    cursor: pointer;
    text-indent: -9999px;
    width: 64px;
    height: 30px;
    background: $brand-neutral-300;
    display: block;
    border-radius: 100px;
    padding: 4px 4px 4px 8px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 3px;
      left: 4px;
      width: 24px;
      height: 24px;
      background: $brand-neutral-75;
      border-radius: 90px;
      transition: 0.3s;
      box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
    }
  }
  &.lxp-toggle__disabled {
    pointer-events: none;
    input[type="checkbox"] {
      &:checked {
        + label {
          background: $brand-neutral-300;
          &::after {
            background: $brand-neutral-75;
          }
        }
      }
    }
  }
}
</style>
