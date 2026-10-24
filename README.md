# @x12i/mapix-mongo-profiler usage example

Mongo collection profiling for Mapix.

This consuming application demonstrates **guard a structural profile before using it to generate metadata** using the published npm package, pinned to `1.0.0`.

## Run

Requires Node.js 24 or newer and npm. The example needs no service credentials.

```sh
npm install --ignore-scripts
npm start
```

## Example

[`src/index.mjs`](src/index.mjs) contains the complete example. Assertions check the demonstrated behavior and the program prints a small result.

## When to use the package

- Profile a Mongo collection's fields and representative values.
- Compare profiles to detect source-schema drift.

## Links

- [npm package](https://www.npmjs.com/package/@x12i/mapix-mongo-profiler)
- [Implementation monorepo](https://github.com/x12i/mapix)
- [Reviewed package source](https://github.com/x12i/mapix/tree/050d49774c2e81b3ec9daba4fb4cf6869179e5f1/packages/mongo-profiler)

The `package.json` in this repository is private to prevent accidental publication of the example application under an npm package name.

## Validation scope

The records, callers, inference outputs and backend responses in these examples are synthetic. The example checks a local consumer workflow; no database, semantic model, remote promotion, or real similarity index is contacted. A generated mapping proposal still needs human review before production use.

## Known release limitation

The pinned release reports `name` as unknown with zero presence even though both input records contain it. Its aggregation pre-fills the field values with undefined, appends the observations, and then slices back to the undefined prefix. This example detects that result and blocks downstream use. A passing example confirms this compatibility guard and sensitivity helpers; it does not establish correct value profiling. Repair and regression checks are recorded in the catalog backlog.
