<template>
  <div :class="['lxp-menu', className]">
    <b-dropdown
      :id="`dropdown-${id}`"
      :no-caret="true"
      class="lxp-menu--dropdown"
      @shown="onMenuShow"
      @hidden="onMenuHide"
      boundary="window"
      boundary-append-to="body"
    >
      <template v-slot:button-content>
        <div class="lxp-menu--dropdown-button">
          <slot name="prepend"></slot>
          <div class="d-inline" v-if="!$slots.append">
            <span
              class="lxp-menu__prepend"
              v-if="prepend"
              @click="$emit('prepend')"
            >
              <img :src="prependImage" :alt="prependAlt" loading="lazy"
            /></span>
          </div>

          <div v-if="isMenuTextHTML" class="lxp-menu--text" v-html="text"></div>
          <div v-else class="lxp-menu--text">{{ text }}</div>
          <span class="lxp-menu--img" v-if="noCaret === false">
            <img
              :src="
                menuOpen
                  ? 'https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/arrow-up-black.svg'
                  : 'https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/drop-down-arrow.svg'
              "
              :alt="menuOpen ? 'up-arrow' : 'down-arrow'"
              loading="lazy"
            />
          </span>

          <slot name="append"></slot>
          <div class="d-inline" v-if="!$slots.append">
            <span
              class="lxp-menu__append"
              v-if="append"
              @click="$emit('append')"
            ></span>
          </div>
        </div>
      </template>

      <b-dropdown-item
        :active="item.active"
        v-for="(item, i) in items"
        :key="i"
        @click="onClick(i)"
      >
        <slot name="prepend"></slot>
        <div class="d-inline" v-if="!$slots.append">
          <span
            class="lxp-menu__prepend"
            v-if="prepend"
            @click="$emit('prepend')"
          >
            <img
              :class="{ lxpmenu__active: item.active }"
              src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/history.svg"
              alt="history"
              loading="lazy"
          /></span>
        </div>

        {{ truncateText(item.label, 30) }}
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: "lxp-dropdown__default"
    },
    text: {
      type: String
    },
    items: {
      type: Array,
      default: () => {
        return [
          {
            label: "First item ",
            active: false
          },
          {
            label: "Second item",
            active: false
          }
        ];
      }
    },
    isMenuTextHTML: {
      type: Boolean,
      default: false
    },
    noCaret: {
      type: Boolean,
      default: true
    },
    prepend: {
      type: Boolean,
      default: false
    },
    prependImage: {
      type: String,
      default:
        "https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/add.svg" // provide a default image path
    },
    prependAlt: {
      type: String,
      default: "add" // provide a default alt text
    },
    append: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ""
    },
    selected: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      cItems: [],
      menuOpen: false
    };
  },
  mounted() {
    this.items.forEach((c, index) => {
      if (c.value === this.selected) {
        this.items[index].active = true;
      } else {
        this.items[index].active = false;
      }
    });
    this.cItems = this.items;
  },
  methods: {
    onClick(i) {
      this.cItems.forEach((c, index) => {
        if (index === i) {
          this.cItems[index].active = true;
        } else {
          this.cItems[index].active = false;
        }
      });
      this.$emit("select", this.items[i]);
    },
    truncateText(label, maxLength) {
      if (label.length <= maxLength) {
        return label;
      } else {
        return label.slice(0, maxLength) + " ...";
      }
    },
    onMenuShow() {
      this.menuOpen = true;
      this.$emit("menuStatus", this.menuOpen);
    },
    onMenuHide() {
      this.menuOpen = false;
      this.$emit("menuStatus", this.menuOpen);
    }
  }
};
</script>

<style lang="scss" scoped>
.lxp-menu {
  @include scroll-bar;
  .lxp-menu--text {
    display: contents;
    @include label-large($font-color: $brand-primary, $font-weight: 500);
  }
  .lxp-menu--img {
    padding-left: 6px;
    img {
      width: 24px;
      height: 24px;
    }
  }
  .b-dropdown {
    border: none !important;
    background: transparent !important;
    .dropdown-toggle {
      @include label-large($brand-primary, 500);
      padding: 8px;
      &::after {
        vertical-align: 0.15em;
      }
      &:hover,
      &:focus,
      &:active {
        background: $brand-primary-100 !important;
        border-radius: 8px;
        border: none;
        color: $brand-primary;
      }
    }

    .dropdown-menu {
      background: #ffffff;
      box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
      border-radius: 8px;
      border: none;
      padding: 0;
      z-index: 9999;
      overflow: auto;
      max-width: 298px;
      max-height: 160px;
      overflow-x: hidden;
      li {
        &:first-child {
          .dropdown-item {
            &.active {
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            z-index: 9999;
          }
        }
        &:last-child {
          .dropdown-item {
            &.active {
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
            }
            z-index: 9999;
          }
        }
        .dropdown-item {
          padding: 8px;
          @include label-large($brand-neutral-700, 400);
          &:hover {
            background: $brand-primary-100;
          }
          &.active {
            @include label-large($brand-primary-400, 500);
            background: $brand-primary-100;
          }
          z-index: 9999;
        }
      }
    }
  }
}
.lxp-menu__prepend-slot {
  display: inline;
}
.lxp-menu__prepend {
  padding: 0 8px 0 0;

  .lxpmenu__active {
    filter: brightness(0) saturate(100%) invert(39%) sepia(72%) saturate(4645%)
      hue-rotate(196deg) brightness(103%) contrast(102%);
  }
}
.lxp-menu__append {
  padding: 0 8px 0 8px;
}
</style>
<style lang="scss">
.lxp-menu {
  .b-dropdown {
    border: none !important;
    background: transparent !important;
    .dropdown-toggle {
      @include label-large($brand-primary, 500);
      padding: 8px;
      &::after {
        vertical-align: 0.15em;
      }
      &:hover,
      &:focus,
      &:active {
        background: $brand-primary-100 !important;
        border-radius: 8px;
        border: none;
        color: $brand-primary;
      }
    }
    .lxp-menu--dropdown-button {
      border: 1px solid transparent !important;
      border-radius: 8px !important;
      color: $brand-primary !important;
      background: transparent !important;
      &:active,
      &:focus {
        border: 1px solid $brand-primary;
        background: $brand-primary-100 !important;
        box-shadow: none !important;
        outline: none !important;
      }
    }

    .dropdown-menu {
      background: #ffffff;
      box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
      border-radius: 8px;
      border: none;
      padding: 0;
      z-index: 9999;
      overflow: auto;
      max-width: 298px;
      max-height: 160px;
      overflow-x: hidden;
      li {
        &:first-child {
          .dropdown-item {
            &.active {
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
            }
            z-index: 9999;
          }
        }
        &:last-child {
          .dropdown-item {
            &.active {
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
            }
            z-index: 9999;
          }
        }
        .dropdown-item {
          padding: 8px;
          @include label-large($brand-neutral-700, 400);
          white-space: normal;
          word-break: break-word;
          &:hover {
            background: $brand-primary-100;
          }
          &.active {
            @include label-large($brand-primary-400, 500);
            background: $brand-primary-100;
          }
          z-index: 9999;
        }
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .lxp-menu {
    .b-dropdown {
      .dropdown-menu {
        max-width: 160px;
      }
    }
  }
}
</style>
