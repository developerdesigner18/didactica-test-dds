import LxpButton from "../components/Common/Button.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Button",
  component: LxpButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    description: "Lxp Button",
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "outline-primary",
        "accent",
        "outline-accent",
        "success",
        "outline-success",
        "grey",
        "warning",
        "outline-warning",
        "link",
        "danger",
        "outline-danger",
        "link-danger",
        "secondary1",
        "outline-secondary1",
        "link-secondary1"
      ],
      defaultValue: "primary"
    },
    size: {
      control: { type: "select" },
      options: ["sm", "lg", "default"],
      defaultValue: "sm"
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpButton },
  template: '<LxpButton v-bind="$props">Button</LxpButton>'
});

const RoundBtnTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpButton },
  template: '<LxpButton v-bind="$props">+</LxpButton>'
});

const ButtonWithSlotsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpButton },
  template:
    '<LxpButton v-bind="$props"><div><b-icon icon="exclamation-triangle"></b-icon> Button</div></LxpButton>'
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  size: "default"
};

export const Large = Template.bind({});
Large.args = {
  size: "lg"
};

export const Small = Template.bind({});
Small.args = {
  size: "sm"
};

export const Block = Template.bind({});
Block.args = {
  block: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true
};

export const Elevated = Template.bind({});
Elevated.args = {
  elevate: true
};

export const Round = RoundBtnTemplate.bind({});
Round.args = {
  round: true
};

export const ButtonWithSlots = ButtonWithSlotsTemplate.bind({});
ButtonWithSlots.args = {
  ...Primary.args
};
