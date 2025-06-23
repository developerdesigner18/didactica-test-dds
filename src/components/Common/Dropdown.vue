<template>
  <div :class="{ 'lxp-select__error': showError }">
    <div
      :class="['lx-select-dd', { 'form-floating': isFloating }, dropdownClass]"
    >
      <div
        :class="[
          'lx-select__div',
          {
            error: showError,
            'lx-select__label--show': text || placeholder !== '',
            'lx-select__prepend': prepend,
            'lx-select__append': append,
            'lx-select__disabled': disabled
          }
        ]"
      >
        <label
          :class="[
            'lx-select__label',
            { 'lx-select__label--prepend': prepend }
          ]"
          >{{ label }}</label
        >
        <b-dropdown
          size="sm"
          no-caret
          class="lx-select__dropdown"
          :disabled="disabled"
        >
          <template v-slot:button-content>
            <span
              class="form-floating__prepend"
              v-if="prepend"
              @click="$emit('prepend')"
              ><img
                src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/add.svg"
                alt="add"
                loading="lazy"
              />
            </span>
            <div
              :class="[
                'lx-select__dd--div',
                { 'lx-select__dd--div__label': label !== '' }
              ]"
              v-if="buttonContent === ''"
            >
              <p
                :class="{
                  placeholder: !value,
                  'form-floating__prepend--ph': prepend
                }"
              >
                {{
                  value
                    ? typeof value === "object"
                      ? value.name
                      : value
                    : text === "" || text === undefined
                    ? label
                    : text
                }}
              </p>
              <span class="ob-dd__icon" v-if="buttonContent === ''">
                <img
                  :src="
                    buttonContent === ''
                      ? 'https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/expand.svg'
                      : 'https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/expand.svg'
                  "
                  :alt="buttonContent === '' ? 'arrow' : 'expand'"
                  align="right"
                  loading="lazy"
                />
              </span>
            </div>
            <div class="lxp-select__dd--div" v-else v-html="buttonContent" />
            <span
              class="form-floating__append"
              v-if="append"
              @click="$emit('append')"
            ></span>
          </template>
          <b-dropdown-item
            v-for="(r, index) in dropdownArr"
            :key="index"
            href="javascript:;"
            @click="onSelect(r)"
            :class="{ 'active-class': r == value }"
          >
            <span
              class="form-floating__prepend"
              v-if="prepend"
              @click="$emit('prepend')"
              ><img
                src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/history.svg"
                alt="add"
                loading="lazy"
              />
            </span>
            <span
              :class="{
                'form-floating__prepend--ph': prepend
              }"
              v-html="typeof r == 'object' ? r.name : r"
            ></span>
            <span
              class="form-floating__append"
              v-if="append"
              @click="$emit('append')"
            >
              <img
                src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/chevron-right.svg"
                alt="chevron"
                loading="lazy"
            /></span>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>

    <div :class="['lxp-select__footer', { 'has-support-text': supportText }]">
      <p v-if="supportText" class="lxp-select__footer__support_text">
        {{ supportText }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    placeholder: String,
    value: { type: [String, Object], default: "" },
    dropdownArr: Array,
    showError: Boolean,
    supportText: String,
    prepend: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      default: "*This is a mandatory field"
    },
    buttonContent: {
      type: String,
      default: ""
    },
    dropdownClass: String,
    isFloating: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: ""
    };
  },
  created() {
    this.text = this.value;
  },
  methods: {
    onSelect(r) {
      this.text = r;
      this.$emit("click", r);
    }
  }
};
</script>
<style lang="scss">
@import "@/scss/_floating.scss";
.lxp-select__error {
  .form-floating {
    border-color: $brand-error-400;
    &.form-floating--focus {
      border: 1px solid $brand-primary;
    }
  }
  .lxp-select__footer__support_text {
    color: $brand-error-400;
  }
}
.lx-select-dd {
  @include scroll-bar;
  .error-message {
    @include error-text;
    color: $brand-neutral-1000;
    margin-top: 5px;
  }
  .btn {
    text-align: left !important;
  }
  .lx-select__div {
    background: $brand-primary-75;
    width: 100%;
    position: relative;
    border-radius: 8px;
    &:hover {
      background: $brand-primary-100;
    }
    &.lx-select__label--show {
      .lx-select__label {
        line-height: 14px !important;
      }
      .placeholder {
        @include body-regular(
          $font-weight: 400,
          $font-color: $brand-neutral-900
        );
        padding: 5px 0 0 0 !important;
      }
      .lx-select__label--prepend {
        position: absolute;
        left: 53px;
      }

      .form-floating__prepend {
        padding: 0;
        img {
          vertical-align: text-top !important;
        }
      }
      .form-floating__prepend--ph {
        padding: 5px 0 0 8px !important;
      }
    }
    &.lx-select__prepend {
      .form-floating__prepend {
        padding: 0;
        img {
          padding: 0 0 2px 0 !important;
          margin: 0;
        }
      }
    }
    &.lx-select__append {
      .form-floating__append {
        cursor: pointer;
        float: right;
      }
    }
    &.lx-select__disabled {
      border-radius: 8px;
      &:focus,
      &:active {
        color: $brand-neutral-300;
      }
    }
    .lx-select__dropdown {
      width: 100%;
      padding: 12px 16px 9px;
      cursor: pointer;
      border: 1px solid transparent;
      img {
        padding: 0;
      }
      &.show {
        border-radius: 8px;
        border: 1px solid $brand-primary;
      }
      .btn {
        background: transparent;
        border: none;
        box-shadow: none;
        padding: 0;
        width: 100%;
        color: $brand-neutral-900;
        &.dropdown-toggle-split {
          text-align: right;
          opacity: 1;
        }
        &:focus,
        &:active {
          background: transparent;
          color: $brand-neutral-900;
          border: 0;
          box-shadow: none !important;
        }
        .lx-select__dd--div {
          @include horizontal-space-between;
          p {
            @include body-regular(400, $brand-neutral-900);
            padding-top: 4px;
            margin: 7px 0 0;
          }
          .placeholder {
            @include body-regular(400, $brand-neutral-900);
            padding-bottom: 6px;
            background: transparent;
            opacity: unset;
            &:hover {
              cursor: pointer;
            }
          }
          &.lx-select__dd--div__label {
            p {
              margin: 0;
            }
          }
        }
        .lxp-select__dd--div {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          &:hover {
            background: $brand-primary-100;
          }
          p {
            @include label-large($brand-primary, 500);
            margin-bottom: 0;
            @include floating-label-text;
            @include text-ellipsis;
            background: transparent;

            &:active {
              color: $brand-neutral-900 !important;
            }
          }
          .ob-dd__icon {
            img {
              padding: 0 0 3px 0;
            }
          }
        }
      }
      .dropdown-menu {
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
        border-radius: 8px;
        border: none;
        padding: 0;
        margin-top: 40px;
        .active-class {
          background: #dceaff;

          .dropdown-item {
            color: $brand-neutral-900;
          }
        }
        li {
          border: none;
          padding: 0;
          .dropdown-item {
            padding: 12px;
            font-size: 14px !important;

            @include body-regular;
            outline: none;

            &:hover {
              background: $brand-primary-100;
              color: $brand-neutral-900;
            }
            &:focus,
            &:active {
              background: $brand-primary-100;
              color: $brand-primary-400;
              img {
                filter: brightness(0) saturate(100%) invert(39%) sepia(72%)
                  saturate(4645%) hue-rotate(196deg) brightness(103%)
                  contrast(102%) !important;
              }
            }
          }
        }
      }
    }
  }
}
.lxp-select__footer {
  @include label-medium($font-weight: 400);
  display: flex;
  justify-content: flex-end;
  &.has-support-text {
    justify-content: space-between;
  }
  .lxp-select__footer__support_text {
    padding: 4px 0px 0px 5px;
    color: $brand-neutral-300;
    margin-bottom: 0;
  }
}

// rtl layout
[dir="rtl"] {
  .lx-select {
    .lx-select__label {
      text-align: right;
    }
    .b-dropdown {
      .btn {
        p {
          text-align: right;
          float: right;
        }
        .ob-dd__icon {
          right: auto;
          left: 10px;
        }
      }
    }
  }
  .form-floating__append {
    padding: 0 8px 0 16px;
  }
  .lxp-select__footer {
    display: flex;
    justify-content: flex-start;
    &.has-support-text {
      justify-content: space-between;
    }
    .lxp-select__footer__support_text {
      padding-left: 0;
      padding-right: 5px;
    }
  }
}
@media screen and (max-width: 1366px) {
  .app-es,
  .app-ru {
    .lx-select__div {
      &.lx-select__label--show {
        .lx-select__label {
          font-size: 11px;
        }
        .lx-select__dropdown {
          padding-top: 30px;
          height: calc(3.5rem + 8px);
        }
      }
    }
  }
}
</style>
