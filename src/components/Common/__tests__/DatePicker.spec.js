import { createLocalVue, mount } from "@vue/test-utils";
import LxpDatePicker from "../DatePicker.vue";
import { BFormDatepicker } from "bootstrap-vue";
import { VBTooltip } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-datepicker", LxpDatePicker);
localVue.component("b-form-datepicker", BFormDatepicker);
localVue.component("v-b-tooltip", VBTooltip);

describe("DatePicker.vue", () => {
  it("sets default title if not provided", async () => {
    let wrapper = await getWrapper();
    expect(wrapper.vm.title).toBe("Pick Date");
  });

  it("correctly sets the default class name", async () => {
    let wrapper = await getWrapper();
    expect(wrapper.vm.className).toBe("datepicker__div");
  });

  it("emits date-Selected event when a date is selected", async () => {
    let wrapper = await getWrapper();
    const selectedDate = "2022-10-15";
    wrapper.setData({ selectedDate });
    wrapper.vm.$emit("date-Selected", selectedDate);
    expect(wrapper.emitted("date-Selected")).toBeTruthy();
    expect(wrapper.emitted("date-Selected")[0][0]).toBe(selectedDate);
  });
});

function getWrapper() {
  return mount(LxpDatePicker, {
    propsData: {
      title: "Pick Date"
    },
    localVue
  });
}
