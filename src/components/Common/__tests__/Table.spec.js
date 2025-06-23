import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";

import LxpTable from "../Table.vue";
import LxpCheckbox from "../Checkbox.vue";
import LxpPagination from "../Pagination.vue";

import { BPagination, BFormCheckbox } from "bootstrap-vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-table", LxpTable);
localVue.component("lxp-checkbox", LxpCheckbox);
localVue.component("lxp-pagination", LxpPagination);
localVue.component("b-pagination", BPagination);
localVue.component("b-form-checkbox", BFormCheckbox);

describe("Table.vue", () => {
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

    it("should show the sort based on tableHeader `sortable` prop", async () => {
      wrapper = await getWrapper();
      await waitRAF();
      const tableVariant = wrapper.find(".lxp-table__sort");
      expect(tableVariant.exists()).toBe(true);
    });

    it("should update the variant based on prop", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ variant: "success" });
      await waitRAF();
      const tableVariant = wrapper.find(".table-success");
      expect(tableVariant.exists()).toBe(true);
    });

    it("should update the checkbox when `selectable` is true", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ selectable: true });
      await waitRAF();
      const checkbox = wrapper.find(".lxp-checkbox");
      expect(checkbox.exists()).toBe(true);
    });

    it("should show pagination when `hasPagination` is true", async () => {
      wrapper = await getWrapper();
      await wrapper.setProps({ hasPagination: true });
      await waitRAF();
      const checkbox = wrapper.find(".lxp-pagination");
      expect(checkbox.exists()).toBe(true);
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

    it("should emit `sort` when sort button is clicked", async () => {
      let sortableBtn = wrapper.find(".lxp-table__sort");
      await sortableBtn.trigger("click");
      expect(wrapper.emitted().sort).toBeTruthy();
    });
  });
});

function getWrapper() {
  let wrapper = mount(LxpTable, {
    propsData: {
      tableHeader: [
        {
          key: "age",
          name: "Age",
          sortable: true
        },
        {
          key: "first_name",
          name: "First Name",
          sortable: false
        },
        {
          key: "last_name",
          name: `Last name`,
          sortable: true
        }
      ],
      tableData: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: `<b>Wilson</b>` }
      ]
    },
    localVue
  });

  return wrapper;
}
