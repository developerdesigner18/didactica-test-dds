import LxpTextarea from "../components/Common/Textarea.vue";

export default {
  title: "Library/Textarea",
  component: LxpTextarea,
  argTypes: {
    description: "Lxp Textarea"
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpTextarea },
  template: '<LxpTextarea v-bind="$props"></LxpTextarea>'
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  label: "Textarea label",
  placeholder: "Main line text lorem ipsum dapibus, neque id cursus faucibus",
  supportText: "Supporting Text",
  limit: 100
};

export const ErrorTemplate = Template.bind({});
ErrorTemplate.args = {
  ...DefaultTemplate.args,
  hasError: true
};

export const DisabledTemplate = Template.bind({});
DisabledTemplate.args = {
  ...DefaultTemplate.args,
  disabled: true
};
