# Release Process

Once the code is merged to `main` branch, for us to use this in other projects, we need to release it. Please note that **we need to build `didactica` ( `npm run build-library` ) and commit the `dist` files** in order to share the latest changes to other projects. We can follow the below steps to release and integrate `didactica` to other projects.

- Create a new tag ( you can bump the previous tag version number <https://github.com/WHOAcademy/didactica/tags> use semantic versioning) from `main` branch.
- Update the `didactica` tag version to the newly created tag in the project dependency list which `didactica` will be installed and run `npm install` to update the local packages and verify your changes are working local.
- Once the changes are verified in local then we can commit the updated `package.json` `package-lock.json` to deploy the changes.

For example, if we want to install the latest changges to this repo <https://github.com/WHOAcademy/learning-experience-platform/blob/master/package.json#L32> then

- Update the `didactica` version in the `package.json` file
- Run `npm install` to install the updated packages
- Test it in local
- Once verified, bump the package version, and commit both the `package.json` and `package-lock.json` file.

## File URL

Whenever we refer to the assets from azure storage we need to point to our DNS `https://files.lxp.academy.who.int/` instead of the blob URL `https://whoalxppublicstorage.blob.core.windows.net/`

i.e <https://files.lxp.academy.who.int/didactica/assets/images/modal/close.svg>

## Some PRs for reference

- <https://github.com/WHOAcademy/learning-experience-platform/pull/410/files#diff-7ae45ad102eab3b6d7e7896acd08c427a9b25b346470d7bc6507b6481575d519L32-R32>
- <https://github.com/WHOAcademy/learning-experience-platform/commit/a78d2047fbef2d8ce40dfbaf8e3fdbb1ded44c67>
