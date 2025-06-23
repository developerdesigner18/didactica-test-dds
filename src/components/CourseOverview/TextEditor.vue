<template>
  <div
    :class="[
      'lxp-text_editor',
      {
        'lxp-text_editor__error': showError,
        'lxp-text_editor__focus': hasFocus
      }
    ]"
  >
    <label class="lxp-text_editor--label" v-if="label">{{ label }}</label>
    <div
      :class="['quill-editor', { 'lxp-text_editor--label': label !== '' }]"
      ref="editor"
      :id="id"
      @paste="onPaste"
    ></div>
    <div
      :class="['lxp-text_editor__footer', { 'has-support-text': cSupportText }]"
    >
      <p v-if="cSupportText" class="lxp-editor__footer--support-text">
        {{ cSupportText }}
      </p>
      <div class="lxp-editor__footer--limit" v-if="limit != 0">
        {{ length }}/{{ limit }}
      </div>
    </div>
  </div>
</template>
<script>
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css";

export default {
  props: {
    id: {
      type: String,
      default: "htmlEditor"
    },
    value: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Type something in here!"
    },
    limit: {
      type: Number,
      default: 100
    },
    hasError: {
      type: Boolean,
      default: false
    },
    supportText: {
      type: String,
      default: null
    },
    hideError: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      hasFocus: false,
      length: 0,
      cSupportText: "",
      showError: false
    };
  },
  mounted() {
    this.initEditor();
  },
  watch: {
    supportText(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.cSupportText = newValue;
      }
    },
    hasError(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.showError = newValue;
      }
    },
    hideError() {
      this.clearErrorMessage();
    }
  },
  methods: {
    initEditor() {
      var _this = this;
      const Link = Quill.import("formats/link");
      Link.PROTOCOL_WHITELIST = [
        "http",
        "https",
        "mailto",
        "tel",
        "radar",
        "rdar",
        "smb",
        "sms"
      ];

      class CustomLinkSanitizer extends Link {
        static sanitize(url) {
          const sanitizedUrl = super.sanitize(url);
          if (!sanitizedUrl || sanitizedUrl === "about:blank") {
            return sanitizedUrl;
          }

          const hasWhitelistedProtocol = this.PROTOCOL_WHITELIST.some(
            (protocol) => sanitizedUrl.startsWith(protocol)
          );
          if (hasWhitelistedProtocol) {
            return sanitizedUrl;
          }
          return `https://${sanitizedUrl}`;
        }
      }
      Quill.register(CustomLinkSanitizer, true);
      var icons = Quill.import("ui/icons");
      icons["bold"] = "";
      icons["italic"] = "";
      icons["link"] = "";
      icons["list"] = "";

      this.editor = new Quill(this.$refs.editor, {
        modules: {
          toolbar: [
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"]
          ]
        },
        theme: "bubble",
        formats: [
          "bold",
          "underline",
          "header",
          "italic",
          "link",
          "list",
          "strike"
        ],
        placeholder: this.placeholder,
        scrollingContainer: "#scrolling-container"
      });
      this.editor.root.innerHTML = this.value;
      this.editor.on("text-change", function () {
        return _this.update();
      });
      var tooltip = this.editor.theme.tooltip;
      var input = tooltip.root.querySelector("input[data-link]");
      input.dataset.link = "  Paste link here and press enter";
      var self = this;

      this.editor.on("selection-change", function (range, oldRange) {
        if (range === null && oldRange !== null) {
          self.hasFocus = false;
        } else if (range !== null && oldRange === null) {
          self.hasFocus = true;
        }
      });
    },
    update: function update() {
      const currentLength = this.editor.getLength();

      if (currentLength > this.limit + 1) {
        this.editor.deleteText(this.limit, currentLength);
      } else {
        this.length = currentLength - 1;
        this.$emit(
          "input",
          this.editor.getText() ? this.editor.root.innerHTML : ""
        );
      }
      if (currentLength <= 0) {
        this.editor.clearContents();
      }
    },
    onPaste(e) {
      if (this.editor.getLength().length > this.limit + 1) {
        e.preventDefault();
        this.showError = true;
        this.cSupportText =
          "Sorry, your text is too long. Please make it shorter.";
      } else {
        this.showError = false;
        this.cSupportText = "";
      }
    },
    clearErrorMessage() {
      this.showError = false;
      this.cSupportText = "";
    }
  }
};
</script>
<style lang="scss">
.lxp-text_editor {
  background: $brand-primary-75;
  border-radius: 10px;
  border: 1px solid transparent;
  &.lxp-text_editor__focus {
    border: 1px solid $brand-primary !important;
    background: $brand-primary-100;
    .ql-editor {
      background: $brand-primary-100;
    }
  }
  &.lxp-text_editor__error {
    border: 2px solid $brand-error-400 !important;
  }
  .lxp-text_editor--label {
    @include label-medium();
    padding: 16px 0 0 16px;
    margin-bottom: 0;
  }

  a:has(.ql-out-top) {
    position: absolute !important;
  }
  .quill-editor {
    padding: 10px;
    &.lxp-text_editor--label {
      padding-top: 0;
    }
    .ql-toolbar {
      z-index: 1 !important;
      width: 250px !important;
      border-radius: 10px;
      background: $brand-primary;
      overflow: visible;
    }
    .ql-editor.ql-blank::before {
      font-style: normal;
      @include body-regular(400, $brand-neutral-300);
    }
    .ql-bold {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/bold-text.svg") !important;
    }
    .ql-bold.ql-active {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/bold-text-hover.svg") !important;
    }
    .ql-bold:hover {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/bold-text-hover.svg") !important;
    }

    .ql-italic {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/italic-text.svg") !important;
    }
    .ql-italic.ql-active {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/italic-text-hover.svg") !important;
    }
    .ql-italic:hover {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/italic-text-hover.svg") !important;
    }
    .ql-link {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/add-link.svg") !important;
    }
    .ql-list[value="ordered"] {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/numbered-list.svg") !important;
    }
    .ql-list[value="ordered"].active {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/numbered-list-hover.svg") !important;
    }
    .ql-list[value="ordered"]:hover {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/numbered-list-hover.svg") !important;
    }
    .ql-list[value="bullet"] {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/bulleted-list.svg") !important;
    }
    .ql-list[value="bullet"].active {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/bulleted-list-hover.svg") !important;
    }
    .ql-list[value="bullet"]:hover {
      background: no-repeat scroll 50% 50% transparent !important;
      background-image: url("https://files.lxp.academy.who.int/didactica/assets/images/text-editor/bulleted-list-hover.svg") !important;
    }
  }
  input {
    background: #fff !important;
    border-radius: 10px !important;
    padding: 8px 16px !important;
    border: none !important;

    color: $brand-neutral-700 !important;
  }
  button {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  &:hover {
    background: $brand-primary-100;
    .ql-editor {
      background: $brand-primary-100;
    }
  }
  .lxp-text_editor__footer {
    display: flex;
    justify-content: flex-end;
    &.has-support-text {
      justify-content: space-between;
    }
    .lxp-editor__footer--support-text,
    .lxp-editor__footer--limit {
      @include label-medium;
      color: $brand-neutral-300;
      margin-bottom: 0;
      padding: 4px 0;
    }
    .lxp-editor__footer--support-text {
      color: $brand-error-400 !important;
      padding-left: 5px;
      margin-top: 3px;
    }
  }

  .ql-container.ql-bubble:not(.ql-disabled) a::before {
    background-color: $brand-primary;
    overflow: visible !important;
    position: absolute !important;
  }

  .ql-tooltip-arrow {
    display: none !important;
  }

  .ql-editor {
    border: none;
    height: 100%;
    width: 100%;
    overflow-y: visible;
    overflow-anchor: none;
    font-size: 16px;
    overflow-x: hidden;
    font-style: normal;
    font-weight: 400;
    padding: 0;
    background: $brand-primary-75;

    ul {
      padding: 0;
    }
    &::placeholder {
      color: $brand-neutral-300;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 24px; /* 150% */
      letter-spacing: 0.25px;
    }
  }
  ::-webkit-scrollbar {
    background: $brand-neutral-75 !important;
    width: 4px;
    border-radius: 8px 8px 0px 0px;
    flex: 1 0 0;
    margin-right: 10px;
    left: 40%;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    width: 4px;
    border-radius: 10px;
    left: 40%;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $brand-neutral-300;
    border-radius: 10px;
    width: 4px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: $brand-neutral-700;
  }
}
</style>
