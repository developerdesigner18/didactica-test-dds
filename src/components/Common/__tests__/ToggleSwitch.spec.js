import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import LxpToggleSwitch from "../ToggleSwitch.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-toggle-switch", LxpToggleSwitch);

describe("ToggleSwitch.vue", () => {
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
    it("should update based on `toggleState`", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        toggleState: true
      });
      await waitRAF();
      const toggleCheckbox = wrapper.find("#switch");
      expect(toggleCheckbox.element.value).toBeTruthy();
    });
    it("should update based on `disabled` prop", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        disabled: true
      });
      await waitRAF();
      const imgPath = wrapper.find(".lxp-toggle__disabled");
      expect(imgPath.exists()).toBe(true);
    });
  });
});

function getWrapper() {
  let wrapper = mount(LxpToggleSwitch, {
    propsData: {
      toggleState: false
    },
    localVue
  });

  return wrapper;
}
