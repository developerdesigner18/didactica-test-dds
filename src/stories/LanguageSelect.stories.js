import LanguageSelect from "../components/Common/LanguageSelect.vue";

export default {
  title: "Library/LanguageSelect",
  component: LanguageSelect,
  props: {
    selected: Object,
    showMenu: { type: Boolean, default: false },
    allLanguage: {
      type: Array
    },
    language: {
      type: String,
      default: ""
    }
  },
  argTypes: {
    selected: { control: "object" },
    showMenu: { control: "boolean" }
  },
  parentClass: {
    type: String,
    default: ""
  }
};

const Template = (args) => ({
  components: { LanguageSelect },
  setup() {
    return { args };
  },
  template: '<LanguageSelect v-bind="args" />'
});

export const UserLayout = Template.bind({});
UserLayout.args = {
  selected: { id: "fr", text: "French", displayName: "French" },
  allLanguage: [
    { id: "en", group: "un", displayName: "English", text: "English" },
    { id: "fr", group: "un", displayName: "French", text: "French" },
    { id: "es", group: "un", displayName: "Spanish", text: "Spanish" },
    { id: "de", group: "other", displayName: "German", text: "German" },
    { id: "it", group: "other", displayName: "Italian", text: "Italian" }
  ],
  language: "fr",
  parentClass: "user-layout"
};

export const LandingFilter = Template.bind({});
LandingFilter.args = {
  selected: { id: "es", text: "Spanish", displayName: "Spanish" },
  allLanguage: [
    { id: "en", group: "un", displayName: "English", text: "English" },
    { id: "fr", group: "un", displayName: "French", text: "French" },
    { id: "es", group: "un", displayName: "Spanish", text: "Spanish" },
    { id: "de", group: "other", displayName: "German", text: "German" },
    { id: "it", group: "other", displayName: "Italian", text: "Italian" }
  ],
  language: "es",
  parentClass: "landing"
};
