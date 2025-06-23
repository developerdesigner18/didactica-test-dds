import LxpCheckbox from "../components/Common/Checkbox.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Checkbox",
  component: LxpCheckbox,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "success"],
      defaultValue: "primary"
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpCheckbox },
  template: '<LxpCheckbox v-bind="$props"></LxpCheckbox>'
});

export const Default = Template.bind({});
Default.args = {
  text: "Orange"
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  value: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};

export const CheckedDisabled = Template.bind({});
CheckedDisabled.args = {
  ...Disabled.args,
  value: true
};

export const Variant = Template.bind({});
Variant.args = {
  ...Default.args,
  variant: "success"
};

export const StackedCheckbox = Template.bind({});
StackedCheckbox.args = {
  name: "fruits",
  options: [
    { text: "Orange", value: "orange" },
    { text: "Apple", value: "apple" },
    { text: "Pineapple", value: "pineapple" },
    { text: "Grape", value: "grape" }
  ],
  value: []
};
