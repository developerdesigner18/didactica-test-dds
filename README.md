# Didactica

This plugin allows user to add inbuilt styleguides using bootstrap-vue in our application. It is a wrapper added to the bootstrap styleguide

## Installation

Install the dependencies:

```bash
npm install
```

Run in local

```bash
npm run serve
```

Run storybook in local

```bash
npm run storybook
```

Build library files

```bash
npm run build-library
```

## Usage

Here are list of components that has been added to the library

1. Course Card
2. Button

To add components to the Single File Component

```html
<lxp-course-card></lxp-course-card> <LxpCourseCard></LxpCourseCard>
```

## Documentation Index

- [Release Process](https://github.com/WHOAcademy/didactica/blob/main/docs/release-process.md)

## Open Issues

- Image assets are not resolved(throws 404) when imported in projects. As a work around all image assets are uploaded to Azure Storage Container and refered as an absolute URL here. Please see the below links for more details.
  <https://forum.vuejs.org/t/resolved-vue-cli-lib-images-not-showing-when-importing-in-another-project/54162>
  <https://github.com/webpack/webpack/issues/7353>
  <https://stackoverflow.com/questions/51523450/vue-cli-service-build-target-lib-loses-images-path-when-imported-as-lib>
