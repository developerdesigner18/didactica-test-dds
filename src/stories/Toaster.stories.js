import LxpToaster from "../components/Common/Toaster.vue";
import LxpButton from "../components/Common/Button.vue";

export default {
  title: "Library/Toaster",
  component: LxpToaster,
  argTypes: {
    description: "Lxp Toaster",
    variant: {
      control: {
        type: "select",
        options: ["primary", "warning", "success", "error"]
      }
    },
    timeout: {
      control: {
        type: "number"
      }
    }
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LxpToaster, LxpButton },
  data: () => ({
    showToast: false
  }),
  methods: {
    toastShow() {
      this.showToast = true;
    }
  },
  template: `
    <div>
      <LxpToaster :show.sync="showToast" v-bind="$props" />
      <LxpButton @click="toastShow">Show Toast</LxpButton>
    </div>
    `
});

export const DefaultTemplate = Template.bind({});
DefaultTemplate.args = {
  show: true,
  variant: "primary",
  message: "Secondary line text lorem ipsum dapi bus, neque id cursu",
  title: "Toast Message",
  buttonText: "In-text Button",
  showButton: true
};
