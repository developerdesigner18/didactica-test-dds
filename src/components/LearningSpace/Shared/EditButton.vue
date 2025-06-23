<template>
  <lxp-button @click="$emit('click')" className="ls-edit__btn">
    <div class="ls-edit__btn--div">
      <img
        src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/edit.svg"
        alt="edit"
        loading="lazy"
      />Edit
    </div>
  </lxp-button>
</template>

<script>
import LxpButton from "@/components/Common/Button.vue";
export default {
  components: {
    LxpButton
  }
};
</script>

<style lang="scss">
$btn-px: 8px;
// place to add common styles
.btn.lxp-button {
  &.ls-edit__btn {
    @include body-medium;
    color: $brand-primary-50;
    padding: $btn-px !important;
    border-radius: $btn-px;
    .ls-edit__btn--div {
      @include horizontal-space-between;
      img {
        margin-right: $btn-px;
      }
    }
  }
}
</style>
