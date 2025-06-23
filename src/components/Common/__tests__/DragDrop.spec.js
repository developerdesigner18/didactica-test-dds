import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import LxpDragDrop from "../DragDrop.vue";
import LxpDropdown from "../Dropdown.vue";
import { BDropdown, BDropdownItem, BImg } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("LxpDragDrop", LxpDragDrop);
localVue.component("b-img", BImg);
localVue.component("lxp-dropdown", LxpDropdown);
localVue.component("b-dropdown", BDropdown);
localVue.component("b-dropdown-item", BDropdownItem);

describe("DragDrop.vue", () => {
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

    it("should add error class when `showError` is true", async () => {
      wrapper = await getWrapper();
      await wrapper.setData({ isDragging: false, hasError: true });
      await waitRAF();

      const errorDragDrop = wrapper.find(".lxp-dd__error");
      expect(errorDragDrop.exists()).toBe(true);
    });
  });
});

function getWrapper() {
  return mount(LxpDragDrop, {
    propsData: {
      noteText: "Recomended file size 1MB",
      id: "dragdrop-1"
    },
    localVue
  });
}
