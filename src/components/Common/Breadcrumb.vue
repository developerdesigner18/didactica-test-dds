<template>
  <div class="lxp-breadcrumb">
    <b-breadcrumb>
      <b-breadcrumb-item
        v-for="(item, index) in items"
        :key="index"
        @click="$emit('click', item)"
        :class="{ active: item.active }"
      >
        <img
          class="bc__custom-icon"
          v-if="item.icon"
          :src="item.icon"
          alt="breadcrumb"
          loading="lazy"
        />
        {{ item.text }}
      </b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>
<script>
import { BBreadcrumb, BBreadcrumbItem } from "bootstrap-vue";
export default {
  components: {
    "b-breadcrumb": BBreadcrumb,
    "b-breadcrumb-item": BBreadcrumbItem
  },
  props: {
    items: {
      type: Array,
      default: function () {
        return [
          {
            icon: "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload-grey.svg",
            text: "Admin",
            to: "#"
          },
          {
            icon: null,
            text: "Manage",
            to: "#"
          },
          {
            icon: null,
            text: "Library",
            active: true
          }
        ];
      }
    }
  }
};
</script>
<style lang="scss">
[dir="rtl"] {
  .lxp-breadcrumb {
    .breadcrumb {
      .breadcrumb-item + .breadcrumb-item::before {
        padding: 0 0.5em 0 0.5em;
        float: right;
      }
    }
  }
}
.lxp-breadcrumb {
  @include label-medium;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0.2px;
  color: $brand-neutral-200;

  .breadcrumb {
    background: transparent;

    .breadcrumb-item {
      &.active {
        a {
          color: $brand-primary;
        }
      }

      a {
        color: $brand-disabled-grey;
        text-decoration: none;
        display: flex;
        align-items: center;

        .bc__custom-icon {
          width: 12px;
          margin-right: 6px;
        }
      }
    }

    .breadcrumb-item + .breadcrumb-item::before {
      color: $brand-disabled-grey;
      content: "›";
      font-size: 16px;
      line-height: 14px;
    }
  }
}
</style>
