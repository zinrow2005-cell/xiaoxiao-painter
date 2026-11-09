const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

const COLORS = ['#222222','#ef4444','#f97316','#facc15','#22c55e','#06b6d4','#3b82f6','#8b5cf6','#ec4899','#8b5a2b'];
const categories = [
  ['land','🐯','陸地動物'],['sea','🐳','海洋生物'],['air','🦋','空中生物'],['insect','🐞','昆蟲'],
  ['food','🍎','蔬果食物'],['vehicle','🚗','交通工具'],['daily','🧸','日常用品'],['nature','🌳','自然生活'],['anime-games','🎮','動漫遊戲繪圖區']
];

const CATEGORY_DESCRIPTIONS = {
  land:'熊、馬、綿羊、狐狸、熊貓、小鹿、無尾熊、袋鼠、斑馬、松鼠、浣熊、刺蝟、駱駝、河馬、老虎、獅子等陸地動物、樹懶、大猩猩',
  sea:'魚、海豚、鯨魚、章魚、水母、海星、海馬、海豹、龍蝦、魷魚、貝殼、河豚、蝦子、海膽、珊瑚魚、魟魚、獨角鯨等海洋生物、珍珠貝、小丑魚',
  air:'小鳥、鴨子、天鵝、孔雀、老鷹、鸚鵡、貓頭鷹、紅鶴、鴿子、企鵝、海鷗、蜂鳥、啄木鳥、鵜鶘、麻雀、蝙蝠、烏鴉等鳥類、巨嘴鳥、白鵝',
  insect:'瓢蟲、蜜蜂、螞蟻、毛毛蟲、甲蟲、蚱蜢、蜘蛛、螢火蟲、蝸牛、蠍子、螳螂、蜈蚣、金龜子、天牛、蚊子、蒼蠅、蟑螂、蚯蚓等小生物、蟬、獨角仙',
  food:'水果與食物圖案，包含芒果、紅蘿蔔、櫻桃、玉米、餅乾、番茄、南瓜、檸檬、甜甜圈、酪梨、杯子蛋糕、披薩、熱狗等生活辨識素材、可頌、三明治',
  vehicle:'汽車、公車、卡車、計程車、直升機、小巴士、火箭、拖拉機、輪船、快艇、纜車、垃圾車、帆船、電車、熱氣球、工程車等交通工具、水泥車、拖吊車',
  daily:'杯子、書、鉛筆、時鐘、牙刷、檯燈、肥皂、椅子、湯匙、球鞋、剪刀、帽子、牙膏、梳子、茶壺、叉子等日常用品、碗、平底鍋',
  nature:'太陽、雲、樹、花、山、香菇、雪花、仙人掌、雨滴、橡實、火山、楓葉、松樹、松果、瀑布、岩石、洞穴等自然景物、帳篷、風箏',
  'anime-games':'可選擇果燃很派、鬼滅之刃、佩佩豬與妙妙犬布麗；每組有彩色參考與黑白線稿。'
};
function categoryStats(){
  const orderMap=new Map(DISPLAY_ORDER.map((id,i)=>[id,i]));
  const formal=templates.filter(t=>isSampleTemplate(t.id)).sort((a,b)=>(orderMap.get(a.id)??999)-(orderMap.get(b.id)??999));
  return categories.map(([id,em,name])=>{
    const items=formal.filter(t=>t.cat===id);
    return {id,em,name,items,count:items.length,preview:items.slice(0,3)};
  });
}

// 動漫遊戲系列資料：新增其他遊戲時僅需增加系列與對應角色的 series 欄位。
const GAME_ART_SERIES = Object.freeze([
  {id:'guoran',label:'果燃很派',description:'6 組角色・彩色參考與黑白著色',officialNames:false},
  {id:'demon',label:'鬼滅之刃',description:'21 組配對・42 張角色圖（猗窩座含 A／B 兩組版本）',officialNames:true},
  {id:'peppa',label:'佩佩豬',description:'13 組角色・26 張彩色／黑白圖・單一角色',officialNames:true},
  {id:'bluey',label:'妙妙犬布麗',description:'13 組角色・26 張彩色／黑白圖・人物及家庭／朋友合照',officialNames:true}
]);
let activeGameArtSeries='guoran';
function gameArtSeriesFor(t){return t.series||'guoran';}
const STYLE_BOARD = './assets/overview/color-200.png';
const SAMPLE_TEMPLATE_IDS = ['peppa01','peppa02','peppa03','peppa04','peppa05','peppa06','peppa07','peppa08','peppa09','peppa10','peppa11','peppa12','peppa13','bluey01','bluey02','bluey03','bluey04','bluey05','bluey06','bluey07','bluey08','bluey09','bluey10','bluey11','bluey12','bluey13','demon01','demon02','demon03','demon04','demon05','demon06','demon07','demon08','demon09','demon10','demon11','demon12','demon13','demon14','demon15','demon16','demon17','demon18','demon19','demon20','demon21','guoran01','guoran02','guoran03','guoran04','guoran05','guoran06','apple1','ball1','fish1','cat2','dog4','rabbit4','elephant5','butterfly3','cup2','car3','bus7','train8','firetruck8','plane7','backpack3','cow9','pig4','monkey5','lion5','giraffe9','turtle9','dolphin6','whale6','farm10','bird2','crab6','bicycle7','house8','tiger10','ladybug10','banana1','orange1','strawberry2','book2','umbrella2','grape3','watermelon3','bee4','dragonfly5','boat6','sun1','star1','cloud1','moon2','flower3','tree4','rainbow4','policecar7','ambulance7','excavator8','scooter5','truck6','leaf2','mountain6','bear5','horse6','octopus7','shark7','pear2','pineapple4','pencil4','clock4','owl5','parrot6','ant4','caterpillar5','mango2','carrot3','toothbrush5','lamp5','sheep5','fox6','jellyfish6','starfish4','duck3','eagle7','beetle6','grasshopper6','taxi5','helicopter7','mushroom4','snowflake5','panda6','deer7','seahorse5','seal6','swan5','peacock7','spider6','firefly5','cherry3','corn4','soap4','chair5','van6','rocket7','cactus5','raindrop2','koala6','acorn3','cookie4','tractor6','kangaroo6','lobster6','squid6','shell4','flamingo6','dove4','bat5','crow5','mosquito5','fly4','cockroach6','worm4','tomato3','pumpkin4','spoon3','sneaker5','volcano7','ship6','zebra5','squirrel5','pufferfish5','shrimp4','penguin4','seagull5','snail4','scorpion6','lemon2','donut4','scissors4','cap3','speedboat6','cablecar6','mapleleaf3','pinetree4','raccoon5','hedgehog5','seaurchin5','coralfish5','hummingbird6','woodpecker6','mantis5','centipede6','avocado3','cupcake4','toothpaste4','comb3','garbagetruck7','sailboat6','pinecone4','waterfall5','camel6','hippo6','mantaray6','narwhal6','pelican6','sparrow4','scarab6','longhornbeetle6','pizza4','hotdog4','teapot4','fork3','tram7','hotairballoon7','rock4','cave5','sloth6','gorilla7','pearloyster5','clownfish5','toucan6','goose5','cicada6','rhinobeetle6','croissant3','sandwich4','bowl3','fryingpan5','cementmixer7','towtruck7','tent4','kite4','alpaca6','beaver6','otter6','coral5','robin4','kingfisher6','stickinsect6','silkworm5','sushi4','icecream4','plate3','lantern4','motorcycle6','forklift7','campfire5','island5'];
const DISPLAY_ORDER = ['peppa01','peppa02','peppa03','peppa04','peppa05','peppa06','peppa07','peppa08','peppa09','peppa10','peppa11','peppa12','peppa13','bluey01','bluey02','bluey03','bluey04','bluey05','bluey06','bluey07','bluey08','bluey09','bluey10','bluey11','bluey12','bluey13','demon01','demon02','demon03','demon04','demon05','demon06','demon07','demon08','demon09','demon10','demon11','demon12','demon13','demon14','demon15','demon16','demon17','demon18','demon19','demon20','demon21','guoran01','guoran02','guoran03','guoran04','guoran05','guoran06','apple1','banana1','orange1','ball1','fish1','star1','cloud1','bird2','pear2','book2','umbrella2','cat2','cup2','leaf2','mango2','moon2','grape3','watermelon3','strawberry2','butterfly3','backpack3','car3','flower3','duck3','carrot3','dog4','rabbit4','pig4','bee4','pineapple4','pencil4','clock4','rainbow4','ant4','starfish4','mushroom4','tree4','elephant5','monkey5','lion5','dragonfly5','sun1','bear5','owl5','caterpillar5','scooter5','sheep5','toothbrush5','lamp5','snowflake5','taxi5','crab6','dolphin6','whale6','boat6','truck6','mountain6','horse6','parrot6','fox6','jellyfish6','beetle6','grasshopper6','plane7','bicycle7','bus7','octopus7','shark7','policecar7','ambulance7','eagle7','helicopter7','train8','firetruck8','house8','excavator8','cow9','giraffe9','turtle9','tiger10','ladybug10','farm10','cherry3','acorn3','raindrop2','corn4','cookie4','soap4','chair5','panda6','deer7','koala6','seahorse5','seal6','swan5','peacock7','spider6','firefly5','van6','rocket7','tractor6','cactus5','kangaroo6','lobster6','squid6','shell4','flamingo6','dove4','bat5','crow5','mosquito5','fly4','cockroach6','worm4','tomato3','pumpkin4','spoon3','sneaker5','volcano7','ship6','zebra5','squirrel5','pufferfish5','shrimp4','penguin4','seagull5','snail4','scorpion6','lemon2','donut4','scissors4','cap3','speedboat6','cablecar6','mapleleaf3','pinetree4','raccoon5','hedgehog5','seaurchin5','coralfish5','hummingbird6','woodpecker6','mantis5','centipede6','avocado3','cupcake4','toothpaste4','comb3','garbagetruck7','sailboat6','pinecone4','waterfall5','camel6','hippo6','mantaray6','narwhal6','pelican6','sparrow4','scarab6','longhornbeetle6','pizza4','hotdog4','teapot4','fork3','tram7','hotairballoon7','rock4','cave5','sloth6','gorilla7','pearloyster5','clownfish5','toucan6','goose5','cicada6','rhinobeetle6','croissant3','sandwich4','bowl3','fryingpan5','cementmixer7','towtruck7','tent4','kite4','alpaca6','beaver6','otter6','coral5','robin4','kingfisher6','stickinsect6','silkworm5','sushi4','icecream4','plate3','lantern4','motorcycle6','forklift7','campfire5','island5'];
const STORAGE_LIBRARY_MODE = 'kidsDrawingLibraryModeV1716';
const STORAGE_GUIDE_STYLE = 'kidsDrawingGuideStyleV172';
const STORAGE_DETAIL_MODE = 'kidsDrawingDetailModeV174';
const STORAGE_PALETTE_COLLAPSED = 'kidsDrawingPaletteCollapsedV162';
const STORAGE_CUSTOM_COLORS = 'kidsDrawingCustomColorsV1738';
const MAX_CUSTOM_COLORS = 8;

function isSampleTemplate(id){ return SAMPLE_TEMPLATE_IDS.includes(id); }
function getLibraryMode(){ return localStorage.getItem(STORAGE_LIBRARY_MODE) || 'sample'; }
function setLibraryMode(mode){ localStorage.setItem(STORAGE_LIBRARY_MODE, mode); }
function getGuideStyle(){ const saved=localStorage.getItem(STORAGE_GUIDE_STYLE); return saved==='outline'?'outline':'color'; }
function saveGuideStyle(style){ localStorage.setItem(STORAGE_GUIDE_STYLE, style==='outline'?'outline':'color'); }
function getDetailMode(){ return 'simple'; }
function saveDetailMode(mode){ return 'simple'; }

function normalizeHexColor(value){
  const m=String(value||'').trim().match(/^#([0-9a-f]{6})$/i);
  return m?`#${m[1].toLowerCase()}`:null;
}
function loadCustomColors(){
  try{
    const list=JSON.parse(localStorage.getItem(STORAGE_CUSTOM_COLORS)||'[]');
    if(!Array.isArray(list))return [];
    const seen=new Set();
    return list.map(normalizeHexColor).filter(c=>c&&!COLORS.includes(c)&&!seen.has(c)&&seen.add(c)).slice(0,MAX_CUSTOM_COLORS);
  }catch{return []}
}
function persistCustomColors(){localStorage.setItem(STORAGE_CUSTOM_COLORS,JSON.stringify(customColors))}
let customColors=loadCustomColors();

const svgWrap = body => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#3a3a3a" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
const templates = [
  {id:'peppa01',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"佩佩豬",zhuyin:'',en:"Peppa Pig",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa02',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"喬治",zhuyin:'',en:"George Pig",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa03',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"豬爸爸",zhuyin:'',en:"Daddy Pig",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa04',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"豬媽媽",zhuyin:'',en:"Mummy Pig",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa05',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"豬爺爺",zhuyin:'',en:"Grandpa Pig",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa06',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"豬奶奶",zhuyin:'',en:"Granny Pig",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa07',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"蘇西羊",zhuyin:'',en:"Suzy Sheep",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa08',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"瑞貝卡兔子",zhuyin:'',en:"Rebecca Rabbit",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa09',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"柔伊斑馬",zhuyin:'',en:"Zoe Zebra",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa10',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"丹尼狗",zhuyin:'',en:"Danny Dog",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa11',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"弗雷迪狐狸",zhuyin:'',en:"Freddy Fox",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa12',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"坎迪貓咪",zhuyin:'',en:"Candy Cat",kk:'彩色參考／黑白著色',svg:''},
  {id:'peppa13',series:'peppa',lv:4,cat:'anime-games',emoji:'🐷',zh:"艾蜜莉大象",zhuyin:'',en:"Emily Elephant",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey01',series:'bluey',lv:5,cat:'anime-games',emoji:'🐶',zh:"布麗",zhuyin:'',en:"Bluey",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey02',series:'bluey',lv:5,cat:'anime-games',emoji:'🐶',zh:"賓果",zhuyin:'',en:"Bingo",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey03',series:'bluey',lv:5,cat:'anime-games',emoji:'🐶',zh:"班底",zhuyin:'',en:"Bandit",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey04',series:'bluey',lv:5,cat:'anime-games',emoji:'🐶',zh:"奇莉",zhuyin:'',en:"Chilli",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey05',series:'bluey',lv:5,cat:'anime-games',emoji:'🐶',zh:"麥肯錫",zhuyin:'',en:"Mackenzie",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey06',series:'bluey',lv:5,cat:'anime-games',emoji:'🐶',zh:"可可",zhuyin:'',en:"Coco",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey07',series:'bluey',lv:5,cat:'anime-games',emoji:'🐶',zh:"哈妮",zhuyin:'',en:"Honey",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey08',series:'bluey',lv:5,cat:'anime-games',emoji:'🐶',zh:"印蒂",zhuyin:'',en:"Indy",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey09',series:'bluey',lv:7,cat:'anime-games',emoji:'🐶',zh:"一家四口",zhuyin:'',en:"Family of Four",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey10',series:'bluey',lv:7,cat:'anime-games',emoji:'🐶',zh:"姐妹合照",zhuyin:'',en:"Sisters",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey11',series:'bluey',lv:7,cat:'anime-games',emoji:'🐶',zh:"父女合照",zhuyin:'',en:"Father and Daughter",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey12',series:'bluey',lv:7,cat:'anime-games',emoji:'🐶',zh:"布麗與四位朋友",zhuyin:'',en:"Bluey with Friends",kk:'彩色參考／黑白著色',svg:''},
  {id:'bluey13',series:'bluey',lv:7,cat:'anime-games',emoji:'🐶',zh:"布麗賓果與四位朋友",zhuyin:'',en:"Bluey Bingo and Friends",kk:'彩色參考／黑白著色',svg:''},
  {id:'demon01',series:'demon',lv:5,cat:'anime-games',emoji:'🎴',zh:'竈門炭治郎',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon02',series:'demon',lv:5,cat:'anime-games',emoji:'🎴',zh:'竈門禰豆子',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon03',series:'demon',lv:5,cat:'anime-games',emoji:'🎴',zh:'我妻善逸',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon04',series:'demon',lv:5,cat:'anime-games',emoji:'🎴',zh:'嘴平伊之助',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon05',series:'demon',lv:5,cat:'anime-games',emoji:'🎴',zh:'富岡義勇',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon06',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'胡蝶忍',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon07',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'煉獄杏壽郎',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon08',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'宇髓天元',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon09',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'甘露寺蜜璃',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon10',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'時透無一郎',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon11',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'伊黑小芭內',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon12',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'不死川實彌',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon13',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'悲鳴嶼行冥',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon14',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'栗花落香奈乎',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon15',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'鬼舞辻無慘',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon16',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'猗窩座（版本 A）',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon17',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'猗窩座（版本 B）',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon18',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'童磨',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon19',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'黑死牟',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon20',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'墮姬',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'demon21',series:'demon',lv:7,cat:'anime-games',emoji:'🎴',zh:'妓夫太郎',zhuyin:'',en:'鬼滅之刃',kk:'彩色參考／黑白著色',svg:''},
  {id:'guoran01',series:'guoran',lv:5,cat:'anime-games',emoji:'🎮',zh:'蘋果特務',zhuyin:'',en:'果燃很派',kk:'彩色參考／黑白著色',svg:''},
  {id:'guoran02',series:'guoran',lv:5,cat:'anime-games',emoji:'🎮',zh:'紅蘿蔔爆破手',zhuyin:'',en:'果燃很派',kk:'彩色參考／黑白著色',svg:''},
  {id:'guoran03',series:'guoran',lv:6,cat:'anime-games',emoji:'🎮',zh:'香菇劍客',zhuyin:'',en:'果燃很派',kk:'彩色參考／黑白著色',svg:''},
  {id:'guoran04',series:'guoran',lv:6,cat:'anime-games',emoji:'🎮',zh:'玉米戰士',zhuyin:'',en:'果燃很派',kk:'彩色參考／黑白著色',svg:''},
  {id:'guoran05',series:'guoran',lv:5,cat:'anime-games',emoji:'🎮',zh:'辣椒廚師',zhuyin:'',en:'果燃很派',kk:'彩色參考／黑白著色',svg:''},
  {id:'guoran06',series:'guoran',lv:6,cat:'anime-games',emoji:'🎮',zh:'花朵魔法師',zhuyin:'',en:'果燃很派',kk:'彩色參考／黑白著色',svg:''},








  {id:'apple1',lv:1,cat:'food',emoji:'🍎',zh:'蘋果',zhuyin:'ㄆㄧㄣˊ ㄍㄨㄛˇ',en:'Apple',kk:'[ˈæpəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蘋果</text></svg>`},
  {id:'ball1',lv:1,cat:'daily',emoji:'⚽',zh:'球',zhuyin:'ㄑㄧㄡˊ',en:'Ball',kk:'[bɔl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">球</text></svg>`},
  {id:'fish1',lv:1,cat:'sea',emoji:'🐟',zh:'魚',zhuyin:'ㄩˊ',en:'Fish',kk:'[fɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">魚</text></svg>`},
  {id:'bird2',lv:2,cat:'air',emoji:'🐦',zh:'小鳥',zhuyin:'ㄒㄧㄠˇ ㄋㄧㄠˇ',en:'Bird',kk:'[bɝd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小鳥</text></svg>`},
  {id:'cat2',lv:2,cat:'land',emoji:'🐱',zh:'貓',zhuyin:'ㄇㄠ',en:'Cat',kk:'[kæt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">貓</text></svg>`},
  {id:'cup2',lv:2,cat:'daily',emoji:'☕',zh:'杯子',zhuyin:'ㄅㄟ ㄗ˙',en:'Cup',kk:'[kʌp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">杯子</text></svg>`},
  {id:'car3',lv:3,cat:'vehicle',emoji:'🚗',zh:'汽車',zhuyin:'ㄑㄧˋ ㄔㄜ',en:'Car',kk:'[kɑr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">汽車</text></svg>`},
  {id:'backpack3',lv:3,cat:'daily',emoji:'🎒',zh:'書包',zhuyin:'ㄕㄨ ㄅㄠ',en:'Backpack',kk:'[ˈbækˌpæk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">書包</text></svg>`},
  {id:'butterfly3',lv:3,cat:'air',emoji:'🦋',zh:'蝴蝶',zhuyin:'ㄏㄨˊ ㄉㄧㄝˊ',en:'Butterfly',kk:'[ˈbʌtɚˌflaɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蝴蝶</text></svg>`},
  {id:'rabbit4',lv:4,cat:'land',emoji:'🐰',zh:'兔子',zhuyin:'ㄊㄨˋ ㄗ˙',en:'Rabbit',kk:'[ˈræbɪt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">兔子</text></svg>`},
  {id:'dog4',lv:4,cat:'land',emoji:'🐶',zh:'狗',zhuyin:'ㄍㄡˇ',en:'Dog',kk:'[dɔɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">狗</text></svg>`},
  {id:'pig4',lv:4,cat:'land',emoji:'🐷',zh:'豬',zhuyin:'ㄓㄨ',en:'Pig',kk:'[pɪɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">豬</text></svg>`},
  {id:'elephant5',lv:5,cat:'land',emoji:'🐘',zh:'大象',zhuyin:'ㄉㄚˋ ㄒㄧㄤˋ',en:'Elephant',kk:'[ˈɛləfənt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">大象</text></svg>`},
  {id:'lion5',lv:5,cat:'land',emoji:'🦁',zh:'獅子',zhuyin:'ㄕ ㄗ˙',en:'Lion',kk:'[ˈlaɪən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">獅子</text></svg>`},
  {id:'monkey5',lv:5,cat:'land',emoji:'🐵',zh:'猴子',zhuyin:'ㄏㄡˊ ㄗ˙',en:'Monkey',kk:'[ˈmʌŋki]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">猴子</text></svg>`},
  {id:'whale6',lv:6,cat:'sea',emoji:'🐋',zh:'鯨魚',zhuyin:'ㄐㄧㄥ ㄩˊ',en:'Whale',kk:'[wel]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鯨魚</text></svg>`},
  {id:'dolphin6',lv:6,cat:'sea',emoji:'🐬',zh:'海豚',zhuyin:'ㄏㄞˇ ㄊㄨㄣˊ',en:'Dolphin',kk:'[ˈdɑlfɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海豚</text></svg>`},
  {id:'crab6',lv:6,cat:'sea',emoji:'🦀',zh:'螃蟹',zhuyin:'ㄆㄤˊ ㄒㄧㄝˋ',en:'Crab',kk:'[kræb]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">螃蟹</text></svg>`},
  {id:'plane7',lv:7,cat:'vehicle',emoji:'✈️',zh:'飛機',zhuyin:'ㄈㄟ ㄐㄧ',en:'Airplane',kk:'[ˈɛrˌpleɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">飛機</text></svg>`},
  {id:'bicycle7',lv:7,cat:'vehicle',emoji:'🚲',zh:'腳踏車',zhuyin:'ㄐㄧㄠˇ ㄊㄚˋ ㄔㄜ',en:'Bicycle',kk:'[ˈbaɪsɪkəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">腳踏車</text></svg>`},
  {id:'bus7',lv:7,cat:'vehicle',emoji:'🚌',zh:'公車',zhuyin:'ㄍㄨㄥ ㄔㄜ',en:'Bus',kk:'[bʌs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">公車</text></svg>`},
  {id:'firetruck8',lv:8,cat:'vehicle',emoji:'🚒',zh:'消防車',zhuyin:'ㄒㄧㄠ ㄈㄤˊ ㄔㄜ',en:'Fire truck',kk:'[ˈfaɪɚ trʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">消防車</text></svg>`},
  {id:'train8',lv:8,cat:'vehicle',emoji:'🚂',zh:'火車',zhuyin:'ㄏㄨㄛˇ ㄔㄜ',en:'Train',kk:'[tren]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">火車</text></svg>`},
  {id:'house8',lv:8,cat:'daily',emoji:'🏠',zh:'房子',zhuyin:'ㄈㄤˊ ㄗ˙',en:'House',kk:'[haʊs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">房子</text></svg>`},
  {id:'cow9',lv:9,cat:'land',emoji:'🐮',zh:'牛',zhuyin:'ㄋㄧㄡˊ',en:'Cow',kk:'[kaʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">牛</text></svg>`},
  {id:'giraffe9',lv:9,cat:'land',emoji:'🦒',zh:'長頸鹿',zhuyin:'ㄔㄤˊ ㄐㄧㄥˇ ㄌㄨˋ',en:'Giraffe',kk:'[dʒəˈræf]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">長頸鹿</text></svg>`},
  {id:'turtle9',lv:9,cat:'sea',emoji:'🐢',zh:'海龜',zhuyin:'ㄏㄞˇ ㄍㄨㄟ',en:'Sea turtle',kk:'[ˈsiː ˌtɝtəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海龜</text></svg>`},
  {id:'tiger10',lv:10,cat:'land',emoji:'🐯',zh:'老虎',zhuyin:'ㄌㄠˇ ㄏㄨˇ',en:'Tiger',kk:'[ˈtaɪɡɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">老虎</text></svg>`},
  {id:'ladybug10',lv:10,cat:'insect',emoji:'🐞',zh:'瓢蟲',zhuyin:'ㄆㄧㄠˊ ㄔㄨㄥˊ',en:'Ladybug',kk:'[ˈleɪdiˌbʌɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">瓢蟲</text></svg>`},
  {id:'farm10',lv:10,cat:'nature',emoji:'🚜',zh:'農場',zhuyin:'ㄋㄨㄥˊ ㄔㄤˇ',en:'Farm',kk:'[fɑrm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">農場</text></svg>`},
  {id:'banana1',lv:1,cat:'food',emoji:'🍌',zh:'香蕉',zhuyin:'ㄒㄧㄤ ㄐㄧㄠ',en:'Banana',kk:'[bəˈnænə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">香蕉</text></svg>`},
  {id:'orange1',lv:1,cat:'food',emoji:'🍊',zh:'橘子',zhuyin:'ㄐㄩˊ ㄗ˙',en:'Orange',kk:'[ˈɔrɪndʒ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">橘子</text></svg>`},
  {id:'strawberry2',lv:2,cat:'food',emoji:'🍓',zh:'草莓',zhuyin:'ㄘㄠˇ ㄇㄟˊ',en:'Strawberry',kk:'[ˈstrɔˌbɛri]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">草莓</text></svg>`},
  {id:'book2',lv:2,cat:'daily',emoji:'📖',zh:'書',zhuyin:'ㄕㄨ',en:'Book',kk:'[bʊk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">書</text></svg>`},
  {id:'umbrella2',lv:2,cat:'daily',emoji:'☂️',zh:'雨傘',zhuyin:'ㄩˇ ㄙㄢˇ',en:'Umbrella',kk:'[ʌmˈbrɛlə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">雨傘</text></svg>`},
  {id:'grape3',lv:3,cat:'food',emoji:'🍇',zh:'葡萄',zhuyin:'ㄆㄨˊ ㄊㄠˊ',en:'Grape',kk:'[grep]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">葡萄</text></svg>`},
  {id:'watermelon3',lv:3,cat:'food',emoji:'🍉',zh:'西瓜',zhuyin:'ㄒㄧ ㄍㄨㄚ',en:'Watermelon',kk:'[ˈwɔtɚˌmɛlən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">西瓜</text></svg>`},
  {id:'bee4',lv:4,cat:'insect',emoji:'🐝',zh:'蜜蜂',zhuyin:'ㄇㄧˋ ㄈㄥ',en:'Bee',kk:'[bi]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蜜蜂</text></svg>`},
  {id:'dragonfly5',lv:5,cat:'insect',emoji:'🪽',zh:'蜻蜓',zhuyin:'ㄑㄧㄥ ㄊㄧㄥ',en:'Dragonfly',kk:'[ˈdrægənˌflaɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蜻蜓</text></svg>`},
  {id:'boat6',lv:6,cat:'vehicle',emoji:'⛵',zh:'船',zhuyin:'ㄔㄨㄢˊ',en:'Boat',kk:'[bot]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">船</text></svg>`},
  {id:'sun1',lv:1,cat:'nature',emoji:'☀️',zh:'太陽',zhuyin:'ㄊㄞˋ ㄧㄤˊ',en:'Sun',kk:'[sʌn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">太陽</text></svg>`},
  {id:'star1',lv:1,cat:'nature',emoji:'⭐',zh:'星星',zhuyin:'ㄒㄧㄥ ㄒㄧㄥ',en:'Star',kk:'[stɑr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">星星</text></svg>`},
  {id:'cloud1',lv:1,cat:'nature',emoji:'☁️',zh:'雲',zhuyin:'ㄩㄣˊ',en:'Cloud',kk:'[klaʊd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">雲</text></svg>`},
  {id:'moon2',lv:2,cat:'nature',emoji:'🌙',zh:'月亮',zhuyin:'ㄩㄝˋ ㄌㄧㄤˋ',en:'Moon',kk:'[mun]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">月亮</text></svg>`},
  {id:'flower3',lv:3,cat:'nature',emoji:'🌼',zh:'花',zhuyin:'ㄏㄨㄚ',en:'Flower',kk:'[ˈflaʊɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">花</text></svg>`},
  {id:'tree4',lv:4,cat:'nature',emoji:'🌳',zh:'樹',zhuyin:'ㄕㄨˋ',en:'Tree',kk:'[tri]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">樹</text></svg>`},
  {id:'rainbow4',lv:4,cat:'nature',emoji:'🌈',zh:'彩虹',zhuyin:'ㄘㄞˇ ㄏㄨㄥˊ',en:'Rainbow',kk:'[ˈrenˌbo]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">彩虹</text></svg>`},
  {id:'policecar7',lv:7,cat:'vehicle',emoji:'🚓',zh:'警車',zhuyin:'ㄐㄧㄥˇ ㄔㄜ',en:'Police car',kk:'[pəˈlis kɑr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">警車</text></svg>`},
  {id:'ambulance7',lv:7,cat:'vehicle',emoji:'🚑',zh:'救護車',zhuyin:'ㄐㄧㄡˋ ㄏㄨˋ ㄔㄜ',en:'Ambulance',kk:'[ˈæmbjələns]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">救護車</text></svg>`},
  {id:'excavator8',lv:8,cat:'vehicle',emoji:'🚜',zh:'工程車',zhuyin:'ㄍㄨㄥ ㄔㄥˊ ㄔㄜ',en:'Excavator',kk:'[ˈɛkskəˌvetɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="170" y="120" width="460" height="320" rx="30"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">工程車</text></svg>`},
  {id:'scooter5',lv:5,cat:'vehicle',emoji:'🛵',zh:'機車',zhuyin:'ㄐㄧ ㄔㄜ',en:'Scooter',kk:'[ˈskutɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">機車</text></svg>`},
  {id:'truck6',lv:6,cat:'vehicle',emoji:'🚚',zh:'卡車',zhuyin:'ㄎㄚˇ ㄔㄜ',en:'Truck',kk:'[trʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">卡車</text></svg>`},
  {id:'leaf2',lv:2,cat:'nature',emoji:'🍃',zh:'葉子',zhuyin:'ㄧㄝˋ ㄗ˙',en:'Leaf',kk:'[lif]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">葉子</text></svg>`},
  {id:'mountain6',lv:6,cat:'nature',emoji:'⛰️',zh:'山',zhuyin:'ㄕㄢ',en:'Mountain',kk:'[ˈmaʊntən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">山</text></svg>`},
  {id:'bear5',lv:5,cat:'land',emoji:'🐻',zh:'熊',zhuyin:'ㄒㄩㄥˊ',en:'Bear',kk:'[bɛr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">熊</text></svg>`},
  {id:'horse6',lv:6,cat:'land',emoji:'🐴',zh:'馬',zhuyin:'ㄇㄚˇ',en:'Horse',kk:'[hɔrs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">馬</text></svg>`},
  {id:'octopus7',lv:7,cat:'sea',emoji:'🐙',zh:'章魚',zhuyin:'ㄓㄤ ㄩˊ',en:'Octopus',kk:'[ˈɑktəpəs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">章魚</text></svg>`},
  {id:'shark7',lv:7,cat:'sea',emoji:'🦈',zh:'鯊魚',zhuyin:'ㄕㄚ ㄩˊ',en:'Shark',kk:'[ʃɑrk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鯊魚</text></svg>`},
  {id:'pear2',lv:2,cat:'food',emoji:'🍐',zh:'梨子',zhuyin:'ㄌㄧˊ ㄗ˙',en:'Pear',kk:'[pɛr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">梨子</text></svg>`},
  {id:'pineapple4',lv:4,cat:'food',emoji:'🍍',zh:'鳳梨',zhuyin:'ㄈㄥˋ ㄌㄧˊ',en:'Pineapple',kk:'[ˈpaɪnˌæpəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鳳梨</text></svg>`},
  {id:'pencil4',lv:4,cat:'daily',emoji:'✏️',zh:'鉛筆',zhuyin:'ㄑㄧㄢ ㄅㄧˇ',en:'Pencil',kk:'[ˈpɛnsəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鉛筆</text></svg>`},
  {id:'clock4',lv:4,cat:'daily',emoji:'⏰',zh:'時鐘',zhuyin:'ㄕˊ ㄓㄨㄥ',en:'Clock',kk:'[klɑk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">時鐘</text></svg>`},
  {id:'owl5',lv:5,cat:'air',emoji:'🦉',zh:'貓頭鷹',zhuyin:'ㄇㄠ ㄊㄡˊ ㄧㄥ',en:'Owl',kk:'[aʊl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">貓頭鷹</text></svg>`},
  {id:'parrot6',lv:6,cat:'air',emoji:'🦜',zh:'鸚鵡',zhuyin:'ㄧㄥ ㄨˇ',en:'Parrot',kk:'[ˈpærət]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鸚鵡</text></svg>`},
  {id:'ant4',lv:4,cat:'insect',emoji:'🐜',zh:'螞蟻',zhuyin:'ㄇㄚˇ ㄧˇ',en:'Ant',kk:'[ænt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">螞蟻</text></svg>`},
  {id:'caterpillar5',lv:5,cat:'insect',emoji:'🐛',zh:'毛毛蟲',zhuyin:'ㄇㄠˊ ㄇㄠˊ ㄔㄨㄥˊ',en:'Caterpillar',kk:'[ˈkætərˌpɪlər]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">毛毛蟲</text></svg>`},
  {id:'mango2',lv:2,cat:'food',emoji:'🥭',zh:'芒果',zhuyin:'ㄇㄤˊ ㄍㄨㄛˇ',en:'Mango',kk:'[ˈmæŋɡoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">芒果</text></svg>`},
  {id:'carrot3',lv:3,cat:'food',emoji:'🥕',zh:'紅蘿蔔',zhuyin:'ㄏㄨㄥˊ ㄌㄨㄛˊ ㄅㄛ˙',en:'Carrot',kk:'[ˈkærət]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">紅蘿蔔</text></svg>`},
  {id:'toothbrush5',lv:5,cat:'daily',emoji:'🪥',zh:'牙刷',zhuyin:'ㄧㄚˊ ㄕㄨㄚ',en:'Toothbrush',kk:'[ˈtuθˌbrʌʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">牙刷</text></svg>`},
  {id:'lamp5',lv:5,cat:'daily',emoji:'💡',zh:'檯燈',zhuyin:'ㄊㄞˊ ㄉㄥ',en:'Lamp',kk:'[læmp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">檯燈</text></svg>`},
  {id:'sheep5',lv:5,cat:'land',emoji:'🐑',zh:'綿羊',zhuyin:'ㄇㄧㄢˊ ㄧㄤˊ',en:'Sheep',kk:'[ʃip]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">綿羊</text></svg>`},
  {id:'fox6',lv:6,cat:'land',emoji:'🦊',zh:'狐狸',zhuyin:'ㄏㄨˊ ㄌㄧˊ',en:'Fox',kk:'[fɑks]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">狐狸</text></svg>`},
  {id:'jellyfish6',lv:6,cat:'sea',emoji:'🪼',zh:'水母',zhuyin:'ㄕㄨㄟˇ ㄇㄨˇ',en:'Jellyfish',kk:'[ˈdʒɛliˌfɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">水母</text></svg>`},
  {id:'starfish4',lv:4,cat:'sea',emoji:'⭐',zh:'海星',zhuyin:'ㄏㄞˇ ㄒㄧㄥ',en:'Starfish',kk:'[ˈstɑrˌfɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海星</text></svg>`},
  {id:'duck3',lv:3,cat:'air',emoji:'🦆',zh:'鴨子',zhuyin:'ㄧㄚ ㄗ˙',en:'Duck',kk:'[dʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鴨子</text></svg>`},
  {id:'eagle7',lv:7,cat:'air',emoji:'🦅',zh:'老鷹',zhuyin:'ㄌㄠˇ ㄧㄥ',en:'Eagle',kk:'[ˈiɡəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">老鷹</text></svg>`},
  {id:'beetle6',lv:6,cat:'insect',emoji:'🪲',zh:'甲蟲',zhuyin:'ㄐㄧㄚˇ ㄔㄨㄥˊ',en:'Beetle',kk:'[ˈbitəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">甲蟲</text></svg>`},
  {id:'grasshopper6',lv:6,cat:'insect',emoji:'🦗',zh:'蚱蜢',zhuyin:'ㄓㄚˋ ㄇㄥˇ',en:'Grasshopper',kk:'[ˈɡræsˌhɑpɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蚱蜢</text></svg>`},
  {id:'taxi5',lv:5,cat:'vehicle',emoji:'🚕',zh:'計程車',zhuyin:'ㄐㄧˋ ㄔㄥˊ ㄔㄜ',en:'Taxi',kk:'[ˈtæksi]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">計程車</text></svg>`},
  {id:'helicopter7',lv:7,cat:'vehicle',emoji:'🚁',zh:'直升機',zhuyin:'ㄓˊ ㄕㄥ ㄐㄧ',en:'Helicopter',kk:'[ˈhɛləˌkɑptɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">直升機</text></svg>`},
  {id:'mushroom4',lv:4,cat:'nature',emoji:'🍄',zh:'香菇',zhuyin:'ㄒㄧㄤ ㄍㄨ',en:'Mushroom',kk:'[ˈmʌʃˌrum]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">香菇</text></svg>`},
  {id:'snowflake5',lv:5,cat:'nature',emoji:'❄️',zh:'雪花',zhuyin:'ㄒㄩㄝˇ ㄏㄨㄚ',en:'Snowflake',kk:'[ˈsnoʊˌfleɪk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">雪花</text></svg>`},
  {id:'panda6',lv:6,cat:'land',emoji:'🐼',zh:'熊貓',zhuyin:'ㄒㄩㄥˊ ㄇㄠ',en:'Panda',kk:'[ˈpændə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">熊貓</text></svg>`},
  {id:'deer7',lv:7,cat:'land',emoji:'🦌',zh:'小鹿',zhuyin:'ㄒㄧㄠˇ ㄌㄨˋ',en:'Deer',kk:'[dɪr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小鹿</text></svg>`},
  {id:'seahorse5',lv:5,cat:'sea',emoji:'🪸',zh:'海馬',zhuyin:'ㄏㄞˇ ㄇㄚˇ',en:'Seahorse',kk:'[ˈsiˌhɔrs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海馬</text></svg>`},
  {id:'seal6',lv:6,cat:'sea',emoji:'🦭',zh:'海豹',zhuyin:'ㄏㄞˇ ㄅㄠˋ',en:'Seal',kk:'[sil]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">海豹</text></svg>`},
  {id:'swan5',lv:5,cat:'air',emoji:'🦢',zh:'天鵝',zhuyin:'ㄊㄧㄢ ㄜˊ',en:'Swan',kk:'[swɑn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">天鵝</text></svg>`},
  {id:'peacock7',lv:7,cat:'air',emoji:'🦚',zh:'孔雀',zhuyin:'ㄎㄨㄥˇ ㄑㄩㄝˋ',en:'Peacock',kk:'[ˈpiˌkɑk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">孔雀</text></svg>`},
  {id:'spider6',lv:6,cat:'insect',emoji:'🕷️',zh:'蜘蛛',zhuyin:'ㄓ ㄓㄨ',en:'Spider',kk:'[ˈspaɪdɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蜘蛛</text></svg>`},
  {id:'firefly5',lv:5,cat:'insect',emoji:'✨',zh:'螢火蟲',zhuyin:'ㄧㄥˊ ㄏㄨㄛˇ ㄔㄨㄥˊ',en:'Firefly',kk:'[ˈfaɪrˌflaɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">螢火蟲</text></svg>`},
  {id:'cherry3',lv:3,cat:'food',emoji:'🍒',zh:'櫻桃',zhuyin:'ㄧㄥ ㄊㄠˊ',en:'Cherry',kk:'[ˈtʃɛri]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">櫻桃</text></svg>`},
  {id:'corn4',lv:4,cat:'food',emoji:'🌽',zh:'玉米',zhuyin:'ㄩˋ ㄇㄧˇ',en:'Corn',kk:'[kɔrn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">玉米</text></svg>`},
  {id:'soap4',lv:4,cat:'daily',emoji:'🧼',zh:'肥皂',zhuyin:'ㄈㄟˊ ㄗㄠˋ',en:'Soap',kk:'[soʊp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">肥皂</text></svg>`},
  {id:'chair5',lv:5,cat:'daily',emoji:'🪑',zh:'椅子',zhuyin:'ㄧˇ ㄗ˙',en:'Chair',kk:'[tʃɛr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">椅子</text></svg>`},
  {id:'van6',lv:6,cat:'vehicle',emoji:'🚐',zh:'小巴士',zhuyin:'ㄒㄧㄠˇ ㄅㄚ ㄕˋ',en:'Van',kk:'[væn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小巴士</text></svg>`},
  {id:'rocket7',lv:7,cat:'vehicle',emoji:'🚀',zh:'火箭',zhuyin:'ㄏㄨㄛˇ ㄐㄧㄢˋ',en:'Rocket',kk:'[ˈrɑkɪt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">火箭</text></svg>`},
  {id:'cactus5',lv:5,cat:'nature',emoji:'🌵',zh:'仙人掌',zhuyin:'ㄒㄧㄢ ㄖㄣˊ ㄓㄤˇ',en:'Cactus',kk:'[ˈkæktəs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">仙人掌</text></svg>`},
  {id:'raindrop2',lv:2,cat:'nature',emoji:'💧',zh:'雨滴',zhuyin:'ㄩˇ ㄉㄧ',en:'Raindrop',kk:'[ˈreɪnˌdrɑp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">雨滴</text></svg>`},
  {id:'koala6',lv:6,cat:'land',emoji:'🐨',zh:'無尾熊',zhuyin:'ㄨˊ ㄨㄟˇ ㄒㄩㄥˊ',en:'Koala',kk:'[koʊˈɑlə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">無尾熊</text></svg>`},
  {id:'acorn3',lv:3,cat:'nature',emoji:'🌰',zh:'橡實',zhuyin:'ㄒㄧㄤˋ ㄕˊ',en:'Acorn',kk:'[ˈeɪˌkɔrn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">橡實</text></svg>`},
  {id:'cookie4',lv:4,cat:'food',emoji:'🍪',zh:'餅乾',zhuyin:'ㄅㄧㄥˇ ㄍㄢ',en:'Cookie',kk:'[ˈkʊki]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">餅乾</text></svg>`},
  {id:'tractor6',lv:6,cat:'vehicle',emoji:'🚜',zh:'拖拉機',zhuyin:'ㄊㄨㄛ ㄌㄚ ㄐㄧ',en:'Tractor',kk:'[ˈtræktɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">拖拉機</text></svg>`},
  {id:'kangaroo6',lv:6,cat:'land',emoji:'🦘',zh:'袋鼠',zhuyin:'ㄉㄞˋ ㄕㄨˇ',en:'Kangaroo',kk:'[ˌkæŋɡəˈru]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">袋鼠</text></svg>`},
  {id:'lobster6',lv:6,cat:'sea',emoji:'🦞',zh:'龍蝦',zhuyin:'ㄌㄨㄥˊ ㄒㄧㄚ',en:'Lobster',kk:'[ˈlɑbstɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">龍蝦</text></svg>`},
  {id:'squid6',lv:6,cat:'sea',emoji:'🦑',zh:'魷魚',zhuyin:'ㄧㄡˊ ㄩˊ',en:'Squid',kk:'[skwɪd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">魷魚</text></svg>`},
  {id:'shell4',lv:4,cat:'sea',emoji:'🐚',zh:'貝殼',zhuyin:'ㄅㄟˋ ㄎㄜˊ',en:'Shell',kk:'[ʃɛl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">貝殼</text></svg>`},
  {id:'flamingo6',lv:6,cat:'air',emoji:'🦩',zh:'紅鶴',zhuyin:'ㄏㄨㄥˊ ㄏㄜˋ',en:'Flamingo',kk:'[fləˈmɪŋɡoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">紅鶴</text></svg>`},
  {id:'dove4',lv:4,cat:'air',emoji:'🕊️',zh:'鴿子',zhuyin:'ㄍㄜ ㄗ˙',en:'Dove',kk:'[dʌv]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鴿子</text></svg>`},
  {id:'bat5',lv:5,cat:'air',emoji:'🦇',zh:'蝙蝠',zhuyin:'ㄅㄧㄢ ㄈㄨˊ',en:'Bat',kk:'[bæt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蝙蝠</text></svg>`},
  {id:'crow5',lv:5,cat:'air',emoji:'🐦‍⬛',zh:'烏鴉',zhuyin:'ㄨ ㄧㄚ',en:'Crow',kk:'[kroʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">烏鴉</text></svg>`},
  {id:'mosquito5',lv:5,cat:'insect',emoji:'🦟',zh:'蚊子',zhuyin:'ㄨㄣˊ ㄗ˙',en:'Mosquito',kk:'[məˈskitoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蚊子</text></svg>`},
  {id:'fly4',lv:4,cat:'insect',emoji:'🪰',zh:'蒼蠅',zhuyin:'ㄘㄤ ㄧㄥˊ',en:'Fly',kk:'[flaɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蒼蠅</text></svg>`},
  {id:'cockroach6',lv:6,cat:'insect',emoji:'🪳',zh:'蟑螂',zhuyin:'ㄓㄤ ㄌㄤˊ',en:'Cockroach',kk:'[ˈkɑkˌroʊtʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蟑螂</text></svg>`},
  {id:'worm4',lv:4,cat:'insect',emoji:'🪱',zh:'蚯蚓',zhuyin:'ㄑㄧㄡ ㄧㄣˇ',en:'Worm',kk:'[wɝm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蚯蚓</text></svg>`},
  {id:'tomato3',lv:3,cat:'food',emoji:'🍅',zh:'番茄',zhuyin:'ㄈㄢ ㄑㄧㄝˊ',en:'Tomato',kk:'[təˈmeɪtoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">番茄</text></svg>`},
  {id:'pumpkin4',lv:4,cat:'food',emoji:'🎃',zh:'南瓜',zhuyin:'ㄋㄢˊ ㄍㄨㄚ',en:'Pumpkin',kk:'[ˈpʌmpkɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">南瓜</text></svg>`},
  {id:'spoon3',lv:3,cat:'daily',emoji:'🥄',zh:'湯匙',zhuyin:'ㄊㄤ ㄔˊ',en:'Spoon',kk:'[spun]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">湯匙</text></svg>`},
  {id:'sneaker5',lv:5,cat:'daily',emoji:'👟',zh:'球鞋',zhuyin:'ㄑㄧㄡˊ ㄒㄧㄝˊ',en:'Sneaker',kk:'[ˈsnikɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">球鞋</text></svg>`},
  {id:'volcano7',lv:7,cat:'nature',emoji:'🌋',zh:'火山',zhuyin:'ㄏㄨㄛˇ ㄕㄢ',en:'Volcano',kk:'[vɑlˈkeɪnoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">火山</text></svg>`},
  {id:'ship6',lv:6,cat:'vehicle',emoji:'🚢',zh:'輪船',zhuyin:'ㄌㄨㄣˊ ㄔㄨㄢˊ',en:'Ship',kk:'[ʃɪp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">輪船</text></svg>`},
  {id:'zebra5',lv:5,cat:'land',emoji:'🦓',zh:'斑馬',zhuyin:'ㄅㄢ ㄇㄚˇ',en:'Zebra',kk:'[ˈzibrə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦓</text></svg>`},
  {id:'squirrel5',lv:5,cat:'land',emoji:'🐿️',zh:'松鼠',zhuyin:'ㄙㄨㄥ ㄕㄨˇ',en:'Squirrel',kk:'[ˈskwɝəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐿️</text></svg>`},
  {id:'pufferfish5',lv:5,cat:'sea',emoji:'🐡',zh:'河豚',zhuyin:'ㄏㄜˊ ㄊㄨㄣˊ',en:'Pufferfish',kk:'[ˈpʌfɚˌfɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐡</text></svg>`},
  {id:'shrimp4',lv:4,cat:'sea',emoji:'🦐',zh:'蝦子',zhuyin:'ㄒㄧㄚ ㄗ˙',en:'Shrimp',kk:'[ʃrɪmp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦐</text></svg>`},
  {id:'penguin4',lv:4,cat:'air',emoji:'🐧',zh:'企鵝',zhuyin:'ㄑㄧˋ ㄜˊ',en:'Penguin',kk:'[ˈpɛŋɡwɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐧</text></svg>`},
  {id:'seagull5',lv:5,cat:'air',emoji:'🕊️',zh:'海鷗',zhuyin:'ㄏㄞˇ ㄡ',en:'Seagull',kk:'[ˈsiˌɡʌl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🕊️</text></svg>`},
  {id:'snail4',lv:4,cat:'insect',emoji:'🐌',zh:'蝸牛',zhuyin:'ㄍㄨㄚ ㄋㄧㄡˊ',en:'Snail',kk:'[sneɪl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐌</text></svg>`},
  {id:'scorpion6',lv:6,cat:'insect',emoji:'🦂',zh:'蠍子',zhuyin:'ㄒㄧㄝ ㄗ˙',en:'Scorpion',kk:'[ˈskɔrpiən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦂</text></svg>`},
  {id:'lemon2',lv:2,cat:'food',emoji:'🍋',zh:'檸檬',zhuyin:'ㄋㄧㄥˊ ㄇㄥˊ',en:'Lemon',kk:'[ˈlɛmən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🍋</text></svg>`},
  {id:'donut4',lv:4,cat:'food',emoji:'🍩',zh:'甜甜圈',zhuyin:'ㄊㄧㄢˊ ㄊㄧㄢˊ ㄑㄩㄢ',en:'Donut',kk:'[ˈdoʊˌnʌt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🍩</text></svg>`},
  {id:'scissors4',lv:4,cat:'daily',emoji:'✂️',zh:'剪刀',zhuyin:'ㄐㄧㄢˇ ㄉㄠ',en:'Scissors',kk:'[ˈsɪzɚz]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">✂️</text></svg>`},
  {id:'cap3',lv:3,cat:'daily',emoji:'🧢',zh:'帽子',zhuyin:'ㄇㄠˋ ㄗ˙',en:'Cap',kk:'[kæp]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🧢</text></svg>`},
  {id:'speedboat6',lv:6,cat:'vehicle',emoji:'🚤',zh:'快艇',zhuyin:'ㄎㄨㄞˋ ㄊㄧㄥˇ',en:'Speedboat',kk:'[ˈspidˌboʊt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🚤</text></svg>`},
  {id:'cablecar6',lv:6,cat:'vehicle',emoji:'🚠',zh:'纜車',zhuyin:'ㄌㄢˇ ㄔㄜ',en:'Cable car',kk:'[ˈkeɪbəl kɑr]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🚠</text></svg>`},
  {id:'mapleleaf3',lv:3,cat:'nature',emoji:'🍁',zh:'楓葉',zhuyin:'ㄈㄥ ㄧㄝˋ',en:'Maple leaf',kk:'[ˈmeɪpəl lif]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🍁</text></svg>`},
  {id:'pinetree4',lv:4,cat:'nature',emoji:'🌲',zh:'松樹',zhuyin:'ㄙㄨㄥ ㄕㄨˋ',en:'Pine tree',kk:'[paɪn tri]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🌲</text></svg>`},
  {id:'raccoon5',lv:5,cat:'land',emoji:'🦝',zh:'浣熊',zhuyin:'ㄏㄨㄢˋ ㄒㄩㄥˊ',en:'Raccoon',kk:'[ræˈkun]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦝</text></svg>`},
  {id:'hedgehog5',lv:5,cat:'land',emoji:'🦔',zh:'刺蝟',zhuyin:'ㄘˋ ㄨㄟˋ',en:'Hedgehog',kk:'[ˈhɛdʒˌhɑɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦔</text></svg>`},
  {id:'seaurchin5',lv:5,cat:'sea',emoji:'🦔',zh:'海膽',zhuyin:'ㄏㄞˇ ㄉㄢˇ',en:'Sea urchin',kk:'[ˈsiː ˌɝtʃɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦔</text></svg>`},
  {id:'coralfish5',lv:5,cat:'sea',emoji:'🐠',zh:'珊瑚魚',zhuyin:'ㄕㄢ ㄏㄨˊ ㄩˊ',en:'Coral fish',kk:'[ˈkɔrəl fɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐠</text></svg>`},
  {id:'hummingbird6',lv:6,cat:'air',emoji:'🐦',zh:'蜂鳥',zhuyin:'ㄈㄥ ㄋㄧㄠˇ',en:'Hummingbird',kk:'[ˈhʌmɪŋˌbɝd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐦</text></svg>`},
  {id:'woodpecker6',lv:6,cat:'air',emoji:'🐦',zh:'啄木鳥',zhuyin:'ㄓㄨㄛˊ ㄇㄨˋ ㄋㄧㄠˇ',en:'Woodpecker',kk:'[ˈwʊdˌpɛkɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐦</text></svg>`},
  {id:'mantis5',lv:5,cat:'insect',emoji:'🦗',zh:'螳螂',zhuyin:'ㄊㄤˊ ㄌㄤˊ',en:'Mantis',kk:'[ˈmæntɪs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🦗</text></svg>`},
  {id:'centipede6',lv:6,cat:'insect',emoji:'🐛',zh:'蜈蚣',zhuyin:'ㄨˊ ㄍㄨㄥ',en:'Centipede',kk:'[ˈsɛntəˌpid]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🐛</text></svg>`},
  {id:'avocado3',lv:3,cat:'food',emoji:'🥑',zh:'酪梨',zhuyin:'ㄌㄨㄛˋ ㄌㄧˊ',en:'Avocado',kk:'[ˌævəˈkɑdoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🥑</text></svg>`},
  {id:'cupcake4',lv:4,cat:'food',emoji:'🧁',zh:'杯子蛋糕',zhuyin:'ㄅㄟ ㄗ˙ ㄉㄢˋ ㄍㄠ',en:'Cupcake',kk:'[ˈkʌpˌkeɪk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🧁</text></svg>`},
  {id:'toothpaste4',lv:4,cat:'daily',emoji:'🪥',zh:'牙膏',zhuyin:'ㄧㄚˊ ㄍㄠ',en:'Toothpaste',kk:'[ˈtuθˌpeɪst]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🪥</text></svg>`},
  {id:'comb3',lv:3,cat:'daily',emoji:'🪮',zh:'梳子',zhuyin:'ㄕㄨ ㄗ˙',en:'Comb',kk:'[koʊm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🪮</text></svg>`},
  {id:'garbagetruck7',lv:7,cat:'vehicle',emoji:'🚛',zh:'垃圾車',zhuyin:'ㄌㄜˋ ㄙㄜˋ ㄔㄜ',en:'Garbage truck',kk:'[ˈɡɑrbɪdʒ trʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🚛</text></svg>`},
  {id:'sailboat6',lv:6,cat:'vehicle',emoji:'⛵',zh:'帆船',zhuyin:'ㄈㄢˊ ㄔㄨㄢˊ',en:'Sailboat',kk:'[ˈseɪlˌboʊt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">⛵</text></svg>`},
  {id:'pinecone4',lv:4,cat:'nature',emoji:'🌰',zh:'松果',zhuyin:'ㄙㄨㄥ ㄍㄨㄛˇ',en:'Pinecone',kk:'[ˈpaɪnˌkoʊn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">🌰</text></svg>`},
  {id:'waterfall5',lv:5,cat:'nature',emoji:'💧',zh:'瀑布',zhuyin:'ㄆㄨˋ ㄅㄨˋ',en:'Waterfall',kk:'[ˈwɔtɚˌfɔl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><text x="400" y="370" text-anchor="middle" font-size="250" stroke="none">💧</text></svg>`},
  {id:'camel6',lv:6,cat:'land',emoji:'🐫',zh:'駱駝',zhuyin:'ㄌㄨㄛˋ ㄊㄨㄛ˙',en:'Camel',kk:'[ˈkæməl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">駱駝</text></svg>`},
  {id:'hippo6',lv:6,cat:'land',emoji:'🦛',zh:'河馬',zhuyin:'ㄏㄜˊ ㄇㄚˇ',en:'Hippo',kk:'[ˈhɪpoʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">河馬</text></svg>`},
  {id:'mantaray6',lv:6,cat:'sea',emoji:'🐟',zh:'魟魚',zhuyin:'ㄏㄨㄥ ㄩˊ',en:'Manta ray',kk:'[ˈmæntə reɪ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">魟魚</text></svg>`},
  {id:'narwhal6',lv:6,cat:'sea',emoji:'🐳',zh:'獨角鯨',zhuyin:'ㄉㄨˊ ㄐㄧㄠˇ ㄐㄧㄥ',en:'Narwhal',kk:'[ˈnɑrwəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">獨角鯨</text></svg>`},
  {id:'pelican6',lv:6,cat:'air',emoji:'🐦',zh:'鵜鶘',zhuyin:'ㄊㄧˊ ㄏㄨˊ',en:'Pelican',kk:'[ˈpɛlɪkən]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">鵜鶘</text></svg>`},
  {id:'sparrow4',lv:4,cat:'air',emoji:'🐦',zh:'麻雀',zhuyin:'ㄇㄚˊ ㄑㄩㄝˋ',en:'Sparrow',kk:'[ˈspæroʊ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">麻雀</text></svg>`},
  {id:'scarab6',lv:6,cat:'insect',emoji:'🪲',zh:'金龜子',zhuyin:'ㄐㄧㄣ ㄍㄨㄟ ㄗ˙',en:'Scarab',kk:'[ˈskærəb]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">金龜子</text></svg>`},
  {id:'longhornbeetle6',lv:6,cat:'insect',emoji:'🪲',zh:'天牛',zhuyin:'ㄊㄧㄢ ㄋㄧㄡˊ',en:'Longhorn beetle',kk:'[ˈlɔŋˌhɔrn ˈbitəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">天牛</text></svg>`},
  {id:'pizza4',lv:4,cat:'food',emoji:'🍕',zh:'披薩',zhuyin:'ㄆㄧ ㄙㄚˋ',en:'Pizza',kk:'[ˈpitsə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">披薩</text></svg>`},
  {id:'hotdog4',lv:4,cat:'food',emoji:'🌭',zh:'熱狗',zhuyin:'ㄖㄜˋ ㄍㄡˇ',en:'Hot dog',kk:'[ˈhɑtˌdɔɡ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">熱狗</text></svg>`},
  {id:'teapot4',lv:4,cat:'daily',emoji:'🫖',zh:'茶壺',zhuyin:'ㄔㄚˊ ㄏㄨˊ',en:'Teapot',kk:'[ˈtiˌpɑt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">茶壺</text></svg>`},
  {id:'fork3',lv:3,cat:'daily',emoji:'🍴',zh:'叉子',zhuyin:'ㄔㄚ ㄗ˙',en:'Fork',kk:'[fɔrk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">叉子</text></svg>`},
  {id:'tram7',lv:7,cat:'vehicle',emoji:'🚋',zh:'電車',zhuyin:'ㄉㄧㄢˋ ㄔㄜ',en:'Tram',kk:'[træm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">電車</text></svg>`},
  {id:'hotairballoon7',lv:7,cat:'vehicle',emoji:'🎈',zh:'熱氣球',zhuyin:'ㄖㄜˋ ㄑㄧˋ ㄑㄧㄡˊ',en:'Hot-air balloon',kk:'[ˌhɑt ˈɛr bəˌlun]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">熱氣球</text></svg>`},
  {id:'rock4',lv:4,cat:'nature',emoji:'🪨',zh:'岩石',zhuyin:'ㄧㄢˊ ㄕˊ',en:'Rock',kk:'[rɑk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">岩石</text></svg>`},
  {id:'cave5',lv:5,cat:'nature',emoji:'🪨',zh:'洞穴',zhuyin:'ㄉㄨㄥˋ ㄒㄩㄝˋ',en:'Cave',kk:'[kev]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">洞穴</text></svg>`},
  {id:'sloth6',lv:6,cat:'land',emoji:'🦥',zh:'樹懶',zhuyin:'ㄕㄨˋ ㄌㄢˇ',en:'Sloth',kk:'[sloʊθ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">樹懶</text></svg>`},
  {id:'gorilla7',lv:7,cat:'land',emoji:'🦍',zh:'大猩猩',zhuyin:'ㄉㄚˋ ㄒㄧㄥ ㄒㄧㄥ',en:'Gorilla',kk:'[ɡəˈrɪlə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">大猩猩</text></svg>`},
  {id:'pearloyster5',lv:5,cat:'sea',emoji:'🦪',zh:'珍珠貝',zhuyin:'ㄓㄣ ㄓㄨ ㄅㄟˋ',en:'Pearl oyster',kk:'[ˈpɝl ˌɔɪstɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">珍珠貝</text></svg>`},
  {id:'clownfish5',lv:5,cat:'sea',emoji:'🐠',zh:'小丑魚',zhuyin:'ㄒㄧㄠˇ ㄔㄡˇ ㄩˊ',en:'Clownfish',kk:'[ˈklaʊnˌfɪʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小丑魚</text></svg>`},
  {id:'toucan6',lv:6,cat:'air',emoji:'🐦',zh:'巨嘴鳥',zhuyin:'ㄐㄩˋ ㄗㄨㄟˇ ㄋㄧㄠˇ',en:'Toucan',kk:'[ˈtuːkæn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">巨嘴鳥</text></svg>`},
  {id:'goose5',lv:5,cat:'air',emoji:'🪿',zh:'白鵝',zhuyin:'ㄅㄞˊ ㄜˊ',en:'Goose',kk:'[ɡuːs]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">白鵝</text></svg>`},
  {id:'cicada6',lv:6,cat:'insect',emoji:'🦗',zh:'蟬',zhuyin:'ㄔㄢˊ',en:'Cicada',kk:'[sɪˈkeɪdə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蟬</text></svg>`},
  {id:'rhinobeetle6',lv:6,cat:'insect',emoji:'🪲',zh:'獨角仙',zhuyin:'ㄉㄨˊ ㄐㄧㄠˇ ㄒㄧㄢ',en:'Rhinoceros beetle',kk:'[raɪˈnɑsərəs ˈbitəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">獨角仙</text></svg>`},
  {id:'croissant3',lv:3,cat:'food',emoji:'🥐',zh:'可頌',zhuyin:'ㄎㄜˇ ㄙㄨㄥˋ',en:'Croissant',kk:'[krəˈsɑnt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">可頌</text></svg>`},
  {id:'sandwich4',lv:4,cat:'food',emoji:'🥪',zh:'三明治',zhuyin:'ㄙㄢ ㄇㄧㄥˊ ㄓˋ',en:'Sandwich',kk:'[ˈsænwɪtʃ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">三明治</text></svg>`},
  {id:'bowl3',lv:3,cat:'daily',emoji:'🥣',zh:'碗',zhuyin:'ㄨㄢˇ',en:'Bowl',kk:'[boʊl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">碗</text></svg>`},
  {id:'fryingpan5',lv:5,cat:'daily',emoji:'🍳',zh:'平底鍋',zhuyin:'ㄆㄧㄥˊ ㄉㄧˇ ㄍㄨㄛ',en:'Frying pan',kk:'[ˈfraɪɪŋ pæn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">平底鍋</text></svg>`},
  {id:'cementmixer7',lv:7,cat:'vehicle',emoji:'🚚',zh:'水泥車',zhuyin:'ㄕㄨㄟˇ ㄋㄧˊ ㄔㄜ',en:'Cement mixer',kk:'[sɪˈmɛnt ˈmɪksɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">水泥車</text></svg>`},
  {id:'towtruck7',lv:7,cat:'vehicle',emoji:'🚚',zh:'拖吊車',zhuyin:'ㄊㄨㄛ ㄉㄧㄠˋ ㄔㄜ',en:'Tow truck',kk:'[ˈtoʊ ˌtrʌk]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">拖吊車</text></svg>`},
  {id:'tent4',lv:4,cat:'nature',emoji:'⛺',zh:'帳篷',zhuyin:'ㄓㄤˋ ㄆㄥˊ',en:'Tent',kk:'[tɛnt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">帳篷</text></svg>`},
  {id:'kite4',lv:4,cat:'nature',emoji:'🪁',zh:'風箏',zhuyin:'ㄈㄥ ㄓㄥ',en:'Kite',kk:'[kaɪt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">風箏</text></svg>`},
  {id:'alpaca6',lv:6,cat:'land',emoji:'🦙',zh:'羊駝',zhuyin:'ㄧㄤˊ ㄊㄨㄛˊ',en:'Alpaca',kk:'[ælˈpækə]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">羊駝</text></svg>`},
  {id:'beaver6',lv:6,cat:'land',emoji:'🦫',zh:'河狸',zhuyin:'ㄏㄜˊ ㄌㄧˊ',en:'Beaver',kk:'[ˈbivɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">河狸</text></svg>`},
  {id:'otter6',lv:6,cat:'sea',emoji:'🦦',zh:'水獺',zhuyin:'ㄕㄨㄟˇ ㄊㄚˇ',en:'Otter',kk:'[ˈɑtɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">水獺</text></svg>`},
  {id:'coral5',lv:5,cat:'sea',emoji:'🪸',zh:'珊瑚',zhuyin:'ㄕㄢ ㄏㄨˊ',en:'Coral',kk:'[ˈkɔrəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">珊瑚</text></svg>`},
  {id:'robin4',lv:4,cat:'air',emoji:'🐦',zh:'知更鳥',zhuyin:'ㄓ ㄍㄥ ㄋㄧㄠˇ',en:'Robin',kk:'[ˈrɑbɪn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">知更鳥</text></svg>`},
  {id:'kingfisher6',lv:6,cat:'air',emoji:'🐦',zh:'翠鳥',zhuyin:'ㄘㄨㄟˋ ㄋㄧㄠˇ',en:'Kingfisher',kk:'[ˈkɪŋˌfɪʃɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">翠鳥</text></svg>`},
  {id:'stickinsect6',lv:6,cat:'insect',emoji:'🪲',zh:'竹節蟲',zhuyin:'ㄓㄨˊ ㄐㄧㄝˊ ㄔㄨㄥˊ',en:'Stick insect',kk:'[ˈstɪk ˌɪnsɛkt]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">竹節蟲</text></svg>`},
  {id:'silkworm5',lv:5,cat:'insect',emoji:'🐛',zh:'蠶寶寶',zhuyin:'ㄘㄢˊ ㄅㄠˇ ㄅㄠˇ',en:'Silkworm',kk:'[ˈsɪlkˌwɝm]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">蠶寶寶</text></svg>`},
  {id:'sushi4',lv:4,cat:'food',emoji:'🍣',zh:'壽司',zhuyin:'ㄕㄡˋ ㄙ',en:'Sushi',kk:'[ˈsuʃi]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">壽司</text></svg>`},
  {id:'icecream4',lv:4,cat:'food',emoji:'🍨',zh:'冰淇淋',zhuyin:'ㄅㄧㄥ ㄑㄧˊ ㄌㄧㄣˊ',en:'Ice cream',kk:'[ˈaɪs ˌkrim]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">冰淇淋</text></svg>`},
  {id:'plate3',lv:3,cat:'daily',emoji:'🍽️',zh:'盤子',zhuyin:'ㄆㄢˊ ㄗ˙',en:'Plate',kk:'[plet]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">盤子</text></svg>`},
  {id:'lantern4',lv:4,cat:'daily',emoji:'🏮',zh:'露營燈',zhuyin:'ㄌㄨˋ ㄧㄥˊ ㄉㄥ',en:'Camp lantern',kk:'[ˈkæmp ˌlæntɚn]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">露營燈</text></svg>`},
  {id:'motorcycle6',lv:6,cat:'vehicle',emoji:'🏍️',zh:'摩托車',zhuyin:'ㄇㄛˊ ㄊㄨㄛ ㄔㄜ',en:'Motorcycle',kk:'[ˈmoʊtɚˌsaɪkəl]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">摩托車</text></svg>`},
  {id:'forklift7',lv:7,cat:'vehicle',emoji:'🏗️',zh:'堆高機',zhuyin:'ㄉㄨㄟ ㄍㄠ ㄐㄧ',en:'Forklift',kk:'[ˈfɔrkˌlɪft]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">堆高機</text></svg>`},
  {id:'campfire5',lv:5,cat:'nature',emoji:'🔥',zh:'營火',zhuyin:'ㄧㄥˊ ㄏㄨㄛˇ',en:'Campfire',kk:'[ˈkæmpˌfaɪɚ]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">營火</text></svg>`},
  {id:'island5',lv:5,cat:'nature',emoji:'🏝️',zh:'小島',zhuyin:'ㄒㄧㄠˇ ㄉㄠˇ',en:'Island',kk:'[ˈaɪlənd]',svg:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" fill="none" stroke="#555" stroke-width="10"><rect x="140" y="90" width="520" height="420" rx="36"/><text x="400" y="300" text-anchor="middle" font-size="42" fill="#777" stroke="none">小島</text></svg>`},
];

// V1.4.1: replace the prototype geometric drawings with the high-recognition line-art library.
// The original inline SVGs remain only as a fallback if lineart.js fails to load.
if (typeof window !== 'undefined' && window.KIDS_LINEART) {
  templates.forEach(t => { if (window.KIDS_LINEART[t.id]) t.svg = window.KIDS_LINEART[t.id]; });
}


const DEFAULT_SETTINGS = {palmReject:true, pressure:true, pressureCurve:'normal', traceDefault:false, rewardSound:true, traceJudge:false, autoStep:false, traceVoice:false, completionFx:true, guideOpacity:.15, lockOutlineTop:true};
let LAYER_NAMES = ['描線','上色','自由畫'];
const DEFAULT_LAYER_META = [
  {id:'trace',name:'描線',icon:'✏️',desc:'沿著底圖描線',system:true},
  {id:'color',name:'上色',icon:'🎨',desc:'用畫筆自由著色',system:true},
  {id:'free',name:'自由畫',icon:'✨',desc:'自由加畫內容',system:true}
];
const MAX_DRAW_LAYERS = 8;
let layerMeta = DEFAULT_LAYER_META.map(x=>({...x}));
let layerSeq = 4;
const STORAGE_SETTINGS = 'kidsDrawingSettingsV168';
const STORAGE_STARS = 'kidsDrawingStarsV154';
const STORAGE_DONE = 'kidsDrawingDoneTemplatesV154';
const STORAGE_TRACE_PROGRESS = 'kidsDrawingTraceProgressV154';

let settings = {...DEFAULT_SETTINGS, ...safeJson(localStorage.getItem(STORAGE_SETTINGS),{})};
let state = {
  level:null, levelRange:null, category:null, current:null, tool:'pencil', size:8, opacity:1, color:COLORS[0], guideOpacity:normalizeGuideOpacity(settings.guideOpacity), guideStyle:getGuideStyle(), detailMode:'simple',
  activeLayer:0, layerVisible:[true,true,true], layerLocked:[false,false,false], layerOpacity:[1,1,1], history:[], historyIndex:-1,
  practiceMode:'en', practiceStage:0, traceAssist:settings.traceDefault,
  traceSteps:[], traceStepIndex:0, traceCompleted:new Set(), traceScores:{}, traceStats:{hits:0,total:0,strokes:0}, stepMask:null,
  lastPenAt:0, activePointer:null, drawSession:0, libraryMode:getLibraryMode(), paletteCollapsed:null,
  mainCanvasSize:null, practiceCanvasSize:null
};

const guideCanvas = $('#guideCanvas');
const gctx = guideCanvas.getContext('2d');
const lockedInkImage = $('#lockedInkImage');
const outlineTopCanvas = $('#outlineTopCanvas');
const outlineTopCtx = outlineTopCanvas.getContext('2d');
let outlineTopGeneration = 0;
let guideDrawGeneration = 0;
const outlineInkCache = new Map();
let drawCanvases = [$('#drawCanvas1'),$('#drawCanvas2'),$('#drawCanvas3')];
let drawCtxs = drawCanvases.map(c=>c.getContext('2d'));
drawCanvases.forEach((c,i)=>c.dataset.layer=String(i));
const practiceGuide = $('#practiceGuideCanvas'), practiceCanvas = $('#practiceCanvas');
const pgctx = practiceGuide.getContext('2d'), pctx = practiceCanvas.getContext('2d');

function safeJson(s,fallback){try{return s?JSON.parse(s):fallback}catch{return fallback}}
function isIPadLike(){return /iPad/i.test(navigator.userAgent||'')||((navigator.platform==='MacIntel'||/Macintosh/i.test(navigator.userAgent||''))&&(navigator.maxTouchPoints||0)>1)}
function isIOSLike(){return /iPad|iPhone|iPod/i.test(navigator.userAgent||'')||isIPadLike()}
if(isIPadLike())document.documentElement.classList.add('ipad-device');else document.documentElement.classList.remove('ipad-device');
function almostSameSize(a,b,tolerance=1){return !!a&&Math.abs((a.w||0)-(b.w||0))<=tolerance&&Math.abs((a.h||0)-(b.h||0))<=tolerance}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),1800)}
function showView(id,{scroll=true,force=false}={}){const target=$(id);if(!target)return;const wasActive=target.classList.contains('active');$$('.view').forEach(v=>v.classList.remove('active'));target.classList.add('active');if(scroll&&(!wasActive||force))scrollTo({top:0,behavior:'smooth'})}
function saveSettings(){localStorage.setItem(STORAGE_SETTINGS,JSON.stringify(settings))}
function normalizeGuideOpacity(value){
  const n=Number(value);
  if(!Number.isFinite(n))return .15;
  return Math.min(1,Math.max(0,n));
}
function guideOpacityPercent(){return Math.round(normalizeGuideOpacity(state.guideOpacity)*100)}
function syncGuideOpacityUI(){
  const range=$('#guideOpacityRange');
  const out=$('#guideOpacityValue');
  const btn=$('#toggleGuideBtn');
  const pct=guideOpacityPercent();
  if(range)range.value=String(pct);
  if(out)out.textContent=`${pct}%`;
  if(btn)btn.textContent=pct>0?`👁️ 底圖 ${pct}%`:'🙈 底圖隱藏';
}
async function setGuideOpacity(value,{persist=true,redraw=true}={}){
  state.guideOpacity=normalizeGuideOpacity(value);
  if(persist){settings.guideOpacity=state.guideOpacity;saveSettings()}
  syncGuideOpacityUI();
  updateGuideStyleUI();
  if(redraw&&state.current)await drawGuide();
  else await renderOutlineTop();
}

function getStars(){return +(localStorage.getItem(STORAGE_STARS)||0)}
function setStars(n){localStorage.setItem(STORAGE_STARS,String(Math.max(0,n)));updateStarUI()}
function doneTemplates(){return new Set(safeJson(localStorage.getItem(STORAGE_DONE),[]))}
function markDone(id){const s=doneTemplates();s.add(id);localStorage.setItem(STORAGE_DONE,JSON.stringify([...s]))}
function updateStarUI(){$('#starCount').textContent=getStars();$('#parentStars').textContent=getStars()}

// V1.8.22: category search is ephemeral, never written to localStorage.
let categorySearchTerm='';
let categoryProgressFilter='all';
// V1.8.45: anime artwork mode is ephemeral, and never modifies the saved work format.
let gameArtMode='outline';
const GAME_MODE_SETTINGS={
  outline:{style:'outline',opacity:.90,help:'黑白線稿清楚顯示，拿起彩色畫筆直接著色。'},
  color:{style:'color',opacity:.65,help:'顯示彩色參考底圖，可繼續描繪及添加顏色。'},
  free:{style:'outline',opacity:0,help:'純白空白畫布，自由畫畫；原本已畫的圖層仍保留。'}
};
function updateGameModeControls(){
  document.querySelectorAll('[data-game-preview],[data-game-draw]').forEach(btn=>{
    const mode=btn.dataset.gamePreview||btn.dataset.gameDraw,selected=mode===gameArtMode;
    btn.classList.toggle('active',selected);btn.setAttribute('aria-pressed',String(selected));
  });
  const bar=document.getElementById('gameDrawingModes');
  if(bar)bar.hidden=state.current?.cat!=='anime-games';
  const help=document.getElementById('gameModeHelp');
  if(help)help.textContent=GAME_MODE_SETTINGS[gameArtMode].help+' 切換模式不會清除已畫圖層。';
  const modeTitle=bar?.querySelector('strong');if(modeTitle&&state.current?.cat==='anime-games')modeTitle.textContent=(GAME_ART_SERIES.find(x=>x.id===gameArtSeriesFor(state.current))?.label||'動漫遊戲')+'・繪畫方式';
}
async function setGameArtMode(mode,{redraw=true}={}){
  if(!Object.prototype.hasOwnProperty.call(GAME_MODE_SETTINGS,mode))return;
  gameArtMode=mode;
  const config=GAME_MODE_SETTINGS[mode];
  // Keep the drawing layer contents. Only the non-editable guide canvas changes.
  resetActivePointerSession();
  state.guideStyle=config.style;updateGuideStyleUI();
  await setGuideOpacity(config.opacity,{persist:false,redraw:redraw&&state.current?.cat==='anime-games'});
  updateGameModeControls();
  if(state.category==='anime-games'&&document.getElementById('categoryView')?.classList.contains('active'))renderCategoryPage('anime-games');
}

// V1.8.23: remember the actual selection list when entering the drawing board.
let drawEntry=null;
function openFromCategory(id){
  const ids=[...document.querySelectorAll('#categoryTemplateGrid [data-id].category-template-card, #categoryTemplateGrid .game-character-card[data-id]')].map(el=>el.dataset.id);
  drawEntry={view:'category',category:state.category,ids,selected:id};
  return openTemplate(id);
}
function openFromHome(id){drawEntry={view:'home',ids:[],selected:id};return openTemplate(id)}
function returnToPicker(){
  if(!state.current)return;
  if(!confirmTemplateSwitch())return;
  exitDrawFullscreen();resetActivePointerSession();
  if(drawEntry?.view==='category'&&drawEntry.category){
    state.category=drawEntry.category;
    renderCategoryPage(drawEntry.category);showView('#categoryView');
    const card=[...document.querySelectorAll('#categoryTemplateGrid .category-template-card')].find(el=>el.dataset.id===state.current.id);
    if(card){card.classList.add('recently-opened');requestAnimationFrame(()=>card.scrollIntoView({block:'center',behavior:'smooth'}));}
  } else {renderHome();showView('#homeView');}
}

function normalizeCategorySearch(value){return String(value||'').normalize('NFKC').trim().toLocaleLowerCase();}
function openCategoryPage(catId){
  const cat=categories.find(x=>x[0]===catId);
  if(!cat)return;
  resetActivePointerSession();
  state.category=catId;
  state.categoryPageLevel=null;
  categorySearchTerm='';categoryProgressFilter='all';
  const queryBox=$('#categorySearchInput');if(queryBox)queryBox.value='';
  renderCategoryPage(catId);
  showView('#categoryView');
}

function outlineGuideSrc(id){return `./assets/guides-outline-clean/${id}.png`; }
function simpleColorGuideSrc(id){return `./assets/guides-color-clean/${id}.png${id==='demon12'?'?art=1868':/^bluey(03|05|06|07|08)$/.test(id)?'?art=1869':id==='bluey04'?'?art=1870':''}`; }
function simpleOutlineGuideSrc(id){return `./assets/guides-outline-clean/${id}.png${/^bluey(03|05|06|07|08)$/.test(id)?'?art=1869':id==='bluey04'?'?art=1870':''}`; }
function guideAssetSrc(id,style=state.guideStyle,detail=state.detailMode){return style==='outline'?simpleOutlineGuideSrc(id):simpleColorGuideSrc(id);}
function guidePreviewSrc(t,mode=state.guideStyle,detail=state.detailMode){return guideAssetSrc(t.id,mode,'simple');}
function updateCompactDrawToolSummaries(){
  const g=$('#guideCompactSummary');if(g)g.textContent=`${state.guideStyle==='outline'?'黑白':'彩色'}・${guideOpacityPercent()}%`;
  const l=$('#layerCompactSummary'),m=currentLayerMeta?.();if(l)l.textContent=`${m?.name||'圖層'}・${drawCanvases?.length||3} 層`;
}
function updateGuideStyleUI(){
  $$('.guide-style-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.guideStyle===state.guideStyle));
  const homeHint=$('#guideStyleHintHome');
  if(homeHint)homeHint.textContent=state.guideStyle==='outline'?'目前預設是黑白線稿，孩子可以自己上色；進入畫板後也能再切換成彩色底圖。':'目前預設是彩色底圖，方便參考顏色；進入畫板後也能切換成黑白線稿。';
  const note=$('#guideStyleNote');
  if(note){const pct=guideOpacityPercent();note.textContent=state.guideStyle==='outline'?`目前使用黑白線稿：底圖透明度 ${pct}%，可依需要自行調整。`:`目前使用彩色底圖：底圖透明度 ${pct}%，可依需要自行調整。`;}
  updateCompactDrawToolSummaries();
}
function updateDetailModeUI(){ return; }
async function setDetailMode(mode,{rerender=true,redraw=true}={}){ state.detailMode='simple'; return; }
async function setGuideStyle(style,{rerender=true,redraw=true}={}){
  const next=style==='outline'?'outline':'color';
  if(state.guideStyle===next){ updateGuideStyleUI(); return; }
  state.guideStyle=next;
  saveGuideStyle(next);
  updateGuideStyleUI();
  if(rerender){
    if($('#homeView')?.classList.contains('active')) renderHome();
    if($('#categoryView')?.classList.contains('active') && state.category) renderCategoryPage(state.category);
  }
  if(redraw && state.current){ await drawGuide(); updateSampleReference(); }
  else await renderOutlineTop();
}


function renderCategoryPage(catId=state.category){
  const cat=categories.find(x=>x[0]===catId);
  if(!cat)return;
  const [id,em,name]=cat;
  const orderMap=new Map(DISPLAY_ORDER.map((tid,i)=>[tid,i]));
  const all=templates.filter(t=>isSampleTemplate(t.id)&&t.cat===id&&(id!=='anime-games'||gameArtSeriesFor(t)===activeGameArtSeries)).sort((a,b)=>(orderMap.get(a.id)??999)-(orderMap.get(b.id)??999));
  const levels=[...new Set(all.map(t=>t.lv))].sort((a,b)=>a-b);
  if(state.categoryPageLevel && !levels.includes(state.categoryPageLevel))state.categoryPageLevel=null;
  const done=doneTemplates();
  const query=normalizeCategorySearch(categorySearchTerm);
  const rows=all.filter(t=>{
    if(state.categoryPageLevel&&t.lv!==state.categoryPageLevel)return false;
    if(categoryProgressFilter==='todo'&&done.has(t.id))return false;
    if(categoryProgressFilter==='done'&&!done.has(t.id))return false;
    if(query&&!normalizeCategorySearch([t.zh,t.en,t.zhuyin,t.id].join(' ')).includes(query))return false;
    return true;
  });
  const doneCount=all.filter(t=>done.has(t.id)).length;
  $('#categoryPageEmoji').innerHTML=all.length?`<img class="category-art-thumb" src="./assets/guides-color-clean/${all[0].id}.png" alt="${name}">`:em;
  // 遊戲系列導覽與彩色／黑白預覽只在動漫遊戲分類顯示。
  const gameToolbar=$('#gameArtSeriesToolbar');
  if(gameToolbar){
    gameToolbar.hidden=id!=='anime-games';
    if(id==='anime-games'){
      const series=GAME_ART_SERIES.find(item=>item.id===activeGameArtSeries);
      const tabs=$('#gameArtSeriesTabs');
      if(tabs)tabs.innerHTML=GAME_ART_SERIES.map(item=>`<button type="button" class="game-series-tab ${item.id===activeGameArtSeries?'active':''}" data-game-series="${item.id}" aria-pressed="${item.id===activeGameArtSeries}">${item.label}</button>`).join('');
      const desc=$('#gameArtSeriesDescription');if(desc)desc.textContent=series?.description||'';
      const printLink=document.getElementById('gameSeriesPrintLink');if(printLink)printLink.href=['peppa','bluey'].includes(activeGameArtSeries)?'./character-print.html?series='+activeGameArtSeries:(activeGameArtSeries==='demon'?'./demon-print-v1849.html':'./anime-print-v1844.html');
      const qualityLink=document.getElementById('gameSeriesQualityLink');if(qualityLink){qualityLink.href=['peppa','bluey'].includes(activeGameArtSeries)?'./character-print.html?series='+activeGameArtSeries:(activeGameArtSeries==='demon'?'./demon-print-v1849.html':'./anime-quality-v1847.html');qualityLink.textContent=['peppa','bluey'].includes(activeGameArtSeries)?'角色圖 A4 彩色／黑白預覽':(activeGameArtSeries==='demon'?'鬼滅角色圖 A4 放大預覽':'放大校對黑白／彩色角色圖');}
      $$('.game-series-tab').forEach(btn=>btn.onclick=()=>{
        activeGameArtSeries=btn.dataset.gameSeries;
        state.categoryPageLevel=null;categorySearchTerm='';categoryProgressFilter='all';
        const input=$('#categorySearchInput');if(input)input.value='';
        renderCategoryPage('anime-games');
      });
      $$('.game-preview-mode').forEach(btn=>{btn.onclick=()=>setGameArtMode(btn.dataset.gamePreview,{redraw:false});});
      updateGameModeControls();
    }
  }
  $('#categoryPageTitle').textContent=name;
  $('#categoryPageDescription').textContent=CATEGORY_DESCRIPTIONS[id]||'選一張喜歡的圖案開始畫畫吧！';
  $('#categoryPageCount').textContent=all.length;
  $('#categoryPageDone').textContent=doneCount;
  const progressPercent=all.length?Math.round((doneCount/all.length)*100):0;
  const progressRing=$('#categoryProgressRing');
  if(progressRing)progressRing.style.setProperty('--progress',`${progressPercent*3.6}deg`);
  if($('#categoryProgressPercent'))$('#categoryProgressPercent').textContent=`${progressPercent}%`;
  if($('#categoryProgressLabel'))$('#categoryProgressLabel').textContent=doneCount?`已完成 ${doneCount} / ${all.length} 張，繼續加油！`:'從第一張開始挑戰吧！';
  $('#categoryProgressText').textContent=`${doneCount ? `已完成 ${doneCount}/${all.length} 張・` : ''}${state.categoryPageLevel?`LV${state.categoryPageLevel}`:'全部難度'}・${categoryProgressFilter==='todo'?'還沒畫過':categoryProgressFilter==='done'?'已完成':'全部進度'}・${rows.length} 張`;
  $('#categoryLevelChips').innerHTML=levels.map(lv=>`<button class="category-level-chip ${state.categoryPageLevel===lv?'active':''}" data-category-lv="${lv}">LV${lv}<small>${all.filter(t=>t.lv===lv).length} 張</small></button>`).join('');
  $('#categoryClearLevelBtn').disabled=!state.categoryPageLevel;
  const clearSearch=$('#categorySearchClear');if(clearSearch)clearSearch.hidden=!categorySearchTerm;
  $$('[data-progress-filter]').forEach(b=>{
    const active=b.dataset.progressFilter===categoryProgressFilter;
    b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));
  });
  $('#categoryTemplateGrid').innerHTML=rows.map(t=>{
    if(t.cat==='anime-games'){
      const outline=guideAssetSrc(t.id,'outline');
      const color=guideAssetSrc(t.id,'color');
      const doneLabel=done.has(t.id)?'已完成 ⭐':'繪畫教材';
      // Avoid nested interactive buttons: character card is a section with distinct actions.
      return `<article class="game-character-card" data-id="${t.id}" aria-label="${t.zh}角色繪畫">
        <div class="game-character-pair">
          <figure class="game-character-picture"><img loading="lazy" decoding="async" src="${outline}" alt="${t.zh}黑白著色線稿"><figcaption>黑白著色</figcaption></figure>
          <figure class="game-character-picture"><img loading="lazy" decoding="async" src="${color}" alt="${t.zh}彩色角色參考"><figcaption>彩色參考</figcaption></figure>
        </div>
        <div class="game-character-info"><span class="pill">LV${t.lv}</span><span class="sample-pill">${doneLabel}</span><h3>${t.zh}</h3><small>兩張對應圖片・完整角色</small></div>
        <div class="game-character-actions" role="group" aria-label="${t.zh}繪畫方式">
          <button type="button" data-game-start="outline" data-id="${t.id}">黑白著色</button>
          <button type="button" data-game-start="color" data-id="${t.id}">彩色參考</button>
          <button type="button" data-game-start="free" data-id="${t.id}">自由繪畫</button>
        </div>
      </article>`;
    }
    const preview=guidePreviewSrc(t);
    return `<button type="button" class="template-card sample-card category-template-card" data-id="${t.id}" aria-label="開始畫 ${t.zh}，難度 ${t.lv}"><div class="template-preview"><img loading="lazy" decoding="async" src="${preview}" alt="${t.zh} ${state.guideStyle==='outline'?'黑白線稿':'彩色參考圖'}"></div><div class="template-meta"><span class="pill">LV${t.lv}</span><span class="sample-pill">${done.has(t.id)?'已完成 ⭐':'正式教材'}</span><strong>${t.emoji} ${t.zh}・${t.en}</strong><small>${t.zhuyin}　${t.kk}</small></div></button>`;
  }).join('')||`<div class="v1822-empty" role="status"><strong>沒有符合條件的圖案</strong><p>換個名稱或選「全部圖案」再試試。</p><button type="button" id="categoryResetAllFilters">重新顯示全部</button></div>`;
  const resetAll=$('#categoryResetAllFilters');if(resetAll)resetAll.onclick=()=>{
    categorySearchTerm='';categoryProgressFilter='all';state.categoryPageLevel=null;
    const input=$('#categorySearchInput');if(input)input.value='';renderCategoryPage(id);
  };
  $$('.category-level-chip').forEach(b=>b.onclick=()=>{const lv=+b.dataset.categoryLv;state.categoryPageLevel=state.categoryPageLevel===lv?null:lv;renderCategoryPage(id)});
  $$('.category-template-card').forEach(c=>c.onclick=()=>openFromCategory(c.dataset.id));
  // The clicked mode is applied before opening the drawing board.
  $$('#categoryTemplateGrid [data-game-start]').forEach(btn=>btn.onclick=async()=>{
    const mode=btn.dataset.gameStart, id=btn.dataset.id;
    if(!GAME_MODE_SETTINGS[mode] || !templates.some(t=>t.id===id&&t.cat==='anime-games'))return;
    // Only one operation per click; no pending mode redraw while the board is loading.
    btn.disabled=true;
    try{await setGameArtMode(mode,{redraw:false});openFromCategory(id);}
    finally{btn.disabled=false;}
  });
}

// V1.8.28: one shared filter predicate for gallery, random prompts and navigation.
const HOME_LEVEL_RANGES = Object.freeze({
  1:{min:1,max:2,label:'入門'},3:{min:3,max:5,label:'基礎'},
  6:{min:6,max:8,label:'進階'},9:{min:9,max:10,label:'挑戰'}
});
function homeLevelMatch(t){
  if(state.level!==null)return t.lv===state.level;
  const range=HOME_LEVEL_RANGES[state.levelRange];
  return !range||(t.lv>=range.min&&t.lv<=range.max);
}
function homeLevelDescription(){
  if(state.level!==null)return `LV${state.level}`;
  const r=HOME_LEVEL_RANGES[state.levelRange];
  return r?`${r.label}・LV${r.min}～LV${r.max}`:'全部難度';
}
// Called by four illustrated UI cards; exact LV buttons still use original handlers.
window.setHomeLevelRange=(start)=>{
  if(start!==null&&!HOME_LEVEL_RANGES[start])return;
  state.level=null;
  state.levelRange=(state.levelRange===start)?null:start;
  renderHome();
};
function renderHome(){
  const orderMap=new Map(DISPLAY_ORDER.map((id,i)=>[id,i]));
  const stats=categoryStats();
  $('#levelGrid').innerHTML=Array.from({length:10},(_,i)=>`<button class="level-btn ${state.level===i+1?'active':''}" data-lv="${i+1}">LV${i+1}<span>${i<2?'入門':i<5?'基礎':i<8?'進階':'挑戰'}</span></button>`).join('');
  $('#categoryGrid').innerHTML=stats.map(cat=>`<button class="cat-btn ${state.category===cat.id?'active':''}" data-cat="${cat.id}"><span class="emoji"><img class="category-art-thumb" src="./assets/ui/v1857/${cat.preview[0]?.id||'apple1'}.webp" onerror="this.onerror=null;this.src='./assets/guides-color-clean/${cat.preview[0]?.id||'apple1'}.png'" alt=""></span>${cat.name}<small>${cat.count} 張</small></button>`).join('');
  $('#categoryShowcase').innerHTML=stats.map(cat=>`<article class="cat-card ${state.category===cat.id?'active':''}" data-cat="${cat.id}"><div class="cat-card-top"><div><div class="cat-card-emoji"><img class="category-art-thumb" src="./assets/ui/v1857/${cat.preview[0]?.id||'apple1'}.webp" onerror="this.onerror=null;this.src='./assets/guides-color-clean/${cat.preview[0]?.id||'apple1'}.png'" alt=""></div><h3>${cat.name}</h3><p>${CATEGORY_DESCRIPTIONS[cat.id]||''}</p></div><div class="cat-count">${cat.count}<span>張</span></div></div><div class="cat-preview-strip">${cat.preview.map(t=>`<div class="cat-mini"><img src="${guidePreviewSrc(t)}" alt="${t.zh}"></div>`).join('')}</div><button class="cat-open-btn" data-cat="${cat.id}">打開 ${cat.name}</button></article>`).join('');
  let rows=templates.filter(t=>homeLevelMatch(t)&&(!state.category||t.cat===state.category));
  rows=rows.filter(t=>isSampleTemplate(t.id) && (state.category==='anime-games' ? t.cat==='anime-games' : t.cat!=='anime-games')).sort((a,b)=>(orderMap.get(a.id)??999)-(orderMap.get(b.id)??999));
  const activeCategory=state.category?(categories.find(x=>x[0]===state.category)?.[2]||''):'';
  const scopeText='正式教材 200 張';
  $('#filterHint').textContent=`${scopeText}｜${activeCategory?activeCategory+'｜':''}${homeLevelDescription()}・｜${rows.length} 張`;
  const done=doneTemplates();
  $('#templateGrid').innerHTML=rows.map(t=>{
    const preview=guidePreviewSrc(t);
    return `<article class="template-card sample-card" data-id="${t.id}"><div class="template-preview"><img loading="lazy" decoding="async" src="${preview}" alt="${t.zh} ${t.en} 描圖線稿"></div><div class="template-meta"><span class="pill">LV${t.lv}</span><span class="sample-pill">正式樣板</span><strong>${done.has(t.id)?'⭐ ':''}${t.emoji} ${t.zh}・${t.en}</strong><small>${t.zhuyin}　${t.kk}</small></div></article>`
  }).join('')||`<div class="empty-state">這個條件目前沒有圖案，換一個難度或分類看看。</div>`;
  $$('.level-btn').forEach(b=>b.onclick=()=>{state.level=state.level===+b.dataset.lv?null:+b.dataset.lv;state.levelRange=null;renderHome()});
  $$('.cat-btn').forEach(b=>b.onclick=()=>openCategoryPage(b.dataset.cat));
  $$('.cat-card,.cat-open-btn').forEach(el=>el.onclick=(e)=>{e.stopPropagation();const target=e.currentTarget.dataset.cat||e.target.dataset.cat;if(target)openCategoryPage(target)});
  $$('.template-card').forEach(c=>c.onclick=()=>openFromHome(c.dataset.id));
  document.dispatchEvent(new CustomEvent('kidsdrawing:level-filter-changed',{detail:{level:state.level,range:state.levelRange,label:homeLevelDescription(),count:rows.length}}));
}

const guideImageCache=new Map();
const GUIDE_IMAGE_CACHE_MAX=isIOSLike()?8:16;
function svgToImage(svg){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)})}
function srcToImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src})}
function cachedGuideImage(key,factory){
  if(guideImageCache.has(key)){
    const cached=guideImageCache.get(key);guideImageCache.delete(key);guideImageCache.set(key,cached);return cached;
  }
  const pending=Promise.resolve().then(factory).catch(err=>{guideImageCache.delete(key);throw err});
  guideImageCache.set(key,pending);
  while(guideImageCache.size>GUIDE_IMAGE_CACHE_MAX){const oldest=guideImageCache.keys().next().value;if(oldest===undefined||oldest===key)break;guideImageCache.delete(oldest)}
  return pending;
}
async function currentGuideImage(){
  if(!state.current)return null;
  const src=guideAssetSrc(state.current.id,state.guideStyle,state.detailMode);
  const key=state.detailMode+':'+state.guideStyle+':'+state.current.id;
  return cachedGuideImage(key,()=>srcToImage(src));
}
async function tintedMaskImage(src,color,w,h){const mask=await srcToImage(src),c=document.createElement('canvas');c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h));const x=c.getContext('2d');x.drawImage(mask,0,0,c.width,c.height);x.globalCompositeOperation='source-in';x.fillStyle=color;x.fillRect(0,0,c.width,c.height);return c}
function sizeCanvas(canvas,cssW,cssH){const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);canvas.style.width=cssW+'px';canvas.style.height=cssH+'px';const ctx=canvas.getContext('2d');ctx.setTransform(dpr,0,0,dpr,0,0);return {dpr,w:cssW,h:cssH}}

function clearCanvasPixels(canvas,ctx){
  ctx.save();
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.restore();
}
function dataUrlToImage(src){return new Promise((resolve,reject)=>{const img=new Image();img.onload=()=>resolve(img);img.onerror=reject;img.src=src})}
function resetActivePointerSession(){
  state.activePointer=null;
  state.drawSession=(state.drawSession||0)+1;
}
const TOOL_HINTS={
  pencil:'✏️ 鉛筆：輕壓細淡、重壓較深，帶紙面顆粒',
  crayon:'🖍️ 蠟筆：厚實蠟質、粗糙邊緣與自然留白',
  brush:'🖌️ 畫筆：筆壓控制粗細，快畫會收細並看得到刷毛',
  watercolor:'💧 水彩筆：半透明疊色與柔和暈染，重複畫會逐漸加深',
  marker:'🖊️ 色筆：固定斜角筆尖，寬帶狀墨跡、邊緣較整齊',
  airbrush:'🌫️ 噴筆：柔霧顆粒噴灑，適合陰影、天空與大面積柔和上色',
  eraser:'🧽 橡皮擦：擦除所有「顯示中且未鎖定」圖層；教材底圖與鎖定層不會被擦掉'
};
let eraserCursorHideTimer=null;
function eraserPreviewDiameter(){return Math.max(26,(Number(state.size)||8)*2.85)}
function updateEraserCursorSize(){
  const cursor=$('#eraserCursor');if(!cursor)return;
  const d=eraserPreviewDiameter();cursor.style.width=`${d}px`;cursor.style.height=`${d}px`;
}
function placeEraserCursor(x,y,{tracking=true,erasing=false}={}){
  const cursor=$('#eraserCursor'),wrap=$('#canvasWrap');if(!cursor||!wrap||state.tool!=='eraser')return;
  const r=wrap.getBoundingClientRect(),radius=eraserPreviewDiameter()/2;
  const safeX=clamp(x,radius,Math.max(radius,r.width-radius)),safeY=clamp(y,radius,Math.max(radius,r.height-radius));
  updateEraserCursorSize();cursor.style.left=`${safeX}px`;cursor.style.top=`${safeY}px`;
  cursor.classList.add('visible');cursor.classList.toggle('tracking',!!tracking);cursor.classList.toggle('is-erasing',!!erasing);
}
function showEraserCursorPreview(){
  const wrap=$('#canvasWrap'),cursor=$('#eraserCursor');if(!wrap||!cursor||state.tool!=='eraser')return;
  wrap.classList.add('eraser-mode');updateEraserCursorSize();
  const r=wrap.getBoundingClientRect();placeEraserCursor(r.width*.50,r.height*.50,{tracking:false,erasing:false});
}
function hideEraserCursor(){const cursor=$('#eraserCursor'),wrap=$('#canvasWrap');if(cursor){cursor.classList.remove('visible','tracking','is-erasing')}if(wrap)wrap.classList.remove('eraser-mode')}
function setTool(tool){
  state.tool=tool;
  $$('.tool-btn').forEach(x=>x.classList.toggle('active',x.dataset.tool===tool));
  const hint=$('#penHint');if(hint)hint.textContent=TOOL_HINTS[tool]||'';
  const opacity=$('#brushOpacityInput');if(opacity)opacity.disabled=tool==='eraser';
  clearTimeout(eraserCursorHideTimer);
  if(tool==='eraser')requestAnimationFrame(showEraserCursorPreview);else hideEraserCursor();
}
function resetPracticeToEnglish(){
  state.practiceMode='en';
  state.practiceStage=0;
  $$('.practice-tabs .seg').forEach(x=>x.classList.toggle('active',x.dataset.practice==='en'));
  const btn=$('#practiceGuideBtn');if(btn)btn.textContent='描字 → 仿寫';
  clearCanvasPixels(practiceCanvas,pctx);
  clearCanvasPixels(practiceGuide,pgctx);
  drawPracticeGuide();
}
function canvasCssSize(){const r=$('#canvasWrap').getBoundingClientRect();return {w:r.width,h:r.height}}
function layerCtx(){return drawCtxs[state.activeLayer]}
function layerCanvas(){return drawCanvases[state.activeLayer]}
function syncLayerNames(){LAYER_NAMES=layerMeta.map(x=>x.name)}
function traceLayerIndex(){const i=layerMeta.findIndex(x=>x.id==='trace');return i<0?0:i}
function colorLayerIndex(){const i=layerMeta.findIndex(x=>x.id==='color');return i<0?Math.min(1,drawCanvases.length-1):i}
function currentLayerMeta(){return layerMeta[state.activeLayer]||layerMeta[0]}
function refreshLayerDataset(){const topBase=100+drawCanvases.length;drawCanvases.forEach((c,i)=>{c.dataset.layer=String(i);c.style.zIndex=String(topBase-i);c.style.opacity=String(state.layerOpacity[i]??1);c.setAttribute('aria-label',`${LAYER_NAMES[i]||'圖層'} 畫布`)});if(lockedInkImage?.parentNode)lockedInkImage.parentNode.appendChild(lockedInkImage)}
function resetDrawingHistoryBaseline(){state.history=[];state.historyIndex=-1;saveHistory()}
function updateLayerThumbnail(index){
  const thumbs=document.querySelectorAll(`.layer-thumb[data-thumb="${index}"]`);if(!thumbs.length||!drawCanvases[index])return;
  thumbs.forEach(thumb=>{const w=104,h=78;thumb.width=w;thumb.height=h;const x=thumb.getContext('2d');x.clearRect(0,0,w,h);x.fillStyle='#fffdf9';x.fillRect(0,0,w,h);x.save();x.globalAlpha=state.layerOpacity[index]??1;x.drawImage(drawCanvases[index],0,0,w,h);x.restore();});
}
function updateAllLayerThumbnails(){drawCanvases.forEach((_,i)=>updateLayerThumbnail(i))}
function resetLayersToDefaults(){
  drawCanvases.slice(3).forEach(c=>c.remove());
  drawCanvases=drawCanvases.slice(0,3);drawCtxs=drawCtxs.slice(0,3);
  layerMeta=DEFAULT_LAYER_META.map(x=>({...x}));layerSeq=4;syncLayerNames();
  state.activeLayer=0;state.layerVisible=[true,true,true];state.layerLocked=[false,false,false];state.layerOpacity=[1,1,1];refreshLayerDataset();
}
function createLayerCanvas(){
  const c=document.createElement('canvas');c.className='draw-layer';c.id=`drawCanvasCustom${Date.now()}${Math.floor(Math.random()*999)}`;$('#canvasWrap').appendChild(c);drawCanvases.push(c);drawCtxs.push(c.getContext('2d'));refreshLayerDataset();setupLayerDrawing(c);const {w,h}=canvasCssSize();if(w&&h)sizeCanvas(c,w,h);return c;
}
function nextCustomLayerNumber(){const used=new Set(layerMeta.map(m=>{const x=String(m.name||'').match(/^圖層\s+(\d+)$/);return x?+x[1]:null}).filter(Number.isFinite));let n=4;while(used.has(n))n++;return n}
function addCustomLayer(){
  if(drawCanvases.length>=MAX_DRAW_LAYERS){toast(`最多 ${MAX_DRAW_LAYERS} 個圖層`);return}
  resetActivePointerSession();createLayerCanvas();const n=nextCustomLayerNumber();layerMeta.push({id:`custom-${Date.now()}-${n}`,name:`圖層 ${n}`,icon:'🧩',desc:'自訂繪畫圖層',system:false});state.layerVisible.push(true);state.layerLocked.push(false);state.layerOpacity.push(1);syncLayerNames();state.activeLayer=drawCanvases.length-1;resetDrawingHistoryBaseline();updateLayerUI();toast(`已新增「${LAYER_NAMES[state.activeLayer]}」（在較下方，不會蓋住前面圖層）`)
}
function deleteActiveLayer(){
  const i=state.activeLayer,m=layerMeta[i];if(!m||m.system){toast('預設圖層不可刪除');return}if(!confirm(`要刪除「${m.name}」以及這一層的內容嗎？`))return;
  resetActivePointerSession();drawCanvases[i].remove();drawCanvases.splice(i,1);drawCtxs.splice(i,1);layerMeta.splice(i,1);state.layerVisible.splice(i,1);state.layerLocked.splice(i,1);state.layerOpacity.splice(i,1);state.activeLayer=Math.max(0,Math.min(i-1,drawCanvases.length-1));syncLayerNames();refreshLayerDataset();resetDrawingHistoryBaseline();updateLayerUI();toast('圖層已刪除')
}
function renameActiveLayer(){const i=state.activeLayer,m=layerMeta[i];if(!m||m.system){toast('描線、上色、自由畫為固定名稱');return}const v=prompt('圖層名稱',m.name);if(v===null)return;const name=String(v).trim().slice(0,16);if(!name)return;layerMeta[i].name=name;syncLayerNames();updateLayerUI();toast(`已改名為「${name}」`)}
function toggleActiveLayerLock(){const i=state.activeLayer;state.layerLocked[i]=!state.layerLocked[i];updateLayerUI();toast(state.layerLocked[i]?'🔒 圖層已鎖定':'🔓 圖層已解鎖')}
function toggleActiveLayerVisibility(){const i=state.activeLayer;if(state.layerVisible[i]){const visible=state.layerVisible.filter(Boolean).length;if(visible<=1){toast('至少要保留一個顯示中的圖層');return}state.layerVisible[i]=false;const next=state.layerVisible.findIndex((v,j)=>v&&j!==i);if(next>=0)state.activeLayer=next;toast(`已隱藏「${LAYER_NAMES[i]}」`)}else{state.layerVisible[i]=true;toast(`已顯示「${LAYER_NAMES[i]}」`)}updateLayerUI()}
function moveActiveLayer(delta){
  const i=state.activeLayer,j=i+delta;if(j<0||j>=drawCanvases.length)return;resetActivePointerSession();
  [drawCanvases[i],drawCanvases[j]]=[drawCanvases[j],drawCanvases[i]];[drawCtxs[i],drawCtxs[j]]=[drawCtxs[j],drawCtxs[i]];[layerMeta[i],layerMeta[j]]=[layerMeta[j],layerMeta[i]];[state.layerVisible[i],state.layerVisible[j]]=[state.layerVisible[j],state.layerVisible[i]];[state.layerLocked[i],state.layerLocked[j]]=[state.layerLocked[j],state.layerLocked[i]];[state.layerOpacity[i],state.layerOpacity[j]]=[state.layerOpacity[j],state.layerOpacity[i]];
  state.activeLayer=j;syncLayerNames();refreshLayerDataset();drawCanvases.forEach(c=>$('#canvasWrap').appendChild(c));resetDrawingHistoryBaseline();updateLayerUI();toast(`已移動「${LAYER_NAMES[j]}」`)
}
function moveLayerTo(from,to){
  if(from===to||from<0||to<0||from>=drawCanvases.length||to>=drawCanvases.length)return;
  resetActivePointerSession();
  const [canvas]=drawCanvases.splice(from,1),[ctx]=drawCtxs.splice(from,1),[meta]=layerMeta.splice(from,1),[visible]=state.layerVisible.splice(from,1),[locked]=state.layerLocked.splice(from,1),[opacity]=state.layerOpacity.splice(from,1);
  drawCanvases.splice(to,0,canvas);drawCtxs.splice(to,0,ctx);layerMeta.splice(to,0,meta);state.layerVisible.splice(to,0,visible);state.layerLocked.splice(to,0,locked);state.layerOpacity.splice(to,0,opacity);
  state.activeLayer=to;syncLayerNames();refreshLayerDataset();drawCanvases.forEach(c=>$('#canvasWrap').appendChild(c));resetDrawingHistoryBaseline();updateLayerUI();toast(`已調整「${LAYER_NAMES[to]}」順序`)
}

function normalizeLayerOpacity(value){const n=Number(value);return Number.isFinite(n)?Math.max(.1,Math.min(1,n)):1}
function setActiveLayerOpacity(value,{notify=false}={}){
  const i=state.activeLayer;if(i<0||i>=drawCanvases.length)return;
  state.layerOpacity[i]=normalizeLayerOpacity(value);refreshLayerDataset();updateLayerUI();
  if(notify)toast(`「${LAYER_NAMES[i]}」透明度 ${Math.round(state.layerOpacity[i]*100)}%`)
}
async function duplicateActiveLayer(){
  if(drawCanvases.length>=MAX_DRAW_LAYERS){toast(`最多 ${MAX_DRAW_LAYERS} 個圖層`);return}
  const sourceIndex=state.activeLayer,sourceMeta=layerMeta[sourceIndex],sourceCanvas=drawCanvases[sourceIndex];
  if(!sourceMeta||!sourceCanvas)return;
  resetActivePointerSession();
  createLayerCanvas();
  const newIndex=drawCanvases.length-1;
  const baseName=String(sourceMeta.name||'圖層').replace(/\s*複製(?:\s*\d+)?$/,'');
  const copies=layerMeta.filter(m=>String(m.name||'').startsWith(`${baseName} 複製`)).length;
  layerMeta.push({id:`copy-${Date.now()}-${newIndex}`,name:`${baseName} 複製${copies?` ${copies+1}`:''}`,icon:'📄',desc:`複製自 ${sourceMeta.name}`,system:false});
  state.layerVisible.push(true);state.layerLocked.push(false);state.layerOpacity.push(state.layerOpacity[sourceIndex]??1);
  const {w,h}=canvasCssSize();drawCtxs[newIndex].clearRect(0,0,w,h);drawCtxs[newIndex].drawImage(sourceCanvas,0,0,w,h);
  syncLayerNames();state.activeLayer=newIndex;refreshLayerDataset();resetDrawingHistoryBaseline();updateLayerUI();toast(`已複製「${sourceMeta.name}」到最下層`)
}
function bindLayerOpacityControls(){
  const pairs=[['#layerOpacityRange','#layerOpacityValue'],['#fullscreenLayerOpacityRange','#fullscreenLayerOpacityValue']];
  pairs.forEach(([rangeSel,outSel])=>{const range=$(rangeSel),out=$(outSel);if(!range||range.dataset.opacityBound==='1')return;range.dataset.opacityBound='1';range.addEventListener('input',()=>{const v=Math.max(10,Math.min(100,+range.value||100));state.layerOpacity[state.activeLayer]=v/100;refreshLayerDataset();if(out)out.textContent=`${v}%`;const otherRange=rangeSel.includes('fullscreen')?$('#layerOpacityRange'):$('#fullscreenLayerOpacityRange');const otherOut=outSel.includes('fullscreen')?$('#layerOpacityValue'):$('#fullscreenLayerOpacityValue');if(otherRange)otherRange.value=String(v);if(otherOut)otherOut.textContent=`${v}%`;updateAllLayerThumbnails()});range.addEventListener('change',()=>toast(`「${LAYER_NAMES[state.activeLayer]}」透明度 ${range.value}%`));});
}
let draggingLayerIndex=null;
function bindLayerCardInteractions(){
  $$('[data-layer-select]').forEach(b=>b.onclick=()=>selectLayer(+b.dataset.layerSelect));
  $$('[data-layer-card]').forEach(card=>{
    if(card.dataset.dragBound==='1')return;
    card.dataset.dragBound='1';
    card.addEventListener('dragstart',e=>{
      draggingLayerIndex=+card.dataset.layerCard;
      card.classList.add('is-dragging');
      if(e.dataTransfer){e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',String(draggingLayerIndex))}catch{}}
    });
    card.addEventListener('dragover',e=>{
      if(draggingLayerIndex===null)return;
      e.preventDefault();
      const target=+card.dataset.layerCard;
      if(target===draggingLayerIndex)return;
      card.classList.add('drop-target');
    });
    card.addEventListener('dragleave',()=>card.classList.remove('drop-target'));
    card.addEventListener('drop',e=>{
      if(draggingLayerIndex===null)return;
      e.preventDefault();
      const target=+card.dataset.layerCard;
      card.classList.remove('drop-target');
      const from=draggingLayerIndex;draggingLayerIndex=null;
      if(target!==from)moveLayerTo(from,target);
    });
    card.addEventListener('dragend',()=>{draggingLayerIndex=null;$$('[data-layer-card]').forEach(x=>x.classList.remove('is-dragging','drop-target'))});
  });
}

// V1.8.37: Keep layer pixels in temporary canvases and restore them synchronously.
// Waiting for Image.onload after resizing could overwrite strokes made in the meantime.
function preserveCanvasPixels(canvas){
  if(!canvas.width||!canvas.height)return null;
  const copy=document.createElement('canvas');copy.width=canvas.width;copy.height=canvas.height;
  copy.getContext('2d').drawImage(canvas,0,0);return copy;
}
let mainResizeGeneration=0;
async function resizeMainCanvases(preserve=true){
  const {w,h}=canvasCssSize();
  if(w<2||h<2)return false;
  const nextSize={w,h};
  if(preserve&&almostSameSize(state.mainCanvasSize,nextSize))return false;
  historyRestoreToken++; // Cancel pending Undo/Redo snapshots before changing dimensions.
  outlineTopGeneration++;guideDrawGeneration++; // Invalidate old-image callbacks before resizing canvases.
  const generation=++mainResizeGeneration;
  resetActivePointerSession(); // Discard a pointer stroke interrupted by device rotation.
  const copies=preserve?drawCanvases.map(preserveCanvasPixels):[];
  sizeCanvas(guideCanvas,w,h);
  sizeCanvas(outlineTopCanvas,w,h);
  drawCanvases.forEach((canvas,i)=>{
    sizeCanvas(canvas,w,h);
    if(copies[i])canvas.getContext('2d').drawImage(copies[i],0,0,w,h);
  });
  state.mainCanvasSize=nextSize;
  // Painted layers are already restored; the HTML ink image resizes with CSS.
  syncLockedInkImageFit();
  await drawGuide();
  if(generation!==mainResizeGeneration)return true;
  updateLayerUI();updateAllLayerThumbnails();
  return true;
}

function allTraceProgress(){return safeJson(localStorage.getItem(STORAGE_TRACE_PROGRESS),{})}
function getSavedTraceProgress(id){const all=allTraceProgress(),p=all[id]||{};return {total:+p.total||0,completed:Array.isArray(p.completed)?p.completed:[],scores:p.scores&&typeof p.scores==='object'?p.scores:{}}}
function saveCurrentTraceProgress(){if(!state.current)return;const all=allTraceProgress();all[state.current.id]={total:state.traceSteps.length,completed:[...state.traceCompleted].sort((a,b)=>a-b),scores:state.traceScores,updated:new Date().toISOString()};localStorage.setItem(STORAGE_TRACE_PROGRESS,JSON.stringify(all))}
function escAttr(v){return String(v).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;')}
function traceStartFrom(tag,el,markup){
  if(tag==='path'){const d=el?.getAttribute?.('d')||markup.match(/d="([^"]+)"/)?.[1]||'';const m=d.match(/[Mm]\s*(-?\d*\.?\d+)[ ,]+(-?\d*\.?\d+)/);if(m)return {x:+m[1],y:+m[2]}}
  if(tag==='circle')return {x:+el.getAttribute('cx')-(+el.getAttribute('r')||0),y:+el.getAttribute('cy')};
  if(tag==='ellipse')return {x:+el.getAttribute('cx')-(+el.getAttribute('rx')||0),y:+el.getAttribute('cy')};
  if(tag==='rect')return {x:+el.getAttribute('x'),y:+el.getAttribute('y')};
  return null;
}
function extractTraceSteps(svg){
  const doc=new DOMParser().parseFromString(svg,'image/svg+xml'),root=doc.documentElement,raw=[];
  [...root.children].forEach(el=>{const tag=el.tagName.toLowerCase();if(!['path','circle','ellipse','rect','line','polyline','polygon'].includes(tag))return;
    if(tag==='path'){const d=el.getAttribute('d')||'',parts=d.match(/[Mm][^Mm]*/g)||[d];if(parts.length>1){parts.forEach(part=>raw.push({html:`<path d="${escAttr(part.trim())}"/>`,start:traceStartFrom('path',null,`d="${escAttr(part.trim())}"`)}));return}}
    raw.push({html:el.outerHTML,start:traceStartFrom(tag,el,el.outerHTML)});
  });
  if(!raw.length)return [];
  const max=10;if(raw.length<=max)return raw.map((r,i)=>({...r,label:`線條 ${i+1}`}));
  const size=Math.ceil(raw.length/max),out=[];for(let i=0;i<raw.length;i+=size){const group=raw.slice(i,i+size);out.push({html:group.map(x=>x.html).join(''),start:group.find(x=>x.start)?.start||null,label:`線條 ${out.length+1}`})}return out;
}
function stepSvg(step,color='#28b94f',width=22){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><style>path,circle,ellipse,rect,line,polyline,polygon{fill:none!important;stroke:${color}!important;stroke-width:${width}px!important;stroke-linecap:round!important;stroke-linejoin:round!important}</style>${step?.html||''}</svg>`}
function resetTraceStats(){state.traceStats={hits:0,total:0,strokes:0};updateTraceScoreUI()}
function traceRatingValue(){const vals=Object.values(state.traceScores||{}).map(Number).filter(Number.isFinite);if(!vals.length)return 0;const avg=vals.reduce((a,b)=>a+b,0)/vals.length;return avg>=85?3:avg>=65?2:1}
function traceRatingStars(){const n=traceRatingValue();return '★'.repeat(n)+'☆'.repeat(3-n)}
function updateTraceScoreUI(){const el=$('#traceScore');if(!el)return;const n=state.traceStats.total,pct=n?Math.round(state.traceStats.hits/n*100):null;el.textContent=pct===null?'貼合度 --':`貼合度 ${pct}%`;el.classList.toggle('good',pct!==null&&pct>=traceThreshold());el.classList.toggle('warn',pct!==null&&pct<traceThreshold());const rating=$('#traceRating');if(rating){rating.textContent=traceRatingStars();rating.classList.toggle('has-score',traceRatingValue()>0)}}
function traceThreshold(){return Math.max(48,68-(state.current?.lv||1)*2)}
function updateTraceLessonUI(){
  const panel=$('#traceLesson');if(!panel)return;const total=state.traceSteps.length;if(!state.traceAssist||!total){panel.classList.add('hidden');return}panel.classList.remove('hidden');
  const idx=Math.min(state.traceStepIndex,total-1);$('#traceStepTitle').textContent=`第 ${idx+1} 步 / ${total}・${state.traceSteps[idx].label}`;$('#traceStepHint').textContent=state.traceCompleted.has(idx)?'這一段已完成，可以前往下一段':'沿著畫布上的綠色線條慢慢描畫';
  const pct=total?Math.round(state.traceCompleted.size/total*100):0;$('#traceProgressBar').style.width=pct+'%';
  $('#traceStepDots').innerHTML=state.traceSteps.map((_,i)=>`<button class="trace-dot ${i===idx?'active':''} ${state.traceCompleted.has(i)?'done':''}" data-trace-step="${i}">${state.traceCompleted.has(i)?'✓':i+1}</button>`).join('');
  $$('[data-trace-step]').forEach(b=>b.onclick=()=>goTraceStep(+b.dataset.traceStep));$('#prevTraceStepBtn').disabled=idx<=0;$('#nextTraceStepBtn').disabled=idx>=total-1;
  $('#checkTraceStepBtn').textContent=state.traceCompleted.has(idx)?'✓ 已完成・再檢查':'✓ 檢查這一步';updateTraceScoreUI();
}
// V1.8.52: all reference, outline and export use one aspect-preserving contain rectangle.
// The previous full-canvas stretch distorted 800x600 art in a tall drawing viewport.
function guideContainRect(img,w,h){
  const iw=Math.max(1,img?.naturalWidth||img?.width||800),ih=Math.max(1,img?.naturalHeight||img?.height||600);
  const scale=Math.min(w/iw,h/ih),dw=iw*scale,dh=ih*scale;
  return {x:(w-dw)/2,y:(h-dh)/2,w:dw,h:dh};
}
function drawGuideImage(ctx,img,w,h){const r=guideContainRect(img,w,h);ctx.drawImage(img,r.x,r.y,r.w,r.h);return r}
function syncLockedInkImageFit(){if(lockedInkImage)lockedInkImage.classList.add('locked-ink-contain');}
// V1.8.48: black outline is an independent, locked, non-interactive TOP layer.
// White pixels are transparent, so children's strokes still show through.
function outlinePinIsActive(config){
  // V1.8.50: locking the ink is independent from background opacity.
  // Hiding the bottom reference image must NOT accidentally unlock the outline.
  // Free-drawing mode intentionally has no fixed outline.
  return !!(config.lockOutlineTop && config.guideStyle==='outline' &&
    !config.freeArtMode && config.templateId);
}
// V1.8.51: use one pre-generated transparent-ink PNG for BOTH visible
// topmost HTML layer and exported artwork. No Canvas redraw race.
function lockedInkSource(templateId){
  return './assets/guides-ink-locked/'+encodeURIComponent(templateId)+'.png'+(templateId==='bluey04'?'?art=1870':'');
}
function getOutlineInk(templateId){
  if(outlineInkCache.has(templateId))return outlineInkCache.get(templateId);
  const pending=srcToImage(lockedInkSource(templateId)).catch(error=>{
    outlineInkCache.delete(templateId);throw error;
  });
  outlineInkCache.set(templateId,pending);
  while(outlineInkCache.size>12){
    const first=outlineInkCache.keys().next().value;
    if(first===templateId)break;
    outlineInkCache.delete(first);
  }
  return pending;
}
function syncOutlinePinUI(){
  const toggle=$('#lockOutlineTopToggle');if(!toggle)return;
  const isOutline=!!state.current&&state.guideStyle==='outline'&&!(state.current.cat==='anime-games'&&gameArtMode==='free');
  toggle.checked=!!settings.lockOutlineTop;
  const note=$('#outlinePinNote');
  if(note)note.textContent=isOutline?(settings.lockOutlineTop?'黑色線條獨立固定在所有著色圖層上方，不受底圖透明度影響；白色區域透明。':'目前未固定線條，著色可能蓋住黑線。'):'只有黑白著色模式支援固定線稿；自由繪畫不顯示線稿。';
  const status=$('#outlinePinStatus');if(status)status.textContent=isOutline&&settings.lockOutlineTop?'正在準備固定線條…':'目前未固定線條';
}
// V1.8.71: A usable outline guide is kept underneath while the independent
// transparent locked ink is loading.  Do not blank the artboard on a failed load.
function outlineInkActuallyVisible(){
  return !!(lockedInkImage && !lockedInkImage.hidden && lockedInkImage.complete && lockedInkImage.naturalWidth>0);
}
async function renderOutlineTop(){
  const token=++outlineTopGeneration;
  const id=state.current?.id;
  const active=()=>outlinePinIsActive({templateId:id,guideStyle:state.guideStyle,
    lockOutlineTop:settings.lockOutlineTop,
    freeArtMode:state.current?.cat==='anime-games'&&gameArtMode==='free'});
  outlineTopCtx.clearRect(0,0,outlineTopCanvas.width,outlineTopCanvas.height);
  if(lockedInkImage){
    lockedInkImage.hidden=true;
    lockedInkImage.style.display='none';
    lockedInkImage.removeAttribute('src');
  }
  syncOutlinePinUI();
  if(!id||!active())return;
  try{
    const ink=await getOutlineInk(id);
    if(token!==outlineTopGeneration||state.current?.id!==id||!active())return;
    if(!lockedInkImage)throw new Error('找不到獨立黑線顯示圖層');
    lockedInkImage.src=ink.src;
    // This is a second <img>. Do not clear the backup guide until this
    // particular on-screen image has decoded successfully.
    if(lockedInkImage.decode)await lockedInkImage.decode();
    if(token!==outlineTopGeneration||state.current?.id!==id||!active())return;
    if(!lockedInkImage.complete||lockedInkImage.naturalWidth<2)throw new Error('固定線稿解碼不完整');
    lockedInkImage.classList.add('locked-ink-contain');
    lockedInkImage.style.display='block';
    lockedInkImage.hidden=false;
    lockedInkImage.parentNode?.appendChild(lockedInkImage);
    // Avoid double/ghost outlines.  The bitmap guide was a temporary backup.
    // Only clear it when no trace-assist overlay is present.
    if(!state.traceAssist)gctx.clearRect(0,0,guideCanvas.width,guideCanvas.height);
    const status=$('#outlinePinStatus');
    if(status)status.textContent='✓ 黑色線條已固定在顏色最上方';
  }catch(err){
    if(token!==outlineTopGeneration||state.current?.id!==id)return;
    console.warn('固定黑線載入失敗，保留黑白底圖備援',id,err);
    if(lockedInkImage){lockedInkImage.hidden=true;lockedInkImage.style.display='none';}
    const status=$('#outlinePinStatus');
    if(status)status.textContent='⚠ 固定黑線未載入，已改用黑白底圖，可繼續著色';
    // In case the backup is still loading, drawGuide() finishes it.  Retry
    // the locked image only on the next user-initiated redraw/selection.
  }
}

async function buildStepMask(w,h,step){
  const W=Math.max(1,Math.round(w)),H=Math.max(1,Math.round(h)),c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d',{willReadFrequently:true});
  const img=step?.type==='image'?await srcToImage(step.src):await svgToImage(stepSvg(step,'#000',40));
  drawGuideImage(x,img,W,H);
  const data=x.getImageData(0,0,W,H).data;state.stepMask={w:W,h:H,data};
}
function scoreTracePoint(p){if(!settings.traceJudge||!state.traceAssist||layerMeta[state.activeLayer]?.id!=='trace'||state.tool==='eraser'||!state.stepMask)return;const m=state.stepMask,x=Math.max(0,Math.min(m.w-1,Math.round(p.x))),y=Math.max(0,Math.min(m.h-1,Math.round(p.y)));state.traceStats.total++;if(m.data[(y*m.w+x)*4+3]>20)state.traceStats.hits++;if(state.traceStats.total%6===0)updateTraceScoreUI()}
async function drawGuide(){
  if(!state.current)return;const drawToken=++guideDrawGeneration;const {w,h}=canvasCssSize();gctx.clearRect(0,0,w,h);state.stepMask=null;
  // Start the separate top-layer render immediately; token prevents stale image results.
  void renderOutlineTop();
  // A bottom reference outline is the safe fallback until transparent ink is
  // fully decoded.  After successful loading, renderOutlineTop removes it.
  const pinnedOutline=outlinePinIsActive({templateId:state.current?.id,
    guideStyle:state.guideStyle,lockOutlineTop:settings.lockOutlineTop,
    freeArtMode:state.current?.cat==='anime-games'&&gameArtMode==='free'});
  if(state.guideOpacity>0){
    try{
      const img=await currentGuideImage();
      if(drawToken!==guideDrawGeneration)return;
      if(!pinnedOutline||!outlineInkActuallyVisible()){
        gctx.save();
        // If ink locking fails, always leave a readable black line-art guide.
        gctx.globalAlpha=pinnedOutline?Math.max(.90,state.guideOpacity):state.guideOpacity;
        drawGuideImage(gctx,img,w,h);
        gctx.restore();
      }
    }catch(err){
      if(drawToken!==guideDrawGeneration)return;
      console.warn('底圖載入失敗',state.current?.id,err);
      const status=$('#outlinePinStatus');
      if(status)status.textContent='⚠ 底圖載入失敗，請確認網路後重選圖片';
      toast('圖片載入失敗，請確認網路或重新選圖');
    }
  }
  if(state.traceAssist&&state.traceSteps.length){
    for(const doneIndex of [...state.traceCompleted]){
      const done=state.traceSteps[doneIndex];if(!done)continue;
      const doneImg=done.type==='image'?await tintedMaskImage(done.src,'#f3b83f',w,h):await svgToImage(stepSvg(done,'#f3b83f',20));
      gctx.save();gctx.globalAlpha=.60;drawGuideImage(gctx,doneImg,w,h);gctx.restore();
    }
    const step=state.traceSteps[state.traceStepIndex],isDone=state.traceCompleted.has(state.traceStepIndex);
    const img=step.type==='image'?await tintedMaskImage(step.src,isDone?'#f3b83f':'#26b94d',w,h):await svgToImage(stepSvg(step,isDone?'#f3b83f':'#26b94d',isDone?20:18));
    gctx.save();gctx.globalAlpha=.92;drawGuideImage(gctx,img,w,h);gctx.restore();await buildStepMask(w,h,step);if(!isDone)drawTraceStart(w,h,step)
  }
  updateTraceLessonUI();
}
function drawTraceStart(w,h,step){let p=step?.start?{x:step.start.x/800*w,y:step.start.y/600*h}:null;if(!p&&state.stepMask){const m=state.stepMask;outer:for(let y=0;y<m.h;y+=3)for(let x=0;x<m.w;x+=3)if(m.data[(y*m.w+x)*4+3]>20){p={x,y};break outer}}if(!p)return;gctx.save();gctx.fillStyle='#21b64a';gctx.strokeStyle='#fff';gctx.lineWidth=3;gctx.beginPath();gctx.arc(p.x,p.y,10,0,Math.PI*2);gctx.fill();gctx.stroke();gctx.fillStyle='#23833c';gctx.font='900 13px ui-rounded, sans-serif';gctx.fillText('開始',Math.min(p.x+15,w-48),Math.max(18,p.y-11));gctx.restore()}
function traceInstruction(){if(!state.traceSteps.length)return '';const idx=state.traceStepIndex+1,total=state.traceSteps.length;return state.traceCompleted.has(state.traceStepIndex)?`第 ${idx} 步已完成。可以前往下一段。`:`第 ${idx} 步，共 ${total} 步。沿著綠色線條慢慢描畫。`}
function speakTraceInstruction(){const text=traceInstruction();if(text)speak(text,'zh-TW',.78)}
async function goTraceStep(i,voice=settings.traceVoice){if(!state.traceSteps.length)return;state.traceStepIndex=Math.max(0,Math.min(state.traceSteps.length-1,i));resetTraceStats();await drawGuide();if(voice)setTimeout(speakTraceInstruction,120)}
async function checkTraceStep(){
  if(!state.traceSteps.length)return;const idx=state.traceStepIndex,pct=state.traceStats.total?Math.round(state.traceStats.hits/state.traceStats.total*100):0,threshold=traceThreshold();
  if(settings.traceJudge&&(state.traceStats.total<10||pct<threshold)){toast(state.traceStats.total<10?'再沿著綠色線條多畫一些，再檢查看看':`目前貼合度 ${pct}%，再靠近綠線一點就可以了`);updateTraceScoreUI();return}
  state.traceCompleted.add(idx);state.traceScores[idx]=settings.traceJudge?Math.max(1,pct):100;saveCurrentTraceProgress();updateTraceLessonUI();await drawGuide();toast(settings.traceJudge?`🌟 通過！貼合度 ${pct}%`:'🌟 這一步完成');if(settings.completionFx)showStepFlash();
  if(state.traceCompleted.size===state.traceSteps.length){const stars=traceRatingValue();toast(`🏆 逐步描圖全部完成！${'⭐'.repeat(stars)}`);if(settings.completionFx)setTimeout(()=>showTraceComplete(stars),380);if(settings.rewardSound)setTimeout(()=>speak(`全部描完了，得到 ${stars} 顆星，好棒！`,'zh-TW',.82),550);return}
  if(settings.autoStep){let next=idx+1;while(next<state.traceSteps.length&&state.traceCompleted.has(next))next++;if(next>=state.traceSteps.length)next=[...Array(state.traceSteps.length).keys()].find(i=>!state.traceCompleted.has(i))??idx;setTimeout(()=>goTraceStep(next,settings.traceVoice),520)}
}

function formalOrderedTemplates(){
  const orderMap=new Map(DISPLAY_ORDER.map((id,i)=>[id,i]));
  return templates.filter(t=>isSampleTemplate(t.id)).sort((a,b)=>(orderMap.get(a.id)??999)-(orderMap.get(b.id)??999));
}
function currentTemplatePool(){
  if(drawEntry?.view==='category'&&drawEntry.category===state.category&&drawEntry.ids?.includes(state.current?.id)){
    const allowed=new Set(drawEntry.ids);const saved=formalOrderedTemplates().filter(t=>allowed.has(t.id));if(saved.length)return saved;
  }
  let pool=formalOrderedTemplates();
  if(state.category) pool=pool.filter(t=>t.cat===state.category && (state.category!=='anime-games'||gameArtSeriesFor(t)===activeGameArtSeries));
  const activeLevel=state.category?state.categoryPageLevel:state.level;
  if(activeLevel) pool=pool.filter(t=>t.lv===activeLevel);
  else if(!state.category)pool=pool.filter(homeLevelMatch);
  if(!pool.length) pool=formalOrderedTemplates();
  return pool;
}
function currentPoolLabel(){
  if(drawEntry?.view==='category'&&drawEntry.category===state.category&&drawEntry.ids?.includes(state.current?.id))return `${categories.find(x=>x[0]===state.category)?.[2]||'原分類'}・選取的 ${drawEntry.ids.length} 張`;
  const catName=state.category?(categories.find(x=>x[0]===state.category)?.[2]||''):'';
  const lv=state.category?state.categoryPageLevel:state.level;
  if(catName&&lv)return `${catName}・LV${lv}`;
  if(catName)return catName;
  if(lv)return `LV${lv}`;
  if(!state.category&&state.levelRange)return homeLevelDescription();
  return '全部正式教材';
}
function updateTemplateNavigation(){
  if(!state.current)return;
  const pool=currentTemplatePool();
  let idx=pool.findIndex(t=>t.id===state.current.id);
  if(idx<0){ const all=formalOrderedTemplates(); idx=all.findIndex(t=>t.id===state.current.id); const pos=$('#templatePositionText'); if(pos)pos.textContent=`${Math.max(1,idx+1)} / ${all.length}`; const lbl=$('#templatePoolText');if(lbl)lbl.textContent='全部正式教材';return; }
  const pos=$('#templatePositionText');if(pos)pos.textContent=`${idx+1} / ${pool.length}`;
  const lbl=$('#templatePoolText');if(lbl)lbl.textContent=currentPoolLabel();
}
let latestSavedDrawing=null;
function drawingIsSaved(){
  return !!(state.current && latestSavedDrawing?.templateId===state.current.id &&
    latestSavedDrawing?.sig===state.history[state.historyIndex]?.sig);
}
// Dialog must verify the drawing remains the exact saved version.
document.addEventListener('kidsdrawing:validate-saved-dialog',e=>{
  if(e.detail)e.detail.valid=!!(drawingIsSaved()&&state.current?.id===e.detail.templateId);
});
function confirmTemplateSwitch(){
  if((state.historyIndex||0)<=0 || drawingIsSaved())return true;
  return confirm('目前這張還有尚未收藏的繪畫。要切換到其他圖案嗎？');
}
let templateNavPendingDelta=0,templateNavTimer=null,templateNavRunning=false;
const TEMPLATE_NAV_DEBOUNCE_MS=isIOSLike()?260:180;
function setTemplateNavActivity(active=false){
  ['#prevTemplateBtn','#nextTemplateBtn','#focusPrevTemplateBtn','#focusNextTemplateBtn'].forEach(sel=>{const b=$(sel);if(!b)return;b.classList.toggle('nav-loading',!!active);b.setAttribute('aria-busy',String(!!active))});
}
function queueAdjacentTemplate(delta){
  if(!state.current)return;
  templateNavPendingDelta+=(delta>0?1:-1);
  clearTimeout(templateNavTimer);
  templateNavTimer=setTimeout(flushAdjacentTemplateQueue,TEMPLATE_NAV_DEBOUNCE_MS);
}
async function flushAdjacentTemplateQueue(){
  if(templateNavRunning){clearTimeout(templateNavTimer);templateNavTimer=setTimeout(flushAdjacentTemplateQueue,120);return}
  const delta=templateNavPendingDelta;templateNavPendingDelta=0;if(!delta||!state.current)return;
  if(!confirmTemplateSwitch())return;
  const pool=currentTemplatePool();if(!pool.length)return;
  let idx=pool.findIndex(t=>t.id===state.current.id);if(idx<0)idx=0;
  const jump=((delta%pool.length)+pool.length)%pool.length;
  const next=pool[(idx+jump)%pool.length];if(!next||next.id===state.current.id)return;
  templateNavRunning=true;setTemplateNavActivity(true);
  try{await openTemplate(next.id,{preserveScroll:true});}
  finally{templateNavRunning=false;setTemplateNavActivity(false);if(templateNavPendingDelta){clearTimeout(templateNavTimer);templateNavTimer=setTimeout(flushAdjacentTemplateQueue,80)}}
}
async function openAdjacentTemplate(delta){queueAdjacentTemplate(delta)}
async function openRandomTemplate({fromHome=false}={}){
  if(!fromHome&&state.current&&!confirmTemplateSwitch())return;
  let pool=currentTemplatePool();
  if(state.current&&pool.length>1)pool=pool.filter(t=>t.id!==state.current.id);
  const pick=pool[Math.floor(Math.random()*pool.length)];
  if(pick)await openTemplate(pick.id,{preserveScroll:!fromHome});
}

async function openTemplate(id,{preserveScroll=false}={}){
  const next=templates.find(t=>t.id===id);if(!next)return;
  resetActivePointerSession();
  state.current=next;
  document.dispatchEvent(new CustomEvent('kidsdrawing:template-changed',{detail:{templateId:next.id}}));
  latestSavedDrawing=null;
  $('#drawLevel').textContent='LV'+state.current.lv;
  $('#drawTitle').textContent=`${state.current.emoji} ${state.current.zh}・${state.current.en}`;
  $('#learnEmoji').textContent=state.current.emoji;
  $('#wordEn').textContent=state.current.en.toUpperCase();
  $('#wordKK').textContent=state.current.kk;
  $('#wordZh').textContent=state.current.zh;
  $('#wordZhuyin').textContent=state.current.zhuyin;
  updateFocusCurrentLabel();
  const modeConfig=next.cat==='anime-games'?GAME_MODE_SETTINGS[gameArtMode]:null;
  const initialOpacity=modeConfig?.opacity ?? .15;
  if(modeConfig)state.guideStyle=modeConfig.style;
  // Do not overwrite the user's default opacity while opening a game-art template.
  if(!modeConfig){settings.guideOpacity=.15;saveSettings()}
  state.guideOpacity=initialOpacity;
  lastVisibleGuideOpacity=initialOpacity||.15;
  updateGuideStyleUI();updateGameModeControls();
  resetLayersToDefaults();
  state.activeLayer=traceLayerIndex();
  state.layerVisible=drawCanvases.map(()=>true);state.layerLocked=drawCanvases.map(()=>false);
  state.traceAssist=false;
  state.history=[];state.historyIndex=-1;
  state.traceSteps=[];state.traceCompleted=new Set();state.traceScores={};state.traceStepIndex=0;
  resetTraceStats();
  setTool('pencil');
  syncGuideOpacityUI();
  const keepScroll=preserveScroll&&!drawFocusMode?{x:window.scrollX||0,y:window.scrollY||0}:null;
  showView('#drawView',{scroll:!preserveScroll});
  await new Promise(r=>requestAnimationFrame(r));
  if(keepScroll)window.scrollTo(keepScroll.x,keepScroll.y);
  await resizeMainCanvases(false);
  clearAllLayers(false);
  updateLayerUI();
  resizePracticeCanvases();
  resetPracticeToEnglish();
  updateSampleReference();
  updateTemplateNavigation();
  if(keepScroll)requestAnimationFrame(()=>window.scrollTo(keepScroll.x,keepScroll.y));
}

function renderLayerCardsInto(holder,mode='regular'){
  if(!holder)return;
  holder.innerHTML=layerMeta.map((m,i)=>`<div class="layer-card ${mode==='fullscreen'?'fullscreen-layer-card':''} ${i===state.activeLayer?'active':''} ${state.layerVisible[i]?'':'hidden-layer'} ${state.layerLocked[i]?'locked-layer':''}" data-layer-card="${i}" draggable="true"><button class="layer-thumb-btn" data-layer-select="${i}" type="button"><div class="layer-thumb-wrap"><canvas class="layer-thumb" data-thumb="${i}"></canvas><div class="layer-card-status"><span>${Math.round((state.layerOpacity[i]??1)*100)}%</span><span>${state.layerVisible[i]?'👁️':'🙈'}</span>${state.layerLocked[i]?'<span>🔒</span>':''}</div></div><div class="layer-card-meta"><b>${m.icon} ${m.name}</b><small>${i===0?'最上層・不會被其他層蓋住':i===drawCanvases.length-1?'最下層・新圖層預設在下方':(m.desc||'繪畫圖層')}</small></div></button></div>`).join('');
}
function updateLayerActionSet(ids,current){
  const name=$(ids.name);if(name)name.textContent=`${current?.icon||'🧩'} ${current?.name||''}`;
  const eye=$(ids.eye);if(eye){eye.textContent=state.layerVisible[state.activeLayer]?'👁️ 顯示':'🙈 已隱藏';eye.classList.toggle('active',!!state.layerVisible[state.activeLayer]);}
  const lock=$(ids.lock);if(lock){lock.textContent=state.layerLocked[state.activeLayer]?'🔒 已鎖定':'🔓 未鎖定';lock.classList.toggle('active',!!state.layerLocked[state.activeLayer]);}
  const ren=$(ids.rename);if(ren)ren.disabled=!!current?.system;
  const del=$(ids.del);if(del)del.disabled=!!current?.system;
  const up=$(ids.up);if(up)up.disabled=state.activeLayer<=0;
  const down=$(ids.down);if(down)down.disabled=state.activeLayer>=drawCanvases.length-1;
  const add=$(ids.add);if(add)add.disabled=drawCanvases.length>=MAX_DRAW_LAYERS;
  const dup=$(ids.duplicate);if(dup)dup.disabled=drawCanvases.length>=MAX_DRAW_LAYERS;
  const opacity=$(ids.opacity),opacityValue=$(ids.opacityValue);const pct=Math.round((state.layerOpacity[state.activeLayer]??1)*100);if(opacity)opacity.value=String(pct);if(opacityValue)opacityValue.textContent=`${pct}%`;
}
function updateLayerUI(){
  syncLayerNames();refreshLayerDataset();
  drawCanvases.forEach((c,i)=>{c.classList.toggle('active-layer',i===state.activeLayer);c.style.display=state.layerVisible[i]?'block':'none'});
  renderLayerCardsInto($('#layerCards'),'regular');
  renderLayerCardsInto($('#fullscreenLayerCards'),'fullscreen');
  bindLayerCardInteractions();
  const m=currentLayerMeta();
  updateLayerActionSet({name:'#activeLayerName',eye:'#layerEyeBtn',lock:'#layerLockBtn',rename:'#layerRenameBtn',del:'#layerDeleteBtn',up:'#layerMoveUpBtn',down:'#layerMoveDownBtn',add:'#addLayerBtn',duplicate:'#layerDuplicateBtn',opacity:'#layerOpacityRange',opacityValue:'#layerOpacityValue'},m);
  updateLayerActionSet({name:'#fullscreenActiveLayerName',eye:'#fullscreenLayerEyeBtn',lock:'#fullscreenLayerLockBtn',rename:'#fullscreenLayerRenameBtn',del:'#fullscreenLayerDeleteBtn',up:'#fullscreenLayerMoveUpBtn',down:'#fullscreenLayerMoveDownBtn',add:'#fullscreenAddLayerBtn',duplicate:'#fullscreenLayerDuplicateBtn',opacity:'#fullscreenLayerOpacityRange',opacityValue:'#fullscreenLayerOpacityValue'},m);
  const hint=$('#fullscreenLayerHint');if(hint)hint.textContent='拖曳圖層可調整順序；列表最上方會顯示在最前面。';
  bindLayerOpacityControls();updateAllLayerThumbnails();updateCompactDrawToolSummaries();
}
function selectLayer(i){if(i<0||i>=drawCanvases.length)return;resetActivePointerSession();state.activeLayer=i;state.layerVisible[i]=true;updateLayerUI();toast(`現在畫在「${LAYER_NAMES[i]}」層${state.layerLocked[i]?'（已鎖定）':''}`)}

function pointerPos(e,canvas){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}
function clamp(n,min,max){return Math.max(min,Math.min(max,n))}
function ignoreTouch(e){
  if(e.pointerType==='pen'){state.lastPenAt=Date.now();return false}
  if(settings.palmReject && e.pointerType==='touch' && Date.now()-state.lastPenAt<1200){
    // PointerEvent.width/height describe contact geometry. Do not block a normal fingertip;
    // only reject a broad contact that is much more likely to be a resting palm.
    const contact=Math.max(Number(e.width)||1,Number(e.height)||1);
    if(contact>=28)return true;
  }
  return false;
}
function normalizedPressure(e){
  if(!(settings.pressure&&e.pointerType==='pen'))return .62;
  let p=e.pressure>0?e.pressure:.5;
  const mode=settings.pressureCurve||'normal';
  if(mode==='soft')p=Math.pow(p,.58);
  else if(mode==='firm')p=Math.pow(p,1.55);
  else p=Math.pow(p,.88);
  return clamp(p,.04,1);
}
function pressureFactor(e){return .34+normalizedPressure(e)*1.08}
function penTiltAmount(e){
  if(e.pointerType!=='pen')return 0;
  return clamp(Math.hypot(Number(e.tiltX)||0,Number(e.tiltY)||0)/78,0,1);
}
function dynamicBrushWidth(e,velocity=0){
  const base=state.size,p=normalizedPressure(e),tilt=penTiltAmount(e),speed=clamp(velocity,0,2.4);
  if(state.tool==='eraser')return Math.max(26,base*2.85);
  if(state.tool==='marker')return base*(1.62+p*.10);
  if(state.tool==='crayon')return base*(1.08+p*.42)*(1+tilt*.08);
  if(state.tool==='watercolor')return base*(1.08+p*.82)*clamp(1.12-speed*.10,.78,1.12);
  if(state.tool==='airbrush')return base*(2.05+p*.50);
  if(state.tool==='brush')return base*(.48+p*1.58)*clamp(1.16-speed*.22,.68,1.16);
  return base*(.38+p*.58)*(1+tilt*.34)*clamp(1.05-speed*.08,.78,1.05);
}
function brushComposite(tool){return tool==='eraser'?'destination-out':'source-over'}
function brushOpacity(){return clamp(Number(state.opacity)||1,.15,1)}
function hashNoise(x,y,k=0){
  const n=Math.sin(x*12.9898+y*78.233+k*37.719)*43758.5453123;
  return n-Math.floor(n);
}
function segmentBasis(a,b){
  const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1;
  return {dx,dy,len,tx:dx/len,ty:dy/len,nx:-dy/len,ny:dx/len};
}
function smoothStrokePath(ctx,stroke,p,{width,alpha=1,offset=0,lineCap='round',color=state.color}={}){
  const b=segmentBasis(stroke.last,p),ox=b.nx*offset,oy=b.ny*offset;
  const mid={x:(stroke.last.x+p.x)/2,y:(stroke.last.y+p.y)/2};
  ctx.save();ctx.globalCompositeOperation=brushComposite(state.tool);ctx.strokeStyle=color;ctx.globalAlpha=alpha*brushOpacity();
  ctx.lineCap=lineCap;ctx.lineJoin='round';ctx.lineWidth=Math.max(.45,width);
  ctx.beginPath();ctx.moveTo(stroke.mid.x+ox,stroke.mid.y+oy);ctx.quadraticCurveTo(stroke.last.x+ox,stroke.last.y+oy,mid.x+ox,mid.y+oy);ctx.stroke();ctx.restore();
  return mid;
}
function drawPencilFibers(ctx,a,b,width,pressure=.6,tilt=0){
  const basis=segmentBasis(a,b),step=Math.max(1.25,width*.30),count=Math.max(1,Math.ceil(basis.len/step));
  const lanes=Math.round(2+pressure*4+tilt*2);
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.strokeStyle=state.color;ctx.lineCap='round';
  for(let i=0;i<=count;i++){
    const t=count?i/count:0,cx=a.x+basis.dx*t,cy=a.y+basis.dy*t;
    for(let lane=0;lane<lanes;lane++){
      const n=hashNoise(cx+i*3.1,cy+lane*7.7,lane+11);
      if(n>.48+pressure*.26)continue;
      const off=(hashNoise(cx,cy,lane+31)-.5)*width*.88;
      const along=(hashNoise(cx,cy,lane+47)-.5)*step*.9;
      const len=step*(.48+hashNoise(cx,cy,lane+63)*1.4);
      ctx.globalAlpha=(.035+pressure*.07+hashNoise(cx,cy,lane+79)*.055)*brushOpacity();
      ctx.lineWidth=.38+hashNoise(cx,cy,lane+91)*Math.max(.38,width*.055);
      ctx.beginPath();ctx.moveTo(cx+basis.nx*off+basis.tx*(along-len*.5),cy+basis.ny*off+basis.ty*(along-len*.5));
      ctx.lineTo(cx+basis.nx*off+basis.tx*(along+len*.5),cy+basis.ny*off+basis.ty*(along+len*.5));ctx.stroke();
    }
  }
  ctx.restore();
}
function drawCrayonWax(ctx,a,b,width,pressure=.6){
  const basis=segmentBasis(a,b),step=Math.max(1.35,width*.14),count=Math.max(1,Math.ceil(basis.len/step));
  const density=.52+pressure*.34;
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.strokeStyle=state.color;ctx.lineCap='butt';
  for(let i=0;i<=count;i++){
    const t=count?i/count:0,cx=a.x+basis.dx*t,cy=a.y+basis.dy*t;
    for(let lane=0;lane<9;lane++){
      const q=hashNoise(cx+i*1.7,cy,lane+3);if(q>density)continue;
      const off=(lane/8-.5)*width*.92+(hashNoise(cx,cy,lane+17)-.5)*width*.09;
      const along=(hashNoise(cx,cy,lane+37)-.5)*step*1.1;
      const len=step*(.55+hashNoise(cx,cy,lane+51)*1.65);
      ctx.globalAlpha=(.06+pressure*.085+hashNoise(cx,cy,lane+87)*.11)*brushOpacity();
      ctx.lineWidth=Math.max(.55,width*(.025+hashNoise(cx,cy,lane+71)*.045));
      ctx.beginPath();ctx.moveTo(cx+basis.nx*off+basis.tx*(along-len*.5),cy+basis.ny*off+basis.ty*(along-len*.5));
      ctx.lineTo(cx+basis.nx*off+basis.tx*(along+len*.5),cy+basis.ny*off+basis.ty*(along+len*.5));ctx.stroke();
    }
  }
  ctx.restore();
}
function drawBrushBristles(ctx,stroke,p,width,pressure=.6,velocity=0){
  const offsets=[-.44,-.35,-.26,-.17,-.08,0,.09,.18,.27,.36,.45];
  let mid=null;
  offsets.forEach((o,i)=>{
    const dry=clamp((1-pressure)*.42+velocity*.16,0,.72);
    if(hashNoise(stroke.last.x,stroke.last.y,i)<dry*.42)return;
    const edge=Math.abs(o),alpha=(.17+pressure*.20)*(1-edge*.42);
    const scale=.052+(1-edge)*.060+hashNoise(stroke.last.x,stroke.last.y,i+19)*.028;
    const m=smoothStrokePath(ctx,stroke,p,{width:Math.max(.58,width*scale),alpha,offset:width*o,lineCap:'butt'});if(i===5)mid=m;
  });
  return mid;
}
function drawMarkerStroke(ctx,stroke,p,width){
  // Alcohol marker / felt pen: stable chisel nib at a fixed angle, with a slightly darker outside edge.
  const angle=-Math.PI*.22,ux=Math.cos(angle)*width*.50,uy=Math.sin(angle)*width*.50;
  const last=stroke.last,mid={x:(last.x+p.x)/2,y:(last.y+p.y)/2};
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillStyle=state.color;
  ctx.globalAlpha=.94*brushOpacity();ctx.beginPath();ctx.moveTo(last.x+ux,last.y+uy);ctx.lineTo(p.x+ux,p.y+uy);ctx.lineTo(p.x-ux,p.y-uy);ctx.lineTo(last.x-ux,last.y-uy);ctx.closePath();ctx.fill();
  ctx.globalAlpha=.22*brushOpacity();const ex=ux*.94,ey=uy*.94;ctx.beginPath();ctx.moveTo(last.x+ex,last.y+ey);ctx.lineTo(p.x+ex,p.y+ey);ctx.lineWidth=Math.max(.55,width*.055);ctx.strokeStyle=state.color;ctx.stroke();ctx.restore();
  return mid;
}
function drawChiselStamp(ctx,p,width,alpha=.94){
  const angle=-Math.PI*.22;
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.translate(p.x,p.y);ctx.rotate(angle);ctx.fillStyle=state.color;ctx.globalAlpha=alpha*brushOpacity();
  const w=width*1.03,h=Math.max(2,width*.54);ctx.beginPath();ctx.roundRect(-w/2,-h/2,w,h,Math.min(2,h*.22));ctx.fill();ctx.restore();
}
function drawWatercolorStroke(ctx,stroke,p,width,pressure=.6){
  const body=.07+pressure*.07;
  const halo=.028+pressure*.025;
  let mid=smoothStrokePath(ctx,stroke,p,{width:width*.92,alpha:body,lineCap:'round'});
  smoothStrokePath(ctx,stroke,p,{width:width*1.18,alpha:halo,offset:width*.05,lineCap:'round'});
  smoothStrokePath(ctx,stroke,p,{width:width*.58,alpha:.035+pressure*.03,offset:-width*.15,lineCap:'round'});
  return mid;
}
function drawAirbrushStroke(ctx,a,b,width,pressure=.6){
  const basis=segmentBasis(a,b),step=Math.max(2,width*.12),count=Math.max(1,Math.ceil(basis.len/step));
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillStyle=state.color;
  for(let i=0;i<=count;i++){
    const t=count?i/count:0,cx=a.x+basis.dx*t,cy=a.y+basis.dy*t;
    const dots=Math.max(8,Math.round(width*.8));
    for(let k=0;k<dots;k++){
      const a0=hashNoise(cx+i*2.1,cy,k+7)*Math.PI*2;
      const r=Math.sqrt(hashNoise(cx,cy+i*1.7,k+19))*width*.50;
      const rr=.35+hashNoise(cx,cy,k+31)*Math.max(.7,width*.035);
      ctx.globalAlpha=(.018+pressure*.018+hashNoise(cx,cy,k+43)*.025)*brushOpacity();
      ctx.beginPath();ctx.arc(cx+Math.cos(a0)*r,cy+Math.sin(a0)*r,rr,0,Math.PI*2);ctx.fill();
    }
  }
  ctx.restore();
  return {x:(a.x+b.x)/2,y:(a.y+b.y)/2};
}
function drawAirbrushDot(ctx,p,width,pressure=.62){
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillStyle=state.color;
  const dots=Math.max(22,Math.round(width*2));
  for(let i=0;i<dots;i++){
    const a=hashNoise(p.x,p.y,i)*Math.PI*2,r=Math.sqrt(hashNoise(p.x,p.y,i+33))*width*.50;
    const rr=.35+hashNoise(p.x,p.y,i+71)*Math.max(.8,width*.04);
    ctx.globalAlpha=(.018+pressure*.02+hashNoise(p.x,p.y,i+55)*.026)*brushOpacity();
    ctx.beginPath();ctx.arc(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,rr,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}
function startTaperFactor(tool,distance,width){
  if(tool==='brush'||tool==='watercolor')return clamp(.28+distance/Math.max(9,width*1.35),.28,1);
  if(tool==='pencil')return clamp(.52+distance/Math.max(8,width*1.25),.52,1);
  return 1;
}
function drawBrushSegment(ctx,stroke,p,width){
  const tool=state.tool;let mid;
  const pressure=stroke.currentPressure??.62,velocity=stroke.currentVelocity??0,tilt=stroke.currentTilt??0;
  const basis=segmentBasis(stroke.last,p);stroke.distance=(stroke.distance||0)+basis.len;
  const taper=startTaperFactor(tool,stroke.distance,width);width*=taper;
  if(tool==='pencil'){
    // Graphite / colour pencil: translucent compressed core plus many fine fibres parallel to travel.
    mid=smoothStrokePath(ctx,stroke,p,{width:width*.76,alpha:.23+pressure*.23,lineCap:'butt'});
    smoothStrokePath(ctx,stroke,p,{width:Math.max(.55,width*.18),alpha:.09+pressure*.09,offset:width*.13,lineCap:'butt'});
    smoothStrokePath(ctx,stroke,p,{width:Math.max(.48,width*.12),alpha:.06+pressure*.07,offset:-width*.19,lineCap:'butt'});
    drawPencilFibers(ctx,stroke.last,p,width,pressure,tilt);
  }else if(tool==='crayon'){
    // Crayon is built from broken wax streaks instead of repeated translucent round tubes.
    mid=smoothStrokePath(ctx,stroke,p,{width:width*.70,alpha:.15+pressure*.11,lineCap:'butt'});
    smoothStrokePath(ctx,stroke,p,{width:width*.43,alpha:.09+pressure*.07,offset:width*.16,lineCap:'butt'});
    drawCrayonWax(ctx,stroke.last,p,width,pressure);
  }else if(tool==='brush'){
    // Wet brush body + separated bristles. Fast/light strokes become drier and narrower.
    mid=smoothStrokePath(ctx,stroke,p,{width:width*.72,alpha:.34+pressure*.22,lineCap:'butt'});
    drawBrushBristles(ctx,stroke,p,width,pressure,velocity);
  }else if(tool==='watercolor'){
    mid=drawWatercolorStroke(ctx,stroke,p,width,pressure);
  }else if(tool==='airbrush'){
    mid=drawAirbrushStroke(ctx,stroke.last,p,width,pressure);
  }else if(tool==='marker'){
    mid=drawMarkerStroke(ctx,stroke,p,width);
  }else{
    mid=smoothStrokePath(ctx,stroke,p,{width,alpha:1});
  }
  stroke.prev=stroke.last;stroke.mid=mid||{x:(stroke.last.x+p.x)/2,y:(stroke.last.y+p.y)/2};
  stroke.lastDir={x:basis.tx,y:basis.ty};stroke.last=p;stroke.lastWidth=width;
}
function drawBrushDot(ctx,p,width,pressure=.62){
  ctx.save();ctx.globalCompositeOperation=brushComposite(state.tool);ctx.fillStyle=state.color;
  if(state.tool==='pencil'){
    for(let i=0;i<10;i++){const a=hashNoise(p.x,p.y,i)*Math.PI*2,r=Math.sqrt(hashNoise(p.x,p.y,i+10))*width*.38;ctx.globalAlpha=(.035+pressure*.09+hashNoise(p.x,p.y,i+20)*.07)*brushOpacity();ctx.beginPath();ctx.ellipse(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,.35+hashNoise(p.x,p.y,i+30)*Math.max(.45,width*.065),.25+hashNoise(p.x,p.y,i+50)*Math.max(.3,width*.035),a,0,Math.PI*2);ctx.fill()}
  }else if(state.tool==='crayon'){
    for(let i=0;i<24;i++){const a=hashNoise(p.x,p.y,i)*Math.PI*2,r=Math.sqrt(hashNoise(p.x,p.y,i+20))*width*.48;if(hashNoise(p.x,p.y,i+80)>.52+pressure*.34)continue;ctx.globalAlpha=(.06+pressure*.10+hashNoise(p.x,p.y,i+40)*.12)*brushOpacity();ctx.beginPath();ctx.ellipse(p.x+Math.cos(a)*r,p.y+Math.sin(a)*r,.7+hashNoise(p.x,p.y,i+60)*Math.max(.7,width*.10),.35+hashNoise(p.x,p.y,i+70)*Math.max(.4,width*.05),a,0,Math.PI*2);ctx.fill()}
  }else if(state.tool==='brush'){
    ctx.globalAlpha=(.32+pressure*.22)*brushOpacity();ctx.translate(p.x,p.y);ctx.rotate(-.28);ctx.beginPath();ctx.ellipse(0,0,width*.30,width*.18,0,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=(.14+pressure*.08)*brushOpacity();for(let i=-3;i<=3;i++){ctx.beginPath();ctx.ellipse(i*width*.075,0,width*.028,width*.20,0,0,Math.PI*2);ctx.fill()}
  }else if(state.tool==='watercolor'){
    ctx.globalAlpha=(.09+pressure*.07)*brushOpacity();ctx.beginPath();ctx.arc(p.x,p.y,Math.max(1,width*.42),0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=(.035+pressure*.025)*brushOpacity();ctx.beginPath();ctx.arc(p.x,p.y,Math.max(1,width*.56),0,Math.PI*2);ctx.fill();
  }else if(state.tool==='airbrush'){
    ctx.restore();drawAirbrushDot(ctx,p,width,pressure);return;
  }else if(state.tool==='marker'){
    ctx.restore();drawChiselStamp(ctx,p,width,.58);return;
  }else{
    ctx.globalAlpha=brushOpacity();ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.7,width/2),0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}
function finishBrushStroke(ctx,stroke){
  if(!stroke)return;
  const p=stroke.last,w=stroke.lastWidth||state.size,tool=state.tool;
  if(stroke.mid&&Math.hypot(stroke.mid.x-p.x,stroke.mid.y-p.y)>.2){
    const tail={...stroke,last:{x:stroke.mid.x,y:stroke.mid.y},mid:{x:stroke.mid.x,y:stroke.mid.y},lastWidth:w};
    drawBrushSegment(ctx,tail,p,w);
  }
  // Natural pencil/paintbrush lift: extend only a few pixels while rapidly reducing width.
  if((tool==='pencil'||tool==='brush'||tool==='watercolor')&&stroke.lastDir){
    const ext=clamp((stroke.currentVelocity||0)*4+w*.42,2.5,11),steps=4;
    let temp={...stroke,last:{...p},mid:{...p},distance:999};
    for(let i=1;i<=steps;i++){
      const f=i/steps,q={x:p.x+stroke.lastDir.x*ext*f,y:p.y+stroke.lastDir.y*ext*f};
      const scale=(tool==='brush'||tool==='watercolor')?Math.pow(1-f,1.35):Math.pow(1-f,.95);
      if(scale<.08)break;temp.currentPressure=Math.max(.08,(stroke.currentPressure||.62)*(1-f*.78));drawBrushSegment(ctx,temp,q,Math.max(.45,w*scale));
    }
  }else if(tool==='airbrush')drawAirbrushDot(ctx,p,w,stroke.currentPressure||.62);
  else if(tool==='marker')drawChiselStamp(ctx,p,w,.93);
  else if(tool==='crayon'){const q={x:p.x+(stroke.lastDir?.x||1)*2,y:p.y+(stroke.lastDir?.y||0)*2};drawCrayonWax(ctx,p,q,Math.max(1,w*.72),stroke.currentPressure||.62);}
  else if(tool!=='eraser')drawBrushDot(ctx,p,Math.max(1,w*.50),stroke.currentPressure||.62);
}

function eraseDotAllLayers(p,width){
  drawCtxs.forEach((ctx,i)=>{
    if(state.layerLocked[i]||!state.layerVisible[i])return;ctx.save();ctx.globalCompositeOperation='destination-out';ctx.globalAlpha=1;ctx.fillStyle='#000';
    ctx.beginPath();ctx.arc(p.x,p.y,Math.max(2,width/2),0,Math.PI*2);ctx.fill();ctx.restore();
  });
}
function eraseSegmentAllLayers(stroke,p,width){
  const mid={x:(stroke.last.x+p.x)/2,y:(stroke.last.y+p.y)/2};
  drawCtxs.forEach((ctx,i)=>{
    if(state.layerLocked[i]||!state.layerVisible[i])return;ctx.save();ctx.globalCompositeOperation='destination-out';ctx.globalAlpha=1;
    ctx.strokeStyle='#000';ctx.lineWidth=Math.max(4,width);ctx.lineCap='round';ctx.lineJoin='round';
    ctx.beginPath();ctx.moveTo(stroke.mid.x,stroke.mid.y);ctx.quadraticCurveTo(stroke.last.x,stroke.last.y,mid.x,mid.y);ctx.stroke();ctx.restore();
  });
  stroke.mid=mid;stroke.last=p;stroke.lastWidth=width;
}

function clearBrowserSelection(){try{const s=window.getSelection?.();if(s&&s.rangeCount)s.removeAllRanges()}catch{}}
function protectDrawingSurface(el){
  if(!el)return;
  ['selectstart','dragstart','dblclick','contextmenu'].forEach(type=>el.addEventListener(type,e=>{e.preventDefault();clearBrowserSelection()},{capture:true}));
  el.addEventListener('pointerdown',()=>clearBrowserSelection(),{capture:true});
}
protectDrawingSurface($('#canvasWrap'));
protectDrawingSurface($('.practice-wrap'));

function fullscreenSelectionGuard(e){
  if(!drawFocusMode)return;
  if(['selectstart','dragstart','dblclick','contextmenu'].includes(e.type))e.preventDefault();
  clearBrowserSelection();
}
['selectstart','dragstart','dblclick','contextmenu'].forEach(type=>document.addEventListener(type,fullscreenSelectionGuard,{capture:true,passive:false}));
document.addEventListener('selectionchange',()=>{if(drawFocusMode)clearBrowserSelection()});
document.addEventListener('pointerdown',()=>{if(drawFocusMode)clearBrowserSelection()},{capture:true});
document.addEventListener('pointerup',()=>{if(drawFocusMode)clearBrowserSelection()},{capture:true});


// V1.7.43｜全系統全面防選取：不只全螢幕，所有頁面都禁止文字反白/圖片拖曳/長按選取。
function globalNoSelectionGuard(e){
  if(['selectstart','dragstart','dblclick','contextmenu'].includes(e.type)){
    e.preventDefault();
  }
  clearBrowserSelection();
}
['selectstart','dragstart','dblclick','contextmenu'].forEach(type=>{
  document.addEventListener(type,globalNoSelectionGuard,{capture:true,passive:false});
});
document.addEventListener('selectionchange',clearBrowserSelection,{capture:true});
document.addEventListener('pointerdown',clearBrowserSelection,{capture:true});
document.addEventListener('pointerup',clearBrowserSelection,{capture:true});
document.querySelectorAll('img').forEach(img=>{img.draggable=false});

function setupLayerDrawing(canvas){
  let drawing=false,stroke=null,session=0;
  canvas.addEventListener('pointerdown',e=>{
    clearBrowserSelection();
    const index=+canvas.dataset.layer;if(index!==state.activeLayer||ignoreTouch(e))return;e.preventDefault();if(state.layerLocked[index]){toast('🔒 這個圖層已鎖定，請先解鎖');return}
    if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;
    if(drawing)return;
    state.activePointer=e.pointerId;session=state.drawSession;drawing=false;stroke=null;
    drawing=true;try{canvas.setPointerCapture?.(e.pointerId)}catch{};
    const p=pointerPos(e,canvas),pressure=normalizedPressure(e),w=dynamicBrushWidth(e,0);
    stroke={last:p,prev:p,mid:p,lastWidth:w,lastTime:e.timeStamp||performance.now(),distance:0,currentPressure:pressure,currentVelocity:0,currentTilt:penTiltAmount(e),lastDir:null};
    if(state.tool==='eraser'){
      eraseDotAllLayers(p,w);
    }else{
      const startScale=state.tool==='brush'?.34:state.tool==='watercolor'?.58:state.tool==='pencil'?.58:1;
      drawBrushDot(drawCtxs[index],p,w*startScale,pressure);
    }
  });
  canvas.addEventListener('pointermove',e=>{
    if(!drawing||session!==state.drawSession||state.activePointer!==e.pointerId||ignoreTouch(e))return;e.preventDefault();
    const index=+canvas.dataset.layer;if(state.layerLocked[index])return;const ctx=drawCtxs[index],events=e.getCoalescedEvents?e.getCoalescedEvents():[e];
    for(const ev of events){
      const p=pointerPos(ev,canvas),now=ev.timeStamp||performance.now(),dt=Math.max(4,now-stroke.lastTime),dist=Math.hypot(p.x-stroke.last.x,p.y-stroke.last.y),velocity=dist/dt;
      if(dist<.20)continue;
      stroke.currentPressure=normalizedPressure(ev);stroke.currentVelocity=velocity;stroke.currentTilt=penTiltAmount(ev);
      const raw=dynamicBrushWidth(ev,velocity),smooth=(state.tool==='brush'||state.tool==='watercolor')?.52:state.tool==='pencil'?.60:state.tool==='airbrush'?.66:.70,width=(stroke.lastWidth*smooth)+(raw*(1-smooth));
      if(state.tool==='eraser')eraseSegmentAllLayers(stroke,p,width);else drawBrushSegment(ctx,stroke,p,width);
      stroke.lastTime=now;
    }
  });
  const end=e=>{
    if(!drawing||session!==state.drawSession)return;
    if(state.activePointer!==e.pointerId)return;
    const index=+canvas.dataset.layer;if(state.tool!=='eraser')finishBrushStroke(drawCtxs[index],stroke);
    else if(stroke)eraseDotAllLayers(stroke.last,Math.max(26,stroke.lastWidth||state.size*2.85));
    drawing=false;stroke=null;state.activePointer=null;saveHistory();updateAllLayerThumbnails();
  };
  canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('lostpointercapture',end);
}
drawCanvases.forEach(setupLayerDrawing);

function bindEraserCursorTracking(){
  const wrap=$('#canvasWrap');if(!wrap)return;
  const pos=e=>{const r=wrap.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}};
  wrap.addEventListener('pointerenter',e=>{
    if(state.tool!=='eraser'||ignoreTouch(e))return;if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;clearTimeout(eraserCursorHideTimer);const p=pos(e);placeEraserCursor(p.x,p.y,{tracking:true,erasing:(e.buttons||0)>0});
  });
  wrap.addEventListener('pointermove',e=>{
    if(state.tool!=='eraser'||ignoreTouch(e))return;if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;clearTimeout(eraserCursorHideTimer);const p=pos(e);placeEraserCursor(p.x,p.y,{tracking:true,erasing:(e.buttons||0)>0});
  });
  wrap.addEventListener('pointerdown',e=>{
    if(state.tool!=='eraser'||ignoreTouch(e))return;if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;clearTimeout(eraserCursorHideTimer);const p=pos(e);placeEraserCursor(p.x,p.y,{tracking:true,erasing:true});
  });
  const finish=e=>{
    if(state.tool!=='eraser')return;if(state.activePointer!==null&&state.activePointer!==e.pointerId)return;const p=pos(e);placeEraserCursor(p.x,p.y,{tracking:true,erasing:false});
    if(e.pointerType==='touch'){clearTimeout(eraserCursorHideTimer);eraserCursorHideTimer=setTimeout(()=>{const c=$('#eraserCursor');if(c&&state.tool==='eraser'){c.classList.remove('tracking','is-erasing');showEraserCursorPreview()}},650)}
  };
  wrap.addEventListener('pointerup',finish);wrap.addEventListener('pointercancel',finish);
  wrap.addEventListener('pointerleave',e=>{
    if(state.tool!=='eraser'||e.pointerType==='touch')return;const c=$('#eraserCursor');if(c)c.classList.remove('visible','tracking','is-erasing');
  });
}
bindEraserCursorTracking();

function clearLayer(record=true){if(state.layerLocked[state.activeLayer]){toast('🔒 這個圖層已鎖定，請先解鎖');return}clearCanvasPixels(layerCanvas(),layerCtx());if(layerMeta[state.activeLayer]?.id==='trace')resetTraceStats();if(record)saveHistory();updateAllLayerThumbnails()}
function clearAllLayers(record=true){drawCanvases.forEach((c,i)=>clearCanvasPixels(c,drawCtxs[i]));if(record)saveHistory();else{state.history=[];state.historyIndex=-1;saveHistory()}updateAllLayerThumbnails()}
document.addEventListener('kidsdrawing:restart-saved',()=>{
  if(!state.current || !drawingIsSaved())return;
  resetActivePointerSession();
  clearAllLayers(false);
  latestSavedDrawing=null;
  toast('畫布已清空，可以重新畫這張！');
});
function snapshot(){return drawCanvases.map(c=>c.toDataURL('image/png'))}
function historyLimit(){
  const layers=Math.max(1,drawCanvases.length);
  if(isIPadLike())return Math.max(6,Math.min(14,Math.floor(44/layers)));
  return Math.max(10,Math.min(24,Math.floor(80/layers)));
}
function saveHistory(){historyRestoreToken++;const snap=snapshot(),sig=snap.join('|');if(state.history[state.historyIndex]?.sig===sig)return;state.history=state.history.slice(0,state.historyIndex+1);state.history.push({sig,data:snap});const limit=historyLimit();while(state.history.length>limit)state.history.shift();state.historyIndex=state.history.length-1;updateUndoButtons()}
// V1.8.36: decode all history frames before altering the canvas.
// Rapid Undo/Redo used to allow a stale onload callback to repaint an older frame.
let historyRestoreToken=0;
async function restoreHistory(i){
  if(i<0||i>=state.history.length)return;
  const token=++historyRestoreToken;
  const entry=state.history[i];
  const canvasesAtStart=[...drawCanvases];
  const {w,h}=canvasCssSize();
  state.historyIndex=i;
  updateUndoButtons();
  try{
    const images=await Promise.all(entry.data.map(src=>src?dataUrlToImage(src):Promise.resolve(null)));
    if(token!==historyRestoreToken||state.history[i]!==entry||
       drawCanvases.length!==canvasesAtStart.length||
       drawCanvases.some((c,k)=>c!==canvasesAtStart[k]))return;
    const now=canvasCssSize();
    if(Math.abs(now.w-w)>1||Math.abs(now.h-h)>1)return;
    drawCtxs.forEach((ctx,k)=>{
      ctx.clearRect(0,0,w,h);
      if(images[k])ctx.drawImage(images[k],0,0,w,h);
      updateLayerThumbnail(k);
    });
  }catch(error){
    if(token===historyRestoreToken)console.warn('無法還原畫布歷史',error);
  }
}
function updateUndoButtons(){$('#undoBtn').disabled=state.historyIndex<=0;$('#redoBtn').disabled=state.historyIndex>=state.history.length-1}

async function resizePracticeCanvases(preserve=false){
  const r=$('.practice-wrap').getBoundingClientRect(),nextSize={w:r.width,h:r.height};
  if(r.width<2||r.height<2)return false;
  if(preserve&&almostSameSize(state.practiceCanvasSize,nextSize))return false;
  const copy=preserve?preserveCanvasPixels(practiceCanvas):null;
  sizeCanvas(practiceGuide,r.width,r.height);sizeCanvas(practiceCanvas,r.width,r.height);
  state.practiceCanvasSize=nextSize;
  clearCanvasPixels(practiceGuide,pgctx);clearCanvasPixels(practiceCanvas,pctx);
  // Restore without Image.onload, so later pen strokes cannot be painted over.
  if(copy)pctx.drawImage(copy,0,0,r.width,r.height);
  return true;
}
function spacedTextWidth(ctx,text,tracking){
  const chars=[...String(text)];let w=0;
  chars.forEach((ch,i)=>{w+=ctx.measureText(ch).width;if(i<chars.length-1)w+=ch===' '?tracking*1.8:tracking});
  return w;
}
function fitSpacedText(ctx,text,maxWidth,maxSize,minSize,trackingRatio=.12,fontFamily='ui-rounded, sans-serif'){
  let fs=maxSize,tracking=Math.max(2,fs*trackingRatio);
  for(;fs>minSize;fs-=1){ctx.font=`700 ${fs}px ${fontFamily}`;tracking=Math.max(2,fs*trackingRatio);if(spacedTextWidth(ctx,text,tracking)<=maxWidth)break}
  ctx.font=`700 ${fs}px ${fontFamily}`;return {fs,tracking};
}
function drawCenteredSpacedText(ctx,text,cx,y,tracking){
  const chars=[...String(text)],total=spacedTextWidth(ctx,text,tracking);let x=cx-total/2;
  ctx.textAlign='left';
  chars.forEach((ch,i)=>{const m=ctx.measureText(ch).width;ctx.fillText(ch,x,y);x+=m;if(i<chars.length-1)x+=ch===' '?tracking*1.8:tracking});
  ctx.textAlign='center';
}
function drawPracticeGuide(){
  if(!state.current)return;
  const r=practiceGuide.getBoundingClientRect();
  if(r.width<2||r.height<2)return;
  clearCanvasPixels(practiceGuide,pgctx);pgctx.save();pgctx.lineWidth=1;pgctx.textAlign='center';pgctx.textBaseline='middle';
  const isFull=!!(drawFocusMode&&focusLearningPane==='practice');
  const alpha=state.practiceStage===0?.23:state.practiceStage===1?.10:0;
  if(state.practiceMode==='en'){
    pgctx.strokeStyle='#bfc8d1';
    const lineYs=isFull?[r.height*.19,r.height*.37,r.height*.63,r.height*.81]:[r.height*.18,r.height*.38,r.height*.62,r.height*.82];
    lineYs.forEach((y,i)=>{pgctx.setLineDash(i===1||i===2?[7,8]:[]);pgctx.beginPath();pgctx.moveTo(isFull?r.width*.025:8,y);pgctx.lineTo(isFull?r.width*.975:r.width-8,y);pgctx.stroke()});pgctx.setLineDash([]);
    const txt=state.current.en.toLowerCase(),maxW=r.width*(isFull?.93:.90);
    const maxSize=isFull?Math.min(r.height*.58,r.width*.34):Math.min(66,r.height*.39);
    const minSize=isFull?Math.max(32,Math.min(72,r.width*.09)):25;
    const fitted=fitSpacedText(pgctx,txt,maxW,maxSize,minSize,isFull?.20:.14,'ui-rounded, "Arial Rounded MT Bold", sans-serif');
    pgctx.font=`700 ${fitted.fs}px ui-rounded, "Arial Rounded MT Bold", sans-serif`;
    pgctx.fillStyle=`rgba(60,70,80,${alpha})`;
    if(alpha)drawCenteredSpacedText(pgctx,txt,r.width*.5,r.height*.5,fitted.tracking);
  }else if(state.practiceMode==='zh'){
    const chars=[...state.current.zh],cols=Math.max(1,chars.length);
    if(isFull){
      const side=Math.max(24,r.width*.035),gap=Math.max(12,Math.min(42,r.width*.018));
      const availW=r.width-side*2-gap*(cols-1),availH=r.height*.70;
      const cell=Math.max(24,Math.min(availW/cols,availH));
      const gridW=cell*cols+gap*(cols-1),sx=(r.width-gridW)/2,sy=(r.height-cell)/2;
      for(let i=0;i<cols;i++){
        const x=sx+i*(cell+gap),y=sy;
        pgctx.strokeStyle='#cfc7b7';pgctx.strokeRect(x,y,cell,cell);pgctx.save();pgctx.setLineDash([8,9]);pgctx.strokeStyle='#dfd7ca';pgctx.beginPath();pgctx.moveTo(x+cell/2,y);pgctx.lineTo(x+cell/2,y+cell);pgctx.moveTo(x,y+cell/2);pgctx.lineTo(x+cell,y+cell/2);pgctx.moveTo(x,y);pgctx.lineTo(x+cell,y+cell);pgctx.moveTo(x+cell,y);pgctx.lineTo(x,y+cell);pgctx.stroke();pgctx.restore();
        if(state.practiceStage<2){pgctx.font=`700 ${cell*.79}px "PingFang TC","Microsoft JhengHei",sans-serif`;pgctx.fillStyle=`rgba(70,70,70,${alpha})`;pgctx.fillText(chars[i],x+cell/2,y+cell/2)}
      }
    }else{
      const gap=6,side=gap,vert=gap,availW=r.width-side*2-gap*(cols-1),availH=r.height-vert*2-gap;
      const cell=Math.max(32,Math.min(availW/cols,availH/2));
      const gridW=cell*cols+gap*(cols-1),gridH=cell*2+gap,sx=(r.width-gridW)/2,sy=(r.height-gridH)/2;
      for(let row=0;row<2;row++)for(let i=0;i<cols;i++){
        const x=sx+i*(cell+gap),y=sy+row*(cell+gap);pgctx.strokeStyle='#cfc7b7';pgctx.strokeRect(x,y,cell,cell);pgctx.save();pgctx.setLineDash([6,7]);pgctx.strokeStyle='#dfd7ca';pgctx.beginPath();pgctx.moveTo(x+cell/2,y);pgctx.lineTo(x+cell/2,y+cell);pgctx.moveTo(x,y+cell/2);pgctx.lineTo(x+cell,y+cell/2);pgctx.moveTo(x,y);pgctx.lineTo(x+cell,y+cell);pgctx.moveTo(x+cell,y);pgctx.lineTo(x,y+cell);pgctx.stroke();pgctx.restore();
        if((row===0&&state.practiceStage<2)||(row===1&&state.practiceStage===0)){pgctx.font=`700 ${cell*.74}px "PingFang TC","Microsoft JhengHei",sans-serif`;pgctx.fillStyle=row===0?`rgba(70,70,70,${alpha})`:'rgba(70,70,70,.09)';pgctx.fillText(chars[i],x+cell/2,y+cell/2)}
      }
    }
  }else{
    const syllables=state.current.zhuyin.split(/\s+/).filter(Boolean),cols=Math.max(1,syllables.length);
    if(isFull){
      const side=Math.max(24,r.width*.035),gap=Math.max(14,Math.min(44,r.width*.02));
      const availW=r.width-side*2-gap*(cols-1),cellW=Math.max(16,availW/cols),cellH=Math.min(r.height*.70,cellW*1.05);
      const gridW=cellW*cols+gap*(cols-1),sx=(r.width-gridW)/2,sy=(r.height-cellH)/2;
      for(let i=0;i<cols;i++){
        const x=sx+i*(cellW+gap),y=sy,syllable=syllables[i];
        pgctx.strokeStyle='#c9c3b9';pgctx.strokeRect(x,y,cellW,cellH);pgctx.save();pgctx.setLineDash([8,9]);pgctx.strokeStyle='#ddd7cc';pgctx.beginPath();pgctx.moveTo(x,y+cellH/2);pgctx.lineTo(x+cellW,y+cellH/2);pgctx.stroke();pgctx.restore();
        if(state.practiceStage<2){
          const maxFs=Math.min(cellH*.74,cellW*.72);
          const fitted=fitSpacedText(pgctx,syllable,cellW*.90,maxFs,Math.max(20,Math.min(46,cellW*.28)),.14,'"PingFang TC","Microsoft JhengHei",sans-serif');
          pgctx.font=`700 ${fitted.fs}px "PingFang TC","Microsoft JhengHei",sans-serif`;pgctx.fillStyle=`rgba(70,70,70,${alpha})`;drawCenteredSpacedText(pgctx,syllable,x+cellW/2,y+cellH/2,fitted.tracking);
        }
      }
    }else{
      const gap=Math.max(8,Math.min(14,r.width*.025)),cellW=Math.min(110,(r.width-gap*(cols+1))/cols),cellH=(r.height-gap*3)/2;
      const gridW=cellW*cols+gap*(cols-1),gridH=cellH*2+gap,sx=(r.width-gridW)/2,sy=(r.height-gridH)/2;
      for(let row=0;row<2;row++)for(let i=0;i<cols;i++){
        const x=sx+i*(cellW+gap),y=sy+row*(cellH+gap),syllable=syllables[i];pgctx.strokeStyle='#c9c3b9';pgctx.strokeRect(x,y,cellW,cellH);pgctx.save();pgctx.setLineDash([6,7]);pgctx.strokeStyle='#ddd7cc';pgctx.beginPath();pgctx.moveTo(x,y+cellH/2);pgctx.lineTo(x+cellW,y+cellH/2);pgctx.stroke();pgctx.restore();
        if((row===0&&state.practiceStage<2)||(row===1&&state.practiceStage===0)){
          const maxFs=Math.min(46,cellH*.58),fitted=fitSpacedText(pgctx,syllable,cellW*.82,maxFs,22,.08,'"PingFang TC","Microsoft JhengHei",sans-serif');
          pgctx.font=`700 ${fitted.fs}px "PingFang TC","Microsoft JhengHei",sans-serif`;pgctx.fillStyle=row===0?`rgba(70,70,70,${alpha})`:'rgba(70,70,70,.09)';drawCenteredSpacedText(pgctx,syllable,x+cellW/2,y+cellH/2,fitted.tracking);
        }
      }
    }
  }
  pgctx.restore();
  renderPracticePronunciationBar();
}

function setupPractice(){
  let drawing=false,pid=null,stroke=null;
  practiceCanvas.addEventListener('pointerdown',e=>{clearBrowserSelection();if(ignoreTouch(e))return;if(drawing||pid!==null)return;e.preventDefault();drawing=true;pid=e.pointerId;try{practiceCanvas.setPointerCapture?.(pid)}catch{};const p=pointerPos(e,practiceCanvas),w=Math.max(4,dynamicBrushWidth(e,0)*.72);stroke={last:p,mid:p,lastWidth:w,lastTime:e.timeStamp||performance.now()};drawBrushDot(pctx,p,w)});
  practiceCanvas.addEventListener('pointermove',e=>{if(!drawing||e.pointerId!==pid||ignoreTouch(e))return;e.preventDefault();const events=e.getCoalescedEvents?e.getCoalescedEvents():[e];for(const ev of events){const p=pointerPos(ev,practiceCanvas),now=ev.timeStamp||performance.now(),dt=Math.max(4,now-stroke.lastTime),dist=Math.hypot(p.x-stroke.last.x,p.y-stroke.last.y),velocity=dist/dt;if(dist<.25)continue;const raw=Math.max(4,dynamicBrushWidth(ev,velocity)*.72),w=stroke.lastWidth*.68+raw*.32;drawBrushSegment(pctx,stroke,p,w);stroke.lastTime=now}});
  const end=e=>{if(!drawing||e.pointerId!==pid)return;finishBrushStroke(pctx,stroke);drawing=false;pid=null;stroke=null};practiceCanvas.addEventListener('pointerup',end);practiceCanvas.addEventListener('pointercancel',end);practiceCanvas.addEventListener('lostpointercapture',end)
}
setupPractice();

let speechRunToken=0;
const ENGLISH_VOICE_PREFERRED=['samantha','ava','alex','allison','google us english','microsoft aria','microsoft jenny','zira','guy','joanna'];
const NOVELTY_VOICE_NAMES=['albert','bad news','bahh','bells','boing','bubbles','cellos','good news','jester','organ','superstar','trinoids','whisper','zarvox'];
function cleanEnglishSpeechText(text){return String(text||'').replace(/[‐‑–—-]+/g,' ').replace(/\s+/g,' ').trim()}
function voiceScore(v,lang){
  const want=lang.toLowerCase(),base=want.split('-')[0],vl=(v.lang||'').toLowerCase(),name=(v.name||'').toLowerCase();let score=0;
  if(vl===want)score+=100;else if(vl.startsWith(base+'-')||vl===base)score+=55;else return -999;
  if(v.localService)score+=10;
  if(base==='en'){
    const pref=ENGLISH_VOICE_PREFERRED.findIndex(n=>name.includes(n));if(pref>=0)score+=45-pref;
    if(NOVELTY_VOICE_NAMES.some(n=>name.includes(n)))score-=120;
    if(/english|samantha|ava|alex|allison|aria|jenny|zira|joanna/.test(name))score+=8;
  }
  if(base==='zh'&&/mei-jia|meijia|美佳|ting-ting|tingting|曉臻|xiaozhen|hsiaochen/.test(name))score+=35;
  return score;
}
function pickVoice(lang,voices=speechSynthesis.getVoices()){
  return [...voices].map(v=>({v,s:voiceScore(v,lang)})).filter(x=>x.s>-900).sort((a,b)=>b.s-a.s)[0]?.v||null;
}
function ensureSpeechVoices(timeout=1200){
  if(!('speechSynthesis'in window))return Promise.resolve([]);
  const now=speechSynthesis.getVoices();if(now.length)return Promise.resolve(now);
  return new Promise(resolve=>{let done=false;const finish=()=>{if(done)return;done=true;try{speechSynthesis.removeEventListener?.('voiceschanged',onvoices)}catch{};resolve(speechSynthesis.getVoices())};const onvoices=()=>{if(speechSynthesis.getVoices().length)finish()};speechSynthesis.addEventListener?.('voiceschanged',onvoices,{once:true});setTimeout(finish,timeout);speechSynthesis.getVoices()});
}
async function speak(text,lang,rate=.75,{volume=1,pitch=1.02}={}){
  if(!('speechSynthesis'in window)){toast('這台裝置不支援語音播放');return}
  const token=++speechRunToken;speechSynthesis.cancel();try{speechSynthesis.resume()}catch{}
  const voices=await ensureSpeechVoices();if(token!==speechRunToken)return;
  const spoken=lang.toLowerCase().startsWith('en')?cleanEnglishSpeechText(text):String(text||'').trim();if(!spoken)return;
  const u=new SpeechSynthesisUtterance(spoken);u.lang=lang;u.rate=rate;u.pitch=pitch;u.volume=Math.max(0,Math.min(1,volume));const voice=pickVoice(lang,voices);if(voice&&voice.lang.toLowerCase().startsWith(lang.split('-')[0].toLowerCase()))u.voice=voice;
  speechSynthesis.cancel();speechSynthesis.speak(u)
}

const ZHUYIN_TONE_SPEECH={'ˊ':'二聲','ˇ':'三聲','ˋ':'四聲','˙':'輕聲'};
function zhuyinUnitSpeech(unit){return ZHUYIN_TONE_SPEECH[unit]||unit}
function zhuyinUnits(syllable){return [...String(syllable||'').trim()].filter(Boolean)}
async function speakSpeechSteps(steps,{defaultPause=170}={}){
  if(!('speechSynthesis'in window)){toast('這台裝置不支援語音播放');return}
  const token=++speechRunToken;speechSynthesis.cancel();try{speechSynthesis.resume()}catch{}
  const voices=await ensureSpeechVoices();if(token!==speechRunToken)return;const voice=pickVoice('zh-TW',voices);let i=0;
  const next=()=>{
    if(token!==speechRunToken||i>=steps.length)return;
    const step=steps[i++];const spoken=String(step.spoken??step.text??'').trim();if(!spoken){setTimeout(next,step.pauseAfter??defaultPause);return}
    const u=new SpeechSynthesisUtterance(spoken);u.lang='zh-TW';u.rate=step.rate??.54;u.pitch=step.pitch??.96;u.volume=1;if(voice)u.voice=voice;
    u.onend=()=>{if(token===speechRunToken)setTimeout(next,step.pauseAfter??defaultPause)};speechSynthesis.speak(u);
  };next();
}
function zhuyinSyllableTeachingSteps(syllable,{includeCombined=true,combinedSpoken=''}={}){
  const units=zhuyinUnits(syllable).map(unit=>({text:unit,spoken:zhuyinUnitSpeech(unit),rate:.48,pauseAfter:150}));
  if(includeCombined)units.push({text:syllable,spoken:combinedSpoken||syllable,rate:.50,pauseAfter:260});
  return units;
}
function speakZhuyinSyllableTeaching(syllable,character=''){return speakSpeechSteps(zhuyinSyllableTeachingSteps(syllable,{combinedSpoken:character}),{defaultPause:160})}
function speakFullZhuyinTeaching(item){
  const syllables=String(item?.zhuyin||'').split(/\s+/).filter(Boolean);if(!syllables.length)return;
  const chars=[...String(item?.zh||'')].filter(ch=>!(/\s|[・，。、]/).test(ch));
  const steps=[];
  syllables.forEach((s,i)=>steps.push(...zhuyinSyllableTeachingSteps(s,{combinedSpoken:chars[i]||''}),{text:'',spoken:'',pauseAfter:240}));
  // 全詞注音：逐音節再念一次；以對應中文字送進 TTS，確保手機讀音穩定。
  syllables.forEach((s,i)=>steps.push({text:s,spoken:chars[i]||s,rate:.52,pauseAfter:190}));
  // 最後念整個中文詞彙。
  if(item?.zh)steps.push({text:item.zh,spoken:item.zh,rate:.62,pauseAfter:0});
  return speakSpeechSteps(steps,{defaultPause:170});
}

async function speakChineseChars(text){
  if(!('speechSynthesis'in window)){toast('這台裝置不支援語音播放');return}
  const token=++speechRunToken,chars=[...String(text)].filter(ch=>!(/\s|[・，。、]/).test(ch));if(!chars.length)return;
  speechSynthesis.cancel();try{speechSynthesis.resume()}catch{};const voices=await ensureSpeechVoices();if(token!==speechRunToken)return;const voice=pickVoice('zh-TW',voices);let i=0;
  const next=()=>{if(token!==speechRunToken||i>=chars.length)return;const u=new SpeechSynthesisUtterance(chars[i++]);u.lang='zh-TW';u.rate=.54;u.pitch=.96;u.volume=1;if(voice)u.voice=voice;u.onend=()=>{if(token===speechRunToken)setTimeout(next,150)};speechSynthesis.speak(u)};next()
}

function renderPracticePronunciationBar(){
  const bar=$('#practicePronunciationBar');if(!bar)return;
  const active=!!(drawFocusMode&&focusLearningPane==='practice'&&state.current);
  bar.hidden=!active;
  if(!active){bar.innerHTML='';return}
  const item=state.current;
  const makeBtn=(label,aria,handler,cls='')=>{
    const b=document.createElement('button');b.type='button';b.className=`practice-pronounce-btn ${cls}`.trim();b.textContent=label;b.setAttribute('aria-label',aria);bindReliableTap(b,handler);return b;
  };
  const frag=document.createDocumentFragment();
  if(state.practiceMode==='en'){
    const word=cleanEnglishSpeechText(item.en||'');
    frag.appendChild(makeBtn(`🔊 ${word.toUpperCase()}`,`播放英文單字 ${word}`,()=>speak(word,'en-US',.78,{volume:1,pitch:1.02}),'whole'));
    frag.appendChild(makeBtn('🐢 慢速',`慢速播放英文單字 ${word}`,()=>speak(word,'en-US',.50,{volume:1,pitch:1.02}),'slow'));
    [...word.replace(/\s+/g,'')].forEach(letter=>frag.appendChild(makeBtn(`🔊 ${letter.toUpperCase()}`,`播放英文字母 ${letter.toUpperCase()}`,()=>speak(letter.toUpperCase(),'en-US',.62,{volume:1,pitch:1.02}),'unit')));
  }else if(state.practiceMode==='zh'){
    const chars=[...String(item.zh||'')].filter(ch=>!(/\s|[・，。、]/).test(ch));
    frag.appendChild(makeBtn(`🔊 ${item.zh}`,`播放中文詞語 ${item.zh}`,()=>speak(item.zh,'zh-TW',.68,{volume:1,pitch:.96}),'whole'));
    chars.forEach(ch=>frag.appendChild(makeBtn(`🔊 ${ch}`,`播放中文字 ${ch}`,()=>speak(ch,'zh-TW',.58,{volume:1,pitch:.96}),'unit')));
  }else{
    const syllables=String(item.zhuyin||'').split(/\s+/).filter(Boolean);
    const chars=[...String(item.zh||'')].filter(ch=>!(/\s|[・，。、]/).test(ch));
    frag.appendChild(makeBtn('▶ 完整教學',`依序播放 ${item.zh} 的拆音、合音與完整詞彙`,()=>speakFullZhuyinTeaching(item),'bpmf whole-teaching'));
    syllables.forEach((syllable,i)=>{
      const units=zhuyinUnits(syllable).join('・');
      const label=`🔊 ${chars[i]||''} ${units} → ${syllable}`.trim();
      const b=makeBtn(label,`逐一播放 ${syllable} 的每個注音，再播放完整注音`,()=>speakZhuyinSyllableTeaching(syllable,chars[i]||''),'bpmf syllable-teaching');
      if(chars[i])b.dataset.character=chars[i];
      frag.appendChild(b);
    });
    frag.appendChild(makeBtn(`🔊 全詞 ${syllables.join('・')}`,`播放整個詞彙 ${item.zh} 的注音後再念中文詞彙`,()=>{
      const steps=syllables.map((s,i)=>({text:s,spoken:chars[i]||s,rate:.52,pauseAfter:190}));steps.push({text:item.zh,spoken:item.zh,rate:.62,pauseAfter:0});speakSpeechSteps(steps);
    },'whole'));
  }
  bar.replaceChildren(frag);
}

if('speechSynthesis'in window){speechSynthesis.getVoices();speechSynthesis.addEventListener?.('voiceschanged',()=>speechSynthesis.getVoices());}

// V1.8.38: capture the complete editable artwork before any asynchronous image loads.
function captureEditableWork(){
  const {w,h}=canvasCssSize();
  if(w<2||h<2)throw new Error('畫布尺寸無效');
  const pixels=drawCanvases.map(c=>c.toDataURL('image/png'));
  return {format:1,templateId:state.current?.id||null,width:w,height:h,
    pixels,meta:layerMeta.map(m=>({...m})),visible:[...state.layerVisible],
    locked:[...state.layerLocked],opacity:[...state.layerOpacity],
    activeLayer:state.activeLayer,guideOpacity:state.guideOpacity,guideStyle:state.guideStyle,
    lockOutlineTop:!!settings.lockOutlineTop,freeArtMode:state.current?.cat==='anime-games'&&gameArtMode==='free'};
}
async function renderCapturedWork(capture,scale=2){
  const {width:w,height:h}=capture;
  const images=await Promise.all(capture.pixels.map(src=>dataUrlToImage(src)));
  const c=document.createElement('canvas');c.width=Math.round(w*scale);c.height=Math.round(h*scale);
  const x=c.getContext('2d');x.scale(scale,scale);x.fillStyle='#fffdf9';x.fillRect(0,0,w,h);
  // Match the screen: never export the original faint outline beneath locked ink.
  if(capture.templateId&&capture.guideOpacity>0&&!outlinePinIsActive(capture)){
    // A changed template never becomes the saved guide: the result is discarded before commit.
    if(state.current?.id!==capture.templateId)throw new Error('儲存期間已切換教材');
    const guide=await currentGuideImage();
    if(state.current?.id!==capture.templateId)throw new Error('儲存期間已切換教材');
    x.save();x.globalAlpha=capture.guideOpacity;drawGuideImage(x,guide,w,h);x.restore();
  }
  for(let i=images.length-1;i>=0;i--)if(capture.visible[i]){
    x.save();x.globalAlpha=capture.opacity[i]??1;x.drawImage(images[i],0,0,w,h);x.restore();
  }
  if(capture.templateId&&outlinePinIsActive(capture)){
    const ink=await getOutlineInk(capture.templateId);
    if(state.current?.id!==capture.templateId)throw new Error('儲存期間已切換教材');
    // The overlay is drawn LAST, after all paint layers, matching screen and print PNG.
    drawGuideImage(x,ink,w,h);
  }
  return c.toDataURL('image/png');
}
async function mergedImage(){return renderCapturedWork(captureEditableWork())}
function db(){return new Promise((res,rej)=>{const q=indexedDB.open('kidsDrawingDB',2);q.onupgradeneeded=()=>{if(!q.result.objectStoreNames.contains('works'))q.result.createObjectStore('works',{keyPath:'id'})};q.onsuccess=()=>res(q.result);q.onerror=()=>rej(q.error)})}
let workSaving=false;
// V1.8.33: create numeric sortable IDs without same-millisecond collisions;
// keep compatibility with existing numeric data-download/data-delete selectors.
let lastWorkId=0;
function nextWorkId(){
  const candidate=Date.now()*1000;
  lastWorkId=Math.max(candidate,lastWorkId+1);
  return lastWorkId;
}
function saveWorkErrorText(e){
  const name=String(e?.name||''),message=String(e?.message||'');
  if(/QuotaExceededError|quota|disk full|storage full/i.test(name+' '+message))return '瀏覽器作品儲存空間不足';
  if(/SecurityError|InvalidStateError|UnknownError/i.test(name))return '瀏覽器阻止作品資料庫寫入';
  if(/AbortError|ConstraintError/i.test(name))return '作品資料庫交易未完成';
  return '作品保存失敗（'+(name||'未知錯誤')+'）';
}
async function saveWork(){
  if(!state.current||workSaving)return;
  workSaving=true;
  const btn=$('#saveBtn');if(btn)btn.disabled=true;
  const savedTemplate=state.current;
  let image=null,savedInDb=false,captured=null,unsavedRecord=null;
  try{
    captured=captureEditableWork(); // Snapshot BEFORE first await; keep all editable layers unchanged.
    // Gallery PNG at native canvas resolution; 2x printable artwork is still available via export.
    // This reduces storage significantly without compromising editable PNG layers.
    image=await renderCapturedWork(captured,1);
    const data={id:nextWorkId(),templateId:savedTemplate.id,title:`${savedTemplate.zh}・${savedTemplate.en}`,
      lv:savedTemplate.lv,created:new Date().toISOString(),traceCompleted:state.traceCompleted.size,
      traceTotal:state.traceSteps.length,traceRating:traceRatingValue(),image,editable:captured};
    if(state.current?.id!==savedTemplate.id){toast('已切換圖案，請回到原圖重新儲存');return;}
    unsavedRecord=data;
    const d=await db();
    try{
      const tx=d.transaction('works','readwrite');
      tx.objectStore('works').add(data);
      await new Promise((r,j)=>{tx.oncomplete=()=>r();tx.onerror=()=>j(tx.error||new Error('寫入失敗'));tx.onabort=()=>j(tx.error||new Error('交易中止'))});
      savedInDb=true;
    }finally{d.close()}
    // V1.8.75: verify the committed work can be read before announcing success.
    // A readback error is handled separately: the write may already be durable.
    let verified=false;
    try{
      const verifyDb=await db();
      try{
        const stored=await new Promise((resolve,reject)=>{
          const req=verifyDb.transaction('works','readonly').objectStore('works').get(data.id);
          req.onsuccess=()=>resolve(req.result);
          req.onerror=()=>reject(req.error||new Error('讀回失敗'));
        });
        verified=!!stored&&stored.templateId===data.templateId&&stored.image===data.image&&
          stored.editable?.pixels?.length===data.editable.pixels.length&&
          stored.editable.pixels.every((px,i)=>px===data.editable.pixels[i])&&
          stored.editable.activeLayer===data.editable.activeLayer;
      }finally{verifyDb.close()}
    }catch(readError){
      console.warn('作品寫入已提交，但讀回確認失敗',readError);
      toast('作品已寫入，但無法確認讀回；請到作品集查看並備份');
      return;
    }
    if(!verified){
      toast('作品寫入後讀回不一致，請到作品集檢查，並先備份畫作');
      return;
    }
    // A secondary progress/star preference failure must not misreport a successful artwork save.
    let earned=0;
    try{
      const first=!doneTemplates().has(savedTemplate.id);
      markDone(savedTemplate.id);
      earned=first?2:1;
      setStars(getStars()+earned);
    }catch(progressError){console.warn('作品已儲存，但星星紀錄更新失敗',progressError)}
    if(state.current?.id===savedTemplate.id){
      latestSavedDrawing={templateId:savedTemplate.id,sig:state.history[state.historyIndex]?.sig};
      if(earned)showReward(earned);
      document.dispatchEvent(new CustomEvent('kidsdrawing:work-saved',{
        detail:{templateId:savedTemplate.id,title:savedTemplate.zh,earned}
      }));
    }
    toast('⭐ 已收藏作品');
    if(settings.rewardSound)setTimeout(()=>speak('完成了，好棒！','zh-TW',.82),250);
  }catch(e){
    console.error('saveWork failure',e);
    if(savedInDb){toast('作品已收藏，但獎勵畫面發生錯誤；請到作品集查看');return;}
    const reason=saveWorkErrorText(e);
    toast(reason+'，尚未收藏');
    // Never delete earlier works to recover space. Rescue full editable layers, not just a flattened PNG.
    // This uses the SAME validated JSON format as the existing '作品備份匯入' feature.
    if(unsavedRecord&&window.confirm(reason+'。\n這張作品尚未收藏。\n要下載「可編輯作品備援 JSON」嗎？\n稍後可到「我的作品」→「匯入備份」還原圖層。')){
      try{
        const payload={format:'kids-drawing-works-backup',version:1,createdAt:new Date().toISOString(),
          source:'小小畫家・儲存失敗緊急備援',workCount:1,works:[unsavedRecord]};
        validateBackupWork(unsavedRecord);
        const blob=new Blob([JSON.stringify(payload)],{type:'application/json'});
        if(blob.size>250*1024*1024)throw new Error('備援檔超過 250 MB');
        backupDownload(blob,'小小畫家_可編輯作品緊急備份_'+savedTemplate.zh+'_'+Date.now()+'.json');
        toast('已要求下載可編輯備份，請確認檔案確實儲存成功');
      }catch(rescueError){console.error('可編輯備份建立失敗',rescueError);toast('可編輯備份失敗，請保留畫板並另存圖片')}
    }
    if(image&&window.confirm('是否另外下載 PNG 圖片備份？')){
      try{
        backupDownload(dataUrlToBlob(image),'小小畫家_未儲存圖片_'+savedTemplate.zh+'_'+Date.now()+'.png');
        toast('已要求下載 PNG，請確認檔案確實存在');
      }catch(downloadError){console.error('PNG 備援下載失敗',downloadError);toast('下載失敗，請保持畫面並截圖備份')}
    }
  }finally{workSaving=false;if(btn)btn.disabled=false}
}

// Older PNG-only records stay viewable and downloadable, but cannot recover separated layers.
let workOpenGeneration=0;
// V1.8.39: validate and predecode ALL saved layers before touching the active drawing.
// A failed snapshot must never clear the current canvas or modify an existing work record.
function validateEditableSnapshot(work){
  const saved=work?.editable;
  if(!saved||saved.format!==1||!Array.isArray(saved.pixels)||saved.pixels.length<3||saved.pixels.length>MAX_DRAW_LAYERS)
    throw new Error('圖層數量或存檔格式不相容');
  if(saved.templateId!==work.templateId)throw new Error('作品與教材不相符');
  if(!Number.isFinite(saved.width)||!Number.isFinite(saved.height)||saved.width<2||saved.height<2)
    throw new Error('畫布尺寸不正確');
  if(!saved.pixels.every(x=>typeof x==='string'&&x.startsWith('data:image/png;base64,')))
    throw new Error('圖片格式不正確');
  // Preserve the true order even if the three system layers were reordered.
  const defaults=DEFAULT_LAYER_META.map(x=>x.id);
  const raw=Array.isArray(saved.meta)?saved.meta:[];
  const meta=saved.pixels.map((_,i)=>{
    const m=raw[i];
    if(!m||typeof m.id!=='string'){
      if(i<3)return {...DEFAULT_LAYER_META[i]};
      return {id:`restored-${i}`,name:`圖層 ${i+1}`,icon:'🎨',desc:'繪畫圖層',system:false};
    }
    const known=DEFAULT_LAYER_META.find(d=>d.id===m.id);
    if(known)return {...known};
    return {id:String(m.id).slice(0,80),name:String(m.name||`圖層 ${i+1}`).slice(0,16),
      icon:String(m.icon||'🎨').slice(0,8),desc:String(m.desc||'繪畫圖層').slice(0,40),system:false};
  });
  if(new Set(meta.map(m=>m.id)).size!==meta.length)throw new Error('圖層 ID 重複');
  if(defaults.some(id=>!meta.some(m=>m.id===id)))throw new Error('缺少系統繪畫圖層');
  const opacity=saved.pixels.map((_,i)=>{
    const n=Number(saved.opacity?.[i]??1);
    return Number.isFinite(n)?Math.max(.1,Math.min(1,n)):1;
  });
  const activeIndex=Number(saved.activeLayer);
  const activeLayer=Number.isInteger(activeIndex)?Math.max(0,Math.min(meta.length-1,activeIndex)):0;
  return {saved,meta,opacity,activeLayer};
}
async function continueEditingWork(work){
  if(!work?.editable?.pixels?.length){toast('舊作品沒有圖層資料，仍可下載 PNG');return;}
  if(!templates.some(t=>t.id===work.templateId)){toast('找不到這張作品的原始教材');return;}
  if(state.current&&!confirmTemplateSwitch())return;
  let validated;
  try{validated=validateEditableSnapshot(work)}catch(error){toast(`無法開啟：${error.message}`);return;}
  const generation=++workOpenGeneration;
  const {saved,meta,opacity,activeLayer}=validated;
  // A corrupt PNG is rejected without replacing any of the user's active drawing.
  const images=await Promise.all(saved.pixels.map(src=>dataUrlToImage(src)));
  if(generation!==workOpenGeneration)return;
  if(!images.every(img=>img.naturalWidth>0&&img.naturalHeight>0))throw new Error('圖層圖片解碼失敗');
  await openTemplate(work.templateId);
  if(generation!==workOpenGeneration||state.current?.id!==work.templateId)return;
  resetActivePointerSession();historyRestoreToken++;
  resetLayersToDefaults();
  while(drawCanvases.length<images.length)createLayerCanvas();
  layerMeta=meta.map(m=>({...m}));
  state.layerVisible=images.map((_,i)=>saved.visible?.[i]!==false);
  if(!state.layerVisible.some(Boolean))state.layerVisible[activeLayer]=true;
  state.layerLocked=images.map((_,i)=>saved.locked?.[i]===true);
  state.layerOpacity=opacity;
  state.activeLayer=activeLayer;
  state.guideOpacity=normalizeGuideOpacity(saved.guideOpacity);
  if(saved.guideStyle==='outline'||saved.guideStyle==='color')state.guideStyle=saved.guideStyle;
  if(typeof saved.lockOutlineTop==='boolean'){settings.lockOutlineTop=saved.lockOutlineTop;saveSettings()}
  if(state.current?.cat==='anime-games'&&saved.freeArtMode===true)gameArtMode='free';
  else if(state.current?.cat==='anime-games'&&saved.guideStyle==='outline')gameArtMode='outline';
  else if(state.current?.cat==='anime-games')gameArtMode='color';
  updateGameModeControls();
  syncOutlinePinUI();
  lastVisibleGuideOpacity=state.guideOpacity||.15;
  syncGuideOpacityUI();updateGuideStyleUI();
  syncLayerNames();refreshLayerDataset();
  const {w,h}=canvasCssSize();
  drawCanvases.forEach((canvas,i)=>{
    const ctx=drawCtxs[i];ctx.clearRect(0,0,w,h);
    ctx.drawImage(images[i],0,0,w,h);
  });
  latestSavedDrawing=null;
  resetDrawingHistoryBaseline();updateLayerUI();updateAllLayerThumbnails();
  await drawGuide();
  toast('已還原完整圖層，可繼續編輯；再次儲存會另存新作品');
}

// V1.8.76: a database failure is not an empty gallery. Surface it instead of hiding existing works.
async function allWorks(){
  const d=await db();
  try{return await new Promise((resolve,reject)=>{
    const tx=d.transaction('works','readonly'),req=tx.objectStore('works').getAll();
    req.onsuccess=()=>resolve(req.result.sort((a,b)=>b.id-a.id));
    req.onerror=()=>reject(req.error||new Error('作品集讀取失敗'));
    tx.onabort=()=>reject(tx.error||new Error('作品集讀取中止'));
  })}finally{d.close()}
}
// V1.8.41: Validated, additive manual backups with repeat-import protection.
const WORK_BACKUP_FORMAT='kids-drawing-works-backup';
const WORK_BACKUP_VERSION=1;
const WORK_BACKUP_MAX_BYTES=250*1024*1024;
const WORK_BACKUP_IMAGE_MAX_LENGTH=40*1024*1024;
let backupBusy=false;
function validBackupImage(data){
  // Verify PNG magic rather than accepting arbitrary base64 as an image.
  return typeof data==='string'&&data.length>100&&data.length<=WORK_BACKUP_IMAGE_MAX_LENGTH&&
    /^data:image\/png;base64,iVBORw0KGgo[A-Za-z0-9+/=]+$/.test(data);
}
function validateBackupWork(w){
  if(!w||typeof w!=='object'||Array.isArray(w))throw new Error('作品資料格式不正確');
  if(!validBackupImage(w.image))throw new Error('作品 PNG 遺失或格式不符');
  if(typeof w.templateId!=='string'||!w.templateId||w.templateId.length>180)throw new Error('教材代碼不正確');
  if(typeof w.title!=='string'||w.title.length>240||/[<>&"']/.test(w.title))throw new Error('作品名稱不正確');
  if(!Number.isInteger(w.lv)||w.lv<0||w.lv>99)throw new Error('等級不正確');
  if(typeof w.created!=='string'||!Number.isFinite(Date.parse(w.created)))throw new Error('建立日期不正確');
  if(typeof w.id!=='number'||!Number.isSafeInteger(w.id)||w.id<0)throw new Error('作品 ID 不正確');
  if(w.editable!==undefined&&w.editable!==null){
    if(w.editable.format!==1||w.editable.templateId!==w.templateId||!Array.isArray(w.editable.pixels)||w.editable.pixels.length<3||w.editable.pixels.length>MAX_DRAW_LAYERS)throw new Error('編輯圖層結構不相容');
    if(!w.editable.pixels.every(validBackupImage))throw new Error('編輯圖層 PNG 格式不正確');
    if(!Number.isInteger(w.editable.width)||!Number.isInteger(w.editable.height)||w.editable.width<2||w.editable.height<2||w.editable.width>12000||w.editable.height>12000)throw new Error('圖層尺寸不正確');
    if(Array.isArray(w.editable.meta)){
      if(w.editable.meta.length!==w.editable.pixels.length)throw new Error('圖層數量與設定不一致');
      const ids=w.editable.meta.map(m=>m?.id);
      if(ids.some(id=>typeof id!=='string'||!id||id.length>120)||new Set(ids).size!==ids.length)throw new Error('圖層 ID 有誤');
    }
  }
  return true;
}
function parseWorksBackup(text){
  let parsed;try{parsed=JSON.parse(text)}catch{throw new Error('不是有效的 JSON 備份檔')}
  if(parsed?.format!==WORK_BACKUP_FORMAT||parsed?.version!==WORK_BACKUP_VERSION||!Array.isArray(parsed.works))throw new Error('備份檔版本或格式不相容');
  if(parsed.works.length>20000)throw new Error('備份作品數量超過安全上限');
  const ids=new Set();
  parsed.works.forEach((w,i)=>{
    try{validateBackupWork(w)}catch(err){throw new Error(`第 ${i+1} 張：${err.message}`)}
    if(ids.has(w.id))throw new Error(`備份中第 ${i+1} 張作品 ID 重複`);
    ids.add(w.id);
  });
  return parsed.works;
}
function backupDownload(blob,filename){
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),60000);
}
function backupStatus(message,isError=false){const el=$('#worksBackupStatus');if(el){el.textContent=message;el.classList.toggle('error',isError)}}
async function getAllWorksForBackup(){
  const d=await db();
  try{return await new Promise((resolve,reject)=>{
    const tx=d.transaction('works','readonly'),req=tx.objectStore('works').getAll();
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||new Error('作品資料庫讀取失敗'));
    tx.onabort=()=>reject(tx.error||new Error('作品資料庫交易中止'));
  })}finally{d.close()}
}
function backupImageIdentity(w){
  // A compact, deterministic provenance tag for repeat imports of the same backup.
  // Distinct artworks sharing a source ID should not be assumed identical.
  const im=w.image;
  return JSON.stringify([w.id,w.created,w.templateId,im.length,im.slice(0,160),im.slice(-160),w.editable?.pixels?.length||0]);
}
function prepareBackupMerge(incoming,existing){
  const used=new Set(existing.map(w=>w.id));
  const fingerprints=new Set(existing.map(w=>w.backupOriginSignature).filter(Boolean));
  const records=[];let renamed=0,skipped=0;
  incoming.forEach(w=>{
    const identity=backupImageIdentity(w);
    const existingSame=existing.find(e=>e.id===w.id&&e.created===w.created&&e.templateId===w.templateId&&e.image===w.image);
    if(existingSame||fingerprints.has(identity)){skipped++;return}
    const copy={...w,backupOriginSignature:identity};
    if(used.has(copy.id)){
      let newid=nextWorkId();while(used.has(newid))newid=nextWorkId();copy.id=newid;renamed++;
    }
    used.add(copy.id);fingerprints.add(identity);records.push(copy);
  });
  return {records,renamed,skipped};
}
async function exportAllWorksBackup(){
  if(backupBusy)return;backupBusy=true;try{
    backupStatus('正在讀取作品並檢查備份資料…');
    const works=await getAllWorksForBackup();
    if(!works.length){backupStatus('目前沒有收藏作品可以備份');return}
    works.forEach(validateBackupWork);
    const payload={format:WORK_BACKUP_FORMAT,version:WORK_BACKUP_VERSION,createdAt:new Date().toISOString(),source:'小小畫家',workCount:works.length,works};
    const blob=new Blob([JSON.stringify(payload)],{type:'application/json'});
    if(blob.size>WORK_BACKUP_MAX_BYTES)throw new Error('備份超過 250 MB，請先在電腦端處理；此版本無法安全一次匯出');
    backupDownload(blob,`小小畫家_完整作品備份_${new Date().toLocaleDateString('en-CA')}.json`);
    backupStatus(`已要求瀏覽器下載 ${works.length} 張作品的備份（${(blob.size/1048576).toFixed(1)} MB）。請到「檔案／下載項目」確認檔案存在，再自行存到 Google Drive。`);
  }catch(err){console.error(err);backupStatus(`匯出失敗：${err.message}`,true)}finally{backupBusy=false}
}
async function readBackupText(file){
  if(typeof file.text==='function')return file.text();
  return new Promise((resolve,reject)=>{
    const reader=new FileReader();reader.onload=()=>resolve(String(reader.result||''));reader.onerror=()=>reject(reader.error||new Error('裝置無法讀取備份檔'));reader.readAsText(file,'utf-8');
  });
}
async function restoreWorksBackup(file){
  if(!file||backupBusy)return;
  if(file.size>WORK_BACKUP_MAX_BYTES){backupStatus('備份檔超過 250 MB，請改用電腦處理',true);return}
  backupBusy=true;try{
    backupStatus('正在讀取備份並檢查作品…');
    const incoming=parseWorksBackup(await readBackupText(file));
    if(!incoming.length){backupStatus('備份檔沒有作品，不需匯入');return}
    const d=await db();
    const existing=await getAllWorksForBackup();
    const {records,renamed,skipped}=prepareBackupMerge(incoming,existing);
    if(!records.length){backupStatus(`全部 ${skipped} 張作品已存在，沒有重複匯入，也沒有修改原作品。`);return}
    if(!confirm(`將新增 ${records.length} 張作品，略過 ${skipped} 張已有作品；${renamed} 張 ID 衝突會另存。原有作品不會被覆蓋。確定繼續？`)){
      backupStatus('已取消匯入，原有作品未變動');return;
    }
    // All-or-nothing transaction; use add(), never put().
    await new Promise((resolve,reject)=>{
      const tx=d.transaction('works','readwrite'),store=tx.objectStore('works');
      try{records.forEach(w=>store.add(w))}catch(e){tx.abort();reject(e);return}
      tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error||new Error('資料庫寫入失敗'));tx.onabort=()=>reject(tx.error||new Error('容量不足，已取消整批還原'));
    });
    backupStatus(`匯入成功：新增 ${records.length} 張、略過 ${skipped} 張已有作品、${renamed} 張重新分配 ID。原作品未覆蓋。`);
    try{await renderGallery()}catch(err){console.warn('匯入完成，重新整理畫廊失敗',err);backupStatus(`資料已匯入 ${records.length} 張；畫廊未更新，請重新開啟「我的作品」。`)}
  }catch(err){console.error(err);backupStatus(`匯入失敗：${err.message}。已建立的匯入交易會自動回滾，原有作品不受影響。`,true)}
  finally{backupBusy=false;const input=$('#worksBackupFile');if(input)input.value=''}
}
function initWorksBackup(){
  $('#exportWorksBackupBtn')?.addEventListener('click',exportAllWorksBackup);
  $('#importWorksBackupBtn')?.addEventListener('click',()=>$('#worksBackupFile')?.click());
  $('#worksBackupFile')?.addEventListener('change',e=>restoreWorksBackup(e.target.files?.[0]));
}
initWorksBackup();

// V1.8.76: commit confirmation is required before removing an item from the UI.
async function deleteWork(id){
  const d=await db();
  try{await new Promise((resolve,reject)=>{
    const tx=d.transaction('works','readwrite');
    tx.objectStore('works').delete(id);
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error||new Error('刪除交易失敗'));
    tx.onabort=()=>reject(tx.error||new Error('刪除交易中止'));
  })}finally{d.close()}
}
function dataUrlToBlob(dataUrl){
  const parts=String(dataUrl).split(','),meta=parts[0]||'',raw=atob(parts[1]||''),mime=(meta.match(/data:([^;]+)/)||[])[1]||'image/png',bytes=new Uint8Array(raw.length);
  for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);
  return new Blob([bytes],{type:mime});
}
async function exportWorkImage(w){
  if(!w)return;const filename=`小小畫家_${w.title}_${w.id}.png`;
  if(isIOSLike()&&navigator.share&&typeof File!=='undefined'){
    try{const file=new File([dataUrlToBlob(w.image)],filename,{type:'image/png'});const payload={files:[file],title:'小小畫家作品'};if(!navigator.canShare||navigator.canShare(payload)){await navigator.share(payload);return}}catch(err){if(err?.name==='AbortError')return;console.warn('iOS share fallback',err)}
  }
  const a=document.createElement('a');a.href=w.image;a.download=filename;a.rel='noopener';document.body.appendChild(a);a.click();a.remove();
}
async function renderGallery(){
  let works;
  try{works=await allWorks()}
  catch(error){
    console.error('作品集讀取失敗，未清除任何既有資料',error);
    $('#emptyGallery').style.display='none';
    $('#gallerySummary').textContent='⚠️ 作品集暫時無法讀取，請勿清除網站資料或重新匯入覆蓋。原有作品不代表已消失。';
    toast('無法讀取作品資料庫，請保留原有瀏覽器資料');
    return;
  }
  $('#emptyGallery').style.display=works.length?'none':'grid';const levels=new Set(works.map(w=>w.lv));const stars=getStars();$('#gallerySummary').textContent=works.length?`已收藏 ${works.length} 張作品・挑戰 ${levels.size} 個等級・累積 ⭐ ${stars}`:'第一張作品，從今天開始收藏。';
  if($('#galleryWorksCount'))$('#galleryWorksCount').textContent=works.length;
  if($('#galleryLevelsCount'))$('#galleryLevelsCount').textContent=levels.size;
  if($('#galleryStarsCount'))$('#galleryStarsCount').textContent=stars;
  $('#galleryGrid').innerHTML=works.map(w=>`<article class="gallery-item"><div class="gallery-frame"><img src="${w.image}" alt="${w.title}"><span class="gallery-lv-badge">LV${w.lv}</span></div><div class="gallery-body"><strong>${w.title}</strong><small class="gallery-date">📅 ${new Date(w.created).toLocaleString('zh-TW')}</small>${w.traceTotal?`<small class="template-progress">🧭 描圖 ${w.traceCompleted||0}/${w.traceTotal}${w.traceRating?`・${'⭐'.repeat(w.traceRating)}${'☆'.repeat(3-w.traceRating)}`:''}</small>`:''}<div class="gallery-actions">${w.editable?.pixels?.length?`<button class="gallery-edit" data-edit="${w.id}">🖍️ 繼續編輯</button>`:''}<button class="gallery-download" data-download="${w.id}">${isIOSLike()?'📤 分享／儲存':'⬇️ 下載 PNG'}</button><button class="gallery-delete" data-delete="${w.id}">🗑️ 刪除</button></div></div></article>`).join('');
  $$('[data-edit]').forEach(b=>b.onclick=async()=>{const w=works.find(x=>x.id===+b.dataset.edit);try{await continueEditingWork(w)}catch(e){console.error(e);toast('無法還原圖層，原作品仍安全保留')}});
  $$('[data-download]').forEach(b=>b.onclick=async()=>{const w=works.find(x=>x.id===+b.dataset.download);await exportWorkImage(w)});
  $$('[data-delete]').forEach(b=>b.onclick=async()=>{
    if(!confirm('要刪除這張作品嗎？此操作不能復原，建議先匯出備份。'))return;
    b.disabled=true;
    try{await deleteWork(+b.dataset.delete);await renderGallery();toast('作品已刪除')}
    catch(err){console.error('刪除未完成',err);toast('刪除失敗，原有資料可能仍在，請重新確認作品集')}
    finally{b.disabled=false}
  });
}
function showStepFlash(){const o=$('#stepFlash');if(!o)return;o.classList.remove('show');void o.offsetWidth;o.classList.add('show');o.setAttribute('aria-hidden','false');setTimeout(()=>{o.classList.remove('show');o.setAttribute('aria-hidden','true')},900)}
function showTraceComplete(stars){$('#rewardText').textContent=`描圖完成・${'⭐'.repeat(stars)}${'☆'.repeat(3-stars)}`;const o=$('#rewardOverlay');o.querySelector('strong').textContent='描圖挑戰完成！';o.classList.add('show');o.setAttribute('aria-hidden','false');setTimeout(()=>{o.classList.remove('show');o.setAttribute('aria-hidden','true');o.querySelector('strong').textContent='完成一張！'},1500)}
function showReward(n){$('#rewardText').textContent=n===2?'作品已存到「我的作品」・得到 2 顆星！':'作品已存到「我的作品」・得到 1 顆星！';const o=$('#rewardOverlay');o.querySelector('strong').textContent='⭐ 已收藏作品！';o.classList.add('show');o.setAttribute('aria-hidden','false');setTimeout(()=>{o.classList.remove('show');o.setAttribute('aria-hidden','true');o.querySelector('strong').textContent='完成一張！'},1700)}

function sampleImageForTemplate(id){return simpleColorGuideSrc(id)||STYLE_BOARD}
function openSampleModal(src,title){
  $('#sampleModalTitle').textContent=title||'教材樣板圖';
  $('#sampleModalImg').src=src;
  $('#sampleModal').classList.add('open');
  $('#sampleModal').setAttribute('aria-hidden','false');
}
function closeSampleModal(){
  $('#sampleModal').classList.remove('open');
  $('#sampleModal').setAttribute('aria-hidden','true');
}
function updateSampleReference(){
  const block=$('#sampleRefBlock');
  if(!block||!state.current)return;
  const src=simpleColorGuideSrc(state.current.id);
  if(src){
    $('#sampleRefImg').src=src;
    $('#sampleRefImg').alt=`${state.current.zh} 樣板參考圖`;
    const title=document.querySelector('#sampleRefBlock .practice-title');
    if(title) title.textContent=state.guideStyle==='outline'?'🖼️ 彩色圖案參考':'🖼️ 彩色圖案樣板';
    block.hidden=false;
  }else{
    const title=document.querySelector('#sampleRefBlock .practice-title');
    if(title) title.textContent='🖼️ 樣板參考';
    block.hidden=true;
  }
}

async function openParent(){
  let works=[];
  try{works=await allWorks()}
  catch(error){console.error('家長頁讀取作品失敗',error);toast('作品統計暫時無法讀取，請勿清除瀏覽器資料');return;}
  $('#parentWorks').textContent=works.length;
  $('#parentLevels').textContent=new Set(works.map(w=>w.lv)).size;
  updateStarUI();
  $('#palmRejectToggle').checked=settings.palmReject;
  $('#pressureToggle').checked=settings.pressure;
  const pcs=$('#pressureCurveSelect');if(pcs)pcs.value=settings.pressureCurve||'normal';
  $('#rewardSoundToggle').checked=settings.rewardSound;
  $('#completionFxToggle').checked=settings.completionFx;
  $('#parentModal').classList.add('open');
  $('#parentModal').setAttribute('aria-hidden','false');
}
function closeParent(){$('#parentModal').classList.remove('open');$('#parentModal').setAttribute('aria-hidden','true')}
function bindSetting(id,key){const el=$(id);if(!el)return;el.onchange=e=>{settings[key]=e.target.checked;saveSettings();if(key==='pressure')$('#penHint').style.display=settings.pressure?'':'none'}}
bindSetting('#palmRejectToggle','palmReject');bindSetting('#pressureToggle','pressure');bindSetting('#rewardSoundToggle','rewardSound');bindSetting('#completionFxToggle','completionFx');
const pressureCurveSelect=$('#pressureCurveSelect');if(pressureCurveSelect)pressureCurveSelect.onchange=e=>{settings.pressureCurve=e.target.value;saveSettings();toast(`Apple Pencil 筆壓：${e.target.options[e.target.selectedIndex].text}`)};

function updateTraceButton(){}
const _traceBtn=$('#traceAssistBtn'); if(_traceBtn){ _traceBtn.onclick=()=>{}; _traceBtn.hidden=true; _traceBtn.disabled=true; }
['#prevTraceStepBtn','#nextTraceStepBtn','#speakTraceStepBtn','#checkTraceStepBtn'].forEach(sel=>{const el=$(sel); if(el) el.onclick=()=>{};});
let lastVisibleGuideOpacity=normalizeGuideOpacity(settings.guideOpacity)||.15;
$('#toggleGuideBtn').onclick=async()=>{
  if(state.guideOpacity>0){lastVisibleGuideOpacity=state.guideOpacity;await setGuideOpacity(0);}
  else{await setGuideOpacity(lastVisibleGuideOpacity||.15);}
};
const guideOpacityRange=$('#guideOpacityRange');
if(guideOpacityRange){
  guideOpacityRange.value='15';
  guideOpacityRange.oninput=e=>{const next=Number(e.target.value)/100;if(next>0)lastVisibleGuideOpacity=next;setGuideOpacity(next,{persist:true,redraw:true});};
}
$$('.guide-style-btn').forEach(btn=>btn.onclick=()=>setGuideStyle(btn.dataset.guideStyle));
$('#resetFilterBtn').onclick=()=>{state.level=null;state.levelRange=null;state.category=null;renderHome()};
// V1.8.22: use delegated controls so replacing the template cards doesn't lose input focus.
const categorySearchInput=$('#categorySearchInput');
if(categorySearchInput)categorySearchInput.addEventListener('input',()=>{
  categorySearchTerm=categorySearchInput.value;renderCategoryPage(state.category);
});
const categorySearchClear=$('#categorySearchClear');
if(categorySearchClear)categorySearchClear.addEventListener('click',()=>{
  categorySearchTerm='';if(categorySearchInput){categorySearchInput.value='';categorySearchInput.focus();}
  renderCategoryPage(state.category);
});
$$('[data-progress-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  categoryProgressFilter=btn.dataset.progressFilter;renderCategoryPage(state.category);
}));
$('#backFromCategoryBtn').onclick=()=>{drawEntry=null;state.category=null;state.categoryPageLevel=null;renderHome();showView('#homeView')};
$('#categoryClearLevelBtn').onclick=()=>{state.categoryPageLevel=null;renderCategoryPage()};
const categoryRandomBtn=$('#categoryRandomBtn');if(categoryRandomBtn)categoryRandomBtn.onclick=()=>{drawEntry=null;openRandomTemplate({fromHome:true})};

const homeRandomBtn=$('#homeRandomBtn');if(homeRandomBtn)homeRandomBtn.onclick=()=>{drawEntry=null;openRandomTemplate({fromHome:true})};
$('#openStyleBoardBtn').onclick=()=>openSampleModal(STYLE_BOARD,'200 張彩色教材總覽');
$('#openStyleBoardFromDrawBtn').onclick=()=>openSampleModal(STYLE_BOARD,'200 張彩色教材總覽');
$('#openCurrentSampleBtn').onclick=()=>state.current&&openSampleModal(sampleImageForTemplate(state.current.id),`${state.current.zh} 樣板參考圖`);
$('#closeSampleBtn').onclick=closeSampleModal;
$('#sampleModal').onclick=e=>{if(e.target===$('#sampleModal'))closeSampleModal()};
$('#homeBtn').onclick=()=>{drawEntry=null;exitDrawFullscreen();resetActivePointerSession();state.category=null;state.categoryPageLevel=null;renderHome();showView('#homeView')};
$('#galleryBtn').onclick=async()=>{exitDrawFullscreen();resetActivePointerSession();showView('#galleryView');await renderGallery()};
$('#starBadge').onclick=async()=>{showView('#galleryView');await renderGallery()};
$('#backFromGalleryBtn').onclick=()=>{exitDrawFullscreen();state.category=null;state.categoryPageLevel=null;renderHome();showView('#homeView')};
$('#clearBtn').onclick=()=>{if(confirm(`要清除「${LAYER_NAMES[state.activeLayer]}」層的內容嗎？`))clearLayer()};
const drawFullscreenBtn=$('#drawFullscreenBtn');
const backToPickerBtn=$('#backToPickerBtn');if(backToPickerBtn)backToPickerBtn.onclick=returnToPicker;
const prevTemplateBtn=$('#prevTemplateBtn');if(prevTemplateBtn)prevTemplateBtn.onclick=()=>openAdjacentTemplate(-1);
const nextTemplateBtn=$('#nextTemplateBtn');if(nextTemplateBtn)nextTemplateBtn.onclick=()=>openAdjacentTemplate(1);
const focusPrevTemplateBtn=$('#focusPrevTemplateBtn');if(focusPrevTemplateBtn)bindReliableTap(focusPrevTemplateBtn,()=>openAdjacentTemplate(-1));
const focusNextTemplateBtn=$('#focusNextTemplateBtn');if(focusNextTemplateBtn)bindReliableTap(focusNextTemplateBtn,()=>openAdjacentTemplate(1));
const randomTemplateBtn=$('#randomTemplateBtn');if(randomTemplateBtn)randomTemplateBtn.onclick=()=>openRandomTemplate();
$('#undoBtn').onclick=()=>restoreHistory(state.historyIndex-1);$('#redoBtn').onclick=()=>restoreHistory(state.historyIndex+1);$('#saveBtn').onclick=saveWork;
$('#speakEnBtn').onclick=()=>state.current&&speak(state.current.en,'en-US',.78,{volume:1,pitch:1.02});$('#speakEnSlowBtn').onclick=()=>state.current&&speak(state.current.en,'en-US',.52,{volume:1,pitch:1.02});$('#speakZhBtn').onclick=()=>state.current&&speak(state.current.zh,'zh-TW',.68,{volume:1,pitch:.96});$('#speakZhCharBtn').onclick=()=>state.current&&speakChineseChars(state.current.zh);
$('#practiceClearBtn').onclick=()=>clearCanvasPixels(practiceCanvas,pctx);
$('#practiceGuideBtn').onclick=()=>{state.practiceStage=(state.practiceStage+1)%3;$('#practiceGuideBtn').textContent=['描字 → 仿寫','仿寫 → 空白','空白 → 描字'][state.practiceStage];clearCanvasPixels(practiceCanvas,pctx);clearCanvasPixels(practiceGuide,pgctx);drawPracticeGuide()};
const addLayerBtn=$('#addLayerBtn');if(addLayerBtn)addLayerBtn.onclick=addCustomLayer;const layerDuplicateBtn=$('#layerDuplicateBtn');if(layerDuplicateBtn)layerDuplicateBtn.onclick=duplicateActiveLayer;const layerEyeBtn=$('#layerEyeBtn');if(layerEyeBtn)layerEyeBtn.onclick=toggleActiveLayerVisibility;const layerLockBtn=$('#layerLockBtn');if(layerLockBtn)layerLockBtn.onclick=toggleActiveLayerLock;const layerRenameBtn=$('#layerRenameBtn');if(layerRenameBtn)layerRenameBtn.onclick=renameActiveLayer;const layerDeleteBtn=$('#layerDeleteBtn');if(layerDeleteBtn)layerDeleteBtn.onclick=deleteActiveLayer;const layerMoveUpBtn=$('#layerMoveUpBtn');if(layerMoveUpBtn)layerMoveUpBtn.onclick=()=>moveActiveLayer(-1);const layerMoveDownBtn=$('#layerMoveDownBtn');if(layerMoveDownBtn)layerMoveDownBtn.onclick=()=>moveActiveLayer(1);
$$('.tool-btn').forEach(b=>b.onclick=()=>setTool(b.dataset.tool));
$$('.size-btn').forEach(b=>b.onclick=()=>{$$('.size-btn').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.size=+b.dataset.size;if(state.tool==='eraser'){updateEraserCursorSize();showEraserCursorPreview()}});
const brushOpacityInput=$('#brushOpacityInput');if(brushOpacityInput){brushOpacityInput.oninput=e=>{state.opacity=clamp((+e.target.value||100)/100,.15,1);const out=$('#brushOpacityValue');if(out)out.textContent=`${Math.round(state.opacity*100)}%`};}
$$('.practice-tabs .seg').forEach(b=>b.onclick=()=>{
  if(state.practiceMode===b.dataset.practice)return;
  $$('.practice-tabs .seg').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  state.practiceMode=b.dataset.practice;state.practiceStage=0;
  $('#practiceGuideBtn').textContent='描字 → 仿寫';
  clearCanvasPixels(practiceCanvas,pctx);clearCanvasPixels(practiceGuide,pgctx);drawPracticeGuide();renderPracticePronunciationBar();
});
function selectColor(color){
  state.color=color;
  $$('.color-chip[data-color]').forEach(x=>x.classList.toggle('active',String(x.dataset.color||'').toLowerCase()===String(color).toLowerCase()));
  const sw=$('#currentColorSwatch');if(sw)sw.style.background=color;
  if(state.tool==='eraser')setTool('pencil')
}
let colorWheelHSV={h:0,s:0,v:1},colorWheelDragging=false,colorWheelPointerId=null;
let colorWheelSelectedHex='#222222',colorWheelPointerPos={x:50,y:50};
function clamp01(n){return Math.max(0,Math.min(1,Number(n)||0))}
function hsvToHex(h,s,v){
  h=((Number(h)%360)+360)%360;s=clamp01(s);v=clamp01(v);const c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c;let r=0,g=0,b=0;
  if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}
  const hx=n=>Math.round((n+m)*255).toString(16).padStart(2,'0');return `#${hx(r)}${hx(g)}${hx(b)}`
}
function hexToHsv(hex){
  const m=String(hex||'').trim().match(/^#([0-9a-f]{6})$/i);if(!m)return {h:0,s:0,v:1};const n=parseInt(m[1],16),r=((n>>16)&255)/255,g=((n>>8)&255)/255,b=(n&255)/255,max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min;let h=0;
  if(d){if(max===r)h=60*(((g-b)/d)%6);else if(max===g)h=60*((b-r)/d+2);else h=60*((r-g)/d+4)}if(h<0)h+=360;return {h,s:max?d/max:0,v:max}
}
function rgbBytesToHex(r,g,b){return `#${[r,g,b].map(n=>Math.max(0,Math.min(255,Math.round(n))).toString(16).padStart(2,'0')).join('')}`}
function drawColorWheel(){
  const canvas=$('#colorWheelCanvas');if(!canvas)return;const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height,cx=w/2,cy=h/2,R=Math.min(w,h)/2-2,img=ctx.createImageData(w,h),d=img.data;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const dx=x-cx,dy=y-cy,r=Math.hypot(dx,dy),i=(y*w+x)*4;if(r>R){d[i+3]=0;continue}let hue=Math.atan2(dy,dx)*180/Math.PI;if(hue<0)hue+=360;const sat=Math.min(1,r/R),hex=hsvToHex(hue,sat,1),rgb=parseInt(hex.slice(1),16);d[i]=(rgb>>16)&255;d[i+1]=(rgb>>8)&255;d[i+2]=rgb&255;d[i+3]=255}ctx.putImageData(img,0,0)
}
function updateColorWheelPointer(){
  const p=$('#colorWheelPointer');if(p){p.style.left=`${colorWheelPointerPos.x}%`;p.style.top=`${colorWheelPointerPos.y}%`}const hex=colorWheelSelectedHex||state.color||'#222222',preview=$('#colorWheelPreview'),code=$('#colorWheelHex');if(preview)preview.style.background=hex;if(code)code.textContent=String(hex).toUpperCase()
}
function setWheelPointerFromHex(hex){
  colorWheelHSV=hexToHsv(hex);const a=colorWheelHSV.h*Math.PI/180,r=colorWheelHSV.s*47;colorWheelPointerPos={x:50+Math.cos(a)*r,y:50+Math.sin(a)*r};colorWheelSelectedHex=normalizeHexColor(hex)||'#222222';updateColorWheelPointer()
}
function sampleWheelAtClient(clientX,clientY){
  const canvas=$('#colorWheelCanvas');if(!canvas)return null;const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return null;
  const sx=canvas.width/rect.width,sy=canvas.height/rect.height,cx=canvas.width/2,cy=canvas.height/2,R=Math.min(canvas.width,canvas.height)/2-2;
  let px=(clientX-rect.left)*sx,py=(clientY-rect.top)*sy,dx=px-cx,dy=py-cy,dist=Math.hypot(dx,dy);
  if(dist>R&&dist>0){const k=R/dist;px=cx+dx*k;py=cy+dy*k;dx=px-cx;dy=py-cy;dist=R}
  const ix=Math.max(0,Math.min(canvas.width-1,Math.round(px))),iy=Math.max(0,Math.min(canvas.height-1,Math.round(py)));
  const data=canvas.getContext('2d',{willReadFrequently:true}).getImageData(ix,iy,1,1).data;if(data[3]===0)return null;
  let h=Math.atan2(dy,dx)*180/Math.PI;if(h<0)h+=360;colorWheelHSV={h,s:Math.min(1,dist/R),v:1};
  return {hex:rgbBytesToHex(data[0],data[1],data[2]),x:px/canvas.width*100,y:py/canvas.height*100}
}
function setWheelFromPoint(e){
  const sampled=sampleWheelAtClient(e.clientX,e.clientY);if(!sampled)return;colorWheelSelectedHex=sampled.hex;colorWheelPointerPos={x:sampled.x,y:sampled.y};updateColorWheelPointer();selectColor(sampled.hex)
}
function openColorWheel(){
  const overlay=$('#colorWheelPopover');if(!overlay)return;
  const host=(drawFocusMode&&fullscreenShell?.isConnected)?fullscreenShell:document.body;
  if(overlay.parentElement!==host)host.appendChild(overlay);
  colorWheelSelectedHex=normalizeHexColor(state.color)||'#222222';setWheelPointerFromHex(colorWheelSelectedHex);
  overlay.hidden=false;overlay.removeAttribute('hidden');overlay.classList.add('is-open');overlay.setAttribute('aria-hidden','false');
  document.body.classList.add('color-wheel-open');
  overlay.style.display='grid';overlay.style.visibility='visible';overlay.style.opacity='1';overlay.style.pointerEvents='auto';
  requestAnimationFrame(()=>requestAnimationFrame(()=>{drawColorWheel();updateColorWheelPointer();$('#colorWheelCanvas')?.focus?.()}));
}
function closeColorWheel(apply=false){
  if(apply)selectColor(colorWheelSelectedHex);
  colorWheelDragging=false;colorWheelPointerId=null;const overlay=$('#colorWheelPopover');
  if(overlay){overlay.classList.remove('is-open');overlay.hidden=true;overlay.setAttribute('hidden','');overlay.setAttribute('aria-hidden','true');overlay.style.removeProperty('display');overlay.style.removeProperty('visibility');overlay.style.removeProperty('opacity');overlay.style.removeProperty('pointer-events');if(overlay.parentElement!==document.body)document.body.appendChild(overlay)}
  document.body.classList.remove('color-wheel-open');
}
function setupColorWheel(){
  const canvas=$('#colorWheelCanvas');if(!canvas)return;
  const setFromPointer=e=>{e.preventDefault();setWheelFromPoint(e)};
  canvas.addEventListener('pointerdown',e=>{if(colorWheelPointerId!==null)return;e.preventDefault();e.stopPropagation();colorWheelDragging=true;colorWheelPointerId=e.pointerId;try{canvas.setPointerCapture(e.pointerId)}catch{};setWheelFromPoint(e)},{passive:false});
  canvas.addEventListener('pointermove',e=>{if(!colorWheelDragging||colorWheelPointerId!==e.pointerId)return;e.preventDefault();setWheelFromPoint(e)},{passive:false});
  const end=e=>{if(colorWheelPointerId!==e.pointerId)return;colorWheelDragging=false;try{canvas.releasePointerCapture?.(e.pointerId)}catch{};colorWheelPointerId=null};
  canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);canvas.addEventListener('lostpointercapture',end);
  if(!window.PointerEvent){
    const touchPoint=e=>{const t=e.touches?.[0]||e.changedTouches?.[0];if(!t)return;setWheelFromPoint({clientX:t.clientX,clientY:t.clientY})};
    canvas.addEventListener('touchstart',e=>{e.preventDefault();colorWheelDragging=true;touchPoint(e)},{passive:false});
    canvas.addEventListener('touchmove',e=>{if(!colorWheelDragging)return;e.preventDefault();touchPoint(e)},{passive:false});
    canvas.addEventListener('touchend',()=>{colorWheelDragging=false},{passive:false});
  }
  const legacyOpen=$('#openColorWheelBtn');if(legacyOpen)bindReliableTap(legacyOpen,()=>openColorWheel());
  bindReliableTap($('#closeColorWheelBtn'),()=>closeColorWheel(false));
  bindReliableTap($('#confirmColorWheelBtn'),()=>closeColorWheel(true));
  bindReliableTap($('#saveWheelColorBtn'),()=>{addQuickColor(colorWheelSelectedHex,{select:true,notify:true});closeColorWheel(false)});
  const saveCurrent=$('#saveCurrentColorBtn');if(saveCurrent)bindReliableTap(saveCurrent,()=>addQuickColor(state.color,{select:true,notify:true}));
  const clearCustom=$('#clearCustomColorsBtn');if(clearCustom)bindReliableTap(clearCustom,()=>clearCustomColors());
  const overlay=$('#colorWheelPopover');if(overlay)overlay.addEventListener('pointerdown',e=>{if(e.target===overlay){e.preventDefault();closeColorWheel(false)}},{passive:false});
}

let drawFocusMode=false,focusPaletteRestore=false,focusLearningPane='draw';
let fullscreenShell=null,fullscreenAnchors=new Map();
const focusPronunciationPanel=()=>$('#learnPronunciationPanel');
const focusPracticePanel=()=>$('#learnPracticePanel');
function updateFocusCurrentLabel(){
  const item=state.current;if(!item)return;
  const emoji=$('#focusCurrentEmoji'),word=$('#focusCurrentWord');
  if(emoji)emoji.textContent=item.emoji||'🎨';
  if(word)word.textContent=`${item.zh}・${String(item.en||'').toUpperCase()}`;
}
function moveLearningPanelsToFocus(){
  const host=$('#focusLearningHost');if(!host)return;
  const practice=focusPracticePanel();
  if(practice&&practice.parentElement!==host)host.appendChild(practice);
}
function restoreLearningPanels(){
  const card=$('#learnCard');if(!card)return;
  const sample=$('#learnSamplePanel'),pron=focusPronunciationPanel(),practice=focusPracticePanel();
  if(pron&&pron.parentElement!==card)card.insertBefore(pron,sample||card.firstChild);
  if(practice&&practice.parentElement!==card)card.appendChild(practice);
  if(pron)pron.hidden=false;if(practice)practice.hidden=false;
}
function rememberFullscreenNode(node,key){
  if(!node||fullscreenAnchors.has(key))return;
  const anchor=document.createComment(`fullscreen-${key}-anchor`);
  node.parentNode?.insertBefore(anchor,node);fullscreenAnchors.set(key,anchor);
}
function restoreFullscreenNode(node,key){
  const anchor=fullscreenAnchors.get(key);if(!node||!anchor)return;
  anchor.parentNode?.insertBefore(node,anchor);anchor.remove();fullscreenAnchors.delete(key);
}
function updateFullscreenViewportBox(){
  const shell=$('#drawFullscreenShell');if(!shell)return;
  const vv=window.visualViewport;
  const w=Math.max(320,Math.round(vv?.width||window.innerWidth||document.documentElement.clientWidth||320));
  const h=Math.max(320,Math.round(vv?.height||window.innerHeight||document.documentElement.clientHeight||320));
  const left=Math.round(vv?.offsetLeft||0),top=Math.round(vv?.offsetTop||0);
  shell.style.setProperty('--focus-vw',`${w}px`);shell.style.setProperty('--focus-vh',`${h}px`);
  shell.style.width=`${w}px`;shell.style.height=`${h}px`;shell.style.left=`${left}px`;shell.style.top=`${top}px`;
}
function createFullscreenShell(){
  if(fullscreenShell?.isConnected)return fullscreenShell;
  const shell=document.createElement('div');shell.id='drawFullscreenShell';shell.className='draw-fullscreen-shell focus-pane-draw';shell.setAttribute('role','dialog');shell.setAttribute('aria-modal','true');shell.setAttribute('aria-label','全螢幕畫板');
  shell.innerHTML='<div id="drawFullscreenTop" class="draw-fullscreen-top"></div><div id="drawFullscreenMain" class="draw-fullscreen-main"></div><div id="drawFullscreenBottom" class="draw-fullscreen-bottom"></div><aside id="fullscreenLayerDock" class="fullscreen-layer-dock collapsed" aria-label="全螢幕圖層管理"><button id="fullscreenLayerToggle" class="fullscreen-layer-toggle" type="button" aria-expanded="false">🧩<span>圖層</span></button><div class="fullscreen-layer-body"><div class="fullscreen-layer-head"><div><strong>圖層管理</strong><small id="fullscreenLayerHint">拖曳圖層可調整順序；列表最上方會顯示在最前面。</small></div><button id="fullscreenAddLayerBtn" class="layer-add-btn" type="button">＋ 新增</button></div><div id="fullscreenLayerCards" class="fullscreen-layer-cards" aria-label="全螢幕圖層縮圖列表"></div><div class="fullscreen-layer-actions"><strong id="fullscreenActiveLayerName">✏️ 描線</strong><div class="fullscreen-layer-action-grid"><button id="fullscreenLayerEyeBtn" class="layer-mini-btn" type="button">👁️ 顯示</button><button id="fullscreenLayerLockBtn" class="layer-mini-btn" type="button">🔓 未鎖定</button><button id="fullscreenLayerRenameBtn" class="layer-mini-btn" type="button">✏️ 名稱</button><button id="fullscreenLayerMoveUpBtn" class="layer-mini-btn" type="button">↑ 上層</button><button id="fullscreenLayerMoveDownBtn" class="layer-mini-btn" type="button">↓ 下層</button><button id="fullscreenLayerDuplicateBtn" class="layer-mini-btn" type="button">📄 複製</button><button id="fullscreenLayerDeleteBtn" class="layer-mini-btn danger" type="button">🗑️ 刪除</button></div><label class="layer-opacity-control" for="fullscreenLayerOpacityRange"><span>透明度 <b id="fullscreenLayerOpacityValue">100%</b></span><input id="fullscreenLayerOpacityRange" type="range" min="10" max="100" step="5" value="100"></label></div></div></aside>';
  document.body.appendChild(shell);fullscreenShell=shell;updateFullscreenViewportBox();bindReliableTap($('#fullscreenLayerToggle'),()=>setFullscreenLayerCollapsed(!$('#fullscreenLayerDock')?.classList.contains('collapsed')));bindReliableTap($('#fullscreenAddLayerBtn'),()=>addCustomLayer());bindReliableTap($('#fullscreenLayerEyeBtn'),()=>toggleActiveLayerVisibility());bindReliableTap($('#fullscreenLayerLockBtn'),()=>toggleActiveLayerLock());bindReliableTap($('#fullscreenLayerRenameBtn'),()=>renameActiveLayer());bindReliableTap($('#fullscreenLayerMoveUpBtn'),()=>moveActiveLayer(-1));bindReliableTap($('#fullscreenLayerMoveDownBtn'),()=>moveActiveLayer(1));bindReliableTap($('#fullscreenLayerDuplicateBtn'),()=>duplicateActiveLayer());bindReliableTap($('#fullscreenLayerDeleteBtn'),()=>deleteActiveLayer());bindLayerOpacityControls();return shell;
}
function mountFullscreenWorkspace(){
  const shell=createFullscreenShell(),top=$('#drawFullscreenTop'),main=$('#drawFullscreenMain'),bottom=$('#drawFullscreenBottom');
  const bar=$('#focusLearningBar'),panel=$('#focusLearningPanel'),stage=$('.workspace-card .canvas-stage'),toolbar=$('.workspace-card .toolbar');
  if(!top||!main||!bottom||!bar||!panel||!stage||!toolbar)throw new Error('fullscreen workspace nodes missing');
  rememberFullscreenNode(bar,'bar');rememberFullscreenNode(panel,'panel');rememberFullscreenNode(stage,'stage');rememberFullscreenNode(toolbar,'toolbar');
  top.appendChild(bar);main.appendChild(stage);main.appendChild(panel);bottom.appendChild(toolbar);
  bar.hidden=false;panel.hidden=true;moveLearningPanelsToFocus();
}
function unmountFullscreenWorkspace(){
  const bar=$('#focusLearningBar'),panel=$('#focusLearningPanel'),stage=$('#drawFullscreenShell .canvas-stage'),toolbar=$('#drawFullscreenShell .toolbar');
  restoreLearningPanels();
  if(bar)bar.hidden=true;if(panel)panel.hidden=true;
  restoreFullscreenNode(bar,'bar');restoreFullscreenNode(panel,'panel');restoreFullscreenNode(stage,'stage');restoreFullscreenNode(toolbar,'toolbar');
  fullscreenAnchors.forEach(a=>a?.remove());fullscreenAnchors.clear();
  fullscreenShell?.remove();fullscreenShell=null;
}
function clearFullscreenCanvasBox(){
  const wrap=$('#canvasWrap');if(!wrap)return;
  wrap.style.removeProperty('width');wrap.style.removeProperty('height');wrap.style.removeProperty('max-width');wrap.style.removeProperty('max-height');wrap.style.removeProperty('aspect-ratio');
}
function setFullscreenBrushControlsCollapsed(collapsed=true){
  const shell=$('#drawFullscreenShell'),btn=$('#fullscreenBrushToggle');
  if(shell)shell.classList.toggle('brush-controls-collapsed',!!collapsed);
  if(btn){btn.setAttribute('aria-expanded',String(!collapsed));btn.textContent=collapsed?'🖌️ 筆觸':'✕ 收合筆觸'}
}
function setFullscreenLayerCollapsed(collapsed=true){
  const dock=$('#fullscreenLayerDock'),btn=$('#fullscreenLayerToggle');
  if(!dock||!btn)return;
  dock.classList.toggle('collapsed',!!collapsed);
  btn.setAttribute('aria-expanded',String(!collapsed));
  btn.innerHTML=collapsed?'🧩<span>圖層</span>':'🧩<span>收合</span>';
}
function fitFullscreenCanvasBox(){
  if(!drawFocusMode||focusLearningPane!=='draw')return false;
  const shell=$('#drawFullscreenShell'),host=$('#drawFullscreenMain'),stage=$('#drawFullscreenShell .canvas-stage'),wrap=$('#canvasWrap');
  if(!shell||!host||!stage||!wrap)return false;
  updateFullscreenViewportBox();
  const r=host.getBoundingClientRect();
  if(r.width<2||r.height<2)return false;
  wrap.style.setProperty('width','100%','important');
  wrap.style.setProperty('height','100%','important');
  wrap.style.setProperty('max-width','none','important');
  wrap.style.setProperty('max-height','none','important');
  wrap.style.setProperty('aspect-ratio','auto','important');
  return true;
}
async function setFocusLearningPane(pane='draw'){
  if(!['draw','practice'].includes(pane))pane='draw';
  focusLearningPane=pane;
  const shell=$('#drawFullscreenShell'),panel=$('#focusLearningPanel'),practice=focusPracticePanel();
  shell?.classList.toggle('focus-pane-practice',pane==='practice');
  shell?.classList.toggle('focus-pane-draw',pane==='draw');
  shell?.classList.remove('focus-pane-speech');
  $$('.focus-mode-btn').forEach(b=>{const active=b.dataset.focusPane===pane;b.classList.toggle('active',active);b.setAttribute('aria-selected',String(active))});
  if(panel)panel.hidden=pane==='draw';if(practice)practice.hidden=pane!=='practice';
  updateFocusCurrentLabel();renderPracticePronunciationBar();
  await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
  if(pane==='practice'){
    // 寫字模式沿用同一套畫具、顏色、筆觸；預設收合，避免遮住練習字。
    setPaletteCollapsed(true,false);setFullscreenBrushControlsCollapsed(true);
    state.practiceCanvasSize=null;
    await resizePracticeCanvases(true);drawPracticeGuide();
  }else{
    fitFullscreenCanvasBox();await new Promise(r=>requestAnimationFrame(r));state.mainCanvasSize=null;await resizeMainCanvases(true);showEraserCursorPreview();
  }
}
async function setDrawFullscreen(on){
  const btn=$('#drawFullscreenBtn');on=!!on;if(on===drawFocusMode)return;resetActivePointerSession();
  try{
    if(on){
      focusPaletteRestore=state.paletteCollapsed;setPaletteCollapsed(true,false);drawFocusMode=true;focusLearningPane='draw';document.body.classList.add('draw-focus-mode');
      mountFullscreenWorkspace();updateFocusCurrentLabel();setFullscreenBrushControlsCollapsed(true);setFullscreenLayerCollapsed(true);if(btn){btn.setAttribute('aria-pressed','true');btn.textContent='✕ 離開全螢幕'}
      await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));fitFullscreenCanvasBox();state.mainCanvasSize=null;await resizeMainCanvases(true);showEraserCursorPreview();
    }else{
      drawFocusMode=false;clearFullscreenCanvasBox();document.body.classList.remove('draw-focus-mode');focusLearningPane='draw';unmountFullscreenWorkspace();setPaletteCollapsed(focusPaletteRestore,false);
      if(btn){btn.setAttribute('aria-pressed','false');btn.textContent='⛶ 全螢幕畫板'}
      state.mainCanvasSize=null;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));await resizeMainCanvases(true);await resizePracticeCanvases(true);drawPracticeGuide();showEraserCursorPreview();
    }
  }catch(err){
    console.error('fullscreen drawing mode failed',err);toast('全螢幕畫板載入失敗，請再試一次');
    drawFocusMode=false;clearFullscreenCanvasBox();document.body.classList.remove('draw-focus-mode');try{unmountFullscreenWorkspace()}catch{};setPaletteCollapsed(focusPaletteRestore,false);if(btn){btn.setAttribute('aria-pressed','false');btn.textContent='⛶ 全螢幕畫板'}
  }
}
function exitDrawFullscreen(){if(drawFocusMode)setDrawFullscreen(false)}
function bindDrawFullscreenButton(){
  const btn=$('#drawFullscreenBtn');if(!btn)return;btn.style.touchAction='manipulation';btn.addEventListener('click',e=>{e.preventDefault();setDrawFullscreen(!drawFocusMode)});
  const exit=$('#focusExitBtn');if(exit){exit.style.touchAction='manipulation';exit.addEventListener('click',e=>{e.preventDefault();exitDrawFullscreen()})}
}
function addQuickColor(color,{select=true,notify=true}={}){
  const hex=normalizeHexColor(color);if(!hex)return false;
  if(COLORS.includes(hex)){if(select)selectColor(hex);if(notify)toast('這個顏色已在固定顏色中');return false}
  customColors=customColors.filter(c=>c!==hex);customColors.unshift(hex);
  if(customColors.length>MAX_CUSTOM_COLORS)customColors=customColors.slice(0,MAX_CUSTOM_COLORS);
  persistCustomColors();if(select)state.color=hex;renderPalette();if(notify)toast('已加入我的顏色');return true
}
function clearCustomColors(){
  customColors=[];persistCustomColors();renderPalette();toast('已清除自訂顏色');
}
function bindReliableTap(el,handler){
  if(!el||el.dataset.tapBound==='1')return;
  el.dataset.tapBound='1';let lastPointerAt=0;
  el.addEventListener('pointerup',e=>{
    if(e.pointerType==='touch'||e.pointerType==='pen'){
      lastPointerAt=Date.now();e.preventDefault();e.stopPropagation();handler(e);
    }
  },{passive:false});
  el.addEventListener('click',e=>{
    if(Date.now()-lastPointerAt<650)return;
    e.preventDefault();e.stopPropagation();handler(e);
  });
}
function renderPalette(){
  const fixed=$('#colorRow'),custom=$('#customColorRow'),section=$('#customColorSection');
  if(fixed)fixed.innerHTML=COLORS.map(c=>`<button class="color-chip ${c===state.color?'active':''}" data-color="${c}" style="background:${c}" aria-label="選擇固定顏色 ${c}"></button>`).join('')+`<button id="addColorChipBtn" class="color-chip add-color-chip" type="button" aria-label="新增自訂顏色"><span>＋</span></button>`;
  if(custom)custom.innerHTML=customColors.map(c=>`<button class="color-chip custom-color-chip ${c===state.color?'active':''}" data-color="${c}" style="background:${c}" aria-label="選擇我的顏色 ${c}"></button>`).join('');
  if(section)section.hidden=!customColors.length;
  $$('.color-chip[data-color]').forEach(b=>b.onclick=()=>selectColor(b.dataset.color));
  bindReliableTap($('#addColorChipBtn'),()=>openColorWheel());
  const sw=$('#currentColorSwatch');if(sw)sw.style.background=state.color;
  $$('.color-chip[data-color]').forEach(x=>x.classList.toggle('active',String(x.dataset.color||'').toLowerCase()===String(state.color).toLowerCase()));
}
function defaultPaletteCollapsed(){const saved=localStorage.getItem(STORAGE_PALETTE_COLLAPSED);if(saved!==null)return saved==='1';return matchMedia('(max-width:650px)').matches}
function setPaletteCollapsed(collapsed,persist=true){
  state.paletteCollapsed=!!collapsed;const dock=$('#paletteDock'),btn=$('#paletteToggleBtn');dock.classList.toggle('collapsed',state.paletteCollapsed);btn.setAttribute('aria-expanded',String(!state.paletteCollapsed));btn.innerHTML=state.paletteCollapsed?'<img class="ui-crayon-icon" src="./assets/ui/crayon-icons/palette.svg" alt=""><span>展開</span>':'<img class="ui-crayon-icon" src="./assets/ui/crayon-icons/palette.svg" alt=""><span>收合</span>';if(persist)localStorage.setItem(STORAGE_PALETTE_COLLAPSED,state.paletteCollapsed?'1':'0');
}
renderPalette();setupColorWheel();state.paletteCollapsed=defaultPaletteCollapsed();setPaletteCollapsed(state.paletteCollapsed,false);$('#paletteToggleBtn').onclick=()=>{const opening=state.paletteCollapsed;if(opening&&matchMedia('(max-width:650px)').matches)$$('.compact-tool-panel').forEach(p=>p.open=false);setPaletteCollapsed(!state.paletteCollapsed);setTimeout(()=>{if($('#drawView').classList.contains('active'))resizeMainCanvases(true)},190)};
$$('.focus-mode-btn').forEach(b=>b.addEventListener('click',()=>{if(drawFocusMode)setFocusLearningPane(b.dataset.focusPane)}));
bindDrawFullscreenButton();
const fullscreenBrushToggle=$('#fullscreenBrushToggle');if(fullscreenBrushToggle)fullscreenBrushToggle.addEventListener('click',e=>{e.preventDefault();const shell=$('#drawFullscreenShell');if(!shell)return;setFullscreenBrushControlsCollapsed(!shell.classList.contains('brush-controls-collapsed'))});
$$('.compact-tool-panel').forEach(panel=>panel.addEventListener('toggle',()=>{if(panel.open){$$('.compact-tool-panel').forEach(other=>{if(other!==panel)other.open=false});if(matchMedia('(max-width:650px)').matches&&!state.paletteCollapsed)setPaletteCollapsed(true)}}));

let holdTimer=null;const parentBtn=$('#parentBtn');const beginHold=e=>{e.preventDefault();clearTimeout(holdTimer);holdTimer=setTimeout(()=>openParent(),1200)};const endHold=()=>clearTimeout(holdTimer);parentBtn.addEventListener('pointerdown',beginHold);['pointerup','pointercancel','pointerleave'].forEach(ev=>parentBtn.addEventListener(ev,endHold));
$('#closeParentBtn').onclick=closeParent;$('#closeParentBottomBtn').onclick=closeParent;$('#parentModal').onclick=e=>{if(e.target===$('#parentModal'))closeParent()};

window.addEventListener('keydown',e=>{if(e.key==='Escape'){const cw=$('#colorWheelPopover');if(cw&&!cw.hidden){closeColorWheel(false);return}if(drawFocusMode)exitDrawFullscreen()}});
let resizeTimer;const scheduleResponsiveCanvasResize=()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(async()=>{if(!$('#drawView').classList.contains('active'))return;if(drawFocusMode&&focusLearningPane==='draw')fitFullscreenCanvasBox();if(!drawFocusMode||focusLearningPane==='draw')await resizeMainCanvases(true);if(!drawFocusMode||focusLearningPane==='practice'){await resizePracticeCanvases(true);drawPracticeGuide()}},180)};window.addEventListener('resize',scheduleResponsiveCanvasResize);window.addEventListener('orientationchange',()=>setTimeout(scheduleResponsiveCanvasResize,180));
// V1.8.77: Observe layout-size changes on tablets (including opening guide details),
// not only viewport resize. The resizer guards equal sizes and preserves strokes.
if(typeof ResizeObserver==='function'){
  const wrapForResize=$('#canvasWrap');
  let lastBoxW=0,lastBoxH=0;
  const canvasLayoutObserver=new ResizeObserver(entries=>{
    if(!$('#drawView').classList.contains('active'))return;
    const rect=entries[0]?.contentRect;
    if(!rect || rect.width<2 || rect.height<2)return;
    const w=Math.round(rect.width),h=Math.round(rect.height);
    if(Math.abs(w-lastBoxW)<2&&Math.abs(h-lastBoxH)<2)return;
    lastBoxW=w;lastBoxH=h;
    scheduleResponsiveCanvasResize();
  });
  if(wrapForResize)canvasLayoutObserver.observe(wrapForResize);
}
if(window.visualViewport)window.visualViewport.addEventListener('resize',scheduleResponsiveCanvasResize);
if('serviceWorker' in navigator){
  window.addEventListener('load',async()=>{
    try{
      const reg=await navigator.serviceWorker.register('./sw.js?v=1.8.77',{updateViaCache:'none'});
      await reg.update();
    }catch(e){console.warn('Service Worker update failed',e);}
  });
}
$('#penHint').style.display=settings.pressure?'':'none';updateStarUI();updateLayerUI();updateUndoButtons();renderHome();updateGuideStyleUI();

// V1.8.48: fixed outline switch is not part of the draggable/erasable paint layers.
$('#lockOutlineTopToggle')?.addEventListener('change',e=>{
  settings.lockOutlineTop=!!e.target.checked;saveSettings();
  if(settings.lockOutlineTop&&state.current&&state.guideStyle!=='outline'&&!(state.current.cat==='anime-games'&&gameArtMode==='free')){
    state.guideStyle='outline';
    if(state.current.cat==='anime-games')gameArtMode='outline';
    updateGuideStyleUI();updateGameModeControls();
    void drawGuide();
  }else void renderOutlineTop();
  toast(settings.lockOutlineTop?'黑白線條已固定在最上層':'已解除黑白線條固定');
});
syncOutlinePinUI();

// V1.8.45: board mode buttons preserve all editable canvas layers.
document.querySelectorAll('[data-game-draw]').forEach(button=>{
  button.addEventListener('click',()=>{ if(state.current?.cat==='anime-games')setGameArtMode(button.dataset.gameDraw); });
});
