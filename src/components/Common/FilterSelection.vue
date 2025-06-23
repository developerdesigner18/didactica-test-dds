<template>
  <div class="filter_selection">
    <div
      v-for="o in options"
      :key="'option-' + o.id"
      :class="[o.checked ? 'filter--selected' : 'filter--unselected']"
      @click="clickPill(o)"
      tabindex="0"
      @keydown.enter="clickPill(o)"
    >
      {{ o.name }}
      <span v-if="o.checked" class="filter_remove-icon">
        <img
          src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/crossmark.svg"
          alt="close"
          loading="lazy"
        />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filterOptions: {
      type: Array,
      default: () => []
    },
    selectedTagId: {
      type: Number,
      default: 0
    },
    filterResourcesListURL: String
  },
  inject: ["urlObj"],
  data() {
    return {
      selectedPills: [],
      options: [],
      dataFetchURL: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.options.push({
        id: 0,
        name: "All",
        checked: false
      });
      this.filterOptions.forEach((x) => {
        this.options.push({
          id: x.id,
          name: x.name,
          checked: false
        });
      });
      this.setSelectedTag(this.selectedTagId);
    },
    setSelectedTag(selTagId) {
      if (selTagId > 0) {
        this.options.forEach((x) => {
          x.checked = false;
        });
        this.options.find((x) => x.id === selTagId).checked = true;
      }
    },
    clickPill(option) {
      if (option.id === 0) {
        this.options.forEach((x) => {
          if (x.id !== 0) {
            x.checked = false;
          }
        });
      } else {
        this.options.find((x) => x.id === 0).checked = false;
      }
      option.checked = !option.checked;
      this.applyFilter();
    },
    applyFilter() {
      const allOption = this.options.find((x) => x.id === 0);
      var tagIds = [];
      if (allOption.checked) {
        tagIds = this.options.filter((x) => x.id > 0).map((x) => x.id);
      } else {
        tagIds = this.options.filter((x) => x.checked).map((x) => x.id);
      }
      this.$emit("tags-selected", tagIds);
    }
  }
};
</script>

<style lang="scss">
.filter_selection {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  .filter--selected {
    @include flex-horizontal-center;
    color: #fff;
    padding: 4px 8px;
    cursor: pointer;
    text-align: center;
    border-radius: 6px;
    @include label-medium($font-weight: 500);
    background: $brand-primary;
    .filter_remove-icon {
      padding-bottom: 1px;
      cursor: pointer;
      margin-left: 5px;
    }
  }
  .filter--unselected {
    @include flex-horizontal-center;
    padding: 4px 8px;
    cursor: pointer;
    color: $brand-primary;
    text-align: center;
    @include label-medium(500);
    border-radius: 6px;
    background: $brand-primary-75;
    &:hover {
      background: $brand-primary;
      color: #fff;
    }
  }
}
</style>
