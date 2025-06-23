import LxpBreadcrumb from "../components/Common/Breadcrumb.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Breadcrumb",
  component: LxpBreadcrumb
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpBreadcrumb },
  template: '<LxpBreadcrumb v-bind="$props"></LxpBreadcrumb>'
});

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      text: "List",
      active: true
    },
    {
      text: "Courses"
    }
  ]
};
