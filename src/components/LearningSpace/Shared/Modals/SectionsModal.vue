<template>
  <div class="ls-manage-sections">
    <lxp-modal
      :show.sync="showModal"
      id="manage-sections-modal"
      centered
      title="Manage sections"
      @save="onSave"
      @modal-close="onCancel"
    >
      <div class="ms-modal__content">
        <p>Uncheck to hide sections.</p>
        <div class="ms-content__div">
          <div
            :class="['ms-content__list', { 'ms-content__list-edit': s.edit }]"
            v-for="s in options.filter((o) => o.show === true)"
            :key="s.id"
            @mouseenter="handleMouseEnter(s)"
            @mouseleave="handleMouseLeave(s)"
          >
            <lxp-checkbox
              :id="`checkbox-${s.id}`"
              :text="s.edit ? '' : s.title"
              v-model="s.checked"
              :disabled="s.disabled"
            />
            <lxp-input
              v-if="s.edit"
              :value="s.title"
              v-model="s.title"
              :maxlength="15"
              :prepend="`<div class='ms-content__input--save'>Save</div>`"
              @prepend="onInputSave(s)"
            />

            <img
              src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/edit-black.svg"
              alt="edit"
              :class="[
                'ms-content__list--img',
                { 'd-flex': s.hover, 'd-none': !s.hover }
              ]"
              loading="lazy"
              @click="onEdit(s)"
              v-if="!s.edit"
            />
          </div>
          <div class="ms-content__list_err" v-if="showError">
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
    </lxp-modal>
    <LxpToaster
      title="Updated"
      :show.sync="showToast"
      variant="success"
      message="Sections updated successfully!"
    />
  </div>
</template>

<script>
import {
  LxpInput,
  LxpModal,
  LxpToaster,
  LxpCheckbox,
  LxpButton
} from "@/components/Common/index.js";
import axios from "axios";
export default {
  inject: ["urlObj", "authToken"],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    section: Array
  },
  components: {
    LxpInput,
    LxpModal,
    LxpToaster,
    LxpCheckbox,
    LxpButton
  },
  data() {
    return {
      showModal: false,
      showToast: false,
      sections: [], // Must be an array reference!
      options: [
        {
          name: "about",
          title: "About",
          show: true,
          id: 1,
          disabled: true,
          edit: false,
          hover: false,
          checked: true
        },
        {
          name: "courses",
          title: "courses",
          show: true,
          id: 2,
          disabled: true,
          edit: false,
          hover: false,
          checked: true
        },
        {
          name: "events",
          title: "Events",
          show: false,
          id: 3,
          disabled: false,
          edit: false,
          hover: false,
          checked: false
        },
        {
          name: "initiatives",
          title: "Initiatives",
          show: true,
          id: 4,
          disabled: false,
          edit: false,
          hover: false,
          checked: true
        }
      ],
      showError: false,
      errorMsg: "",
      initialOptions: []
    };
  },
  watch: {
    showModal(newValue) {
      this.$emit("update:show", newValue);
    },
    show() {
      this.showModal = this.show;
    }
  },
  created() {
    this.options.forEach((o) => {
      const v = this.section.find((s) => s.name === o.name);
      if (v) {
        o.title = v.title;
        o.checked = v.is_enabled;
      }
    });
    this.initialOptions = JSON.parse(JSON.stringify(this.options));
  },
  methods: {
    onSave() {
      this.errorMsg = "";
      const updatedSections = this.options.map((s) => ({
        name: s.name,
        title: s.title,
        is_enabled: s.checked
      }));
      this.options.forEach((o) => {
        o.edit = false;
      });
      axios[this.urlObj.UPDATE_MANAGE_SECTION.method](
        this.urlObj.UPDATE_MANAGE_SECTION.url,
        updatedSections,
        {
          headers: {
            Authorization: this.authToken
          }
        }
      )
        .then((res) => {
          this.$emit("update-manage-section", res.data);
          this.initialOptions = JSON.parse(JSON.stringify(this.options));
          this.showModal = false;
          this.showToast = true;
        })
        .catch((error) => {
          this.showError = true;
          this.errorMsg = `Error saving Sections`;
          console.error(this.errorMsg, error);
          setTimeout(() => {
            this.showError = false;
          }, 6000);
        });
    },
    onCancel() {
      this.options = JSON.parse(JSON.stringify(this.initialOptions));
      this.options.forEach((o) => {
        o.edit = false;
      });
      this.showError = false;
    },
    handleMouseEnter(s) {
      this.$set(s, "hover", true);
    },
    handleMouseLeave(s) {
      this.$set(s, "hover", false);
    },
    onEdit(item) {
      this.$set(item, "edit", true);
    },
    onInputSave(item) {
      this.$set(item, "edit", false);
    }
  }
};
</script>

<style lang="scss">
#manage-sections-modal {
  .modal-dialog {
    max-width: 290px;
    .modal-header {
      padding-bottom: 0px;
    }
    .modal-body {
      padding-top: 0px;
      padding-bottom: 0px !important;
    }
    .modal-footer {
      padding-top: 0px !important;
    }
    .ms-modal__content {
      padding: 5px;
      p {
        @include label-large;
        margin-bottom: 7px;
        padding: 0 15px 10px 0;
        text-align: center;
      }
      .ms-content__div {
        .ms-content__list {
          @include horizontal-space-between;
          margin-bottom: 20px;
          height: 24px;
          &.ms-content__list-edit {
            .lxp-input {
              display: flex;
              margin-bottom: 0px;
              width: 100%;
              .ms-content__input--save {
                @include label-large($brand-primary);
              }
            }
          }

          .custom-checkbox {
            display: flex;
            margin-left: 10px;

            input[disabled="disabled"] ~ .custom-control-input::after {
              background: $brand-neutral-300 !important;
            }
            .custom-control-label {
              padding-left: 10px;
              @include label-large($brand-primary);
            }
          }
          .ms-content__list--img {
            cursor: pointer;
          }
        }
        .ms-content__list_err {
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 21px; /* 150% */
          letter-spacing: 0.25px;
          color: var(--on-surface-2, #434343);
          display: flex;
          padding: 8px;
          justify-content: center;
          align-items: flex-start;
          gap: 8px;
          align-self: stretch;
          border-radius: 8px;
          border: 2px solid var(--error-error, #ff4040);
          background: var(--error-error-container, #ffecec);
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
</style>
