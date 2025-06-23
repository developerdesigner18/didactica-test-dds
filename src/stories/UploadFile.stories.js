import UploadFile from "../components/Common/UploadFile.vue";

export default {
  title: "Library/UploadFile",
  component: UploadFile,
  argTypes: {
    description: "Lxp Upload File"
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UploadFile },
  template: '<UploadFile v-bind="$props"></UploadFile>'
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
