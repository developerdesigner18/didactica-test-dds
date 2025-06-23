<template>
  <div v-if="!hasError" class="ls-footer">
    <div class="ls-footer__div">
      <div
        :class="[
          'ls-footer__social',
          { 'ls-footer__social--disabled': s.url === null || s.url === '' }
        ]"
        v-for="s in networks"
        :key="s.id"
        @click="openLink(s)"
        tabindex="0"
        @keydown.enter="openLink(s)"
      >
        <img :src="s.path" alt="icon" loading="lazy" />

        <p v-if="s.name === 'official_website'">{{ s.title }}</p>
      </div>
      <edit-button v-if="edit" @click="showSocialModal = true"></edit-button>
    </div>

    <div
      class="ls-footer__terms"
      v-if="
        !edit &&
        spaceObj &&
        spaceObj.about &&
        spaceObj.about.terms_and_conditions
      "
    >
      <a target="blank" :href="spaceObj.about.terms_and_conditions"
        >Terms of Use and Conditions</a
      >
    </div>
    <social-network-modal
      :networks="socialNetworks"
      :show.sync="showSocialModal"
      @social-networks-updated="onUpdate"
    />

    <div
      class="ls-footer__terms-mobile"
      v-if="
        !edit &&
        spaceObj &&
        spaceObj.about &&
        spaceObj.about.terms_and_conditions
      "
    >
      <a target="blank" :href="spaceObj.about.terms_and_conditions"
        >Terms of Use and Conditions</a
      >
    </div>
  </div>
</template>
<script>
import EditButton from "../Shared/EditButton.vue";
import SocialNetworkModal from "./Modals/SocialNetworkModal.vue";
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
  components: {
    EditButton,
    SocialNetworkModal
  },
  data() {
    return {
      showSocialModal: false,
      socialNetworks: [
        {
          path: "https://files.lxp.academy.who.int/didactica/assets/images/learning-space/footer/link.svg",
          title: "Official website",
          url: "",
          name: "official_website",
          order: ""
        },
        {
          path: "https://files.lxp.academy.who.int/didactica/assets/images/learning-space/footer/facebook.svg",
          title: "Facebook",
          url: "",
          name: "facebook",
          order: ""
        },
        {
          path: "https://files.lxp.academy.who.int/didactica/assets/images/learning-space/footer/instagram.svg",
          title: "Instagram",
          url: "",
          name: "instagram",
          order: ""
        },
        {
          path: "https://files.lxp.academy.who.int/didactica/assets/images/learning-space/footer/twitter.svg",
          title: "Twitter",
          url: "",
          name: "twitter",
          order: ""
        },
        {
          path: "https://files.lxp.academy.who.int/didactica/assets/images/learning-space/footer/youtube.svg",
          title: "Youtube/vimeo",
          url: "",
          name: "youtube_vimeo",
          order: ""
        }
      ]
    };
  },
  computed: {
    networks() {
      if (this.edit) {
        return this.socialNetworks;
      } else {
        return this.socialNetworks.filter((s) => s.url !== "" && s.url);
      }
    }
  },
  created() {
    this.init(this.spaceObj.social_networks);
  },
  methods: {
    openLink(s) {
      if (s.url) {
        this.$emit("open-social-link", s);
        window.open(s.url, "_blank");
      }
    },
    init(arr) {
      if (Array.isArray(arr)) {
        arr.forEach((s) => {
          let index = this.socialNetworks.findIndex((sn) => sn.name === s.name);
          if (s.label !== null && s.label !== "") {
            this.socialNetworks[index].title = s.label;
          }
          this.socialNetworks[index].url = s.url;
          this.socialNetworks[index].order = s.order;
        });
        this.socialNetworks = this.socialNetworks.sort(
          (a, b) => a.order - b.order
        );
      }
    },
    onUpdate(data) {
      this.init(data);
      this.$emit("update-links", data);
    }
  }
};
</script>
<style lang="scss" scoped>
.ls-footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 0 14px;
  margin: 0 16px;
  border-top: 1px solid $brand-neutral-75;
  .ls-footer__div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-grow: 1;
    .ls-footer__social {
      @include flex-horizontal-center;
      margin-right: 5%;
      cursor: pointer;
      &.ls-footer__social--disabled {
        cursor: not-allowed;
      }
      p {
        @include label-large;
        margin: 0 0 0 10px;
      }
    }
  }
  .ls-footer__terms {
    position: relative;
    float: right;
    a {
      text-decoration: none;
      color: $brand-primary;
      &:hover {
        color: $brand-primary-600;
      }
      &:active {
        color: $brand-primary;
      }
    }
  }

  .ls-footer__terms-mobile {
    display: block;
    a {
      text-decoration: none;
      color: $brand-primary;
      &:hover {
        color: $brand-primary-600;
      }
      &:active {
        color: $brand-primary;
      }
    }
    display: none !important;
  }
}

@media screen and (max-width: 768px) {
  .ls-footer__terms {
    display: none;
  }
  .ls-footer__terms-mobile {
    display: block !important;
  }
}

[dir="rtl"] {
  .ls-footer {
    .ls-footer__div {
      .ls-footer__social {
        &:first-child {
          margin-right: 0;
        }
        p {
          margin: 0 10px 0 0;
        }
      }
    }
  }
}
</style>
