<template>
  <div class="lxp-modal">
    <div
      class="modal fade"
      :id="id"
      ref="modal"
      @click.self="showModal = false"
    >
      <div
        :class="[
          'modal-dialog',
          { 'modal-dialog-centered': centered },
          `modal-${size}`
        ]"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header" v-if="!hideHeader">
            <h5 class="modal-title" v-if="title">{{ title }}</h5>
            <button
              v-if="!hideHeaderClose"
              class="lxp-modal__close"
              type="button"
              @click="onModalClose"
            >
              <img
                src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
                alt="close"
                loading="lazy"
              />
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer" v-if="!hideFooter">
            <slot name="footer"></slot>
            <div class="d-flex" v-if="!$slots.footer">
              <lxp-button :variant="cancelVariant" @click="onModalClose">
                {{ cancelTitle }}
              </lxp-button>
              <lxp-button
                :variant="saveVariant"
                :disabled="saveDisabled"
                @click="$emit('save')"
                >{{ saveTitle }}</lxp-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop" ref="backdrop" v-if="show"></div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  props: {
    id: String,
    show: Boolean,
    centered: Boolean,
    hideHeader: Boolean,
    hideHeaderClose: Boolean,
    title: {
      type: String
    },
    hideFooter: Boolean,
    cancelTitle: {
      type: String,
      default: "Cancel"
    },
    cancelVariant: {
      type: String,
      default: "outline-primary"
    },
    saveTitle: {
      type: String,
      default: "Save"
    },
    saveVariant: {
      type: String,
      default: "primary"
    },
    saveDisabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => {
        return ["sm", "lg", "md"].indexOf(value) !== -1;
      }
    }
  },
  watch: {
    show(v) {
      if (v === true) {
        this.startTransitionModal();
      } else {
        this.endTransitionModal();
      }
    }
  },
  components: {
    "lxp-button": Button
  },
  created() {
    if (this.show) {
      setTimeout(() => {
        this.startTransitionModal();
      }, 10);
    }
  },
  methods: {
    startTransitionModal() {
      if (this.$refs.modal) {
        this.$refs.modal.classList.add("show", "d-block");
      }
    },
    endTransitionModal() {
      if (this.$refs.modal) {
        this.$refs.modal.classList.remove("show", "d-block");
      }
    },
    onModalClose() {
      this.$emit("update:show", false);
      this.$emit("modal-close");
    }
  }
};
</script>

<style lang="scss">
.lxp-modal {
  @include modal-scroll-bar;
  .modal-dialog {
    max-width: 600px;

    .modal-content {
      overflow-y: auto;
      box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
      border-radius: 16px;
      .modal-header {
        justify-content: flex-end;
        border-bottom: none;
        .modal-title {
          flex-grow: 1;
          @include subtitle-large($brand-neutral-900);
          text-align: center;
          margin-bottom: 0;
        }
        .lxp-modal__close {
          background: #fff;
          width: 24px;
          height: 24px;
          padding: 0 5px;
          border: none;
          border-radius: 100%;
          @include flex-horizontal-center;
          img {
            width: 14px;
            height: 14px;
            vertical-align: middle;
          }
          &:hover {
            background: $brand-primary-100;
          }
          &:active {
            background: #fff;
          }
        }
      }
      .modal-footer {
        border-top: none;
        justify-content: center;
        .btn {
          &:first-child {
            margin-right: 30px;
          }
        }
      }
    }
  }
}
</style>
