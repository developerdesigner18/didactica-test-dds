<template>
  <div id="app">
    <b-tabs content-class="mt-3" lazy>
      <b-tab title="Partners" active>
        <learning-space
          :isEdit="isEdit"
          :spaceObj="obj"
          :token="token"
          :urlList="urlObj"
          :sections="sections"
          :tags="tags"
          :currentInitiativeId="currentInitiativeId"
          :initiatives="initiatives"
          :filterOptions="filterOptions"
          :featuredResources="featuredResources"
          resourcesListURL="https://lxp-api-develop.azure-api.net/DevStage/courses/discovery-paginated?org=iarc&language=en"
          filterResourcesListURL="http://course-discovery-discovery-labs-staging.apps.develop.lxp.academy.who.int/api/v3/tag_filter/?tags=[8]&language=en&page_size=20&page=1"
          @click-empty-state-cta="onEmptyStateCTA"
          @card-click="onCardClick"
        ></learning-space>
      </b-tab>
      <b-tab title="CourseOverviewEditor">
        <course-overview
          :isEdit="isEdit"
          :token="token"
          :overviewContent="overviewContent"
          :urlObj="urlObj"
          :tagOptions="filterOptions"
          :courseId="courseId"
          :courseTitle="course_title"
          :titleKeys="{ what_will_you_learn: 'asddsa' }"
          @update-CourseOverview="$emit('courseOverview-updated')"
        ></course-overview>
      </b-tab>
      <b-tab title="Components" lazy>
        <b-list-group>
          <b-list-group-item>
            <LxpPaginationWrapper
              ref="courseapilistwrapper"
              dataFetchURL="https://web-dev.apps.develop.lxp.academy.who.int/coursewares/course-v1:IARC+270324+2703_1?from=home-courses"
              nextPageLabel="next"
              :pageSizeValue="20"
              showNumberPagination
              :enableDynamicFetch="false"
            >
            </LxpPaginationWrapper>
          </b-list-group-item>
          <b-list-group-item>
            <autocomplete
              placeholder="Search for a course"
              :items="[{ title: 'hello' }, { title: 'world' }]"
            />
          </b-list-group-item>

          <b-list-group-item>
            <StructuredList :items="listItems">
              <template slot="item" slot-scope="{ item }">
                <div>
                  <span class="lxp-sl__list--item__handler">
                    {{ item.name }}</span
                  >
                </div>
              </template>
            </StructuredList>
          </b-list-group-item>
          <b-list-group-item>
            <Textarea
              label="Space name*"
              :limit="500"
              :maxRows="12"
              :rows="5"
              showLimit
              supportText="hello"
            />
          </b-list-group-item>
          <b-list-group-item>
            <drag-drop
              id="dragdrop-app"
              note-text="Recommended image specfications: JPEG, 1MB max, 123x123px."
              validateFileDimension
              :widthDimension="500"
              :heightDimension="500"
              fileUploadUrl="https://lxp-api-develop.azure-api.net/DevStage/spaces/upload-image/"
              :authToken="token"
              :accept="['jpeg']"
              uploadedFileUrl="https://files.lxp.academy.who.int/learning-spaces/dev/space-images/image_5.jpg"
              variant="variant2"
              @file-url="onFileUrl"
            ></drag-drop>
          </b-list-group-item>
          <b-list-group-item>
            <Button @click="onHello">Hello</Button>
          </b-list-group-item>
          <b-list-group-item>
            <course-card
              card-sub-title="WHOA"
              card-title="Main line text lorem ipsum dapibus, neque id cursus faucibus"
              tag-text="New"
            >
              <template #footer>
                <div class="d-flex justify-content-between">
                  <p class="mb-0">Self Paced</p>
                  <p class="mb-0">EN</p>
                </div>
              </template>
            </course-card>
          </b-list-group-item>
          <b-list-group-item>
            <Button @click="openModal">Show Modal</Button>
            <Modal :show.sync="showModal" centered title="Modal title">
              <div>Modal body</div>
              <template #footer>
                <Button variant="outline-warning">Close</Button>
                <Button variant="warning">Save</Button>
              </template>
            </Modal>
          </b-list-group-item>
          <b-list-group-item>
            <Dropdown
              :label="'Select'"
              placeholder="Placeholder"
              :dropdownArr="dropdownArr"
              :buttonContent="''"
              dropdownClass="lxp-upload__dd"
            >
            </Dropdown>
          </b-list-group-item>
          <b-list-group-item>
            <Input label="Input" />
          </b-list-group-item>
          <b-list-group-item>
            <Pagination :rows="100" :currentPage.sync="page" />
          </b-list-group-item>
          <b-list-group-item>
            <Breadcrumb />
          </b-list-group-item>
          <b-list-group-item>
            <UploadFile
              ref="uploadFileComponent"
              dragDropClass="ls-create__image"
              :accept="['png', 'svg']"
              :authToken="token"
              validateFileDimension
              uploadedFileUrl="https://files.lxp.academy.who.int/learning-spaces/dev/space-images/image_5.jpg"
              fileUploadUrl="https://lxp-api-develop.azure-api.net/PhoenixStage/spaces/upload-image/"
              @file-url="onFileUrl"
            />
          </b-list-group-item>
          <b-list-group-item>
            <FormTags />
          </b-list-group-item>
          <b-list-group-item>
            <Button @click="showToast">Show Toast</Button>
            <Toaster
              title="Show title !"
              :show.sync="showInfo"
              variant="primary"
              message="Secondary line text lorem ipsum dapibus, neque id cursu"
              buttonText="buttonText"
            />
          </b-list-group-item>
        </b-list-group>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Autocomplete from "./components/Common/Autocomplete.vue";
import Breadcrumb from "./components/Common/Breadcrumb.vue";
import Button from "./components/Common/Button.vue";
import CourseCard from "./components/Common/CourseCard.vue";
import DragDrop from "./components/Common/DragDrop.vue";
import Dropdown from "./components/Common/Dropdown.vue";
import FormTags from "./components/Common/FormTags.vue";
import Input from "./components/Common/Input.vue";
import Modal from "./components/Common/Modal.vue";
import Pagination from "./components/Common/Pagination.vue";
import StructuredList from "./components/Common/StructuredList.vue";
import Textarea from "./components/Common/Textarea.vue";
import Toaster from "./components/Common/Toaster.vue";
import UploadFile from "./components/Common/UploadFile.vue";

import { LxpPaginationWrapper } from "./components/Common";
import CourseOverview from "./components/CourseOverview/CourseOverview.vue";
import LearningSpace from "./components/LearningSpace/LearningSpaceWrapper.vue";

export default {
  name: "App",
  components: {
    Button,
    Breadcrumb,
    CourseCard,
    Modal,
    DragDrop,
    Dropdown,
    Input,
    Pagination,
    Textarea,
    LearningSpace,
    CourseOverview,
    StructuredList,
    Autocomplete,
    UploadFile,
    FormTags,
    Toaster,
    LxpPaginationWrapper
  },

  data() {
    return {
      isEdit: true,
      showModal: false,
      showSection: true,
      currentInitiativeId: 0,
      showInfo: false,
      dropdownArr: [
        "apple",
        "orange",
        "mango",
        "lemon",
        "banana",
        "berry",
        "watermelon"
      ],
      page: 2,
      obj: {
        name: "test test space name  test test space name  test test space name test test space name test test space name test test space name test test space name t",
        org_short_name: "IARC",
        about: {
          name: "About",
          short_headline:
            "test short headline test short headline test short headline test short headline test short headline test short headline test short headline test short",
          info: "This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new course for IARC This is space to cerate new cour",
          image:
            "https://files.lxp.academy.who.int/learning-spaces/dev/space-images/Frame_2608960_CQpSElx.jpg",
          terms_and_conditions: "https://publications.iarc.fr/Terms-Of-Use",
          video_url: "https://www.youtube.com/embed/VjxFhEbCLmM"
        },

        social_networks: [
          {
            name: "official_website",
            url: "https://www.who.int/",
            order: "1",
            label: "who.int"
          },
          { name: "facebook", url: null, order: "2", label: "Facebook" },
          { name: "instagram", url: null, order: "3", label: "Instagram" },
          { name: "twitter", url: null, order: "4", label: "Twitter" },
          {
            name: "youtube_vimeo",
            url: null,
            order: "5",
            label: "Youtube/vimeo"
          }
        ],
        cover_image: "",
        logo: "https://files.lxp.academy.who.int/learning-spaces/dev/space-images/IARC_n2njoa8.jpg"
      },
      initiatives: [
        {
          id: 69,
          name: "IARC Child Care Initiatives",
          short_headline: "Child Care programme",
          info: "The period from birth to eight years old is one of remarkable brain development for children and represents a crucial window of opportunity for education. UNESCO believes early childhood care and education (ECCE) that is truly inclusive is much more than just preparation for primary school. It can be the foundation for emotional wellbeing and learning throughout life and one of the best investments a country can make as it promotes holistic development, gender equality and social cohesion",
          video_url: "https://www.youtube.com/embed/VjxFhEbCLmM",
          is_published: false,
          image:
            "https://arodevelopstorage.blob.core.windows.net/learning-spaces/dev/space-images/1690427374584-6.jpeg?se=2025-03-13T17%3A49%3A02Z&sp=r&sv=2021-08-06&sr=b&sig=ve3dVFUhkSbGUFaMlmh7R9YG4xfrrlMemyghsffySss%3D"
        },
        {
          id: 106,
          name: "Spinal Cord- Function, Anatomy and Structure",
          short_headline:
            "The spinal cord is a long, tube-like band of tissue. It connects your brain to your lower back. Your spinal cord carries nerve signals from your brain to your body and vice versa. Any damage to your spinal cord can affect your movement or function.",
          info: "What is the spinal cord?\nYour spinal cord is a cylindrical structure that runs through the center of your spine, from your brainstem to your low back. It's a delicate structure that contains nerve bundles and cells that carry messages from your brain to the rest of your body. Your spinal cord is one of the main parts of your nervous system.\nWhat is the difference between the spinal cord and the vertebral column?\nPeople often refer to the spinal cord and vertebral column together as the spine. Your spinal cord is a band of tissues, nerves and cells. A protective layer of bone called the vertebral column covers and protects your spinal cord.\n\nThe bones in the vertebral column are called vertebrae (plural of one spine bone, a vertebra). Your vertebrae stack on top of each other, from your pelvic bones to your skull. Between each pair of vertebrae, you have a spinal disk. Disks have a tough outer shell and a gel-like interior. They act as shock absorption and cushion for your vertebrae and spinal cord.",
          video_url: null,
          is_published: true,
          image:
            "https://arodevelopstorage.blob.core.windows.net/learning-spaces/dev/space-images/1710135453085-maxresdefault.jpg?se=2025-03-13T17%3A49%3A02Z&sp=r&sv=2021-08-06&sr=b&sig=2D2Fc18AFSrSMf5eeL8c9Y6N51fIVJ3v16Eht2qu35k%3D"
        },
        {
          id: 107,
          name: "Heart Rate, Life Expectancy and the Cardiovascular System: Therapeutic Considerations",
          short_headline:
            "The wide variability of heart rate at different times of the day in relation to different activities and also to intercurrent diseases, it is difficult to precisely define the range for normal heart rate.",
          info: "Introduction\nIt has long been known that resting heart rate is inversely related to average life span in most organisms that have been studied. Indeed, among mammals, where the relationship has been most intensively assessed, there is a linear, inverse semilogarithmic relationship between average resting heart rate and average life expectancy in all species except humans (who live longer than is predicted from their heart rate). This observation presumably relates to the interposition of medical care.\nEffects of Heart Rate on the Heart\nConventionally, heart rates of 50 or 55-90 beats per minute (bpm) at rest are considered normal, but in fact, due to the wide variability of heart rate at different times of the day in relation to different activities and also to intercurrent diseases, it is difficult to precisely define the range for normal heart rate. For example, the normal heart rate is typically much slower at night than during the day and, as a general rule, slightly faster in women than in men.\n\nHeart Rate, Ventricular Work and Coronary Flow\nVentricular work and myocardial oxygen consumption (MVO2) are directly related to heart rate. As heart rate increases, the supply of myocardial oxygen diminishes, because the diastolic time interval during which myocardial blood flow occurs decreases relatively rapidly as heart rate increases . Diastolic time is an especially important factor when left ventricular (LV) hypertrophy and/or coronary artery disease are present. LV intramyocardial pressure during systole is equal to or greater than LV systolic pressure in the subendocardium. In patients with hemodynamically important obstructive coronary artery disease, systolic flow may be obliterated because the coronary systolic pressure distal to an obstructive lesion is less than the LV wall pressure during systole. Therefore, subendocardial blood flow, collateral flow and flow distal to an obstruction become dependent on the duration of diastole).",
          video_url:
            "https://www.youtube.com/embed/JA0Wb3gc4mE?si=YxeRfsiWX1Bo6SGC",
          is_published: true,
          image:
            "https://arodevelopstorage.blob.core.windows.net/learning-spaces/dev/space-images/1710136525873-0504BPLoweringAFib_SC.jpg?se=2025-03-13T17%3A49%3A02Z&sp=r&sv=2021-08-06&sr=b&sig=P2OaD6Pl5LfFI/1R9UA0vlihkEB/45xjo6uO9JOJkQ8%3D"
        }
      ],
      tags: [
        {
          id: 85,
          name: "Cancer Prevention Europe"
        },
        {
          id: 81,
          name: "Cancer surveillance"
        },
        {
          id: 86,
          name: "CanScreen5"
        },
        {
          id: 89,
          name: "Child Healthcare"
        },
        {
          id: 87,
          name: "COVID awareness"
        }
      ],
      filterOptions: [
        {
          id: 85,
          name: "Cancer Prevention Europe"
        },
        {
          id: 81,
          name: "Cancer surveillance"
        },
        {
          id: 86,
          name: "CanScreen5"
        },
        {
          id: 89,
          name: "Child Healthcare"
        },
        {
          id: 87,
          name: "COVID awareness"
        }
      ],

      overviewContent: {
        course_id: "",
        index: "",
        short_description:
          "test short headline test short headline test short headline test short headline test short headline test short headline test short headline test short",
        info: [
          {
            id: 998,
            order: "1",
            description:
              "test short headline test short headline test short headline test short headline tt headline test short headline test shortadline test short headline test short",
            image:
              "https://files.lxp.academy.who.int/learning-spaces/dev/space-images/Frame_2608960_CQpSElx.jpg"
          },
          {
            id: 998,
            order: "2",
            description:
              "test short headline test short headline test short headline test short headline tt headline test short headline test shortadline test short headline test short",
            image:
              "https://files.lxp.academy.who.int/learning-spaces/dev/space-images/Frame_2608960_CQpSElx.jpg"
          },
          {
            id: 999,
            order: "3",
            description:
              "test short headline test short headline test short headline test short headline test short line test short headline test short headline test short headline test short",
            image:
              "https://files.lxp.academy.who.int/learning-spaces/dev/space-images/Frame_2608960_CQpSElx.jpg"
          }
        ],
        prerequisite:
          "test short headline test short headline test short headline ttest short headline test short headline test short headline t",
        audience:
          "test short headline test short headline test short headline test stest short headline test short headline test short headline test s",
        about: [
          {
            id: 997,
            order: "1",
            description:
              "test test short headline test short headline test short headline test short headline test short headline test short headline test short headline test shortshort headline test short headline test short headline test short headline test short headline test short headline test short headline test short",
            image_url:
              "https://files.lxp.academy.who.int/didactica/assets/images/course-overview/upload-icon-0.svg"
          },
          {
            id: 998,
            order: "2",
            description:
              "test short headline test short headline test short headline test short headline test short headline test short hetest short headline test short headline test short headline test short headline test short headline test short headline test short headline test shortadline test short headline test short",
            image_url:
              "https://files.lxp.academy.who.int/didactica/assets/images/course-overview/upload-icon-0.svg"
          }
        ],
        assessment_and_awards:
          "test short headline test short headline test short headline test short headline test short headline test short headline test short headline test shorttest short headline test short headline test short headline test short headline test short headline test short headline test short headline test short",
        other_info:
          "test short headline test short headline test shortest short headline test short headline test shortest short headline test short headline test shortest short headline test short headline test shor",
        tags: [""]
      },
      listItems: [
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
      ],
      featuredResources: [
        {
          id: "course-v1:WHOA+07+10",
          title: "Digital Credentials Course",
          image_url:
            "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:WHOA+07+10+type@asset+block@DC-image.JPG",
          org: "WHOA",
          pacing: "self",
          language: "en",
          order: 1,
          user_added: true
        },
        {
          id: "course-v1:WHOA+12+123",
          title: "326Scorm Course1",
          image_url:
            "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:WHOA+12+123+type@asset+block@images_course_image.jpg",
          org: "WHOA",
          pacing: "self",
          language: "en",
          user_added: true
        },
        {
          id: "course-v1:WHOA+123+1234",
          title: "326 Scorm Course2",
          image_url:
            "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:WHOA+123+1234+type@asset+block@images_course_image.jpg",
          org: "WHOA",
          pacing: "self",
          language: "en",
          user_added: false
        },
        {
          id: "course-v1:whoa+04+0422",
          title: "Randomized-New",
          image_url:
            "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:whoa+04+0422+type@asset+block@Ran1.jpg",
          org: "whoa",
          pacing: "self",
          language: "en",
          user_added: false
        },
        {
          id: "course-v1:WHOA+07+1012",
          title: "Digital Credentials Courseasd",
          image_url:
            "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:WHOA+07+10+type@asset+block@DC-image.JPG",
          org: "WHOA",
          pacing: "self",
          language: "en",
          order: 5,
          user_added: true
        },
        {
          id: "course-v1:WHOA+12+123",
          title: "326Scorm Course12131",
          image_url:
            "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:WHOA+12+123+type@asset+block@images_course_image.jpg",
          org: "WHOA",
          pacing: "self",
          language: "en",
          user_added: true
        },
        {
          id: "course-v1:WHOA+123+1234",
          title: "326 Scorm Course2",
          image_url:
            "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:WHOA+123+1234+type@asset+block@images_course_image.jpg",
          org: "WHOA",
          pacing: "self",
          language: "en",
          user_added: false
        },
        {
          id: "course-v1:whoa+04+0422123213",
          title: "Randomized-Newsd123",
          image_url:
            "https://lxp-nginx-lms-labs-staging.apps.dev.lxp.academy.who.int/asset-v1:whoa+04+0422+type@asset+block@Ran1.jpg",
          org: "whoa",
          pacing: "self",
          language: "en",
          user_added: false
        }
      ],
      courseId: "course-v1:IARC+220923+220923_T1",
      course_title: "Corona",
      sections: [
        {
          name: "about",
          title: "About",
          is_enabled: true
        },
        {
          name: "about_featured-resources",
          title: "Featured Resources",
          is_enabled: true
        },
        {
          name: "courses",
          title: "Resources",
          is_enabled: true
        },
        {
          name: "events",
          title: "Events",
          is_enabled: false
        },
        {
          name: "initiatives",
          title: "Initiatives",
          is_enabled: true
        },
        {
          name: "initiatives_featured-resources",
          title: "Featured Resources",
          is_enabled: true
        }
      ],

      urlObj: {
        UPLOAD: {
          method: "post",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/upload-image/"
        },
        UPLOAD_COURSES: {
          method: "post",
          url: "https://lxp-api-develop.azure-api.net/DevStage/courses/upload-image/"
        },
        LIST_RESOURCES: {
          method: "get",
          url: "https://lxp-api-develop.azure-api.net/DevStage/courses/discovery-paginated?org=iarc&language=all"
        },
        LIST_FEATURED_RESOURCES: {
          method: "get",
          url: "https://lxp-api-develop.azure-api.net/DevStage/courses/discovery-paginated?org=WHOA&enforce_org_in_id=true"
        },
        LIST_INITIATIVES_FEATURED_RESOURCES: {
          method: "get",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/v2/initiatives/{initiative_id}/featured-resources/"
        },
        FILTER_RESOURCES: {
          method: "get",
          url: "http://course-discovery-discovery-labs-staging.apps.dev.lxp.academy.who.int/api/v3/tag_filter/?tags=[{tagids}]&language={lang}"
        },
        UPDATE_SPACE: {
          method: "patch",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/IARC/"
        },
        UPDATE_ABOUT: {
          method: "patch",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/IARC/about/"
        },
        LIST_SOCIAL_NETWORK: {
          method: "get",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/IARC/social-networks/"
        },
        UPDATE_SOCIAL_NETWORK: {
          method: "patch",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/IARC/social-networks/"
        },
        UPDATE_INITIATIVE: {
          method: "patch",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/IARC/initiatives"
        },
        UPDATE_FEATURED_RESOURCES: {
          method: "put",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/IARC/courses/featured/"
        },
        GET_FEATURED_RESOURCES: {
          method: "get",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/IARC/courses/featured/"
        },
        UPDATE_MANAGE_SECTION: {
          method: "patch",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/IARC/sections/"
        },
        GET_MANAGE_SECTION: {
          method: "get",
          url: "https://lxp-api-develop.azure-api.net/DevStage/spaces/IARC/sections/"
        },
        GET_COURSE_OVERVIEW: {
          method: "get",
          url: "https://lxp-api-develop.azure-api.net/DevStage/courses/overview/course-v1:IARC+220923+220923_T1/"
        },
        UPDATE_COURSE_OVERVIEW: {
          method: "patch",
          url: "https://lxp-api-develop.azure-api.net/DevStage/courses/overview/course-v1:IARC+220923+220923_T1/"
        },
        CREATE_COURSE_OVERVIEW: {
          method: "post",
          url: "https://lxp-api-develop.azure-api.net/DevStage/courses/overview/"
        },
        GET_COURSE_OVERVIEW_STATUS: {
          method: "get",
          url: "https://lxp-api-develop.azure-api.net/DevStage/courses/overview/course-v1:IARC+220923+220923_T1/status/"
        },
        GET_TAGS: {
          method: "get",
          url: "https://lxp-api-develop.azure-api.net/DevStage/tags/fetch/"
        }
      },
      token:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIzcndCeGdmVXdueFZOQlN4N3h6NmszOVRMOWVrZ0FoNl92bnJwT3ZrSDRVIn0.eyJleHAiOjE3NDIyMDIyNjMsImlhdCI6MTc0MjE5ODY2MywiYXV0aF90aW1lIjoxNzQyMTk4NjU3LCJqdGkiOiI3YzIwNTNhOS1kN2YyLTQ0NGItOGQ2OC05NWYyMjA0N2JiNWEiLCJpc3MiOiJodHRwczovL3Nzby1sYWJzLXN0YWdpbmcuYXBwcy5kZXZlbG9wLmx4cC5hY2FkZW15Lndoby5pbnQvYXV0aC9yZWFsbXMvd2hvYS1seHAiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYTc4MzVhYmEtZmUyOS00M2NhLWE5YzAtMzdiYWZhNjYwNGZlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibGVhcm5pbmctc3BhY2VzLWZyb250ZW5kIiwic2lkIjoiNmYzZDg0NmMtNGNkOS00ZDQ4LTg5ZWYtY2JhYWIxMzYyN2MzIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vbGVhcm5pbmctc3BhY2VzLWZyb250ZW5kLWxhYnMtc3RhZ2luZy5hcHBzLmRldmVsb3AubHhwLmFjYWRlbXkud2hvLmludCIsImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsicGFob192Y3BoX2xlYXJuaW5nX3NwYWNlX2FkbWluIiwidW5lc3NfbGVhcm5pbmdfc3BhY2VfYWRtaW4iLCJvZmZsaW5lX2FjY2VzcyIsInBhaG9fdmNwaF9sZWFybmluZ19nYXRld2F5X3BhcnRuZXJfc3RhZmYiLCJ3aG9hX2xlYXJuaW5nX2dhdGV3YXlfcGFydG5lcl9hZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIiwicGFob192Y3BoX2xlYXJuaW5nX2dhdGV3YXlfcGFydG5lcl9hZG1pbiIsImlhcmNfbGVhcm5pbmdfc3BhY2VfYWRtaW4iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50Iiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiU2h5bGFqYSBIYXJpZGFzIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaGFyaWRhc2Fuc0B3aG8uaW50IiwiZ2l2ZW5fbmFtZSI6IlNoeWxhamEiLCJsb2NhbGUiOiJlcyIsImZhbWlseV9uYW1lIjoiSGFyaWRhcyIsImVtYWlsIjoiaGFyaWRhc2Fuc0B3aG8uaW50In0.l5jD7g_jktjRi3tswL9y6DMhwqSHyjUIyRNRNcnSIZhRrihCwroOGG2MtaHLRZt9I3NdXM0pHdh9EeizHios1O8hXEVkwLDVtQfaneD9oZ-OOfONZqKI-n34P7v8pHU5st10lNWPfH1lK7IHTiGQUu9ZYaeUeD_OuQiSpbMsXATa1WMoqCzINBa0aUs6ANnbSKqMe0fHh_93TDAWxZlpTMnUT1rTCyu77_RnOT9mYj1HNXYkKqgTCSnoV_ahnaDF6dXyVLNd5yVGgTBkzwRAoFCYdYTzpLCWhZYxUnBBKdYqQyGNqDzYrn_m5MmdcPJeFdXj0pAkYtmetdqz2MpurQ"
    };
  },

  computed: {
    buttonContent() {
      let imgPath =
        "https://files.lxp.academy.who.int/didactica/assets/images/drag-drop/upload.svg";
      return `<div class="lxp-dd__content">
        <img src="${imgPath}" alt="upload" loading="lazy" />
        <p>Edit cover</p>
        </div>`;
    },
    currentInitiative() {
      return this.currentInitiative;
    }
  },

  methods: {
    onHello() {
      this.$root.$emit("CourseOverviewSave");
    },
    onEmptyStateCTA() {
      if (this.isEdit) {
        alert("Edit mode - Studio");
      } else {
        alert("Read mode - Learner");
      }
    },
    onCardClick(courseId) {
      if (this.isEdit) {
        alert("CARD CLICK - Edit mode - Studio - No redirection - " + courseId);
      } else {
        alert(
          "CARD CLICK - Read mode - Learner - Redirect to course details page - " +
            courseId
        );
      }
    },
    openModal() {
      this.showModal = true;
    },
    showToast() {
      this.showInfo = true;
    },
    onFileUrl(url) {
      console.log(url);
    }
  }
};
</script>

<style>
#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}
.lxp-upload__dd {
  background: #ffffff;
  border-radius: 8px;
}
.tab-pane {
  margin: 10px;
}
</style>
