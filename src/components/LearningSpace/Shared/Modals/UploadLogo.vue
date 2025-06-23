<template>
  <div class="upload-logo">
    <lxp-modal :show.sync="showModal" centered>
      <div class="upload-logo__content">
        <img
          src="https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload.svg"
          alt="upload"
          loading="lazy"
        />
        <h6>{{ showProgress ? `Uploading ${title}` : `Upload ${title}` }}</h6>
        <p v-if="!showProgress">
          {{ content }}
        </p>

        <div class="upload-logo__btn">
          <input
            type="file"
            ref="edit-upload-logo"
            id="edit-upload-logo"
            class="hidden-input"
            accept=".jpeg,.png,.jpg"
            @change="onChange"
          />
          <lxp-button @click="onUploadFile" v-if="!showProgress"
            >Upload File</lxp-button
          >
          <lxp-progress
            :value="progressCount"
            :max="100"
            :hasError="hasError"
            v-else
          ></lxp-progress>
        </div>
        <div class="upload-logo__error-msg" v-if="hasError">
          {{ errorText }}
        </div>
      </div>
      <template #footer>
        <span v-if="!hasError"></span>
        <div class="upload-logo__footer" v-else>
          <lxp-button variant="outline-primary" @click="onCancel"
            >Cancel</lxp-button
          >
          <lxp-button @click="onUploadFile">Upload File</lxp-button>
        </div>
      </template>
    </lxp-modal>
  </div>
</template>

<script>
import axios from "axios";
import fileValidation from "../../../Common/mixins/fileValidation";

import { LxpModal, LxpButton, LxpProgress } from "@/components/Common/index.js";
export default {
  mixins: [fileValidation],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: String,
    content: String,
    fileSize: {
      type: Number,
      default: 1048576
    },
    validateFileDimension: {
      type: Boolean,
      default: true
    },
    id: String
  },
  inject: ["authToken", "urlObj"],
  components: {
    LxpModal,
    LxpButton,
    LxpProgress
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
      if (this.errorStatus === "type-error") {
        return "Invalid file format. Please upload a file in JPEG, JPG, or PNG format";
      } else if (this.errorStatus === "size-error") {
        return "File size exceeds limit. Please choose a smaller file.";
      } else if (this.errorStatus === "dimension-error") {
        return `Image height exceeds ${this.heightDimension} pixels. Please try again`;
      } else {
        return "Error uploading image. Please try again";
      }
    }
  },
  methods: {
    resetData() {
      this.hasError = false;
      this.showProgress = false;
      this.logo = "";
      this.progressCount = 0;
      this.errorStatus = "";
    },
    onUploadFile() {
      this.$refs["edit-upload-logo"].click();
      this.progressCount = 0;
      this.hasError = false;
      this.errorStatus = "";
    },
    async onChange() {
      let file = this.$refs["edit-upload-logo"].files[0];
      if (
        this.validateFileFormat(file) &&
        this.validateFileSize(file) &&
        (await this.validateDimension(file))
      ) {
        this.uploadImage(file);
      } else {
        this.setErrorVal();
      }
    },
    uploadImage(file) {
      this.showProgress = true;
      this.progressCount = 0;
      let formData = new FormData();
      formData.append("image", file);
      axios[this.urlObj.UPLOAD.method](
        this.urlObj.UPLOAD.url,
        formData,
        this.headers
      )
        .then((res) => {
          this.progressCount = 50;
          this.logo = res.data.image;
          this.updateLogo();
        })
        .catch(() => {
          this.setErrorVal();
          this.errorStatus = "image-upload-error";
        });
    },

    updateLogo() {
      const isCoverUpdate = this.id === "cover";
      const urlParam = isCoverUpdate ? "cover_image" : "logo";

      axios[this.urlObj.UPDATE_SPACE.method](
        this.urlObj.UPDATE_SPACE.url,
        { [urlParam]: this.logo },
        this.headers
      )
        .then((res) => {
          this.progressCount = 100;
          const updatedImage = isCoverUpdate
            ? res.data.cover_image
            : res.data.logo;
          this.$emit("logo-updated", updatedImage);

          setTimeout(() => {
            this.showModal = false;
          }, 300);
        })
        .catch(() => {
          this.setErrorVal();
          this.errorStatus = "upload-error";
        });
    },
    onCancel() {
      this.showModal = false;
    },
    setErrorVal() {
      this.hasError = true;
      this.showProgress = true;
      this.progressCount = 100;
    }
  }
};
</script>

<style lang="scss">
.upload-logo {
  .upload-logo__content {
    text-align: center;
    .upload-logo__error-msg {
      @include body-regular;
    }
    h6 {
      @include subtitle-large;
      margin: 10px 0;
    }
    p {
      @include body-regular;
    }
    .upload-logo__btn {
      @include flex-horizontal-center;
      margin-bottom: 16px;
      .lxp-progress {
        width: 80%;
      }
    }
  }
  .upload-logo__footer {
    @include flex-horizontal-center;
  }
}
</style>
