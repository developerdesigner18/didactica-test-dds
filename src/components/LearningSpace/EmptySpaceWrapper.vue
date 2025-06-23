<template>
  <div class="lxp-empty__wrapper">
    <div>
      <img
        src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/empty-space.svg"
        alt="no result"
        width="auto"
        height="auto"
        loading="lazy"
      />
      <h6 class="mt-3 mb-1">We are still working on this!</h6>
      <p>
        It looks like the organization you tried to enter isn't in our system
        yet.
      </p>
    </div>
    <div class="space-empty__cta">
      <LxpButton
        variant="outline-primary"
        block
        @click="$emit('click-empty-space-cta')"
      >
        Keep exploring
      </LxpButton>
    </div>
  </div>
</template>

<script>
import { LxpButton } from "@/components/Common/index.js";
export default {
  components: {
    LxpButton
  }
};
</script>

<style lang="scss" scoped>
.lxp-empty__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 24px 16px;
  gap: 24px;
  align-self: stretch;
  .space-empty__cta {
    width: 30%;
  }
}
@media screen and (max-width: 900px) {
  .lxp-empty__wrapper {
    .space-empty__cta {
      width: 70%;
    }
  }
}
</style>
