<template>
  <div :class="['lxp-textarea__wrapper', { 'lxp-textarea__error': hasError }]">
    <div
      :class="[
        'lxp-textarea',
        {
          'post-ob': postOb,
          'lxp-textarea--hover': onHover,
          'lxp-textarea--focus': onFocus,
          'lxp-textarea__disabled': disabled
        }
      ]"
    >
      <label for="textarea">{{ label }}</label>
      <b-form-textarea
        id="textarea"
        :placeholder="placeholder"
        v-model="text"
        :rows="rows"
        :max-rows="maxRows"
        :value="value"
        :disabled="disabled"
        no-resize
        @focus="onFocus = true"
        @blur="
          onFocus = false;
          onHover = false;
        "
        @mouseenter="onHover = true"
        @mouseleave="onHover = false"
        @change="onChange"
        @keypress="onKeyPress"
        @paste="onPaste"
      ></b-form-textarea>
    </div>
    <div :class="['lxp-textarea__footer', { 'has-support-text': supportText }]">
      <p v-if="supportText" class="lxp-input__footer--support-text">
        {{ supportText }}
      </p>
      <div class="lxp-input__footer--limit" v-if="limit != 0 || showLimit">
        {{ textLength }}/{{ limit }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 5
    },
    placeholder: {
      type: String,
      default: "Enter something..."
    },
    postOb: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    },
    debouncems: {
      type: Number,
      default: 0
    },
    value: String,
    label: String,
    supportText: String,
    hasError: Boolean,
    disabled: {
      type: Boolean,
      default: false
    },
    showLimit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      text: "",
      onHover: false,
      onFocus: false
    };
  },
  mounted() {
    this.text = this.value;
  },
  computed: {
    textLength() {
      return this.text ? this.text.length : 0;
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.text = newValue;
      }
    }
  },
  methods: {
    onChange(e) {
      if (this.limit > 0 && e.length > this.limit) {
        this.text = e.substr(0, this.limit);
        this.$emit("input", this.text);
      } else {
        this.$emit("input", this.text);
      }
    },
    onPaste(e) {
      const pastedText = e.clipboardData.getData("text/plain");
      const newText = this.text + pastedText;
      if (this.limit > 0 && newText.length > this.limit) {
        e.preventDefault();
      }
    },
    onKeyPress(e) {
      if (this.textLength >= this.limit) {
        e.preventDefault();
        return;
      }
      this.$emit("keypress-textarea", e);
    }
  }
};
</script>
<style lang="scss">
.lxp-textarea__wrapper {
  // error
  &.lxp-textarea__error {
    .lxp-textarea {
      border: 1px solid $brand-error-400;
    }
    .lxp-textarea__footer {
      .lxp-input__footer--support-text {
        color: $brand-error-400;
      }
    }
  }
  .lxp-textarea {
    position: relative;
    background: $brand-primary-75;
    border-radius: 8px;
    padding: 8px 16px;
    height: 100%;
    &.lxp-textarea--hover {
      background: $brand-primary-100;
    }
    &.lxp-textarea--focus {
      border: 1px solid $brand-primary;
      background: $brand-primary-75;
    }
    // disabled
    &.lxp-textarea__disabled {
      background: $brand-neutral-75;
      border: 1px solid $brand-neutral-300;
      label {
        color: $brand-neutral-300;
      }
    }
    label {
      @include label-medium;
      color: $brand-primary;
    }
    textarea {
      background: transparent;
      border: none;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.1px;
      color: $brand-neutral-700;
      padding: 0;
      &:focus {
        background: transparent;
        box-shadow: none;
      }
      &::placeholder {
        color: $brand-neutral-300;
        font-weight: 400;
      }
    }
    span {
      position: absolute;
      right: 10px;
      font-size: 12px;
      line-height: 15px;
      text-align: right;
      letter-spacing: 0.4px;
      color: #52575c;
      bottom: 5px;
    }
    &.post-ob {
      textarea {
        background: #fff;
        font-weight: 500;
        font-size: 13px;
        line-height: 140%;
        color: #25282b;
        border-radius: 4px;
        border: 1px solid #eeeeee;
        &:focus {
          border: 1px solid #0043ac;
          border-radius: 4px;
        }
      }
    }
  }
  .lxp-textarea__footer {
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
      padding-left: 5px;
    }
  }
}
</style>
