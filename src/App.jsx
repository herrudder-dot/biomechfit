import { useState, useEffect } from "react";

// カラーパレット
const C = {
  bg: "#0f0f13",
  card: "#1a1a24",
  cardBorder: "#2a2a3a",
  text: "#f0f0f5",
  textMuted: "#a0a0b0",
  textDim: "#606070",
  accent: "#6366f1",
  accentDark: "#4f46e5",
  pink: "#ec4899",
  green: "#10b981",
  orange: "#f59e0b",
  red: "#ef4444",
  cyan: "#06b6d4",
  yellow: "#eab308"
};

// カスタムSVGアイコン
const Icons = {
  dna: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 15c6.667-6 13.333 0 20-6"/>
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/>
      <path d="M17 6l-2.5-2.5"/>
      <path d="M14 8l-3-3"/>
      <path d="M7 18l2.5 2.5"/>
      <path d="M3.5 14.5l.5.5"/>
      <path d="M20 9l.5.5"/>
      <path d="M6.5 12.5l1 1"/>
      <path d="M16.5 10.5l1 1"/>
      <path d="M10 16l-2 2"/>
    </svg>
  ),
  target: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  zap: (color = C.orange, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  mountain: (color = C.green, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
    </svg>
  ),
  wave: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
    </svg>
  ),
  crosshair: (color = C.pink, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="22" y1="12" x2="18" y2="12"/>
      <line x1="6" y1="12" x2="2" y2="12"/>
      <line x1="12" y1="6" x2="12" y2="2"/>
      <line x1="12" y1="22" x2="12" y2="18"/>
    </svg>
  ),
  foot: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/>
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/>
      <path d="M16 17h4"/>
      <path d="M4 13h4"/>
    </svg>
  ),
  rotate: (color = C.cyan, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
    </svg>
  ),
  activity: (color = C.pink, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  user: (color = C.green, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  bike: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18.5" cy="17.5" r="3.5"/>
      <circle cx="5.5" cy="17.5" r="3.5"/>
      <circle cx="15" cy="5" r="1"/>
      <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
    </svg>
  ),
  trophy: (color = C.orange, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  lock: (color = C.textDim, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  check: (color = C.green, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  alertTriangle: (color = C.orange, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  sparkles: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
      <path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>
    </svg>
  ),
  frame: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  wheel: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="8"/>
      <line x1="12" y1="16" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="8" y2="12"/>
      <line x1="16" y1="12" x2="22" y2="12"/>
    </svg>
  ),
  arrowRight: (color = C.text, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  refresh: (color = C.textDim, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
      <path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
    </svg>
  ),
  road: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2l2 18"/><path d="M19 2l-2 18"/><path d="M12 6v4"/><path d="M12 14v4"/>
    </svg>
  ),
  saddle: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="10" rx="9" ry="4"/>
      <path d="M12 14v6"/>
      <path d="M8 20h8"/>
    </svg>
  ),
  shoe: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h4l3-3 4 1 7 4v2H3z"/>
      <path d="M7 14v4"/>
    </svg>
  ),
  settings: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
};

// レーダーチャートコンポーネント
const RadarChart = ({ data, size = 200, color = C.accent }) => {
  const center = size / 2;
  const radius = size * 0.38;
  const labels = ["瞬発力", "持久力", "効率性", "適応力", "安定性"];
  const angles = labels.map((_, i) => (Math.PI * 2 * i) / labels.length - Math.PI / 2);
  
  // データポイントを計算
  const points = data.map((value, i) => {
    const r = radius * (value / 100);
    const x = center + r * Math.cos(angles[i]);
    const y = center + r * Math.sin(angles[i]);
    return { x, y };
  });
  
  // ポリゴンのパス
  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  
  // グリッド線
  const gridLevels = [20, 40, 60, 80, 100];
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 背景グリッド */}
      {gridLevels.map((level, i) => {
        const r = radius * (level / 100);
        const gridPoints = angles.map(angle => ({
          x: center + r * Math.cos(angle),
          y: center + r * Math.sin(angle)
        }));
        const path = gridPoints.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return <path key={i} d={path} fill="none" stroke={C.cardBorder} strokeWidth="1" opacity={0.5}/>;
      })}
      
      {/* 軸線 */}
      {angles.map((angle, i) => (
        <line 
          key={i}
          x1={center} 
          y1={center} 
          x2={center + radius * Math.cos(angle)} 
          y2={center + radius * Math.sin(angle)}
          stroke={C.cardBorder}
          strokeWidth="1"
          opacity={0.5}
        />
      ))}
      
      {/* データエリア */}
      <path 
        d={polygonPath} 
        fill={`${color}33`}
        stroke={color}
        strokeWidth="2"
      />
      
      {/* データポイント */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={color}/>
      ))}
      
      {/* ラベル */}
      {labels.map((label, i) => {
        const labelRadius = radius + 24;
        const x = center + labelRadius * Math.cos(angles[i]);
        const y = center + labelRadius * Math.sin(angles[i]);
        return (
          <text 
            key={i}
            x={x} 
            y={y} 
            textAnchor="middle" 
            dominantBaseline="middle"
            fill={C.textMuted}
            fontSize="11"
            fontWeight="500"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

// 質問プール
const QUESTION_POOL = [
  // 重心系（前後）
  { id: "stair_down", cat: "balance", q: "階段を降りるとき、最初に着くのは？", a: "つま先から", b: "踵から", weight: { fore: [1, 0], rear: [0, 1] } },
  { id: "stand_up", cat: "balance", q: "椅子から立ち上がるとき", a: "前に重心移動してから立つ", b: "真上にスッと立つ", weight: { fore: [1, 0], rear: [0, 1] } },
  { id: "reach_high", cat: "balance", q: "高い棚のものを取るとき", a: "つま先立ちになる", b: "踵は浮かせず腕を伸ばす", weight: { fore: [1, 0], rear: [0, 1] } },
  { id: "wait_stand", cat: "balance", q: "電車で立って待つとき、体重は？", a: "つま先〜母指球あたり", b: "踵〜足裏全体", weight: { fore: [1, 0], rear: [0, 1] } },
  { id: "pick_floor", cat: "balance", q: "床のものを拾うとき", a: "膝を曲げてしゃがむ", b: "腰を曲げて手を伸ばす", weight: { fore: [1, 0], rear: [0, 1] } },
  { id: "push_door", cat: "balance", q: "重いドアを押すとき", a: "体重を前にかけて押す", b: "腕の力で押す", weight: { fore: [1, 0], rear: [0, 1] } },
  { id: "run_start", cat: "balance", q: "走り出すとき", a: "前に倒れ込むように", b: "地面を蹴って進む", weight: { fore: [1, 0], rear: [0, 1] } },
  
  // 回旋系
  { id: "arm_cross", cat: "rotation", q: "腕を組むと自然なのは？", a: "右腕が上", b: "左腕が上", weight: { ext: [1, 0], int: [0, 1] } },
  { id: "throw_ball", cat: "rotation", q: "ボールを投げるとき、肘は？", a: "外側に開く感じ", b: "身体に近い軌道", weight: { ext: [1, 0], int: [0, 1] } },
  { id: "knee_sit", cat: "rotation", q: "床に座るとき、膝は？", a: "外に開きがち", b: "内側に入りがち", weight: { ext: [1, 0], int: [0, 1] } },
  { id: "turn_back", cat: "rotation", q: "後ろを振り返るとき", a: "肩から大きく回す", b: "首だけで見ようとする", weight: { ext: [1, 0], int: [0, 1] } },
  { id: "squat_knee", cat: "rotation", q: "スクワットすると膝は？", a: "つま先より外に開く", b: "つま先と同じか内側", weight: { ext: [1, 0], int: [0, 1] } },
  { id: "golf_swing", cat: "rotation", q: "バットやクラブを振るイメージ", a: "身体を大きく開いて振る", b: "コンパクトに振る", weight: { ext: [1, 0], int: [0, 1] } },
  
  // ペダリング特性
  { id: "bike_uphill", cat: "cadence", q: "自転車で坂道を登るとき", a: "軽いギアでクルクル回す", b: "重いギアでグイグイ踏む", weight: { high: [1, 0], low: [0, 1] } },
  { id: "walk_pace", cat: "cadence", q: "歩くペースは？", a: "小股で速く", b: "大股でゆったり", weight: { high: [1, 0], low: [0, 1] } },
  { id: "run_style", cat: "cadence", q: "走るときのイメージ", a: "ピッチを上げて軽快に", b: "ストライドを伸ばして力強く", weight: { high: [1, 0], low: [0, 1] } },
  { id: "stair_up", cat: "cadence", q: "階段を登るとき", a: "一段ずつテンポよく", b: "二段飛ばしもあり", weight: { high: [1, 0], low: [0, 1] } },
  { id: "music_tempo", cat: "cadence", q: "運動するときの音楽は？", a: "BPM高めが好き", b: "ゆったりめでも集中できる", weight: { high: [1, 0], low: [0, 1] } },
  
  // 姿勢傾向
  { id: "desk_posture", cat: "posture", q: "デスクワーク中の姿勢", a: "背もたれに寄りかかる", b: "前のめりになりがち", weight: { open: [1, 0], forward: [0, 1] } },
  { id: "breath_feel", cat: "posture", q: "深呼吸するとき楽なのは", a: "胸を開いて吸う", b: "お腹を膨らませて吸う", weight: { open: [1, 0], forward: [0, 1] } },
  { id: "sleep_position", cat: "posture", q: "寝るとき楽な姿勢", a: "仰向けが多い", b: "横向き・うつ伏せが多い", weight: { open: [1, 0], forward: [0, 1] } },
  { id: "shoulder_relax", cat: "posture", q: "肩の力を抜くと", a: "後ろに引く感じ", b: "前に落ちる感じ", weight: { open: [1, 0], forward: [0, 1] } },
  
  // 筋肉優位性
  { id: "leg_power", cat: "muscle", q: "脚のどこが疲れやすい？", a: "太ももの前", b: "太ももの裏・お尻", weight: { quad: [1, 0], ham: [0, 1] } },
  { id: "jump_land", cat: "muscle", q: "ジャンプの着地で使うのは", a: "膝のクッション", b: "足首のクッション", weight: { quad: [1, 0], ham: [0, 1] } },
  { id: "sprint_feel", cat: "muscle", q: "全力ダッシュ後に張るのは", a: "太ももの前側", b: "お尻〜もも裏", weight: { quad: [1, 0], ham: [0, 1] } },
  
  // 身体意識
  { id: "body_aware", cat: "awareness", q: "運動中に意識するのは", a: "動かしている部分", b: "全体のバランス", weight: { local: [1, 0], global: [0, 1] } },
  { id: "learn_move", cat: "awareness", q: "新しい動きを覚えるとき", a: "部分から組み立てる", b: "全体の流れを掴む", weight: { local: [1, 0], global: [0, 1] } },
  { id: "stretch_pref", cat: "awareness", q: "ストレッチで気持ちいいのは", a: "一箇所をじっくり伸ばす", b: "全身を動かしながら伸ばす", weight: { local: [1, 0], global: [0, 1] } },
];

// 精度レベル
const ACCURACY_LEVELS = [
  { min: 0, label: "未診断", stars: 0, color: C.textDim },
  { min: 5, label: "おおまか", stars: 1, color: C.textMuted },
  { min: 10, label: "ある程度", stars: 2, color: C.orange },
  { min: 15, label: "かなり正確", stars: 3, color: C.green },
  { min: 20, label: "高精度", stars: 4, color: C.accent },
  { min: 30, label: "完全解析", stars: 5, color: C.pink },
];

// タイプ定義
const TYPE_INFO = {
  A1: {
    name: "パワースプリンター",
    sub: "前足部重心 × 外旋",
    icon: "zap",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
    traits: ["瞬発力が高い", "つま先で地面を捉える", "膝が外に開きやすい"],
    cycling: "高回転でスパッと加速するタイプ。ダンシングが得意。",
    strengths: ["スプリント", "アタック", "短い登り"],
    weaknesses: ["長時間の一定ペース", "向かい風"],
    radarData: [95, 45, 60, 55, 50],
    equipment: {
      frameMaterial: { name: "カーボン（高剛性）", reason: "瞬発的なパワー伝達に最適" },
      frameType: { name: "エアロロード", reason: "スプリント時の空力性能を重視" },
      wheels: { name: "50mm〜ディープリム", reason: "加速後の巡航速度維持に有利" },
      examples: ["Specialized S-Works Tarmac SL8", "Cervélo S5", "Giant Propel"]
    },
    guide: {
      hillclimb: {
        title: "ヒルクライムの走り方",
        tips: ["序盤は抑えめに、後半に向けて上げる", "ダンシングを積極的に使う（30秒〜1分ごと）", "勾配がキツい区間でリズムよくアタック", "ケイデンスは80-90rpmをキープ"],
        avoid: "序盤から飛ばしすぎない。持久力勝負に持ち込まれると不利。"
      },
      longride: {
        title: "ロングライドの走り方",
        tips: ["平坦区間ではドラフティングを活用", "定期的にダンシングで筋肉をほぐす", "補給は早め早めに（空腹を感じる前に）", "後半に向けて脚を残す意識"],
        avoid: "気持ちよくて飛ばしすぎない。前半はグッと我慢。"
      },
      race: {
        title: "レースでの走り方",
        tips: ["勝負所まで脚を温存", "ラスト1kmからのスプリントが武器", "逃げには乗らず、集団でコントロール"],
        avoid: "長い逃げに乗ると消耗戦で不利。"
      },
      criterium: {
        title: "クリテリウムの走り方",
        tips: ["コーナー立ち上がりの加速で前に出る", "インターバル耐性を活かす", "最終周回に向けてポジションを上げる"],
        avoid: "中盤で無駄足を使わない。"
      },
      tt: {
        title: "タイムトライアルの走り方",
        tips: ["前半抑えめ、後半ビルドアップ", "ペダリングの無駄を省く"],
        avoid: "完全イーブンペースは苦手。"
      }
    }
  },
  A2: {
    name: "グラインダー",
    sub: "踵重心 × 外旋",
    icon: "mountain",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    traits: ["持久力が高い", "踵でしっかり踏める", "下半身が安定"],
    cycling: "重いギアでグイグイ進むタイプ。ヒルクライムが得意。",
    strengths: ["ロングライド", "ヒルクライム", "一定ペース維持"],
    weaknesses: ["急加速", "スプリント勝負"],
    radarData: [50, 95, 70, 65, 85],
    equipment: {
      frameMaterial: { name: "カーボン（軽量）", reason: "登りでの軽さを重視" },
      frameType: { name: "軽量クライミング", reason: "長い登りでのアドバンテージ" },
      wheels: { name: "30-40mmミドルハイト", reason: "軽さと空力のバランス" },
      examples: ["Trek Émonda SLR", "Specialized Aethos", "Scott Addict RC"]
    },
    guide: {
      hillclimb: {
        title: "ヒルクライムの走り方",
        tips: ["最初から自分のペースを刻む", "重めのギアでトルクをかけて登る", "シッティング中心で体力を温存", "ケイデンスは70-80rpmでOK"],
        avoid: "周りのペースに惑わされない。アタックには反応しすぎない。"
      },
      longride: {
        title: "ロングライドの走り方",
        tips: ["イーブンペースを維持", "向かい風区間では先頭を引く", "心拍数を見ながらペース管理", "エネルギー切れしにくいのが強み"],
        avoid: "速い人についていこうとしすぎない。自分のリズムを守る。"
      },
      race: {
        title: "レースでの走り方",
        tips: ["長い登りで勝負をかける", "早めに仕掛けて独走に持ち込む", "消耗戦に持ち込めば有利"],
        avoid: "ゴール前スプリントに持ち込まれると不利。"
      },
      criterium: {
        title: "クリテリウムの走り方",
        tips: ["集団内で脚を溜める", "逃げが決まりそうなら乗る"],
        avoid: "コーナーの加速合戦は苦手。"
      },
      tt: {
        title: "タイムトライアルの走り方",
        tips: ["完全イーブンペースが最強", "パワーメーターを見て出力管理"],
        avoid: "後半に上げようとしない。最初から出し切る。"
      }
    }
  },
  A3: {
    name: "スムースペダラー",
    sub: "前足部重心 × 内旋",
    icon: "wave",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
    traits: ["動きが滑らか", "内股傾向", "リズム感がいい"],
    cycling: "綺麗な円運動でロスなく回すタイプ。効率がいい。",
    strengths: ["ペダリング効率", "平地巡航", "集団走行"],
    weaknesses: ["ダンシング", "急な地形変化"],
    radarData: [55, 70, 95, 75, 70],
    equipment: {
      frameMaterial: { name: "カーボン（バランス型）", reason: "効率的なペダリングを活かす" },
      frameType: { name: "エンデュランス / オールラウンド", reason: "長時間のライドでの快適性" },
      wheels: { name: "40-50mmミドルディープ", reason: "巡航効率を最大化" },
      examples: ["Canyon Ultimate", "Cannondale SuperSix EVO", "BMC Teammachine"]
    },
    guide: {
      hillclimb: {
        title: "ヒルクライムの走り方",
        tips: ["シッティングメインで効率よく", "高回転（90rpm+）を維持", "勾配が変わっても同じリズムをキープ", "軽いギアでクルクル回す"],
        avoid: "無理にダンシングしない。シッティングが武器。"
      },
      longride: {
        title: "ロングライドの走り方",
        tips: ["一定のケイデンスを維持", "集団走行でドラフティングを最大活用", "無駄な動きを省いてエネルギー節約"],
        avoid: "ペースの上げ下げに付き合いすぎない。"
      },
      race: {
        title: "レースでの走り方",
        tips: ["集団内で脚を溜める", "逃げには乗らず、集団ゴールスプリント狙い", "効率の良さを活かして消耗を抑える"],
        avoid: "単独での逃げは不向き。"
      },
      criterium: {
        title: "クリテリウムの走り方",
        tips: ["コーナーを滑らかにクリア", "集団内のポジションキープ"],
        avoid: "急加速勝負は避ける。"
      },
      tt: {
        title: "タイムトライアルの走り方",
        tips: ["高回転でエアロポジション維持", "ペダリング効率を最大化"],
        avoid: "低ケイデンスに落とさない。"
      }
    }
  },
  B2: {
    name: "オールラウンダー",
    sub: "踵重心 × 内旋",
    icon: "crosshair",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899, #db2777)",
    traits: ["バランス型", "適応力が高い", "安定感がある"],
    cycling: "どんな状況にも対応できる万能タイプ。",
    strengths: ["適応力", "安定感", "レース全般"],
    weaknesses: ["突出した武器がない（逆に強み）"],
    radarData: [70, 75, 75, 95, 80],
    equipment: {
      frameMaterial: { name: "カーボン（オールラウンド）", reason: "あらゆる状況に対応" },
      frameType: { name: "オールラウンドレース", reason: "どんなコースでも高いパフォーマンス" },
      wheels: { name: "40-50mm汎用性重視", reason: "状況を選ばない万能性" },
      examples: ["Pinarello Dogma F", "Colnago V4Rs", "Factor O2 VAM"]
    },
    guide: {
      hillclimb: {
        title: "ヒルクライムの走り方",
        tips: ["状況に応じてシッティングとダンシングを使い分け", "周りの動きを見ながら対応", "勾配に合わせてギアとケイデンスを調整"],
        avoid: "どっちつかずにならないよう、判断は早めに。"
      },
      longride: {
        title: "ロングライドの走り方",
        tips: ["集団の中で臨機応変に動く", "先頭交代にも積極的に参加", "状況に応じてペースメーカーにも"],
        avoid: "周りに合わせすぎて自分を見失わない。"
      },
      race: {
        title: "レースでの走り方",
        tips: ["展開を読んで動く", "どの局面でも戦える強みを活かす", "最後まで選択肢を残す"],
        avoid: "早めに決め打ちしすぎない。"
      },
      criterium: {
        title: "クリテリウムの走り方",
        tips: ["様々な局面に対応", "集団内で安定したポジションキープ"],
        avoid: "無駄な動きで消耗しない。"
      },
      tt: {
        title: "タイムトライアルの走り方",
        tips: ["自分に合ったペース配分を見つける", "フォームとパワーのバランス重視"],
        avoid: "極端な戦略は避ける。"
      }
    }
  },
};

// UIコンポーネント
const Card = ({ children, style = {} }) => (
  <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: 20, ...style }}>
    {children}
  </div>
);

// 星評価コンポーネント
const StarRating = ({ stars, maxStars = 5, color = C.accent, size = 14 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: maxStars }, (_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < stars ? color : C.cardBorder} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

export default function App() {
  const [mode, setMode] = useState("start");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skipped, setSkipped] = useState(new Set());
  const [scores, setScores] = useState({
    fore: 0, rear: 0, ext: 0, int: 0, high: 0, low: 0, open: 0, forward: 0, quad: 0, ham: 0, local: 0, global: 0,
  });
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [result, setResult] = useState(null);
  const [isPro, setIsPro] = useState(false);
  
  useEffect(() => {
    const shuffled = [...QUESTION_POOL].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);
  
  const getAccuracyLevel = () => {
    const count = Object.keys(answers).length;
    let level = ACCURACY_LEVELS[0];
    for (const l of ACCURACY_LEVELS) {
      if (count >= l.min) level = l;
    }
    return { ...level, count };
  };
  
  const handleAnswer = (choice) => {
    const q = questions[currentIndex];
    const newAnswers = { ...answers, [q.id]: choice };
    setAnswers(newAnswers);
    
    const newScores = { ...scores };
    Object.entries(q.weight).forEach(([key, values]) => {
      newScores[key] = (newScores[key] || 0) + values[choice === "a" ? 0 : 1];
    });
    setScores(newScores);
    
    setShowingAnswer(true);
    setTimeout(() => {
      setShowingAnswer(false);
      goToNext();
    }, 250);
  };
  
  const handleSkip = () => {
    const q = questions[currentIndex];
    setSkipped(prev => new Set([...prev, q.id]));
    setShowingAnswer(true);
    setTimeout(() => {
      setShowingAnswer(false);
      goToNext();
    }, 200);
  };
  
  const goToNext = () => {
    // 次の未回答・未スキップの質問を探す
    let next = currentIndex + 1;
    while (next < questions.length && (answers[questions[next]?.id] || skipped.has(questions[next]?.id))) {
      next++;
    }
    if (next < questions.length) {
      setCurrentIndex(next);
    }
  };
  
  // 残り質問数
  const remainingQuestions = questions.filter(q => !answers[q.id] && !skipped.has(q.id)).length;
  const isAllDone = remainingQuestions === 0;
  
  // セットアップを動的に生成（タイプ + APA）
  const generateSetup = (type, cadence, posture) => {
    // ベース設定（4スタンスタイプ別）
    const baseSetup = {
      A1: { // 前足部×外旋
        saddle: {
          heightBase: "やや高め",
          heightCoef: "0.885〜0.890",
          fore_aft: "やや前寄り",
          fore_aftDetail: "膝がペダル軸より1-2cm前",
          tilt: "水平〜わずかに前下がり",
        },
        cleat: {
          position: "やや深め（踵寄り）",
          positionDetail: "母指球より3-5mm踵側",
          angle: "外向き",
          angleDetail: "5-10°外旋方向",
          floatBase: "少なめ",
        }
      },
      A2: { // 踵×外旋
        saddle: {
          heightBase: "標準〜やや低め",
          heightCoef: "0.875〜0.883",
          fore_aft: "やや後ろ寄り",
          fore_aftDetail: "膝がペダル軸の真上〜少し後ろ",
          tilt: "水平",
        },
        cleat: {
          position: "浅め（つま先寄り）",
          positionDetail: "母指球の真下〜やや前",
          angle: "外向き",
          angleDetail: "5-10°外旋方向",
          floatBase: "少なめ",
        }
      },
      A3: { // 前足部×内旋
        saddle: {
          heightBase: "標準〜やや高め",
          heightCoef: "0.883〜0.888",
          fore_aft: "中央〜やや前寄り",
          fore_aftDetail: "膝がペダル軸の真上〜少し前",
          tilt: "水平",
        },
        cleat: {
          position: "やや深め（踵寄り）",
          positionDetail: "母指球より2-4mm踵側",
          angle: "内向き",
          angleDetail: "3-8°内旋方向",
          floatBase: "あり",
        }
      },
      B2: { // 踵×内旋
        saddle: {
          heightBase: "標準",
          heightCoef: "0.880〜0.885",
          fore_aft: "中央",
          fore_aftDetail: "膝がペダル軸の真上",
          tilt: "水平",
        },
        cleat: {
          position: "標準",
          positionDetail: "母指球の真下",
          angle: "やや内向き",
          angleDetail: "2-5°内旋方向",
          floatBase: "中程度",
        }
      }
    };
    
    const base = baseSetup[type];
    
    // APA調整（ケイデンス）
    const cadenceAdj = {
      saddle: cadence === "high" 
        ? { adj: "+2〜4mm", reason: "高回転時の足首の可動域を確保" }
        : { adj: "−1〜2mm", reason: "踏み込み時の安定性を重視" },
      cleat: cadence === "high"
        ? { floatAdj: "多め（4-6°）", reason: "スムーズな回転を妨げない" }
        : { floatAdj: "少なめ〜固定", reason: "パワー伝達を優先" }
    };
    
    // APA調整（姿勢）
    const postureAdj = {
      saddle: posture === "open"
        ? { tiltAdj: "水平〜やや後ろ上がり", reason: "骨盤を立てやすく" }
        : { tiltAdj: "水平〜やや前下がり", reason: "深い前傾を取りやすく" },
      fore_aft: posture === "open"
        ? { adj: "やや後ろ寄りに", reason: "上体を起こしやすく" }
        : { adj: "やや前寄りに", reason: "前傾姿勢をサポート" }
    };
    
    return {
      saddle: {
        height: base.saddle.heightBase,
        heightDetail: `股下×${base.saddle.heightCoef}を目安に`,
        heightAPA: cadenceAdj.saddle.adj,
        heightAPAReason: cadenceAdj.saddle.reason,
        fore_aft: base.saddle.fore_aft,
        fore_aftDetail: base.saddle.fore_aftDetail,
        fore_aftAPA: postureAdj.fore_aft.adj,
        fore_aftAPAReason: postureAdj.fore_aft.reason,
        tilt: base.saddle.tilt,
        tiltAPA: postureAdj.saddle.tiltAdj,
        tiltAPAReason: postureAdj.saddle.reason,
      },
      cleat: {
        position: base.cleat.position,
        positionDetail: base.cleat.positionDetail,
        angle: base.cleat.angle,
        angleDetail: base.cleat.angleDetail,
        float: base.cleat.floatBase,
        floatAPA: cadenceAdj.cleat.floatAdj,
        floatAPAReason: cadenceAdj.cleat.reason,
      }
    };
  };

  const calculateResult = () => {
    const isFore = scores.fore > scores.rear;
    const isExt = scores.ext > scores.int;
    
    let type;
    if (isFore && isExt) type = "A1";
    else if (!isFore && isExt) type = "A2";
    else if (isFore && !isExt) type = "A3";
    else type = "B2";
    
    const cadence = scores.high > scores.low ? "high" : "low";
    const posture = scores.open > scores.forward ? "open" : "forward";
    
    // セットアップを動的に生成
    const setup = generateSetup(type, cadence, posture);
    
    setResult({
      type,
      typeInfo: TYPE_INFO[type],
      cadence,
      posture,
      setup,
      scores: { ...scores },
      answerCount: Object.keys(answers).length
    });
    setMode("result");
  };
  
  // スタート画面
  if (mode === "start") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, padding: "24px 16px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "inline-flex", padding: 16, borderRadius: 20, background: `${C.accent}15`, marginBottom: 16 }}>
              {Icons.dna(C.accent, 48)}
            </div>
            <h1 style={{ color: C.text, fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>
              BiomechFit
            </h1>
            <p style={{ color: C.accent, fontSize: 14, fontWeight: 600, margin: "0 0 16px" }}>
              身体特性診断
            </p>
            <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.7 }}>
              いくつかの質問に答えるだけで、<br/>
              あなたの<span style={{ color: C.text, fontWeight: 600 }}>身体の特性</span>がわかります。
            </p>
          </div>
          
          <Card>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                {Icons.target(C.accent, 20)}
                <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>診断でわかること</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: Icons.foot(C.cyan, 22), label: "重心タイプ", desc: "前足部 or 踵" },
                { icon: Icons.rotate(C.pink, 22), label: "回旋傾向", desc: "外旋 or 内旋" },
                { icon: Icons.activity(C.orange, 22), label: "ペダリング特性", desc: "高回転 or トルク" },
                { icon: Icons.user(C.green, 22), label: "姿勢傾向", desc: "胸開き or 前傾" },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 12, background: "#0a0e1a", borderRadius: 10, padding: 12 }}>
                  {item.icon}
                  <div>
                    <p style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{item.label}</p>
                    <p style={{ color: C.textDim, fontSize: 12, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <Card style={{ marginTop: 16, background: `linear-gradient(135deg, ${C.accent}12, ${C.pink}08)`, border: `1px solid ${C.accent}25` }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 8px" }}>
                質問に答えるほど精度が上がります
              </p>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
                <StarRating stars={3} color={C.accent} size={18} />
              </div>
              <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
                最低5問〜 / 20問で高精度 / いつでも結果を見れます
              </p>
            </div>
          </Card>
          
          <button
            onClick={() => setMode("quiz")}
            style={{
              width: "100%", marginTop: 24, padding: "16px", borderRadius: 12, border: "none",
              background: `linear-gradient(135deg, ${C.accent}, ${C.accentDark})`,
              color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}
          >
            診断をはじめる {Icons.arrowRight("#fff", 18)}
          </button>
        </div>
      </div>
    );
  }
  
  // クイズ画面
  if (mode === "quiz" && questions.length > 0) {
    const q = questions[currentIndex];
    const accuracy = getAccuracyLevel();
    const progress = Math.min(100, (accuracy.count / 30) * 100);
    const canShowResult = accuracy.count >= 5;
    
    // 全問終了時
    if (isAllDone && canShowResult) {
      return (
        <div style={{ minHeight: "100vh", background: C.bg, padding: "24px 16px" }}>
          <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
            <div style={{ marginBottom: 32, paddingTop: 40 }}>
              <div style={{ display: "inline-flex", padding: 20, borderRadius: "50%", background: `${C.green}15`, marginBottom: 20 }}>
                {Icons.sparkles(C.green, 56)}
              </div>
              <h2 style={{ color: C.text, fontSize: 24, fontWeight: 800, margin: "0 0 8px" }}>
                診断完了！
              </h2>
              <p style={{ color: C.textMuted, fontSize: 15, margin: 0 }}>
                全{QUESTION_POOL.length}問中 {accuracy.count}問に回答しました
              </p>
            </div>
            
            <Card>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                <StarRating stars={accuracy.stars} color={accuracy.color} size={24} />
              </div>
              <p style={{ color: accuracy.color, fontSize: 18, fontWeight: 700, margin: "0 0 4px" }}>{accuracy.label}</p>
              <p style={{ color: C.textDim, fontSize: 13, margin: 0 }}>
                この精度であなたのタイプを診断しました
              </p>
            </Card>
            
            <button
              onClick={calculateResult}
              style={{
                width: "100%", marginTop: 24, padding: "16px", borderRadius: 12, border: "none",
                background: `linear-gradient(135deg, ${C.accent}, ${C.pink})`,
                color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}
            >
              {Icons.sparkles("#fff", 20)} 結果を見る
            </button>
          </div>
        </div>
      );
    }
    
    // 通常のクイズ画面
    if (!q) {
      calculateResult();
      return null;
    }
    
    const catInfo = {
      balance: { icon: Icons.foot(C.cyan, 16), label: "重心" },
      rotation: { icon: Icons.rotate(C.pink, 16), label: "回旋" },
      cadence: { icon: Icons.activity(C.orange, 16), label: "ペダリング" },
      posture: { icon: Icons.user(C.green, 16), label: "姿勢" },
      muscle: { icon: Icons.zap(C.yellow, 16), label: "筋肉" },
      awareness: { icon: Icons.target(C.accent, 16), label: "感覚" },
    };
    const cat = catInfo[q.cat] || catInfo.awareness;
    
    return (
      <div style={{ minHeight: "100vh", background: C.bg, padding: "24px 16px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {/* 精度メーター */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: C.text, fontSize: 14, fontWeight: 700 }}>精度</span>
                <StarRating stars={accuracy.stars} color={accuracy.color} size={14} />
              </div>
              <span style={{ color: accuracy.color, fontSize: 13, fontWeight: 600 }}>{accuracy.label}</span>
            </div>
            
            <div style={{ width: "100%", height: 6, background: C.card, borderRadius: 3, overflow: "hidden" }}>
              <div style={{
                width: `${progress}%`, height: "100%",
                background: `linear-gradient(90deg, ${C.accent}, ${C.pink})`,
                borderRadius: 3, transition: "width 0.5s ease"
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>回答: {accuracy.count}</p>
              <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>残り: {remainingQuestions}</p>
            </div>
          </div>
          
          {/* 質問カード */}
          <Card style={{ 
            transform: showingAnswer ? "scale(0.98)" : "scale(1)",
            opacity: showingAnswer ? 0.8 : 1,
            transition: "all 0.2s ease"
          }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <span style={{ 
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "#0a0e1a", padding: "6px 12px", borderRadius: 20, marginBottom: 16
              }}>
                {cat.icon}
                <span style={{ color: C.textMuted, fontSize: 12, fontWeight: 500 }}>{cat.label}</span>
              </span>
              <p style={{ color: C.text, fontSize: 18, fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
                {q.q}
              </p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["a", "b"].map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleAnswer(choice)}
                  style={{
                    width: "100%", padding: "16px 20px", borderRadius: 12,
                    border: `2px solid ${C.cardBorder}`, background: "#0a0e1a",
                    color: C.text, fontSize: 15, fontWeight: 500, cursor: "pointer",
                    textAlign: "left", transition: "all 0.2s"
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = choice === "a" ? C.accent : C.pink; e.currentTarget.style.background = choice === "a" ? `${C.accent}11` : `${C.pink}11`; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = C.cardBorder; e.currentTarget.style.background = "#0a0e1a"; }}
                >
                  <span style={{ color: choice === "a" ? C.accent : C.pink, fontWeight: 700, marginRight: 8 }}>
                    {choice.toUpperCase()}.
                  </span>
                  {q[choice]}
                </button>
              ))}
              
              <button
                onClick={handleSkip}
                style={{
                  width: "100%", padding: "12px", borderRadius: 10, border: "none",
                  background: "transparent", color: C.textDim, fontSize: 13, cursor: "pointer", marginTop: 4
                }}
              >
                ピンとこない、スキップ →
              </button>
            </div>
          </Card>
          
          {/* 結果を見るボタン */}
          <div style={{ marginTop: 24 }}>
            {canShowResult ? (
              <button
                onClick={calculateResult}
                style={{
                  width: "100%", padding: "14px", borderRadius: 12,
                  border: `1px solid ${C.accent}`, background: "transparent",
                  color: C.accent, fontSize: 14, fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8
                }}
              >
                {Icons.sparkles(C.accent, 16)} この精度で結果を見る
              </button>
            ) : (
              <p style={{ color: C.textDim, fontSize: 13, textAlign: "center" }}>
                あと{5 - accuracy.count}問で結果が見れます
              </p>
            )}
          </div>
          
          <p style={{ color: C.textDim, fontSize: 11, textAlign: "center", marginTop: 16 }}>
            直感で答えてください。正解・不正解はありません。
          </p>
        </div>
      </div>
    );
  }
  
  // 結果画面
  if (mode === "result" && result) {
    const accuracy = getAccuracyLevel();
    const { type, typeInfo, cadence, posture } = result;
    const TypeIcon = Icons[typeInfo.icon];
    
    return (
      <div style={{ minHeight: "100vh", background: C.bg, padding: "24px 16px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {/* タイプカード */}
          <Card style={{ textAlign: "center", background: `linear-gradient(135deg, ${typeInfo.color}12, ${typeInfo.color}05)`, border: `1px solid ${typeInfo.color}33` }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
              <StarRating stars={accuracy.stars} color={accuracy.color} size={16} />
            </div>
            <p style={{ color: C.textDim, fontSize: 12, margin: "0 0 16px" }}>{accuracy.label}（{result.answerCount}問回答）</p>
            
            <div style={{ display: "inline-flex", padding: 20, borderRadius: "50%", background: typeInfo.gradient, marginBottom: 16 }}>
              {TypeIcon && TypeIcon("#fff", 48)}
            </div>
            
            <h2 style={{ color: typeInfo.color, fontSize: 28, fontWeight: 800, margin: "0 0 4px" }}>
              {typeInfo.name}
            </h2>
            <p style={{ color: C.textMuted, fontSize: 14, margin: "0 0 16px" }}>
              {typeInfo.sub}
            </p>
            <p style={{ color: C.text, fontSize: 15, lineHeight: 1.7, margin: 0 }}>
              {typeInfo.cycling}
            </p>
          </Card>
          
          {/* レーダーチャート */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.target(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>能力バランス</p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadarChart data={typeInfo.radarData} size={220} color={typeInfo.color} />
            </div>
          </Card>
          
          {/* 特性 */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.check(C.green, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>あなたの特性</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {typeInfo.traits.map((trait, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#0a0e1a", borderRadius: 10, padding: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: typeInfo.color }} />
                  <p style={{ color: C.text, fontSize: 14, margin: 0 }}>{trait}</p>
                </div>
              ))}
            </div>
          </Card>
          
          {/* ペダリング特性 */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.activity(C.pink, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>ペダリング傾向</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "#0a0e1a", borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ marginBottom: 8 }}>{cadence === "high" ? Icons.rotate(C.cyan, 28) : Icons.zap(C.orange, 28)}</div>
                <p style={{ color: cadence === "high" ? C.cyan : C.orange, fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>
                  {cadence === "high" ? "高回転型" : "トルク型"}
                </p>
                <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
                  {cadence === "high" ? "90rpm+が得意" : "重いギアでグイグイ"}
                </p>
              </div>
              <div style={{ background: "#0a0e1a", borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ marginBottom: 8 }}>{posture === "open" ? Icons.user(C.green, 28) : Icons.bike(C.accent, 28)}</div>
                <p style={{ color: posture === "open" ? C.green : C.accent, fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>
                  {posture === "open" ? "胸開きタイプ" : "前傾タイプ"}
                </p>
                <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
                  {posture === "open" ? "アップライト気味" : "エアロ姿勢向き"}
                </p>
              </div>
            </div>
          </Card>
          
          {/* 得意・苦手 */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.trophy(C.orange, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>得意 & 苦手</p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                {Icons.check(C.green, 14)}
                <p style={{ color: C.green, fontSize: 13, fontWeight: 600, margin: 0 }}>得意なこと</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {typeInfo.strengths.map((s, i) => (
                  <span key={i} style={{ background: `${C.green}18`, color: C.green, fontSize: 13, padding: "6px 12px", borderRadius: 20 }}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                {Icons.alertTriangle(C.orange, 14)}
                <p style={{ color: C.orange, fontSize: 13, fontWeight: 600, margin: 0 }}>苦手になりやすい</p>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {typeInfo.weaknesses.map((w, i) => (
                  <span key={i} style={{ background: `${C.orange}18`, color: C.orange, fontSize: 13, padding: "6px 12px", borderRadius: 20 }}>{w}</span>
                ))}
              </div>
            </div>
          </Card>
          
          {/* 機材レコメンド */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.bike(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>おすすめ機材</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* フレーム素材 */}
              <div style={{ background: "#0a0e1a", borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  {Icons.frame(C.accent, 18)}
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>フレーム素材</p>
                </div>
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{typeInfo.equipment.frameMaterial.name}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>{typeInfo.equipment.frameMaterial.reason}</p>
              </div>
              
              {/* フレームタイプ */}
              <div style={{ background: "#0a0e1a", borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  {Icons.bike(C.pink, 18)}
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>フレームタイプ</p>
                </div>
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{typeInfo.equipment.frameType.name}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>{typeInfo.equipment.frameType.reason}</p>
              </div>
              
              {/* ホイール */}
              <div style={{ background: "#0a0e1a", borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  {Icons.wheel(C.cyan, 18)}
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>ホイール</p>
                </div>
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{typeInfo.equipment.wheels.name}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>{typeInfo.equipment.wheels.reason}</p>
              </div>
              
              {/* おすすめモデル */}
              <div style={{ background: `${typeInfo.color}10`, border: `1px solid ${typeInfo.color}25`, borderRadius: 12, padding: 14 }}>
                <p style={{ color: typeInfo.color, fontSize: 12, fontWeight: 600, margin: "0 0 8px" }}>おすすめモデル</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {typeInfo.equipment.examples.map((ex, i) => (
                    <p key={i} style={{ color: C.text, fontSize: 13, margin: 0 }}>• {ex}</p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          
          {/* セットアップガイド */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              {Icons.settings(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>セットアップガイド</p>
            </div>
            <p style={{ color: C.textDim, fontSize: 12, margin: "0 0 16px" }}>
              {typeInfo.name}（{type}）× {cadence === "high" ? "高回転型" : "トルク型"} × {posture === "open" ? "胸開き" : "前傾"}
            </p>
            
            {/* サドル設定 */}
            <div style={{ background: "#0a0e1a", borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                {Icons.saddle(C.orange, 20)}
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0 }}>サドル設定</p>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* 高さ */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>高さ</p>
                    <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: 0 }}>{result.setup.saddle.height}</p>
                  </div>
                  <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 6px" }}>{result.setup.saddle.heightDetail}</p>
                  <div style={{ background: `${cadence === "high" ? C.cyan : C.orange}15`, borderRadius: 6, padding: "6px 10px" }}>
                    <p style={{ color: cadence === "high" ? C.cyan : C.orange, fontSize: 11, margin: 0 }}>
                      <span style={{ fontWeight: 700 }}>APA調整: {result.setup.saddle.heightAPA}</span> — {result.setup.saddle.heightAPAReason}
                    </p>
                  </div>
                </div>
                
                {/* 前後位置 */}
                <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>前後位置</p>
                    <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: 0 }}>{result.setup.saddle.fore_aft}</p>
                  </div>
                  <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 6px" }}>{result.setup.saddle.fore_aftDetail}</p>
                  <div style={{ background: `${posture === "open" ? C.green : C.accent}15`, borderRadius: 6, padding: "6px 10px" }}>
                    <p style={{ color: posture === "open" ? C.green : C.accent, fontSize: 11, margin: 0 }}>
                      <span style={{ fontWeight: 700 }}>APA調整: {result.setup.saddle.fore_aftAPA}</span> — {result.setup.saddle.fore_aftAPAReason}
                    </p>
                  </div>
                </div>
                
                {/* 角度 */}
                <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>角度</p>
                    <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: 0 }}>{result.setup.saddle.tilt}</p>
                  </div>
                  <div style={{ background: `${posture === "open" ? C.green : C.accent}15`, borderRadius: 6, padding: "6px 10px" }}>
                    <p style={{ color: posture === "open" ? C.green : C.accent, fontSize: 11, margin: 0 }}>
                      <span style={{ fontWeight: 700 }}>APA調整: {result.setup.saddle.tiltAPA}</span> — {result.setup.saddle.tiltAPAReason}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* クリート設定 */}
            <div style={{ background: "#0a0e1a", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                {Icons.shoe(C.cyan, 20)}
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0 }}>クリート設定</p>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {/* 前後位置 */}
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>前後位置</p>
                    <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: 0 }}>{result.setup.cleat.position}</p>
                  </div>
                  <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>{result.setup.cleat.positionDetail}</p>
                </div>
                
                {/* 角度 */}
                <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>角度</p>
                    <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: 0 }}>{result.setup.cleat.angle}</p>
                  </div>
                  <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>{result.setup.cleat.angleDetail}</p>
                </div>
                
                {/* フロート */}
                <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>フロート</p>
                    <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: 0 }}>{result.setup.cleat.float}</p>
                  </div>
                  <div style={{ background: `${cadence === "high" ? C.cyan : C.orange}15`, borderRadius: 6, padding: "6px 10px" }}>
                    <p style={{ color: cadence === "high" ? C.cyan : C.orange, fontSize: 11, margin: 0 }}>
                      <span style={{ fontWeight: 700 }}>APA調整: {result.setup.cleat.floatAPA}</span> — {result.setup.cleat.floatAPAReason}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 注意書き */}
            <div style={{ background: `${C.orange}10`, border: `1px solid ${C.orange}25`, borderRadius: 10, padding: 12, marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                {Icons.alertTriangle(C.orange, 16)}
                <p style={{ color: C.orange, fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                  これはタイプ×APA特性の組み合わせから算出した目安です。違和感や痛みがある場合は、プロのフィッターに相談してください。調整は少しずつ（2-3mm）行いましょう。
                </p>
              </div>
            </div>
          </Card>
          
          {/* 走り方ガイド - 無料 */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.road(C.green, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>走り方ガイド</p>
            </div>
            
            {/* ヒルクライム */}
            <div style={{ background: "#0a0e1a", borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                {Icons.mountain(C.green, 20)}
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0 }}>{typeInfo.guide.hillclimb.title}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                {typeInfo.guide.hillclimb.tips.map((tip, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    {Icons.check(C.green, 14)}
                    <p style={{ color: C.textMuted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{tip}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: `${C.orange}12`, borderRadius: 8, padding: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  {Icons.alertTriangle(C.orange, 14)}
                  <p style={{ color: C.orange, fontSize: 12, margin: 0 }}>{typeInfo.guide.hillclimb.avoid}</p>
                </div>
              </div>
            </div>
            
            {/* ロングライド */}
            <div style={{ background: "#0a0e1a", borderRadius: 12, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                {Icons.road(C.accent, 20)}
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0 }}>{typeInfo.guide.longride.title}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                {typeInfo.guide.longride.tips.map((tip, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    {Icons.check(C.green, 14)}
                    <p style={{ color: C.textMuted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{tip}</p>
                  </div>
                ))}
              </div>
              <div style={{ background: `${C.orange}12`, borderRadius: 8, padding: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  {Icons.alertTriangle(C.orange, 14)}
                  <p style={{ color: C.orange, fontSize: 12, margin: 0 }}>{typeInfo.guide.longride.avoid}</p>
                </div>
              </div>
            </div>
          </Card>
          
          {/* PROコンテンツ */}
          <Card style={{ marginTop: 16, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {Icons.trophy(C.accent, 20)}
                <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>レース戦略ガイド</p>
              </div>
              <span style={{ background: isPro ? `${C.green}22` : `${C.accent}22`, color: isPro ? C.green : C.accent, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>
                {isPro ? "✓ PRO" : "PRO"}
              </span>
            </div>
            
            {isPro ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { key: "race", icon: Icons.bike(C.accent, 20), title: typeInfo.guide.race.title },
                  { key: "criterium", icon: Icons.rotate(C.pink, 20), title: typeInfo.guide.criterium.title },
                  { key: "tt", icon: Icons.activity(C.orange, 20), title: typeInfo.guide.tt.title },
                ].map(item => (
                  <div key={item.key} style={{ background: "#0a0e1a", borderRadius: 12, padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                      {item.icon}
                      <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0 }}>{item.title}</p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                      {typeInfo.guide[item.key].tips.map((tip, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                          {Icons.check(C.green, 14)}
                          <p style={{ color: C.textMuted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{tip}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: `${C.orange}12`, borderRadius: 8, padding: 10 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        {Icons.alertTriangle(C.orange, 14)}
                        <p style={{ color: C.orange, fontSize: 12, margin: 0 }}>{typeInfo.guide[item.key].avoid}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ position: "relative" }}>
                <div style={{ filter: "blur(6px)", opacity: 0.4, pointerEvents: "none" }}>
                  {["レースでの走り方", "クリテリウムの走り方", "タイムトライアルの走り方"].map((title, i) => (
                    <div key={i} style={{ background: "#0a0e1a", borderRadius: 12, padding: 16, marginBottom: i < 2 ? 12 : 0 }}>
                      <p style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: 0 }}>{title}</p>
                      <p style={{ color: C.textDim, fontSize: 13, marginTop: 8 }}>タイプ別の詳細な戦略を解説...</p>
                    </div>
                  ))}
                </div>
                <div style={{ 
                  position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  background: "rgba(15, 15, 19, 0.6)"
                }}>
                  <div style={{ marginBottom: 12 }}>{Icons.lock(C.textMuted, 40)}</div>
                  <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>PROプランで解放</p>
                  <p style={{ color: C.textDim, fontSize: 12, margin: "0 0 16px" }}>レース・クリテ・TTの戦略</p>
                  <button 
                    onClick={() => setIsPro(true)}
                    style={{
                      background: `linear-gradient(135deg, ${C.accent}, ${C.pink})`,
                      border: "none", borderRadius: 20, padding: "10px 24px",
                      color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer"
                    }}
                  >
                    PROにアップグレード →
                  </button>
                </div>
              </div>
            )}
          </Card>
          
          {/* 精度を上げる / やり直し */}
          {accuracy.stars < 5 && (
            <button
              onClick={() => setMode("quiz")}
              style={{
                width: "100%", marginTop: 20, padding: "14px", borderRadius: 12,
                border: `1px solid ${C.accent}`, background: "transparent",
                color: C.accent, fontSize: 14, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}
            >
              {Icons.target(C.accent, 16)} もっと質問に答えて精度を上げる
            </button>
          )}
          
          <button
            onClick={() => {
              setMode("start");
              setAnswers({});
              setSkipped(new Set());
              setScores({ fore: 0, rear: 0, ext: 0, int: 0, high: 0, low: 0, open: 0, forward: 0, quad: 0, ham: 0, local: 0, global: 0 });
              setCurrentIndex(0);
              setResult(null);
              setIsPro(false);
              setQuestions([...QUESTION_POOL].sort(() => Math.random() - 0.5));
            }}
            style={{
              width: "100%", marginTop: 12, padding: "14px", borderRadius: 12,
              border: `1px solid ${C.cardBorder}`, background: "transparent",
              color: C.textDim, fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}
          >
            {Icons.refresh(C.textDim, 16)} 最初からやり直す
          </button>
          
          {/* シェア */}
          <Card style={{ marginTop: 20, background: `linear-gradient(135deg, ${C.accent}10, ${C.pink}08)`, border: `1px solid ${C.accent}20` }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: "0 0 8px" }}>友達にもシェアしよう！</p>
              <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 4px" }}>
                「私は<span style={{ color: typeInfo.color, fontWeight: 600 }}>{typeInfo.name}</span>タイプだった！」
              </p>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  
  return null;
}
