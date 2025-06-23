import { createLocalVue, mount } from "@vue/test-utils";
import Accordion from "../Accordion.vue";
import AwardPreview from "../AwardPreview.vue";

// create an extended `Vue` constructor
const localVue = createLocalVue();
localVue.component("Accordion", Accordion);

describe("AwardPreview.vue", () => {
  const defaultProps = {
    courseTitle: "Sample Title",
    awardTitle: "Sample Award Title",
    presentedTo: "Sample Presented To",
    userName: "Sample User Name",
    awardDescription: "Sample Award Description",
    issuedByText: "Sample Issued By Text",
    moreInformationText: "Sample More Information",
    issuedOn: "Issued on",
    expiringOn: "Expiring on",
    disclaimerTitle: "Sample Disclaimer Title",
    disclaimer: "Sample Disclaimer",
    infoArr: [
      { title: "Admission criteria", key: "admission_criteria" },
      { title: "Course description", key: "course_description" },
      { title: "Course activities", key: "course_activity" },
      { title: "Course outcomes", key: "course_outcome" },
      { title: "Assessment", key: "course_assessments" },
      { title: "Other information", key: "other_information" }
    ],
    award: {
      content_type: {
        name: "Course Participation Confirmation",
        slug: "course_participation_confirmation"
      },
      credential: {
        expiration_date: "2027-10-11",
        admission_criteria: "<p>asdsad</p>",
        course_description: "<p>assda</p>",
        issuers: "WHO Academy, UNESS",
        course_activity: "<p>asdsad</p>",
        course_outcome: "<p>asdsad</p>",
        issuer_logos: [
          {
            id: 1,
            logo: "https://arodevelopstorage.blob.core.windows.net/openedx-extension-api/dev/issuer-logos/image002.png?se=2024-07-26T15%3A14%3A22Z&sp=r&sv=2021-08-06&sr=b&sig=yPHm%2B/QEZ4Vd30tidX1sgbQ6WLohmqe8jGTw17sL0qY%3D"
          },
          {
            id: 2,
            logo: "https://arodevelopstorage.blob.core.windows.net/openedx-extension-api/dev/issuer-logos/image002.png?se=2024-07-26T15%3A14%3A22Z&sp=r&sv=2021-08-06&sr=b&sig=yPHm%2B/QEZ4Vd30tidX1sgbQ6WLohmqe8jGTw17sL0qY%3D"
          },
          {
            id: 3,
            logo: "https://arodevelopstorage.blob.core.windows.net/openedx-extension-api/dev/issuer-logos/image002.png?se=2024-07-26T15%3A14%3A22Z&sp=r&sv=2021-08-06&sr=b&sig=yPHm%2B/QEZ4Vd30tidX1sgbQ6WLohmqe8jGTw17sL0qY%3D"
          }
        ]
      }
    }
  };

  it("renders when created", () => {
    const wrapper = mount(AwardPreview, {
      localVue,
      propsData: defaultProps
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot(); // Snapshot test
  });

  it("renders all props correctly", () => {
    const wrapper = mount(AwardPreview, {
      localVue,
      propsData: defaultProps
    });
    const propKeys = Object.keys(defaultProps);

    propKeys.forEach((key) => {
      expect(wrapper.props(key)).toBe(defaultProps[key]);
    });
    expect(wrapper.element).toMatchSnapshot(); // Snapshot test
  });

  it("renders Accordion component with correct props", () => {
    const wrapper = mount(AwardPreview, {
      localVue,
      propsData: defaultProps
    });
    const accordion = wrapper.findComponent(Accordion);
    expect(accordion.exists()).toBe(true);
    // expect(accordion.props("items")).toBe(defaultProps.infoArr);
    expect(accordion.props("singleOpen")).toBe(false);
    expect(wrapper.element).toMatchSnapshot(); // Snapshot test
  });
});
