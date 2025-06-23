import { createLocalVue, mount } from "@vue/test-utils";

import draggable from "vuedraggable";
import LxpStructuredList from "../StructuredList.vue";
import { BTooltip } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-structured-list", LxpStructuredList);
localVue.component("draggable", draggable);
localVue.component("b-tooltip", BTooltip);

describe("StructuredList.vue", () => {
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

    it("should contain a list with draggable icon", async () => {
      wrapper = await getWrapper();
      const listIcon = wrapper.find(".lxp-sl__list--item__handler");
      expect(listIcon.exists()).toBe(true);
    });
  });
  describe("Events", () => {
    let wrapper;

    afterEach(() => {
      wrapper.destroy();
    });

    it("should emit an event when an item is dragged", async () => {
      wrapper = await getWrapper();
      const draggableItem = wrapper.find(".lxp-sl__list--item__handler");
      draggableItem.trigger("dragstart");
      draggableItem.trigger("dragend");
      expect(wrapper.exists("item-dragged")).toBeTruthy();
    });
  });

  describe("Data", () => {
    let wrapper;

    afterEach(() => {
      wrapper.destroy();
    });

    it("should have correct data when created", async () => {
      wrapper = await getWrapper();
      const items = wrapper.vm.items;
      expect(items).toEqual([
        { name: "First", order: 1, fixed: false },
        { name: "Second", order: 2, fixed: false },
        { name: "Third", order: 3, fixed: false }
      ]);
    });
  });
});

function getWrapper() {
  return mount(LxpStructuredList, {
    propsData: {
      items: [
        {
          name: "First",
          order: 1,
          fixed: false
        },
        {
          name: "Second",
          order: 2,
          fixed: false
        },
        {
          name: "Third",
          order: 3,
          fixed: false
        }
      ]
    },
    localVue
  });
}
