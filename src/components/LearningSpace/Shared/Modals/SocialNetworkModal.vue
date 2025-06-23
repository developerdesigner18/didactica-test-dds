<template>
  <div class="ls-social-network">
    <lxp-modal
      :show.sync="showModal"
      id="social-network-modal"
      centered
      title="Social Networks"
      @save="onSave"
      @modal-close="onCancel"
    >
      <div class="sn-modal__content">
        <p>
          Add link title and Url, all these pages are going to open in new tabs.
        </p>
        <ValidationObserver ref="editSocialObserver">
          <LxpStructuredList :items.sync="socialNetworks" :key="ctr">
            <template slot="item" slot-scope="{ item }">
              <div class="sn-content__form">
                <div class="sn-content__form--left">
                  <img
                    class="lxp-sl__list--item__handler"
                    src="https://files.lxp.academy.who.int/didactica/assets/images/structured-list/drag.svg"
                    alt="drag"
                    v-b-tooltip.hover.right="{
                      customClass: 'ls-social-network--tooltip'
                    }"
                    title="Drag & Drop"
                    loading="lazy"
                  />

                  <div class="sn-content__form--left__content">
                    <img :src="item.path" alt="icon" loading="lazy" />
                    <span class="sn-content__list--name">{{ item.title }}</span>
                  </div>
                </div>
                <div
                  :class="[
                    'sn-content__form--right',
                    {
                      'sn-content__form--right__value': item.url && !item.isEdit
                    }
                  ]"
                >
                  <div
                    class="sn-content__forms--actions sn-content__forms--add"
                    v-if="!item.url && !item.isEdit"
                    @click="onAdd(item)"
                  >
                    Add
                  </div>
                  <ValidationProvider
                    name="url"
                    ref="editSocialProvider"
                    :rules="{
                      regex:
                        /^(?:(?:(?:https?):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i
                    }"
                    v-slot="{ errors }"
                  >
                    <div
                      class="sn-content__forms--actions sn-content__forms--edit"
                      v-if="item.isEdit"
                    >
                      <lxp-input
                        ref="socialUrlInput"
                        :label="item.name ? 'Enter URL' : 'Enter username'"
                        v-model="item.url"
                        :value="item.url"
                        :hasError="errors[0] ? true : false"
                      />
                      <a
                        class="sn-content__forms--edit__btn"
                        @click="onSubmit(item)"
                        >Submit</a
                      >
                      <img
                        src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/remove.svg"
                        alt="remove"
                        loading="lazy"
                        @click="onRemove(item, 'new')"
                      />
                    </div>

                    <span class="sn-content__forms--edit__error" v-if="errors">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                  <div
                    class="sn-content__forms--actions sn-content__forms--value"
                    v-if="item.url && !item.isEdit"
                  >
                    <span class="sn-content__list--name" :title="item.url">{{
                      item.url
                    }}</span>
                    <img
                      src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/remove.svg"
                      alt="remove"
                      loading="lazy"
                      @click="onRemove(item, 'existing')"
                    />
                  </div>
                </div>
              </div>
            </template>
          </LxpStructuredList>
        </ValidationObserver>
      </div>
      <div class="sm-content__list_err" v-if="showError">
        <img
          src="https://files.lxp.academy.who.int/didactica/assets/images/modal/error.svg"
          alt="close"
          loading="lazy"
        />
        {{ errorMsg }}
        <span>
          <LxpButton
            class="list_err-close"
            variant="link"
            @click="showError = false"
          >
            <img
              src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
              alt="close"
              loading="lazy"
            />
          </LxpButton>
        </span>
      </div>
    </lxp-modal>
    <LxpToaster
      title="Updated"
      :show.sync="showToast"
      variant="success"
      message="Social networks updated successfully!"
    />
  </div>
</template>
<script>
import axios from "axios";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";

import {
  LxpInput,
  LxpModal,
  LxpStructuredList,
  LxpToaster,
  LxpButton
} from "@/components/Common/index.js";

export default {
  inject: ["urlObj", "authToken"],
  props: {
    show: {
      type: Boolean,
      default: false
    },

    networks: Array
  },
  components: {
    LxpInput,
    LxpModal,
    LxpStructuredList,
    LxpToaster,
    LxpButton,
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      socialNetworks: [],
      initialSocialNetworksData: [],
      showModal: false,
      ctr: 0,
      showError: false,
      showToast: false
    };
  },
  watch: {
    showModal(newValue) {
      this.$emit("update:show", newValue);
      if (!newValue) {
        this.init();
      }
    },
    show() {
      this.showModal = this.show;
      if (this.show) {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.initialSocialNetworksData = JSON.parse(
        JSON.stringify(this.networks)
      );
      this.socialNetworks = JSON.parse(JSON.stringify(this.networks));
      this.socialNetworks.sort((a, b) => a.order - b.order);
      this.socialNetworks.forEach((n, i) => {
        this.$set(n, "isEdit", false);
        n.order = i + 1;
      });
      this.ctr++;
    },
    onAdd(item) {
      item.isEdit = true;
    },
    onRemove(item) {
      item.url = "";

      item.isEdit = false;
      this.ctr++;
    },
    onSubmit(item) {
      if (!this.$refs.socialUrlInput.hasError) {
        item.isEdit = false;
      }
    },
    onCancel() {
      this.socialNetworks = [];
      this.showError = false;
      this.initialSocialNetworksData = [];
      this.$refs.editSocialObserver.reset();
    },
    onSave() {
      const updatedNetworks = this.socialNetworks.map((s, i) => ({
        name: s.name,
        url: s.url,
        order: i + 1
      }));
      axios[this.urlObj.UPDATE_SOCIAL_NETWORK.method](
        this.urlObj.UPDATE_SOCIAL_NETWORK.url,
        updatedNetworks,
        {
          headers: {
            Authorization: this.authToken
          }
        }
      )
        .then((res) => {
          this.$emit("social-networks-updated", res.data);
          this.showModal = false;
          this.showToast = true;
        })
        .catch((error) => {
          this.showError = true;

          this.errorMsg = error.message;
          setTimeout(() => {
            this.showError = false;
          }, 5000);
        });
    }
  }
};
</script>

<style lang="scss">
.ls-social-network {
  #social-network-modal {
    .modal-dialog {
      max-width: 650px;
      .modal-body {
        padding: 16px 40px;
        overflow-y: auto !important;
        max-height: calc(100vh - 200px);
        .sn-modal__content {
          p {
            @include body-regular;
            margin-bottom: 26px;
            text-align: center;
          }
          .lxp-sl__list--item {
            margin-bottom: 24px;
          }
          .sn-content__form {
            @include horizontal-space-between;
            .sn-content__form--left,
            .sn-content__form--right .sn-content__forms--actions {
              @include flex-horizontal-center;
              .sn-content__list--name {
                // @include body-regular;
                margin-bottom: 0;
                @include text-ellipsis;
              }
            }
            .sn-content__form--left {
              .sn-content__list--name {
                margin-left: 10px;
              }
              .sn-content__form--left__content {
                display: flex;
                margin-left: 23px;
              }
              img {
                cursor: pointer;
              }
            }
            .sn-content__form--right {
              display: flex;
              &.sn-content__form--right__value {
                .sn-content__forms--actions {
                  justify-content: flex-end;
                }
              }
              .sn-content__list--name {
                margin-right: 8px;
                width: 60% !important;
                @include text-ellipsis;
                position: absolute;
                text-align: right !important;
                padding-right: 12px;
                padding-left: 25px;
              }
              .sn-content__forms--add {
                background: $brand-primary-100;
                border-radius: 100px;
                padding: 4px 16px;
                color: $brand-primary;
                cursor: pointer;
                @include body-medium;
              }
              img {
                cursor: pointer;
              }
              .sn-content__forms--edit {
                .sn-content__forms--edit__btn {
                  @include body-medium;
                  color: $brand-primary;
                  margin: 0 8px;
                  padding: 4px 8px;
                  text-decoration: none;
                  cursor: pointer;
                }
              }
              .sn-content__forms--edit__error {
                display: flex !important;
                text-align: left !important;
                margin-top: 0 4px 0 4px;
                @include label-medium;
                color: $brand-error-400;
                padding: 0 10px 0 0;
                line-height: 24px;
              }
            }
          }
        }
      }
    }
  }
  .sm-content__list_err {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 21px; /* 150% */
    letter-spacing: 0.25px;
    color: $brand-neutral-700;

    border-radius: 8px;
    border: 2px solid $brand-error-400;
    background: $brand-error-100;
    padding: 8px;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    .lxp-button {
      padding: 0px !important;
      height: 25px !important;
    }
    .list_err-close {
      background: transparent;
      width: 24px;
      height: 24px;
      padding: 0 5px;
      border: none;
      border-radius: 100%;
      float: right !important;
      img {
        width: 14px;
        height: 14px;
        vertical-align: middle;
      }
      &:hover {
        background: $brand-error-200;
      }
    }
  }
}
.tooltip {
  opacity: 1 !important;
}
.ls-social-network--tooltip {
  .tooltip-inner {
    background: $brand-primary !important;
    padding: 8px 16px !important;
    @include label-medium($font-weight: 500);
  }
}
[dir="rtl"] {
  .ls-social-network {
    #social-network-modal {
      .modal-dialog {
        .sn-modal__content {
          .sn-content__form {
            .sn-content__form--left {
              p {
                margin: 0 10px 0 0;
              }
              .sn-content__form--left__content {
                margin: 0 23px 0 0;
              }
            }
            .sn-content__form--right {
              .sn-content__list--name {
                margin: 0 0 0 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
