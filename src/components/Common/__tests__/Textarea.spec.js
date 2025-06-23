import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import LxpTextarea from "../Textarea.vue";
import { BFormTextarea } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-textarea", LxpTextarea);
localVue.component("b-form-textarea", BFormTextarea);

describe("Textarea.vue", () => {
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
      await wrapper.setProps({
        limit: 100,
        supportText: "A supporting text"
      });
      await waitRAF();

      const textareaLimit = wrapper.find(".lxp-input__footer--limit");
      expect(textareaLimit.exists()).toBe(true);

      const textareaSupportText = wrapper.find(
        ".lxp-input__footer--support-text"
      );
      expect(textareaSupportText.text()).toEqual("A supporting text");
    });

    it("should show border when `hasError` is set to be true ", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        hasError: true
      });
      await waitRAF();
      const textareaLimit = wrapper.find(".lxp-textarea__error");
      expect(textareaLimit.exists()).toBe(true);
    });
  });
});

function getWrapper() {
  return mount(LxpTextarea, {
    propsData: {
      label: "Textarea label",
      placeholder: "Placeholder"
    },
    localVue
  });
}
