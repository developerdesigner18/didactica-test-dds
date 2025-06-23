import LxpCourseCard from "../components/Common/CourseCard.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/CourseCard",
  component: LxpCourseCard,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    description: "Lxp CourseCard",
    cardClick: { action: "clicked" }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpCourseCard },
  template:
    '<b-col cols="3"><LxpCourseCard v-bind="$props"></LxpCourseCard></b-col>'
});

const CourseCardWithFooterTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpCourseCard },
  template: `<LxpCourseCard v-bind="$props">
    <template #footer>
      <div class="d-flex justify-content-between">
        <p class="mb-0">Self Paced</p>
        <p class="mb-0">EN</p>
      </div>
    </template>
    </LxpCourseCard >`
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  cardSubTitle: "WHOA",
  cardTitle: "Main line text lorem ipsum dapibus, neque id cursus faucibus"
};

export const CourseCardWithFooter = CourseCardWithFooterTemplate.bind({});
CourseCardWithFooter.args = {
  ...DefaultTemplate.args
};

export const CourseCardWithTag = Template.bind({});
CourseCardWithTag.args = {
  ...DefaultTemplate.args,
  tagText: "New"
};

export const CourseCardWithValidImg = Template.bind({});
CourseCardWithValidImg.args = {
  ...DefaultTemplate.args,
  cardImage:
    "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:WHO-LXP+WHO001+Welcome_to_WHO_LXP+type@asset+block@WHO-Academy-FTD.001.jpeg"
};

export const CourseCardWithInvalidImg = Template.bind({});
CourseCardWithInvalidImg.args = {
  ...DefaultTemplate.args,
  cardImage:
    "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:WHOA+19+1617+type@asset+block@images_course_image.jpg",
  defaultImage:
    "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:WHOA+0000+0000+type@asset+block@lotus-flower.jpg"
};
