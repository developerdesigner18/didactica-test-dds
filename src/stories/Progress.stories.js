import LxpProgress from "../components/Common/Progress.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Progress",
  component: LxpProgress,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    description: "Lxp Progress",
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "success",
        "grey",
        "warning",
        "danger",
        "secondary1"
      ],
      defaultValue: "primary"
    },
    size: {
      control: { type: "select" },
      options: ["small", "large"],
      defaultValue: "small"
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpProgress },
  template: '<LxpProgress v-bind="$props"></LxpProgress>'
});

export const Default = Template.bind({});
Default.args = {
  value: 33,
  max: 100
};

export const Large = Template.bind({});
Large.args = {
  ...Default.args,
  size: "large"
};

export const Animated = Template.bind({});
Animated.args = {
  ...Default.args,
  animated: true,
  size: "large"
};

export const ShowProgress = Template.bind({});
ShowProgress.args = {
  ...Default.args,
  size: "large",
  showProgress: true
};
