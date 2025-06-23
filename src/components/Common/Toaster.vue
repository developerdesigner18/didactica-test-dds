<template>
  <div class="lxp-toaster">
    <div v-if="showToaster" :variant="variant" :class="rootClasses">
      <div>
        <img
          alt="info"
          src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/information.svg"
          loading="lazy"
        />
      </div>
      <div class="toaster_message_text">
        <div class="toaster_text-heading">{{ title }}</div>
        <div class="toaster_text-content">
          {{ message
          }}<span class="in-text-button" v-if="showButton">
            <a href="{button_link}">{{ buttonText }}</a></span
          >
        </div>
      </div>

      <LxpButton
        class="toaster__close"
        variant="outline-primary"
        @click="dismiss"
      >
        <img
          src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
          alt="close"
          loading="lazy"
        />
      </LxpButton>
    </div>
  </div>
</template>

<script>
import { LxpButton } from "./index.js";
export default {
  components: {
    LxpButton
  },
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value) => {
        return ["primary", "warning", "success", "error"].indexOf(value) !== -1;
      }
    },
    show: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: false
    },
    message: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    buttonText: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: ""
    },
    timeout: {
      type: Number,
      default: 5000
    }
  },
  data() {
    return {
      showToaster: false
    };
  },
  computed: {
    rootClasses() {
      return [
        "lxp-toaster_container",
        this.className,
        `lxp-toaster_container-${this.variant}`
      ];
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.showToaster = false;
          this.$emit("update:show", false);
        }, this.timeout);
      }
    }
  },
  mounted() {
    this.showToaster = this.show;
  },
  methods: {
    dismiss() {
      this.$emit("update:show", false);
      this.showToaster = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.lxp-toaster {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 999;
  .lxp-toaster_container {
    display: flex;
    width: 344px;
    min-width: 344px;
    max-width: 344px;
    padding: 8px 16px;
    justify-content: center;
    align-items: flex-start;
    gap: 4px;
    border-radius: 16px;
    box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
    &.lxp-toaster_container-primary {
      border: 2px solid $brand-primary-400;
      background: $brand-primary-100;
    }
    &.lxp-toaster_container-warning {
      border: 2px solid $brand-warning-400;
      background: $brand-warning-100;
    }

    &.lxp-toaster_container-success {
      border: 2px solid $brand-success-400;
      background: $brand-success-100;
    }

    &.lxp-toaster_container-error {
      border: 2px solid $brand-error-400;
      background: $brand-error-100;
    }

    .toaster__close {
      background: transparent;
      width: 24px;
      height: 24px;
      padding: 0 5px;
      border: none;
      border-radius: 100%;
      float: right;
      img {
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
      &:hover {
        background: transparent !important;
      }
    }
    .toaster_message_text {
      display: inline;
      padding-left: 8px;
      padding-right: 4px;
      width: 100%;
      .toaster_text-content {
        @include label-large($brand-neutral-700, 400);

        .in-text-button {
          color: $brand-primary-400;
          font-size: 14px;
          font-style: normal;
          font-weight: 500;
          line-height: 21px;
          letter-spacing: 0.1px;
          padding-left: 7px;
          a {
            text-decoration: none;
          }
        }
      }
      .toaster_text-heading {
        color: $brand-neutral-700;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px; /* 150% */
        letter-spacing: 0.15px;
      }
    }
  }
}
</style>
