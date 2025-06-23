import LxpAlert from "../components/Common/Alert.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Alert",
  component: LxpAlert,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "secondary1"],
      defaultValue: "primary"
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpAlert },
  template: `<LxpAlert v-bind="$props">
    <div>Alert</div>
    </LxpAlert>`
});

export const Default = Template.bind({});
Default.args = {
  title: "Welcome aboard",
  subTitle: "Secondary line text lorem ipsum dapibus, neque id cur",
  imgPath:
    "https://files.lxp.academy.who.int/didactica/assets/images/course-card/course-illustration.svg"
};
