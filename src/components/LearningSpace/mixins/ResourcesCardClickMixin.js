export default {
  methods: {
    onCardClick(v) {
      this.$emit("card-click", v);
    },
    onSubTitleClick(v) {
      this.$emit("card-subtitle-click", v);
    }
  }
};
