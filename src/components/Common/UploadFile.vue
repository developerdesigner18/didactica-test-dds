<template>
  <div ref="uploadFileComponent" class="lxp-upload-file">
    <div class="lxp-dd__drop">
      <input
        type="file"
        :id="`lxp-file-input-${id}`"
        class="hidden-input"
        ref="file"
        @change="onChange"
        :accept="acceptType"
        :multiple="multiple"
      />
      <div>
        <div>
          <slot name="content"></slot>
          <div v-if="!$slots.content">
            <div>
              <label :for="`lxp-file-input-${id}`"
                ><div class="lxp-upload-icon">
                  <img
                    class="upload_icon"
                    :class="{ uploaded_img: fileURL }"
                    :src="fileURL ? fileURL : dropIcon"
                    alt="upload"
                    loading="lazy"
                  /></div
              ></label>
            </div>
          </div>
        </div>
        <div class="lxp-dd__error--section" v-if="hasError && showErrorInline">
          <slot name="error-content"></slot>
          <error-state
            :id="id"
            :variant="variant"
            :errorStatus="errorStatus"
            :errorIcon="errorIcon"
            :fileSize="fileSize"
            :accept="accept"
            :heightDimension="heightDimension"
            :widthDimension="widthDimension"
            :errorMessage="errorMessage"
            @try-again="uploadFile()"
            v-if="!$slots['error-content']"
          ></error-state>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import fileValidationMixin from "./mixins/fileValidation";
import ErrorState from "./DragDrop/ErrorState.vue";
export default {
  mixins: [fileValidationMixin],
  props: {
    id: {
      type: String,
      default: () => {
        return (Math.random() * 100).toFixed();
      }
    },
    dropIcon: {
      type: String,
      default:
        "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload.svg"
    },
    showErrorInline: {
      type: Boolean,
      default: false
    },
    errorIcon: {
      type: String,
      default:
        "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/error.svg"
    },
    accept: {
      type: Array,
      default: () => {
        return ["pdf", "jpg", "jpeg", "png", "svg"];
      }
    },
    multiple: {
      type: Boolean,
      default: false
    },
    fileSize: {
      type: Number,
      default: 1048576 //in bytes
    },
    heightDimension: {
      type: Number,
      default: 192 // in px
    },
    widthDimension: {
      type: Number,
      default: 192 // in px
    },
    validateFileDimension: Boolean,
    fileUploadUrl: { type: String },
    fileUploadLabel: {
      type: String,
      default: "image"
    },
    authToken: {
      type: String
    },
    index: {
      type: Number,
      required: true
    },

    variant: {
      type: String,
      default: "variant1",
      validator: (value) => {
        return ["variant1", "variant2"].indexOf(value) !== -1;
      }
    },
    uploadedFileUrl: {
      type: String
    },
    errorMessage: {
      SIZE: String,
      DIMENSION: String,
      TYPE: String,
      UPLOAD: String
    }
  },
  data() {
    return {
      files: [],
      hasError: false,
      errorStatus: "default",
      fileURL: "",
      isLoading: false,
      uploadProgress: 0,
      onFileUrl: ""
    };
  },
  components: {
    ErrorState
  },
  computed: {
    acceptType() {
      if (!Array.isArray(this.accept)) {
        return "";
      }
      let type = this.accept.map((a) => `.${a}`);
      return type.join(",");
    }
  },
  created() {
    this.fileURL = this.uploadedFileUrl;
  },
  methods: {
    async onChange() {
      let files = this.$refs.file.files;
      for (let file of files) {
        if (
          this.validateFileFormat(file) &&
          this.validateFileSize(file) &&
          (await this.validateDimension(file))
        ) {
          this.files = [...this.$refs.file.files];
          this.$emit("change", this.files);
          if (this.fileUploadUrl) {
            this.uploadFile();
          }
        } else {
          this.hasError = true;
          this.$emit("file-upload-error", this.getErrorMessage());
        }
      }
    },
    getPreviewImg(file) {
      if (!this.uploadedFileUrl) {
        if (!this.fileUploadUrl) {
          let fileSrc = URL.createObjectURL(file);
          setTimeout(() => {
            URL.revokeObjectURL(fileSrc);
          }, 1000);
          return fileSrc;
        } else {
          return this.fileURL;
        }
      } else {
        return this.uploadedFileUrl;
      }
    },
    uploadFile() {
      this.isLoading = true;

      let formData = new FormData();
      formData.append(this.fileUploadLabel, this.files[0]);

      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          this.uploadProgress = percentCompleted;
        }
      };
      if (this.authToken) {
        config.headers = {
          Authorization: this.authToken
        };
      }
      axios
        .post(this.fileUploadUrl, formData, config)
        .then((res) => {
          const dt = { index: this.index, image: res.data.image };

          this.$emit("file-url", dt);
          this.isLoading = false;
          this.fileURL = res.data.image;
        })
        .catch((e) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorStatus = "upload-error";
          this.$emit("file-upload-status", this.errorStatus);
          this.errormessage = e.message;

          this.$emit("file-upload-error", this.errormessage);
        });
    },
    onRemove() {
      this.fileURL = "";
      this.files = [];
      this.$refs.file.value = "";
      this.errorStatus = "default";
      this.uploadProgress = 0;
      this.$emit("remove-file");
    },
    onUploadNew() {
      this.$refs.file.click();
    },
    getErrorMessage() {
      let text = "";
      if (this.errorStatus === "type-error") {
        text = `Invalid file format. Please upload a ${this.accept
          .join(",")
          .toUpperCase()} file.`;
      } else if (this.errorStatus === "size-error") {
        text = `Image size exceeds ${(
          this.fileSize /
          (1000 * 1000)
        ).toFixed()}MB. Please choose a smaller file.`;
      } else if (this.errorStatus === "dimension-error") {
        text = `Please upload a smaller image. Maximum dimensions are ${this.widthDimension}x${this.heightDimension}px.`;
      } else if (this.errorStatus === "upload-error") {
        text = "Error uploading this file.";
      }
      return text;
    }
  }
};
</script>

<style lang="scss" scoped>
.lxp-upload-file {
  height: 100%;
  position: relative;
  .lxp-upload-icon {
    border-radius: 50%;
    border: 1px solid $brand-neutral-200;
    height: 80px;
    width: 80px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: $brand-primary-100;
    }
  }
  .upload_icon {
    height: 100%;
    width: 32px;
  }
  .uploaded_img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    border-radius: 50%;
    &:hover {
      border: 1px solid $brand-neutral-400;
    }
  }
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  .lxp-dd__drop {
    text-align: left;
    &.lxp-dd__dragging {
      background: $brand-primary-100;
      border-color: $brand-primary-400;
    }
    &.lxp-dd__error {
      border: 2px dashed $brand-warning-400;
      background: #fff;
      .lxp-dd__error--section {
        height: 100%;
      }
    }

    &.lxp-dd__files {
      padding: 0;
      border: none;
      border-radius: 4px;
      background: transparent;
      height: 100%;
    }

    &.variant2 {
      border: 1px solid $brand-primary;
      background: #fff;
      border-radius: 16px;
      min-height: 121px;
      padding: 16px;
      .lxp-dd__files--div {
        .lxp-dd__files--loader {
          background: transparent;
          .lxp-dd__files--loader-variant {
            .lxp-dd__files--loader__header {
              @include flex-horizontal-center;
              margin-bottom: 20px;
              h5 {
                @include subtitle-regular;
                margin: 0 0 0 5px;
              }
            }
          }
        }
      }
    }
    .lxp-dd__drop--default {
      @include center;
      height: 100%;
    }
    .lxp-dd__drop--default--content,
    .lxp-dd__error--content {
      @include body-regular;
      margin-top: 14px;
      .lxp-dd__drop--default-select,
      .lxp-dd__error--select {
        color: $brand-primary-400;
        font-weight: 500;
        cursor: pointer;
      }
      .lxp-dd__error--select {
        color: $brand-warning-400;
      }
    }
    // files
    .lxp-dd__files--div {
      height: 100%;
      width: 100%;
      .lxp-dd__files--loader {
        @include flex-horizontal-center;
        height: 100%;
        background: $brand-neutral-50;
        position: relative;
        min-height: 120px;
        .lxp-dd__files--loader-spin {
          min-height: auto;
          position: absolute;
          top: 9px;
          right: 9px;
        }
      }
      .lxp-dd__files--file {
        width: 100%;
        height: 100%;
        img {
          object-fit: cover;
          border-radius: 4px;
        }
      }
    }
  }
  .lxp-dd__note {
    @include label-medium;
    color: $brand-neutral-300;
    text-align: center;
    display: block;
    margin-top: 4px;
  }
}
.lxp-dd___files--img {
  border-radius: 100px;
}
</style>
<style lang="scss">
.lxp-drag__dd {
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0px;
  margin-bottom: 0;
  &:hover {
    background: unset !important;
  }
  .lx-select__div {
    .lx-select__dropdown {
      padding: 0 4px 8px 0;
      &.show {
        border: none;
      }
    }
  }
  .lxp-select__dd--div {
    background: #fff;
    border-radius: 8px;
    padding: 8px;
  }
  .lxp-dd__content {
    @include horizontal-space-between;
    p {
      margin: 0 0 0 5px;
      @include body-medium;
    }
  }
  .dropdown-menu {
    margin-top: 0 !important;
    li {
      .dropdown-item {
        padding: 8px !important;
        .lxp-dd__content {
          justify-content: flex-start;
        }
      }
    }
  }
}
</style>
