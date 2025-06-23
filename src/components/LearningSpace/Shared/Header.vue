ea
<template>
  <div class="ls__header">
    <div v-if="!hasError" class="ls-header__cover">
      <cover-photo
        v-if="edit || cSpaceObj.cover_image"
        :coverPic="cSpaceObj.cover_image"
        @cover-updated="onCoverUpdate"
        :editCover="edit"
      />
      <div
        :class="{
          header__profile_no_cover:
            !edit &&
            (cSpaceObj.cover_image === '' || cSpaceObj.cover_image === null)
        }"
        class="ls-header__profile"
      >
        <img
          :src="
            cSpaceObj.logo
              ? cSpaceObj.logo
              : 'https://files.lxp.academy.who.int/didactica/assets/images/learning-space/header/logo-default.svg'
          "
          class="ls-header__profile--img"
          loading="lazy"
          v-if="!edit"
          alt=""
        />
        <div class="ls-header__profile--edit" v-else>
          <img
            :src="
              cSpaceObj.logo
                ? cSpaceObj.logo
                : 'https://files.lxp.academy.who.int/didactica/assets/images/learning-space/header/logo-default.svg'
            "
            class="ls-header__profile--img"
            loading="lazy"
            alt=""
          />
          <LxpButton class="ls-header__profile--edit-div" @click="editLogo">
            <img
              src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/header/upload-white.svg"
              alt="upload"
              loading="lazy"
            />
          </LxpButton>
        </div>
      </div>
      <br />
    </div>
    <div
      class="ls-header__title"
      :class="{ 'ls-header__title--no-margin': hasError }"
    >
      <div
        class="ls-header__title--sec"
        :class="{
          header__title_no_cover:
            !edit &&
            (cSpaceObj.cover_image === '' || cSpaceObj.cover_image === null)
        }"
        v-if="!editTitle"
      >
        <h6>{{ cSpaceObj.name }}</h6>

        <edit-button @click="onEditTitle" v-if="edit" />
      </div>
      <div class="ls-header__title--edit" v-else>
        <LxpInput
          placeholder="Space name"
          :maxlength="250"
          showLimit
          v-model="newTitle"
          :isFloating="false"
        />
        <LxpButton :disabled="cSpaceObj.name === ''" @click="saveNewName"
          >Save</LxpButton
        >
        <LxpButton variant="link" @click="editTitle = false">Cancel</LxpButton>
      </div>
    </div>

    <UploadLogoModal
      id="logo"
      title="Logo"
      content="Logo should have 144 pixels of height. File format should be jpeg, jpg or png. The
          maximum size per file is 1MB"
      :show.sync="showUploadModal"
      @logo-updated="onLogoUpdate"
    ></UploadLogoModal>
    <LxpToaster
      title="Updated"
      :show.sync="showToast"
      variant="success"
      message="Learning space name updated successfully!"
    />
  </div>
</template>
<script>
import { LxpInput, LxpButton, LxpToaster } from "../../Common/index";
import CoverPhoto from "../Header/CoverPhoto.vue";
import EditButton from "./EditButton.vue";
import UploadLogoModal from "./Modals/UploadLogo.vue";
import axios from "axios";
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    spaceObj: {
      type: Object
    },
    hasError: {
      type: Boolean,
      default: false
    }
  },
  inject: ["authToken", "urlObj"],
  components: {
    LxpInput,
    LxpButton,
    CoverPhoto,
    EditButton,
    UploadLogoModal,
    LxpToaster
  },
  data() {
    return {
      showUploadModal: false,
      cSpaceObj: {},
      newTitle: "",
      editTitle: false,
      showToast: false
    };
  },
  mounted() {
    this.cSpaceObj = this.spaceObj;
  },

  methods: {
    setTitle() {
      this.newTitle = JSON.parse(JSON.stringify(this.cSpaceObj)).name;
    },
    editLogo() {
      this.$emit("edit-logo");
      this.showUploadModal = true;
    },
    onLogoUpdate(logo) {
      if (this.cSpaceObj) {
        this.cSpaceObj.logo = logo;
        this.$emit("update-logo");
      }
    },
    onCoverUpdate(cover) {
      if (this.cSpaceObj) {
        if (this.cSpaceObj) {
          this.cSpaceObj.cover_image = cover;
          this.$emit("update-logo");
        }
      }
    },
    onEditTitle() {
      this.editTitle = true;
      this.setTitle();
    },
    saveNewName() {
      let headers = {};
      if (this.authToken) {
        headers = {
          headers: {
            Authorization: this.authToken
          }
        };
      }
      axios[this.urlObj.UPDATE_SPACE.method](
        this.urlObj.UPDATE_SPACE.url,
        { name: this.newTitle },
        headers
      ).then((res) => {
        this.$emit("update-title", res.data);
      });
      this.cSpaceObj.name = this.newTitle;
      this.editTitle = false;
      this.showToast = true;
    }
  }
};
</script>
<style lang="scss" scoped>
$border-radius: 8px;
.ls__header {
  .ls-header__cover {
    position: relative;
    .ls-header__banner {
      width: 100%;
      object-fit: cover;
      border-radius: $border-radius;
    }
    .header__profile_no_cover {
      top: 16px;
    }
    .ls-header__profile {
      padding: 10px $border-radius;
      background: #fff;
      height: 71px;
      width: auto;
      box-shadow: 0px 4px $border-radius 4px rgb(33 33 33 / 10%);
      border-radius: $border-radius;
      position: absolute;
      bottom: -15px;
      left: 29px;
      display: flex;
      align-items: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
      .ls-header__profile--edit {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        .ls-header__profile--edit-div {
          padding: $border-radius;
          background: $brand-primary;
          height: 32px;
          width: 32px;
          border-radius: $border-radius;
          position: absolute;
          right: -20px;
          bottom: -20px;
          cursor: pointer;
          @include flex-horizontal-center;
          &:hover {
            background: $brand-primary-600;
            box-shadow: 0px 4px 8px 4px rgba(33, 33, 33, 0.2);
          }
          &:focus {
            background: $brand-primary-600;
          }
        }
      }
    }
  }
  .ls-header__title {
    margin: 50px 16px;
    &.ls-header__title--no-margin {
      margin: 0px;
    }
    .header__title_no_cover {
      position: relative;
      top: 35px;
    }
    .ls-header__title--sec {
      @include horizontal-space-between;
      h6 {
        @include h6;
        text-align: left;
      }
    }
    .ls-header__title--edit {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      .lxp-input {
        flex-grow: 1;
        margin-right: 20px;
      }
    }
  }
}
[dir="rtl"] {
  .ls__header {
    .ls-header__cover {
      .ls-header__profile {
        right: 29px;
        left: auto;
      }
    }
    h6 {
      text-align: right;
    }
  }
}
</style>
