// Generates the flat SVG graphics in public/illo/ and public/icons/, and
// public/favicon.svg. Run after editing:
//
//   npm run illo
//
// Same approach as PestToClear's scripts/illustrations.mjs, which follows
// OurKampung's assets/illo: soft blob backdrop, ground shadow, flat shapes, no
// outlines on figures. BrokenToFixed's own palette: rust, tool yellow, teal.
// Every graphic is drawn for this site. No people are shown as a partner's
// crew: figures are generic and never named. The output files are committed;
// this script is only needed to change them.

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const illoDir = join(pub, 'illo');
const iconDir = join(pub, 'icons');
mkdirSync(illoDir, { recursive: true });
mkdirSync(iconDir, { recursive: true });

const C = {
  blob: '#F6E7DD',
  shadow: '#EAD5C6',
  cream: '#FBF8F1',
  white: '#FFFFFF',
  line: '#E4D9CB',
  ink: '#2A2420',
  inkSoft: '#4A413A',
  rust: '#A3401B',
  rustDark: '#742C11',
  rustLight: '#D9774E',
  yellow: '#F2B632',
  yellowDark: '#D99A1E',
  butter: '#F6E3A8',
  teal: '#2F6F73',
  tealDark: '#1F4F52',
  tealPale: '#CFE3E1',
  wood: '#D9A86C',
  woodDark: '#C4935A',
  woodPale: '#EBCB9C',
  card: '#CDA472',
  cardDark: '#B48A58',
  steel: '#5B6675',
  steelDark: '#3E4652',
  steelPale: '#C9D0D8',
  chrome: '#B8C1CB',
  chromeLight: '#DDE3E8',
  sky: '#A9C6D6',
  skyPale: '#D6E5EC',
  water: '#7FB2CF',
  tile: '#EEF2F3',
  tileLine: '#D3DCDF',
  leaf: '#8FA476',
  leafDark: '#7E9468',
  brick: '#C9764B',
  skin1: '#B97B52',
  skin2: '#F3CDB3',
  skin3: '#8D5A3B',
  wall: '#F7EFE6',
  floor: '#E9DCC9',
  mould: '#3B3B33',
};

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">\n${body.trim()}\n</svg>\n`;

/** The soft backdrop and ground shadow every 320x220 card illustration sits on. */
const stage = () => `
  <path d="M46 126C36 70 94 30 164 30c72 0 124 34 120 96-4 58-64 78-128 78-58 0-100-24-110-78z" fill="${C.blob}"/>
  <ellipse cx="164" cy="184" rx="122" ry="7" fill="${C.shadow}"/>`;

/** A blob scaled to any box, for the larger and smaller graphics. */
const blob = (w, h, fill = C.blob) => {
  const sx = w / 320;
  const sy = h / 220;
  return `<path transform="scale(${sx.toFixed(3)} ${sy.toFixed(3)})" d="M46 126C36 70 94 30 164 30c72 0 124 34 120 96-4 58-64 78-128 78-58 0-100-24-110-78z" fill="${fill}"/>`;
};

const writeIllo = (name, content) => writeFileSync(join(illoDir, `${name}.svg`), content);
const writeIcon = (name, content) => writeFileSync(join(iconDir, `${name}.svg`), content);

// --- shared props ---------------------------------------------------------------

/** Screwdriver lying on the floor, tip pointing right. */
const screwdriver = (x, y, a = 0, s = 1) => `
  <g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">
    <rect x="0" y="-5" width="30" height="10" rx="5" fill="${C.rust}"/>
    <rect x="4" y="-5" width="3" height="10" fill="${C.rustDark}"/><rect x="12" y="-5" width="3" height="10" fill="${C.rustDark}"/>
    <rect x="30" y="-2" width="28" height="4" fill="${C.chrome}"/>
    <path d="M58-2l6 2-6 2z" fill="${C.steel}"/>
  </g>`;

/** Open-ended spanner. */
const wrench = (x, y, a = 0, s = 1) => `
  <g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">
    <rect x="0" y="-4" width="56" height="8" rx="4" fill="${C.steel}"/>
    <path d="M-14-10a12 12 0 1 0 0 20l2-6h6v-8h-6z" fill="${C.steel}"/>
    <circle cx="62" cy="0" r="9" fill="${C.steel}"/><circle cx="62" cy="0" r="4" fill="${C.blob}"/>
  </g>`;

/** Cordless drill, nose pointing left. */
const drill = (x, y, s = 1) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-6" y="-26" width="16" height="8" rx="2" fill="${C.steel}"/>
    <rect x="-22" y="-24" width="16" height="4" fill="${C.chrome}"/>
    <rect x="8" y="-32" width="42" height="20" rx="8" fill="${C.yellow}"/>
    <rect x="22" y="-14" width="14" height="30" rx="4" fill="${C.ink}"/>
    <rect x="16" y="14" width="28" height="12" rx="3" fill="${C.yellowDark}"/>
    <circle cx="40" cy="-22" r="3" fill="${C.ink}"/>
  </g>`;

/** Toolbox with a handle. */
const toolbox = (x, y, s = 1, body = C.rust, lid = C.rustDark) => `
  <g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-14-30v-8a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v8" stroke="${C.steelDark}" stroke-width="4" fill="none"/>
    <rect x="-34" y="-32" width="68" height="32" rx="4" fill="${body}"/>
    <rect x="-34" y="-32" width="68" height="9" rx="3" fill="${lid}"/>
    <rect x="-5" y="-26" width="10" height="7" rx="1.5" fill="${C.yellow}"/>
  </g>`;

/** Spirit level. */
const level = (x, y, w = 70, a = 0) => `
  <g transform="translate(${x} ${y}) rotate(${a})">
    <rect x="0" y="-6" width="${w}" height="12" rx="2" fill="${C.yellow}"/>
    <rect x="${w / 2 - 9}" y="-3.5" width="18" height="7" rx="3.5" fill="${C.tealPale}"/>
    <circle cx="${w / 2}" cy="0" r="2.2" fill="${C.teal}"/>
  </g>`;

/** A person standing. Feet on y; facing is just a mirror. */
const person = ({ x, y, shirt, trousers, skin, hair = C.ink, cap, flip = false, armUp = false, belt = false }) => `
  <g transform="translate(${x} ${y})${flip ? ' scale(-1 1)' : ''}">
    <ellipse cx="0" cy="2" rx="26" ry="4" fill="${C.shadow}"/>
    <rect x="-12" y="-46" width="10" height="44" rx="4" fill="${trousers}"/>
    <rect x="2" y="-46" width="10" height="44" rx="4" fill="${trousers}"/>
    <rect x="-16" y="-6" width="16" height="7" rx="3" fill="${C.ink}"/>
    <rect x="1" y="-6" width="16" height="7" rx="3" fill="${C.ink}"/>
    <rect x="-17" y="-96" width="34" height="54" rx="13" fill="${shirt}"/>
    ${belt ? `<rect x="-17" y="-50" width="34" height="7" fill="${C.woodDark}"/><rect x="6" y="-50" width="9" height="16" rx="2" fill="${C.wood}"/>` : ''}
    <rect x="-25" y="-88" width="10" height="34" rx="5" fill="${shirt}"/>
    ${armUp
      ? `<path d="M13 -86l14 -32" stroke="${shirt}" stroke-width="10" stroke-linecap="round"/><circle cx="28" cy="-122" r="5" fill="${skin}"/>`
      : `<rect x="15" y="-88" width="10" height="34" rx="5" fill="${shirt}"/>`}
    <circle cx="0" cy="-112" r="14" fill="${skin}"/>
    ${cap
      ? `<path d="M-15-113a15 15 0 0 1 30 0z" fill="${cap}"/><rect x="0" y="-117" width="22" height="5" rx="2" fill="${cap}"/>`
      : `<path d="M-14-113a14 14 0 0 1 28 0c-5-6-22-7-28 0z" fill="${hair}"/>`}
  </g>`;

// --- 1. furniture assembly: a half-built wardrobe ------------------------------
writeIllo(
  'furniture-assembly',
  svg(320, 220, `
  ${stage()}
  <rect x="112" y="52" width="104" height="130" rx="2" fill="${C.woodPale}"/>
  <rect x="112" y="52" width="10" height="130" fill="${C.wood}"/>
  <rect x="206" y="52" width="10" height="130" fill="${C.wood}"/>
  <rect x="112" y="48" width="104" height="10" rx="2" fill="${C.woodDark}"/>
  <rect x="122" y="104" width="84" height="6" fill="${C.wood}"/>
  <rect x="122" y="170" width="84" height="12" fill="${C.woodDark}"/>
  <rect x="140" y="60" width="2.5" height="40" fill="${C.woodDark}"/>
  <path d="M141 62h50" stroke="${C.chrome}" stroke-width="3" stroke-linecap="round"/>
  <g transform="rotate(10 236 182)">
    <rect x="222" y="62" width="44" height="120" rx="2" fill="${C.wood}"/>
    <rect x="228" y="70" width="32" height="104" rx="1.5" fill="none" stroke="${C.woodDark}" stroke-width="2"/>
    <rect x="227" y="112" width="4" height="16" rx="2" fill="${C.steel}"/>
  </g>
  <path d="M50 182v-38h52v38z" fill="${C.card}"/>
  <path d="M50 144l-12-14h52l12 14z" fill="${C.cardDark}"/>
  <path d="M102 144l10-16" stroke="${C.cardDark}" stroke-width="4" stroke-linecap="round"/>
  <rect x="62" y="152" width="28" height="4" rx="2" fill="${C.cardDark}"/>
  <path d="M60 128v-14M66 128v-10M74 128v-16" stroke="${C.wood}" stroke-width="5" stroke-linecap="round"/>
  <path d="M232 192h22v-8" stroke="${C.steelDark}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <g fill="${C.steel}"><circle cx="268" cy="190" r="2.6"/><circle cx="276" cy="186" r="2.2"/><circle cx="262" cy="185" r="2"/></g>
  ${screwdriver(84, 192, -4, 0.85)}
`),
);

// --- 2. wall mounting: a TV on a bracket, a shelf and a drill --------------------
writeIllo(
  'wall-mounting',
  svg(320, 220, `
  ${stage()}
  <rect x="82" y="44" width="150" height="88" rx="6" fill="${C.ink}"/>
  <rect x="88" y="50" width="138" height="76" rx="3" fill="#36414D"/>
  <path d="M150 50h40l-52 76H98z" fill="#43505E"/>
  <rect x="204" y="132" width="8" height="16" rx="1" fill="${C.steelPale}"/>
  <rect x="76" y="148" width="162" height="34" rx="4" fill="${C.wood}"/>
  <rect x="76" y="148" width="162" height="6" rx="3" fill="${C.woodDark}"/>
  <rect x="86" y="160" width="68" height="16" rx="2" fill="${C.woodPale}"/><rect x="160" y="160" width="68" height="16" rx="2" fill="${C.woodPale}"/>
  <rect x="246" y="78" width="46" height="7" rx="2" fill="${C.woodDark}"/>
  <rect x="252" y="56" width="8" height="22" fill="${C.teal}"/><rect x="261" y="60" width="7" height="18" fill="${C.rust}"/><rect x="269" y="58" width="6" height="20" fill="${C.yellow}"/>
  <path d="M286 78c0-10-6-16-6-16s-6 6-6 16z" fill="${C.leaf}"/>
  ${level(244, 104, 50, -2)}
  <path d="M244 104l-4 0" stroke="${C.yellow}" stroke-width="0"/>
  ${drill(54, 160, 0.9)}
  <g fill="${C.chrome}"><circle cx="40" cy="190" r="2"/><circle cx="34" cy="186" r="1.6"/></g>
`),
);

// --- 3. doors and locks: a door with a loose hinge, a new lock beside it ----------
writeIllo(
  'doors-and-locks',
  svg(320, 220, `
  ${stage()}
  <rect x="104" y="30" width="100" height="154" fill="${C.cream}"/>
  <rect x="112" y="38" width="84" height="146" fill="${C.wood}"/>
  <rect x="122" y="50" width="64" height="52" rx="2" fill="none" stroke="${C.woodDark}" stroke-width="3"/>
  <rect x="122" y="114" width="64" height="58" rx="2" fill="none" stroke="${C.woodDark}" stroke-width="3"/>
  <rect x="108" y="56" width="8" height="20" rx="2" fill="${C.steel}"/>
  <g transform="rotate(-24 112 150)"><rect x="108" y="140" width="8" height="20" rx="2" fill="${C.steel}"/></g>
  <path d="M96 168l-3 6M90 176l-2 4" stroke="${C.steel}" stroke-width="3" stroke-linecap="round"/>
  <rect x="180" y="104" width="10" height="20" rx="3" fill="${C.steelDark}"/>
  <rect x="172" y="108" width="22" height="6" rx="3" fill="${C.chrome}"/>
  <rect x="226" y="64" width="40" height="70" rx="8" fill="${C.ink}"/>
  <rect x="232" y="72" width="28" height="12" rx="2" fill="${C.teal}"/>
  <g fill="${C.chromeLight}">${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<circle cx="${238 + c * 8}" cy="${94 + r * 9}" r="2.4"/>`).join('')).join('')}</g>
  <rect x="234" y="146" width="28" height="8" rx="4" fill="${C.chrome}"/><rect x="256" y="142" width="10" height="16" rx="3" fill="${C.steel}"/>
  ${screwdriver(220, 186, 0, 0.9)}
`),
);

// --- 4. silicone and grout: an old bead cut out, a fresh one run ----------------------
const tiles = (x0, y0, cols, rows, s) => {
  let out = `<rect x="${x0}" y="${y0}" width="${cols * s}" height="${rows * s}" fill="${C.tile}"/>`;
  for (let c = 1; c < cols; c++) out += `<rect x="${x0 + c * s - 1}" y="${y0}" width="2" height="${rows * s}" fill="${C.tileLine}"/>`;
  for (let r = 1; r < rows; r++) out += `<rect x="${x0}" y="${y0 + r * s - 1}" width="${cols * s}" height="2" fill="${C.tileLine}"/>`;
  return out;
};
writeIllo(
  'silicone-and-grout',
  svg(320, 220, `
  ${stage()}
  ${tiles(64, 38, 7, 4, 28)}
  <rect x="58" y="150" width="208" height="30" rx="4" fill="${C.white}"/>
  <rect x="58" y="150" width="208" height="5" fill="${C.chromeLight}"/>
  <path d="M64 151h96" stroke="${C.mould}" stroke-width="5" stroke-linecap="round" stroke-dasharray="3 3"/>
  <g fill="${C.mould}" opacity=".7"><circle cx="78" cy="144" r="1.6"/><circle cx="96" cy="145" r="1.3"/><circle cx="120" cy="143" r="1.6"/><circle cx="140" cy="145" r="1.2"/></g>
  <path d="M162 151h70" stroke="${C.white}" stroke-width="7" stroke-linecap="round"/>
  <path d="M162 151h70" stroke="${C.chromeLight}" stroke-width="1.5" stroke-linecap="round"/>
  <g transform="translate(228 149) rotate(-28) scale(0.8)">
    <path d="M0 0l12-4v8z" fill="${C.cream}"/>
    <rect x="12" y="-8" width="56" height="16" rx="4" fill="${C.white}" stroke="${C.line}" stroke-width="1.5"/>
    <rect x="66" y="-10" width="10" height="20" rx="2" fill="${C.rust}"/>
    <rect x="76" y="-2" width="30" height="4" fill="${C.steel}"/>
    <path d="M74 8l-6 22h10l6-20z" fill="${C.rustDark}"/>
  </g>
  <g transform="translate(44 176) rotate(-14)">
    <rect x="0" y="-5" width="28" height="10" rx="3" fill="${C.yellow}"/>
    <path d="M28-5h14l-6 10h-8z" fill="${C.chrome}"/>
  </g>
`),
);

// --- 5. plumbing: a dripping tap, the trap under the basin, a wrench --------------
writeIllo(
  'plumbing-repairs',
  svg(320, 220, `
  ${stage()}
  <rect x="86" y="36" width="120" height="58" rx="4" fill="${C.skyPale}"/>
  <rect x="92" y="42" width="108" height="46" rx="3" fill="${C.sky}"/>
  <path d="M84 104h124l-10 30a10 10 0 0 1-9 6h-86a10 10 0 0 1-9-6z" fill="${C.white}"/>
  <rect x="80" y="98" width="132" height="10" rx="5" fill="${C.chromeLight}"/>
  <rect x="140" y="82" width="12" height="18" rx="2" fill="${C.chrome}"/>
  <path d="M146 84v-6h22a6 6 0 0 1 6 6v6" stroke="${C.chrome}" stroke-width="8" fill="none" stroke-linecap="round"/>
  <rect x="136" y="72" width="20" height="6" rx="3" fill="${C.steel}"/>
  <path d="M174 96c-3 5-5 8-5 10a5 5 0 0 0 10 0c0-2-2-5-5-10z" fill="${C.water}"/>
  <path d="M174 114c-2 3-3 5-3 6a3 3 0 0 0 6 0c0-1-1-3-3-6z" fill="${C.water}"/>
  <path d="M146 140v14a10 10 0 0 0 20 0v-4a8 8 0 0 1 16 0v30" stroke="${C.chrome}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M220 182h44l-4-34h-36z" fill="${C.teal}"/>
  <rect x="216" y="144" width="52" height="8" rx="3" fill="${C.tealDark}"/>
  <ellipse cx="242" cy="150" rx="20" ry="3" fill="${C.water}"/>
  ${wrench(66, 184, -8, 0.9)}
`),
);

// --- 6. electrical: a fan, a pendant light, a switch with its cover off -----------
writeIllo(
  'electrical-repairs',
  svg(320, 220, `
  ${stage()}
  <rect x="40" y="30" width="248" height="8" rx="3" fill="${C.line}"/>
  <path d="M104 38v40" stroke="${C.ink}" stroke-width="2.5"/>
  <circle cx="104" cy="98" r="22" fill="${C.butter}" opacity=".7"/>
  <path d="M84 98a20 20 0 0 1 40 0z" fill="${C.yellow}"/>
  <rect x="100" y="74" width="8" height="8" rx="2" fill="${C.yellowDark}"/>
  <circle cx="104" cy="101" r="5" fill="${C.cream}"/>
  <rect x="216" y="38" width="6" height="18" fill="${C.steel}"/>
  <ellipse cx="219" cy="60" rx="12" ry="7" fill="${C.steelDark}"/>
  <ellipse cx="184" cy="62" rx="32" ry="6" fill="${C.wood}"/>
  <ellipse cx="254" cy="62" rx="32" ry="6" fill="${C.woodDark}"/>
  <rect x="58" y="128" width="34" height="44" rx="4" fill="${C.cream}" stroke="${C.line}" stroke-width="2"/>
  <rect x="66" y="136" width="18" height="28" rx="2" fill="${C.inkSoft}"/>
  <path d="M70 140c-6 10 6 14 0 24M76 140c6 10-6 14 0 24M81 140c-2 10 4 14 0 24" stroke-width="2.4" fill="none" stroke-linecap="round" stroke="${C.rustLight}"/>
  <path d="M76 140c6 10-6 14 0 24" stroke="${C.teal}" stroke-width="2.4" fill="none"/>
  <path d="M81 140c-2 10 4 14 0 24" stroke="${C.yellow}" stroke-width="2.4" fill="none"/>
  <g transform="rotate(16 112 176)"><rect x="98" y="150" width="30" height="40" rx="3" fill="${C.white}" stroke="${C.line}" stroke-width="2"/><rect x="108" y="160" width="10" height="18" rx="2" fill="${C.chromeLight}"/></g>
  <path d="M190 182l26-92M246 182l-26-92" stroke="${C.steel}" stroke-width="6" stroke-linecap="round"/>
  <path d="M200 148h36M207 122h22M196 166h44" stroke="${C.steelPale}" stroke-width="5" stroke-linecap="round"/>
  <rect x="210" y="84" width="20" height="10" rx="2" fill="${C.steelDark}"/>
`),
);

// --- 7. appliance repair: a washer with its door open, a fridge, a spare part -------
const gear = (x, y, r) => {
  const teeth = Array.from({ length: 8 }, (_, i) => `<rect x="${-3}" y="${-r - 4}" width="6" height="8" rx="1" transform="rotate(${i * 45})"/>`).join('');
  return `<g transform="translate(${x} ${y})" fill="${C.steel}">${teeth}<circle r="${r}"/><circle r="${r * 0.4}" fill="${C.blob}"/></g>`;
};
writeIllo(
  'appliance-repair',
  svg(320, 220, `
  ${stage()}
  <rect x="66" y="74" width="100" height="108" rx="6" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>
  <rect x="66" y="74" width="100" height="22" rx="6" fill="${C.chromeLight}"/>
  <rect x="76" y="81" width="30" height="8" rx="2" fill="${C.teal}"/>
  <circle cx="148" cy="85" r="6" fill="${C.chrome}"/>
  <circle cx="116" cy="140" r="30" fill="${C.chrome}"/>
  <circle cx="116" cy="140" r="22" fill="${C.steelDark}"/>
  <path d="M96 148a22 22 0 0 0 40 0z" fill="${C.water}" opacity=".7"/>
  <g transform="translate(86 140) rotate(-58)"><ellipse cx="0" cy="-30" rx="10" ry="30" fill="${C.chromeLight}" stroke="${C.chrome}" stroke-width="4"/></g>
  <rect x="186" y="34" width="78" height="148" rx="6" fill="${C.skyPale}"/>
  <rect x="186" y="88" width="78" height="3" fill="${C.sky}"/>
  <rect x="194" y="48" width="5" height="30" rx="2.5" fill="${C.steel}"/>
  <rect x="194" y="100" width="5" height="40" rx="2.5" fill="${C.steel}"/>
  <path d="M222 60l6 6M228 60l-6 6M225 58v10M220 63h10" stroke="${C.teal}" stroke-width="1.8" stroke-linecap="round"/>
  ${gear(272, 186, 7)}
  ${wrench(46, 192, 0, 0.7)}
`),
);

// --- hero: a home in cutaway, with a fix under way in every room -----------------------
const heroRoomY = 120;
const heroFloorY = 384;
writeIllo(
  'hero',
  svg(1200, 460, `
  <path d="M40 390C20 210 220 70 600 64c380-6 590 120 560 326z" fill="${C.blob}"/>
  <circle cx="1080" cy="92" r="28" fill="${C.butter}"/>
  <g fill="${C.white}"><ellipse cx="230" cy="70" rx="44" ry="13"/><ellipse cx="262" cy="62" rx="26" ry="12"/><ellipse cx="900" cy="62" rx="40" ry="12"/><ellipse cx="930" cy="54" rx="24" ry="11"/></g>

  <!-- the building shell -->
  <path d="M80 ${heroRoomY}l520-56 520 56z" fill="${C.rust}"/>
  <rect x="96" y="${heroRoomY}" width="1008" height="${heroFloorY - heroRoomY}" fill="${C.wall}"/>
  <rect x="96" y="${heroFloorY - 14}" width="1008" height="14" fill="${C.floor}"/>
  <rect x="84" y="${heroRoomY - 4}" width="1032" height="12" rx="3" fill="${C.rustDark}"/>
  ${[352, 608, 860].map((x) => `<rect x="${x}" y="${heroRoomY + 8}" width="10" height="${heroFloorY - heroRoomY - 8}" fill="${C.line}"/>`).join('')}

  <!-- bedroom: a wardrobe going up -->
  <rect x="140" y="196" width="128" height="174" rx="3" fill="${C.woodPale}"/>
  <rect x="140" y="196" width="10" height="174" fill="${C.wood}"/><rect x="258" y="196" width="10" height="174" fill="${C.wood}"/>
  <rect x="136" y="190" width="136" height="10" rx="2" fill="${C.woodDark}"/>
  <rect x="150" y="270" width="108" height="6" fill="${C.wood}"/>
  <path d="M164 210h80" stroke="${C.chrome}" stroke-width="3" stroke-linecap="round"/>
  <g transform="rotate(8 300 370)"><rect x="282" y="230" width="48" height="140" rx="2" fill="${C.wood}"/><rect x="289" y="238" width="34" height="124" fill="none" stroke="${C.woodDark}" stroke-width="2"/></g>
  <path d="M112 370v-26h40v26z" fill="${C.card}"/><path d="M112 344l-8-10h40l8 10z" fill="${C.cardDark}"/>

  <!-- living room: a TV going on the wall, a fan going up -->
  <rect x="392" y="190" width="150" height="86" rx="6" fill="${C.ink}"/>
  <rect x="398" y="196" width="138" height="74" rx="3" fill="#36414D"/>
  <path d="M460 196h40l-50 74h-40z" fill="#43505E"/>
  <rect x="384" y="318" width="168" height="52" rx="4" fill="${C.wood}"/>
  <rect x="384" y="318" width="168" height="7" rx="3" fill="${C.woodDark}"/>
  <rect x="460" y="276" width="14" height="42" fill="${C.steelPale}"/>
  <rect x="571" y="128" width="6" height="22" fill="${C.steel}"/>
  <ellipse cx="574" cy="154" rx="12" ry="7" fill="${C.steelDark}"/>

  <!-- stepladder and the person on it -->
  <path d="M500 370l40-150M592 370l-40-150" stroke="${C.steel}" stroke-width="7" stroke-linecap="round"/>
  <path d="M510 330h72M520 290h52M530 252h32" stroke="${C.steelPale}" stroke-width="6" stroke-linecap="round"/>
  ${person({ x: 546, y: 290, shirt: C.rust, trousers: C.teal, skin: C.skin1, cap: C.yellow, armUp: true, belt: true })}

  <!-- kitchen: a tap and a washer -->
  <rect x="654" y="250" width="170" height="16" rx="3" fill="${C.woodDark}"/>
  <rect x="654" y="266" width="170" height="104" fill="${C.wood}"/>
  <rect x="664" y="276" width="70" height="86" rx="3" fill="${C.woodPale}"/>
  <rect x="744" y="276" width="70" height="86" rx="3" fill="${C.woodPale}"/>
  <path d="M720 250v-28h22a6 6 0 0 1 6 6v8" stroke="${C.chrome}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M748 244c-2 4-4 6-4 8a4 4 0 0 0 8 0c0-2-2-4-4-8z" fill="${C.water}"/>
  <rect x="660" y="160" width="150" height="56" rx="4" fill="${C.tile}"/>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="${688 + i * 26}" y="160" width="2" height="56" fill="${C.tileLine}"/>`).join('')}
  <rect x="660" y="187" width="150" height="2" fill="${C.tileLine}"/>

  <!-- bathroom: a shower being resealed -->
  <rect x="884" y="150" width="196" height="186" fill="${C.tile}"/>
  ${[1, 2, 3, 4, 5, 6].map((i) => `<rect x="${884 + i * 28}" y="150" width="2" height="186" fill="${C.tileLine}"/>`).join('')}
  ${[1, 2, 3, 4, 5].map((i) => `<rect x="884" y="${150 + i * 31}" width="196" height="2" fill="${C.tileLine}"/>`).join('')}
  <rect x="878" y="336" width="208" height="34" rx="4" fill="${C.white}"/>
  <path d="M886 337h90" stroke="${C.mould}" stroke-width="5" stroke-dasharray="3 3" stroke-linecap="round"/>
  <path d="M978 337h96" stroke="${C.white}" stroke-width="7" stroke-linecap="round"/>
  <path d="M1040 170v40" stroke="${C.chrome}" stroke-width="6" stroke-linecap="round"/>
  <ellipse cx="1040" cy="214" rx="16" ry="6" fill="${C.chrome}"/>
  <g transform="translate(1000 330) rotate(-12)">
    <path d="M0 0l10-3v6z" fill="${C.cream}"/>
    <rect x="10" y="-7" width="44" height="14" rx="4" fill="${C.white}" stroke="${C.line}" stroke-width="1.5"/>
    <rect x="52" y="-9" width="8" height="18" rx="2" fill="${C.rust}"/>
    <rect x="60" y="-2" width="22" height="4" fill="${C.steel}"/>
  </g>
  <rect x="720" y="128" width="3" height="26" fill="${C.ink}"/>
  <path d="M706 168a16 16 0 0 1 32 0z" fill="${C.yellow}"/>
  <rect x="984" y="128" width="40" height="8" rx="3" fill="${C.chromeLight}"/>

  ${person({ x: 690, y: 384, shirt: C.teal, trousers: C.inkSoft, skin: C.skin2, armUp: true })}

  <!-- ground -->
  <ellipse cx="600" cy="404" rx="590" ry="44" fill="#F1E5DA"/>
  <path d="M40 386h1120" stroke="#E6D6C7" stroke-width="4" stroke-linecap="round"/>
  ${toolbox(212, 404, 1.1)}
  ${drill(800, 412, 0.9)}
`),
);

// --- how it works: four steps ----------------------------------------------------------------
writeIllo(
  'step-enquiry',
  svg(240, 170, `
  ${blob(240, 170)}
  <ellipse cx="120" cy="150" rx="74" ry="5" fill="${C.shadow}"/>
  <rect x="82" y="22" width="76" height="126" rx="12" fill="${C.ink}"/>
  <rect x="88" y="32" width="64" height="104" rx="4" fill="${C.white}"/>
  <rect x="96" y="42" width="34" height="6" rx="2" fill="${C.rust}"/>
  <rect x="96" y="56" width="48" height="12" rx="3" fill="${C.cream}" stroke="${C.line}" stroke-width="1.5"/>
  <rect x="96" y="74" width="48" height="12" rx="3" fill="${C.cream}" stroke="${C.line}" stroke-width="1.5"/>
  <rect x="96" y="92" width="48" height="18" rx="3" fill="${C.cream}" stroke="${C.line}" stroke-width="1.5"/>
  <rect x="96" y="116" width="48" height="12" rx="4" fill="${C.rust}"/>
  <path d="M168 60l34-14-10 34-8-10z" fill="${C.yellow}"/>
  <path d="M184 70l18-24" stroke="${C.yellowDark}" stroke-width="2"/>
`),
);

writeIllo(
  'step-match',
  svg(240, 170, `
  ${blob(240, 170)}
  <ellipse cx="120" cy="150" rx="84" ry="5" fill="${C.shadow}"/>
  <rect x="26" y="100" width="70" height="8" rx="2" fill="${C.woodDark}"/>
  <rect x="32" y="108" width="6" height="40" fill="${C.woodDark}"/><rect x="84" y="108" width="6" height="40" fill="${C.woodDark}"/>
  <rect x="38" y="70" width="46" height="30" rx="3" fill="${C.steelDark}"/>
  <rect x="42" y="74" width="38" height="22" rx="2" fill="${C.skyPale}"/>
  <rect x="46" y="79" width="20" height="3" rx="1" fill="${C.rust}"/><rect x="46" y="85" width="28" height="3" rx="1" fill="${C.steelPale}"/>
  <path d="M96 70c30-40 70-40 96 0" stroke="${C.rustLight}" stroke-width="3" stroke-dasharray="6 6" fill="none" stroke-linecap="round"/>
  <rect x="124" y="36" width="34" height="24" rx="3" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>
  <path d="M124 38l17 12 17-12" stroke="${C.rust}" stroke-width="2.5" fill="none"/>
  ${toolbox(190, 148, 0.95)}
`),
);

writeIllo(
  'step-quote',
  svg(240, 170, `
  ${blob(240, 170)}
  <ellipse cx="120" cy="150" rx="80" ry="5" fill="${C.shadow}"/>
  <g transform="rotate(-6 100 90)">
    <rect x="58" y="24" width="84" height="118" rx="4" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>
    <rect x="70" y="38" width="40" height="7" rx="2" fill="${C.rust}"/>
    ${[56, 68, 80, 92].map((y) => `<rect x="70" y="${y}" width="60" height="4" rx="2" fill="${C.steelPale}"/>`).join('')}
    <rect x="70" y="112" width="34" height="14" rx="3" fill="${C.butter}"/>
    <path d="M108 120h22" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>
  </g>
  <rect x="150" y="70" width="58" height="62" rx="5" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>
  <rect x="150" y="70" width="58" height="16" rx="5" fill="${C.teal}"/>
  <rect x="162" y="64" width="4" height="12" rx="2" fill="${C.steelDark}"/><rect x="192" y="64" width="4" height="12" rx="2" fill="${C.steelDark}"/>
  <g fill="${C.steelPale}">${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${158 + c * 12}" y="${94 + r * 11}" width="7" height="6" rx="1"/>`).join('')).join('')}</g>
  <rect x="182" y="105" width="7" height="6" rx="1" fill="${C.rust}"/>
`),
);

writeIllo(
  'step-fixed',
  svg(240, 170, `
  ${blob(240, 170)}
  <ellipse cx="120" cy="150" rx="80" ry="5" fill="${C.shadow}"/>
  <path d="M52 148V86l52-38 52 38v62z" fill="${C.cream}"/>
  <path d="M42 90l62-48 62 48" stroke="${C.rust}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="88" y="104" width="32" height="44" rx="2" fill="${C.wood}"/>
  <circle cx="113" cy="128" r="2.5" fill="${C.yellow}"/>
  <rect x="62" y="98" width="18" height="18" rx="2" fill="${C.skyPale}"/><rect x="128" y="98" width="18" height="18" rx="2" fill="${C.skyPale}"/>
  <circle cx="176" cy="60" r="26" fill="${C.teal}"/>
  <path d="M164 60l8 8 16-16" stroke="${C.white}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
`),
);

// --- a small fix beside a renovation, to show the difference ----------------------------
writeIllo(
  'small-fix',
  svg(320, 220, `
  ${stage()}
  <rect x="110" y="40" width="100" height="70" rx="4" fill="${C.tile}"/>
  <rect x="159" y="40" width="2" height="70" fill="${C.tileLine}"/><rect x="110" y="74" width="100" height="2" fill="${C.tileLine}"/>
  <path d="M100 116h120l-10 26a10 10 0 0 1-9 6h-82a10 10 0 0 1-9-6z" fill="${C.white}"/>
  <rect x="96" y="110" width="128" height="10" rx="5" fill="${C.chromeLight}"/>
  <path d="M154 112v-18h20a6 6 0 0 1 6 6v6" stroke="${C.chrome}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <circle cx="240" cy="74" r="20" fill="${C.teal}"/>
  <path d="M231 74l6 6 12-12" stroke="${C.white}" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${toolbox(78, 184, 0.9)}
  ${wrench(196, 184, 0, 0.75)}
`),
);

writeIllo(
  'renovation',
  svg(320, 220, `
  ${stage()}
  <rect x="70" y="40" width="150" height="142" fill="${C.wall}"/>
  <path d="M70 40h150v58l-22 10-18-14-26 18-20-12-30 16-34-8z" fill="${C.wall}"/>
  <g fill="${C.brick}">${[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4].map((c) => `<rect x="${78 + c * 28 + (r % 2) * 14}" y="${108 + r * 14}" width="24" height="10" rx="1"/>`).join('')).join('')}</g>
  <path d="M70 98l34 8 30-16 20 12 26-18 18 14 22-10" stroke="${C.line}" stroke-width="3" fill="none"/>
  <rect x="226" y="136" width="66" height="46" rx="3" fill="${C.yellow}"/>
  <path d="M220 136h78" stroke="${C.yellowDark}" stroke-width="6" stroke-linecap="round"/>
  <path d="M232 136l8-14 10 6 8-12 10 10 12-4 6 14z" fill="${C.steelPale}"/>
  <path d="M246 126l4-8 6 4z" fill="${C.brick}"/>
  <rect x="44" y="150" width="40" height="32" rx="4" fill="${C.cream}" stroke="${C.line}" stroke-width="2"/>
  <rect x="50" y="160" width="28" height="4" rx="2" fill="${C.steelPale}"/>
  <g transform="rotate(-10 136 176)"><rect x="104" y="170" width="70" height="10" rx="2" fill="${C.tile}" stroke="${C.tileLine}" stroke-width="1.5"/></g>
`),
);

// --- what to photograph for the quote --------------------------------------------------------
writeIllo(
  'photos',
  svg(320, 220, `
  ${stage()}
  <path d="M60 140h80l-8 22a8 8 0 0 1-7 5H75a8 8 0 0 1-7-5z" fill="${C.white}"/>
  <rect x="56" y="134" width="88" height="9" rx="4.5" fill="${C.chromeLight}"/>
  <path d="M96 136v-16h16a5 5 0 0 1 5 5v5" stroke="${C.chrome}" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M117 134c-2 4-3 6-3 7a3 3 0 0 0 6 0c0-1-1-3-3-7z" fill="${C.water}"/>
  <g transform="rotate(8 220 110)">
    <rect x="176" y="44" width="88" height="148" rx="12" fill="${C.ink}"/>
    <rect x="182" y="54" width="76" height="118" rx="4" fill="${C.skyPale}"/>
    <path d="M190 62h12M190 62v12M250 62h-12M250 62v12M190 164h12M190 164v-12M250 164h-12M250 164v-12" stroke="${C.white}" stroke-width="3" stroke-linecap="round"/>
    <path d="M200 132h40l-4 12a5 5 0 0 1-4 3h-24a5 5 0 0 1-4-3z" fill="${C.white}"/>
    <rect x="198" y="128" width="44" height="6" rx="3" fill="${C.chromeLight}"/>
    <path d="M218 130v-12h10a3 3 0 0 1 3 3v4" stroke="${C.chrome}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="220" cy="182" r="5" fill="${C.steel}"/>
  </g>
  <path d="M150 112c8-8 16-10 24-8" stroke="${C.rustLight}" stroke-width="3" stroke-dasharray="4 5" fill="none" stroke-linecap="round"/>
`),
);

// --- handover repairs: keys and a checklist ----------------------------------------------------
writeIllo(
  'handover',
  svg(320, 220, `
  ${stage()}
  <g transform="rotate(-5 140 110)">
    <rect x="86" y="34" width="108" height="146" rx="5" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>
    <rect x="118" y="26" width="44" height="16" rx="4" fill="${C.steel}"/>
    ${[62, 92, 122, 152].map((y, i) => `
      <rect x="100" y="${y - 8}" width="16" height="16" rx="3" fill="${i < 3 ? C.teal : C.cream}" stroke="${i < 3 ? C.teal : C.line}" stroke-width="2"/>
      ${i < 3 ? `<path d="M103 ${y}l4 4 7-8" stroke="${C.white}" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
      <rect x="124" y="${y - 3}" width="${54 - i * 6}" height="6" rx="3" fill="${C.steelPale}"/>`).join('')}
  </g>
  <circle cx="232" cy="132" r="16" fill="none" stroke="${C.chrome}" stroke-width="5"/>
  <g transform="translate(232 148) rotate(18)">
    <circle cx="0" cy="18" r="13" fill="${C.yellow}"/><circle cx="0" cy="18" r="4" fill="${C.blob}"/>
    <rect x="-4" y="30" width="8" height="34" fill="${C.yellow}"/>
    <rect x="4" y="48" width="8" height="5" fill="${C.yellow}"/><rect x="4" y="57" width="6" height="5" fill="${C.yellow}"/>
  </g>
  <g transform="translate(240 146) rotate(-30)">
    <circle cx="0" cy="18" r="11" fill="${C.chrome}"/><circle cx="0" cy="18" r="3.5" fill="${C.blob}"/>
    <rect x="-3.5" y="28" width="7" height="28" fill="${C.chrome}"/>
    <rect x="3.5" y="44" width="7" height="4" fill="${C.chrome}"/>
  </g>
`),
);

// --- about: the enquiry goes from the team to a partner handyman ------------------------------
writeIllo(
  'about',
  svg(480, 300, `
  ${blob(480, 300)}
  <ellipse cx="240" cy="262" rx="190" ry="8" fill="${C.shadow}"/>
  <rect x="54" y="170" width="140" height="10" rx="2" fill="${C.woodDark}"/>
  <rect x="62" y="180" width="8" height="80" fill="${C.woodDark}"/><rect x="178" y="180" width="8" height="80" fill="${C.woodDark}"/>
  <rect x="88" y="120" width="76" height="50" rx="4" fill="${C.steelDark}"/>
  <rect x="94" y="126" width="64" height="38" rx="2" fill="${C.skyPale}"/>
  <rect x="100" y="132" width="34" height="5" rx="2" fill="${C.rust}"/>
  ${[142, 150, 158].map((y) => `<rect x="100" y="${y}" width="50" height="3" rx="1.5" fill="${C.steelPale}"/>`).join('')}
  <rect x="80" y="168" width="92" height="5" rx="2" fill="${C.steel}"/>
  ${person({ x: 42, y: 260, shirt: C.teal, trousers: C.inkSoft, skin: C.skin2 })}
  <path d="M190 110c50-60 120-60 170-4" stroke="${C.rustLight}" stroke-width="3.5" stroke-dasharray="7 7" fill="none" stroke-linecap="round"/>
  <path d="M352 96l12 12-16 4z" fill="${C.rustLight}"/>
  <rect x="254" y="50" width="46" height="32" rx="4" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>
  <path d="M254 53l23 16 23-16" stroke="${C.rust}" stroke-width="3" fill="none"/>
  ${person({ x: 392, y: 260, shirt: C.rust, trousers: C.teal, skin: C.skin3, cap: C.yellow, flip: true, belt: true })}
  ${toolbox(436, 262, 0.8)}
`),
);

// --- contact: the enquiry form on a clipboard ----------------------------------------------------
writeIllo(
  'contact',
  svg(320, 220, `
  ${stage()}
  <rect x="96" y="30" width="112" height="152" rx="8" fill="${C.woodDark}"/>
  <rect x="104" y="42" width="96" height="134" rx="3" fill="${C.white}"/>
  <rect x="130" y="24" width="44" height="18" rx="5" fill="${C.steel}"/>
  <rect x="114" y="54" width="44" height="6" rx="2" fill="${C.rust}"/>
  ${[70, 92, 114].map((y) => `<rect x="114" y="${y}" width="76" height="14" rx="3" fill="${C.cream}" stroke="${C.line}" stroke-width="1.5"/>`).join('')}
  <rect x="114" y="140" width="46" height="14" rx="4" fill="${C.rust}"/>
  <g transform="translate(206 136) rotate(-40)">
    <rect x="0" y="-5" width="56" height="10" rx="2" fill="${C.yellow}"/>
    <path d="M0-5l-12 5 12 5z" fill="${C.woodPale}"/><path d="M-12 0l4-1.6v3.2z" fill="${C.ink}"/>
    <rect x="50" y="-5" width="8" height="10" rx="2" fill="${C.rustLight}"/>
  </g>
  ${toolbox(258, 184, 0.75, C.teal, C.tealDark)}
`),
);

// --- privacy: a folder with a padlock ------------------------------------------------------------
writeIllo(
  'privacy',
  svg(320, 220, `
  ${stage()}
  <path d="M84 70h52l10 12h90a6 6 0 0 1 6 6v88a6 6 0 0 1-6 6H84a6 6 0 0 1-6-6V76a6 6 0 0 1 6-6z" fill="${C.yellowDark}"/>
  <rect x="96" y="60" width="120" height="96" rx="3" fill="${C.white}" stroke="${C.line}" stroke-width="2"/>
  ${[76, 88, 100].map((y) => `<rect x="108" y="${y}" width="80" height="4" rx="2" fill="${C.steelPale}"/>`).join('')}
  <path d="M78 104h164v72a6 6 0 0 1-6 6H84a6 6 0 0 1-6-6z" fill="${C.yellow}"/>
  <path d="M146 128v-12a14 14 0 0 1 28 0v12" stroke="${C.steelDark}" stroke-width="7" fill="none"/>
  <rect x="136" y="126" width="48" height="38" rx="6" fill="${C.teal}"/>
  <circle cx="160" cy="141" r="5" fill="${C.tealDark}"/><rect x="157.5" y="142" width="5" height="12" rx="2" fill="${C.tealDark}"/>
`),
);

// --- 404: a sign that has come loose -------------------------------------------------------------
writeIllo(
  'not-found',
  svg(320, 220, `
  ${stage()}
  <rect x="152" y="40" width="10" height="144" rx="3" fill="${C.woodDark}"/>
  <path d="M162 56h70l14 14-14 14h-70z" fill="${C.rust}"/>
  <rect x="176" y="66" width="44" height="6" rx="3" fill="${C.cream}"/>
  <g transform="rotate(38 152 104)">
    <path d="M152 96H82l-14 14 14 14h70z" fill="${C.teal}"/>
    <rect x="96" y="106" width="44" height="6" rx="3" fill="${C.tealPale}"/>
  </g>
  <circle cx="157" cy="62" r="3" fill="${C.steel}"/>
  <g transform="translate(108 182) rotate(-20)"><rect x="0" y="-2.5" width="16" height="5" fill="${C.steel}"/><rect x="-4" y="-5" width="5" height="10" rx="1.5" fill="${C.steelDark}"/></g>
  ${screwdriver(196, 184, 0, 0.8)}
`),
);

// --- tool board strip, tiled above the footer ---------------------------------------------------
writeIllo(
  'toolstrip',
  svg(480, 64, `
  <g fill="#EBD8CB">
    <path d="M14 64V30h8v34z"/><rect x="4" y="18" width="28" height="14" rx="3"/>
    <path d="M58 64l4-46h6l4 46z"/><rect x="56" y="10" width="18" height="10" rx="2"/>
    <rect x="96" y="30" width="60" height="10" rx="2"/><path d="M96 40h60l-6 24H102z"/>
    <path d="M182 64V22a8 8 0 0 1 16 0v42z"/><path d="M178 18h24l-12-14z"/>
    <rect x="226" y="44" width="70" height="12" rx="2"/><rect x="254" y="47" width="14" height="6" rx="3" fill="#F6E7DD"/>
    <path d="M322 64l-6-30 10-2 6 32zM338 64l6-30-10-2-6 32z"/><circle cx="330" cy="26" r="8"/>
    <rect x="372" y="14" width="10" height="50" rx="3"/><rect x="364" y="8" width="26" height="12" rx="3"/>
    <path d="M420 64V36h44v28z"/><path d="M430 36v-8a4 4 0 0 1 4-4h16a4 4 0 0 1 4 4v8" fill="none" stroke="#EBD8CB" stroke-width="4"/>
  </g>
`),
);

// --- job icons: 64x64, a tinted circle and one flat object -----------------------------------------
const icon = (body) => svg(64, 64, `<circle cx="32" cy="32" r="31" fill="${C.blob}"/>${body}`);

writeIcon('furniture-assembly', icon(`
  <rect x="16" y="14" width="32" height="38" rx="2" fill="${C.wood}"/>
  <rect x="19" y="17" width="12" height="32" rx="1" fill="${C.woodPale}"/><rect x="33" y="17" width="12" height="32" rx="1" fill="${C.woodPale}"/>
  <rect x="28" y="30" width="2" height="6" rx="1" fill="${C.steelDark}"/><rect x="34" y="30" width="2" height="6" rx="1" fill="${C.steelDark}"/>
  <path d="M40 54h12v-6" stroke="${C.rust}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`));

writeIcon('wall-mounting', icon(`
  <rect x="12" y="16" width="40" height="26" rx="3" fill="${C.ink}"/>
  <rect x="15" y="19" width="34" height="20" rx="1.5" fill="#43505E"/>
  <rect x="29" y="42" width="6" height="6" fill="${C.steel}"/>
  <rect x="16" y="48" width="32" height="4" rx="2" fill="${C.rust}"/>`));

writeIcon('doors-and-locks', icon(`
  <circle cx="24" cy="26" r="11" fill="${C.yellow}"/><circle cx="24" cy="26" r="4" fill="${C.blob}"/>
  <path d="M31 33l16 16" stroke="${C.yellow}" stroke-width="6" stroke-linecap="round"/>
  <path d="M41 43l4-4M46 48l4-4" stroke="${C.yellowDark}" stroke-width="4" stroke-linecap="round"/>`));

writeIcon('silicone-and-grout', icon(`
  <rect x="12" y="12" width="40" height="28" rx="2" fill="${C.tile}"/>
  <rect x="31" y="12" width="2" height="28" fill="${C.tileLine}"/><rect x="12" y="25" width="40" height="2" fill="${C.tileLine}"/>
  <rect x="10" y="40" width="44" height="12" rx="3" fill="${C.white}" stroke="${C.line}" stroke-width="1.5"/>
  <path d="M14 41h36" stroke="${C.teal}" stroke-width="3.5" stroke-linecap="round"/>`));

writeIcon('plumbing-repairs', icon(`
  <path d="M18 30v-8h18a8 8 0 0 1 8 8v6" stroke="${C.steel}" stroke-width="8" fill="none" stroke-linecap="round"/>
  <rect x="22" y="12" width="16" height="6" rx="3" fill="${C.rust}"/><rect x="28" y="16" width="4" height="8" fill="${C.rust}"/>
  <path d="M44 42c-3 5-5 8-5 10a5 5 0 0 0 10 0c0-2-2-5-5-10z" fill="${C.water}"/>`));

writeIcon('electrical-repairs', icon(`
  <circle cx="32" cy="26" r="13" fill="${C.yellow}"/>
  <path d="M27 38h10v6H27z" fill="${C.yellowDark}"/>
  <rect x="26" y="44" width="12" height="4" rx="1.5" fill="${C.steel}"/><rect x="27" y="48" width="10" height="4" rx="1.5" fill="${C.steelDark}"/>
  <path d="M29 30l3-6 3 6" stroke="${C.cream}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`));

writeIcon('appliance-repair', icon(`
  <rect x="16" y="12" width="32" height="40" rx="4" fill="${C.white}" stroke="${C.line}" stroke-width="1.5"/>
  <rect x="16" y="12" width="32" height="8" rx="3" fill="${C.chromeLight}"/>
  <circle cx="22" cy="16" r="1.8" fill="${C.teal}"/><circle cx="42" cy="16" r="2" fill="${C.chrome}"/>
  <circle cx="32" cy="35" r="11" fill="${C.chrome}"/><circle cx="32" cy="35" r="7.5" fill="${C.steelDark}"/>
  <path d="M25 38a7.5 7.5 0 0 0 14 0z" fill="${C.water}"/>`));

writeIcon('handyman', icon(`
  <path d="M25 22v-4a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4" stroke="${C.steelDark}" stroke-width="3" fill="none"/>
  <rect x="12" y="22" width="40" height="26" rx="3" fill="${C.rust}"/>
  <rect x="12" y="22" width="40" height="8" rx="3" fill="${C.rustDark}"/>
  <rect x="28" y="27" width="8" height="6" rx="1.5" fill="${C.yellow}"/>`));

// --- favicon: a spanner on rust ----------------------------------------------------------------
writeFileSync(
  join(pub, 'favicon.svg'),
  svg(32, 32, `
  <rect width="32" height="32" rx="7" fill="${C.rust}"/>
  <g transform="translate(16 16) rotate(-45)">
    <rect x="-2.6" y="-3" width="5.2" height="16" rx="2.6" fill="${C.cream}"/>
    <path d="M-7-6a7 7 0 1 0 14 0l-3.2-1.8V-12h-7.6v4.2z" fill="${C.cream}"/>
  </g>
`),
);

console.log(`graphics written to ${illoDir}, ${iconDir} and public/favicon.svg`);
