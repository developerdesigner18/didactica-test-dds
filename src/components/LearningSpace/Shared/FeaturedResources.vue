<template>
  <div
    class="featured-resources__wrapper"
    v-if="edit || (!edit && toggleState)"
  >
    <div v-if="showHeader" class="fr__header">
      <h6>Featured Resources</h6>
      <div class="fr__header--right" v-if="edit">
        <div class="section-txt">
          {{ section }}
        </div>
        <LxpToggleSwitch
          :toggleState="toggleState"
          @update:toggleState="handleChange"
          :disabled="false"
        />
        <LxpButton
          variant="link"
          className="fr-feat_resources"
          @click="showModal = true"
          >Manage</LxpButton
        >
      </div>
      <div class="fr-feat__resources-cta" v-if="enableScrollbtn">
        <img
          src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/chevron-left.svg"
          width="20"
          height="20"
          alt="Left"
          loading="lazy"
          :disabled="currentPosition === 0"
          @click="slide('left')"
        />
        <img
          src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/chevron-right.svg"
          alt="chevron"
          width="20"
          height="20"
          loading="lazy"
          :disabled="currentPosition >= slidesCount"
          @click="slide('right')"
        />
      </div>
    </div>
    <div class="fr__cards">
      <div class="fr__cards--empty" v-if="showFeaturedResourceEmptySection">
        <p>
          You have not selected any Resources to be featured on this section.
        </p>
        <p>
          Select <a @click="showModal = true">Resources now</a>. We will hide
          this section automatically if you don’t select any resources to be
          featured.
        </p>
      </div>
      <div v-else class="center" id="content">
        <div
          class="internal fr__card--content"
          :class="{ 'gradient-effect': !toggleState }"
          v-for="(course, i) in courses"
          :key="i"
        >
          <LxpCourseCard
            :key="course.id"
            :card-sub-title="course.org_display_name"
            :card-title="course.title"
            :card-image="course.image_url"
            tag-class="ls-resources__card--tag"
            footer-class="ls-resource__card--footer"
            @card-click="$parent.$emit('card-click', course)"
            @card-subtitle-click="
              $parent.$emit('card-subtitle-click', course.org)
            "
          >
            <template #footer>
              <course-card-footer :course="course" />
            </template>
          </LxpCourseCard>
        </div>
      </div>
    </div>

    <featured-resources-modal
      :resources="featuredResources"
      :show.sync="showModal"
      :parent="parent"
      :initiative="initiative"
      @featured-resources-updated="onFeaturedResourcesUpdate"
    />
  </div>
</template>

<script>
import axios from "axios";
import {
  LxpButton,
  LxpCourseCard,
  LxpToggleSwitch
} from "../../Common/index.js";
import CourseCardFooter from "./CourseCardFooter.vue";
import FeaturedResourcesModal from "./Modals/FeaturedResourcesModal.vue";

export default {
  props: {
    edit: {
      type: Boolean,
      required: false
    },
    parent: {
      type: String,
      default: ""
    },
    featuredResources: {
      type: Array,
      default: () => []
    },
    showFeaturedResources: {
      type: Boolean,
      default: true
    },
    initiative: {
      type: Object,
      default: () => {}
    }
  },

  inject: ["authToken", "urlObj"],
  components: {
    LxpButton,
    FeaturedResourcesModal,
    LxpCourseCard,
    CourseCardFooter,
    LxpToggleSwitch
  },
  data() {
    return {
      showModal: false,
      toggleState: true,
      currentPosition: 0,
      slidesCount: 0,
      currentMargin: 0,
      slidesPerPage: 4
    };
  },
  computed: {
    section() {
      return this.toggleState ? "Show Section" : "Hide Section";
    },
    showFeaturedResourceEmptySection() {
      if (this.edit) {
        return this.featuredResources.length === 0;
      }
      return false;
    },
    showHeader() {
      if (this.edit) {
        return this.featuredResources.length > 0;
      }
      return this.courses.length > 0;
    },
    courses() {
      return this.featuredResources;
    },
    enableScrollbtn() {
      return this.featuredResources.length > this.slidesPerPage;
    }
  },
  watch: {
    featuredResources: {
      handler() {
        this.setParams();
      },
      deep: true
    }
  },
  created() {
    this.toggleState = this.showFeaturedResources;
  },
  mounted() {
    window.addEventListener("resize", this.setParams);
    setTimeout(() => {
      this.setParams();
    }, 1000);
  },
  methods: {
    onFeaturedResourcesUpdate() {
      this.$emit("featured-resources-updated");
    },
    getPrefix() {
      let prefix = "";
      if (this.parent === "about") {
        prefix = "about";
      } else if (this.parent === "initiatives") {
        prefix = "initiatives";
      }
      return prefix;
    },
    showRandom() {
      if (this.parent === "about") {
        return true;
      } else {
        return false;
      }
    },
    handleChange(newToggleState) {
      this.toggleState = newToggleState;
      const data = {
        name: "_featuredresources",
        title: "Featured Resources",
        is_enabled: this.toggleState
      };
      data.name = this.getPrefix() + data.name;
      axios[this.urlObj.UPDATE_MANAGE_SECTION.method](
        this.urlObj.UPDATE_MANAGE_SECTION.url,
        data,
        {
          headers: {
            Authorization: this.authToken
          }
        }
      )
        .then((res) => {
          this.$emit("toggle-updated", res.data, this.toggleState);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    setParams() {
      let w = document.getElementsByClassName("fr__cards")[0].offsetWidth;
      const c =
        document.getElementsByClassName("fr__card--content")[0].offsetWidth +
        12;
      this.slidesPerPage = parseInt(w / c);
      this.slidesPerPage =
        this.courses.length > this.slidesPerPage
          ? this.slidesPerPage
          : this.courses.length;
      let slides = this.featuredResources.length,
        slider = document.getElementById("content");
      this.slidesCount = slides - this.slidesPerPage;
      if (this.currentPosition > this.slidesCount) {
        this.currentPosition -= this.slidesPerPage;
      }
      this.currentMargin = -this.currentPosition * (100 / this.slidesPerPage);
      slider.style.marginLeft = `${this.currentMargin}%`;
    },
    slide(type) {
      let slider = document.getElementById("content");
      const scrollWidth =
        document.getElementsByClassName("fr__card--content")[0].offsetWidth +
        48;
      if (type === "left") {
        if (this.currentPosition !== 0) {
          slider.style.marginLeft = this.currentMargin + scrollWidth + "px";
          this.currentMargin += scrollWidth;
          this.currentPosition--;
        }
      } else {
        if (this.currentPosition !== this.slidesCount) {
          slider.style.marginLeft = this.currentMargin - scrollWidth + "px";
          this.currentMargin -= scrollWidth;
          this.currentPosition++;
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.setParams);
  }
};
</script>

<style lang="scss" scoped>
.featured-resources__wrapper {
  .fr__header {
    @include horizontal-space-between;
    h6 {
      @include subtitle-regular;
      margin-bottom: 0;
    }
    .fr__header--right {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      .section-txt {
        position: relative;
        top: 10px;
        right: 10px;
        font-style: italic;
        font-size: 14px;
        color: #a0a0a0;
      }
      .fr-feat_resources {
        margin-left: 16px;
        &:hover {
          text-decoration: unset;
        }
      }
      .lxp-toggle {
        margin-top: 6px;
      }
    }
    .fr-feat__resources-cta {
      @include horizontal-space-between;
      gap: 8px;
      img {
        cursor: pointer;
      }
      img[disabled="disabled"] {
        opacity: 0.3;
        cursor: default;
      }
    }
  }
  .fr__cards {
    margin-top: 20px;
    overflow-x: hidden;
    display: grid;
    place-items: baseline;
    .fr__cards--empty {
      background: #ffffff;
      box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
      border-radius: 16px;
      padding: 16px;
      text-align: center;
      width: 100%;
      @include label-large($brand-neutral-300);
      p {
        margin-bottom: 4px;
        a {
          color: $brand-primary-400;
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
    .center {
      display: flex;
      transition: all 0.5s;
      min-width: 50%;
      max-width: 100%;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 24px;
      .internal {
        height: 100%;
        width: 100%;
        display: grid;
        place-items: center;
        margin-bottom: 10px;
        :deep .lxp-course-card {
          width: 100%;
          &--dev {
            margin-right: 0;
          }
        }
        &:first-child {
          margin-left: 10px;
        }
        &:last-child {
          margin-right: 10px;
        }
      }
    }
  }

  .gradient-effect {
    background: linear-gradient(to bottom, #fff, #f0f0f0);
    pointer-events: none;
    opacity: 0.3;
  }
}

@media screen and (max-width: 1280px) {
  .fr__cards {
    .internal {
      width: 50% !important;
    }
  }
}
@media screen and (max-width: 990px) {
  .fr__cards {
    .internal {
      width: 49% !important;
    }
  }
}
@media screen and (max-width: 820px) {
  .fr__cards {
    .internal {
      width: 100% !important;
    }
  }

  .section-txt {
    display: none !important;
  }
}
</style>
