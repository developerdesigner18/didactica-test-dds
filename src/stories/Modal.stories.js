import LxpModal from "../components/Common/Modal.vue";
import LxpButton from "../components/Common/Button.vue";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Library/Modal",
  component: LxpModal,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    description: "Lxp Modal"
  }
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpModal, LxpButton },
  data: () => ({
    showModal: false
  }),
  methods: {
    openModal() {
      this.showModal = true;
    }
  },
  template: `
    <div>
      <LxpButton @click="openModal">Open Modal</LxpButton>
      <LxpModal :show.sync="showModal" v-bind="$props" >
        <div>Modal Body</div>
      </LxpModal>
    </div>
    `
});

const FooterTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpModal, LxpButton },
  data: () => ({
    showModal: false
  }),
  methods: {
    openModal() {
      this.showModal = true;
    }
  },
  template: `
    <div>
      <LxpButton @click="openModal">Open Modal</LxpButton>
      <LxpModal :show.sync="showModal" v-bind="$props">
          <div>Modal Body</div>
          <template #footer>
              <b-button variant="primary">Upload</b-button>
          </template>
      </LxpModal>
    </div>`
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  show: true,
  centered: true
};

export const HideHeaderAndFooter = Template.bind({});
HideHeaderAndFooter.args = {
  ...DefaultTemplate.args,
  hideHeader: true,
  hideFooter: true
};

export const UpdateFooterButton = Template.bind({});
UpdateFooterButton.args = {
  ...DefaultTemplate.args,
  saveTitle: "Upload",
  saveTitleVariant: "success",
  cancelTitle: "Dismiss",
  cancelVariant: "outline-danger"
};

export const FooterSlotTemplate = FooterTemplate.bind({});
FooterSlotTemplate.args = {
  ...DefaultTemplate.args
};
