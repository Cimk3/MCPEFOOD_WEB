/**
 * 站点内容数据源
 * 所有版本、文件、校验值、命令与统计均来自 A-Bite-of-Time 仓库的
 * README.md / docs / v0.8.6 Release 页面，请勿臆造。
 * 文案面向普通玩家：先说“能做什么、怎么做”，术语尽量换成大白话。
 */

export const REPO = 'https://github.com/Cimk3/A-Bite-of-Time'
export const REPO_RELEASES = `${REPO}/releases`
export const REPO_LATEST = `${REPO}/releases/latest`
export const REPO_DOCS = `${REPO}/blob/main/docs`
export const REPO_LICENSE = `${REPO}/blob/main/LICENSE`
export const REPO_ISSUES = `${REPO}/issues`

export const SITE = {
  name: '方寸食光',
  enName: 'Food & Table',
  repoTitle: 'A Bite of Time',
  tagline: '把一桌人间烟火，摆进你的方块世界。',
  description:
    '一个给 Minecraft 基岩版创造模式用的装饰附加包：上百道能吃的菜、碗盘餐具，还有厨房、餐厅、医院、办公室、教室等几百件摆件，让你的建筑一下子“有人住过”。',
  version: '0.8.6',
  buildId: '0.8.6-release.1',
  releaseDate: '2026-11-06',
  target: '基岩版 26.52',
  targetFull: 'Minecraft 基岩版（国际版）26.52',
  platforms: 'Windows · 安卓',
  license: 'MIT',
} as const

/** public/previews 下的离线预览图 */
export function preview(file: string): string {
  return `${import.meta.env.BASE_URL}previews/${file}`
}

export interface Stat {
  value: string
  unit: string
  label: string
  note: string
}

export const STATS: Stat[] = [
  { value: '102', unit: '道', label: '能吃的菜', note: '中餐、西餐、日料、甜品、饮品' },
  { value: '393', unit: '件', label: '物品', note: '菜品、餐具、设备、摆件全都算上' },
  { value: '18', unit: '类', label: '生活场景', note: '从厨房餐厅到医院、教室、办公室' },
  { value: '0', unit: '个', label: '实验开关', note: '不用开任何实验性玩法' },
]

export interface Feature {
  icon: string
  title: string
  body: string
}

export const FEATURES: Feature[] = [
  {
    icon: 'bowl',
    title: '一桌好菜，真的能吃',
    body: '102 道菜覆盖中餐、西餐、日料、甜品和饮品，配上碗、盘、杯、托盘，可以随意组合摆盘。',
  },
  {
    icon: 'house',
    title: '把整座城摆满',
    body: '厨房、餐厅、医院、教室、实验室、办公室、服装店、车站……几百件摆件帮你把房间“填满生活感”。',
  },
  {
    icon: 'screen',
    title: '纯装饰，不搞复杂',
    body: '电脑、电视、广告屏这些都是“摆着好看”的静态装饰，画面固定，不用接电、不用操作。',
  },
  {
    icon: 'shield',
    title: '不改原版，放心装',
    body: '不会替换游戏原有的方块、贴图和光照，原版世界该是什么样还是什么样。',
  },
  {
    icon: 'chest',
    title: '老存档照样能用',
    body: '更新版本时，已经摆好的东西会原地保留，新内容只做“加法”。（保险起见，更新前还是备份一下）',
  },
  {
    icon: 'phone',
    title: '电脑手机都能玩',
    body: '支持 Windows 和安卓版。导入后在世界里打开就行，光影（灵动视效）下也有专门的材质。',
  },
]

export interface GalleryImage {
  file: string
  label: string
  en: string
  wide?: boolean
}

export interface GalleryGroup {
  key: string
  label: string
  note: string
  images: GalleryImage[]
}

export const GALLERY: GalleryGroup[] = [
  {
    key: 'dishes',
    label: '菜品与餐具',
    note: '102 道菜 · 15 种餐具 · 随意搭配',
    images: [
      { file: 'menu.png', label: '全部菜品一览', en: '102 MEALS', wide: true },
      { file: 'category_chinese.png', label: '中餐 42 道', en: 'CHINESE' },
      { file: 'category_western.png', label: '西餐 23 道', en: 'WESTERN' },
      { file: 'category_dessert.png', label: '甜品 13 道', en: 'DESSERT' },
      { file: 'hotpot.png', label: '涮锅与配菜', en: 'HOTPOT' },
      { file: 'tableware.png', label: '碗盘餐具', en: 'TABLEWARE' },
    ],
  },
  {
    key: 'scenes',
    label: '厨房与餐厅',
    note: '从后厨到餐桌，一格一格搭出烟火气',
    images: [
      { file: 'kitchen.png', label: '厨房设备', en: 'KITCHEN', wide: true },
      { file: 'restaurant.png', label: '餐厅用品', en: 'RESTAURANT' },
      { file: 'restaurant_details.png', label: '餐厅小物件', en: 'DETAILS' },
      { file: 'details.png', label: '桌面摆件', en: 'TABLETOP' },
      { file: 'home_decor.png', label: '居家装饰', en: 'HOME' },
      { file: 'lifestyle_details.png', label: '生活小物', en: 'LIFESTYLE' },
    ],
  },
  {
    key: 'devices',
    label: '电器与屏幕',
    note: '摆着好看的装饰品，屏幕画面是固定的',
    images: [
      { file: 'electronics.png', label: '电子设备 41 款', en: 'ELECTRONICS', wide: true },
      { file: 'office_devices.png', label: '办公设备', en: 'OFFICE' },
      { file: 'device_fronts.png', label: '设备正面', en: 'FRONTS' },
      { file: 'digital_ad_screens.png', label: '电子广告屏', en: 'AD SCREENS' },
      { file: 'patch_086_medical_front.png', label: '医院设备（新）', en: 'HOSPITAL' },
      { file: 'patch_080_laboratory.png', label: '实验室设备', en: 'LAB' },
    ],
  },
  {
    key: 'props',
    label: '城市与海报',
    note: '服装店 · 办事大厅 · 新闻台 · 美食海报',
    images: [
      { file: 'poster_wall.png', label: '美食海报墙', en: 'POSTERS', wide: true },
      { file: 'patch_072_clothing.png', label: '服装店', en: 'CLOTHING' },
      { file: 'patch_073_government.png', label: '办事大厅', en: 'SERVICE HALL' },
      { file: 'patch_074_news_equipment.png', label: '新闻演播', en: 'NEWS' },
      { file: 'patch_086_medical_rear.png', label: '医院设备 · 背面', en: 'HOSPITAL' },
    ],
  },
]

export interface AssetItem {
  name: string
  label: string
  desc: string
  size: string
  sha256: string
  url: string
  primary?: boolean
  kind: string
}

const DL = `${REPO}/releases/download/v0.8.6`

export const ASSETS: AssetItem[] = [
  {
    name: 'FoodAndTable-0.8.6.mcaddon',
    label: '一键安装包',
    desc: '推荐！两个包都在里面，下载后双击就能导入游戏。',
    size: '34.7 MB',
    sha256: 'd9520b4ba2bb3a47123e0a88e6520be5bcd2c957e0ca5352c53a68b67a041e4e',
    url: `${DL}/FoodAndTable-0.8.6.mcaddon`,
    primary: true,
    kind: 'MCADDON',
  },
  {
    name: 'FoodAndTable_BP-0.8.6.mcpack',
    label: '行为包',
    desc: '让物品能放、能吃、能互动。单独下载时，必须和下面的资源包一起用。',
    size: '2.61 MB',
    sha256: '94c8ba06712ee5d38574a78ddba740611c7343fec24aa9ae229600705d968284',
    url: `${DL}/FoodAndTable_BP-0.8.6.mcpack`,
    kind: 'MCPACK',
  },
  {
    name: 'FoodAndTable_RP-0.8.6.mcpack',
    label: '资源包',
    desc: '负责物品“长什么样”：模型和贴图。必须和上面的行为包一起用。',
    size: '34 MB',
    sha256: 'fb102a7e4608eda982a39901e15d923c29e149efa1e07b75204b492343af8808',
    url: `${DL}/FoodAndTable_RP-0.8.6.mcpack`,
    kind: 'MCPACK',
  },
  {
    name: 'FoodAndTable-source-0.8.6.zip',
    label: '源代码',
    desc: '给想研究或二次创作的开发者，普通玩家不需要。',
    size: '82.7 MB',
    sha256: '501bd64df70ae8ec0969fe4cbedfe7062416d53a26c7d8ebc7eb0747e2d7a3fe',
    url: `${DL}/FoodAndTable-source-0.8.6.zip`,
    kind: 'ZIP',
  },
  {
    name: 'SHA256SUMS.txt',
    label: '校验清单',
    desc: '用来确认下载的文件没有损坏，普通玩家不需要。',
    size: '379 Bytes',
    sha256: '1efda3418595d9d6ad87c7d758d8ef54bf362e319faee5a8398539c9ec37c5b4',
    url: `${DL}/SHA256SUMS.txt`,
    kind: 'TXT',
  },
]

export interface HistoryItem {
  version: string
  date: string
  title: string
  url: string
}

export const HISTORY: HistoryItem[] = [
  { version: '0.8.2', date: '2026-11-06', title: '新增医院、警务和大酒店摆件', url: `${REPO}/releases/tag/v0.8.2` },
  { version: '0.8.1', date: '2026-10-31', title: '优化加载，减少卡顿', url: `${REPO}/releases/tag/v0.8.1` },
  { version: '0.8.0', date: '2026-10-30', title: '新增实验室设备和吊顶屏幕', url: `${REPO}/releases/tag/v0.8.0` },
  { version: '0.7.4', date: '2026-10-29', title: '新增电力、新闻、军警和超大广告屏', url: `${REPO}/releases/tag/v0.7.4` },
  { version: '0.7.3', date: '2026-10-29', title: '新增办事大厅设备、蘸料和笔记本', url: `${REPO}/releases/tag/v0.7.3` },
  { version: '0.7.2', date: '2026-10-29', title: '新增服装店、车站用品，修复朝向', url: `${REPO}/releases/tag/v0.7.2` },
  { version: '0.7.1', date: '2026-10-28', title: '修复挂墙物品朝向，新增四件物品', url: `${REPO}/releases/tag/v0.7.1` },
  { version: '0.7.0', date: '2026-10-28', title: '新增各类设备、挂墙物品和广告屏', url: `${REPO}/releases/tag/v0.7.0` },
  { version: '0.6.0', date: '2026-10-28', title: '新增办公、家居和商店摆件', url: `${REPO}/releases/tag/v0.6.0` },
]

export interface Cmd {
  fn: string
  desc: string
  group: string
}

export const COMMANDS: Cmd[] = [
  { fn: 'tasting_new', desc: '领取本次更新的新物品', group: '常用' },
  { fn: 'tasting_all_chinese', desc: '领取全部中餐', group: '常用' },
  { fn: 'build_info', desc: '查看当前装的是哪个版本', group: '常用' },
  { fn: 'medical_equipment', desc: '医院设备', group: '场景' },
  { fn: 'laboratory_equipment', desc: '实验室设备', group: '场景' },
  { fn: 'electronics', desc: '电子设备', group: '场景' },
  { fn: 'digital_ad_screens', desc: '电子广告屏', group: '场景' },
  { fn: 'clothing_store', desc: '服装店（衣架和衣服）', group: '场景' },
  { fn: 'government_equipment', desc: '办事大厅设备', group: '场景' },
  { fn: 'transit_equipment', desc: '车站用品', group: '场景' },
  { fn: 'electrical_equipment', desc: '电力设备', group: '场景' },
  { fn: 'news_equipment', desc: '新闻演播设备', group: '场景' },
  { fn: 'military_police_equipment', desc: '军警用品', group: '场景' },
]

export const CMD_PREFIX = '/function mcpe_food/'

export interface DocLink {
  label: string
  desc: string
  url: string
}

export const DOC_LINKS: DocLink[] = [
  { label: '完整物品清单', desc: '每一件物品的名字和分类', url: `${REPO_DOCS}/CATALOG.md` },
  { label: '更新日志', desc: '每个版本具体改了什么', url: `${REPO_DOCS}/CHANGELOG.md` },
  { label: '已知问题', desc: '目前已经发现、还没修好的问题', url: `${REPO_DOCS}/KNOWN_ISSUES.md` },
  { label: '广告画说明', desc: '游戏里那些海报和广告的介绍', url: `${REPO_DOCS}/ADVERTISEMENTS.md` },
]

export const DEV_LINKS: DocLink[] = [
  { label: '测试记录', desc: 'VALIDATION.md', url: `${REPO_DOCS}/VALIDATION.md` },
  { label: '开发维护说明', desc: 'DEVELOPMENT.md', url: `${REPO_DOCS}/DEVELOPMENT.md` },
  { label: '项目背景', desc: 'PROJECT_CONTEXT.md', url: `${REPO_DOCS}/PROJECT_CONTEXT.md` },
  { label: '开发进度', desc: 'PROGRESS.md', url: `${REPO_DOCS}/PROGRESS.md` },
]

export interface Faq {
  q: string
  a: string
}

export const FAQ: Faq[] = [
  {
    q: '要不要打开“实验性玩法”？',
    a: '不用。导入之后，在世界设置里把这个附加包打开就行，任何实验开关都不需要动。',
  },
  {
    q: '为什么有“行为包”和“资源包”两个东西？',
    a: '可以理解成“身体”和“衣服”：行为包让物品能放、能吃、能互动，资源包决定物品长什么样。两个必须是同一个版本、而且都要打开，否则会出现物品看不见或者用不了。下载“一键安装包”就不用操心，两个都在里面。',
  },
  {
    q: '东西放不上去怎么办？',
    a: '多半是位置不对。桌面类摆件要放在完整的方块、台阶顶上（正着放的楼梯不行）；挂墙的需要一整面墙并且前面空着；高一点的设备头顶要留空间；吊顶屏幕要对着天花板点。',
  },
  {
    q: '菜能吃吗？电器能用吗？',
    a: '102 道菜都可以吃。电脑、电视、广告屏、收银机这些都只是装饰，画面是固定的，不能真的操作或付款。',
  },
  {
    q: '衣服能穿在身上吗？',
    a: '不能。衣服是用来挂在服装店的衣架、人台上展示的，也不能单独放在地上。',
  },
  {
    q: '大件设备（比如病床）怎么收起来？',
    a: '空着手点一下它，就会出现收回的选项。病床点床头或床尾都可以，整张床会一起收回。',
  },
  {
    q: '怎么知道自己装的是哪个版本？',
    a: '在聊天栏输入 /function mcpe_food/build_info，会显示当前版本号。0.8.6 会显示 0.8.6-release.1。如果你以前装过旧版本，记得把旧的关掉，别同时开两个。',
  },
  {
    q: '会弄坏我的存档或原版材质吗？',
    a: '不会改原版的方块、贴图和光照，老存档里摆好的东西也会保留。不过装任何附加包之前，备份一下世界总是好习惯。',
  },
  {
    q: '网站上的图是游戏截图吗？',
    a: '不是。这些是作者用工具生成的预览图，用来展示物品的造型，游戏里的实际效果会因为光线、画质设置等有所不同。',
  },
  {
    q: '手机、光影、联机都支持吗？',
    a: '目标是 Windows 和安卓上的基岩版 26.52，光影（灵动视效）也准备了对应材质。但手机触屏、联机和性能这些还在继续实测中，遇到问题欢迎到 GitHub 反馈。',
  },
]

export interface NavSection {
  id: string
  label: string
}

export const DOC_SECTIONS: NavSection[] = [
  { id: 'install', label: '安装' },
  { id: 'find', label: '找到物品' },
  { id: 'placement', label: '怎么摆放' },
  { id: 'can-do', label: '能做什么' },
  { id: 'commands', label: '命令速查' },
  { id: 'catalog', label: '都有些什么' },
  { id: 'faq', label: '常见问题' },
  { id: 'more', label: '更多资料' },
]

export const INSTALL_STEPS = [
  {
    icon: 'download',
    title: '下载',
    body: '下载“一键安装包”（.mcaddon 文件），大约 35 MB。',
    tip: '装之前，建议先备份你的世界',
  },
  {
    icon: 'chest',
    title: '双击导入',
    body: '双击下载好的文件，Minecraft 会自动打开并完成导入。',
    tip: '安卓可用“用 Minecraft 打开”',
  },
  {
    icon: 'book',
    title: '在世界里打开',
    body: '编辑世界 → 行为包 / 资源包，把“方寸食光”都启用。不用开实验性玩法。',
    tip: '旧版本记得关掉，别同时开',
  },
  {
    icon: 'cake',
    title: '开始摆！',
    body: '进入创造模式，在物品栏里就能找到所有新物品。',
    tip: '也可以用命令一次领一整套',
  },
]
