import LxpDatePicker from "../components/Common/DatePicker.vue";
import { toDate } from "../dateFormat";
export default {
  title: "Library/DatePicker",
  component: { LxpDatePicker },
  argTypes: {
    buttonVariant: {
      control: "text",
      defaultValue: "outline rounded-circle"
    },
    min: {
      control: "date"
    },
    max: {
      control: "date"
    }
  }
};

const Template = (args, { argTypes }) => ({
  components: { LxpDatePicker },
  props: Object.keys(argTypes),
  template: '<LxpDatePicker v-bind="$props" />'
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  title: "Pick a Date",
  placeholder: "",
  min: toDate("1920-01-01"),
  max: toDate("2023-12-31")
};
export const MinMaxDates = Template.bind({});
MinMaxDates.args = {
  ...DefaultTemplate.args,
  min: toDate("2000-01-01"),
  max: toDate("2000-01-15")
};
export const DisabledDates = Template.bind({});
DisabledDates.args = {
  title: "Disabled",
  disabled: true
};
