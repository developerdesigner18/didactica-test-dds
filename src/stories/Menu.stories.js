import LxpMenu from "../components/Common/Menu.vue";

export default {
  title: "Library/Menu",
  component: LxpMenu
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpMenu },
  template: '<LxpMenu v-bind="$props"></LxpMenu>'
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  text: "Menu",
  noCaret: false,
  prepend: true,
  items: [
    {
      label: "List",
      active: false
    },
    {
      label: "Courses",
      active: true
    },
    {
      label: "Initiatives",
      active: false
    },
    {
      label: "Events",
      active: false
    },
    {
      label: "Resources",
      active: false
    },
    {
      label: "One",
      active: false
    },
    {
      label: "Two",
      active: false
    },
    {
      label: "Three",
      active: false
    },
    {
      label: "Four",
      active: false
    },
    {
      label: "Five",
      active: false
    },
    {
      label: "Six",
      active: false
    },
    {
      label: "Seven",
      active: false
    },
    {
      label: "Eight",
      active: false
    },
    {
      label: "Nine",
      active: false
    }
  ]
};
