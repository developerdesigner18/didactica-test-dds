<template>
  <div class="resource-card__footer">
    <div class="resource-card__footer--div resource-card__language">
      <img
        src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/language.svg"
        alt="pacing"
        loading="lazy"
      />
      <p class="mb-0">{{ course.language }}</p>
    </div>
    <div class="resource-card__footer--div resource-card__pacing">
      <img
        :src="
          course.pacing === 'self'
            ? 'https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/self-paced.svg'
            : 'https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/pacing.svg'
        "
        alt="pacing"
        loading="lazy"
      />
      <p class="mb-0">{{ pacing(course) }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    course: {
      type: Object,
      required: false
    }
  },
  methods: {
    pacing(course) {
      return course.pacing === "self" ? "Self-paced" : "Instructor-led";
    }
  }
};
</script>
