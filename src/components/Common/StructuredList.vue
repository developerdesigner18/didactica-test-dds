<template>
  <div class="lxp-structured-list">
    <draggable
      ref="draggable"
      v-model="list"
      :force-fallback="forceFallback"
      :handle="handle"
      chosenClass="lxp-sl__list--drag"
      ghostClass="lxp-sl__list--on_drag"
      @end="onDragEnd"
      @start="onDragStart"
    >
      <transition-group name="list">
        <div
          v-for="(item, index) in list"
          :class="[
            'lxp-sl__list--item',
            { 'lxp-sl__list--on_drag': index === dragIndex }
          ]"
          :key="item.order"
        >
          <!-- Default item template if no slot is provided -->
          <span>
            <slot
              name="item"
              :item="item"
              :index="index"
              ref="listItem"
              v-if="index !== dragIndex"
            >
              <div class="lxp-sl__list--item__handler">
                <img
                  :id="'imgHandle-' + index"
                  src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/dragging-indicator.svg"
                  alt="drag"
                  loading="lazy"
                />
                <b-tooltip
                  :target="'imgHandle-' + index"
                  :title="tooltipTitle"
                  :placement="tooltipPlacement"
                  custom-class="lxp-structured-list--tooltip"
                ></b-tooltip>
                <span class="lxp-sl__list--name">{{ item.name }}</span>
              </div>
            </slot>
          </span>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    forceFallback: {
      type: Boolean,
      default: true
    },
    handle: {
      type: String,
      default: ".lxp-sl__list--item__handler"
    },
    tooltipTitle: {
      type: String,
      default: "Drag & Drop"
    },
    tooltipPlacement: {
      type: String,
      default: "right"
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      list: [],
      isDragging: false,
      dragIndex: -1
    };
  },
  watch: {
    items() {
      this.list = this.items;
    }
  },
  mounted() {
    this.list = this.items;
  },
  methods: {
    onDragEnd() {
      this.isDragging = false;
      this.dragIndex = -1;
      this.$emit("update:items", this.list);
    },
    onDragStart(evt) {
      this.isDragging = true;
      this.dragIndex = evt.oldIndex;
    }
  }
};
</script>

<style lang="scss">
.lxp-structured-list {
  .lxp-sl__list--item {
    cursor: grab;
    padding: 8px;
    @include body-regular;
    &:hover,
    &.lxp-sl__list--drag {
      background: $brand-primary-100;
      border-radius: 8px;
    }
    &.lxp-sl__list--on_drag {
      color: #0081ff;

      border-radius: 8px;
      &:hover {
        background: transparent !important;
      }
      img {
        visibility: hidden;
      }
      cursor: grabbing;
    }
    .lxp-sl__list--item__handler {
      &:active {
        cursor: grabbing !important;
        color: $brand-primary-400 !important;
        img {
          filter: brightness(0) saturate(100%) invert(39%) sepia(72%)
            saturate(4645%) hue-rotate(196deg) brightness(103%) contrast(102%) !important;
        }
      }
      img:hover {
        cursor: pointer;
      }
      .lxp-sl__list--name {
        padding-left: 16px;
      }
      .tooltip {
        opacity: 1 !important;
      }
      .lxp-structured-list--tooltip {
        .tooltip-inner {
          background: $brand-primary !important;
          padding: 8px 16px !important;
          @include label-medium($font-weight: 500);
        }
      }
    }
  }
  .sortable-drag {
    color: $brand-primary-400 !important;
    img {
      filter: brightness(0) saturate(100%) invert(39%) sepia(72%)
        saturate(4645%) hue-rotate(196deg) brightness(103%) contrast(102%) !important;
    }
  }
  .list-move {
    transition: transform 0.5s;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
