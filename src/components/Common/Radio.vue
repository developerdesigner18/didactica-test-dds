<template>
  <div
    :class="[
      'lxp-radio',
      `lxp-radio__${variant}`,
      { 'lxp-radio--disabled': disabled }
    ]"
  >
    <b-form-radio
      v-if="!hasOptions"
      :id="id"
      :name="name"
      :value="value"
      :disabled="disabled"
      v-model="selected"
      @input="onInput"
    >
      {{ text }}
    </b-form-radio>
    <b-form-radio-group
      v-else
      :id="id"
      v-model="selected"
      :options="options"
      :name="name"
      :stacked="stacked"
      @input="onInput"
    ></b-form-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: "lxp-radio-group"
    },
    stacked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectedVal: {
      type: String
    },
    name: {
      type: String,
      default: "radio-options"
    },
    text: {
      type: String
    },
    value: {
      type: String
    },
    variant: {
      type: String,
      default: "primary",
      validator: (value) => {
        return ["primary", "secondary1"].indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      selected: ""
    };
  },
  watch: {
    //added to check if value is changed dynamicallly
    selectedVal(newValue, oldValue) {
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
    this.setValue(this.selectedVal);
  },
  methods: {
    setValue(val) {
      this.selected = val;
    },
    onInput() {
      this.$emit("input", this.selected);
    },
    resetData() {
      this.selected = "";
    }
  }
};
</script>

<style lang="scss">
@mixin radioColor($primary, $secondary) {
  //   hover & focused state
  &:hover,
  :focus {
    ~ .custom-control-label {
      &::before {
        background: url("https://files.lxp.academy.who.int/didactica/assets/images/radio/unselected-hover.svg")
          no-repeat;
      }
    }
  }
  //   pressed state
  &:active {
    ~ .custom-control-label {
      &::before {
        background: url("https://files.lxp.academy.who.int/didactica/assets/images/radio/unselected-active.svg")
          no-repeat;
      }
    }
  }
  &:checked {
    ~ .custom-control-label {
      &:hover {
        &::before {
          background: url("https://files.lxp.academy.who.int/didactica/assets/images/radio/selected-hover.svg")
            no-repeat;
        }
      }
      &:active {
        &::before {
          background: url("https://files.lxp.academy.who.int/didactica/assets/images/radio/selected-active.svg")
            no-repeat;
        }
      }
    }
  }
}
.lxp-radio {
  .custom-radio {
    display: flex;
    &.custom-control-inline {
      display: inline-flex;
      margin-right: 1rem;
    }
    .custom-control-input {
      display: none;
      @include radioColor($brand-primary, $brand-primary-400);
      &:checked {
        ~ .custom-control-label {
          &::before {
            background: url("https://files.lxp.academy.who.int/didactica/assets/images/radio/selected.svg")
              no-repeat;
          }
        }
      }
      // disabled styles
      &[disabled] {
        ~ .custom-control-label {
          color: $brand-neutral-300;
          pointer-events: none;
          &::before {
            background: url("https://files.lxp.academy.who.int/didactica/assets/images/radio/unselected-disabled.svg")
              no-repeat;
          }
        }
        &:checked {
          ~ .custom-control-label {
            &::before {
              background: url("https://files.lxp.academy.who.int/didactica/assets/images/radio/selected-disabled.svg")
                no-repeat;
            }
          }
        }
      }
    }
    .custom-control-label {
      @include label-large($brand-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      &::before {
        content: "";
        display: inline-flex;
        width: 24px;
        height: 24px;
        background: url("https://files.lxp.academy.who.int/didactica/assets/images/radio/unselected.svg")
          no-repeat;
        box-shadow: none !important;
        margin-right: 8px;
      }
    }
  }
  // secondary1
  &.lxp-radio__secondary1 {
    .custom-radio {
      .custom-control-input {
        @include radioColor($brand-secondary1-400, $brand-secondary1-400);
      }
      .custom-control-label {
        &::before {
          border-color: $brand-neutral-700;
        }
      }
    }
  }
}
</style>
