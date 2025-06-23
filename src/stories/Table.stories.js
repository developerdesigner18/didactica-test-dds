import LxpTable from "../components/Common/Table.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Table",
  component: LxpTable,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "danger", "secondary1"],
      defaultValue: "primary"
    }
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpTable },
  template: '<LxpTable v-bind="$props"></LxpTable>'
});

const PaginationTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpTable },
  template: `<LxpTable v-bind="$props">
    <template slot="footerContent">12 results</template>
    </LxpTable>`
});

export const Default = Template.bind({});
Default.args = {
  tableData: [
    { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
    { age: 21, first_name: "Larsen", last_name: "Shaw" },
    { age: 89, first_name: "Geneva", last_name: `<b>Wilson</b>` }
  ],
  tableHeader: [
    {
      key: "age",
      name: "Age",
      sortable: true
    },
    {
      key: "first_name",
      name: "First Name",
      thStyle: `width: 25%`,
      sortable: false
    },
    {
      key: "last_name",
      name: `Last name`,
      tdStyle: "text-align:left",
      sortable: true
    }
  ]
};

export const Selectable = Template.bind({});
Selectable.args = {
  ...Default.args,
  selectable: true
};

export const Pagination = PaginationTemplate.bind({});
Pagination.args = {
  ...Default.args,
  hasPagination: true
};

export const Variant = PaginationTemplate.bind({});
Variant.args = {
  ...Pagination.args,
  variant: "success"
};
