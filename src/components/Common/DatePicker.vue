<template>
  <div class="lxp-datepicker">
    <b-form-datepicker
      :class="className"
      v-b-tooltip.hover.bottom
      :title="title"
      :button-variant="buttonVariant"
      id="datepicker"
      v-model="selectedDate"
      :button-only="buttonOnly"
      :hide-header="hideHeader"
      :placeholder="placeholder"
      :min="minDate"
      :max="maxDate"
      :disabled="disabled"
    >
      <template v-slot:button-content>
        <img
          class="calendar__icon"
          src="https://files.lxp.academy.who.int/didactica/assets/images/datepicker/calendar.svg"
          alt="calendar"
          loading="lazy"
        />
      </template>
    </b-form-datepicker>
  </div>
</template>
<script>
import { toDate } from "../../dateFormat";
export default {
  props: {
    title: {
      type: String,
      default: "Pick Date"
    },
    className: {
      type: String,
      default: "datepicker__div"
    },
    buttonVariant: {
      type: String
    },
    placeholder: {
      type: String,
      default: ""
    },
    initialDate: {
      type: String,
      default: "2000-01-01"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hideHeader: {
      type: Boolean,
      default: true
    },
    buttonOnly: {
      type: Boolean,
      default: true
    },
    min: {
      type: [Date, Number],
      default: function () {
        return toDate("1920-01-01");
      }
    },
    max: {
      type: [Date, Number],
      default: function () {
        // returns same as moment().subtract(1, "year").endOf("year").toDate()
        return new Date(new Date().getFullYear() - 1, 12, 0, 23, 59, 59);
      }
    }
  },
  data() {
    return {
      selectedDate: "2000-01-01"
    };
  },
  computed: {
    minDate() {
      return new Date(this.min);
    },
    maxDate() {
      return new Date(this.max);
    }
  },
  watch: {
    dob(value) {
      this.$validator.validate("dob", value);
    },
    initialDate() {
      // returns same as moment(this.initialDate).format("YYYY-MM-DD")
      this.selectedDate = new Date(this.initialDate)
        .toISOString()
        .split("T")[0];
    },
    selectedDate() {
      this.$emit("date-Selected", this.selectedDate);
    }
  }
};
</script>
<style lang="scss">
.lxp-datepicker {
  .datepicker__div {
    border: 2px solid $brand-primary !important;
    height: calc(3.5rem + 2px);
    border-radius: 40px !important;
    background-color: $brand-primary-75 !important;
    &:hover {
      background-color: $brand-primary-100 !important;
    }
    .calendar__icon {
      margin: 2px;
    }
  }
  #datepicker__value_ {
    display: none !important;
  }
  .b-calendar-header {
    display: none;
  }
  .calendar-icon__mob {
    padding: 0;
  }
  .mobile__datepicker {
    height: calc(3.5rem + 2px);
    padding: 12px 6px !important;
    border: none;
    background: $brand-primary-75;
    border-radius: 8px;
    @include body-regular($font-color: $brand-neutral-700, $font-weight: 400);
  }
}
</style>
