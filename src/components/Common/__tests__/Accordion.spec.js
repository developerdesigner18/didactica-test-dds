import { createLocalVue, mount } from "@vue/test-utils";
import Accordion from "../Accordion.vue";
import { BImg } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("accordion", Accordion);
localVue.component("b-img", BImg);

describe("Accordion.vue", () => {
  it("renders when created", async () => {
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

    it("should render all items passed as props", async () => {
      wrapper = await getWrapper();
      await wrapper.vm.$nextTick();

      const items = wrapper.findAll(".accordion-item");
      expect(items.length).toEqual(3);
    });

    it("should apply the correct variant class", async () => {
      wrapper = await getWrapper({ variant: "variant2" });
      await wrapper.vm.$nextTick();

      expect(wrapper.classes()).toContain("variant2");
    });
  });

  describe("Functionality", () => {
    let wrapper;

    beforeEach(async () => {
      wrapper = await getWrapper();
    });

    afterEach(() => {
      wrapper.destroy();
    });

    it("should toggle item content on click", async () => {
      const firstItemHeader = wrapper.find(".accordion-item .accordion-header");
      await firstItemHeader.trigger("click");
      await wrapper.vm.$nextTick();

      const firstItemContent = wrapper.find(
        ".accordion-item .accordion-content"
      );
      expect(firstItemContent.isVisible()).toBeTruthy();

      await firstItemHeader.trigger("click");
      await wrapper.vm.$nextTick();

      expect(
        wrapper.find(".accordion-item .accordion-content").exists()
      ).toBeFalsy();
    });
  });
});

function getWrapper(props = {}) {
  return mount(Accordion, {
    propsData: {
      items: [
        { title: "Item 1", content: "Content 1" },
        { title: "Item 2", content: "Content 2" },
        { title: "Item 3", content: "Content 3" }
      ],
      ...props
    },
    localVue
  });
}
