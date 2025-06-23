import LxpDragDrop from "../components/Common/DragDrop.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/DragDrop",
  component: LxpDragDrop,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    description: "Lxp Drag Drop"
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpDragDrop },
  template: '<LxpDragDrop v-bind="$props"></LxpDragDrop>'
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  accept: ["jpeg", "jpg"]
};

export const ValidateFileSize = Template.bind({});
ValidateFileSize.args = {
  fileSize: 2097152
};

export const ValidateFileDimension = Template.bind({});
ValidateFileDimension.args = {
  validateFileDimension: true,
  widthDimension: 1000,
  heightDimension: 1000
};

export const UpdateIcon = Template.bind({});
UpdateIcon.args = {
  dropIcon:
    "https://files.lxp.academy.who.int/didactica/assets/images/course-card/course-illustration.svg",
  noteText: "New note text",
  errorIcon:
    "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/remove.svg"
};

export const UpdateEditButtonText = Template.bind({});
UpdateIcon.args = {
  removeText: "Delete",
  uploadNewText: "New Upload",
  editCoverText: "Edit"
};
