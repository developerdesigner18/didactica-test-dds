import PillBadges from "../components/Common/PillBadges.vue";

export default {
  title: "Library/PillBadges",
  component: PillBadges,
  argTypes: {
    item: { control: "object" }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PillBadges },
  template: '<PillBadges v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
  item: { name: "Example" }
};
