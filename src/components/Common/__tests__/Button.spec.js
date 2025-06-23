import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import { BButton } from "bootstrap-vue";
import LxpButton from "../Button.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-button", LxpButton);
localVue.component("b-button", BButton);

describe("Button.vue", () => {
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
    it("should update button variant based on prop", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ variant: "warning" });
      await waitRAF();
      const buttonVariant = wrapper.find(".btn-warning");
      expect(buttonVariant.exists()).toBe(true);
    });

    it("should update the button round", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ round: true });
      await waitRAF();
      const buttonVariant = wrapper.find(".lxp-button__round");
      expect(buttonVariant.exists()).toBe(true);
    });
    it("should update button with elevated styles", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ elevate: true });
      await waitRAF();
      const buttonVariant = wrapper.find(".lxp-button__elevate");
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

    it("should emit `click` when button is clicked is clicked", async () => {
      let button = wrapper.find(".lxp-button");
      await button.trigger("click");
      expect(wrapper.emitted().click).toBeTruthy();
    });
  });
});

function getWrapper() {
  return mount(LxpButton, {
    propsData: {
      variant: "primary"
    },
    localVue
  });
}
