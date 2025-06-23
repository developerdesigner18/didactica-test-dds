import Pagination from "../components/Common/Pagination.vue";

export default {
  title: "Library/Pagination",
  component: Pagination,
  argTypes: {
    description: "Lxp Pagination"
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Pagination },
  template: '<Pagination v-bind="$props"></Pagination>'
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  rows: 100,
  currentPage: 5
};
