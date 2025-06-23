import LxpInput from "../components/Common/Input.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Input",
  component: LxpInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    description: "Lxp Input"
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpInput },
  template: '<LxpInput v-bind="$props"></LxpInput>'
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  id: "input",
  label: "Input label",
  placeholder: "Main line text lorem ipsum dapibus, neque id cursus faucibus",
  supportText: "Supporting Text",
  maxlength: 100,
  showLimit: true
};

export const PrependAppendTemplate = Template.bind({});
PrependAppendTemplate.args = {
  ...DefaultTemplate.args,
  append: `<img src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/email.svg" alt="mail" ></img>`,
  prepend: `<img src="https://files.lxp.academy.who.int/didactica/assets/images/learning-space/main/expand.svg" alt="down-arrow"></img>`
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

export const InputWithoutFloating = Template.bind({});
InputWithoutFloating.args = {
  isFloating: false
};
