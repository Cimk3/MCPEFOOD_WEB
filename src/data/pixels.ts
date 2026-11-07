/**
 * 12×12 像素图标（Minecraft 物品栏风格）
 * 每个字符代表一个像素，'.' 为透明；颜色见 PIXEL_PALETTE。
 */

export const PIXEL_PALETTE: Record<string, string> = {
  k: '#2b2620', // 描边
  w: '#fbf7ee', // 白瓷
  W: '#d9d0bf', // 白瓷暗部
  s: '#c9c2b4', // 热气
  y: '#f5c542', // 金黄
  o: '#e8833a', // 橙
  r: '#d64541', // 红
  R: '#9f2f2b', // 暗红
  g: '#6aa84f', // 草绿
  G: '#467d30', // 暗绿
  l: '#93cf62', // 亮绿
  b: '#5aa0d8', // 屏幕蓝
  B: '#3b78b0', // 暗蓝
  c: '#c08552', // 木
  d: '#7d5232', // 暗木
  n: '#94643f', // 泥土
  N: '#6e4a2e', // 暗泥土
  M: '#5c5a58', // 金属
  p: '#f2a7b8', // 粉
}

export const PIXEL_ICONS: Record<string, string[]> = {
  bowl: [
    '....s...s...',
    '...s...s....',
    '....s...s...',
    '............',
    '.kkkkkkkkkk.',
    'kyoyyyoyyoyk',
    'kwwwwwwwwwwk',
    'kwbwwwwwwbwk',
    '.kwwwwwwwwk.',
    '..kWwwwwWk..',
    '...kkkkkk...',
    '..kkkkkkkk..',
  ],
  cake: [
    '............',
    '.....rr.....',
    '.....rR.....',
    '..kkkkkkkk..',
    '.kwwwwwwwwk.',
    '.kwrwwwwrwk.',
    '.kwwwwrwwwk.',
    '.kWWWWWWWWk.',
    '.kcdcccdcck.',
    '.kcccccccck.',
    '.kddddddddk.',
    '..kkkkkkkk..',
  ],
  cup: [
    '............',
    '...s..s.....',
    '....s..s....',
    '............',
    '.kkkkkkkk...',
    '.kddddddk...',
    '.kwwwwwwkkk.',
    '.kwwbbwwk.k.',
    '.kwwbbwwk.k.',
    '.kwwwwwwkkk.',
    '..kwwwwk....',
    '...kkkk.....',
  ],
  screen: [
    '............',
    'kkkkkkkkkkkk',
    'kbbbbbbbbbbk',
    'kblbbbbbbbbk',
    'kbblbbbblbbk',
    'kbbblbblblbk',
    'kbbbbllbbbbk',
    'kBBBBBBBBBBk',
    'kkkkkkkkkkkk',
    '.....MM.....',
    '...MMMMMM...',
    '............',
  ],
  house: [
    '.....kk.....',
    '....krrk....',
    '...krRrrk...',
    '..krrrrRrk..',
    '.krrRrrrrrk.',
    'kkkkkkkkkkkk',
    '.kwwwwwwwwk.',
    '.kwbbwwbbwk.',
    '.kwbbwwbbwk.',
    '.kwwwccwwwk.',
    '.kwwwccwwwk.',
    '.kkkkkkkkkk.',
  ],
  shield: [
    '.kkkkkkkkkk.',
    '.kggggggggk.',
    '.kgggggggwk.',
    '.kggggggwwk.',
    '.kgwgggwwgk.',
    '.kgwwgwwggk.',
    '.kggwwwgggk.',
    '..kggwgggk..',
    '..kGggggGk..',
    '...kGggGk...',
    '....kGGk....',
    '.....kk.....',
  ],
  chest: [
    '............',
    '.kkkkkkkkkk.',
    '.kcccccccck.',
    '.kcccccccck.',
    '.kddddddddk.',
    '.kkkkMMkkkk.',
    '.kcccMMccck.',
    '.kcccccccck.',
    '.kcccccccck.',
    '.kddddddddk.',
    '.kkkkkkkkkk.',
    '............',
  ],
  phone: [
    '..kkkkkkkk..',
    '..kMMMMMMk..',
    '..kbbbbbbk..',
    '..kblbbbbk..',
    '..kbblbbbk..',
    '..kbbbblbk..',
    '..kbbbbbbk..',
    '..kBBBBBBk..',
    '..kMMMMMMk..',
    '..kMMwwMMk..',
    '..kMMMMMMk..',
    '..kkkkkkkk..',
  ],
  medkit: [
    '............',
    '....kkkk....',
    '....k..k....',
    '.kkkkkkkkkk.',
    '.kwwwwwwwwk.',
    '.kwwwrrwwwk.',
    '.kwwrrrrwwk.',
    '.kwwrrrrwwk.',
    '.kwwwrrwwwk.',
    '.kWWWWWWWWk.',
    '.kkkkkkkkkk.',
    '............',
  ],
  frame: [
    '............',
    'kkkkkkkkkkkk',
    'kcccccccccck',
    'kcbbbbbbbbck',
    'kcbbbbbybbck',
    'kcbbbbbbbbck',
    'kcbbgbbbbbck',
    'kcbgggbbgbck',
    'kcggggggggck',
    'kcGGGGGGGGck',
    'kcccccccccck',
    'kkkkkkkkkkkk',
  ],
  download: [
    '....kkkk....',
    '....kgGk....',
    '....kgGk....',
    '....kgGk....',
    '.kkkkgGkkkk.',
    '..kggggGGk..',
    '...kgggGk...',
    '....kgGk....',
    '.....kk.....',
    '............',
    'kkkkkkkkkkkk',
    'kMMMMMMMMMMk',
  ],
  book: [
    '............',
    '.kkkkkkkkkk.',
    '.kRrrrrrrrk.',
    '.kRrwwwwrrk.',
    '.kRrrrrrrrk.',
    '.kRrwwwrrrk.',
    '.kRrrrrrrrk.',
    '.kRrrrrrrrk.',
    '.kRwwwwwwwk.',
    '.kRWWWWWWWk.',
    '.kkkkkkkkkk.',
    '............',
  ],
  grass: [
    'kkkkkkkkkkkk',
    'klgllglgllgk',
    'kggGgggGgggk',
    'kgGnggnGgGgk',
    'knNnnGnnnGnk',
    'knnNnnnNnnnk',
    'kNnnnNnnnNnk',
    'knnNnnnnNnnk',
    'knnnnNnnnnNk',
    'kNnnnnnNnnnk',
    'knnNnnnnnnnk',
    'kkkkkkkkkkkk',
  ],
}

export type PixelIconName = keyof typeof PIXEL_ICONS
