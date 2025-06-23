import FilterSelection from "../components/Common/FilterSelection.vue";

export default {
  title: "Library/FilterSelection",
  component: FilterSelection,
  argTypes: {
    filterOptions: { control: "array" },
    selectedTagId: { control: "number" },
    filterResourcesListURL: { control: "text" }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FilterSelection },
  template: '<FilterSelection v-bind="$props" />'
});

export const Default = Template.bind({});
Default.args = {
  filterOptions: [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" }
  ],
  selectedTagId: 1,
  filterResourcesListURL: "https://example.com/resources"
};
