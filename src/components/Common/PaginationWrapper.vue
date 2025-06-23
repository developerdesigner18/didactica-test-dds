<template>
  <div class="lxp-pagination__wrapper">
    <slot
      name="emptyState"
      :additionalProps="additionalProps"
      v-if="showEmptyState"
    ></slot>
    <slot
      name="errorState"
      :additionalProps="additionalProps"
      :error="error"
      v-if="error"
    ></slot>
    <slot
      name="data"
      :data="data"
      :additionalProps="additionalProps"
      v-else
    ></slot>
    <template v-if="isLoading">
      <div class="d-flex justify-content-center" style="margin: 30px 0">
        <lxp-loader />
      </div>
    </template>
    <template v-else>
      <div
        v-if="showLoadMore"
        class="d-flex justify-content-center"
        style="margin: 30px 0"
      >
        <lxp-button variant="link" @click="loadMore">{{
          loadMoreText
        }}</lxp-button>
      </div>
      <div
        class="lxp-pagination__wrapper--number"
        v-if="showNumberPagination && isPaginationVisible"
      >
        <LxpPagination
          :currentPage.sync="pageNo"
          :rows="response.count"
          :perPage="pageSizeValue"
        ></LxpPagination>
      </div>
    </template>
  </div>
</template>
<script>
/**
 * This component currently supports only the below response format
 *
 * {
    "data": {
        "count": 4,
        "next_page": 2,
        "previous_page": null,
        "results": [
          {..},
          {...}
        ]
      }
    }

 */

import axios from "axios";
import { LxpButton, LxpLoader, LxpPagination } from "./index.js";

export default {
  name: "lxp-pagination-wrapper",
  props: {
    dataFetchURL: {
      type: String,
      required: true
    },
    authToken: {
      type: String
    },
    additionalProps: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageLabel: {
      type: String,
      default: "page"
    },
    pageSizeLabel: {
      type: String,
      default: "page_size"
    },
    pageSizeValue: {
      type: Number,
      default: 10
    },
    countLabel: {
      type: String,
      default: "count"
    },
    nextPageLabel: {
      type: String,
      default: "next_page"
    },
    disablePagination: {
      type: Boolean,
      default: false
    },
    loadMoreText: {
      type: String,
      default: "Load More"
    },
    showNumberPagination: {
      type: Boolean,
      default: false
    },
    enableDynamicFetch: {
      type: Boolean,
      default: true
    },
    addCorsHeaders: {
      type: Boolean,
      default: false
    }
  },
  components: {
    LxpButton,
    LxpLoader,
    LxpPagination
  },
  data() {
    return {
      response: null,
      isLoading: true,
      data: [],
      pageNo: 1,
      error: null
    };
  },
  computed: {
    paginatedDataFetchURL() {
      if (this.dataFetchURL) {
        if (this.dataFetchURL.indexOf("?") === -1) {
          return `${this.dataFetchURL}?${this.pageSizeLabel}=${this.pageSizeValue}&${this.pageLabel}=${this.pageNo}`;
        } else {
          return `${this.dataFetchURL}&${this.pageSizeLabel}=${this.pageSizeValue}&${this.pageLabel}=${this.pageNo}`;
        }
      }
      return null;
    },
    showLoadMore() {
      if (
        this.response &&
        this.disablePagination === false &&
        this.showNumberPagination === false
      ) {
        return this.response[this.nextPageLabel] ? true : false;
      }
      return false;
    },
    showEmptyState() {
      if (this.response) {
        return !this.isLoading && this.response[this.countLabel] === 0;
      }
      return false;
    },
    isPaginationVisible() {
      return this.data.length > 0 && this.response.count > this.pageSizeValue;
    }
  },
  watch: {
    pageNo(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.fetchData();
      }
    },
    dataFetchURL(newValue, oldValue) {
      if (this.enableDynamicFetch && newValue !== oldValue) {
        this.fetchData();
      }
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let headers = {};
      if (this.authToken) {
        headers = {
          headers: {
            Authorization: this.authToken
          }
        };
        if (this.addCorsHeaders) {
          headers.headers["Access-Control-Expose-Headers"] = "error";
        }
      }
      axios
        .get(this.paginatedDataFetchURL, headers)
        .then((response) => {
          this.response = response.data;
          if (this.showNumberPagination) {
            this.data = this.response.results;
          } else {
            this.data = [...this.data, ...this.response.results];
          }
          this.$emit("count", this.response.count);
          this.isLoading = false;
        })
        .catch((err) => {
          if (err.response) {
            this.error = err;
          }
          this.isLoading = false;
        });
    },
    loadMore() {
      this.isLoading = true;
      this.pageNo = this.pageNo + 1;
      this.fetchData();
    },
    reload() {
      this.pageNo = 0;
      this.data = [];
      this.loadMore();
    }
  }
};
</script>
<style lang="scss" scoped>
.lxp-pagination__wrapper {
  @include center;
  .lxp-pagination__wrapper--number {
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: flex-end;
  }
}
</style>
