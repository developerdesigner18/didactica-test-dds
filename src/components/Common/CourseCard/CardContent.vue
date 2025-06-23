<template>
  <div :class="['lxp-course-card__body']">
    <div class="lxp-course-card__content">
      <div
        class="lxp-course-card__sub-title"
        @click.stop="$emit('subTitleClick')"
        v-if="cardSubTitle"
      >
        {{ cardSubTitle }}
      </div>
      <div class="lxp-course-card__title">{{ cardTitle }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["cardSubTitle", "cardTitle"]
};
</script>
<style lang="scss">
.lxp-course-card__body {
  padding: 8px 16px;
  min-height: 85px;
  max-height: 97px;
  .lxp-course-card__content {
    max-height: 88px;
    min-height: 88px;
    text-align: left;
    .lxp-course-card__sub-title {
      @include label-large($font-color: $brand-neutral-300);
      margin-bottom: 0;
      margin-left: -4px;
      padding: 1.5px 4px;
      display: inline-flex;
      &:hover {
        background: $brand-neutral-50;
        border-radius: 8px;
      }
    }

    .lxp-course-card__title {
      @include body-regular($brand-neutral-900);
      @include line-clamp(3);
      white-space: normal;
    }
  }
}
</style>
