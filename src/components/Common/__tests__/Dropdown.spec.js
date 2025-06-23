import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import LxpDropdown from "../Dropdown.vue";
import { BDropdown, BDropdownItem, BImg } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-dropdown", LxpDropdown);
localVue.component("b-dropdown", BDropdown);
localVue.component("b-dropdown-item", BDropdownItem);
localVue.component("b-img", BImg);

describe("Dropdown.vue", () => {
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

    it("should floating styles for dropdown", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ isFloating: true });
      await waitRAF();

      const floatingDropdown = wrapper.find(".form-floating");
      expect(floatingDropdown.exists()).toBe(true);
    });

    it("should add error class when `showError` is true", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        showError: true,
        supportText: "Please select a value"
      });
      await waitRAF();

      const errorDropdown = wrapper.find(".error");
      expect(errorDropdown.exists()).toBe(true);

      const errorMessageContent = wrapper.find(".has-support-text");
      expect(errorMessageContent.text()).toEqual("Please select a value");
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

    it("should emit `click` when dropdown item is clicked", async () => {
      let dropdownItem = wrapper.find(".dropdown-item");
      await dropdownItem.trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
    });
  });
});

function getWrapper() {
  return mount(LxpDropdown, {
    propsData: {
      label: "Select",
      placeholder: "Placeholder text",
      dropdownArr: ["apple", "orange", "banana"]
    },
    localVue
  });
}
