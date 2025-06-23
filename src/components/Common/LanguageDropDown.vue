<template>
  <div class="lx-dropdown" :class="{ selected: isSelected }">
    <b-dropdown variant="link" no-caret>
      <template #button-content>
        <ButtonContent
          class="lang_btn_content"
          :text="text"
          :selected="selected"
          :variant="variant"
        />
      </template>
      <b-dropdown-item
        :class="{
          'lx-dropdown__selected-item': selected
            ? o.value === selected.value
            : false
        }"
        v-for="(o, i) in options"
        :key="i"
        href="javascript:;"
        @click="onChange(o)"
        >{{ o.text }}</b-dropdown-item
      >
    </b-dropdown>
  </div>
</template>

<script>
import { BDropdown, BDropdownItem } from "bootstrap-vue";
import ButtonContent from "./LanguageDropDown/ButtonContent.vue";
export default {
  props: {
    text: {
      type: String,
      default: "Drop down"
    },
    options: {
      type: Array,
      default: () => {
        return [
          {
            value: 1,
            text: "Option 1"
          }
        ];
      }
    },
    defaultValue: [String, Number],
    variant: {
      type: String,
      default: "default"
    }
  },
  components: {
    "b-dropdown": BDropdown,
    "b-dropdown-item": BDropdownItem,
    ButtonContent
  },
  data() {
    return {
      selected: null
    };
  },
  computed: {
    isSelected() {
      if (this.selected) {
        return this.selected.value !== this.defaultValue;
      } else {
        return false;
      }
    }
  },
  watch: {
    selected(val) {
      this.$emit("onSelect", val);
    }
  },
  created() {
    this.updateDefaultValue();
  },
  methods: {
    updateDefaultValue() {
      if (this.defaultValue) {
        let defaultSelection = this.options.filter(
          (o) => o.value === this.defaultValue
        );
        this.selected =
          defaultSelection.length === 1 ? defaultSelection[0] : null;
      }
    },
    onChange(selectedOption) {
      this.selected = selectedOption;
    }
  }
};
</script>
<style lang="scss" scoped>
.lx-dropdown {
  display: inline-block;
  border-radius: 4px;
}
.lang_btn_content {
  border-radius: 4px;
  padding: 4px 8px;

  &:hover {
    background: $brand-primary-100;
  }
  &:active {
    background: #fff;
  }
}
/* rtl layout */
[dir="rtl"] {
  .lx-dropdown {
    text-align: right;
  }
}
</style>
<style scoped>
.lx-dropdown >>> .dropdown-toggle {
  padding: 0px 8px;
  text-decoration: none;
}
.lx-dropdown >>> .dropdown-toggle:hover,
.lx-dropdown >>> .dropdown-toggle:focus {
  text-decoration: none;
  box-shadow: none;
  background: $brand-primary-100;
}

.lx-dropdown >>> .dropdown-menu {
  min-width: 180px;
  background: #ffffff;
  box-shadow: 0px 4px 8px 3px rgba(0, 0, 0, 0.15),
    0px 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  border: none;
  padding: 8px;
}

.lx-dropdown >>> .dropdown-menu .dropdown-item {
  font-weight: 500;
  color: #191c1d;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 32px 8px 8px;
  border-radius: 4px;
}
.lx-dropdown >>> .dropdown-menu .dropdown-item:hover {
  background: #d6e4fa;
}
.lx-dropdown
  >>> .dropdown-menu
  .lx-dropdown__selected-item
  .dropdown-item::after {
  position: absolute;
  display: inline-block;
  content: "";
  background: url("https://files.lxp.academy.who.int/didactica/assets/images/language-dropdown/tick-black.svg")
    no-repeat;
  width: 30px;
  height: 30px;
  right: 0;
  margin-top: 4px;
}

/* rtl layout */
[dir="rtl"] .lx-dropdown >>> .dropdown-menu .dropdown-item {
  text-align: right;
  padding: 8px 8px 8px 32px;
}

[dir="rtl"]
  .lx-dropdown
  >>> .dropdown-menu
  .lx-dropdown__selected-item
  .dropdown-item::after {
  left: 0;
  right: auto;
  margin-left: 15px;
}
</style>
