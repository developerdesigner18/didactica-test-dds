import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import { BFormCheckbox, BFormCheckboxGroup } from "bootstrap-vue";
import LxpCheckbox from "../Checkbox.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-checkbox", LxpCheckbox);
localVue.component("b-form-checkbox", BFormCheckbox);
localVue.component("b-form-checkbox-group", BFormCheckboxGroup);

describe("Checkbox.vue", () => {
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
    it("should update the checkbox text based on prop", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ text: "warning" });
      await waitRAF();
      const checkboxText = wrapper.find(".custom-control-label");
      expect(checkboxText.text()).toBe("warning");
    });

    it("should update the checkbox to disabled", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ disabled: true });
      await waitRAF();
      const disabledCheckbox = wrapper.find(".lxp-checkbox--disabled");
      expect(disabledCheckbox.exists()).toBe(true);
    });
    it("should preselect the value to true", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        value: true
      });
      await waitRAF();
      const checkboxInput = wrapper.find(".custom-control-input");
      expect(checkboxInput.element.checked).toBeTruthy();
    });
    it("should preselect  multiple values", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        options: [
          { text: "Orange", value: "orange" },
          { text: "Apple", value: "apple" }
        ],
        value: ["orange", "apple"]
      });
      await waitRAF();
      const checkedInputArr = wrapper
        .findAll(".custom-control-input")
        .filter((w) => w.element.checked);
      expect(checkedInputArr).toBeTruthy();
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

    it("should emit `input` when checkbox is selected", async () => {
      let checkboxInput = wrapper.find(".custom-control-input");
      await checkboxInput.setChecked();
      expect(checkboxInput.element.checked).toBeTruthy();
    });
  });
});

function getWrapper() {
  let wrapper = mount(LxpCheckbox, {
    propsData: {
      id: "checkbox-test"
    },
    localVue
  });

  return wrapper;
}
