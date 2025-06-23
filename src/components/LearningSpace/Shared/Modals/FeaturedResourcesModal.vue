<template>
  <div class="ls-featured-resources">
    <lxp-modal
      :show.sync="showModal"
      id="featured-resources-modal"
      centered
      title="Featured Resources"
      @save="onSave"
      @modal-close="onCancel"
    >
      <div class="fr-modal__content">
        <p class="fr-modal__content--subheading">
          Add the resources you want to feature on the about page. Limited to
          four resources. You can drag and drop to reorganize.
        </p>
        <div class="fr-content__div">
          <div class="fr-content__list" v-if="featuredResources.length > 0">
            <LxpStructuredList
              :items.sync="featuredResources"
              @drag-end="onDragEnd"
            >
              <template slot="item" slot-scope="{ item, index }">
                <div class="fr-content__list--item">
                  <div class="fr-content__list--left">
                    <img
                      class="lxp-sl__list--item__handler"
                      src="https://files.lxp.academy.who.int/didactica/assets/images/structured-list/drag.svg"
                      alt="drag"
                      v-b-tooltip.hover.right="{
                        customClass: 'ls-featured-resources--tooltip'
                      }"
                      title="Drag & Drop"
                      loading="lazy"
                    />
                    <span class="fr-content__list--name">{{ item.title }}</span>
                  </div>
                  <img
                    src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/remove.svg"
                    alt="remove"
                    loading="lazy"
                    @click="onRemove(index)"
                  />
                </div>
              </template>
            </LxpStructuredList>
            <div class="fr-content__list_err" v-if="showError">
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
          </div>
        </div>
        <ValidationObserver ref="edit-featured-resources-observer">
          <ValidationProvider name="course_id">
            <lxp-autocomplete
              placeholder="Search for a resource"
              :dataFetchURL="resourceURL"
              :selectedItems="selectedResources"
              @select="onSelect"
            />
          </ValidationProvider>
        </ValidationObserver>
      </div>
    </lxp-modal>
    <LxpToaster
      title="Updated"
      :show.sync="showToast"
      variant="success"
      message="Featured Resources updated successfully!"
    />
  </div>
</template>

<script>
import axios from "axios";
import { ValidationObserver } from "vee-validate";
import { ValidationProvider } from "vee-validate/dist/vee-validate.full.esm";

import {
  LxpAutocomplete,
  LxpButton,
  LxpModal,
  LxpStructuredList,
  LxpToaster
} from "@/components/Common/index.js";

export default {
  inject: ["urlObj", "authToken"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    resources: {
      type: Array,
      default: () => []
    },
    parent: {
      type: String,
      default: ""
    },
    initiative: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    LxpAutocomplete,
    LxpModal,
    LxpStructuredList,
    ValidationObserver,
    LxpToaster,
    ValidationProvider,
    LxpButton
  },
  data() {
    return {
      initialfeaturedResources: [],
      search: "",
      showModal: false,
      featuredResources: [],
      errorMsg: "",
      showToast: false,
      showError: false
    };
  },
  computed: {
    resourceURL() {
      return `${this.urlObj.LIST_FEATURED_RESOURCES.url}&page_size=20&page=1`;
    },
    selectedResources() {
      return this.featuredResources.map((fr) => fr.id);
    }
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
    },
    resources: {
      immediate: true,
      handler() {
        this.init();
      }
    }
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.initialfeaturedResources = this.resources
        ? JSON.parse(JSON.stringify(this.resources))
        : [];
      this.featuredResources = this.resources
        ? JSON.parse(JSON.stringify(this.resources))
        : [];

      this.featuredResources.sort((a, b) => a.order - b.order);
      this.featuredResources.forEach((n, i) => {
        this.$set(n, "isEdit", false);
        n.order = i + 1;
      });
    },
    reOrderList() {
      this.featuredResources.map((e, i) => {
        e.order = i + 1;
      });
    },
    onRemove(index) {
      this.featuredResources.splice(index, 1);
      this.reOrderList();
    },
    onCancel() {
      this.showError = false;
      this.search = "";
      this.featuredResources = this.initialfeaturedResources;
    },
    isCoursesValid() {
      const array = this.featuredResources.map((f) => f.id);

      return new Set(array).size === array.length;
    },
    onSave() {
      this.errorMsg = "";
      if (!this.isCoursesValid()) {
        this.errorMsg = "Featured resources cannot have duplicate courses.";
        this.showError = true;
        setTimeout(() => {
          this.showError = false;
        }, 5000);

        return;
      }
      let updatedFeatures = this.featuredResources.map((f, i) => {
          return {
            course_id: f.id,
            order: i + 1
          };
        }),
        headers = {
          headers: {
            Authorization: this.authToken
          }
        },
        url;

      if (this.parent === "initiatives") {
        url = this.urlObj.LIST_INITIATIVES_FEATURED_RESOURCES.url.replace(
          "{initiative_id}",
          this.initiative.id
        );
        updatedFeatures = {
          courses: this.featuredResources.map((f, i) => {
            return {
              id: f.id,
              order: i + 1
            };
          })
        };
      } else {
        url = this.urlObj.UPDATE_FEATURED_RESOURCES.url;
      }

      axios[this.urlObj.UPDATE_FEATURED_RESOURCES.method](
        url,
        updatedFeatures,
        headers
      )
        .then((res) => {
          this.$emit("featured-resources-updated", res);
          this.showModal = false;
          this.showToast = true;
        })
        .catch((error) => {
          this.errorMsg = `Error saving featuredResources (${error.message})`;
          this.showError = true;
          console.error(this.errorMsg, error);
          setTimeout(() => {
            this.showError = false;
          }, 6000);
        });
    },
    onDragEnd(list) {
      this.featuredResources = list;
      this.reOrderList();
    },
    onSelect(resource) {
      if (!resource) {
        console.error("No resource selected");
        return;
      }
      resource.order = this.featuredResources.length + 1;
      this.featuredResources.push(resource);
    }
  }
};
</script>

<style lang="scss">
.ls-featured-resources {
  #featured-resources-modal {
    .modal-dialog {
      max-width: 650px;
      .modal-body {
        padding: 16px 40px;
        .fr-modal__content {
          .fr-modal__content--subheading {
            @include body-regular;
            margin-bottom: 26px;
            text-align: center;
          }
          .lxp-sl__list--item {
            margin-bottom: 20px;
            .fr-content__list--item {
              @include horizontal-space-between;
              .fr-content__list--left {
                width: 90%;
                display: flex;
                img {
                  cursor: pointer !important;
                }
                .fr-content__list--name {
                  margin-left: 23px;
                  @include text-ellipsis;
                }
              }
              img {
                cursor: pointer !important;
              }
            }
          }
          .fr-content__list_err {
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 21px; /* 150% */
            letter-spacing: 0.25px;
            color: $brand-neutral-700;
            margin-bottom: 1rem;
            border-radius: 8px;
            border: 2px solid $brand-error-400;
            background: $brand-error-100;
            padding: 8px;
            justify-content: center;
            align-items: flex-start;
            gap: 8px;
            align-self: stretch;
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
      }
    }
  }
}
.tooltip {
  opacity: 1 !important;
}
.ls-featured-resources--tooltip {
  .tooltip-inner {
    background: $brand-primary !important;
    padding: 8px 16px !important;
    @include label-medium($font-weight: 500);
  }
}
// .tooltip .arrow {
//   left: 7px !important;
// }
</style>
