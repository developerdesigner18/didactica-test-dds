import Loader from "../components/Common/Loader.vue";

export default {
  title: "Library/Loader",
  component: Loader,
  argTypes: {
    description: "Lxp Loader"
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Loader },
  template: '<Loader v-bind="$props"></Loader>'
});

export const DefaultTemplate = Template.bind({});

export const CustomLoaderClass = Template.bind({});
CustomLoaderClass.args = {
  loaderClass: "bg-secondary"
};
