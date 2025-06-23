<template>
  <div class="lxp-alert">
    <b-alert
      :variant="variant"
      show
      :dismissible="dismissible"
      @dismissed="onDismissed"
    >
      <slot name="content"></slot>
      <div class="lxp-alert__content" v-if="!$slots.content">
        <img :src="imgPath" alt="image" v-if="imgPath" loading="lazy" />
        <div class="lxp-alert__content--right">
          <h5 v-if="title">{{ title }}</h5>
          <p v-if="subTitle">{{ subTitle }}</p>
        </div>
      </div>
      <template v-slot:dismiss>
        <img
          src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
          alt="close"
          loading="lazy"
        />
      </template>
    </b-alert>
  </div>
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
          ["primary", "success", "warning", "danger", "secondary1"].indexOf(
            value
          ) !== -1
        );
      }
    },
    imgPath: {
      type: String
    },
    title: {
      type: String
    },
    subTitle: {
      type: String
    },
    dismissible: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onDismissed() {
      this.$emit("dismissed");
    }
  }
};
</script>

<style lang="scss">
@mixin setBgColor($border-color, $bg-color) {
  border-color: $border-color;
  background: $bg-color;
}
.lxp-alert {
  .alert {
    border-radius: 16px;
    &.alert-dismissible {
      .close {
        background: transparent;
        position: absolute;
        top: 2px;
        right: 0;
        z-index: 2;
        padding: 0.75rem 1.25rem;
        color: inherit;
        border: none;
      }
    }
    .lxp-alert__content {
      display: flex;
      img {
        margin-right: 16px;
        max-width: 120px;
      }
      .lxp-alert__content--right {
        h5 {
          @include subtitle-regular;
          color: $brand-neutral-700;
          margin-bottom: 0;
        }
        p {
          @include label-large;
          margin-bottom: 0;
        }
      }
    }
    // primary
    &.alert-primary {
      @include setBgColor($brand-primary-400, $brand-primary-100);
    }
    // success
    &.alert-success {
      @include setBgColor($brand-success-400, $brand-success-100);
    }
    // danger
    &.alert-danger {
      @include setBgColor($brand-error-400, $brand-error-100);
    }
    // warning
    &.alert-warning {
      @include setBgColor($brand-warning-400, $brand-warning-100);
    }
    // secondary1
    &.alert-secondary1 {
      border: 2px solid;
      @include setBgColor($brand-secondary1-400, $brand-secondary1-50);
    }
  }
}
</style>
