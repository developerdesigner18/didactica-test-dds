import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import LxpInput from "../Input.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-input", LxpInput);

describe("Input.vue", () => {
  it("render when created ", async () => {
    let wrapper = await getWrapper();
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
    wrapper.destroy();
  });
  describe("Props", () => {
    let wrapper;

    afterEach(() => {
      wrapper.destroy();
    });

    it("should show text limit and supporting text", async () => {
      wrapper = await getWrapper();
      await wrapper.setData({ text: "Hello" });
      await wrapper.setProps({
        maxlength: 100,
        showLimit: true,
        supportText: "A supporting text"
      });
      await waitRAF();

      const inputLimit = wrapper.find(".lxp-input__footer--limit");
      expect(inputLimit.exists()).toBe(true);

      const inputSupportText = wrapper.find(".lxp-input__footer--support-text");
      expect(inputSupportText.text()).toEqual("A supporting text");
    });

    it("should show border when `hasError` is set to be true ", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        hasError: true
      });
      await waitRAF();
      const inputLimit = wrapper.find(".lxp-input__error");
      expect(inputLimit.exists()).toBe(true);
    });
  });
});

function getWrapper() {
  return mount(LxpInput, {
    propsData: {
      label: "Input label",
      placeholder: "Placeholder"
    },
    localVue
  });
}
