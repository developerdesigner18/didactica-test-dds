<template ref="courseOverview">
  <div class="overview_wrapper">
    <ValidationObserver ref="courseOverview-observer">
      <b-container
        fluid
        class="ov-container"
        :class="[
          'ov-container',
          { ov_borderd: isEdit },
          { ov_borderless: !isEdit }
        ]"
      >
        <div v-if="isEdit" class="ov-heading_txt sd_heading">
          Short Description
        </div>
        <div v-if="isEdit" class="ov-content_txt">
          The course short description should be a clear description of the
          primary learning outcome. It should be entice learners to sign up.
        </div>
        <div class="ov-editor__form">
          <ValidationProvider
            name="Short Description"
            :rules="{ isNotEmpty, required }"
            v-slot="{ errors }"
          >
            <LxpTextEditor
              id="short_description"
              v-if="isEdit"
              class="lxp-editor"
              placeholder="Examples: 'How quickly and confidently can you recognise signs and symptoms of acute, life-threatening illness or injury and decide what to do next?' 'Learn how to analyse, interpret, and present routine tuberculosis (TB) surveillance data and how to make use of your findings.*"
              v-model="form.short_description"
              :limit="500"
              :hasError="errors[0] ? true : false"
              :supportText="errors[0] ? errors[0] : ''"
              :hideError="hideError"
            />

            <div
              class="ov-viewer sd"
              v-else-if="form.short_description"
              v-html="form.short_description"
            ></div>
          </ValidationProvider>
        </div>
        <div
          v-if="isEdit || (form.info !== undefined && form.info.length > 0)"
          class="ov-heading_txt info_card_gap"
        >
          <div>
            {{ titleKeys["what_will_you_learn"] ?? "What you will learn" }}
          </div>
        </div>
        <div class="ov-content_txt" v-if="isEdit">
          Please keep your message short and concise to make it easy for your
          audience to understand. Use icons to help convey your message quickly
          and effectively. Icon specs: Size: 192x192px; Format: SVG or PNG with
          transparent background; max size: 1mb.
        </div>
        <div v-if="uploadError" class="ov-img__err-msg">
          <img
            alt="warning"
            src="https://files.lxp.academy.who.int/didactica/assets/images/course-overview/warning.svg"
            loading="lazy"
          />
          {{ uploadError }}

          <LxpButton
            class="ov-img__err-msg__close"
            variant="link"
            @click="uploadError = ''"
          >
            <img
              src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
              alt="close"
              loading="lazy"
            />
          </LxpButton>
        </div>

        <b-row
          :class="[
            'ov-info_card__wrapper',
            {
              pq: !isEdit && form.info.length > 0
            }
          ]"
        >
          <b-col
            v-for="(info, index) in form.info"
            :key="'info-' + index + '-' + info.id"
            :class="getColClass(index)"
          >
            <div class="ov-info_card">
              <b-card class="info_card">
                <b-card-body class="info-card_body">
                  <div class="info-card_body_flex">
                    <div class="info-card_img__upload">
                      <LxpUploadFile
                        ref="uploadFileComponent"
                        :index="index"
                        dragDropClass="ls-create__image"
                        :accept="['png', 'svg']"
                        :authToken="token"
                        :validateFileDimension="true"
                        :uploadedFileUrl="info.image_url"
                        :fileUploadUrl="getUploadUrl()"
                        @file-url="onInfoImgChange"
                        :key="'infoFileUpload-' + index"
                        @file-upload-error="handleFileUploadError"
                        v-if="isEdit"
                      />
                      <div
                        class="info-card_img__viewer"
                        :class="{
                          default__upload: info.image_url == ''
                        }"
                        v-else
                      >
                        <img
                          :key="'infoImage-' + index"
                          :src="
                            info.image_url ? info.image_url : getImageUrl(index)
                          "
                          alt="upload"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <ValidationProvider name="Info Description" class="w-100">
                      <LxpTextEditor
                        v-if="isEdit"
                        :key="'infoDesciption-' + index"
                        class="lxp-editor des hide-toolbar"
                        placeholder="Insert Description here"
                        v-model="info.description"
                        :limit="500"
                        :hideError="hideError"
                      />
                      <div
                        class="info-card_d__txt"
                        v-else-if="info.description"
                        v-html="info.description"
                      ></div>
                    </ValidationProvider>
                  </div>
                  <LxpButton
                    v-if="isEdit"
                    class="info-card__close"
                    variant="link"
                    @click="removeInfoWrapper(index)"
                  >
                    <img
                      src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
                      alt="close"
                      loading="lazy"
                    />
                  </LxpButton>
                </b-card-body>
              </b-card>
            </div>
          </b-col>
          <b-col
            class="col-12 ov-info_card__mobile"
            v-for="(info, index) in form.info"
            :key="'infoMob-' + index"
          >
            <div class="info__card--inner" v-if="!isEdit">
              <div class="info__card--image">
                <img
                  :key="'infoImage-' + index"
                  :src="info.image_url ? info.image_url : getImageUrl(index)"
                  alt="upload"
                  loading="lazy"
                />
              </div>
              <div
                class="info__card--text"
                v-if="info.description"
                v-html="info.description"
              ></div>
            </div>
          </b-col>
        </b-row>

        <LxpButton
          v-if="isEdit"
          variant="outline-primary"
          block
          class="add_info-section"
          @click="addInfoSection"
          :disabled="form.info.length >= 6"
        >
          <img
            alt="add"
            :class="{
              'add_section-disabled': form.info.length >= 6
            }"
            class="add_section_icon"
            src="https://files.lxp.academy.who.int/didactica/assets/images/course-overview/add-blue.svg"
            loading="lazy"
          />
          Add Section
        </LxpButton>
        <div class="hr_divider" v-if="!isEdit && form.info.length > 0">
          <hr />
        </div>

        <div
          v-if="
            isEdit ||
            (form.prerequisite !== undefined &&
              form.prerequisite.length > 0 &&
              form.prerequisite !== '<p><br></p>')
          "
          class="ov-heading_txt"
        >
          {{ titleKeys["prerequisite_knowledge"] ?? "Prerequisite knowledge" }}
        </div>
        <div class="ov-editor__form">
          <ValidationProvider name="Prerequisite knowledge" rules="">
            <LxpTextEditor
              id="txtPrerequisite"
              v-if="isEdit"
              class="lxp-editor"
              placeholder="Insert description here"
              v-model="form.prerequisite"
              :limit="800"
              :key="'prerequisiteEditor-' + form.index"
              :hideError="hideError"
            />
            <div
              class="ov-editor__txt ov-viewer pq"
              v-else-if="
                form.prerequisite && form.prerequisite !== '<p><br></p>'
              "
              v-html="form.prerequisite"
            ></div>
          </ValidationProvider>
        </div>
        <div v-if="isEdit" class="ov-heading_txt">Who this course is for</div>
        <div
          v-else-if="form.audience && form.audience !== '<p><br></p>'"
          class="ov-heading_txt"
        >
          {{ titleKeys["who_this_course_is_for"] ?? "Who this course is for" }}
        </div>
        <div class="ov-editor__form">
          <ValidationProvider name="audience" rules="">
            <LxpTextEditor
              v-if="isEdit"
              class="lxp-editor"
              placeholder="Insert description here"
              v-model="form.audience"
              :limit="2000"
              :key="'audienceEditor-' + form.index"
              :hideError="hideError"
            />
            <div
              class="ov-editor__txt ov-viewer aud"
              v-else-if="form.audience && form.audience !== '<p><br></p>'"
              v-html="form.audience"
            ></div>
          </ValidationProvider>
        </div>

        <div
          v-if="isEdit || (form.about !== undefined && form.about.length > 0)"
          class="ov-heading_txt"
        >
          {{ titleKeys["about"] ?? "About this course" }}
        </div>
        <div class="ov-content_txt" v-if="isEdit">
          Please keep your descriptions short and concise to make it easy for
          your audience to understand. Use images to help convey your message
          quickly and effectively. Images with 1024x928px work best and format
          should be: .jpeg or .png.
        </div>
        <b-row>
          <b-col>
            <div v-if="uploadAboutError" class="ov-img__err-msg">
              <img
                alt="warning"
                src="https://files.lxp.academy.who.int/didactica/assets/images/course-overview/warning.svg"
                loading="lazy"
              />
              {{ uploadAboutError }}

              <LxpButton
                variant="link"
                class="ov-img__err-msg__close"
                @click="uploadAboutError = ''"
              >
                <img
                  src="https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg"
                  alt="close"
                  loading="lazy"
                />
              </LxpButton>
            </div>
          </b-col>
        </b-row>

        <div
          :class="[
            'ov-about_card__wrapper',
            {
              about_divider:
                !isEdit &&
                form.about.length > 0 &&
                ((form.prerequisite !== '' &&
                  form.prerequisite !== '<p><br></p>') ||
                  (form.audience !== '' && form.audience !== '<p><br></p>') ||
                  (form.assessment_and_awards !== '' &&
                    form.assessment_and_awards !== '<p><br></p>') ||
                  (form.other_info !== '' && form.other_info !== '<p><br></p>'))
            }
          ]"
        >
          <div
            class="ov-about_card"
            v-for="(about, i) in form.about"
            :key="'about-' + i + '-' + about.id"
          >
            <b-row
              class="ov-about_card__position"
              :class="{
                'ov-about_card__left': about.order % 2 === 1,
                'ov-about_card__right': about.order % 2 === 0
              }"
            >
              <b-col
                v-if="isEdit || about.image_url"
                xs="12"
                sm="12"
                md="12"
                lg="12"
                xl="4"
                class="ov-about_card__img_upload"
                ><LxpDragDrop
                  :id="'aboutDragDrop-' + i"
                  v-if="isEdit"
                  class="drag_drop_card"
                  noteText="Images with 1024x928px work best and format should be: .jpeg or .png."
                  dragDropClass="ls-create__image"
                  :key="'aboutDragDrop-' + i"
                  :index="i"
                  :accept="['jpeg', 'png', 'jpg']"
                  :authToken="token"
                  :uploadedFileUrl="about.image_url"
                  @remove-file="onRemoveFile(i)"
                  @file-url="onAboutImageChange"
                  :fileUploadUrl="getUploadUrl()"
                />

                <div
                  class="ov-about_card__img_viewer"
                  v-else-if="about.image_url"
                >
                  <img :src="about.image_url" alt="" loading="lazy" />
                </div>
              </b-col>
              <b-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                xl="8"
                :class="{
                  'col-8': isEdit || about.image_url,
                  'col-12 no_img_view': !isEdit && !about.image_url
                }"
                class="ov-about_card__editor"
              >
                <ValidationProvider
                  name="About Description"
                  v-slot="{ errors }"
                  :rules="i === 0 ? { isNotEmpty, required } : ''"
                >
                  <LxpTextEditor
                    :id="'abouttxt-' + i"
                    v-if="isEdit"
                    class="lxp-editor abt"
                    placeholder="Insert your content here."
                    v-model="about.description"
                    :limit="800"
                    :key="'aboutDescription-' + i"
                    :hasError="errors[0] ? true : false"
                    :supportText="errors[0] ? errors[0] : ''"
                    :hideError="hideError"
                  />
                  <div
                    class="ov-about_card__txt_viewer"
                    v-else-if="about.description"
                    v-html="about.description"
                  ></div>
                </ValidationProvider>
              </b-col>

              <div class="ov-about_card__remover" v-if="isEdit && i >= 1">
                <span @click="removeAboutWrapper(i)"
                  ><img
                    alt="delete"
                    src="https://files.lxp.academy.who.int/didactica/assets/images/course-overview/delete.svg"
                    loading="lazy"
                  />
                  Remove section</span
                >
              </div>
            </b-row>
          </div>
          <div
            class="ov-about_card__mobile"
            v-for="(about, i) in form.about"
            :key="'aboutMobile-' + i"
          >
            <div v-if="about.image_url" class="ov-about_card__img_viewer">
              <img :src="about.image_url" alt="" loading="lazy" />
            </div>
            <div
              v-if="about.description"
              class="ov-about_card__txt_viewer"
              v-html="about.description"
            ></div>
          </div>
        </div>
        <LxpButton
          v-if="isEdit"
          class="ov-about_card__add"
          variant="outline-primary"
          @click="addAboutSection"
          block
          :disabled="form.about.length >= 12"
        >
          <img
            alt="add"
            :class="{ 'add_section-disabled': form.about.length >= 12 }"
            class="add_section_icon"
            src="https://files.lxp.academy.who.int/didactica/assets/images/course-overview/add-blue.svg"
            loading="lazy"
          />
          Add Section
        </LxpButton>
        <div
          v-if="
            isEdit ||
            (form.assessment_and_awards !== undefined &&
              form.assessment_and_awards.length > 0 &&
              form.assessment_and_awards !== '<p><br></p>')
          "
          class="ov-heading_txt"
        >
          {{ titleKeys["assessment_and_awards"] ?? "Assessment & Awards" }}
        </div>
        <div class="ov-editor__form">
          <ValidationProvider name="Assessment & Awards" rules="">
            <LxpTextEditor
              v-if="isEdit"
              class="lxp-editor"
              placeholder="Insert your content here."
              v-model="form.assessment_and_awards"
              :limit="800"
              :key="'assessmentEditor-' + form.index"
              :hideError="hideError"
            />
            <div
              class="ov-editor__txt ov-viewer"
              :class="{
                aa:
                  !isEdit &&
                  form.other_info !== '' &&
                  form.other_info !== '<p><br></p>'
              }"
              v-else-if="
                form.assessment_and_awards &&
                form.assessment_and_awards !== '<p><br></p>'
              "
              v-html="form.assessment_and_awards"
            ></div>
          </ValidationProvider>
        </div>

        <div
          v-if="
            isEdit ||
            (form.other_info !== undefined &&
              form.other_info.length > 0 &&
              form.other_info !== '<p><br></p>')
          "
          class="ov-heading_txt"
        >
          {{ titleKeys["other_information"] ?? "Other information" }}
        </div>
        <div class="ov-editor__form">
          <ValidationProvider name="Other information" rules="">
            <LxpTextEditor
              v-if="isEdit"
              class="lxp-editor"
              placeholder="Insert description here"
              v-model="form.other_info"
              :limit="800"
              :key="'otherEditor-' + form.index"
              :hideError="hideError"
            />
            <div
              class="ov-editor__txt"
              v-else-if="form.other_info && form.other_info !== '<p><br></p>'"
              v-html="form.other_info"
            ></div>
          </ValidationProvider>
        </div>
      </b-container>
    </ValidationObserver>
    <b-container
      fluid
      class="ov-container__tags"
      v-if="isEdit && tagOptions.length > 0"
    >
      <div class="ov-heading_txt">Topic Tags</div>
      <div class="ov-content_txt">
        Improve discoverability of your course by adding tags relevant to the
        subject matter.
      </div>
      <LxpFormTags
        :value="value"
        :options="tagOptions"
        :tags="tags"
        ref="formTags"
        :disabled="disabled"
      />
    </b-container>
    <b-container v-if="isEdit" class="ov_save__btn_container" fluid>
      <LxpButton
        variant="primary"
        @click="validateForm"
        :class="{
          ov_btn__saved: isSaved,
          ov_btn__failed: isSavedFailed || validationFailed
        }"
        block
      >
        <span class="ov_save_btn__txt"
          >{{ saveStatus }}
          <span>
            <img
              v-if="isSaved"
              src="https://files.lxp.academy.who.int/didactica/assets/images/course-overview/save-check.svg"
              alt="checkmark"
              loading="lazy"
            />
            <img
              v-else-if="isSavedFailed"
              src="https://files.lxp.academy.who.int/didactica/assets/images/course-overview/360-view.svg"
              alt="view"
              loading="lazy"
            />
          </span>
        </span> </LxpButton
    ></b-container>
  </div>
</template>

<script>
import {
  LxpButton,
  LxpDragDrop,
  LxpFormTags,
  LxpTextEditor,
  LxpUploadFile
} from "../Common/index";

import axios from "axios";

import {
  ValidationObserver,
  ValidationProvider,
  extend
} from "vee-validate/dist/vee-validate.full.esm";

export default {
  components: {
    LxpButton,
    LxpDragDrop,
    LxpUploadFile,
    ValidationObserver,
    ValidationProvider,
    LxpTextEditor,
    LxpFormTags
  },

  props: {
    overviewContent: {
      type: Object,
      required: true
    },
    courseId: {
      type: String,
      required: true
    },
    courseTitle: {
      type: String
    },
    org: {
      type: String
    },
    divPosition: String,
    isEdit: {
      type: Boolean,
      default: false
    },
    token: {
      type: String,
      default: ""
    },
    urlObj: {
      type: Object
    },
    tagOptions: {
      type: Array
    },
    titleKeys: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      value: [],
      tags: [],
      selectedTags: [],
      limit: 100,
      disabled: "",
      isSaved: false,
      isSavedFailed: false,
      validationFailed: false,
      isNotEmpty: "",
      required: "",

      form: {
        course_id: "",
        index: 1,
        short_description: "",
        info: [
          { description: "", image_url: "" },
          { description: "", image_url: "" },
          { description: "", image_url: "" }
        ],
        prerequisite: "",
        audience: "",
        about: [
          { order: "1", description: "", image_url: "" },
          { order: "2", description: "", image_url: "" },
          { order: "3", description: "", image_url: "" }
        ],
        assessment_and_awards: "",
        other_info: "",
        tags: []
      },
      uploadError: "",
      uploadAboutError: "",
      hideError: false,
      baseUrl:
        "https://files.lxp.academy.who.int/didactica/assets/images/course-overview/upload-icon-"
    };
  },

  computed: {
    saveStatus() {
      if (this.isSaved) {
        return "Saved";
      } else if (this.isSavedFailed) {
        return "Something went wrong... Try again";
      } else if (this.validationFailed) {
        return "Please Fill the Mandatory Fields & Try again";
      } else {
        return "Save changes";
      }
    },
    isIndexGreaterThanThree() {
      return this.form.info.length > 3;
    }
  },
  mounted() {
    this.$root.$on("CourseOverviewSave", () => {
      this.validateForm();
    });
    extend("isNotEmpty", {
      validate: (value) => {
        if (value !== "" && value !== "<p><br></p>" && value !== "\n") {
          return true;
        }
        return false;
      },
      message: "The {_field_} is required."
    });

    extend("isAboutNotEmpty", {
      validate: (value, { i } = {}) => {
        if (i === 0) {
          if (value !== "" && value !== "<p><br></p>" && value !== "\n") {
            return true;
          }
          return false;
        }
        return true;
      },
      params: ["i"],
      message: "The {_field_} is required."
    });
  },

  created() {
    this.authToken = this.token;
    if (Object.keys(this.overviewContent).length > 0) {
      this.form = this.overviewContent;
    }
    if (this.form.tags.length > 0) {
      this.value = this.form.tags;
    } else {
      this.selectedTags = this.value;
    }
    if (this.form.about.length === 0) {
      this.form.about = [{ order: "1", description: "", image_url: "" }];
    }
  },
  methods: {
    getColClass(index) {
      let className = "col-md-12";

      switch (true) {
        case this.form.info.length >= 3 && index < 3:
        case this.form.info.length >= 6 && index >= 3 && index < 6:
        case this.form.info.length === 9 && index >= 6:
          break; // Keep className as col-md-4
        case this.form.info.length >= 2 && index < 3:
        case this.form.info.length >= 5 && index >= 3 && index < 6:
        case this.form.info.length === 8 && index >= 6:
          className = "col-md-12";
          break;
        case this.form.info.length >= 1 && index < 3:
        case this.form.info.length >= 4 && index >= 3 && index < 6:
        case this.form.info.length === 7 && index >= 6:
          className = "col-md-12";
          break;
        default:
          break;
      }

      return className + " mt-4";
    },
    validateForm() {
      if (
        this.$refs["courseOverview-observer"].validate() &&
        this.validateAboutDetails() &&
        this.validateInfoDetails()
      ) {
        this.hideError = true;
        this.validationFailed = true;
        this.$refs["courseOverview-observer"].validate().then((res) => {
          if (res) {
            this.validationFailed = false;
            this.hideError = true;
            this.saveChanges();
          }
        });
      }
    },
    validateInfoDetails() {
      const infoLen = this.form.info.length;
      this.uploadError = "";

      const contentLen = this.form.info.filter(
        (i) => i.description !== "" && i.description !== "<p><br></p>"
      ).length;
      if (contentLen !== 0) {
        if (contentLen !== infoLen) {
          this.uploadError = "Please add text for all cards";
        }
      }
      if (this.uploadError !== "") {
        this.validationFailed = true;
        setTimeout(() => {
          this.uploadError = "";
        }, 20000);
      }

      return this.uploadError === "" ? true : false;
    },
    validateAboutDetails() {
      if (this.form.about.length > 1) {
        this.uploadAboutError = "";

        const contentLen = this.form.about.filter(
          (i) => i.description === "" || i.description === "<p><br></p>"
        ).length;

        if (contentLen !== 0) {
          this.uploadAboutError = "Please add text for the card";
        }
        if (this.uploadAboutError !== "") {
          this.validationFailed = true;
          setTimeout(() => {
            this.uploadAboutError = "";
          }, 20000);
        }
        return this.uploadAboutError === "" ? true : false;
      } else {
        return true;
      }
    },
    onAboutImageChange(data) {
      this.form.about[data.index].image_url = data.image;
    },
    onRemoveFile(i) {
      this.form.about[i].image_url = "";
    },
    getImageUrl(index) {
      return `${this.baseUrl}${index}.svg`;
    },
    saveChanges() {
      this.isSavedFailed = false;

      var tId = 0;
      var tImage = "";
      var tDesc = "";
      const abt = this.form.about
        .filter((i) => i.description !== "" && i.description !== "<p><br></p>")
        .map((a, i) => {
          tId = a.id ? a.id : 0;
          tImage = a.image_url ? a.image_url : "";
          tDesc = "";
          if (a.description && a.description !== "<p><br></p>") {
            tDesc = a.description;
          }

          let abtObj = {
            image: tImage,
            description: tDesc,
            order: i + 1
          };

          if (tId > 0) {
            abtObj.id = tId;
          }

          return abtObj;
        });

      const ifo = this.form.info
        .filter((i) => i.description !== "" && i.description !== "<p><br></p>")
        .map((b, i) => {
          tId = b.id ? b.id : 0;
          tImage = b.image_url ? b.image_url : "";
          tDesc = "";
          if (b.description && b.description !== "<p><br></p>") {
            tDesc = b.description;
          }

          let ifoObj = {
            image: tImage,
            description: tDesc,
            order: i + 1
          };

          if (tId > 0) {
            ifoObj.id = tId;
          }

          return ifoObj;
        });
      var selTags = [];
      if (this.$refs.formTags) {
        selTags = this.$refs.formTags.getSelectedTags();
      }
      const data = {
        course_id: this.courseId,
        short_description: this.form.short_description,
        prerequisite: this.form.prerequisite,
        audience: this.form.audience,
        assessment_and_awards: this.form.assessment_and_awards,
        other_info: this.form.other_info,
        tags: selTags,
        about: abt,
        info: ifo
      };

      this.updateCourseOverview(data);
    },
    updateCourseOverview(data) {
      let headers = {};
      if (this.token) {
        headers = {
          headers: {
            Authorization: this.token
          }
        };
      }
      axios[this.urlObj.GET_COURSE_OVERVIEW_STATUS.method](
        this.urlObj.GET_COURSE_OVERVIEW_STATUS.url,
        headers,
        data
      ).then((res) => {
        this.overview_status = res.data.has_overview;
        this.hideError = false;
        if (this.overview_status === true) {
          this.updateOverview(data);
        } else {
          this.createOverview(data);
        }
      });
    },
    updateOverview(data) {
      let headers = {};
      if (this.token) {
        headers = {
          headers: {
            Authorization: this.token,
            "Content-Type": "application/json"
          }
        };
      }

      axios[this.urlObj.UPDATE_COURSE_OVERVIEW.method](
        this.urlObj.UPDATE_COURSE_OVERVIEW.url,
        data,
        headers
      )

        .then((res) => {
          this.$emit("updateCourseOverview", res.data);
          this.isSaved = true;
          setTimeout(() => {
            this.isSaved = false;
            this.sendSavedEvent();
          }, 5000);
        })
        .catch(() => {
          this.isSavedFailed = true;
        })
        .finally(() => {
          this.sendSavedEvent();
        });
    },

    createOverview(data) {
      let headers = {};
      if (this.token) {
        headers = {
          headers: {
            Authorization: this.token
          }
        };
      }

      axios[this.urlObj.CREATE_COURSE_OVERVIEW.method](
        this.urlObj.CREATE_COURSE_OVERVIEW.url,
        data,
        headers
      )

        .then(() => {
          this.isSaved = true;
          setTimeout(() => {
            this.isSaved = false;
            this.sendSavedEvent();
          }, 5000);
        })
        .catch(() => {
          this.isSavedFailed = true;
        })
        .finally(() => {
          this.sendSavedEvent();
        });
    },
    getUploadUrl() {
      return this.urlObj.UPLOAD_COURSES.url;
    },

    onInfoImgChange(e) {
      if (e !== "") {
        this.form.info[e.index].image_url = e.image;
      }
    },
    sendSavedEvent() {
      this.$root.$emit("CourseOverviewSaved", {
        text: this.saveStatus,
        isSaved: this.isSaved,
        isSavedFailed: this.isSavedFailed
      });
    },

    addAboutSection() {
      const order = this.form.about.length + 1;
      const id = this.getRandomId();
      const divPosition =
        order % 2 === 0 ? "ov-about_card__right" : "ov-about_card__left";
      this.form.about.push({
        divPosition,
        order,
        id,
        description: "",
        image_url: ""
      });
    },
    getRandomId() {
      return Math.floor(Math.random() * 1000 + 1) * -1;
    },
    addInfoSection() {
      const s = {
        id: this.getRandomId(),
        description: "",
        image_url: ""
      };
      this.form.info.push(s);
    },
    removeAboutWrapper(i) {
      this.form.about.splice(i, 1);
    },
    removeInfoWrapper(index) {
      this.form.info.splice(index, 1);
    },
    handleFileUploadError(error) {
      this.uploadError = error;
      setTimeout(() => {
        this.uploadError = false;
      }, 5000);
    }
  }
};
</script>

<style lang="scss" scoped>
.overview_wrapper {
  overflow: visible !important;
  overflow-y: auto;
  width: auto;
  .default__upload {
    border-radius: 50%;
    border: 1px solid #c8c8c8;
  }
  .info-card_img__viewer ::v-deep img {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 24px;
  }
  .ov-container {
    gap: 32px;
    overflow: visible;
    background: transparent;
    .ov-editor__form {
      width: 100%;
    }
    ::v-deep .ov-info_card {
      padding-right: 0 !important;
    }
    ::v-deep .btn-link:hover {
      background: none !important;
    }
    .ov-info_card__wrapper {
      ::v-deep .lxp-button.btn {
        padding: 8px !important;
      }
      .info_card {
        .info-card_header {
          text-align: center;
          .info-card_img__upload {
            width: 50%;
            position: relative;

            .info-card_img__viewer {
              width: fit-content;
              padding: 0px !important;
            }
          }
          .info-card__close {
            img {
              width: 14px;
              height: 14px;
              vertical-align: middle;
            }
            &:hover {
              background: none !important;
            }
            &:active {
              background: #fff;
            }
          }
        }
        .info-card_body_flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;
          gap: 18px;
        }
        .info-card_body {
          padding: 0px !important;
          width: 100%;
          text-align: center;
          display: flex;
          justify-content: center;
          gap: 8px;
          .info-card_d__txt {
            ::v-deep p {
              margin: 0;
            }
            @include body-regular();
            text-align: left;
            font-style: normal;
            width: 100% !important;
          }
          .des {
            height: 101px !important;
          }
        }
        &:hover {
          .info-card__close {
            display: block !important;
          }
        }
      }
    }
    .add_info-section {
      margin-top: 40px;
      .add_section-disabled {
        filter: invert(74%) sepia(12%) saturate(0%) hue-rotate(202deg)
          brightness(84%) contrast(91%);
      }
    }

    .ov-img__err-msg {
      width: 100%;
      padding: 8px 16px;
      float: left;
      gap: 16px;
      align-self: stretch;
      border-radius: 16px;
      margin-bottom: 1rem;
      border: 2px solid $brand-warning-400;
      background: $brand-warning-100;
      .ov-img__err-msg__close {
        background: transparent;
        width: 24px;
        height: 24px;
        padding: 0 5px;
        border: none;
        border-radius: 100%;
        float: right !important;
        img {
          width: 14px;
          height: 14px;
          vertical-align: middle;
        }
        &:hover {
          background: $brand-error-100;
        }
      }
    }

    .ov-editor__txt {
      @include body-regular;
    }
    .aa {
      border-bottom: 1px solid $brand-divider;
      padding-bottom: 32px;
    }
    .ov-about_card__wrapper {
      width: 100%;
      &.about_divider {
        border-bottom: 1px solid $brand-divider;
      }
      .ov-about_card {
        display: flex;
        .ov-about_card__position {
          @include flex-horizontal-center;
          flex: 1;

          margin-bottom: 2rem;
          .ov-about_card__editor {
            &.no_img_view {
              width: 100%;
            }
            padding: 5px;
            margin-bottom: 15px;
            .abt {
              height: 216px;
            }

            .ov-about_card__txt_viewer {
              @include body-regular;
              padding-left: 10px;
            }
          }
          .ov-about_card__img_upload {
            height: 233px;
            text-align: center;
            padding-bottom: 39px;
            .ov-about_card__img_viewer img {
              display: flex;
              width: 100%;
              border-radius: 24px;
              height: 232px;
              object-fit: cover;
            }
            .lxp-dd__drop--default--content {
              padding-left: 10px;
              padding-right: 10px;
            }
          }
          .ov-about_card__remover {
            padding: 0px;
            position: relative;
            text-align: right;
            padding-top: 10px;
            cursor: pointer;
            span {
              padding: 6px 14px 6px 10px;
              border-radius: 10px;
              &:hover {
                background: $brand-primary-100;
              }
            }
          }
        }
        .ov-about_card__left {
          flex-direction: row;
        }
        .ov-about_card__right {
          flex-direction: row-reverse;
        }
      }
    }
    .ov-about_card__add {
      &.focused {
        background: red !important;
      }
      .add_section-disabled {
        filter: invert(74%) sepia(12%) saturate(0%) hue-rotate(202deg)
          brightness(84%) contrast(91%);
      }
    }
    .add_section_icon {
      margin-bottom: 5px;
    }
  }
  .ov_borderd {
    border: solid 1.5px gainsboro;
    border-radius: 24px;
    background: #fff;
    padding: 32px;
    padding-top: 0px;
  }
  .ov_borderless {
    border: none;
    background: transparent;
    padding: 0px;
  }
  .ov-container__tags {
    border: solid 1.5px gainsboro;
    margin-top: 30px;
    background: #fff;
    padding: 32px;
    border-radius: 24px;
    .ov-heading_txt {
      color: $brand-neutral-900;
      @include h6;
      margin-bottom: 0.5rem;
    }
    .ov-content_txt {
      @include body-regular;
      padding-bottom: 16px;
    }
  }
  .ov_save__btn_container {
    display: flex;
    width: auto;

    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    .ov_btn__saved {
      width: 100%;
      background: $brand-success-400 !important;
    }
    .ov_btn__failed {
      background: $brand-warning-400 !important;
    }
    .ov_save_btn__txt {
      color: #fff;
    }
  }
  .lxp-modal__close {
    background: #fff;
    width: 24px;
    height: 24px;
    padding: 0 5px;
    border: none;
    border-radius: 100%;
    float: right;
    img {
      width: 14px;
      height: 14px;
      vertical-align: middle;
    }
    &:hover {
      background: $brand-primary-100;
    }
    &:active {
      background: #fff;
    }
  }
  .btn-outline-primary {
    color: $brand-primary-400 !important;
    padding: 6px 32px !important;
    &:active {
      background-color: #fff !important;
      color: $brand-primary !important;
      .add_section_icon {
        filter: brightness(0) saturate(100%) invert(13%) sepia(24%)
          saturate(6022%) hue-rotate(206deg) brightness(93%) contrast(110%);
      }
    }
    &:focus {
      background-color: #fff !important;
    }
  }
  .hr_divider {
    padding-top: 32px;
    hr {
      margin: 0 !important;
      color: black;
    }
  }
  .dropdown-menu {
    top: 4px !important;
  }
}

@media screen and (max-width: 767px) {
  .ov-container {
    background: transparent;
    border: none !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    padding-top: 0 !important;
  }

  .ov-info_card__wrapper {
    margin-top: 16px;
    .mt-4 {
      display: none !important;
    }
    .info_card {
      display: none !important;
    }
    .ov-info_card__mobile {
      &:not(:last-child) {
        margin-bottom: 24px;
      }
      .info__card--inner {
        @include flex-center;
      }
      .info__card--image {
        width: 48px;
        min-width: 48px;
        height: 48px;
        margin-right: 16px;
        @include flex-horizontal-center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .info__card--text {
        width: 100%;
        ::v-deep p {
          margin: 0;
        }
      }
      .info-mobile_max-width {
        width: 100%;
      }

      display: block !important;

      .col-9 {
        width: 86%;
      }
    }
  }
  .ov-about_card__wrapper {
    .ov-about_card__mobile {
      display: none !important;
    }
  }
}

@media screen and (min-width: 480px) and (max-width: 540px) {
  .ov-info_card__wrapper {
    .col-3 {
      max-width: 40% !important;
    }
  }
}

@media screen and (min-width: 768px) {
  .ov-info_card__wrapper {
    > .mt-4 {
      padding: 0 32px;
      &:first-child {
        margin-top: 16px !important;
      }
    }
  }
  .ov-about_card__mobile {
    display: none !important;
  }
  .ov-info_card__mobile {
    display: none !important;
  }
}
@media screen and (max-width: 512px) {
  .ov-about_card__wrapper {
    .ov-about_card {
      display: none !important;
    }
    .ov-about_card__mobile {
      display: block !important;
      margin-bottom: 2.5rem;
      .ov-about_card__img_viewer img {
        display: flex !important;
        width: 100% !important;
        border-radius: 24px !important;
        padding-top: 10px;
      }
      .ov-about_card__txt_viewer {
        width: 100% !important;
        padding-left: 10px;
      }
    }
  }
}
@media screen and (max-width: 1199px) {
  .ov-about_card__txt_viewer {
    margin-top: 1rem;
  }
}
</style>

<style lang="scss">
.overview_wrapper {
  .ov-container {
    .ov-heading_txt {
      color: $brand-neutral-900;
      @include h6;
      padding: 24px 0;
      &.info_divider {
        margin-top: 32px;
        border-top: 1px solid $brand-divider;
      }
      &.info_card_gap {
        padding-bottom: 16px;
      }
      &.sd_heading {
        padding-bottom: 16px;
      }
    }
    .ov-content_txt {
      @include body-regular;
      color: $brand-neutral-700;
      font-style: normal;
      padding-bottom: 16px;
    }
    .ov-editor__form {
      .lxp-editor {
        width: 100% !important;
        height: 136px;
      }

      .ov-viewer {
        @include body-regular;
      }
      .sd {
        border-bottom: 1px solid $brand-divider;
        padding-bottom: 32px;
      }
      .aud {
        border-bottom: 1px solid $brand-divider;
        padding-bottom: 32px;
      }
      .pq {
        border-bottom: 1px solid $brand-divider;
        padding-bottom: 32px;
      }
      .aa {
        border-bottom: 1px solid $brand-divider;
        padding-bottom: 32px;
      }
    }
    .ov-info_card__wrapper {
      .ov-info_card {
        background: transparent;
        display: inline-flex;
        width: 100%;
      }
      .info_card {
        width: 100%;
        border: none;
        background: transparent;
        .info-card_header {
          .info-card_img__upload {
            .info-card_img__viewer img {
              object-fit: cover;
              border-radius: 100px;
              height: 64px;
              width: 64px;
            }
          }
          .info-card__close {
            display: none;
            background: #fff;
            width: 24px;
            height: 24px;
            padding: 0 5px;
            border: none;
            border-radius: 100%;
            float: right;
          }
        }

        .lxp-editor.hide-toolbar .ql-toolbar {
          display: none !important;
        }
      }

      .card-body {
        padding: 0px;
      }
    }
    .ov-about_card__wrapper {
      .ov-about_card {
        .ov-about_card__position {
          .ov-about_card__img_upload {
            .lxp-dd___files--img {
              object-fit: cover;
            }
          }
        }
      }
    }
  }
}
</style>
