<template>
  <div class="resource-empty__wrapper">
    <div class="text-center">
      <img
        src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/no-results-found.svg"
        alt="no result"
        width="auto"
        height="auto"
        loading="lazy"
      />
      <h6 class="mt-3 mb-1" v-if="filterSelected">
        Sorry, we couldn't find any courses that match your filtering criteria
      </h6>
      <div v-else>
        <h6 class="mt-3 mb-1">
          Unfortunately, the organization you are looking at does not currently
          offer any courses.
        </h6>
        <p v-if="edit">
          If you are part of this organization you can create your first course
          now.
        </p>
        <p v-else>
          Find the courses that best fit your needs by exploring our available
          options.
        </p>
      </div>
    </div>
    <div
      class="resource-empty__cta"
      :class="{ 'resource-empty__cta-filter': this.filterSelected }"
    >
      <LxpButton
        variant="outline-primary"
        block
        @click="$emit('click-empty-state-cta')"
        >{{ exploreAllBtnText }}</LxpButton
      >
    </div>
  </div>
</template>
<script>
import { LxpButton } from "@/components/Common/index.js";
export default {
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    filterSelected: {
      type: Boolean,
      default: false
    }
  },
  components: {
    LxpButton
  },
  computed: {
    exploreAllBtnText() {
      return this.edit ? "Create A Course" : "Explore All";
    }
  }
};
</script>
<style lang="scss" scoped>
.resource-empty__wrapper {
  height: 350px;
  width: 30%;
  @include center;
  .text-center {
    h6,
    p {
      @include body-regular;
    }
    h6 {
      font-weight: 500;
    }
  }
  .resource-empty__cta {
    width: 100%;
  }
  .resource-empty__cta-filter {
    margin-top: 2rem;
  }
}
@media screen and (max-width: 900px) {
  .resource-empty__wrapper {
    height: auto !important;
    width: 100% !important;
  }
}
</style>
