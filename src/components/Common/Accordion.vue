<template>
  <div :class="['accordion-wrapper', variant]">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="['accordion-item', { active: isOpen(index) }]"
    >
      <div class="accordion-header" @click="toggle(index)">
        <img
          src="https://whoalxppublicstorage.blob.core.windows.net/didactica/assets/images/awards/arrow.svg"
          loading="lazy"
        />
        <span>{{ item.title }}</span>
      </div>
      <div
        v-if="isOpen(index)"
        class="accordion-content"
        v-html="item.content"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Accordion",
  props: {
    items: {
      type: Array,
      required: true
    },
    singleOpen: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: "variant1"
    }
  },
  data() {
    return {
      openIndexes: []
    };
  },
  mounted() {
    if (!this.singleOpen && this.items.length > 0) {
      this.openIndexes.push(0);
    }
  },
  methods: {
    toggle(index) {
      if (this.singleOpen) {
        this.openIndexes = this.isOpen(index) ? [] : [index];
      } else {
        if (this.isOpen(index)) {
          this.openIndexes = this.openIndexes.filter((i) => i !== index);
        } else {
          this.openIndexes.push(index);
        }
      }
    },
    isOpen(index) {
      return this.openIndexes.includes(index);
    }
  }
};
</script>
<style lang="scss" scoped>
.accordion-wrapper {
  .accordion-item {
    &:not(:first-child) {
      margin-top: 16px;
    }
    &.active {
      .accordion-header {
        img {
          transform: rotate(0deg);
        }
      }
    }
  }
  .accordion-header {
    display: flex;
    align-items: center;
    overflow: hidden;
    @include label-large($font-color: $brand-neutral-900, $font-weight: 500);
    cursor: pointer;
    span {
      margin-left: 8px;
    }
    img {
      transform: rotate(90deg);
    }
  }
  .accordion-content {
    padding-left: 24px;
    @include label-medium;
    color: $brand-neutral-900;
    letter-spacing: 0.4px;
  }
}
</style>
