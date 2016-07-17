window.wallColor = {color: "#222"};

module.exports = {
  LEVELS : {
    1: {
      walls: [
        [0, 0, 0.01, 1],
        [0, 0.35, 0.75, 0.4],
        [0, 0.6, 0.6, 0.65],
        [0.7, 0.35, 0.75, 1],
        [0.55, 0.65, 0.6, 1]
      ],
      playerStart: {x: .05, y: .47},
      level_header: "BUT HMMM...  WHAT'S THIS...?",
      level_header_2: "THE NEXT FLOOR IS HUGE! I'LL NEED TO CLAP MUCH MORE TO FIND MY WAY..."
    },
    2: {
      walls: [
        [0.35, 0, 0.5, 0.05],
        [0.35, 0, 0.4, 0.3],
        [0.5, 0, 0.55, 0.3],
        [0, .25, .35, .3],
        [.25, .3, .3, .35],
        [0, .35, .3, .4],
        [.15, .4, .2, .55],
        [.2, .5, .3, .55],
        [.25, .55, .3, .6],
        [.25, .6, .4, .65],
        [.35, .65, .4, .7],
        [.35, .4, .5, .5],
        [.4, .67, .6, .7],
        [.55, .25, .6, .3],
        [.6, .15, .8, .2],
        [.6, .2, .65, .4],
        [.5, .4, .65, .45],
        [.8, .15, .85, .4],
        [.7, .4, 1, .45],
        [.78, .45, .8, .5],
        [.63, .55, .95, .57],
        [.99, .45, 1, .5],
        [.6, .7, .61, 1],
        [.8, .65, .81, .9],
        [.61, .99, 1, 1],
        [.9, .57, .91, 1],
        [.91, .65, 1, .73]
      ],
      playerStart: {x: .45, y: .07},
      level_header: "YOU'RE GETTING THE HANG OF THIS.",
      level_header_2: "BUT WAIT. A RUSTLE AROUND THE CORNER. IS SOMETHING THERE?"
    },
    3: {
      walls: [
        [0, 0, 0.01, 1],
        [0, 0.35, 0.75, 0.4],
        [0, 0.6, 0.6, 0.65],
        [0.7, 0.35, 0.75, 1],
        [0.55, 0.65, 0.6, 1]
      ],
      playerStart: {x: .1, y: .47},
      monsters: [
        {x: .06, y: .17, active: true},
        {x: .06, y: .97, active: true}
      ],
      level_header: "WHEW. NO BIGGIE. PROBABLY THE ONLY TWO AROUND.",
      level_header_2: "STILL... IT MIGHT BE GOOD TO MAKE LESS NOISE..."
    },
    4: {
      walls: [
        [0, 0.35, 0.6, 0.45],
        [0, 0.53, 0.75, 0.65],
        [0.7, 0, 0.75, .65],
        [0.55, 0, 0.6, .35]
      ],
      playerStart: {x: .1, y: .49},
      monsters: [
        {x: .4, y: .52}
      ],
      level_header: "WHEW, CANT WAKE ANY MORE OF THOSE UP... YOU FEEL IN FRONT OF YOU... A SMALL BRAILLE SIGN.",
      level_header_2: "'THE KILLING FLOOR'. WHAT?? YOU DON'T RECALL THIS ROOM..."
    },
    5: {
      walls: [
        [0, 0, .18, 0.1],
        [.25, 0, 1, 0.1],
        [.1, .18, .14, .22],
        [.2, .18, .45, .22],
        [.1, 0, .14, .4],
        [.2, .22, .24, .4],
        [.41, .22, .45, .4],
        [.55, .18, .9, .22],
        [.55, .22, .59, .4],
        [.86, .22, .9, .4],
        [.1, .78, .45, .82],
        [.1, .6, .14, .8],
        [.41, .6, .45, .8],
        [.55, .78, .9, .82],
        [.55, .6, .59, .8],
        [.86, .6, .9, .8],
        [0, 0, 0.04, 1],
        [0, .96, 1, 1],
        [.96, 0, 1, 1],
        [.96, .55, 1, 1]
      ],
      playerStart: {x: .05, y: .5},
      monsters: [
        // {x: .05, y: .25},
        {x: .85, y: .15},
        {x: .15, y: .22},
        {x: .2, y: .04},
        {x: .5, y: .9}
      ],
      level_header: "DISPAIR. AT THIS RATE YOU'LL NEVER MAKE IT OUT",
      level_header_2: "BUT WHAT'S THIS... A GUST OF FRESH AIR..? COULD IT BE...?"
    },
    6: {
      walls: [
        [0.35, 0, 0.5, 0.05],
        [0.35, 0, 0.4, 0.3],
        [0.5, 0, 0.55, 0.3],
        [0, .25, .35, .3],
        [.25, .3, .3, .35],
        [0, .35, .3, .4],
        [.15, .4, .2, .55],
        [.2, .5, .3, .55],
        [.25, .55, .3, .6],
        [.25, .6, .4, .65],
        [.35, .65, .4, .7],
        [.35, .4, .5, .5],
        [.4, .67, .6, .7],
        [.55, .25, .6, .3],
        [.6, .15, .8, .2],
        [.6, .2, .65, .4],
        [.5, .4, .65, .45],
        [.8, .15, .85, .4],
        [.7, .4, 1, .45],
        [.78, .45, .8, .5],
        [.63, .55, .95, .57],
        [.7, .72, .74, .74],
        [.99, .45, 1, .5],
        [.6, .7, .61, 1],
        [.8, .65, .81, .9],
        [.61, .99, 1, 1],
        [.9, .57, .91, 1],
        [.91, .65, 1, .73]
      ],
      playerStart: {x: .45, y: .07},
      monsters: [
        {x: .21, y: .45}
      ]
    },
  }
}
