import { waitRAF } from "@/../tests/utils.js";
import { createLocalVue, mount } from "@vue/test-utils";
import LxpTextEditor from "../TextEditor.vue";

const localVue = createLocalVue();

describe("TextEditor.vue", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = await getWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders when created", async () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  describe("Props", () => {
    it("renders when created", async () => {
      const wrapper = mount(LxpTextEditor);
      expect(wrapper.exists()).toBeTruthy();
      expect(wrapper.element).toMatchSnapshot();
      wrapper.destroy();
    });
    it("should update id based on prop", async () => {
      await wrapper.setProps({ id: "new" });
      await waitRAF();
      expect(wrapper.find("#new").exists()).toBe(true);
    });

    it("should display support text when provided", async () => {
      const text = "Support text here";
      await wrapper.setData({ cSupportText: text });
      await waitRAF();
      expect(wrapper.find(".lxp-editor__footer--support-text").text()).toBe(
        text
      );
    });
  });
});

function getWrapper() {
  return mount(LxpTextEditor, {
    propsData: {
      value: "Initial content",
      placeholder: "Type something in here!",
      limit: 100,
      hasError: false,
      supportText: "Support text here"
    },
    localVue
  });
}
