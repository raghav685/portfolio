# Raghav — Portfolio

Animated portfolio: a loader opens like two doors, then a swarm of cursors builds the page as you scroll, and the live site takes over when the build finishes. A quiet Paper mode lives at `/paper/`, and the HUD toggle switches between the two.

- Copy for both modes lives in `js/content.js`
- `js/swarm-rebuild.js` is vendored from [DhvanilPatel/swarm-cursors](https://github.com/DhvanilPatel/swarm-cursors) (after [Swarm](https://califa.github.io/swarm-site/) by Joel Califa), patched to run as a page script
- The swarm runs on screens 760px and wider without reduced motion; add `?noswarm` to skip it
