<template>
  <div
    :class="[
      'lxp-checkbox',
      { 'lxp-checkbox--disabled': disabled },
      `lxp-checkbox__${variant}`
    ]"
  >
    <b-form-checkbox
      v-if="!hasOptions"
      :id="id"
      :name="id"
      :disabled="disabled"
      v-model="checked"
      @input="onInput"
    >
      {{ text }}
    </b-form-checkbox>
    <b-form-checkbox-group
      v-else
      :id="id"
      v-model="selected"
      :options="options"
      :name="id"
      @input="onInput"
    ></b-form-checkbox-group>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "checkbox-1"
    },
    text: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Boolean, Array]
    },
    variant: {
      type: String,
      default: "primary",
      validator: (value) => {
        return ["primary", "success"].indexOf(value) !== -1;
      }
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checked: false,
      selected: []
    };
  },
  watch: {
    //added to check if value is changed dynamicallly
    value(newValue, oldValue) {
      if (oldValue !== newValue) {
        this.setValue(newValue);
      }
    }
  },
  computed: {
    hasOptions() {
      return this.options.length !== 0;
    }
  },
  mounted() {
    this.setValue(this.value);
  },
  methods: {
    onInput() {
      if (this.hasOptions) {
        this.$emit("input", this.selected);
      } else {
        this.$emit("input", this.checked);
      }
    },
    setValue(val) {
      if (this.hasOptions && Array.isArray(val)) {
        this.selected = val;
      } else {
        this.checked = val;
      }
    },
    resetData() {
      this.selected = [];
      this.checked = false;
    }
  }
};
</script>

<style lang="scss">
@mixin checkboxColor($primary, $secondary) {
  //   hover & focused state
  &:hover {
    ~ .custom-control-label {
      &::before {
        background: url("https://files.lxp.academy.who.int/didactica/assets/images/checkbox/unchecked-hover.svg")
          no-repeat;
      }
    }
  }
  &:focus {
    ~ .custom-control-label {
      &::before {
        background: url("https://files.lxp.academy.who.int/didactica/assets/images/checkbox/unchecked-focus.svg")
          no-repeat;
      }
    }
  }
  //   pressed state
  &:active {
    ~ .custom-control-label {
      &::before {
        background: url("https://files.lxp.academy.who.int/didactica/assets/images/checkbox/unchecked-pressed.svg")
          no-repeat;
      }
    }
  }
  &:checked {
    ~ .custom-control-label {
      &:hover {
        &::before {
          background: url("https://files.lxp.academy.who.int/didactica/assets/images/checkbox/checked-hover.svg")
            no-repeat;
        }
      }
      &:active {
        &::before {
          background: url("https://files.lxp.academy.who.int/didactica/assets/images/checkbox/checked-pressed.svg")
            no-repeat;
        }
      }
    }
  }
}
.lxp-checkbox {
  &.lxp-checkbox--disabled {
    .custom-checkbox {
      pointer-events: none;
      cursor: not-allowed;
      .custom-control-label {
        color: $brand-neutral-300;
        &::before {
          background: url("https://files.lxp.academy.who.int/didactica/assets/images/checkbox/unchecked-disabled.svg")
            no-repeat;
        }
      }
      .custom-control-input {
        &:checked {
          ~ .custom-control-label {
            &::before {
              background: url("https://files.lxp.academy.who.int/didactica/assets/images/checkbox/checked-disabled.svg")
                no-repeat;
            }
          }
        }
      }
    }
  }
  .custom-checkbox {
    display: flex;
    .custom-control-input {
      display: none;
      @include checkboxColor($brand-primary, $brand-primary-400);
      &:checked {
        ~ .custom-control-label {
          &::before {
            background: url("https://files.lxp.academy.who.int/didactica/assets/images/checkbox/checked.svg")
              no-repeat;
          }
        }
      }
    }
    .custom-control-label {
      @include label-large($brand-primary);
      display: flex;
      align-items: center;
      cursor: pointer;
      &::before {
        content: "";
        display: inline-flex;
        width: 24px;
        height: 24px;
        background: url("https://files.lxp.academy.who.int/didactica/assets/images/checkbox/unchecked.svg")
          no-repeat;
        box-shadow: none !important;
        margin-right: 8px;
      }
    }
  }
  &.lxp-checkbox__success {
    .custom-checkbox {
      .custom-control-input {
        @include checkboxColor($brand-secondary4-400, $brand-secondary4-400);
      }
      .custom-control-label {
        &::before {
          border-color: $brand-secondary4-400;
        }
      }
    }
  }
}
</style>
