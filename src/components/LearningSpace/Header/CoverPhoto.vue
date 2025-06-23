<template>
  <div class="header__cover">
    <div class="header__cover--sec">
      <img
        :src="
          coverPic
            ? coverPic
            : 'https://files.lxp.academy.who.int/didactica/assets/images/learning-space/header/main-bg.svg'
        "
        alt=""
        height="200"
        class="header__cover--img"
        loading="lazy"
      />
      <div class="header__cover--cta">
        <lxp-dropdown
          v-if="editCover"
          :buttonContent="buttonContent"
          dropdownClass="lxp-drag__dd"
          :dropdownArr="buttonDropdownArr"
          @click="onDropdownItemClick"
        ></lxp-dropdown>
      </div>
    </div>
    <upload-logo
      id="cover"
      title="Cover photo"
      content="Ideal image dimensions 2056 x 400 pixels work best. File format should be jpeg. The maximum size per file is 5MB"
      :fileSize="5242880"
      :show.sync="showUploadModal"
      :validateFileDimension="false"
      @logo-updated="onCoverUpdate"
    />
    <delete-modal :show.sync="showDeleteModal" @cover-updated="onCoverUpdate" />
  </div>
</template>
<script>
import LxpDropdown from "@/components/Common/Dropdown.vue";
import UploadLogo from "../Shared/Modals/UploadLogo.vue";
import DeleteModal from "../Shared/Modals/DeleteModal.vue";
export default {
  props: {
    editCover: {
      type: Boolean,
      default: false
    },
    coverPic: {
      type: String
    }
  },
  inject: ["urlObj", "authToken"],
  components: {
    LxpDropdown,
    UploadLogo,
    DeleteModal
  },
  data() {
    return {
      showUploadModal: false,
      showDeleteModal: false,
      showEditCover: false
    };
  },
  computed: {
    buttonContent() {
      let imgPath =
        "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload.svg";
      return `<div class="lxp-dd__content">
        <img src="${imgPath}" alt="upload" width="14" height="14" loading="lazy" />
        <p>Edit Cover</p>
      </div>`;
    },
    buttonDropdownArr() {
      let uploadNewPath =
        "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload-new.svg";
      return [
        {
          name: `<div class="lxp-dd__content">
              <img src="${uploadNewPath}" alt="upload" width="14" height="14" loading="lazy" />
              <p>Upload photo</p>
            </div>`,
          id: "upload-new"
        },
        {
          name: `<div class="lxp-dd__content">
              <img src="https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/remove.svg" alt="upload" width="14" height="14" loading="lazy" />
              <p>Remove</p>
            </div>`,
          id: "remove"
        }
      ];
    }
  },
  methods: {
    onDropdownItemClick(d) {
      if (d.id === "upload-new") {
        this.showUploadModal = true;
      } else {
        this.showDeleteModal = true;
      }
      this.$emit(d.id);
    },

    onCoverUpdate(data) {
      this.$emit("cover-updated", data);
    }
  }
};
</script>
<style lang="scss">
$padding-px: 8px;
.header__cover {
  .header__cover--sec {
    position: relative;
    .header__cover--img {
      width: 100%;
      object-fit: cover;
      border-radius: $border-radius;
    }
    .header__cover--upload {
      position: absolute;
      right: $padding-px;
      bottom: $padding-px;
      display: flex;
      align-items: center;
      background: #ffffff;
      border-radius: $padding-px;
      padding: $padding-px;
      gap: $padding-px;
      cursor: pointer;
      p {
        @include flex-horizontal-center;
        @include label-large;
        margin-bottom: 0;
      }
    }
  }
}
.header__cover--cta {
  .dropdown-menu {
    top: 4px !important;
    li {
      &:hover {
        background: $brand-primary-100;
      }
    }
  }
  .lx-select__div {
    &:hover {
      background: unset !important;
    }
    .lx-select__dropdown {
      padding: 12px 16px 9px !important;
      border: none;
      &.show {
        border: none;
      }
    }
  }
}

[dir="rtl"] {
  .header__cover {
    .header__cover--sec {
      .header__cover--upload {
        right: auto;
        left: $padding-px;
      }
    }
  }
}
</style>
