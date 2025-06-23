import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";
import { BBadge } from "bootstrap-vue";
import PillBadges from "../PillBadges.vue";

const localVue = createLocalVue();

localVue.component("b-badge", BBadge);

describe("PillBadges.vue", () => {
  it("should render when created", async () => {
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
      await wrapper.setProps({ item: { name: "new" } });
      await waitRAF();
      const badge = wrapper.find(".pill");
      expect(badge.exists()).toBe(true);
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

    it("should emit `click` when badge is clicked", async () => {
      let badge = wrapper.find(".pill");
      await badge.trigger("click");
      expect(wrapper.emitted().click).toBeTruthy();
    });
  });
});

function getWrapper() {
  return mount(PillBadges, {
    propsData: {
      item: { name: "Badge" }
    },
    localVue
  });
}
