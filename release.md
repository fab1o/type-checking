# Release Steps

### Merging PRs

1. Merge all related PRs to master branch
2. On master branch, run `git pull`

### Making the Release

1. On master branch, bump the version on package.json: `npm version [major|minor|patch]`
2. Run `npm run package`
3. Run `git commit` with the version number as the commit message i.e: "4.0.0"
4. Run `git push && git push --tags --no-verify`

#### Publish

1. Run `npm publish`
1. Create a release on Github with the following template:

    - Select the tag that was just created

        Title: `4.0.0`

        Description: Copy the release notes from the merged PRs and paste all of them here.
