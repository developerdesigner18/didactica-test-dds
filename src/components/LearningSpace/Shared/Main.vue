<template>
  <div class="ls__main">
    <div class="ls__main--error" v-if="hasError">
      <EmptyLearningSpace
        @click-empty-space-cta="$emit('click-empty-space-cta')"
      />
    </div>
    <div v-else>
      <b-tabs
        v-model="tabIndex"
        nav-wrapper-class="lxp-tab__nav-wrapper"
        nav-class="lxp-tab__nav mobile__overflow--scroll"
        content-class="lxp-tab__tab-content"
        lazy
      >
        <b-tab
          :key="'about-' + count"
          v-if="isAboutEnabled"
          class="tab_item"
          :title="aboutText"
          @click="$parent.$emit('tab-click', spaceObj.about.name)"
        >
          <about
            ref="tabAbout"
            :edit="edit"
            :aboutObj="spaceObj.about"
            :featuredResources="featuredResources"
            :showFeaturedResources="isAboutFeaturedResourceEnabled"
            :tags="tags"
            @card-click="onCardClick"
            @update-about="$emit('update-about')"
            @update-featured-resources="$emit('update-featured-resources')"
            @toggle-updated="$emit('toggle-updated')"
            @tag-selected="onAboutTagSelected"
          ></about>
        </b-tab>
        <b-tab
          :key="'resources-' + count"
          v-if="isCoursesEnabled"
          class="tab_item"
          @click="$parent.$emit('tab-click', 'resources')"
        >
          <template #title>
            {{ coursesText }}
            <span class="lxp-tab__nav--tag">{{ resourceCount }}</span>
          </template>
          <resources
            ref="tabResources"
            :edit="edit"
            :filterOptions="filterOptions"
            :selectedTagId="selectedTagId"
            :languages="languages"
            @count="updateCount"
            @click-empty-state-cta="$emit('click-empty-state-cta')"
            @card-click="onCardClick"
            @card-subtitle-click="tabIndex = 0"
          ></resources>
        </b-tab>

        <b-tab
          :key="'initatives-' + count"
          v-if="isInitiativesEnabled && initiatives && initiatives.length > 0"
          class="initiative_tab"
        >
          <template #title>
            <LxpMenu
              :id="id"
              ref="lxpMenu"
              :items="menuItems"
              :text="initiativesText"
              @update-initiative="onUpdate"
              @select="onSelectInitiative"
              :selected="selectedInitiative"
              :noCaret="false"
            />
          </template>

          <initiatives
            :key="initiativeId"
            :initiative="initiative"
            :edit="edit"
            :featuredResources="initativesFeaturedResources"
            :showFeaturedResources="isInitiativesFeaturedResourceEnabled"
            @card-click="onCardClick"
            @update-initiative="$emit('update-initiative')"
            @update-featured-resources="onFeaturedResourcesUpdate"
            @toggle-updated="$emit('toggle-updated')"
          />
        </b-tab>
        <b-tab v-if="isEventsEnabled" :title="eventsText"></b-tab>
      </b-tabs>
      <lxp-button
        variant="link"
        className="ls-manage__sections"
        @click="showManageSection = true"
        v-if="edit"
        >Manage</lxp-button
      >
      <manage-sections
        :section="sections"
        :show.sync="showManageSection"
        @update-manage-section="onUpdate"
      ></manage-sections>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { LxpButton, LxpMenu } from "../../Common/index";
import EmptyLearningSpace from "../EmptySpaceWrapper.vue";
import About from "../Main/About.vue";
import Initiatives from "../Main/Initiatives.vue";
import Resources from "../Main/Resources.vue";
import ResourcesCardClickMixin from "../mixins/ResourcesCardClickMixin";
import ManageSections from "./Modals/SectionsModal.vue";
export default {
  props: {
    id: {
      type: String,
      default: "intiatives_menu"
    },
    edit: {
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
    currentInitiativeId: {
      type: Number,
      default: 0
    },
    sections: {
      type: Array,
      default: () => []
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
    languages: {
      type: Array,
      required: true,
      default: () => []
    },
    selectedInitiative: String,
    initialActiveIndex: Number
  },
  mixins: [ResourcesCardClickMixin],
  components: {
    About,
    Resources,
    Initiatives,
    ManageSections,
    LxpButton,
    LxpMenu,
    EmptyLearningSpace
  },
  data() {
    return {
      renderCount: 0,
      count: {
        type: Number,
        default: 0
      },
      tabIndex: this.initialActiveIndex ?? 0,
      resourceCount: 0,
      initiativeId: 0,
      menuLabel: "Initiatives",
      selectedTagId: 0,
      showManageSection: false,
      initiative: "",
      initativesFeaturedResources: []
    };
  },
  created() {
    this.fetchData();

    this.onCurrentInitiative();
  },

  watch: {
    currentInitiativeId() {
      this.onCurrentInitiative();
    }
  },
  computed: {
    section() {
      if (this.edit) {
        return this.sections;
      } else {
        return this.sections.filter((s) => s.name !== "" && s.name);
      }
    },
    menuItems() {
      const initiatives = this.initiatives || [];

      return initiatives.map((item) => ({
        label: item.name,
        value: item.id,
        data: item
      }));
    },
    isAboutFeaturedResourceEnabled() {
      return this.getSectionDataEnabled("about_featured-resources");
    },
    isInitiativesFeaturedResourceEnabled() {
      return this.getSectionDataEnabled("initiatives_featured-resources");
    },
    aboutText() {
      return this.getSectionName("about", "About");
    },
    isAboutEnabled() {
      return true;
    },
    coursesText() {
      return this.getSectionName("courses", "Resources");
    },
    isCoursesEnabled() {
      return this.getSectionDataEnabled("courses");
    },
    initiativesText() {
      return this.getSectionName("initiatives", "Initiatives");
    },
    isInitiativesEnabled() {
      return this.getSectionDataEnabled("initiatives");
    },
    eventsText() {
      return this.getSectionName("events", "Events");
    },
    isEventsEnabled() {
      return this.getSectionDataEnabled("events");
    }
  },
  updated() {
    this.renderCount++;
  },
  inject: ["authToken", "urlObj"],
  methods: {
    onAboutTagSelected(data) {
      this.tabIndex = data.tabIndex;
      this.selectedTagId = data.tag.id;
    },
    onCurrentInitiative() {
      if (
        this.currentInitiativeId > 0 &&
        this.isInitiativesEnabled &&
        this.initiatives &&
        this.initiatives.length > 0 &&
        this.sections.length > 0
      ) {
        let selInitiative = this.initiatives.find(
          (i) => i.id === this.currentInitiativeId
        );

        if (selInitiative) {
          this.setInitiative(selInitiative);
          this.tabIndex = 2;
        }
      }
    },
    fetchData() {
      let headers = {};
      if (this.authToken) {
        headers = {
          headers: {
            Authorization: this.authToken
          }
        };
      }
      const url = `${this.urlObj.LIST_RESOURCES.url}&page_size=20&page=1`;
      axios.get(url, headers).then((response) => {
        this.updateCount(response.data.count);
      });
    },
    getSectionData(key) {
      return this.sections.find((s) => s.name === key);
    },
    getSectionName(key, defaultName) {
      const sd = this.getSectionData(key);
      if (sd) {
        return sd.title;
      }
      return defaultName;
    },

    getSectionDataEnabled(key) {
      const sd = this.getSectionData(key);

      if (sd !== null && sd !== undefined) {
        return sd.is_enabled;
      }
      return true;
    },

    hideSection(name) {
      const index = this.sections.findIndex((section) => section.name === name);
      if (index !== -1) {
        this.sections.splice(index, 1);
      }
    },
    onSelectInitiative(selInitiative) {
      this.$emit("select-initiative", selInitiative);
      this.setInitiative(selInitiative.data);
    },
    setInitiative(selInitiative) {
      if (selInitiative) {
        this.initiative = selInitiative;
        this.initiativeId = this.initiative.id;
        this.getInitiativesFeaturedResource();
      }
    },
    updateCount(c) {
      this.resourceCount = c;
    },
    onUpdate(data) {
      this.$emit("update-initiative", data);
      this.$emit("update-featured-resources", data);
      this.$emit("update-manage-section", data);
    },
    onFeaturedResourcesUpdate(data) {
      this.getInitiativesFeaturedResource();
      this.$emit("update-featured-resources", data);
    },
    getInitiativesFeaturedResource() {
      let url = this.urlObj.LIST_INITIATIVES_FEATURED_RESOURCES.url.replace(
          "{initiative_id}",
          this.initiativeId
        ),
        headers = {
          headers: {
            Authorization: this.authToken
          }
        };
      axios.get(url, headers).then(
        (response) => {
          this.initativesFeaturedResources = response.data.metadata;
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
};
</script>

<style lang="scss">
@import "@/scss/_tab.scss";
.nav-item {
  margin: 0 6px !important;
}

.ls__main {
  .ls__main--error {
    width: 100%;
    text-align: center;
  }
  padding: 0 16px;
  position: relative;

  .ls-manage__sections {
    position: absolute;
    top: 0;
    right: 0;
  }
  .b-dropdown .dropdown-menu {
    margin-top: 5px !important;
  }
}
.lxp-tab__tab-content {
  padding: 32px 0;
}

.nav-link:has(.lxp-menu) {
  padding: 0 !important;
}
.lxp-menu--text {
  font-size: 16px !important;
  &.active {
    color: $brand-primary-400 !important;
  }
}
.lxp-menu .b-dropdown .lxp-menu--dropdown-button {
  padding: 8px 16px;
  color: $brand-neutral-700;
  border: none;
  &:focus {
    border: 1px solid transparent;
    background: none;
  }
  &:active {
    color: $brand-primary-400;
    border: 1px solid transparent;
    background: none;
  }
}
@media screen and (max-width: 768px) {
}
.nav-link [dir="rtl"] {
  .ls__main {
    .ls-manage__sections {
      right: auto;
      left: 0;
    }
  }
}
</style>
