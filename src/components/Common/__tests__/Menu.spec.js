import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";
import { BDropdown, BDropdownItem } from "bootstrap-vue";
import LxpMenu from "../Menu.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-menu", LxpMenu);
localVue.component("b-dropdown", BDropdown);
localVue.component("b-dropdown-item", BDropdownItem);

describe("Menu.vue", () => {
  it("render when created ", async () => {
    let wrapper = await getWrapper();
    expect(wrapper.exists()).toBeTruthy();
    wrapper.destroy();
  });
  describe("Props", () => {
    let wrapper;

    afterEach(() => {
      wrapper.destroy();
    });
    it("should update id based on prop", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ id: "new" });
      await waitRAF();
      const buttonVariant = wrapper.find("#dropdown-new");
      expect(buttonVariant.exists()).toBe(true);
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

    it("should emit `select` when button is clicked is clicked", async () => {
      let button = wrapper.find(".dropdown-item");
      await button.trigger("click");
      expect(wrapper.emitted().select).toBeTruthy();
    });
  });
});

function getWrapper() {
  return mount(LxpMenu, {
    propsData: {
      text: "Menu"
    },
    localVue
  });
}
