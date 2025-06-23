<template>
  <div class="lxp-form_tags">
    <b-form-group :label="tagInputLabel" :label-for="labelFor">
      <b-form-tags
        id="tags-component-select"
        v-model="selectedTags"
        size="lg"
        class="mb-2"
        add-on-change
        no-outer-focus
      >
        <template
          v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }"
        >
          <div class="lxp-form__container">
            <b-form-select
              class="lxp-form__tags-selector"
              v-bind="inputAttrs"
              v-on="inputHandlers"
              :disabled="isOptionsAvailable"
              :options="availableOptionsSelect"
            >
              <template #first>
                <option class="lxp-form__tags-options" disabled value="">
                  Select a Topic to add
                </option>
              </template>
            </b-form-select>
          </div>
          <div class="lxp-editor__footer--limit">
            {{ tags.length }}/{{ dynamicLimit }}
          </div>
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mt-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                class="lxp-tags"
                limit-tags-text="true"
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
                >{{ tag }}
                <LxpButton
                  variant="outline"
                  class="err-msg__close"
                  @click="removeTag(tag)"
                  :aria-controls="`my-custom-tags-tag_${tag.replace(
                    /\s/g,
                    '_'
                  )}_`"
                >
                  <img
                    src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
                    alt="close"
                    loading="lazy"
                  />
                </LxpButton>
              </b-form-tag>
            </li>
          </ul>
        </template>
      </b-form-tags>
    </b-form-group>
  </div>
</template>
<script>
import { LxpButton } from "@/components/Common/index.js";
export default {
  components: {
    LxpButton
  },
  data() {
    return {
      selectedTags: [],
      length: 0
    };
  },
  props: {
    tagInputLabel: {
      type: String,
      default: "Tagged input using select"
    },
    labelFor: {
      type: String,
      default: "tags-component-select"
    },
    value: {
      type: Array
    },
    options: {
      type: Array
    },
    tags: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.selectedTags = this.value;
  },
  computed: {
    isOptionsAvailable() {
      if (
        this.disabled ||
        this.availableOptions === undefined ||
        this.availableOptions === null ||
        this.availableOptions.length === 0
      ) {
        return false;
      }
      return true;
    },
    availableOptionsSelect() {
      if (
        this.options === undefined ||
        this.options === null ||
        this.options.length <= 0
      ) {
        return [];
      }
      if (
        this.selectedTags === undefined ||
        this.selectedTags === null ||
        this.selectedTags.length <= 0
      ) {
        return this.options.map((opt) => opt.name);
      }
      return this.options
        .filter((opt) => !this.selectedTags.includes(opt.name))
        .map((opt) => opt.name);
    },
    dynamicLimit() {
      if (this.options) {
        return this.limit > 0 ? this.limit : this.options.length;
      }
      return 0;
    }
  },
  methods: {
    getSelectedTags() {
      return this.selectedTags;
    },
    removeTag(index) {
      this.selectedTags.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.lxp-form_tags {
  width: 100%;
  padding: 0;
  .lxp-form__container {
    border-radius: 8px;
    background: $brand-primary-75;
    width: 630px;
    &:hover {
      background: $brand-primary-100;
      .custom-select {
        background: $brand-primary-100 !important;
      }
    }
    .lxp-form__tags-selector div {
      margin: 0px !important;
    }
    .lxp-form__tags-options {
      padding: 8px 12px !important;
      background: #fff !important;
      &:hover {
        background: $brand-primary-100 !important;
      }
      &:active {
        background: $brand-primary-400 !important;
      }
    }
  }
}
@media (max-width: 1000px) {
  .lxp-form_tags {
    .custom-select {
      width: 555px;
    }
    .lxp-form__container {
      width: 560px;
    }
  }
}
</style>
<style lang="scss">
.lxp-form_tags {
  .b-form-tags {
    border: none;
  }
  .d-block {
    display: none !important;
  }
  .lxp-tags {
    padding: 2px 8px;
    border-radius: 8px;
    border: 1px solid $brand-neutral-700;
    background: #fff;
    @include body-medium;
    color: $brand-neutral-700;
    text-align: center;
    margin-top: 10px;
    &:hover {
      background: $brand-neutral-50;
    }
    .err-msg__close {
      display: contents;
      img {
        width: 10px;
        height: 10px;
        margin-bottom: 2.2px;
        margin-left: 0.3rem;
      }
      &:active,
      &:focus {
        border: none !important;
      }
    }
  }
  .close {
    display: none !important;
  }
  .lxp-editor__footer--limit {
    @include label-medium;
    color: $brand-neutral-300 !important;
    margin-bottom: 0;
    margin-top: 2px;
    margin-left: 2px;
  }
  .sr-only {
    display: none !important;
  }
  #tags-component-select {
    padding: 0px !important;
  }
  .btn-link {
    padding: 0px !important;
    position: relative !important;
    bottom: 2px;
  }
  .custom-select {
    height: 63px !important;
    padding: 8px 7px !important;
    @include body-regular(400, $brand-neutral-700 !important);
    border-radius: 8px !important;
    background: $brand-primary-75 !important;
    border: transparent !important;
    width: 620px;
    outline: transparent !important;
    &:hover {
      background: $brand-primary-100 !important;
    }
  }
  .custom-select option {
    padding: 8px 12px !important;
    background: #fff !important;
    margin: 10px !important;
    border: transparent !important;
    &:hover {
      background: $brand-primary-100 !important;
    }
    &:active {
      background: $brand-primary-400 !important;
    }
  }
}
</style>
