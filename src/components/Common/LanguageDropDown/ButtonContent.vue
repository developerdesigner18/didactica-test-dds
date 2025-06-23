<template>
  <div>
    <div class="lx-dropdown__btn-text" v-if="variant === 'default'">
      <span class="lx-dropdown__text-left">{{ text }}</span>
      <span class="lx-dropdown__text-right">
        <span v-if="selected && selected.value">{{ selected.value }}</span>
        <img
          src="https://files.lxp.academy.who.int/learning-experience-platform/shared/arrow-grey.svg"
          alt="arrow"
          class="lx-dropdown__icon"
        />
      </span>
    </div>
    <div
      class="lx-dropdown__btn-text lxp-dropdown__menu-text"
      v-else-if="variant === 'menu'"
    >
      <img
        src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/language.svg"
        alt="language"
        loading="lazy"
      />
      <span v-if="selected && selected.value">{{ selected.value }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    text: String,
    selected: Object,
    variant: {
      type: String,
      default: "default"
    }
  }
};
</script>
<style lang="scss" scoped>
.lx-dropdown__btn-text {
  display: flex;
  align-items: center;
  color: #44464e;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  &:active {
    background: #fff !important;
    color: $brand-primary !important;
  }
  .lx-dropdown__text-right {
    display: flex;
    align-items: center;
    margin-left: 10px;
    text-transform: uppercase;
    color: #0057e0;
    .lx-dropdown__icon {
      margin-left: 5px;
      width: 20px;
      transform: rotate(180deg);
    }
  }

  &:hover {
    color: #0057e0;
    .lx-dropdown__text-right {
      .lx-dropdown__icon {
        filter: brightness(0) saturate(100%) invert(21%) sepia(89%)
          saturate(748%) hue-rotate(199deg) brightness(94%) contrast(101%);
      }
    }
  }
}
.lxp-dropdown__menu-text {
  padding: 3px 5px;
  span {
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: 0.5px;
    color: $brand-neutral-400;
    text-transform: uppercase;
    margin-left: 5px;
  }
  &:hover {
    background: #ebf2fd;
    border-radius: 4px;
  }
}

/* rtl layout */
[dir="rtl"] {
  .lx-dropdown__btn-text {
    .lx-dropdown__text-right {
      margin-left: 0;
      margin-right: 10px;
      .lx-dropdown__icon {
        margin-left: 0px;
        margin-right: 5px;
      }
    }
  }
}
</style>
