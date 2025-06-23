import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import LxpCourseCard from "../CourseCard.vue";
import { BImg } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-course-card", LxpCourseCard);
localVue.component("b-img", BImg);

describe("CourseCard.vue", () => {
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

    it("should show tag content if `tagText` is present", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        tagText: "New"
      });
      await waitRAF();

      const cardTag = wrapper.find(".card-tag");
      expect(cardTag.text()).toEqual("New");
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

    it("should emit `card-click` when card is clicked", async () => {
      let courseCard = wrapper.find(".lxp-course-card");
      await courseCard.trigger("click");
      expect(wrapper.emitted("card-click")).toBeTruthy();
    });
  });
});

function getWrapper() {
  return mount(LxpCourseCard, {
    propsData: {
      cardTitle: "Card Title",
      cardSubTitle: "Subtitle"
    },
    localVue
  });
}
