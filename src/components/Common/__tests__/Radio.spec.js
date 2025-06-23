import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import { BFormRadio, BFormRadioGroup } from "bootstrap-vue";
import LxpRadio from "../Radio.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-radio", LxpRadio);
localVue.component("b-form-radio", BFormRadio);
localVue.component("b-form-radio-group", BFormRadioGroup);

describe("Radio.vue", () => {
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
    it("should update the radio text based on prop", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ text: "Mango" });
      await waitRAF();
      const checkboxText = wrapper.find(".custom-control-label");
      expect(checkboxText.text()).toBe("Mango");
    });

    it("should update styles based on the variant", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ variant: "secondary1" });
      await waitRAF();
      const disabledRadio = wrapper.find(".lxp-radio__secondary1");
      expect(disabledRadio.exists()).toBe(true);
    });

    it("should update the radio to disabled", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ disabled: true });
      await waitRAF();
      const disabledRadio = wrapper.find(".lxp-radio--disabled");
      expect(disabledRadio.exists()).toBe(true);
    });

    it("should preselect the value to true", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        selectedVal: "orange"
      });
      await waitRAF();
      const radioInput = wrapper.find(".custom-control-input");
      expect(radioInput.element.checked).toBeTruthy();
    });

    it("should show the list of radio buttons", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        options: [
          { text: "Orange", value: "orange" },
          { text: "Apple", value: "apple" },
          { text: "Pineapple", value: "pineapple" },
          { text: "Grape", value: "grape" }
        ]
      });
      await waitRAF();
      const RadioGroupComponent = wrapper.findComponent(BFormRadioGroup);
      expect(RadioGroupComponent.exists()).toBe(true);
    });
  });

  describe("Events", () => {
    let wrapper;

    beforeEach(async () => {
      wrapper = await getWrapper();
    });

    afterEach(() => {
      wrapper.destroy();
    });

    it("should emit `input` when radio is selected", async () => {
      let radioInput = wrapper.find(".custom-control-input");
      await radioInput.setChecked();
      expect(radioInput.element.checked).toBeTruthy();
    });
  });
});

function getWrapper() {
  let wrapper = mount(LxpRadio, {
    propsData: {
      id: "radio-test",
      text: "Orange",
      value: "orange"
    },
    localVue
  });

  return wrapper;
}
