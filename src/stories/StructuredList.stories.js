import StructuredList from "../components/Common/StructuredList.vue";

export default {
  title: "Library/StructuredList",
  component: StructuredList
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StructuredList },
  template: '<StructuredList v-bind="$props"></StructuredList>'
});

const SlotsTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { StructuredList },
  template: `<StructuredList v-bind="$props">
  <template slot="item" slot-scope="{ item }">
    <div>
      <span class="lxp-sl__list--item__handler">{{ item.name }}</span>
    </div>
  </template>
  </StructuredList > `
});

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      name: "vue.draggable",
      order: 1,
      fixed: false
    },
    {
      name: "draggable",
      order: 2,
      fixed: false
    },
    {
      name: "component",
      order: 3,
      fixed: false
    },
    {
      name: "for",
      order: 4,
      fixed: false
    }
  ]
};

export const SlotsDefault = SlotsTemplate.bind({});
SlotsDefault.args = {
  ...Default.args
};
