<template>
  <div class="ls-wrapper">
    <Header
      :edit="isEdit"
      :spaceObj="spaceObj"
      @update-logo="onUpdate"
      :hasError="hasError"
    ></Header>
    <Main
      :hasError="hasError"
      :edit="isEdit"
      :spaceObj="spaceObj"
      :initiatives="initiatives"
      :featuredResources="featuredResources"
      :tags="tags"
      :filterOptions="filterOptions"
      :currentInitiativeId="currentInitiativeId"
      :sections="sections"
      :selectedInitiative="selectedInitiative"
      :initialActiveIndex="initialActiveIndex"
      :languages="languages"
      @update-about="onUpdate"
      @update-initiative="onUpdateInitiative"
      @update-featured-resources="OnUpdateFeaturedResources"
      @update-manage-section="OnUpdateManageSection"
      @toggle-updated="$emit('toggle-updated')"
      @click-empty-state-cta="$emit('click-empty-state-cta')"
      @click-empty-space-cta="$emit('click-empty-space-cta')"
      @card-click="onCardClick"
      @card-subtitle-click="onSubTitleClick"
      @select-initiative="onSelectInitiative"
    ></Main>
    <Footer
      :hasError="hasError"
      :edit="isEdit"
      :spaceObj="spaceObj"
      @update-links="onUpdate"
    ></Footer>
  </div>
</template>
<script>
import Header from "./Shared/Header.vue";
import Main from "./Shared/Main.vue";
import Footer from "./Shared/Footer.vue";

import ResourcesCardClickMixin from "./mixins/ResourcesCardClickMixin";
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    spaceObj: {
      type: Object
    },
    initiatives: {
      type: Array,
      default: () => []
    },
    featuredResources: {
      type: Array,
      default: () => []
    },
    sections: {
      type: Array,
      default: () => []
    },
    currentInitiativeId: {
      type: Number,
      default: 0
    },
    tags: {
      type: Array,
      default: () => []
    },
    filterOptions: {
      type: Array,
      default: () => []
    },
    hasError: {
      type: Boolean,
      default: false
    },
    resourcesListURL: String,
    filterResourcesListURL: String,
    token: String,
    urlList: Object,
    initialActiveIndex: {
      type: Number,
      default: 0
    },
    languages: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  mixins: [ResourcesCardClickMixin],
  components: { Header, Main, Footer },
  provide() {
    return {
      authToken: this.token,
      urlObj: this.urlList
    };
  },
  methods: {
    onUpdate() {
      this.$emit("info-updated");
    },
    onUpdateInitiative() {
      this.$emit("initiative-updated");
    },
    OnUpdateFeaturedResources() {
      this.$emit("featured-resource-updated");
    },
    OnUpdateManageSection() {
      this.$emit("manage-section-updated");
    },
    onSelectInitiative(data) {
      this.$emit("select-initiative", data);
    }
  }
};
</script>
<style lang="scss" scoped>
.ls-wrapper {
  box-shadow: 0px 1px 3px rgb(0 0 0 / 25%);
  border-radius: 8px;
  padding: 16px;
}
</style>
