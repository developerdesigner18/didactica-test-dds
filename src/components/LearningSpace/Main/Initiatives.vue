<template>
  <div class="ls-initiatives__wrapper">
    <div class="ls-initiatives__header">
      <h6>
        {{ cInitiative.name }}
      </h6>
      <div class="ls-initiatives__header--edit" v-if="edit">
        <edit-button @click="onEdit"></edit-button>
      </div>
    </div>
    <div class="ls-initiatives__subheading">
      <p>{{ cInitiative.short_headline }}</p>
    </div>
    <div class="ls-initiatives__content">
      <div class="initiative__img-container">
        <img
          :src="cInitiative.image"
          alt="background"
          width="480"
          class="initiative_img"
          loading="lazy"
          v-if="cInitiative.image"
        />
        <LxpButton
          v-if="cInitiative.video_url"
          class="initiative__img-play-btn"
          @click="showVideoModal = true"
        >
          <img
            alt="play"
            src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/play.svg"
            loading="lazy"
          />
        </LxpButton>
      </div>

      <VideoModal
        :show.sync="showVideoModal"
        :videoUrl="cInitiative.video_url"
      />
      <span v-html="info" />
    </div>
    <div class="initiative__img_mob">
      <div class="initiative__img-container_mobile">
        <img
          :src="cInitiative.image"
          alt="background"
          class="initiative_img_mobile"
          loading="lazy"
          v-if="cInitiative.image"
        />
        <LxpButton
          v-if="cInitiative.video_url"
          class="initiative__img-play-btn_mobile"
          @click="showVideoModal = true"
        >
          <img
            alt="play"
            src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/play.svg"
            loading="lazy"
          />
        </LxpButton>
      </div>
    </div>
    <div class="ls-initiatives__resources">
      <featured-resources
        v-if="edit || (featuredResources && featuredResources.length > 0)"
        :edit="edit"
        :showFeaturedResources="showFeaturedResources"
        :parent="initiatives"
        :featuredResources="featuredResources"
        :initiative="cInitiative"
        @featured-resources-updated="$emit('update-featured-resources')"
        @toggle-updated="$emit('toggle-updated')"
      />
    </div>
    <initiatives-modal
      :show.sync="isEdit"
      :initiative="cInitiative"
      @update-initiative="onUpdateInitiative"
    />
  </div>
</template>

<script>
import { LxpButton } from "@/components/Common/index.js";
import EditButton from "../Shared/EditButton.vue";
import FeaturedResources from "../Shared/FeaturedResources.vue";
import InitiativesModal from "../Shared/Modals/InitiativesModal.vue";
import VideoModal from "../Shared/Modals/VideoModal.vue";

export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    initiative: {
      name: String,
      short_headline: String,
      info: String,
      image: URL
    },
    initiatives: {
      type: String,
      default: "initiatives"
    },
    featuredResources: {
      type: Array,
      default: () => []
    },
    showFeaturedResources: {
      type: Boolean,
      default: true
    }
  },
  components: {
    EditButton,
    InitiativesModal,
    FeaturedResources,
    VideoModal,
    LxpButton
  },
  data() {
    return {
      isEdit: false,
      showVideoModal: false,
      cInitiative: {
        short_headline: "",
        info: "",
        image: "",
        video_url: ""
      }
    };
  },
  computed: {
    info() {
      if (this.cInitiative.info) {
        return this.cInitiative.info.replaceAll(new RegExp(/\n/g), "<br/>");
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.cInitiative = this.initiative;
  },
  methods: {
    onEdit() {
      this.isEdit = true;
    },
    onUpdateInitiative(data) {
      this.cInitiative = data;
      this.$emit("update-initiative", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.ls-initiatives__wrapper {
  text-align: left;
  .ls-initiatives__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    h6 {
      @include h6;
      margin-right: 10px;
      word-wrap: break-word;
    }
  }
  .ls-initiatives__subheading {
    p {
      @include subtitle-regular;
    }
  }
  .ls-initiatives__content {
    padding-bottom: 30px;
    min-height: 320px;
    .initiative_img {
      float: right;
      object-fit: cover;
      height: 320px;
      border-radius: 8px;
      margin-left: 16px;
    }
    p {
      @include body-regular;
    }
    .initiative__img-container {
      display: block;
      position: relative;
      width: 480px;
      height: auto;
      float: right;
      margin-left: 16px;
    }

    .initiative__img-play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      font-size: 16px;
      border: none;
      cursor: pointer;
      width: 56px;
      height: 56px;
      padding: 0;
      border-radius: 100px;
      background: $brand-primary-400;
      &:hover {
        background: $brand-primary-600;
      }
      &:focus {
        background: $brand-primary-600;
        border: none;
      }
      &:active {
        background: $brand-primary-400;
      }
    }
  }
  .ls-initiatives__resources {
    margin-top: 40px;
  }
  .initiative__img_mob {
    display: none;
    width: 100%;
    .initiative__img-container_mobile {
      position: relative;
      width: 100%;
      max-width: 400px;
      border-radius: 8px !important;
      img {
        width: 100%;
        height: auto;
      }
      .initiative__img-play-btn_mobile {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        width: 56px;
        border: none;
        height: 56px;
        border-radius: 100px;
        background: $brand-primary-400;
        &:hover {
          background: $brand-primary-600;
        }
        &:focus {
          background: $brand-primary-600;
          border: none;
          padding: 0;
        }
        &:active {
          background: $brand-primary-400;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .initiative__img-container {
    display: none !important;
  }
  .initiative__img_mob {
    display: block !important;
  }
  .ls-initiatives__content {
    padding-bottom: 24px !important;
  }
}
[dir="rtl"] {
  .ls-initiatives__wrapper {
    .ls-initiatives__subheading {
      p {
        text-align: right;
      }
    }
    .ls-initiatives__content {
      .initiative_img {
        float: left;
        margin: 0 16px 0 0;
      }
    }
  }
}
</style>
