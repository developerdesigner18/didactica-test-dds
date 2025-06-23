<template>
  <div class="ls-main__initiative">
    <lxp-modal
      :show.sync="showModal"
      id="edit-initiative-modal"
      centered
      title="Initiative"
      size="lg"
      @save="validateForm"
    >
      <div v-if="showModal">
        <ValidationObserver ref="edit-initiative-observer">
          <div
            class="ei-modal__content"
            v-if="Object.keys(this.form).length > 0"
          >
            <p>Add relevant information about this initiative.</p>
            <div class="ei-modal__content--form">
              <ValidationProvider
                name="Initiative Name"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="ei-content__form--div">
                  <lxp-input
                    label="Initiative Name*"
                    :maxlength="250"
                    showLimit
                    :value="form.name"
                    v-model="form.name"
                    :hasError="errors[0] ? true : false"
                    :supportText="errors[0] ? errors[0] : ''"
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                name="Short headline"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="ei-content__form--div">
                  <lxp-input
                    label="Short headline*"
                    :maxlength="250"
                    showLimit
                    :value="form.short_headline"
                    v-model="form.short_headline"
                    :hasError="errors[0] ? true : false"
                    :supportText="errors[0] ? errors[0] : ''"
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                name="Info"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="ei-content__form--div">
                  <lxp-textarea
                    label="Info*"
                    placeholder="Please provide a brief description of this entity, including its mission, services, and any other relevant information. Keep it professional and avoid sharing sensitive information."
                    :limit="10000"
                    :rows="6"
                    showLimit
                    :value="form.info"
                    v-model="form.info"
                    :hasError="errors[0] ? true : false"
                    :supportText="errors[0] ? errors[0] : ''"
                  />
                </div>
              </ValidationProvider>
              <div class="ei-content__form--div">
                <lxp-drag-drop
                  id="dragdrop-initiative"
                  noteText="Image should not exceed 1Mb. File format jpeg, jpg, png. Recommended size 960*640px"
                  dragDropClass="ls-edit__image"
                  dropIcon="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/drag-drop-image.svg"
                  :accept="['jpeg', 'jpg', 'png']"
                  :authToken="authToken"
                  :uploadedFileUrl="form.image"
                  :fileUploadUrl="urlObj.UPLOAD.url"
                  @file-url="onCoverChange"
                  @remove-file="onRemoveFile"
                />
              </div>
              <ValidationProvider
                name="Video"
                :rules="{
                  regex:
                    /^https:\/\/(www\.youtube\.com\/embed\/.*|player\.vimeo\.com\/video\/.*)$/i
                }"
                v-slot="{ errors }"
              >
                <div class="ei-content__form--div">
                  <lxp-input
                    label="Video"
                    placeholder="Enter your url video's ID "
                    :value="form.video_url"
                    v-model="form.video_url"
                    :hasError="errors[0] ? true : false"
                    :supportText="
                      errors[0]
                        ? errors[0]
                        : 'Only use an embedded video link from YouTube or Vimeo. You may find the link from the share-video options on YouTube or Vimeo.'
                    "
                  />
                </div>
              </ValidationProvider>
            </div>
          </div>
        </ValidationObserver>
        <div v-if="showError" class="ls-create__form--errMsg">
          <span>
            <img
              src="https://files.lxp.academy.who.int/didactica/assets/images/modal/error.svg"
              alt="error"
              loading="lazy"
            />
            <span class="error_msg--span">{{ errMsg }}</span>
          </span>
          <span class="error_msg--close" @click="onClose">
            <img
              src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
              alt="close"
              loading="lazy"
            />
          </span>
        </div>
      </div>
    </lxp-modal>
    <LxpToaster
      title="Updated"
      :show.sync="showToast"
      variant="success"
      message="Initiative content updated successfully!"
    />
  </div>
</template>

<script>
import {
  LxpModal,
  LxpInput,
  LxpTextarea,
  LxpDragDrop,
  LxpToaster
} from "@/components/Common/index.js";

import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";
import axios from "axios";

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    initiative: {
      type: Object,
      required: true
    }
  },
  inject: ["authToken", "urlObj"],
  components: {
    LxpModal,
    LxpInput,
    LxpTextarea,
    LxpDragDrop,
    ValidationProvider,
    LxpToaster,
    ValidationObserver
  },
  data() {
    return {
      showModal: false,
      form: "",
      showError: false,
      errMsg: "",
      showToast: false
    };
  },
  watch: {
    showModal(newValue) {
      this.$emit("update:show", newValue);
      if (!newValue) {
        this.init(this.initiative);
      }
    },
    show() {
      this.showModal = this.show;
    },
    initiative(a) {
      this.init(a);
    }
  },
  methods: {
    init(a) {
      this.form = JSON.parse(JSON.stringify(a));
    },
    onCoverChange(e) {
      this.form.image = e.image;
    },
    onClose() {
      this.showError = false;
    },
    onRemoveFile() {
      this.form.image = "";
    },
    validateForm() {
      if (
        this.form.video_url !== "" &&
        this.form.video_url !== null &&
        (this.form.image === "" || this.form.image === null)
      ) {
        this.errMsg = "When using a video, image is mandatory.";
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 5000);
        return;
      }
      this.$refs["edit-initiative-observer"].validate().then((res) => {
        if (res) {
          this.submitForm();
        }
      });
    },
    submitForm() {
      let headers = {};
      if (this.authToken) {
        headers = {
          headers: {
            Authorization: this.authToken,
            "Content-Type": "application/json"
          }
        };
      }
      const id = this.form.id;
      axios[this.urlObj.UPDATE_INITIATIVE.method](
        this.urlObj.UPDATE_INITIATIVE.url + "/" + id + "/",
        this.form,
        headers
      )
        .then((res) => {
          this.showModal = false;
          this.showToast = true;
          this.$emit("update-initiative", res.data);
        })
        .catch((error) => {
          console.error("Initiative API :", error);
        });
    }
  }
};
</script>

<style lang="scss">
.ls-main__initiative {
  #edit-initiative-modal {
    .modal-dialog {
      max-width: 700px;
      .modal-body {
        padding: 0 32px;
        overflow-y: auto !important;
        max-height: calc(100vh - 200px);
        overflow-x: hidden !important;
      }
    }
    .ei-modal__content {
      p {
        text-align: center;
      }
      .ei-modal__content--form {
        text-align: left;
        .ei-content__form--div {
          p {
            text-align: left;
          }
          margin-bottom: 16px;
          .ls-edit__image {
            .lxp-dd__drop--default {
              height: 25vh;
              .lxp-dd__drop--default--content {
                color: $brand-neutral-300;
                .lxp-dd__drop--default-select {
                  text-decoration: underline;
                  color: $brand-primary-400;
                  font-weight: 400;
                }
              }
            }
          }
        }
      }
    }
  }
}
.ls-create__form--errMsg {
  @include body-medium;
  border: 2px solid $brand-error-400;
  border-radius: 8px;
  background: $brand-error-100;
  color: $brand-neutral-700;
  padding: 8px 8px;
  margin-top: 2%;
  .error_msg--span {
    padding: 2px 2px 2px 8px;
  }
  .error_msg--close {
    float: right;
    cursor: pointer;
  }
}
</style>
