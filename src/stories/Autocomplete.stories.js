import LxpAutocomplete from "../components/Common/Autocomplete.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Autocomplete",
  component: LxpAutocomplete
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpAutocomplete },
  template: '<lxp-autocomplete v-bind="$props"></lxp-autocomplete>'
});

export const Default = Template.bind({});
Default.args = {
  placeholder: "Search here...",
  prepend: true,
  append: true,
  items: [
    {
      title: "item 1",
      id: 1
    },
    {
      title: "item 2",
      id: 2
    },
    {
      title:
        "item 3 Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Text",
      id: 3
    },
    {
      title: "item 4",
      id: 4
    },
    {
      title: "item 5",
      id: 5
    },
    {
      title:
        "item 6 Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Long Text",
      id: 6
    },
    {
      title: "item 7",
      id: 7
    }
  ]
};
