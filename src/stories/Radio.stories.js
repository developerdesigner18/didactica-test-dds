import LxpRadio from "../components/Common/Radio.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Radio",
  component: LxpRadio,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary1"],
      defaultValue: "primary"
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpRadio },
  template: '<LxpRadio v-bind="$props"></LxpRadio>'
});

export const Default = Template.bind({});
Default.args = {
  text: "Orange",
  options: [
    { text: "Orange", value: "orange" },
    { text: "Apple", value: "apple" },
    { text: "Pineapple", value: "pineapple" },
    { text: "Grape", value: "grape" }
  ]
};

export const Checked = Template.bind({});
Checked.args = {
  ...Default.args,
  selectedVal: "pineapple"
};

export const Disabled = Template.bind({});
Disabled.args = {
  options: [
    { text: "Orange", value: "orange", disabled: true },
    { text: "Apple", value: "apple", disabled: true }
  ]
};

export const CheckedDisabled = Template.bind({});
CheckedDisabled.args = {
  ...Disabled.args,
  selectedVal: "orange"
};

export const Variant = Template.bind({});
Variant.args = {
  ...Default.args,
  variant: "secondary1"
};

export const SingleRadio = Template.bind({});
SingleRadio.args = {
  name: "Single",
  value: "single",
  id: "single-radio"
};

export const DisabledSingleRadio = Template.bind({});
DisabledSingleRadio.args = {
  name: "Single",
  value: "single",
  id: "disabled-single-radio",
  disabled: true
};

export const DisabledCheckedSingleRadio = Template.bind({});
DisabledCheckedSingleRadio.args = {
  ...DisabledSingleRadio.args,
  selectedVal: "single"
};
