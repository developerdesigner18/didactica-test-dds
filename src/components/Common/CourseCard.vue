<template>
  <div
    :title="cardTitle"
    :class="['lxp-course-card', cardClass]"
    @click="onClick"
  >
    <div class="lxp-course-card--div">
      <div :class="['lxp-course-card__img', headerClass]">
        <b-img
          :src="cardImg"
          alt="course image"
          class="lxp-cc__img"
          @error="handleImgError"
        ></b-img>
        <slot name="tag"></slot>
        <div :class="['card-tag', tagClass]" v-if="tagText && !$slots.tag">
          {{ tagText }}
        </div>
      </div>
      <CardContent
        :cardSubTitle="cardSubTitle"
        :cardTitle="cardTitle"
        @subTitleClick="onSubTitleClick"
      />
      <div
        :class="['lxp-course-card__footer', footerClass]"
        @click="$emit('footer-click')"
      >
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import CardContent from "./CourseCard/CardContent.vue";
export default {
  name: "lxp-course-card",
  props: {
    cardImage: {
      type: String,
      default:
        "https://files.lxp.academy.who.int/didactica/assets/images/course-card/course-illustration.svg"
    },
    defaultImage: {
      type: String,
      default:
        "https://files.lxp.academy.who.int/didactica/assets/images/course-card/course-illustration.svg"
    },
    tagText: {
      type: String
    },
    cardTitle: {
      type: String,
      required: true
    },
    cardSubTitle: String,
    cardClass: String,
    headerClass: String,
    footerClass: String,
    tagClass: String
  },
  components: { CardContent },
  data() {
    return {
      cardImg: "value"
    };
  },
  watch: {
    cardImage(newVal, oldVal) {
      if (oldVal !== newVal) {
        this.cardImg = this.cardImage;
      }
    }
  },
  mounted() {
    this.cardImg = this.cardImage;
  },
  methods: {
    onClick() {
      this.$emit("card-click");
    },
    onSubTitleClick() {
      this.$emit("card-subtitle-click");
    },
    handleImgError() {
      this.cardImg = this.defaultImage;
    }
  }
};
</script>
<style lang="scss">
[dir="rtl"] {
  .lxp-course-card {
    z-index: -1;
    .card {
      .card-body {
        .lx-course-card__content {
          text-align: right;
        }
        .lxp-course-card__footer {
          .lxp-course-card__pacing,
          .lxp-course-card__language {
            img {
              margin: 0 0 0 5px;
            }
          }
        }
      }
    }
  }
}
.lxp-course-card {
  .lxp-course-card--div {
    box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
    border-radius: 16px;
    border: none;
    cursor: pointer;
    min-width: 190px;
    max-width: 550px;
    height: 265px;
    margin-right: 20px;
    background: #fff;
    .lxp-course-card__img {
      height: 128px;
      position: relative;
      .lxp-cc__img {
        height: 128px;
        object-fit: cover;
        object-position: center;
        width: 100%;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
      }
      .card-tag {
        @include label-medium;
        background: $brand-secondary1-400;
        border-radius: 8px;
        color: #fff;
        position: absolute;
        right: 8px;
        top: 8px;
        padding: 4px 8px;
      }
    }

    &:hover {
      box-shadow: 0px 4px 8px 4px rgba(33, 33, 33, 0.1);
      transform: scale(1.02);
    }
  }

  .lxp-course-card__footer {
    @include label-medium;
    min-height: 32px;
    max-height: 52px;
    padding: 8px 16px 16px 16px;
  }
}
</style>
