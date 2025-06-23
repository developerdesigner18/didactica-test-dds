<template>
  <div class="ls-about__wrapper">
    <div class="ls-about__header">
      <h6>
        {{ cAboutObj.short_headline }}
      </h6>
      <div class="ls-about__header--edit" v-if="edit">
        <edit-button @click="onEdit"></edit-button>
      </div>
    </div>
    <div class="ls-about__content">
      <div class="about__img-container">
        <img
          v-if="cAboutObj.image"
          :src="cAboutObj.image"
          width="480"
          loading="lazy"
          class="about_img"
          alt=""
        />
        <LxpButton
          v-if="cAboutObj.video_url"
          class="about__img-play-btn"
          @click="openVideoModal"
        >
          <img
            alt="play"
            src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/play.svg"
            loading="lazy"
          />
        </LxpButton>
      </div>

      <VideoModal :show.sync="showVideoModal" :videoUrl="cAboutObj.video_url" />
      <span v-html="info" />
    </div>
    <div class="about__img_mob">
      <div class="about__img-container_mobile">
        <img
          :src="cAboutObj.image"
          alt="background"
          class="about_img_mobile"
          loading="lazy"
          v-if="cAboutObj.image"
        />
        <LxpButton
          v-if="cAboutObj.video_url"
          class="about__img-play-btn_mobile"
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
    <div v-if="tags.length > 0" class="ls-about__tags">
      <ul class="about__tags-list">
        <li v-for="tag in tags" :key="'tag' + tag.id">
          <LxpPills @click="onTagClick" :item="tag" />
        </li>
      </ul>
    </div>
    <div class="ls-about__resources">
      <featured-resources
        :edit="edit"
        :parent="about"
        :showFeaturedResources="showFeaturedResources"
        v-if="edit || (featuredResources && featuredResources.length > 0)"
        :featuredResources="featuredResources"
        @featured-resources-updated="$emit('update-featured-resources')"
        @toggle-updated="$emit('toggle-updated')"
      />
    </div>
    <AboutModal
      :show.sync="isEdit"
      :about="cAboutObj"
      @update-about="onUpdate"
    />
  </div>
</template>

<script>
import EditButton from "../Shared/EditButton.vue";
import AboutModal from "../Shared/Modals/AboutModal.vue";
import FeaturedResources from "../Shared/FeaturedResources.vue";
import VideoModal from "../Shared/Modals/VideoModal.vue";
import { LxpPills, LxpButton } from "@/components/Common/index.js";

export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    about: {
      type: String,
      default: "about"
    },

    aboutObj: {
      short_headline: String,
      info: String,
      image: URL,
      video_url: URL
    },
    tags: {
      type: Array,
      default: () => []
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
    AboutModal,
    FeaturedResources,
    VideoModal,
    LxpPills,
    LxpButton
  },
  data() {
    return {
      isEdit: false,
      showVideoModal: false,
      isModalOpen: false,
      dataFetchURL: "",
      test: "test",
      cAboutObj: {
        short_headline: "",
        info: "",
        image: "",
        video_url: ""
      }
    };
  },
  computed: {
    info() {
      if (this.cAboutObj.info) {
        return this.cAboutObj.info.replaceAll(new RegExp(/\n/g), "<br/>");
      } else {
        return "";
      }
    }
  },
  mounted() {
    this.cAboutObj = this.aboutObj;
  },
  methods: {
    onEdit() {
      this.isEdit = true;
    },
    onUpdate(data) {
      this.cAboutObj = data;
      this.$emit("update-about");
    },
    openVideoModal() {
      this.showVideoModal = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.videoUrl = "";
    },
    onTagClick(item) {
      this.$emit("tag-selected", { tabIndex: 1, tag: item });
    }
  }
};
</script>

<style lang="scss" scoped>
.ls-about__wrapper {
  text-align: left;
  .ls-about__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    h6 {
      @include subtitle-regular;
      margin-right: 10px;
      word-wrap: break-word;
    }
  }
  .ls-about__content {
    padding-bottom: 30px;
    min-height: 320px;
    .about__img-container {
      position: relative;
      width: 480px;
      height: auto;
      float: right;
      margin-left: 16px;
    }

    .about__img-play-btn {
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
    .about_img {
      float: right;
      object-fit: cover;
      height: 320px;
      border-radius: 8px;
      margin-left: 16px;
    }
    p {
      @include body-regular;
    }
  }
  .ls-about__resources {
    margin-top: 40px;
  }
  .ls-about__tags {
    margin-top: 10px;

    .about__tags-list {
      list-style: none;
      display: inline;
      padding: 0;
      margin: 0;
    }

    .about__tags-list li {
      display: inline-block;
      margin-right: 10px;
    }
  }
  .about__img_mob {
    display: none;
    width: 100%;

    .about__img-container_mobile {
      position: relative;
      width: 100%;
      max-width: 400px;
      border-radius: 8px !important;

      img {
        width: 100%;
        height: auto;
      }
      .about__img-play-btn_mobile {
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
  .ls-about__tags {
    text-align: center;
  }
  .about__img-container {
    display: none !important;
  }
  .about__img_mob {
    display: block !important;
  }
  .ls-about__content {
    padding-bottom: 24px !important;
  }
}
[dir="rtl"] {
  .ls-about__wrapper {
    .ls-about__header {
      h6 {
        margin: 0 0 0 10px;
        text-align: right;
      }
    }

    .ls-about__content {
      .about_img {
        float: left;
        margin: 0 16px 0 0;
      }
    }
  }
}

@media screen and (max-width: 960px) {
  .about__img-container {
    width: 310px !important;
    height: auto;
  }
  .about__img-container img {
    width: 100%;
  }
}
</style>
