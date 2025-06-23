import LxpDropdown from "../components/Common/Dropdown.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Dropdown",
  component: LxpDropdown,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    description: "Lxp Dropdown"
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpDropdown },
  template: '<LxpDropdown v-bind="$props"></LxpDropdown>'
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  label: "Select value",
  placeholder: "Placeholder text",
  dropdownArr: [
    "Apple",
    "Orange",
    "Grapes",
    "Lemon",
    "Banana",
    "Berry",
    "Watermelon"
  ],
  isFloating: true,
  supportText: "Supporting Text"
};

export const PrependAppendTemplate = Template.bind({});
PrependAppendTemplate.args = {
  ...DefaultTemplate.args,
  prepend: true,
  append: true
};

export const DisabledTemplate = Template.bind({});
DisabledTemplate.args = {
  ...DefaultTemplate.args,
  disabled: true
};
