<template>
  <div class="delete_cover">
    <lxp-modal :show.sync="showModal" centered>
      <div class="delete_cover__content">
        <h6>Delete cover image?</h6>
        <p>Deleting this cover image is permanent.</p>
        <p>Are you sure you want to proceed?</p>
        <div class="upload-logo__error-msg" v-if="hasError">
          {{ errorText }}
        </div>
      </div>
      <template #footer>
        <div class="delete_cover__footer">
          <lxp-button variant="outline-primary" @click="deleteCover"
            >Delete</lxp-button
          >
          <lxp-button variant="primary" @click="onCancel">Cancel</lxp-button>
        </div>
      </template>
    </lxp-modal>
  </div>
</template>

<script>
import axios from "axios";
import fileValidation from "../../../Common/mixins/fileValidation";

import { LxpModal, LxpButton } from "@/components/Common/index.js";
export default {
  mixins: [fileValidation],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    content: String,
    id: String
  },
  inject: ["authToken", "urlObj"],
  components: {
    LxpModal,
    LxpButton
  },
  data() {
    return {
      logo: "",
      showModal: false,
      showProgress: false,
      progressCount: 0,
      hasError: false,
      errorStatus: "",
      heightDimension: 144,
      widthDimension: 0,
      accept: ["jpeg", "jpg", "png"]
    };
  },
  watch: {
    showModal(newValue) {
      this.$emit("update:show", newValue);
    },
    show(val) {
      if (val === false) {
        this.resetData();
      }
      this.showModal = this.show;
    }
  },
  computed: {
    headers() {
      let obj = {};
      if (this.authToken) {
        obj = {
          headers: {
            Authorization: this.authToken
          }
        };
      }
      return obj;
    },
    errorText() {
      return "Error deleting image. Please try again";
    }
  },
  methods: {
    resetData() {
      this.logo = "";
      this.hasError = false;
      this.errorStatus = "";
    },

    deleteCover() {
      axios[this.urlObj.UPDATE_SPACE.method](
        this.urlObj.UPDATE_SPACE.url,
        { cover_image: null },
        this.headers
      )
        .then((res) => {
          this.$emit("cover-updated", res.data.cover_image);
          this.showModal = false;
        })
        .catch((error) => {
          this.setErrorVal();
          console.error("About API :", error);
        });
    },
    onCancel() {
      this.showModal = false;
    },
    setErrorVal() {
      this.hasError = true;
    }
  }
};
</script>

<style lang="scss">
.delete_cover {
  .delete_cover__content {
    text-align: center;
    .delete_cover__error-msg {
      @include body-regular;
    }
    h6 {
      @include subtitle-large;
      margin: 10px 0;
    }
    p {
      @include body-regular;
      margin: 0;
    }
  }
  .delete_cover__footer {
    @include flex-horizontal-center;
  }
  .modal-body {
    padding: 0px 32px 16px 32px !important;
  }
  .modal-header {
    padding-bottom: 0px !important;
  }
  .modal-footer {
    padding-bottom: 25px !important ;
  }
}
</style>
