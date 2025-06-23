<template>
  <div class="lxp-dd__error--div">
    <div
      :class="['lxp-dd__error--variant', variant]"
      v-if="variant === 'variant1'"
    >
      <img :src="errorIcon" alt="error-upload" loading="lazy" />
      <div class="lxp-dd__error--content">
        {{ errorMessageContent }}
        <label :for="`lxp-file-input-${id}`" class="lxp-dd__error--select">{{
          errorStatus === "upload-error" ? "Please try again." : "Try again."
        }}</label>
      </div>
    </div>
    <div
      :class="['lxp-dd__error--variant', variant]"
      v-if="variant === 'variant2'"
    >
      <h5>
        <img
          src="https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload.svg"
          alt="upload"
          height="22"
          loading="lazy"
        />
        {{ uploadingText }}
      </h5>
      <LxpProgress :value="100" :max="100" hasError />
      <div class="lxp-dd__error--content">
        {{ errorMessageContent }}
        <label :for="`lxp-file-input-${id}`" class="lxp-dd__error--select">
          Try again.
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import LxpProgress from "../Progress.vue";

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    errorIcon: {
      type: String,
      required: true
    },
    variant: {
      type: String,
      required: true
    },
    errorStatus: {
      type: String,
      required: true
    },
    fileSize: {
      type: Number,
      required: true
    },
    accept: {
      type: Array,
      required: true
    },
    heightDimension: {
      type: Number,
      required: true
    },
    widthDimension: {
      type: Number,
      required: true
    },
    uploadingText: {
      type: String
    },
    errorMessage: {
      type: Object
    }
  },
  components: {
    LxpProgress
  },
  computed: {
    errorMessageContent() {
      let text = "";
      if (this.errorStatus === "type-error") {
        text = this.errorMessage?.TYPE
          ? this.errorMessage.TYPE
          : `Invalid file format. Please upload a ${this.accept
              .join(", ")
              .toUpperCase()} file.`;
      } else if (this.errorStatus === "size-error") {
        text = this.errorMessage?.SIZE
          ? this.errorMessage?.SIZE
          : `Image size exceeds ${(
              this.fileSize /
              (1000 * 1000)
            ).toFixed()}MB. Please choose a smaller file.`;
      } else if (this.errorStatus === "dimension-error") {
        text = this.errorMessage?.DIMENSION
          ? this.errorMessage?.DIMENSION
          : `Please upload a smaller image. Maximum dimensions are ${this.widthDimension}x${this.heightDimension}px.`;
      } else if (this.errorStatus === "upload-error") {
        text = this.errorMessage?.UPLOAD
          ? this.errorMessage?.UPLOAD
          : "Error uploading this file.";
      }
      return text;
    }
  }
};
</script>

<style lang="scss" scoped>
.lxp-dd__error--div {
  @include center;
  height: 100%;
  .lxp-dd__error--content {
    @include body-regular;
    margin-top: 14px;
    .lxp-dd__error--select {
      color: $brand-warning-400;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .lxp-dd__error--variant {
    padding: 48px 24px;
    &.variant1 {
      text-align: center;
    }
    &.variant2 {
      h5 {
        @include subtitle-regular;
      }
      .lxp-dd__error--content {
        @include label-medium;
        margin-top: 0px;
        color: $brand-neutral-700;
        text-align: center;
        .lxp-dd__error--select {
          color: inherit;
          font-weight: 400;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
