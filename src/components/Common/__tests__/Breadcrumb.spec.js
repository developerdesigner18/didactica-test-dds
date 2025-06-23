import { createLocalVue, mount } from "@vue/test-utils";
import LxpBreadcrumb from "../Breadcrumb.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

describe("Breadcrumb.vue", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = await getWrapper();
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders correctly when created", () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("renders the correct number of breadcrumb items", () => {
    const breadcrumbItems = wrapper.findAll(".breadcrumb-item");
    expect(breadcrumbItems.length).toBe(wrapper.vm.items.length);
  });

  it("should emit `click` when breadcrumb link is clicked", async () => {
    let breadcrumbLink = wrapper.find(".breadcrumb-item a");
    await breadcrumbLink.trigger("click");
    expect(wrapper.emitted().click).toBeTruthy();
  });

  it("applies the 'active' class to the active breadcrumb item", () => {
    const activeBreadcrumbItem = wrapper.find(".breadcrumb-item.active");
    expect(activeBreadcrumbItem.exists()).toBe(true);
  });

  it("displays the correct text for each breadcrumb item", () => {
    const breadcrumbItems = wrapper.vm.items;

    breadcrumbItems.forEach((item, index) => {
      const breadcrumbItem = wrapper.findAll(".breadcrumb-item").at(index);
      const text = breadcrumbItem.text().trim();
      expect(text).toBe(item.text);
    });
  });

  it("displays the correct icon for each breadcrumb item", () => {
    const breadcrumbItems = wrapper.vm.items;

    breadcrumbItems.forEach((item, index) => {
      const breadcrumbItem = wrapper.findAll(".breadcrumb-item").at(index);
      const icon = breadcrumbItem.find(".bc__custom-icon");
      const expectedIcon = item.icon;

      if (expectedIcon) {
        expect(icon.exists()).toBe(true);
        expect(icon.attributes("src")).toBe(expectedIcon);
      } else {
        expect(icon.exists()).toBe(false);
      }
    });
  });
});

function getWrapper() {
  return mount(LxpBreadcrumb, {
    localVue
  });
}
