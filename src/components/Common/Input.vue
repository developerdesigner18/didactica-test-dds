<template>
  <div
    :class="[
      'lxp-input',
      { 'lxp-input__error': hasError, 'lxp-input__disabled': disabled }
    ]"
  >
    <div
      :class="{
        'form-floating': isFloating,
        'lxp-input__div': !isFloating,
        'form-floating--hover': onHover,
        'form-floating--focus': onFocus,
        'form-floating--no-label': !label
      }"
    >
      <div
        v-html="append"
        class="lxp-input__append"
        v-if="append"
        @click="$emit('append')"
      />
      <div class="form-floating__div">
        <input
          :id="id"
          :type="type"
          class="form-control"
          :placeholder="placeholder"
          :value="value"
          :disabled="disabled"
          :maxlength="maxlength"
          :minlength="minlength"
          v-model="text"
          @focus="onFocus = true"
          @blur="
            onFocus = false;
            onHover = false;
          "
          @mouseenter="onHover = true"
          @mouseleave="onHover = false"
          @input="$emit('input', $event.target.value)"
        />
        <label :for="id" v-html="label" v-if="label"></label>
      </div>
      <div
        class="lxp-input__prepend"
        v-html="prepend"
        v-if="prepend"
        @click="$emit('prepend')"
      ></div>
    </div>
    <div :class="['lxp-input__footer', { 'has-support-text': supportText }]">
      <p v-if="supportText" class="lxp-input__footer--support-text">
        {{ supportText }}
      </p>
      <div class="lxp-input__footer--limit" v-if="showLimit">
        {{ text ? text.length : 0 }}/{{ maxlength }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String,
      default: "floatingInput"
    },
    label: String,
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: "Placeholder text"
    },
    append: String,
    prepend: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number
    },
    minlength: {
      type: Number
    },
    supportText: String,
    showLimit: {
      type: Boolean,
      default: false
    },
    hasError: Boolean,
    isFloating: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      onHover: false,
      onFocus: false,
      text: ""
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.text = newValue;
      }
    },
    onFocus(newValue) {
      this.$emit("focus", newValue);
    }
  },
  created() {
    if (this.value) {
      this.text = this.value;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/scss/_floating.scss";

.lxp-input {
  .lxp-input__append {
    padding: 0 0 0 16px;
  }
  .lxp-input__prepend {
    padding: 0 16px 0 8px;
    cursor: pointer;
  }
  .lxp-input__footer {
    display: flex;
    justify-content: flex-end;
    &.has-support-text {
      justify-content: space-between;
    }
    .lxp-input__footer--support-text,
    .lxp-input__footer--limit {
      @include label-medium;
      color: $brand-neutral-300;
      margin-bottom: 0;
    }
    .lxp-input__footer--support-text {
      padding: 4px 0px 0px 5px;
    }
  }
  &.lxp-input__error {
    .form-floating {
      border-color: $brand-error-400;
      &.form-floating--focus {
        border: 1px solid $brand-primary;
      }
    }
    .lxp-input__footer--support-text {
      color: $brand-error-400;
    }
  }
  &.lxp-input__disabled {
    .form-floating {
      border: none;
      .form-control {
        background: $brand-neutral-75;
      }
    }
  }

  // input w/o floating styles
  .lxp-input__div {
    .form-control {
      border-radius: 8px;
      background: $brand-primary-75;
      border: 1px solid transparent;
      padding: 8px 16px;
      @include floating-label-text;
      &:hover {
        background: $brand-primary-100;
        color: $brand-neutral-900;
      }
      &:focus {
        border: 1px solid $brand-primary;
        box-shadow: none;
      }
    }
  }
}

[dir="rtl"] {
  .lxp-input__div {
    text-align: right;
    padding-left: 16px;
    padding-right: 0;
  }
  .lxp-input__append {
    padding: 0 16px 0 0;
  }
  .lxp-input__prepend {
    padding: 0 8px 0 16px;
  }
  .lxp-input__footer {
    justify-content: flex-start;
    &.has-support-text {
      justify-content: space-between;
    }
    .lxp-input__footer--support-text {
      padding-left: 0;
      padding-right: 5px;
    }
  }
}
</style>
