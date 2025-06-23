import FormTags from "../components/Common/FormTags.vue";

export default {
  title: "Library/FormTags",
  component: FormTags
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FormTags },
  template: '<FormTags v-bind="$props"></FormTags>'
});

export const Default = Template.bind({});
Default.args = {
  value: [],
  options: [{ name: "Option 1" }, { name: "Option 2" }, { name: "Option 3" }],
  limit: 3
};
