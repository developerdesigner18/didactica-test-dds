<template>
  <div :id="id" class="lxp-drag-drop">
    <div
      :class="dropClass"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <input
        type="file"
        :id="`lxp-file-input-${id}`"
        class="hidden-input"
        ref="file"
        @change="onChange"
        :accept="acceptType"
        :multiple="multiple"
      />
      <div class="h-100 w-100">
        <div
          class="h-100"
          v-if="!fileURL && files.length == 0 && errorStatus === 'default'"
        >
          <slot name="content"></slot>
          <div class="lxp-dd__drop--default" v-if="!$slots.content">
            <img :src="dropIcon" alt="upload" loading="lazy" />
            <div class="lxp-dd__drop--default--content">
              Drag and drop image here or
              <label
                :for="`lxp-file-input-${id}`"
                class="lxp-dd__drop--default-select"
                >Select image</label
              >
            </div>
          </div>
        </div>
        <div class="lxp-dd__error--section" v-if="hasError">
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
            :uploadingText="uploadingText"
            :errorMessage="errorMessage"
            @try-again="uploadFile()"
            v-if="!$slots['error-content']"
          ></error-state>
        </div>

        <div
          class="lxp-dd__files--div"
          v-if="(files.length !== 0 || fileURL) && !hasError"
        >
          <div class="lxp-dd__files--loader" v-if="isLoading">
            <div
              :class="['lxp-dd__files--loader-variant', variant]"
              v-if="variant === 'variant1'"
            >
              <div class="lxp-dd__files--loader-loading">
                <img
                  src="https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload-grey.svg"
                  alt="upload-grey"
                  loading="lazy"
                />
              </div>
              <LxpLoader loaderClass="lxp-dd__files--loader-spin" />
            </div>
            <div
              :class="['lxp-dd__files--loader-variant', variant]"
              v-if="variant === 'variant2'"
            >
              <div class="lxp-dd__files--loader__header">
                <img :src="dropIcon" alt="upload" height="22" loading="lazy" />
                <h5>{{ uploadingText }}</h5>
              </div>
              <div class="lxp-dd__loader--progress">
                <LxpProgress :value="uploadProgress" :max="100" />
              </div>
            </div>
          </div>
          <div class="lxp-dd__files--file" v-else>
            <div class="h-100" v-if="fileURL">
              <file-preview
                :variant="variant"
                :previewImage="fileURL"
                @remove="onRemove"
                @upload-new="onUploadNew"
              ></file-preview>
            </div>
            <div
              class="lxp-dd__files--file"
              v-for="file in files"
              :key="file.name"
              v-else
            >
              <file-preview
                :editBtnContent="editBtnContent"
                :variant="variant"
                :editBtnDropdownArray="editBtnDropdownArray"
                :editCoverText="editCoverText"
                :removeText="removeText"
                :uploadNewText="uploadNewText"
                :previewImage="getPreviewImg(file)"
                @remove="onRemove"
                @upload-new="onUploadNew"
              ></file-preview>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span class="lxp-dd__note" v-if="noteText">
      {{ noteText }}
    </span>
  </div>
</template>

<script>
import axios from "axios";
import fileValidationMixin from "./mixins/fileValidation";

import LxpProgress from "./Progress.vue";
import LxpLoader from "./Loader.vue";

import ErrorState from "./DragDrop/ErrorState.vue";
import FilePreview from "./DragDrop/FilePreview.vue";

export default {
  mixins: [fileValidationMixin],
  props: {
    id: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      required: false
    },
    dropIcon: {
      type: String,
      default:
        "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload.svg"
    },
    errorIcon: {
      type: String,
      default:
        "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/error.svg"
    },
    noteText: String,
    accept: {
      type: Array,
      default: () => {
        return ["pdf", "jpg", "jpeg", "png"];
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
      default: 100 // in px
    },
    widthDimension: {
      type: Number,
      default: 100 // in px
    },
    validateFileDimension: Boolean,
    editBtnContent: {
      type: String
    },
    editBtnDropdownArray: {
      type: Array,
      default: () => []
    },
    removeText: {
      type: String,
      default: "Remove"
    },
    uploadNewText: {
      type: String,
      default: "Upload new"
    },
    editCoverText: {
      type: String,
      default: "Edit cover"
    },
    dragDropClass: { type: String },
    fileUploadUrl: { type: String },
    fileUploadLabel: {
      type: String,
      default: "image"
    },
    authToken: {
      type: String
    },
    uploadingText: {
      type: String,
      default: "Uploading..."
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
      isDragging: false,
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
    LxpProgress,
    LxpLoader,
    ErrorState,
    FilePreview
  },
  computed: {
    uploadedFileUrlValue() {
      return this.uploadedFileUrl || "";
    },
    dropClass() {
      let className = ["lxp-dd__drop", this.variant];
      if (!this.fileURL && this.files.length === 0) {
        if (this.isDragging) {
          className.push("lxp-dd__dragging");
        }
      }
      if (!this.isDragging && this.hasError) {
        className.push("lxp-dd__error");
      }
      if (this.files.length > 0 && !this.hasError) {
        className.push("lxp-dd__files");
      }
      if (this.dragDropClass) {
        className.push(this.dragDropClass);
      }
      return className;
    },
    acceptType() {
      if (!Array.isArray(this.accept)) {
        return "";
      }
      let type = this.accept.map((a) => `.${a}`);
      return type.join(",");
    }
  },
  created() {
    this.fileURL = this.uploadedFileUrlValue;
  },
  methods: {
    onDragOver(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    onDragLeave() {
      this.isDragging = false;
    },
    async onDrop(e) {
      e.preventDefault();
      if (this.fileURL === "" && this.files.length === 0) {
        this.$refs.file.files = e.dataTransfer.files;
        this.onChange();
        this.isDragging = false;
      }
    },
    async onChange() {
      let files = this.$refs.file.files;

      if (files.length === 0) {
        return;
      }
      this.hasError = false;
      for (let file of files) {
        if (
          this.validateFileFormat(file) &&
          this.validateFileSize(file) &&
          (await this.validateDimension(file))
        ) {
          this.files = [...this.$refs.file.files];
          this.$emit("change", this.files);
          this.hasError = false;
          if (this.fileUploadUrl) {
            this.uploadFile();
          }
        } else {
          this.hasError = true;
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
        return this.uploadedFileUrlValue;
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
          this.$emit("file-url", {
            image: res.data.image,
            index: this.index
          });
          this.isLoading = false;
          this.fileURL = res.data.image;
        })
        .catch(() => {
          this.isLoading = false;
          this.hasError = true;
          this.errorStatus = "upload-error";
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
    }
  }
};
</script>

<style lang="scss" scoped>
.lxp-drag-drop {
  height: 100%;
  position: relative;
  cursor: url("https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/cursor-copy.svg"),
    auto;
  .lxp-dd__drop {
    background: $brand-primary-75;
    border: 2px dashed $brand-primary-100;
    border-radius: 8px;
    height: 100%;
    &:hover {
      border: 2px dashed $brand-primary-400;
    }
    @include flex-horizontal-center;
    &:hover {
      border-color: $brand-primary-400;
    }
    &.lxp-dd__dragging {
      background: $brand-primary-100;
      border-color: $brand-primary-400;
    }
    &.lxp-dd__error {
      border: 2px dashed $brand-warning-400;
      background: #fff;
      height: 100%;
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
    &.variant1 {
      position: relative;
      &.lxp-dd__files {
        &:hover {
          background: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.2) 0%,
              rgba(0, 0, 0, 0.2) 100%
            ),
            lightgray 50% / contain no-repeat;
          border-radius: 8px;
        }
      }
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
</style>
<style lang="scss">
.lxp-drag__dd {
  background: transparent;
  position: absolute;
  right: 0;
  bottom: 0px;
  margin-bottom: 0;
  .lx-select__div {
    background: transparent !important;
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
