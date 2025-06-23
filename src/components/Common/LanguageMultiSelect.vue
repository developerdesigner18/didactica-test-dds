<template>
  <b-dropdown
    variant="link"
    :right="language === 'ar'"
    no-caret
    :class="[
      'common-dropdown multi__language--dropdown',
      { active: languageCount > 0 }
    ]"
    ref="multi__language--dropdown"
  >
    <template #button-content>
      <span class="selected-language">
        {{ languageKeys["placeholder"] }}
      </span>
      <span class="selected-language">
        {{ languageCount ? `(${languageCount})` : "" }}
      </span>
      <img
        src="https://files.lxp.academy.who.int/learning-experience-platform/shared/arrow-grey.svg"
        alt="arrow"
        loading="lazy"
        class="arrow-icon"
        v-if="showArrowIcon"
      />
    </template>

    <!-- Search Language -->
    <b-dropdown-text class="search-box" title="">
      <img :src="searchIcon" alt="Search" loading="lazy" />
      <input
        type="text"
        v-model="multiSearchQuery"
        class="search-input"
        :placeholder="searchPlaceholder"
        @input="filterMultiLanguages"
      />
    </b-dropdown-text>

    <!-- No Results Found -->
    <b-dropdown-text v-if="noResultFound" class="no-result">
      {{ noSearchResultText }}
    </b-dropdown-text>

    <!-- Filtered Languages -->
    <b-dropdown-group class="language__list--container" v-else>
      <b-form-checkbox
        v-for="(o, i) in filteredMultiLanguages"
        :key="i"
        :value="o.id"
        v-model="internalSelectedLanguages"
        @change="handleSelectionChange"
        class="checkbox-item"
      >
        <span class="checkmark"></span>
        {{ o.displayName }}
      </b-form-checkbox>
    </b-dropdown-group>

    <!-- Clear Languages -->
    <b-dropdown-text
      v-if="languageCount > 0 && !noResultFound"
      class="clear-btn"
      @click.stop="clearLanguageSelection"
      @keydown.enter="clearLanguageSelection"
      tabindex="0"
    >
      <span class="clear-text">{{ languageKeys["clear"] }}</span>
      <img :src="clearIcon" alt="clear" loading="lazy" class="clear-icon" />
    </b-dropdown-text>
  </b-dropdown>
</template>

<script>
export default {
  data() {
    return {
      multiSearchQuery: "",
      internalSelectedLanguages: [],
      filteredMultiLanguages: [],
      searchIcon:
        "https://files.lxp.academy.who.int/learning-experience-platform/landing/search/search.svg",
      checkIcon:
        "https://files.lxp.academy.who.int/learning-experience-platform/vle/checkmark.svg",
      clearIcon:
        "https://files.lxp.academy.who.int/learning-experience-platform/vle/close-icon.svg"
    };
  },
  props: {
    allLanguage: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    language: {
      type: String,
      default: ""
    },
    searchPlaceholder: {
      type: String,
      default: "Search"
    },
    noSearchResultText: {
      type: String,
      default: "Sorry, no match found"
    },
    showArrowIcon: {
      type: Boolean,
      default: true
    },
    languageKeys: {
      type: Object,
      default: () => ({
        placeholder: "Language",
        clear: "Clear"
      })
    }
  },
  computed: {
    languageCount() {
      return this.internalSelectedLanguages?.length || 0;
    },
    noResultFound() {
      return this.filteredMultiLanguages?.length === 0;
    }
  },
  mounted() {
    this.filteredMultiLanguages = this.allLanguage;
    document.addEventListener("click", this.handleClickOutside);
    this.$el.addEventListener("focusout", this.handleFocusOut);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
    this.$el.removeEventListener("focusout", this.handleFocusOut);
  },
  methods: {
    filterMultiLanguages() {
      const query = this.multiSearchQuery.trim().toLowerCase();

      if (!query) {
        this.filteredMultiLanguages = this.allLanguage;
        return;
      }

      this.filteredMultiLanguages = this.allLanguage.filter((lang) =>
        [lang.displayName, lang.name, lang.id].some((key) =>
          key.toLowerCase().includes(query)
        )
      );
    },
    handleSelectionChange() {
      this.$emit("input", [...this.internalSelectedLanguages]);
      this.$emit("get-languages", [...this.internalSelectedLanguages]);
      this.hideDropdown();
    },
    clearLanguageSelection() {
      this.internalSelectedLanguages = [];
      this.handleSelectionChange();
    },
    handleClickOutside(event) {
      const dropdown = this.$el;
      if (dropdown && !dropdown.contains(event.target)) {
        this.resetLanguageSearchAndFilter();
      }
    },
    handleFocusOut() {
      setTimeout(() => {
        if (!this.$el.contains(document.activeElement)) {
          this.resetLanguageSearchAndFilter();
        }
      }, 100);
    },
    resetLanguageSearchAndFilter() {
      this.multiSearchQuery = "";
      this.filteredMultiLanguages = this.allLanguage;
    },
    hideDropdown() {
      const dropdown = this.$refs["multi__language--dropdown"];
      if (dropdown) {
        dropdown.hide();
      }
    }
  },
  watch: {
    allLanguage: {
      immediate: true,
      handler() {
        this.filteredMultiLanguages = this.allLanguage;
      }
    },
    value: {
      immediate: true,
      handler(newVal) {
        this.internalSelectedLanguages = [...newVal];
        this.filterMultiLanguages();
      }
    }
  }
};
</script>

<style lang="scss">
.multi__language--dropdown {
  display: flex;
  &.active,
  &.show {
    .dropdown-toggle,
    .dropdown-toggle:hover,
    .dropdown-toggle:focus {
      background-color: $brand-primary-400;
      .selected-language {
        color: $brand-primary-50;
      }
      .arrow-icon {
        filter: brightness(0) saturate(100%) invert(99%) sepia(3%)
          saturate(350%) hue-rotate(190deg);
      }
    }
  }
  .dropdown-toggle {
    height: 40px;
    @include flex-horizontal-center;
    padding: 8px;
    border-radius: 8px;
    text-decoration: none;
    background-color: $brand-neutral-0;
    box-shadow: 0px 2.5px 11px 3px rgba(0, 129, 255, 0.15);
    &:hover,
    &:focus {
      background-color: $brand-primary-75;
    }
    &:hover {
      box-shadow: 2px 2.5px 11px 3px rgba(0, 129, 255, 0.15);
    }
    &:focus {
      outline: 2px solid $brand-primary-400;
      outline-offset: -1px;
      box-shadow: none !important;
    }
    .selected-language {
      @include label-large($brand-neutral-700, 500);
      + .selected-language {
        margin-left: 4px;
      }
    }
    .arrow-icon {
      margin-left: 2px;
      transform: rotate(180deg);
    }
  }
  .dropdown-menu {
    width: 218px;
    padding: 4px;
    box-shadow: 0px 3.5px 20px 3px rgba(0, 129, 255, 0.15);
    border-radius: 8px;
    background-color: $brand-neutral-0;
    border: none;
    margin-top: 8px;
    .b-dropdown-text {
      padding: 0;
      margin: 0;
      position: relative;
      font-weight: normal;
    }
    .search-box {
      padding: 4px 4px 8px;
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 8px;
      }
      .search-input {
        width: 100%;
        border-radius: 100px;
        border: 1px solid $brand-neutral-200;
        background-color: $brand-neutral-0;
        padding: 4px 8px 5px 40px;
        @include body-medium;
        color: $brand-neutral-900;
        &::placeholder {
          color: $brand-neutral-300;
        }
        &:focus {
          outline: none;
          border-color: $brand-primary;
        }
      }
    }
    .language__list--container {
      max-height: 320px;
      overflow-y: auto;
      overflow-x: hidden;
      padding-right: 4px;
      &::-webkit-scrollbar-track {
        border-radius: 8px;
        border: none;
        background-color: $brand-neutral-75;
      }
      &::-webkit-scrollbar {
        width: 4px;
        background-color: transparent;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: none;
        background-color: $brand-neutral-300;
      }
      > ul {
        padding: 0;
        list-style-type: none;
      }
      .checkbox-item {
        width: 100%;
        position: relative;
        cursor: pointer;
        padding: 0;
        .custom-control-input {
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
          cursor: pointer;
          &:hover,
          &:focus,
          &.active {
            ~ .custom-control-label {
              background-color: $brand-primary-100;
            }
          }
          &:focus {
            ~ .custom-control-label {
              outline: 2px solid $brand-primary-400;
              outline-offset: -2px;
            }
          }
          &:checked {
            ~ .custom-control-label {
              .checkmark {
                background-color: $brand-neutral-700;
                &::before {
                  visibility: visible;
                }
              }
            }
          }
        }
        .custom-control-label {
          padding: 8px 8px 8px 40px;
          border-radius: 8px;
          width: 100%;
          @include body-medium;
          color: $brand-neutral-700;
          text-transform: capitalize;
          word-break: break-word;
          white-space: normal;
        }
        .checkmark {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 10px;
          height: 16px;
          width: 16px;
          border: 2px solid $brand-neutral-700;
          border-radius: 4px;
          background-color: transparent;
          cursor: pointer;
          &::before {
            content: "";
            visibility: hidden;
            position: absolute;
            left: 50%;
            top: 48%;
            width: 6px;
            height: 10px;
            border: solid $brand-neutral-0;
            border-width: 0 2px 2px 0;
            transform: translate(-50%, -50%) rotate(45deg);
          }
        }
      }
    }
    .clear-btn {
      width: 100%;
      cursor: pointer;
      .b-dropdown-text {
        padding: 8px 10px 8px 8px;
        border-top: 1px solid $brand-neutral-200;
        @include horizontal-space-between;
        @include body-medium;
        color: $brand-neutral-700;
        .clear-icon {
          outline: 2px solid $brand-neutral-700;
          border-radius: 50%;
          width: 16px;
          outline-offset: 1px;
        }
        &:hover,
        &:focus,
        &.active {
          border-radius: 8px;
          border-color: $brand-primary-100;
          background-color: $brand-primary-100;
        }
        &:focus {
          outline: 2px solid $brand-primary-400;
          outline-offset: -2px;
        }
      }
    }
    .no-result {
      line-height: 18px;
      .b-dropdown-text {
        @include label-medium(500);
        padding: 0 4px;
        color: $brand-neutral-900;
      }
    }
  }
  @media screen and (max-width: 1300px) {
    .dropdown-menu {
      .language__list--container {
        max-height: 220px;
      }
    }
  }
}
[dir="rtl"] {
  .multi__language--dropdown {
    .dropdown-toggle {
      .selected-language {
        + .selected-language {
          margin-left: 0;
          margin-right: 4px;
        }
      }
      .arrow-icon {
        margin-left: 0px;
        margin-right: 2px;
      }
    }
    .dropdown-menu {
      text-align: right;
      .search-box {
        img {
          left: auto;
          right: 8px;
        }
        .search-input {
          padding: 4px 40px 5px 8px;
        }
      }
      .language__list--container {
        padding-right: 0px;
        padding-left: 4px;
        .checkbox-item {
          .custom-control-input {
            left: auto;
            right: 0;
          }
          .custom-control-label {
            padding: 8px 40px 8px 8px;
          }
          .checkmark {
            left: auto;
            right: 10px;
            &::before {
              left: auto;
              right: 0;
            }
          }
        }
      }
      .clear-btn {
        .b-dropdown-text {
          padding: 8px 8px 8px 10px;
        }
      }
    }
  }
}
</style>
