<template>
  <div
    :class="[
      'lxp__select--language',
      {
        'white-variant': showWhiteVariant,
        'round-variant': showRoundVariant
      }
    ]"
  >
    <b-dropdown
      variant="link"
      :right="selectedLanguage && selectedLanguage.id !== 'ar'"
      no-caret
      v-b-tooltip.bottom="{
        customClass: 'language-tooltip'
      }"
      :title="tooltipText"
    >
      <template #button-content>
        <b-img
          :src="languageIcon"
          width="24"
          height="24"
          alt="language"
          loading="lazy"
        ></b-img>
        <span class="selected-language">
          {{ selectedLanguage.id || "en" }}
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
          v-model="searchQuery"
          class="search-input"
          :placeholder="searchPlaceholder"
          @input="filterLanguages"
        />
      </b-dropdown-text>

      <!-- No Results Found -->
      <b-dropdown-text
        v-if="filteredLanguages.every((l) => l.languages.length === 0)"
        class="no-result"
      >
        {{ noSearchResultText }}
      </b-dropdown-text>

      <!-- Filtered Languages -->
      <li class="language__list--container" v-else>
        <ul>
          <b-dropdown-group
            v-for="(l, i) in filteredLanguages"
            :key="i"
            :header="!searchQuery ? l.title : null"
            class="language-list"
          >
            <b-dropdown-item
              v-for="(o, j) in l.languages"
              :key="j"
              :active="selectedLanguage.id === o.value"
              @click="onLanguageChange(o, $event)"
              title=""
            >
              <img
                :src="checkIcon"
                alt="selected"
                loading="lazy"
                class="check-icon"
                v-if="selectedLanguage.id === o.value"
              />
              <span class="native-name">{{ o.text }}</span>
              <span class="english-name">{{ o.displayText }}</span>
            </b-dropdown-item>
          </b-dropdown-group>
        </ul>
      </li>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLanguage: this.selected,
      searchQuery: "",
      filteredLanguages: [],
      searchIcon:
        "https://files.lxp.academy.who.int/learning-experience-platform/landing/search/search.svg",
      languageIcon:
        "https://files.lxp.academy.who.int/didactica/assets/images/language-select/language.svg",
      checkIcon:
        "https://files.lxp.academy.who.int/learning-experience-platform/vle/checkmark.svg"
    };
  },
  props: {
    selected: {
      type: Object,
      default: () => {}
    },
    allLanguage: {
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
    languageTooltipText: {
      type: String,
      default: "System language"
    },
    showArrowIcon: {
      type: Boolean,
      default: false
    },
    showWhiteVariant: {
      type: Boolean,
      default: false
    },
    showRoundVariant: {
      type: Boolean,
      default: false
    },
    headerKeys: {
      type: Object,
      default: () => ({
        un: "UN Languages",
        other: "Other Languages"
      })
    }
  },
  computed: {
    groupedLanguages() {
      let UNLanguage = this.allLanguage
          .filter((al) => al.group === "un")
          .map((l) => ({
            text: l.text,
            value: l.id,
            displayText: l.displayName,
            name: l.name
          })),
        otherLanguage = this.allLanguage
          .filter((al) => al.group === "other")
          .map((l) => ({
            text: l.text,
            value: l.id,
            displayText: l.displayName,
            name: l.name
          })),
        languageArray = [
          { title: this.headerKeys["un"], languages: UNLanguage },
          { title: this.headerKeys["other"], languages: otherLanguage }
        ];
      return languageArray;
    },
    tooltipText() {
      return this.languageTooltipText;
    }
  },
  mounted() {
    this.setLanguage(this.language);
  },
  methods: {
    onLanguageChange(e, event) {
      this.$emit("set-language", e.value, event);
      this.setLanguage(e.value);
      this.searchQuery = "";
      this.filteredLanguages = this.groupedLanguages;
    },
    setLanguage(language) {
      this.selectedLanguage = this.allLanguage.find((l) => l.id === language);
    },
    filterLanguages() {
      const query = this.searchQuery.trim().toLowerCase();

      if (!query) {
        this.filteredLanguages = this.groupedLanguages;
        return;
      }

      this.filteredLanguages = this.groupedLanguages.map((group) => ({
        title: group.title,
        languages: group.languages.filter((lang) =>
          [lang.displayText, lang.name, lang.value].some((key) =>
            key.toLowerCase().includes(query)
          )
        )
      }));
    }
  },
  watch: {
    language(newVal) {
      this.setLanguage(newVal);
    },
    allLanguage: {
      handler() {
        this.filteredLanguages = this.groupedLanguages;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss">
.lxp__select--language {
  display: flex;
  justify-content: flex-end;
  > .b-dropdown {
    &.show {
      .dropdown-toggle {
        background-color: $brand-primary-100;
        .arrow-icon {
          transform: rotate(0deg);
        }
      }
    }
    .dropdown-toggle {
      width: 66px;
      height: 40px;
      @include flex-horizontal-center;
      padding: 8px 4px;
      border-radius: 8px;
      text-decoration: none;
      &:hover,
      &:focus {
        background-color: $brand-primary-100;
      }
      &:hover {
        img {
          filter: invert(25%) sepia(98%) saturate(3362%) hue-rotate(196deg)
            brightness(103%) contrast(104%);
        }
        .selected-language {
          color: $brand-primary-400;
        }
      }
      &:focus {
        outline: 2px solid $brand-primary-400;
        outline-offset: -1px;
        box-shadow: none !important;
      }
      .selected-language {
        margin-left: 8px;
        text-transform: uppercase;
        @include button-small;
        color: $brand-primary;
      }
      .arrow-icon {
        margin-left: auto;
        transform: rotate(180deg);
      }
    }
    .dropdown-menu {
      width: 224px;
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
      .dropdown-header {
        padding: 0 4px;
        @include label-medium(500);
        color: $brand-neutral-900;
      }
      .language__list--container {
        max-height: 450px;
        overflow-y: auto;
        padding-right: 8px;
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
          li {
            &:last-child {
              .dropdown-header {
                margin-top: 8px;
              }
            }
          }
        }
        .language-list {
          ul {
            padding: 0;
            li {
              margin-top: 4px;
            }
          }
          .dropdown-item {
            padding: 2px 8px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            position: relative;
            word-break: break-word;
            white-space: normal;
            &:hover,
            &:focus,
            &.active {
              background-color: $brand-primary-100;
              color: unset;
            }
            &:focus {
              outline: 2px solid $brand-primary-400;
              outline-offset: -2px;
            }
            .native-name {
              @include body-medium;
              color: $brand-neutral-700;
              text-transform: capitalize;
            }
            .english-name {
              @include label-medium;
              color: $brand-neutral-300;
            }
            .check-icon {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 10px;
              width: 18px;
            }
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
  }
  &.white-variant {
    > .b-dropdown {
      &.show {
        .dropdown-toggle {
          img {
            filter: invert(35%) sepia(36%) invert(37%) sepia(58%)
              saturate(5230%) hue-rotate(198deg) brightness(104%) contrast(104%);
          }
          .selected-language {
            color: $brand-primary-400;
          }
        }
      }
      .dropdown-toggle {
        img {
          filter: invert(100%) brightness(1000%);
        }
        .selected-language {
          color: $brand-neutral-0;
        }
        &:hover,
        &:focus {
          img {
            filter: invert(35%) sepia(36%) invert(37%) sepia(58%)
              saturate(5230%) hue-rotate(198deg) brightness(104%) contrast(104%);
          }
          .selected-language {
            color: $brand-primary-400;
          }
        }
      }
    }
  }
  &.round-variant {
    > .b-dropdown {
      .dropdown-toggle {
        border-radius: 100px;
        width: 70px;
      }
    }
  }
  @media screen and (max-width: 1300px) {
    > .b-dropdown {
      .dropdown-menu {
        .language__list--container {
          max-height: 350px;
        }
      }
    }
  }
}
.language-tooltip {
  padding: 0;
  .arrow {
    display: none;
  }
  .tooltip-inner {
    padding: 4px 8px !important;
    border-radius: 4px;
    background-color: $brand-primary !important;
    @include body-medium;
    margin-top: 8px;
  }
  &.bs-tooltip-top {
    .tooltip-inner {
      margin-bottom: 8px;
    }
  }
  &.bs-tooltip-bottom {
    .tooltip-inner {
      margin-top: 8px;
    }
  }
}
[dir="rtl"] {
  .lxp__select--language {
    > .b-dropdown {
      .dropdown-toggle {
        .selected-language {
          margin-left: 0px;
          margin-right: 8px;
        }
        .arrow-icon {
          margin-left: 0;
          margin-right: auto;
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
          padding-left: 8px;
          .language-list {
            .dropdown-item {
              .check-icon {
                right: auto;
                left: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
