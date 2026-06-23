// hls.js ships a smaller "light" build (drops EME/DRM, subtitles, and alternate
// audio — none of which the muted background films use) under the ./light
// subpath, but that subpath has no bundled .d.ts. Its public API is the same
// class as the full build for our usage, so we reuse the main package's types.
declare module 'hls.js/light' {
  import Hls from 'hls.js'
  export * from 'hls.js'
  export default Hls
}
