## Release Steps

1. Merge all related PRs to master
2. On Master, run `git pull`
3. Bump the version on package.json
4. Run `npm run package` (npm install is not necessary)
5. Run `git commit` with the version number as the commit message i.e: "2.0.1"
6. Run `git push`
7. Run `npm publish`
8. Create a release on Github with the following template:

Tag name: 2.0.1
Title: 2.0.1

Description:

-   Copy the release notes from the merged PRs and paste all of them here.

9. Announce on #web-all channel on Slack:

<pre>
*Type-Checking Release*
*2.0.1 Release*

```
npm install @fab1o/type-checking
```

https://github.bamtech.co/fed-packages/dss-type-checking/releases
https://github.bamtech.co/pages/fed-packages/dss-type-checking
</pre>
