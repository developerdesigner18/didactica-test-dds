import { createLocalVue, mount } from "@vue/test-utils";
import { waitRAF } from "@/../tests/utils.js";
import LxpUploadFile from "../UploadFile.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();

localVue.component("lxp-upload-file", LxpUploadFile);

describe("UploadFile.vue", () => {
  it("renders when created", async () => {
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
      await wrapper.setProps({ id: "new" });
      await waitRAF();
      const fileInput = wrapper.find("#lxp-file-input-new");
      expect(fileInput.exists()).toBe(true);
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
    it("should render the component correctly", () => {
      const wrapper = mount(LxpUploadFile, {
        localVue
      });
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.vm.files).toEqual([]);
      expect(wrapper.vm.isLoading).toBe(false);
    });
    it("should upload a file successfully", () => {
      const file = new File(["dummy file content"], "test-file.txt", {
        type: "text/plain"
      });
      let wrapper = mount(LxpUploadFile, {
        localVue
      });
      wrapper.vm.onChange([file]);
      expect(wrapper.vm.isLoading).toBe(false);
    });
    it("should handle error when uploading a file", () => {
      const error = new Error("File upload failed");
      const file = new File(["dummy file content"], "test-file.txt", {
        type: "text/plain"
      });
      let wrapper = mount(LxpUploadFile, {
        localVue
      });
      wrapper.vm.$emit("error", error);
      wrapper.vm.onChange([file]);
      expect(wrapper.vm.isLoading).toBe(false);
    });
  });
});

function getWrapper() {
  return mount(LxpUploadFile, {
    propsData: {
      id: "upload-file",
      index: 1
    },
    localVue
  });
}
