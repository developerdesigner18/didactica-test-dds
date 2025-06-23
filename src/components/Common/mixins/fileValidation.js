export default {
  methods: {
    validateFileFormat(file) {
      const validFormat = this.accept.some((el) => file.type.endsWith(el));
      if (!validFormat) {
        this.errorStatus = "type-error";
        return false;
      } else {
        return true;
      }
    },
    validateFileSize(file) {
      if (file.size > this.fileSize) {
        this.errorStatus = "size-error";
        return false;
      } else {
        return true;
      }
    },
    async validateDimension(file) {
      if (this.validateFileDimension) {
        let img = new Image();
        img.src = window.URL.createObjectURL(file);
        await img.decode();
        let width = img.width,
          height = img.height;
        if (width > this.widthDimension && height > this.heightDimension) {
          this.errorStatus = "dimension-error";
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }
  }
};
