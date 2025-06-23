import { createLocalVue, mount } from "@vue/test-utils";

import LxpModal from "../Modal.vue";
import { BButton } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-modal", LxpModal);
localVue.component("b-button", BButton);

describe("Modal.vue", () => {
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

    it("should hide header and footer when `hideHeader` and `hideFooter` is present", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        hideHeader: true,
        hideFooter: true
      });

      const modalHeader = wrapper.find(".modal-header");
      expect(modalHeader.exists()).toBe(false);

      const modalFooter = wrapper.find(".modal-footer");
      expect(modalFooter.exists()).toBe(false);
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

    it("should emit `modal-close` when close is clicked", async () => {
      let courseCard = wrapper.find(".lxp-modal__close");
      await courseCard.trigger("click");
      expect(wrapper.emitted("modal-close")).toBeTruthy();
    });
  });
});

function getWrapper() {
  return mount(LxpModal, {
    propsData: {
      title: "Modal Title",
      centered: true,
      show: true
    },
    localVue
  });
}
