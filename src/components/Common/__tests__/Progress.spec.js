import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import LxpProgress from "../Progress.vue";
import { BProgress } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-progress", LxpProgress);
localVue.component("b-progress", BProgress);

describe("Progress.vue", () => {
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

    it("should update progress variant based on value", async () => {
      wrapper = await getWrapper();

      const progressVariant = wrapper.find(".bg-primary");
      expect(progressVariant.exists()).toBe(true);

      await wrapper.setProps({
        value: 100
      });
      await waitRAF();

      const progressSuccess = wrapper.find(".bg-success");
      expect(progressSuccess.exists()).toBe(true);
    });

    it("should show error state when `hasError` is set to be true ", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        hasError: true
      });
      await waitRAF();

      const progressVariant = wrapper.find(".bg-danger");
      expect(progressVariant.exists()).toBe(true);

      const errorText = wrapper.find(".lxp-progress__value");
      expect(errorText.text()).toEqual("Error");
    });

    it("should animate when `animated` is true", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        animated: true,
        stripped: true
      });
      await waitRAF();

      const progressBarAnimated = wrapper.find(".progress-bar-animated");
      expect(progressBarAnimated.exists()).toBe(true);

      const progressBarStriped = wrapper.find(".progress-bar-striped");
      expect(progressBarStriped.exists()).toBe(true);
    });
  });
});

function getWrapper() {
  return mount(LxpProgress, {
    propsData: {
      value: 50,
      max: 100
    },
    localVue
  });
}
