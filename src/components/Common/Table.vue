<template>
  <div class="lxp-table__wrapper">
    <table :class="['lxp-table', `table-${variant}`]">
      <thead>
        <tr>
          <th v-if="selectable">
            <lxp-checkbox
              id="toggle-all"
              v-model="selectAll"
              @input="onToggleAll()"
            />
          </th>
          <th
            v-for="(h, i) in tableHeader"
            :key="i"
            :style="h.thStyle ? h.thStyle : null"
          >
            <div class="lxp-table__heading">
              {{ h.name }}
              <span
                class="lxp-table__sort"
                v-if="h.sortable"
                @click="performSort(h)"
                ><img
                  :src="
                    h.sort
                      ? 'https://files.lxp.academy.who.int/didactica/assets/images/table/sort-up.svg'
                      : 'https://files.lxp.academy.who.int/didactica/assets/images/table/sort-down.svg'
                  "
                  alt="sort"
                  width="24"
                  height="24"
                  loading="lazy"
              /></span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, j) in tableData" :key="j">
          <td v-if="selectable">
            <lxp-checkbox
              :id="`body-${j}`"
              v-model="item.isChecked"
              :value="item.isChecked"
              @input="onSelect(item)"
            />
          </td>
          <td
            v-for="(h, i) in tableHeader"
            :key="i"
            :style="h.tdStyle ? h.tdStyle : null"
          >
            <div v-html="item[h.key]" @click="onTdClick(h.key, item)"></div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <div class="ltw__footer">
            <div class="ltw-footer__left">
              <slot name="footerContent" />
            </div>
            <lxp-pagination v-if="hasPagination" />
          </div>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import LxpCheckbox from "./Checkbox.vue";
import LxpPagination from "./Pagination.vue";
export default {
  components: { LxpCheckbox, LxpPagination },
  props: {
    tableHeader: {
      type: Array,
      required: true
    },
    tableData: {
      type: Array,
      required: true
    },
    variant: {
      type: String,
      default: "primary",
      validator: (value) => {
        // The value must match one of these strings
        return (
          [
            "primary",
            "success",
            "grey",
            "warning",
            "danger",
            "secondary1"
          ].indexOf(value) !== -1
        );
      }
    },
    selectable: {
      type: Boolean,
      default: false
    },
    hasPagination: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectAll: false
    };
  },
  computed: {
    currentSelection() {
      return this.tableData.filter((t) => {
        return t.isChecked === true;
      });
    }
  },
  methods: {
    onToggleAll(i) {
      this.tableData.forEach((td) => {
        this.$set(td, "isChecked", i);
      });
    },
    onSelect() {
      this.checkSelectAll();
    },
    checkSelectAll() {
      // TODO check condition
      if (this.selectable) {
        if (
          this.tableData.length > 0 &&
          this.tableData.length === this.currentSelection.length
        ) {
          this.selectAll = true;
        } else {
          this.selectAll = false;
        }
      }
    },
    performSort(item) {
      item.sort = item.sort ? !item.sort : true;
      this.$forceUpdate();
      this.$emit("sort", item);
    },
    onTdClick(key, item) {
      this.$emit("onItemClick", { key: key, data: item });
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin border-radius {
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
}
.lxp-table__wrapper {
  .lxp-table {
    width: 100%;
    position: relative;
    table-layout: fixed;
    font-family: "Roboto", sans-serif;
    thead {
      tr {
        th {
          @include border-radius;
          padding: 8px 16px;
          .lxp-table__sort {
            cursor: pointer;
          }
        }
      }
    }
    tbody {
      &:before {
        content: "@";
        display: block;
        line-height: 10px;
        text-indent: -99999px;
      }
      tr {
        &:last-child {
          td {
            padding: 4px 16px 8px;
          }
        }
        td {
          background: $brand-neutral-0;
          padding: 4px 16px;
          @include label-large($brand-neutral-700, 400);
        }
      }
    }
    tfoot {
      tr {
        .ltw__footer {
          position: absolute;
          // TODO check the width
          width: 100.1%;
          left: -0.5px;
          padding: 0 12px 8px;
          background: $brand-neutral-0;
          @include horizontal-space-between;
          .ltw-footer__left {
            @include label-large($brand-neutral-300);
            p {
              margin-bottom: 0;
            }
          }
        }
      }
    }

    // primary
    &.table-primary {
      thead {
        tr {
          th {
            background-color: $brand-primary-100;
            div {
              @include subtitle-regular;
              color: $brand-neutral-900;
            }
          }
        }
      }
      tbody {
        tr {
          &:hover {
            td {
              background-color: $brand-primary-75;
              box-shadow: none;
              @include border-radius;
            }
          }
        }
      }
    }
    &.table-success {
      thead {
        tr {
          th {
            background-color: $brand-secondary4-50;
            div {
              @include label-large($brand-neutral-700, 500);
            }
          }
        }
      }
      tbody {
        tr {
          border: 1px solid $brand-secondary4-50;
          border-bottom: 1px solid $brand-secondary4-100;
          &:first-child {
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
      tfoot {
        .ltw__footer {
          border: 1px solid $brand-secondary4-50;
          border-top: 0;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }
      }
    }
    &.table-secondary1 {
      thead {
        tr {
          th {
            background-color: $brand-secondary1-50;
            div {
              @include label-large($brand-neutral-700, 500);
            }
          }
        }
      }
      tbody {
        tr {
          border: 1px solid $brand-secondary1-50;
          border-bottom: 1px solid $brand-secondary1-100;
          &:first-child {
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
          }
          &:last-child {
            border-bottom: none;
          }
        }
      }
      tfoot {
        .ltw__footer {
          border: 1px solid $brand-secondary1-50;
          border-top: 0;
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.lxp-pagination {
  ul {
    margin-bottom: 0;
  }
}
</style>
