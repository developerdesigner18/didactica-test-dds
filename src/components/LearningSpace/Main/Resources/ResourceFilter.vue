<template>
  <div class="align-self-end resource-filter__language">
    <LxpLanguageDropdown
      :options="languages"
      defaultValue="all"
      text="Language"
      @onSelect="onSelect"
    />
  </div>
</template>
<script>
import { LxpLanguageDropdown } from "@/components/Common/index.js";
export default {
  components: { LxpLanguageDropdown },
  props: {
    languages: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    onSelect(e) {
      this.$emit("language-filter", e);
    }
  }
};
</script>
<style lang="scss">
.resource-filter__language {
  .lx-dropdown {
    .dropdown-menu {
      max-height: 300px;
      overflow: auto;
      .dropdown-item {
        text-transform: capitalize;
      }
    }
  }
}
</style>
