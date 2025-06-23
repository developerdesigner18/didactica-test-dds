import LxpToggle from "../components/Common/ToggleSwitch.vue";

export default {
  title: "Library/ToggleSwitch",
  component: LxpToggle
};

const Template = (args) => ({
  components: { LxpToggle },
  setup() {
    return { args };
  },
  template: '<LxpToggle v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
  toggleState: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};
