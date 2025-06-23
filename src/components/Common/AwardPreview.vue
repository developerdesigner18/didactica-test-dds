<template>
  <div class="award__preview--wrapper">
    <div class="title" v-if="showTitle">{{ courseTitle }}</div>
    <div :class="['award-information', { 'mt-0': !showTitle }]">
      <div class="award-icon">
        <img :src="awardIcon" :alt="awardTitle" loading="lazy" />
      </div>
      <div
        :class="[
          'award-title',
          {
            'award-title__who':
              awardType !== 'course_participation_confirmation'
          }
        ]"
      >
        {{ awardTitle }}
      </div>
      <div class="presented-to">{{ presentedTo }}</div>
      <div class="user-name">{{ userName }}</div>
      <div class="award-description">
        {{ awardDescription }}
        <span>“{{ courseTitle }}”</span>
      </div>
      <div
        :class="[
          'issued-by',
          {
            'award-issued__by':
              awardType === 'course_participation_confirmation'
          }
        ]"
      >
        <div class="issued-text">
          <span>{{ issuedByText }}</span>
          <span v-html="issuedBy" />
        </div>
        <div class="logo" v-if="issuerLogo.length > 0">
          <div v-for="(l, i) in issuerLogo" :key="i">
            <img :src="l.logo" alt="logo" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
    <div class="more-information">
      <div class="title">{{ moreInformationText }}</div>
      <div class="date-information">
        <div class="date-box issued-date">
          <div class="icon">
            <img
              src="https://whoalxppublicstorage.blob.core.windows.net/didactica/assets/images/awards/issued-on.svg"
              alt="issued on"
              loading="lazy"
            />
          </div>
          <div class="date">
            <span>{{ issuedOnText }}</span>
            <span>{{
              issuedOn !== "" ? formatDate(issuedOn) : "DD/MM/YYYY"
            }}</span>
          </div>
        </div>
        <div class="date-box expiring-date">
          <div class="icon">
            <img
              src="https://whoalxppublicstorage.blob.core.windows.net/didactica/assets/images/awards/expiring-on.svg"
              alt="expiration date"
              loading="lazy"
            />
          </div>
          <div class="date">
            <span>{{ expiringOn }}</span>
            <span>{{
              credential.expiration_date
                ? formatDate(credential.expiration_date)
                : "Does not expire"
            }}</span>
          </div>
        </div>
      </div>
      <div
        class="other-information"
        v-if="moreInformation && moreInformation.length > 0"
      >
        <Accordion :items="moreInformation" :singleOpen="false" />
      </div>
    </div>
    <div class="disclaimer">
      <div class="title">{{ disclaimerTitle }}</div>
      <div class="description">
        {{ disclaimer }}
      </div>
    </div>
  </div>
</template>

<script>
import { format } from "../../dateFormat";
import Accordion from "./Accordion.vue";
export default {
  components: {
    Accordion
  },
  props: {
    awardTitle: {
      type: String,
      required: true
    },
    courseTitle: {
      type: String,
      required: true
    },
    presentedTo: {
      type: String,
      default: "Presented to"
    },
    userName: { type: String, required: true },
    awardDescription: {
      type: String,
      default: "for the successful completion of the course"
    },
    issuedByText: {
      type: String,
      default: "Issued by"
    },
    moreInformationText: {
      type: String,
      default: "More Information"
    },
    issuedOnText: {
      type: String,
      default: "Issued On"
    },
    issuedOn: {
      type: String,
      default: ""
    },
    expiringOn: {
      type: String,
      default: "Expiring On"
    },
    disclaimerTitle: {
      type: String,
      default: "Disclaimer"
    },
    disclaimer: {
      type: String,
      default:
        "This award does not certify the learner as a trained health worker qualified to practice in this topic area. National and local certificates for qualification must be adhered to.  "
    },
    infoArr: {
      type: Array,
      required: true
    },
    award: {
      type: Object,
      required: true
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    awardType() {
      return this.award.content_type.slug;
    },
    credential() {
      return this.award.credential;
    },
    awardIcon() {
      let logo;
      if (this.awardType === "course_completion_award") {
        logo =
          "https://whoalxppublicstorage.blob.core.windows.net/didactica/assets/images/awards/award-of-completion.svg";
      } else if (this.awardType === "course_participation_confirmation") {
        logo =
          "https://whoalxppublicstorage.blob.core.windows.net/didactica/assets/images/awards/confirmation-of-participation.svg";
      }
      return logo;
    },
    issuedBy() {
      let text = "";
      if (this.awardType === "course_completion_award") {
        text = "WHO Academy";
      } else if (this.awardType === "course_participation_confirmation") {
        text = this.credential.issuers;
      }
      return text;
    },
    moreInformation() {
      let arr = [];
      this.infoArr.forEach((i) => {
        if (this.credential[i.key] !== "") {
          let obj = {
            title: i.title,
            content: this.credential[i.key]
          };
          arr.push(obj);
        }
      });
      return arr;
    },
    issuerLogo() {
      let logos = [];
      if (this.awardType === "course_participation_confirmation") {
        logos = this.credential.issuer_logos;
      } else {
        logos = [
          {
            logo: "https://whoalxppublicstorage.blob.core.windows.net/user-feedback/images/whoa-logo-black-en.svg"
          }
        ];
      }
      return logos;
    }
  },
  methods: {
    formatDate(date) {
      return format(date);
    }
  }
};
</script>
<style lang="scss" scoped>
.award__preview--wrapper {
  width: 100%;
  > .title {
    text-align: center;
    @include subtitle-large($brand-neutral-900);
    letter-spacing: 0.055px;
  }
  .award-information {
    margin-top: 28px;
    border-radius: 8px;
    background: linear-gradient(
      299deg,
      $brand-neutral-100 32.98%,
      $brand-neutral-0 84.25%
    );
    padding: 12px 16px 24px;
    @include flex-column-align-center;
    box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
    .award-icon {
      height: 72px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .award-title {
      @include title;
      color: $brand-primary;

      margin-top: 16px;
      &.award-title__who {
        background: linear-gradient(
          63deg,
          $brand-secondary1-400 27.16%,
          $brand-primary-400 71.03%
        );
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .presented-to {
      @include body-regular($font-weight: 400, $font-color: $brand-neutral-700);
      line-height: normal;
      letter-spacing: 0.5px;
      margin-top: 24px;
      text-transform: uppercase;
    }
    .user-name {
      @include title;
      color: $brand-neutral-900;
      font-weight: 400;
      margin-top: 8px;
    }
    .award-description {
      margin-top: 8px;
      @include body-regular($font-weight: 400, $font-color: $brand-neutral-700);
      max-width: 536px;
      text-align: center;
      span {
        font-weight: 700;
      }
    }
    .issued-by {
      padding-top: 24px;
      margin-top: 24px;
      border-top: 1px solid $brand-neutral-200;
      width: 100%;
      @include flex-horizontal-center;
      &.award-issued__by {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        .issued-text {
          align-items: center;
          gap: 8px;
        }
        .logo {
          display: flex;
          gap: 24px;
          margin-left: 0;
          img {
            width: 60px;
            height: 40px;
            object-fit: contain;
          }
        }
      }
      .issued-text {
        @include flex-column-align-right;
        span {
          &:first-child {
            @include label-medium($font-weight: 500);
            color: $brand-neutral-300;
          }
          &:last-child {
            @include body-medium;
            color: $brand-neutral-700;
          }
        }
      }
      .logo {
        margin-left: 24px;
      }
    }
  }
  .more-information {
    border-radius: 8px;
    background-color: $brand-neutral-0;
    box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
    padding: 16px 16px 24px;
    margin-top: 16px;
    .title {
      @include label-large($font-color: $brand-neutral-300, $font-weight: 500);
    }
    .date-information {
      margin-top: 24px;
      display: flex;
      padding-left: 8px;
      .date-box {
        display: flex;
        align-items: center;
        width: 50%;
        .date {
          margin-left: 8px;
          display: flex;
          flex-direction: column;
          span {
            &:first-child {
              @include label-large(
                $font-color: $brand-neutral-700,
                $font-weight: 500
              );
            }
            &:last-child {
              font-weight: 400;
            }
          }
        }
      }
    }
    .other-information {
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid $brand-neutral-200;
    }
  }
  .disclaimer {
    border-radius: 8px;
    background-color: $brand-neutral-0;
    box-shadow: 0px 1px 3px 1px rgba(33, 33, 33, 0.25);
    padding: 16px 16px 24px;
    margin-top: 16px;
    .title {
      @include label-large($font-color: $brand-neutral-900, $font-weight: 500);
    }
    .description {
      @include body-medium;
      color: $brand-neutral-500;
      margin-top: 8px;
    }
  }
}
</style>
