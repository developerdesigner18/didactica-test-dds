<template>
  <div class="lxp-autocomplete">
    <LxpInput
      :placeholder="placeholder"
      :isFloating="isFloating"
      v-model="search"
      @focus="onFocus"
    />
    <div class="lxp-autocomplete__results" v-if="isFocused">
      <div v-if="isLoading">
        <p class="lxp-autocomplete__results--empty">Loading...</p>
      </div>
      <div v-else>
        <ul v-if="results.length > 0">
          <li v-for="(r, i) in results" :key="i" @mousedown="onSelect(r)">
            <span
              class="form-floating__prepend"
              v-if="prepend"
              @click="$emit('prepend')"
              ><img
                src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/history.svg"
                alt="add"
                loading="lazy"
              />
            </span>
            <span :class="['title', { title_prepend: prepend }]">{{
              r.title
            }}</span>
            <span
              class="form-floating__append"
              v-if="append"
              @click="$emit('append')"
            >
              <img
                src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/chevron-right.svg"
                alt="chevron"
                loading="lazy"
            /></span>
          </li>
        </ul>
        <p class="lxp-autocomplete__results--empty" v-if="results.length === 0">
          No results found
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { LxpInput } from "./index";
export default {
  props: {
    placeholder: {
      type: String
    },
    items: {
      type: Array,
      default: () => []
    },
    dataFetchURL: {
      type: String
    },
    authToken: {
      type: String
    },
    isFloating: {
      type: Boolean,
      default: false
    },
    prepend: {
      type: Boolean,
      default: false
    },
    append: {
      type: Boolean,
      default: false
    },
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: false,
      isFocused: false,
      search: "",
      data: []
    };
  },
  components: {
    LxpInput
  },
  watch: {
    search(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$emit("input", newValue);
        if (this.dataFetchURL) {
          this.fetchData();
        }
      }
    },
    results: {
      immediate: true,
      handler() {
        if (this.data && this.data.results) {
          this.$emit("results-empty", this.data.results.length === 0);
        }
      }
    }
  },
  computed: {
    results() {
      let arr;
      if (this.dataFetchURL) {
        arr = this.data?.results;
      } else {
        arr = this.items;
        if (this.search !== "") {
          arr = this.items.filter((a) => {
            return a.title.toLowerCase().includes(this.search);
          });
        }
      }
      if (this.selectedItems.length > 0 && arr) {
        arr = arr.filter((a) => !this.selectedItems.includes(a.id));
      }
      return arr;
    },
    dataURL() {
      if (this.dataFetchURL) {
        let url = this.dataFetchURL;
        if (this.search !== "") {
          url += `&q=${this.search}`;
        }
        return url;
      }
      return null;
    }
  },
  created() {
    if (this.dataFetchURL) {
      this.fetchData();
    }
  },
  methods: {
    fetchData() {
      this.isLoading = true;
      let headers = {};
      if (this.authToken) {
        headers = {
          headers: {
            Authorization: this.authToken
          }
        };
      }
      axios.get(this.dataURL, headers).then((response) => {
        this.data = response.data;
        this.isLoading = false;
      });
    },
    onFocus(val) {
      this.isFocused = val;
      if (!val) {
        this.search = "";
      }
    },
    onSelect(data) {
      this.$emit("select", data);
      this.isFocused = false;
      this.search = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin list-style {
  padding: 8px;
  text-align: left;
  @include label-large;
}
.lxp-autocomplete {
  @include scroll-bar;
  .lxp-autocomplete__results {
    background: #ffffff;
    box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
    border-radius: 8px;
    white-space: nowrap;
    .form-floating__append {
      float: right;
      padding: 0;
    }
    .form-floating__prepend {
      padding: 0;
    }
    ul {
      list-style: none;
      padding: 0;
      margin-top: 8px;
      max-height: 200px;
      overflow: hidden auto;
      li {
        @include list-style;
        img {
          vertical-align: top;
        }
        &:focus {
          background: $brand-primary-100;
          color: $brand-primary-400;
          font-weight: 500;
          cursor: pointer;
        }
        &:hover {
          background: $brand-primary-100;
          color: $brand-neutral-700;
        }
        &:active {
          background: $brand-primary-100;
          color: $brand-primary-400;
          img {
            filter: brightness(0) saturate(100%) invert(39%) sepia(72%)
              saturate(4645%) hue-rotate(196deg) brightness(103%) contrast(102%) !important;
          }
        }
      }
    }

    .title {
      @include text-ellipsis;
      width: 75%;
      display: inline-block;
    }
    .title_prepend {
      padding: 0 0 0 8px;
    }
    .lxp-autocomplete__results--empty {
      @include list-style;
      margin-top: 8px;
    }
  }
}
</style>
