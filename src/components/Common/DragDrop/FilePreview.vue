<template>
  <div :class="['lxp-dd__files--file-variant', variant]">
    <img
      :src="previewImage"
      alt="preview-img"
      class="lxp-dd___files--img"
      loading="lazy"
    />
    <lxp-dropdown
      :buttonContent="buttonContent"
      dropdownClass="lxp-drag__dd"
      :dropdownArr="buttonDropdownArr"
      @click="onDropdownItemClick"
      v-if="variant === 'variant1'"
    ></lxp-dropdown>
    <div class="lxp-remove--btn" v-if="variant === 'variant2'">
      <div @click="$emit('remove')">
        <img
          :src="removePath"
          alt="upload"
          width="14"
          height="14"
          loading="lazy"
        />
        <p>{{ removeText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import LxpDropdown from "../Dropdown.vue";

export default {
  props: {
    variant: {
      type: String,
      required: true
    },
    editBtnContent: {
      type: String
    },
    editBtnDropdownArray: {
      type: Array,
      default: () => []
    },
    editCoverText: {
      type: String,
      default: "Edit"
    },
    removeText: {
      type: String,
      default: "Remove"
    },
    uploadNewText: {
      type: String,
      default: "Upload new"
    },
    previewImage: {
      type: String,
      required: true
    }
  },
  components: {
    LxpDropdown
  },
  data() {
    return {
      removePath:
        "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/remove.svg"
    };
  },
  computed: {
    buttonContent() {
      if (!this.editBtnContent) {
        let imgPath =
          "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload.svg";
        return `<div class="lxp-dd__content">
        <img src="${imgPath}" alt="upload" width="14" height="14" loading="lazy" />
        <p>${this.editCoverText}</p>
      </div>`;
      } else {
        return this.editBtnContent;
      }
    },
    buttonDropdownArr() {
      if (this.editBtnDropdownArray.length) {
        return this.editBtnDropdownArray;
      } else {
        let uploadNewPath =
          "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload-new.svg";
        return [
          {
            name: `<div class="lxp-dd__content">
              <img src="${this.removePath}" alt="upload" width="14" height="14" loading="lazy" />
              <p>${this.removeText}</p>
            </div>`,
            id: "remove"
          },
          {
            name: `<div class="lxp-dd__content">
              <img src="${uploadNewPath}" alt="upload" width="14" height="14" loading="lazy" />
              <p>${this.uploadNewText}</p>
            </div>`,
            id: "upload-new"
          }
        ];
      }
    }
  },
  methods: {
    onDropdownItemClick(d) {
      this.$emit(d.id);
    }
  }
};
</script>

<style lang="scss">
.lxp-dd__files--file-variant {
  height: 100%;
  @include flex-horizontal-center;
  &.variant2 {
    .lxp-remove--btn {
      display: none;
    }
    &:hover {
      .lxp-remove--btn {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(45, 45, 45, 0.25);
        border-radius: 16px;
        cursor: pointer;
        div {
          background: #ffffff;
          border-radius: 8px;
          padding: 8px;
          position: absolute;
          right: 9px;
          top: 11px;
          @include flex-horizontal-center;
          p {
            margin: 0 0 0 5px;
            @include body-medium;
          }
        }
      }
    }
  }
  &.variant1 {
    .lxp-drag__dd {
      display: none;
    }
  }
  .lxp-dd___files--img {
    border-radius: 8px;
    width: 100%;
    object-fit: cover;
    height: 100%;
    object-fit: contain;
    transition: filter 0.3s;
    &:hover {
      filter: brightness(80%);
    }
  }
  .dropdown-menu {
    margin-top: 0px !important;

    li {
      &:hover {
        background: $brand-primary-100 !important;
      }
    }
  }
  .dropdown-item {
    width: 10px !important;
    &:hover {
      background: unset !important;
    }
  }
  .lx-select__div {
    .lx-select__dropdown {
      padding: 12px 16px 9px !important;
      border: none;
      &.show {
        border: none;
      }
    }
  }
  .lxp-drag__dd {
    display: none;
    &:hover {
      .lxp-dd___files--img {
        filter: brightness(80%);
      }
    }
  }
}
.lxp-dd__drop {
  &:hover {
    .lxp-dd__files--file-variant {
      &.variant1 {
        .lxp-drag__dd {
          display: block;
        }
      }
    }
  }
}
</style>
