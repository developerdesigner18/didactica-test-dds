<template>
  <div class="ls-resources__wrapper">
    fdsf
    <LxpFilterSelection
      ref="tagFilter"
      :filterOptions="filterOptions"
      :selectedTagId="selectedTagId"
      @tags-selected="onTagsSelected"
    />
    <div class="ls-resources__header">
      <div class="ls-resources__count">
        <p>{{ count }} results found</p>
      </div>

      <ResourceFilter
        :languages="languages"
        @language-filter="onFilterChange"
      />
    </div>
    <div class="ls-resources__results">
      <LxpPaginationWrapper
        ref="resourceslistwrapper"
        :dataFetchURL="dataFetchURL"
        nextPageLabel="next"
        :pageSizeValue="20"
        showNumberPagination
        @count="updateCount"
        @card-click="onCardClick"
        @card-subtitle-click="onSubTitleClick"
      >
        <template v-slot:emptyState>
          <empty-state
            :edit="edit"
            :filterSelected="filterSelected"
            @click-empty-state-cta="$emit('click-empty-state-cta')"
          />
        </template>

        <template v-slot:data="slotProps">
          <ResourceDataComponent :data="slotProps.data" />
        </template>
      </LxpPaginationWrapper>
    </div>
  </div>
</template>

<script>
import {
  LxpPaginationWrapper,
  LxpFilterSelection
} from "@/components/Common/index.js";
import EmptyState from "./Resources/EmptyListWrapper.vue";
import ResourceDataComponent from "./Resources/ResourceListWrapper.vue";
import ResourceFilter from "./Resources/ResourceFilter.vue";

import ResourcesCardClickMixin from "../mixins/ResourcesCardClickMixin";
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    resourcesListURL: String,
    filterOptions: {
      type: Array,
      default: () => []
    },
    selectedTagId: {
      type: Number,
      default: 0
    },
    languages: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  inject: ["urlObj"],
  mixins: [ResourcesCardClickMixin],
  components: {
    LxpPaginationWrapper,
    EmptyState,
    ResourceDataComponent,
    ResourceFilter,
    LxpFilterSelection
  },
  data() {
    return {
      count: 0,
      dataFetchURL: "",
      language: "en",
      selTagIds: [],
      filterSelected: false
    };
  },
  created() {
    if (this.selectedTagId > 0) {
      this.selTagIds = [this.selectedTagId];
    }
  },
  methods: {
    updateCount(c) {
      this.count = c;
      this.$emit("count", c);
    },
    onFilterChange(s) {
      this.language = s.value;
      this.getCourses();
    },
    getCoursesByDiscovery() {
      let newFetchURL =
        this.urlObj.LIST_RESOURCES.url.split("language=")[0] +
        `language=${this.language}`;
      this.reload(newFetchURL);
    },
    getCoursesByTag(tagIds) {
      const tagStr = tagIds.join();
      let newFetchURL = this.urlObj.FILTER_RESOURCES.url
        .replace("{tagids}", tagStr)
        .replace("{lang}", this.language);
      this.reload(newFetchURL);
    },
    reload(newFetchURL) {
      if (this.dataFetchURL !== newFetchURL) {
        this.dataFetchURL = newFetchURL;
      }
    },
    getCourses() {
      if (this.selTagIds === undefined || this.selTagIds.length <= 0) {
        this.filterByTag = false;
        this.getCoursesByDiscovery();
        return;
      }
      this.getCoursesByTag(this.selTagIds);
    },
    onTagsSelected(tagIds) {
      this.selTagIds = [...tagIds];
      this.getCourses();
      this.filterSelected = this.selTagIds.length > 0;
    }
  }
};
</script>

<style lang="scss">
.ls-resources__wrapper {
  text-align: left;
  .ls-resources__header {
    @include horizontal-space-between;
    margin-bottom: 16px;
    .ls-resources__count {
      @include label-large(#919191);
      p {
        margin-bottom: 0;
      }
    }
  }
  .ls-resources__results {
    clear: both;
    display: table;
    width: 100%;
    .ls-resources__results--card {
      width: 25%;
      float: left;
      margin-bottom: 30px;
      .ls-resources__card--tag {
        background: $brand-secondary1-100;
        border: $brand-secondary1-400;
        color: $brand-secondary1-400;
        text-transform: uppercase;
        font-weight: 500;
      }
    }
  }
}
@media screen and (max-width: 1280px) {
  .ls-resources__wrapper {
    .ls-resources__results {
      .ls-resources__results--card {
        width: 33%;
      }
    }
  }
}
@media screen and (max-width: 1010px) {
  .ls-resources__wrapper {
    .ls-resources__results {
      .ls-resources__results--card {
        width: 50%;
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .ls-resources__wrapper {
    .ls-resources__results {
      .ls-resources__results--card {
        width: 100%;
      }
    }
  }
}
</style>
