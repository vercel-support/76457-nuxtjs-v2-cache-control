# 76457-nuxtjs-v2-cache-control

This is an example showcasing cache-control with Nuxt.js SSR using custom [servermiddleware](https://github.com/nuxt/vercel-builder#servermiddleware) + [serverfiles](https://github.com/nuxt/vercel-builder#serverfiles).

## Cache-Control Headers

Nuxt.js' [Vercel builder](https://github.com/nuxt/vercel-builder) bundles everything route into a single serverless function and requires `cache-control` header to be set internally instead of using `vercel.json`.

Vercel's edge will handle all the caching internally based on the `cache-header` provided by the `serverMiddleware` while always sending `public, max-age=0, must-revalidate` to frontend browsers (see https://github.com/nuxt/vercel-builder/issues/149).

### serverMiddlewares

In `server-middleware`, there are 2 middlewares.

The `cache-headers.js` injects the required `cache-control` header to the Nuxt.js responses.

The `add-headers.js` injects a few other headers into Nuxt.js responses for demostration purposes.

It is possible to inspect the requested path in `cache-headers.js` middleware to serve different `cache-control` headers for different routes.

`serverFiles` is used in `vercel.json` to bundle files inside `/server-middleware` into the final serverless function (https://github.com/vercel-support/76457-nuxtjs-v2-cache-control/blob/master/vercel.json#L6-L8).


## Outcomes

### Initial Request

![CleanShot 2022-04-07 at 17 37 05@2x](https://user-images.githubusercontent.com/179761/162190866-72859f4d-4971-4938-afe2-f39d6079c839.png)

Upon first visit of https://76457-nuxtjs-v2-cache-control.vercel-support.app/about, you will notice that:

1. `x-vercel-cache` is MISS because this is an uncached SSR response
2. `cache-control` is just `public, max-age=0, must-revalidate` (see [above](#Cache-Control-Headers))
3. Random headers injected by `add-headers.js` are showing up

### Subsequent Requests

![CleanShot 2022-04-07 at 17 37 56@2x](https://user-images.githubusercontent.com/179761/162190882-b694548a-77e9-4c3d-97de-710df6cf83e2.png)

1. `x-vercel-cache` is HIT
2. `cache-control` is still `public, max-age=0, must-revalidate` (see [above](#Cache-Control-Headers))
3. Random headers injected by `add-headers.js` are missing because these headers are not cached by the static content stored in CDN
