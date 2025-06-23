import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import { BAlert } from "bootstrap-vue";
import LxpAlert from "../Alert.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-alert", LxpAlert);
localVue.component("b-alert", BAlert);

describe("Alert.vue", () => {
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
    it("should render the title based on prop", async () => {
      wrapper = await getWrapper();
      const titleText = wrapper.find(".lxp-alert__content--right h5");
      expect(titleText.text()).toBe("Welcome New");
    });
    it("should render the subtitle based on prop", async () => {
      wrapper = await getWrapper();
      const titleText = wrapper.find(".lxp-alert__content--right p");
      expect(titleText.text()).toBe("this is a sample text");
    });

    it("should render the image", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        imgPath:
          "https://files.lxp.academy.who.int/didactica/assets/images/course-card/course-illustration.svg"
      });
      await waitRAF();
      const imgPath = wrapper.find(".lxp-alert__content img");
      expect(imgPath.exists()).toBe(true);
    });
    it("should update based on the variant", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({
        variant: "secondary1"
      });
      await waitRAF();
      const variant = wrapper.find(".alert-secondary1");
      expect(variant.exists()).toBe(true);
    });
  });
});

function getWrapper() {
  let wrapper = mount(LxpAlert, {
    propsData: {
      title: "Welcome New",
      subTitle: "this is a sample text"
    },
    localVue
  });

  return wrapper;
}
