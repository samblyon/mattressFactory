# Escape from the Mattress Factory
A browser based echolocation game. Integrates an object-oriented Javascript game structure with the smooth rendering of HTML5 canvas to create an unusual and curious experience.

[play here](samblyon.github.io/mattressFactory)

![screenshot](./docs/screenshots/monster_attack.png)

## Gameplay

A massive power outage has struck the eerie industrial complex, leaving you a chance at last to break for freedom. Use sound waves to navigate darkened factory floors in your bid to escape, avoiding obstacles and searching for an elusive exit.

In the darkness, the factory seems empty... or is it?

## Implementation

### Basic Rendering

A `GameView` class renders the game, using a `requestAnimationFrame` loop to maintain a constant refresh rate.

```javascript
// game_view.js

// Request another animation or break if player won / lost
if (this.playerEscaped()){
  if (this.level <= 5) {
    this.passCallback();
  } else {
    this.winningCallback();
  }
} else if (this.playerKilled()){
  this.losingCallback();
} else {
  requestAnimationFrame(this.step.bind(this));
}
```
The `GameView` delegates rendering tasks to the `Map`, which keeps track of all objects in the game. The `Map` further delegates rendering of individual objects (`Player`, `Ray`s and `other mysterious things you'll discover`) to the objects themselves, each of which have their own render method.

The game canvas sizes itself dynamically based on `window.innerWidth` and `window.innerHeight`. To ensure levels display at scale, positions for each level are *scalar* values rather than *absolute* values:
```javascript
// map.js

// Make dimensions relative sizes so can scale
Map.LEVELS = {
  1: {
    walls: [
              [0, 0, 0.01, 1],
              [0, 0.35, 0.75, 0.4],
              [0, 0.6, 0.6, 0.65],
              [0.7, 0.35, 0.75, 1],
              [0.55, 0.65, 0.6, 1]
            ],
    playerStart: {x: 0.05, y: 0.47}
  },
  2: {
    walls: [
```

### Displaying Sound
Players see sound as `Rays`. `Rays` have a number of properties:
1. `Rays` have finite energy which decreases over time. `Rays` cannot extend beyond a certain length, and over time a `ray` fades away. This is managed by incrementing `Ray#age` and referencing a `Ray::LIFESPAN` constant common to all `Ray`.
2. `Rays` represent different kinds of sound. I chose to display different sound origins with different colors.
3. `Rays` bounce! The reflected `ray` produced
