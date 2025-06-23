<template>
  <div class="ls-main__about">
    <lxp-modal
      :show.sync="showModal"
      id="edit-about-modal"
      centered
      title="About"
      size="lg"
      @save="validateForm"
      @modal-close="onCancel"
    >
      <div v-if="showModal">
        <ValidationObserver ref="edit-about-observer">
          <div
            class="ea-modal__content"
            v-if="Object.keys(this.form).length > 0"
          >
            <p>Add relevant content about your organization.</p>
            <div class="ea-modal__content--form">
              <ValidationProvider
                name="Short headline"
                rules="required"
                v-slot="{ errors }"
              >
                <div class="ea-content__form--div">
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
                <div class="ea-content__form--div">
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
              <div class="ea-content__form--div">
                <lxp-drag-drop
                  id="dragdrop-about"
                  noteText="Image should not exceed 1Mb. File format jpeg, jpg, png. Recommended size 960*640px"
                  dragDropClass="ls-edit__image"
                  dropIcon="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/drag-drop-image.svg"
                  :accept="['jpeg', 'jpg', 'png']"
                  :authToken="authToken"
                  :uploadedFileUrl="form.image"
                  :fileUploadUrl="urlObj.UPLOAD.url"
                  @file-url="onCoverChange"
                  :buttonContent="buttonContent"
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
                    placeholder="Enter your video URL "
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
              <ValidationProvider
                name="TermsAndConditions"
                :rules="{
                  regex:
                    /^(?:(?:https?|http):)?\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
                }"
                v-slot="{ errors }"
              >
                <div class="ei-content__form--div">
                  <lxp-input
                    label="Terms of Use and Conditions"
                    placeholder="Enter your url "
                    :value="form.terms_and_conditions"
                    v-model="form.terms_and_conditions"
                    :hasError="errors[0] ? true : false"
                    :supportText="errors[0] ? errors[0] : ''"
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
      message="About content updated successfully!"
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
    about: {
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
      showError: false,
      errMsg: "",
      showToast: false,
      form: {
        short_headline: "",
        info: "",
        image: "",
        video_url: "",
        terms_and_conditions: ""
      }
    };
  },
  computed: {
    buttonContent() {
      let imgPath =
        "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload.svg";
      return `<div class="lxp-dd__content">
        <img src="${imgPath}" alt="upload" width="14" height="14" loading="lazy" />
        <p>Edit</p>
      </div>`;
    }
  },
  watch: {
    showModal(newValue) {
      this.$emit("update:show", newValue);
      if (!newValue) {
        this.init(this.about);
      }
    },
    show() {
      this.showModal = this.show;
    },
    about(a) {
      this.init(a);
    }
  },

  methods: {
    init(a) {
      this.form = JSON.parse(JSON.stringify(a));
    },
    onClose() {
      this.showError = false;
    },
    onCoverChange(e) {
      let newImageUrl = e.image;
      this.form.image = newImageUrl;
    },
    onRemoveFile() {
      this.form.image = "";
    },
    onCancel() {
      this.showError = false;
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
      this.$refs["edit-about-observer"].validate().then((res) => {
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
      axios[this.urlObj.UPDATE_ABOUT.method](
        this.urlObj.UPDATE_ABOUT.url,
        this.form,
        headers
      )
        .then((res) => {
          this.showModal = false;
          this.showToast = true;
          this.$emit("update-about", res.data);
        })
        .catch((error) => {
          console.error("About API :", error);
        });
    }
  }
};
</script>

<style lang="scss">
.ls-main__about {
  #edit-about-modal {
    .modal-dialog {
      max-width: 700px;

      .modal-body {
        padding: 0 32px;
        overflow-y: auto !important;
        max-height: calc(100vh - 200px);
        overflow-x: hidden !important;
      }
    }
    .ea-modal__content {
      p {
        text-align: center;
      }
      .ea-modal__content--form {
        text-align: left;
        .ei-content__form--div {
          p {
            text-align: left !important;
          }
        }
        .ea-content__form--div {
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
  .lxp-input__footer {
    .lxp-input__footer--support-text {
      margin-bottom: 1rem !important;
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
