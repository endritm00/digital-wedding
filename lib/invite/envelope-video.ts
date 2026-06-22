// Brand "envelope" opener films, hosted on Mux. These are app-level assets (the
// same sealed-envelope reveal for every invitation), uploaded once via
// scripts/upload-envelope-videos.mjs — NOT per-invite media. Two cuts so the
// framing is right in both orientations:
//   • desktop — 16:9 landscape, fills wide screens
//   • mobile  — portrait, fills phones
// Each is a ~5s clip that opens a wax-sealed envelope and blooms to white light;
// that white climax is what we cross-dissolve into the invitation.

export interface EnvelopeFilm {
  hls: string
  mp4: string
  poster: string
  /** Clip length in seconds — drives the handoff timing. */
  duration: number
}

function film(playbackId: string, duration: number): EnvelopeFilm {
  return {
    hls:    `https://stream.mux.com/${playbackId}.m3u8`,
    mp4:    `https://stream.mux.com/${playbackId}/capped-1080p.mp4`,
    poster: `https://image.mux.com/${playbackId}/thumbnail.jpg?time=0`,
    duration,
  }
}

export const ENVELOPE_DESKTOP = film('Anlp92NRoLO02lKl00wIF83mzKXKqhm6wAtFQ6VjhLELw', 5.041667)
export const ENVELOPE_MOBILE  = film('gtoHSEqe01dCpO9o4r5ZXoEjzkhiqgRdacI5vSZhkkbA', 5.125)
