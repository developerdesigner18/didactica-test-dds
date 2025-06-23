<template>
  <div class="video_modal">
    <lxp-modal
      :show.sync="showModal"
      centered
      :hideFooter="true"
      :hideHeader="true"
      @modal-close="onModalClose"
    >
      <LxpButton class="lxp-modal__close" variant="link" @click="onModalClose">
        <img
          src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
          alt="close"
          loading="lazy"
        />
      </LxpButton>
      <iframe
        title="video"
        id="videoId"
        ref="videoId"
        :src="videoUrl"
        allowfullscreen
      ></iframe>
    </lxp-modal>
  </div>
</template>

<script>
import { LxpModal, LxpButton } from "@/components/Common/index.js";
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    videoUrl: {
      type: String,
      default: ""
    }
  },
  components: {
    LxpModal,
    LxpButton
  },

  data() {
    return {
      showModal: false,
      currentVideoUrl: ""
    };
  },
  watch: {
    showModal(newValue) {
      this.$emit("update:show", newValue);
      if (newValue) {
        this.$refs.videoId.src = this.currentVideoUrl;
      }
    },
    show() {
      this.showModal = this.show;
      this.currentVideoUrl = this.videoUrl;
    }
  },
  methods: {
    onModalClose() {
      this.$refs.videoId.src = "";
      this.showModal = false;
    }
  }
};
</script>

<style lang="scss">
iframe {
  width: 100%;
  height: 355px;
  border-radius: 10px;
  box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
}
.video_modal {
  .modal-dialog {
    max-width: 686px !important;
  }
  .lxp-modal__close {
    background: $brand-neutral-50;
    width: 28px;
    height: 28px !important;
    padding: 0 !important;
    border: none;
    border-radius: 100%;
    position: relative;
    float: right;
    left: 35px;
    img {
      width: 18px;
      height: 18px;
      vertical-align: middle;
    }
    &:hover {
      background: $brand-primary-50;
    }
    &:active {
      background: #fff;
    }
  }
  .modal-body {
    padding: 10px 48px 28px 48px !important;
  }
}
</style>
