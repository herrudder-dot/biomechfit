import { useState, useEffect } from "react";

// グローバルスタイル（アニメーション）
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.8; }
      50% { opacity: 1; }
    }
    @keyframes glow {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    * { 
      box-sizing: border-box;
      font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    }
    body { 
      margin: 0; 
      background: #FAFAFA;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
    }
  `}</style>
);

// ========================================
// テーマ設定（STANCE CORE Premium Design）
// ========================================
const THEMES = {
  // Premium: ミニマル＆高級感（メインテーマ）
  premium: {
    name: "premium",
    // ベース
    bg: "#FAFAFA",
    bgSolid: "#FAFAFA",
    aurora: null,
    
    // カード
    card: "#FFFFFF",
    cardBorder: "#E8E8E8",
    cardHover: "#FFFFFF",
    
    // テキスト
    text: "#1a1a1a",
    textMuted: "#666666",
    textDim: "#999999",
    
    // アクセント（STANCE COREのグリーン）
    accent: "#10B981",
    accentGradient: "linear-gradient(135deg, #10B981, #059669)",
    accentLight: "#34D399",
    accentDark: "#059669",
    
    // タイプ別カラー（洗練されたトーン）
    typeColors: {
      A1: { main: "#F59E0B", gradient: "linear-gradient(135deg, #F59E0B, #D97706)", glow: "rgba(245, 158, 11, 0.15)" },
      A2: { main: "#10B981", gradient: "linear-gradient(135deg, #10B981, #059669)", glow: "rgba(16, 185, 129, 0.15)" },
      B1: { main: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)", glow: "rgba(139, 92, 246, 0.15)" },
      B2: { main: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #DB2777)", glow: "rgba(236, 72, 153, 0.15)" },
    },
    
    // セマンティック
    pink: "#EC4899",
    green: "#10B981",
    orange: "#F59E0B",
    red: "#EF4444",
    cyan: "#10B981",
    yellow: "#F59E0B",
    
    // エフェクト（控えめなシャドウ）
    shadow: "none",
    shadowLg: "0 20px 40px rgba(0, 0, 0, 0.08)",
    shadowCard: "none",
    glow: (color) => `0 0 30px ${color}20`,
    glassBg: "#FFFFFF",
    glassBorder: "#E8E8E8",
    blur: "none",
  },
  
  // Premium Dark
  premiumDark: {
    name: "premiumDark",
    bg: "#0a0a0a",
    bgSolid: "#0a0a0a",
    aurora: null,
    
    card: "#141414",
    cardBorder: "#2a2a2a",
    cardHover: "#1a1a1a",
    
    text: "#FFFFFF",
    textMuted: "#999999",
    textDim: "#666666",
    
    accent: "#10B981",
    accentGradient: "linear-gradient(135deg, #10B981, #059669)",
    accentLight: "#34D399",
    accentDark: "#059669",
    
    typeColors: {
      A1: { main: "#F59E0B", gradient: "linear-gradient(135deg, #F59E0B, #D97706)", glow: "rgba(245, 158, 11, 0.3)" },
      A2: { main: "#10B981", gradient: "linear-gradient(135deg, #10B981, #059669)", glow: "rgba(16, 185, 129, 0.3)" },
      B1: { main: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)", glow: "rgba(139, 92, 246, 0.3)" },
      B2: { main: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #DB2777)", glow: "rgba(236, 72, 153, 0.3)" },
    },
    
    pink: "#EC4899",
    green: "#10B981",
    orange: "#F59E0B",
    red: "#EF4444",
    cyan: "#10B981",
    yellow: "#F59E0B",
    
    shadow: "none",
    shadowLg: "0 20px 40px rgba(0, 0, 0, 0.3)",
    shadowCard: "none",
    glow: (color) => `0 0 30px ${color}40`,
    glassBg: "#141414",
    glassBorder: "#2a2a2a",
    blur: "none",
  },
};

// 現在のテーマを選択
const CURRENT_THEME = "premium";
const theme = THEMES[CURRENT_THEME];

// テーマからカラーを取得
const C = {
  bg: theme.bgSolid,
  card: theme.card,
  cardBorder: theme.cardBorder,
  text: theme.text,
  textMuted: theme.textMuted,
  textDim: theme.textDim,
  accent: theme.accent,
  accentLight: theme.accentLight,
  accentDark: theme.accentDark,
  pink: theme.pink,
  green: theme.green,
  orange: theme.orange,
  red: theme.red,
  cyan: theme.cyan,
  yellow: theme.yellow,
  shadowLight: "#FFFFFF",
  shadowDark: "#E8E8E8",
};

// スタイルヘルパー（Premiumデザイン）
const styles = {
  card: {
    background: theme.card,
    borderRadius: 0,
    padding: 32,
    border: `1px solid ${theme.cardBorder}`,
    boxShadow: "none",
  },
  cardPressed: {
    background: theme.glassBg,
    borderRadius: 0,
    padding: 24,
    border: `1px solid ${theme.glassBorder}`,
    boxShadow: "none",
  },
  buttonPrimary: {
    background: theme.accent,
    border: "none",
    borderRadius: 0,
    padding: "16px 32px",
    color: "#fff",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: "2px",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  buttonSecondary: {
    background: "transparent",
    border: `1px solid ${theme.cardBorder}`,
    borderRadius: 0,
    padding: "14px 28px",
    color: theme.textMuted,
    fontWeight: 500,
    fontSize: 13,
    letterSpacing: "1px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  typeGlow: (type) => ({
    boxShadow: theme.typeColors[type]?.glow ? `0 0 40px ${theme.typeColors[type].glow}` : "none",
  }),
  auroraBg: {
    background: theme.bg,
    backgroundColor: theme.bgSolid,
    minHeight: "100vh",
  },
  gradientBg: {
    background: theme.bg,
    backgroundColor: theme.bgSolid,
    minHeight: "100vh",
  },
  fadeIn: {
    animation: "fadeIn 0.5s ease-out",
  },
  slideUp: {
    animation: "slideUp 0.5s ease-out",
  },
};

// フラットスタイル（ニューモーフィズムを廃止）
const neu = {
  raised: { boxShadow: "none", border: `1px solid ${theme.cardBorder}` },
  raisedLg: { boxShadow: "0 10px 30px rgba(0,0,0,0.08)" },
  pressed: { boxShadow: "none", background: "#F5F5F5" },
  pressedSm: { boxShadow: "none", background: "#F5F5F5" },
  flat: { boxShadow: "none" },
  accentRaised: (color) => ({
    boxShadow: "none",
    border: `1.5px solid ${color}`,
  }),
};


// ========================================
// サイクリング機材データベース
// ========================================
const CYCLING_GEAR_DB = [
  // === サドル ===
  // A1向け（前乗り・ショートノーズ）
  { id: "power-arc", name: "Specialized Power Arc", brand: "Specialized", price: 28000, category: "saddle",
    style: "forward", type: ["A1", "B1"], 
    reason: "ショートノーズで前乗りに最適。高出力ペダリングをサポート。",
    amazonQuery: "Specialized+Power+Saddle", rakutenQuery: "Specialized%20Power%20サドル" },
  { id: "argo-r3", name: "fi'zi:k Argo Tempo R3", brand: "fi'zi:k", price: 15000, category: "saddle",
    style: "forward", type: ["A1", "B1"],
    reason: "ショートノーズの入門モデル。前乗りポジションに。",
    amazonQuery: "fizik+Argo+Tempo", rakutenQuery: "fizik%20Argo%20Tempo" },
  // A2向け（後ろ乗り・ロングノーズ）
  { id: "antares-r3", name: "fi'zi:k Antares R3", brand: "fi'zi:k", price: 18000, category: "saddle",
    style: "rear", type: ["A2", "B2"],
    reason: "クラシックな形状で後ろ乗りに最適。ロングライドも快適。",
    amazonQuery: "fizik+Antares", rakutenQuery: "fizik%20Antares" },
  { id: "aspide", name: "Selle Italia SLR Boost", brand: "Selle Italia", price: 22000, category: "saddle",
    style: "rear", type: ["A2"],
    reason: "軽量でクライマー向け。後ろ乗りでトルクをかけやすい。",
    amazonQuery: "Selle+Italia+SLR+Boost", rakutenQuery: "Selle%20Italia%20SLR%20Boost" },
  // B1/B2向け（バランス型）
  { id: "romin-evo", name: "Specialized Romin Evo", brand: "Specialized", price: 25000, category: "saddle",
    style: "neutral", type: ["B1", "B2"],
    reason: "オールラウンドな形状。様々なポジションに対応。",
    amazonQuery: "Specialized+Romin+Evo", rakutenQuery: "Specialized%20Romin%20Evo" },
  { id: "cambium-c17", name: "Brooks Cambium C17", brand: "Brooks", price: 16000, category: "saddle",
    style: "neutral", type: ["B2"],
    reason: "快適性重視。ロングライドやエンデュランスに。",
    amazonQuery: "Brooks+Cambium+C17", rakutenQuery: "Brooks%20Cambium%20C17" },

  // === ペダル ===
  // A1向け（高剛性・軽量）
  { id: "dura-ace-pedal", name: "Shimano Dura-Ace PD-R9200", brand: "Shimano", price: 35000, category: "pedal",
    style: "stiff", type: ["A1"],
    reason: "最高剛性でパワー伝達ロスなし。スプリンター向け。",
    amazonQuery: "Shimano+Dura-Ace+PD-R9200", rakutenQuery: "Shimano%20Dura-Ace%20ペダル" },
  { id: "keo-blade", name: "Look Keo Blade Carbon", brand: "Look", price: 28000, category: "pedal",
    style: "stiff", type: ["A1", "B1"],
    reason: "カーボンブレードで軽量×高剛性。反応の良いペダリングに。",
    image: "https://m.media-amazon.com/images/I/71vZ3mGnURL._AC_SX679_.jpg",
    amazonQuery: "Look+Keo+Blade+Carbon", rakutenQuery: "Look%20Keo%20Blade%20Carbon" },
  // A2/B2向け（バランス型）
  { id: "ultegra-pedal", name: "Shimano Ultegra PD-R8000", brand: "Shimano", price: 18000, category: "pedal",
    style: "balanced", type: ["A2", "B1", "B2"],
    reason: "剛性と価格のバランス◎。オールラウンドに使える定番。",
    image: "https://m.media-amazon.com/images/I/71ZtT4dG8kL._AC_SX679_.jpg",
    amazonQuery: "Shimano+Ultegra+PD-R8000", rakutenQuery: "Shimano%20Ultegra%20ペダル" },
  { id: "keo-classic", name: "Look Keo Classic 3", brand: "Look", price: 8000, category: "pedal",
    style: "balanced", type: ["A2", "B2"],
    reason: "入門〜中級向け。軽いエントリーで始めやすい。",
    image: "https://m.media-amazon.com/images/I/71fGqz8URL._AC_SX679_.jpg",
    amazonQuery: "Look+Keo+Classic+3", rakutenQuery: "Look%20Keo%20Classic%203" },

  // === シューズ ===
  // A1向け（高剛性）
  { id: "s-works-torch", name: "Specialized S-Works Torch", brand: "Specialized", price: 55000, category: "shoes",
    style: "stiff", type: ["A1"],
    reason: "最高剛性ソール。スプリントでパワーを逃さない。",
    image: "https://m.media-amazon.com/images/I/61KhURL._AC_SX679_.jpg",
    amazonQuery: "Specialized+S-Works+Torch", rakutenQuery: "Specialized%20S-Works%20Torch" },
  { id: "rc9", name: "Shimano RC9", brand: "Shimano", price: 45000, category: "shoes",
    style: "stiff", type: ["A1", "B1"],
    reason: "カーボンソールで高剛性。レースからロングライドまで。",
    image: "https://m.media-amazon.com/images/I/61pPmEURL._AC_SX679_.jpg",
    amazonQuery: "Shimano+RC9", rakutenQuery: "Shimano%20RC9" },
  // バランス型
  { id: "rc7", name: "Shimano RC7", brand: "Shimano", price: 28000, category: "shoes",
    style: "balanced", type: ["A2", "B1", "B2"],
    reason: "剛性と快適性のバランス。長時間でも疲れにくい。",
    image: "https://m.media-amazon.com/images/I/71G5yYtURL._AC_SX679_.jpg",
    amazonQuery: "Shimano+RC7", rakutenQuery: "Shimano%20RC7" },
  { id: "torch-2", name: "Specialized Torch 2.0", brand: "Specialized", price: 22000, category: "shoes",
    style: "balanced", type: ["A2", "B2"],
    reason: "快適フィットで長距離向け。初めてのビンディングにも。",
    image: "https://m.media-amazon.com/images/I/71VxZaURL._AC_SX679_.jpg",
    amazonQuery: "Specialized+Torch+2.0", rakutenQuery: "Specialized%20Torch%202.0" },

  // === バーテープ ===
  { id: "supacaz-sticky", name: "Supacaz Super Sticky Kush", brand: "Supacaz", price: 4000, category: "bartape",
    style: "thin", type: ["A1", "B1"],
    reason: "薄手でダイレクト感◎。振動よりハンドリング重視。",
    image: "https://m.media-amazon.com/images/I/71TqPsURL._AC_SX679_.jpg",
    amazonQuery: "Supacaz+Super+Sticky+Kush", rakutenQuery: "Supacaz%20Super%20Sticky%20Kush" },
  { id: "lizard-dsp", name: "Lizard Skins DSP 3.2mm", brand: "Lizard Skins", price: 5000, category: "bartape",
    style: "cushion", type: ["A2", "B2"],
    reason: "厚手でクッション性◎。ロングライドの疲労軽減。",
    image: "https://m.media-amazon.com/images/I/71Kl5nURL._AC_SX679_.jpg",
    amazonQuery: "Lizard+Skins+DSP+3.2", rakutenQuery: "Lizard%20Skins%20DSP%203.2" },
];

// サイクリング機材カテゴリ（フィッティングパーツのみ）
const CYCLING_CATEGORIES = [
  { id: "saddle", label: "サドル", icon: "saddle" },
  { id: "pedal", label: "ペダル", icon: "pedal" },
  { id: "shoes", label: "シューズ", icon: "shoe" },
  { id: "bartape", label: "バーテープ", icon: "bartape" },
];

// サイクリングブランドリスト
const CYCLING_BRANDS = ["Shimano", "Specialized", "fi'zi:k", "Selle Italia", "Look", "Supacaz", "Lizard Skins", "Brooks"];


// カスタムSVGアイコン（Premium Minimal Style - strokeWidth: 1.5）
const Icons = {
  // STANCE CORE ロゴ（同心円デザイン）
  stanceCore: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <radialGradient id="coreGrad">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="20" fill="url(#coreGrad)"/>
      <circle cx="32" cy="32" r="24" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6"/>
      <circle cx="32" cy="32" r="17" fill="none" stroke={color} strokeWidth="1" opacity="0.4"/>
      <circle cx="32" cy="32" r="10" fill="none" stroke={color} strokeWidth="0.75" opacity="0.3"/>
      <circle cx="32" cy="32" r="4" fill={color} opacity="0.9"/>
    </svg>
  ),
  
  // STANCE CORE ロゴ（テキスト付きフル版）
  stanceCoreFull: (color = C.accent, size = 120) => (
    <svg width={size} height={size * 0.8} viewBox="0 0 350 280" fill="none">
      <defs>
        <radialGradient id="coreGradFull">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="175" cy="110" r="60" fill="url(#coreGradFull)"/>
      <circle cx="175" cy="110" r="70" fill="none" stroke={color} strokeWidth="2" opacity="0.6"/>
      <circle cx="175" cy="110" r="85" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4"/>
      <circle cx="175" cy="110" r="100" fill="none" stroke={color} strokeWidth="1" opacity="0.25"/>
      <circle cx="175" cy="110" r="10" fill={color} opacity="0.9"/>
      <text x="175" y="215" fontFamily="Inter, -apple-system, sans-serif" fontSize="28" fontWeight="600" letterSpacing="8" fill={color} textAnchor="middle">STANCE</text>
      <text x="175" y="245" fontFamily="Inter, -apple-system, sans-serif" fontSize="18" fontWeight="400" letterSpacing="6" fill="#666" textAnchor="middle">CORE</text>
    </svg>
  ),
  
  dna: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 15c6.667-6 13.333 0 20-6"/>
      <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>
      <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/>
      <path d="M17 6l-2.5-2.5"/>
      <path d="M7 18l2.5 2.5"/>
    </svg>
  ),
  target: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="6"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  ),
  zap: (color = C.orange, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  mountain: (color = C.green, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z"/>
    </svg>
  ),
  wave: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
    </svg>
  ),
  crosshair: (color = C.pink, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="22" y1="12" x2="18" y2="12"/>
      <line x1="6" y1="12" x2="2" y2="12"/>
      <line x1="12" y1="6" x2="12" y2="2"/>
      <line x1="12" y1="22" x2="12" y2="18"/>
    </svg>
  ),
  foot: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/>
      <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/>
    </svg>
  ),
  rotate: (color = C.cyan, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
    </svg>
  ),
  activity: (color = C.pink, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  ),
  user: (color = C.green, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  bike: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18.5" cy="17.5" r="3.5"/>
      <circle cx="5.5" cy="17.5" r="3.5"/>
      <circle cx="15" cy="5" r="1"/>
      <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
    </svg>
  ),
  trophy: (color = C.orange, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </svg>
  ),
  lock: (color = C.textDim, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  check: (color = C.green, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  alertTriangle: (color = C.orange, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  sparkles: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  frame: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  wheel: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2" x2="12" y2="8"/>
      <line x1="12" y1="16" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="8" y2="12"/>
      <line x1="16" y1="12" x2="22" y2="12"/>
    </svg>
  ),
  arrowRight: (color = C.text, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  refresh: (color = C.textDim, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
      <path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
    </svg>
  ),
  road: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2l2 18"/><path d="M19 2l-2 18"/><path d="M12 6v4"/><path d="M12 14v4"/>
    </svg>
  ),
  saddle: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="10" rx="9" ry="4"/>
      <path d="M12 14v6"/>
      <path d="M8 20h8"/>
    </svg>
  ),
  shoe: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 14h4l3-3 4 1 7 4v2H3z"/>
      <path d="M7 14v4"/>
    </svg>
  ),
  settings: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  save: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/>
    </svg>
  ),
  home: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  star: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  link: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  ),
  // ギアファインダー用アイコン
  pedal: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="16" height="8" rx="2"/>
      <line x1="12" y1="8" x2="12" y2="4"/>
      <circle cx="12" cy="3" r="1" fill={color}/>
      <line x1="8" y1="16" x2="8" y2="20"/>
      <line x1="16" y1="16" x2="16" y2="20"/>
    </svg>
  ),
  bartape: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
      <path d="M4 6v12c0 1.1.9 2 2 2h2"/>
      <path d="M20 6v12c0 1.1-.9 2-2 2h-2"/>
      <line x1="8" y1="10" x2="8" y2="14"/>
      <line x1="12" y1="10" x2="12" y2="14"/>
      <line x1="16" y1="10" x2="16" y2="14"/>
    </svg>
  ),
  crank: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <circle cx="12" cy="12" r="7"/>
      <line x1="12" y1="15" x2="12" y2="22"/>
      <circle cx="12" cy="22" r="2" fill={color}/>
    </svg>
  ),
  powermeter: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
      <circle cx="12" cy="12" r="2" fill={color}/>
    </svg>
  ),
};

// ピクトグラムコンポーネント（ニューモーフィズム対応）
const Pictograms = {
  // 荷重：内側 vs 外側
  balance: {
    front: (selected, color) => (
      <svg width="100" height="120" viewBox="0 0 100 120">
        {/* 地面 */}
        <line x1="10" y1="105" x2="90" y2="105" stroke={selected ? color : C.shadowDark} strokeWidth="2" strokeLinecap="round"/>
        {/* 人（前傾） */}
        <circle cx="52" cy="22" r="10" fill={selected ? color : C.textDim}/> {/* 頭 */}
        <line x1="52" y1="32" x2="48" y2="65" stroke={selected ? color : C.textDim} strokeWidth="6" strokeLinecap="round"/> {/* 胴体 */}
        <line x1="48" y1="65" x2="40" y2="103" stroke={selected ? color : C.textDim} strokeWidth="5" strokeLinecap="round"/> {/* 脚 */}
        <line x1="48" y1="65" x2="56" y2="103" stroke={selected ? color : C.textDim} strokeWidth="5" strokeLinecap="round"/>
        {/* 重心マーク */}
        <circle cx="48" cy="85" r="6" fill={selected ? `${color}40` : "transparent"} stroke={selected ? color : C.textDim} strokeWidth="2"/>
        {/* 矢印（前方向） */}
        <path d="M65 50 L78 50 L75 45 M78 50 L75 55" stroke={selected ? color : C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
    back: (selected, color) => (
      <svg width="100" height="120" viewBox="0 0 100 120">
        {/* 地面 */}
        <line x1="10" y1="105" x2="90" y2="105" stroke={selected ? color : C.shadowDark} strokeWidth="2" strokeLinecap="round"/>
        {/* 人（直立） */}
        <circle cx="50" cy="22" r="10" fill={selected ? color : C.textDim}/> {/* 頭 */}
        <line x1="50" y1="32" x2="50" y2="65" stroke={selected ? color : C.textDim} strokeWidth="6" strokeLinecap="round"/> {/* 胴体 */}
        <line x1="50" y1="65" x2="45" y2="103" stroke={selected ? color : C.textDim} strokeWidth="5" strokeLinecap="round"/> {/* 脚 */}
        <line x1="50" y1="65" x2="55" y2="103" stroke={selected ? color : C.textDim} strokeWidth="5" strokeLinecap="round"/>
        {/* 重心マーク */}
        <circle cx="50" cy="85" r="6" fill={selected ? `${color}40` : "transparent"} stroke={selected ? color : C.textDim} strokeWidth="2"/>
        {/* 矢印（下方向） */}
        <path d="M50 95 L50 112 L45 108 M50 112 L55 108" stroke={selected ? color : C.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  
  // 着地：つま先 vs 踵
  landing: {
    forefoot: (selected, color) => (
      <svg width="100" height="120" viewBox="0 0 100 120">
        {/* 地面 */}
        <line x1="10" y1="100" x2="90" y2="100" stroke={selected ? color : C.shadowDark} strokeWidth="2" strokeLinecap="round"/>
        {/* 足（横から） */}
        <path d="M30 95 Q35 80 50 75 Q70 72 80 78 L85 90 Q80 98 70 98 L30 98 Q25 98 25 95 Z" 
          fill={selected ? `${color}20` : C.bg} stroke={selected ? color : C.textDim} strokeWidth="2"/>
        {/* つま先ハイライト */}
        <circle cx="30" cy="92" r="8" fill={selected ? color : "transparent"} opacity="0.4"/>
        <circle cx="30" cy="92" r="4" fill={selected ? color : C.textDim}/>
        {/* 動きの軌跡 */}
        <path d="M30 70 Q25 80 30 92" stroke={selected ? color : C.textDim} strokeWidth="2" strokeDasharray="4" fill="none" opacity="0.6"/>
      </svg>
    ),
    heel: (selected, color) => (
      <svg width="100" height="120" viewBox="0 0 100 120">
        {/* 地面 */}
        <line x1="10" y1="100" x2="90" y2="100" stroke={selected ? color : C.shadowDark} strokeWidth="2" strokeLinecap="round"/>
        {/* 足（横から） */}
        <path d="M30 90 Q35 80 50 75 Q70 72 80 78 L85 95 Q80 98 70 98 L30 98 Q25 98 25 95 Z" 
          fill={selected ? `${color}20` : C.bg} stroke={selected ? color : C.textDim} strokeWidth="2"/>
        {/* 踵ハイライト */}
        <circle cx="80" cy="92" r="8" fill={selected ? color : "transparent"} opacity="0.4"/>
        <circle cx="80" cy="92" r="4" fill={selected ? color : C.textDim}/>
        {/* 動きの軌跡 */}
        <path d="M80 70 Q85 80 80 92" stroke={selected ? color : C.textDim} strokeWidth="2" strokeDasharray="4" fill="none" opacity="0.6"/>
      </svg>
    ),
  },
  
  // 走り方：ピッチ vs ストライド
  runStyle: {
    highPitch: (selected, color) => (
      <svg width="100" height="120" viewBox="0 0 100 120">
        {/* 地面 */}
        <line x1="5" y1="100" x2="95" y2="100" stroke={selected ? color : C.shadowDark} strokeWidth="2" strokeLinecap="round"/>
        {/* ランナー1 */}
        <g transform="translate(15, 0)">
          <circle cx="12" cy="45" r="6" fill={selected ? color : C.textDim}/>
          <line x1="12" y1="51" x2="12" y2="70" stroke={selected ? color : C.textDim} strokeWidth="4" strokeLinecap="round"/>
          <line x1="12" y1="70" x2="8" y2="98" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
          <line x1="12" y1="70" x2="18" y2="88" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
        </g>
        {/* ランナー2 */}
        <g transform="translate(45, 0)">
          <circle cx="12" cy="45" r="6" fill={selected ? color : C.textDim}/>
          <line x1="12" y1="51" x2="12" y2="70" stroke={selected ? color : C.textDim} strokeWidth="4" strokeLinecap="round"/>
          <line x1="12" y1="70" x2="6" y2="88" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
          <line x1="12" y1="70" x2="16" y2="98" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
        </g>
        {/* ランナー3 */}
        <g transform="translate(75, 0)">
          <circle cx="12" cy="45" r="6" fill={selected ? color : C.textDim}/>
          <line x1="12" y1="51" x2="12" y2="70" stroke={selected ? color : C.textDim} strokeWidth="4" strokeLinecap="round"/>
          <line x1="12" y1="70" x2="10" y2="98" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
          <line x1="12" y1="70" x2="20" y2="85" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
        </g>
        {/* リズムマーク */}
        <g transform="translate(0, 108)">
          {[15, 30, 45, 60, 75, 90].map((x, i) => (
            <circle key={i} cx={x} r="2" fill={selected ? color : C.textDim}/>
          ))}
        </g>
      </svg>
    ),
    longStride: (selected, color) => (
      <svg width="100" height="120" viewBox="0 0 100 120">
        {/* 地面 */}
        <line x1="5" y1="100" x2="95" y2="100" stroke={selected ? color : C.shadowDark} strokeWidth="2" strokeLinecap="round"/>
        {/* ランナー（大きなストライド） */}
        <g transform="translate(30, 0)">
          <circle cx="20" cy="40" r="8" fill={selected ? color : C.textDim}/>
          <line x1="20" y1="48" x2="20" y2="70" stroke={selected ? color : C.textDim} strokeWidth="5" strokeLinecap="round"/>
          <line x1="20" y1="70" x2="5" y2="98" stroke={selected ? color : C.textDim} strokeWidth="4" strokeLinecap="round"/>
          <line x1="20" y1="70" x2="45" y2="85" stroke={selected ? color : C.textDim} strokeWidth="4" strokeLinecap="round"/>
          {/* 腕 */}
          <line x1="20" y1="55" x2="35" y2="45" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
          <line x1="20" y1="55" x2="8" y2="70" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
        </g>
        {/* ストライドの矢印 */}
        <path d="M15 95 L85 95" stroke={selected ? color : C.textDim} strokeWidth="2" strokeDasharray="6" opacity="0.5"/>
        <polygon points="85,95 78,91 78,99" fill={selected ? color : C.textDim}/>
        {/* リズムマーク（少なめ） */}
        <g transform="translate(0, 108)">
          {[25, 50, 75].map((x, i) => (
            <circle key={i} cx={x} r="3" fill={selected ? color : C.textDim}/>
          ))}
        </g>
      </svg>
    ),
  },
  
  // 体幹：折る vs 一体
  trunk: {
    fold: (selected, color) => (
      <svg width="100" height="120" viewBox="0 0 100 120">
        {/* 人（折れ曲がる姿勢） */}
        <circle cx="50" cy="20" r="10" fill={selected ? color : C.textDim}/>
        {/* 上半身（前傾） */}
        <line x1="50" y1="30" x2="45" y2="55" stroke={selected ? color : C.textDim} strokeWidth="6" strokeLinecap="round"/>
        {/* 下半身 */}
        <line x1="45" y1="55" x2="50" y2="85" stroke={selected ? color : C.textDim} strokeWidth="6" strokeLinecap="round"/>
        <line x1="50" y1="85" x2="42" y2="110" stroke={selected ? color : C.textDim} strokeWidth="5" strokeLinecap="round"/>
        <line x1="50" y1="85" x2="58" y2="110" stroke={selected ? color : C.textDim} strokeWidth="5" strokeLinecap="round"/>
        {/* 折れ点マーク */}
        <circle cx="45" cy="55" r="5" fill={selected ? `${color}40` : "transparent"} stroke={selected ? color : C.textDim} strokeWidth="2"/>
        {/* 角度表示 */}
        <path d="M55 45 Q50 55 55 65" stroke={selected ? color : C.textDim} strokeWidth="1.5" fill="none" strokeDasharray="3"/>
      </svg>
    ),
    unified: (selected, color) => (
      <svg width="100" height="120" viewBox="0 0 100 120">
        {/* 人（一体の姿勢） */}
        <circle cx="50" cy="20" r="10" fill={selected ? color : C.textDim}/>
        {/* 上半身〜下半身（一直線） */}
        <line x1="50" y1="30" x2="50" y2="85" stroke={selected ? color : C.textDim} strokeWidth="6" strokeLinecap="round"/>
        <line x1="50" y1="85" x2="42" y2="110" stroke={selected ? color : C.textDim} strokeWidth="5" strokeLinecap="round"/>
        <line x1="50" y1="85" x2="58" y2="110" stroke={selected ? color : C.textDim} strokeWidth="5" strokeLinecap="round"/>
        {/* 一体マーク */}
        <line x1="60" y1="30" x2="60" y2="85" stroke={selected ? color : C.textDim} strokeWidth="2" strokeDasharray="4" opacity="0.6"/>
        <circle cx="60" cy="57" r="4" fill={selected ? color : "transparent"} stroke={selected ? color : C.textDim} strokeWidth="1.5"/>
      </svg>
    ),
  },
  
  // スポーツアイコン
  sports: {
    running: (selected, color) => (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="30" cy="10" r="5" fill={selected ? color : C.textDim}/>
        <path d="M25 15 L22 28 L12 35" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M22 28 L32 38 L38 42" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M25 15 L35 20" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
        <path d="M25 15 L18 8" stroke={selected ? color : C.textDim} strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
    cycling: (selected, color) => (
      <svg width="48" height="48" viewBox="0 0 48 48">
        <circle cx="12" cy="32" r="8" fill="none" stroke={selected ? color : C.textDim} strokeWidth="2.5"/>
        <circle cx="36" cy="32" r="8" fill="none" stroke={selected ? color : C.textDim} strokeWidth="2.5"/>
        <path d="M12 32 L24 20 L36 32" stroke={selected ? color : C.textDim} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M24 20 L28 10" stroke={selected ? color : C.textDim} strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="30" cy="8" r="4" fill={selected ? color : C.textDim}/>
      </svg>
    ),
    trail: (selected, color) => (
      <svg width="48" height="48" viewBox="0 0 48 48">
        {/* 山 */}
        <path d="M5 40 L20 15 L28 28 L35 20 L45 40 Z" fill={selected ? `${color}20` : `${C.textDim}15`} stroke={selected ? color : C.textDim} strokeWidth="2"/>
        {/* ランナー */}
        <circle cx="22" cy="25" r="3" fill={selected ? color : C.textDim}/>
        <path d="M20 28 L18 35 L14 38" stroke={selected ? color : C.textDim} strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M20 28 L24 34 L28 36" stroke={selected ? color : C.textDim} strokeWidth="2" strokeLinecap="round" fill="none"/>
      </svg>
    ),
  },
};

// 後方互換のためのエイリアス
const Illustrations = {
  footPressure: {
    front: Pictograms.landing.forefoot,
    back: Pictograms.landing.heel,
  },
  standingSide: {
    forward: Pictograms.balance.front,
    back: Pictograms.balance.back,
  },
  carryBag: {
    close: Pictograms.trunk.fold,
    far: Pictograms.trunk.unified,
  },
};

// レーダーチャートコンポーネント
const RadarChart = ({ data, size = 200, color = C.accent }) => {
  const margin = 35; // ラベル用のマージン
  const chartSize = size - margin * 2;
  const center = size / 2;
  const radius = chartSize * 0.38;
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
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      {/* 背景グリッド */}
      {gridLevels.map((level, i) => {
        const r = radius * (level / 100);
        const gridPoints = angles.map(angle => ({
          x: center + r * Math.cos(angle),
          y: center + r * Math.sin(angle)
        }));
        const path = gridPoints.map((p, j) => `${j === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
        return <path key={i} d={path} fill="none" stroke={C.shadowDark} strokeWidth="1" opacity={0.3}/>;
      })}
      
      {/* 軸線 */}
      {angles.map((angle, i) => (
        <line 
          key={i}
          x1={center} 
          y1={center} 
          x2={center + radius * Math.cos(angle)} 
          y2={center + radius * Math.sin(angle)}
          stroke={C.shadowDark}
          strokeWidth="1"
          opacity={0.3}
        />
      ))}
      
      {/* データエリア */}
      <path 
        d={polygonPath} 
        fill={`${color}25`}
        stroke={color}
        strokeWidth="2.5"
      />
      
      {/* データポイント */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={color}/>
      ))}
      
      {/* ラベル */}
      {labels.map((label, i) => {
        const labelRadius = radius + 20;
        const x = center + labelRadius * Math.cos(angles[i]);
        const y = center + labelRadius * Math.sin(angles[i]);
        return (
          <text 
            key={i}
            x={x} 
            y={y} 
            textAnchor="middle" 
            dominantBaseline="middle"
            fill={C.text}
            fontSize="12"
            fontWeight="600"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
};

// 質問プール
// 軸1: AかBか（体幹タイプ） - A=みぞおち・股関節主導 / B=首・肩甲骨・腰主導
// 軸2: Inner/Outer（荷重タイプ） - I=内側荷重 / O=外側荷重
// APA: ケイデンス（高回転/トルク）、姿勢（胸開き/前傾）
// type: "text"（テキスト2択）, "action"（体験型）, "quad"（4択）
const QUESTION_POOL = [
  // === 基本質問（重心・体幹） ===
  { id: "foot_pressure", cat: "balance", type: "text",
    q: "👣 立っているとき、足裏のどこに体重を感じる？", 
    a: "つま先側（前足部）に体重がかかる", 
    b: "かかと側（後足部）に体重がかかる",
    weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "stand_balance", cat: "balance", type: "text",
    q: "🧍 自然に立ったとき、重心はどっち寄り？", 
    a: "やや前寄り（つま先側）", 
    b: "真ん中〜後ろ寄り（かかと側）",
    weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "carry_bag", cat: "trunk", type: "text",
    q: "🎒 重い荷物を持つとき、楽なのは？", 
    a: "体に近づけて抱えるように持つ", 
    b: "腕を伸ばして体から離して持つ",
    weight: { typeA: [1, 0], typeB: [0, 1] } },
  
  // === 体験型質問 ===
  { id: "action_stand", cat: "balance", type: "action",
    q: "今、立ってみてください",
    instruction: "リラックスして自然に立って、足裏のどこに体重を感じますか？",
    a: "つま先〜母指球あたり", b: "かかと〜足裏全体",
    weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "action_push", cat: "trunk", type: "action",
    q: "壁を両手で押してみて",
    instruction: "グッと力を入れるとき、意識が向くのはどこ？",
    a: "お腹・みぞおちに力が入る", b: "背中・肩甲骨に力が入る",
    weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "action_arm", cat: "trunk", type: "action",
    q: "腕を組んでみてください",
    instruction: "自然に組むと、どちらの腕が上にきますか？",
    a: "右腕が上", b: "左腕が上",
    weight: { typeA: [1, 0], typeB: [0, 1] } },

  // === AかBか（体幹タイプ）===
  // A/B選択肢の順序をバランスよく混ぜる
  { id: "lift_heavy", cat: "trunk", q: "重いものを持ち上げるとき、力を入れるのは？", a: "お腹〜みぞおちあたり", b: "背中〜腰あたり", weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "power_source", cat: "trunk", q: "グッと踏ん張るとき、意識が向くのは？", a: "背中・肩甲骨まわり", b: "お腹・丹田あたり", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "carry_bag", cat: "trunk", q: "重いカバンを持つとき楽なのは？", a: "体に近づけて持つ", b: "腕を伸ばして持つ", weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "stand_stable", cat: "trunk", q: "安定して立つとき意識するのは？", a: "腰と肩のライン", b: "みぞおちと股関節", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "push_wall", cat: "trunk", q: "壁を思いっきり押すとき、力の起点は？", a: "お腹から押す感じ", b: "背中で押す感じ", weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "body_twist", cat: "trunk", q: "体をねじるとき、動きの起点は？", a: "腰・肩甲骨から", b: "みぞおち・股関節から", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "sit_relax", cat: "trunk", q: "椅子でリラックスするとき", a: "骨盤を立てて、みぞおちの力を抜く", b: "背もたれに寄りかかり、腰を預ける", weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "arm_swing", cat: "trunk", q: "歩くときの腕振りは？", a: "肩甲骨から大きく振る", b: "自然に小さく振る程度", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "jump_prep", cat: "trunk", q: "ジャンプするとき、力を溜めるのは？", a: "お腹にグッと力を入れる", b: "背中・腰をバネのように使う", weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "catch_ball", cat: "trunk", q: "飛んできたボールをキャッチするとき", a: "体に引き寄せるように", b: "手を伸ばして前で取る", weight: { typeA: [1, 0], typeB: [0, 1] } },
  // 追加：体幹タイプ質問
  { id: "swing_bat", cat: "trunk", q: "バットやラケットを振るとき、意識は？", a: "腰の回転から", b: "みぞおちのひねりから", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "throw_power", cat: "trunk", q: "ボールを遠くに投げるとき、力の源は？", a: "肩甲骨〜背中", b: "みぞおち〜股関節", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "push_car", cat: "trunk", q: "重いものを押すとき、体のどこを使う感じ？", a: "体幹の前側で押す", b: "背中側で押し込む", weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "pull_rope", cat: "trunk", q: "綱引きで引っ張るとき、力を入れるのは？", a: "腰を落として背中で引く", b: "お腹に力を入れて引く", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "dance_move", cat: "trunk", q: "ダンスや体を動かすとき、動きの起点は？", a: "みぞおち・胸のあたり", b: "腰・肩甲骨のあたり", weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "sneeze", cat: "trunk", q: "くしゃみをするとき、体は？", a: "背中が丸まる感じ", b: "お腹がギュッと縮む", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "laugh_hard", cat: "trunk", q: "大笑いするとき、力が入るのは？", a: "背中を反らす感じ", b: "お腹を抱える感じ", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "yawn", cat: "trunk", q: "あくびをするとき、伸びるのは？", a: "背中〜肩甲骨", b: "お腹〜胸", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "cough", cat: "trunk", q: "咳をするとき、力が入るのは？", a: "背中が丸まる", b: "お腹が収縮する", weight: { typeA: [0, 1], typeB: [1, 0] } },
  { id: "stretch_morning", cat: "trunk", q: "朝の伸びで気持ちいいのは？", a: "両手を上げて背中を伸ばす", b: "体を丸めてから伸ばす", weight: { typeA: [0, 1], typeB: [1, 0] } },
  
  // === Inner/Outer（荷重タイプ）===
  // num1 = Inner（内側荷重）, num2 = Outer（外側荷重）
  { id: "shoe_wear", cat: "balance", q: "靴底の減り方は？", a: "内側が減りやすい", b: "外側が減りやすい", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "knee_direction", cat: "balance", q: "スクワットで膝は？", a: "内に入りやすい", b: "外に開きやすい", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "one_leg_balance", cat: "balance", q: "片足立ちで安定するのは？", a: "母指球（親指側）で踏む", b: "小指球（外側）で踏む", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "sit_legs", cat: "balance", q: "椅子に座るとき、膝は？", a: "閉じる・内向きになる", b: "開く・外向きになる", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "stand_feet", cat: "balance", q: "立つとき、足の向きは？", a: "まっすぐ〜やや内向き", b: "やや外向き（ガニ股気味）", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "walk_line", cat: "balance", q: "歩くとき、足の軌道は？", a: "一直線に近い", b: "やや外側を通る", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "pedal_push", cat: "balance", q: "ペダルを踏むとき、力が入るのは？", a: "親指側・母指球", b: "小指側も含め足裏全体", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "leg_cross", cat: "balance", q: "脚を組むとき", a: "内側に締める感じ", b: "外に開く感じ", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "squat_knee", cat: "balance", q: "しゃがむとき膝は？", a: "つま先より内側", b: "つま先と同じか外側", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "ankle_roll", cat: "balance", q: "足首を捻挫するなら？", a: "内側に捻る（内反）", b: "外側に捻る（外反）", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "heel_tilt", cat: "balance", q: "立っているとき、踵の傾きは？", a: "内側に倒れやすい", b: "外側に倒れやすい", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "toe_grip", cat: "balance", q: "足の指で床を掴むとき", a: "親指側が強い", b: "小指側も均等に使う", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "calf_shape", cat: "balance", q: "ふくらはぎの発達は？", a: "内側が発達", b: "外側が発達", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "thigh_shape", cat: "balance", q: "太ももの発達は？", a: "内側（内転筋）が強い", b: "外側（外側広筋）が強い", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "arch_type", cat: "balance", q: "足のアーチ（土踏まず）は？", a: "低め（偏平足気味）", b: "高め（ハイアーチ）", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "stand_sway", cat: "balance", q: "長時間立つとき、体重は？", a: "内側に寄りがち", b: "外側に寄りがち", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "jump_land", cat: "balance", q: "ジャンプの着地は？", a: "内側から着く", b: "外側から着く", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "turn_pivot", cat: "balance", q: "その場で回転するとき", a: "内側の足で軸を作る", b: "外側の足で軸を作る", weight: { num1: [1, 0], num2: [0, 1] } },
  
  // === APA: テンポ・リズム傾向 ===
  { id: "pedal_pace", cat: "cadence", q: "ペダリングで楽なのは？", a: "ケイデンスを上げて軽く回す", b: "重いギアでゆっくり踏む", weight: { high: [1, 0], low: [0, 1] } },
  { id: "walk_pace", cat: "cadence", q: "歩くペースは？", a: "大股でゆったり", b: "小股で速く", weight: { high: [0, 1], low: [1, 0] } },
  { id: "ride_style", cat: "cadence", q: "走るときのイメージ", a: "高回転で軽快に", b: "重めギアで力強く", weight: { high: [1, 0], low: [0, 1] } },
  { id: "stair_up", cat: "cadence", q: "階段を登るとき", a: "二段飛ばしもあり", b: "一段ずつテンポよく", weight: { high: [0, 1], low: [1, 0] } },
  { id: "music_tempo", cat: "cadence", q: "運動するときの音楽は？", a: "BPM高めが好き", b: "ゆったりめでも集中できる", weight: { high: [1, 0], low: [0, 1] } },
  // 追加：テンポ質問
  { id: "typing_speed", cat: "cadence", q: "タイピングするとき", a: "速く細かく打つ", b: "ゆっくり確実に打つ", weight: { high: [1, 0], low: [0, 1] } },
  { id: "chew_speed", cat: "cadence", q: "食事で噛むペースは？", a: "速めにテンポよく", b: "ゆっくりじっくり", weight: { high: [1, 0], low: [0, 1] } },
  { id: "talk_speed", cat: "cadence", q: "話すスピードは？", a: "早口気味", b: "ゆっくり落ち着いて", weight: { high: [1, 0], low: [0, 1] } },
  { id: "blink_rate", cat: "cadence", q: "瞬きの頻度は？（自覚あれば）", a: "多い方かも", b: "少ない方かも", weight: { high: [1, 0], low: [0, 1] } },
  { id: "heart_feel", cat: "cadence", q: "運動中の心拍、楽なのは？", a: "高めをキープ", b: "低めで長く", weight: { high: [1, 0], low: [0, 1] } },
  { id: "drum_tap", cat: "cadence", q: "指でリズムを取るとき", a: "速いテンポが心地いい", b: "ゆったりが心地いい", weight: { high: [1, 0], low: [0, 1] } },
  { id: "jump_rope", cat: "cadence", q: "縄跳びするなら", a: "速く軽く跳ぶ", b: "ゆっくり高く跳ぶ", weight: { high: [1, 0], low: [0, 1] } },
  { id: "swim_stroke", cat: "cadence", q: "泳ぐとき（イメージでOK）", a: "速いストロークで回転", b: "大きなストロークでゆったり", weight: { high: [1, 0], low: [0, 1] } },
  
  // === APA: 姿勢傾向 ===
  { id: "desk_posture", cat: "posture", q: "デスクワーク中の姿勢", a: "前のめりになりがち", b: "背もたれに寄りかかる", weight: { open: [0, 1], forward: [1, 0] } },
  { id: "breath_feel", cat: "posture", q: "深呼吸するとき楽なのは", a: "胸を開いて吸う", b: "お腹を膨らませて吸う", weight: { open: [1, 0], forward: [0, 1] } },
  { id: "sleep_position", cat: "posture", q: "寝るとき楽な姿勢", a: "横向き・うつ伏せが多い", b: "仰向けが多い", weight: { open: [0, 1], forward: [1, 0] } },
  { id: "shoulder_relax", cat: "posture", q: "肩の力を抜くと", a: "後ろに引く感じ", b: "前に落ちる感じ", weight: { open: [1, 0], forward: [0, 1] } },
  // 追加：姿勢質問
  { id: "phone_look", cat: "posture", q: "スマホを見るとき", a: "顔を近づける", b: "スマホを顔の高さに上げる", weight: { open: [0, 1], forward: [1, 0] } },
  { id: "tv_watch", cat: "posture", q: "テレビを見るとき", a: "前のめりで見入る", b: "背もたれにもたれて見る", weight: { open: [0, 1], forward: [1, 0] } },
  { id: "read_book", cat: "posture", q: "本を読むとき", a: "本に顔を近づける", b: "本を顔の前に持ってくる", weight: { open: [0, 1], forward: [1, 0] } },
  { id: "drive_posture", cat: "posture", q: "運転するとき（イメージでOK）", a: "ハンドルに近づく", b: "シートにもたれる", weight: { open: [0, 1], forward: [1, 0] } },
  { id: "photo_pose", cat: "posture", q: "写真を撮られるとき", a: "胸を張る", b: "自然体で猫背気味", weight: { open: [1, 0], forward: [0, 1] } },
  { id: "meeting_sit", cat: "posture", q: "会議や授業で座るとき", a: "背筋を伸ばす", b: "リラックスして座る", weight: { open: [1, 0], forward: [0, 1] } },
  { id: "concentrate", cat: "posture", q: "集中するとき、体は？", a: "前のめりになる", b: "姿勢を正す", weight: { open: [0, 1], forward: [1, 0] } },
  
  // === メンタルAPA: 攻撃性（アグレッシブ vs ステディ）===
  { id: "janken", cat: "mental_agg", q: "じゃんけんで最初に出しがちなのは？", a: "グー", b: "パー", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "game_style", cat: "mental_agg", q: "ゲームや勝負ごとで好きなのは？", a: "コツコツ積み上げ", b: "一発逆転", weight: { aggressive: [0, 1], steady: [1, 0] } },
  { id: "lost_road", cat: "mental_agg", q: "知らない道で迷ったら？", a: "直感で進む", b: "一旦戻って確認", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "task_start", cat: "mental_agg", q: "仕事やタスクの進め方は？", a: "計画してから始める", b: "まずやってみる", weight: { aggressive: [0, 1], steady: [1, 0] } },
  { id: "risk_take", cat: "mental_agg", q: "チャンスがあったとき", a: "リスク覚悟で飛び込む", b: "確実なときまで待つ", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "deadline", cat: "mental_agg", q: "締め切りがあるとき", a: "ギリギリに集中して仕上げる", b: "余裕をもって早めに終わらせる", weight: { aggressive: [1, 0], steady: [0, 1] } },
  // 追加：攻撃性質問
  { id: "first_move", cat: "mental_agg", q: "勝負事で先手を取る？", a: "先に仕掛ける", b: "相手の出方を見る", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "new_restaurant", cat: "mental_agg", q: "新しいレストランで", a: "冒険メニューを頼む", b: "定番を選ぶ", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "conversation", cat: "mental_agg", q: "会話では", a: "自分から話しかける", b: "話しかけられるのを待つ", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "queue_cut", cat: "mental_agg", q: "行列で割り込まれたら", a: "すぐ注意する", b: "我慢するか様子見", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "opinion_share", cat: "mental_agg", q: "意見を求められたとき", a: "すぐ言う", b: "考えてから言う", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "deal_nego", cat: "mental_agg", q: "値段交渉は", a: "積極的にする", b: "あまりしない", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "volunteer", cat: "mental_agg", q: "誰かやる人？と聞かれたら", a: "手を挙げる", b: "様子を見る", weight: { aggressive: [1, 0], steady: [0, 1] } },
  { id: "challenge_accept", cat: "mental_agg", q: "難しい挑戦を振られたら", a: "とりあえずやる", b: "できるか考える", weight: { aggressive: [1, 0], steady: [0, 1] } },
  
  // === メンタルAPA: 集団性（ソロ vs チーム）===
  { id: "travel_style", cat: "mental_team", q: "旅行するなら？", a: "一人旅", b: "グループで", weight: { solo: [1, 0], team: [0, 1] } },
  { id: "sports_watch", cat: "mental_team", q: "スポーツで注目するのは？", a: "個人の活躍・エース", b: "チーム戦術・連携", weight: { solo: [1, 0], team: [0, 1] } },
  { id: "work_focus", cat: "mental_team", q: "作業に集中できるのは？", a: "誰かと一緒のとき", b: "一人のとき", weight: { solo: [0, 1], team: [1, 0] } },
  { id: "achieve_joy", cat: "mental_team", q: "達成感を感じるのは？", a: "チームで成し遂げたとき", b: "自分の力で成し遂げたとき", weight: { solo: [0, 1], team: [1, 0] } },
  { id: "problem_solve", cat: "mental_team", q: "問題にぶつかったとき", a: "まず自分で考える", b: "すぐ誰かに相談する", weight: { solo: [1, 0], team: [0, 1] } },
  // 追加：集団性質問
  { id: "lunch_style", cat: "mental_team", q: "ランチは？", a: "一人でサクッと", b: "誰かと一緒に", weight: { solo: [1, 0], team: [0, 1] } },
  { id: "movie_watch", cat: "mental_team", q: "映画を見るなら", a: "一人で没頭", b: "誰かと感想を言い合う", weight: { solo: [1, 0], team: [0, 1] } },
  { id: "study_style", cat: "mental_team", q: "勉強・学習するとき", a: "一人で集中", b: "誰かと教え合う", weight: { solo: [1, 0], team: [0, 1] } },
  { id: "karaoke", cat: "mental_team", q: "カラオケは？", a: "ヒトカラもあり", b: "大勢で盛り上がる", weight: { solo: [1, 0], team: [0, 1] } },
  { id: "game_prefer", cat: "mental_team", q: "ゲームするなら", a: "ソロプレイ", b: "マルチプレイ", weight: { solo: [1, 0], team: [0, 1] } },
  { id: "hobby_share", cat: "mental_team", q: "趣味は", a: "一人で楽しむ派", b: "仲間と楽しむ派", weight: { solo: [1, 0], team: [0, 1] } },
  { id: "decision_make", cat: "mental_team", q: "大事な決断は", a: "自分で決める", b: "誰かに相談してから", weight: { solo: [1, 0], team: [0, 1] } },
  { id: "celebration", cat: "mental_team", q: "うれしいことがあったら", a: "一人で噛みしめる", b: "誰かに報告したい", weight: { solo: [1, 0], team: [0, 1] } },
  
  // === 追加体験型質問 ===
  { id: "action_squat", cat: "balance", type: "action",
    q: "軽くスクワットしてみて",
    instruction: "しゃがんだとき、体重はどこにかかってる？",
    a: "つま先〜母指球", b: "踵〜足裏全体",
    weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "action_reach", cat: "trunk", type: "action",
    q: "両手を上に伸ばしてみて",
    instruction: "伸びるとき、意識が向くのは？",
    a: "みぞおちが伸びる感じ", b: "背中が伸びる感じ",
    weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "action_twist", cat: "trunk", type: "action",
    q: "上半身を左右にひねってみて",
    instruction: "ひねりの起点はどこ？",
    a: "みぞおち・お腹", b: "腰・背中",
    weight: { typeA: [1, 0], typeB: [0, 1] } },
  { id: "action_balance", cat: "balance", type: "action",
    q: "片足で立ってみて",
    instruction: "バランスを取るとき、体重は？",
    a: "つま先側でバランス", b: "足裏全体でバランス",
    weight: { num1: [1, 0], num2: [0, 1] } },
    
  // === クロス/パラレル判定（横の動き） ===
  // A1/B2 = クロス派（対角線の動き）、A2/B1 = パラレル派（平行の動き）
  { id: "cross_walk", cat: "movement", q: "歩くとき、腕の振りは？", 
    a: "脚と反対の腕が自然に出る（右足と左腕）", b: "あまり意識しない or 同じ側が出やすい", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_throw", cat: "movement", q: "ボールを投げるとき、体の使い方は？", 
    a: "腰をひねって対角線に体重移動", b: "体幹を固定して腕中心で投げる", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_kick", cat: "movement", q: "ボールを蹴るとき、自然なのは？", 
    a: "蹴る脚と反対の腕を大きく使う", b: "両腕でバランスを取る程度", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_punch", cat: "movement", q: "パンチを打つイメージで近いのは？", 
    a: "腰を回転させて対角線に体重を乗せる", b: "肩と腕を前に押し出す感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_twist", cat: "movement", q: "体をひねる動きは？", 
    a: "得意、自然にできる", b: "あまり得意じゃない、硬い感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_turn", cat: "movement", q: "後ろを振り向くとき、どう動く？", 
    a: "腰からひねって振り向く", b: "体全体を回す or 首だけで振り向く", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_swing", cat: "movement", q: "ゴルフや野球のスイングをイメージすると？", 
    a: "腰の回転が先で、腕がついてくる感じ", b: "腕と体が一緒に動く感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_dance", cat: "movement", q: "踊るとき、得意な動きは？", 
    a: "ツイスト、ひねりを使った動き", b: "ステップ、左右対称の動き", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_squat", cat: "movement", q: "スクワットするとき、自然なのは？", 
    a: "少し体をひねりながら", b: "まっすぐ上下に動く", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_push", cat: "movement", q: "壁を両手で押すとき、力の入れ方は？", 
    a: "左右交互に押す感じ", b: "両手同時に押す感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_swim", cat: "movement", q: "泳ぎで得意（または得意そう）なのは？", 
    a: "クロール（左右交互）", b: "平泳ぎ・バタフライ（左右対称）", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_climb", cat: "movement", q: "はしごを登るイメージで近いのは？", 
    a: "手と足が対角線で交互に動く", b: "同じ側の手足が一緒に動きやすい", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_reach", cat: "movement", q: "右側のものを取るとき、自然なのは？", 
    a: "右手を伸ばしながら左足に体重を乗せる", b: "右手と右足側に体重を乗せる", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_run", cat: "movement", q: "走るとき、腕と脚の連動は？", 
    a: "対角線（右脚と左腕）が自然に連動", b: "あまり意識しない、腕は添える程度", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_jump", cat: "movement", q: "その場でジャンプするとき、腕は？", 
    a: "左右バラバラに振り上げることもある", b: "両腕一緒に振り上げる", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_bike_stand", cat: "movement", q: "自転車でダンシングするとき、近いのは？", 
    a: "バイクを左右に振りながら体をひねる", b: "バイクをあまり振らず体幹で踏む", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_pedal", cat: "movement", q: "ペダリングの感覚で近いのは？", 
    a: "腰のひねりを使って回す感じ", b: "上下に踏み込む感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_cornering", cat: "movement", q: "コーナリングで自然なのは？", 
    a: "内側の肩を落として体をひねる", b: "バイクと一緒に傾く", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_sprint", cat: "movement", q: "スプリントで全力を出すとき？", 
    a: "腕を引くと反対の脚に力が入る感じ", b: "両脚で交互に踏み下ろす感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_climb_bike", cat: "movement", q: "ヒルクライムでシッティングのとき？", 
    a: "微妙に体をひねりながらペダリング", b: "体幹を固定してまっすぐ踏む", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
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

// タイプ定義（サイクリング用）
const TYPE_INFO_CYCLING = {
  A1: {
    name: "F-I（Front-Inner）",
    sub: "前体幹 × 内側荷重",
    icon: "zap",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
    traits: ["捻りながら前に踏み込む", "みぞおちと股関節がエンジン", "つま先でリズムを取る"],
    description: "身体を捻じりながら前方向にパワーを出すタイプ。高回転でスパッと加速。",
    strengths: ["スプリント", "アタック", "短い登り"],
    weaknesses: ["長時間の一定ペース", "向かい風"],
    radarData: [95, 45, 60, 55, 50],
    bodyMechanics: {
      trunk: { type: "Fタイプ（前体幹）", description: "みぞおち・股関節主導", detail: "身体を「折る」ように使うのが得意。" },
      movement: { type: "クロス（対角連動）", description: "捻じりの動きが自然", detail: "右腕と左脚、左腕と右脚が連動する。" },
      balance: { type: "内側荷重（Inner）", description: "母指球・内側で踏む", detail: "膝がまっすぐ〜やや内向き。内転筋を使いやすい。" }
    },
    // フィッティング詳細
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.875〜0.885", detail: "やや高めで股関節を使いやすく" },
        setback: { position: "前寄り（0〜-10mm）", detail: "膝がペダル軸より前に出るセッティング" },
        tilt: { angle: "水平〜やや前下がり", detail: "骨盤を前傾させやすくする" },
      },
      handlebar: {
        drop: { range: "大きめ（-40〜-60mm）", detail: "深い前傾で空気抵抗を減らす" },
        reach: { range: "やや長め", detail: "前乗りポジションに合わせる" },
        width: { guide: "肩幅と同じ〜やや狭め", detail: "エアロ効果を高める" },
      },
      cleat: {
        position: { fore_aft: "深め（前寄り）", detail: "母指球より後ろにクリート" },
        angle: { rotation: "やや外向き", detail: "股関節の自然な動きに合わせる" },
        float: { degree: "少なめ（0〜4.5°）", detail: "ダイレクトなパワー伝達" },
      },
      crank: {
        length: { guide: "股下 × 0.20〜0.205", detail: "やや短めで高回転向き" },
      },
    },
    selfCheck: [
      { name: "股関節屈曲テスト", method: "仰向けで膝を胸に引き寄せる", good: "楽に120°以上曲がる", action: "深い前傾OK" },
      { name: "つま先立ちバランス", method: "目を閉じてつま先立ち10秒", good: "安定している", action: "前重心確定" },
    ],
    shoes: {
      type: { name: "カーボン高剛性フレーム + エアロロード", reason: "瞬発的なパワー伝達に最適" },
      drop: { name: "サドル高め / 前乗りセッティング", reason: "ダンシングで踏みやすい" },
      cushion: { name: "50mm〜ディープリム", reason: "加速後の巡航速度維持に有利" },
      examples: ["Specialized S-Works Tarmac", "Cervélo S5", "Giant Propel"]
    },
    products: [
      { name: "Specialized Tarmac SL8", price: "550,000〜", reason: "高剛性カーボン。スプリントでのパワー伝達が最強。", amazonQuery: "Specialized+Tarmac", rakutenQuery: "Specialized%20Tarmac", image: "" },
      { name: "Zipp 404 Firecrest", price: "280,000", reason: "58mmディープリム。エアロ性能と加速のバランス◎", amazonQuery: "Zipp+404+Firecrest", rakutenQuery: "Zipp%20404%20Firecrest", image: "" },
      { name: "Shimano Dura-Ace ペダル", price: "32,000", reason: "軽量×高剛性。ダンシングでのパワー伝達に。", amazonQuery: "Shimano+Dura-Ace+PD-R9100", rakutenQuery: "Shimano%20Dura-Ace%20ペダル", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "高回転型（90rpm+）", detail: "軽いギアでクルクル回す。踏み込みより回転重視。" },
      posture: { title: "ポジション", type: "やや前乗り", detail: "サドル前方に座り、ハンドルに体重をかけやすく。" },
      armSwing: { title: "ダンシング", type: "積極的に使う", detail: "30秒〜1分ごとにダンシングを入れてパワーを出す。" },
      cadence: { title: "ケイデンス", type: "80-95rpm", detail: "高回転を維持して脚を温存。" }
    },
    guide: {
      fiveK: { title: "ヒルクライムの走り方", tips: ["序盤は抑えめ、後半ビルドアップ", "ダンシングを積極的に", "勾配キツい区間でアタック"], avoid: "序盤から飛ばしすぎない。" },
      half: { title: "ロングライドの走り方", tips: ["平坦はドラフティング活用", "定期的にダンシングでほぐす", "補給は早めに"], avoid: "前半で脚を使い切らない。" },
      full: { title: "レースでの走り方", tips: ["勝負所まで脚を温存", "ラスト1kmでスプリント", "逃げには乗らない"], avoid: "長い逃げは不利。" },
      training: { title: "おすすめトレーニング", tips: ["インターバル", "スプリント練習", "坂道ダッシュ"], avoid: "LSDばかりだと鈍る。" }
    }
  },
  A2: {
    name: "F-O（Front-Outer）",
    sub: "前体幹 × 外側荷重",
    icon: "mountain",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    traits: ["前体幹で外側荷重", "みぞおしと股関節がエンジン", "足裏全体で安定"],
    description: "前体幹を使いながら外側で安定するタイプ。粘り強く登れる。",
    strengths: ["ロングライド", "ヒルクライム", "一定ペース維持"],
    weaknesses: ["急加速", "スプリント勝負"],
    radarData: [50, 95, 70, 65, 85],
    bodyMechanics: {
      trunk: { type: "Fタイプ（前体幹）", description: "みぞおち・股関節主導", detail: "身体を「折る」ように使う。" },
      movement: { type: "パラレル（同側連動）", description: "平行の動きが自然", detail: "同じ側の腕と脚が連動する。" },
      balance: { type: "外側荷重（Outer）", description: "小指球・外側も使う", detail: "膝がやや外向き。外側広筋を使いやすい。" }
    },
    // フィッティング詳細
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.870〜0.880", detail: "標準〜やや低めで踏み込みやすく" },
        setback: { position: "後ろ寄り（+10〜+20mm）", detail: "膝がペダル軸より後ろ、トルク重視" },
        tilt: { angle: "水平〜やや後ろ上がり", detail: "骨盤を安定させる" },
      },
      handlebar: {
        drop: { range: "控えめ（-20〜-40mm）", detail: "上体を起こして呼吸しやすく" },
        reach: { range: "標準〜やや短め", detail: "後ろ乗りとのバランス" },
        width: { guide: "肩幅と同じ〜やや広め", detail: "安定感を重視" },
      },
      cleat: {
        position: { fore_aft: "浅め（後ろ寄り）", detail: "母指球の真下〜やや前にクリート" },
        angle: { rotation: "ニュートラル〜やや内向き", detail: "膝の自然な軌道に合わせる" },
        float: { degree: "多め（6°）", detail: "長時間のペダリングで膝を守る" },
      },
      crank: {
        length: { guide: "股下 × 0.205〜0.215", detail: "やや長めでトルクをかけやすく" },
      },
    },
    selfCheck: [
      { name: "踵立ちバランス", method: "目を閉じて踵立ち10秒", good: "安定している", action: "後重心確定" },
      { name: "ハムストリング柔軟性", method: "立位体前屈", good: "指先が床につく", action: "深い前傾も可能" },
    ],
    shoes: {
      type: { name: "軽量クライミングフレーム", reason: "登りでの軽さを重視" },
      drop: { name: "サドルやや後ろ / 標準セッティング", reason: "トルクをかけやすい" },
      cushion: { name: "30-40mmミドルハイト", reason: "軽さと空力のバランス" },
      examples: ["Trek Émonda", "Specialized Aethos", "Scott Addict RC"]
    },
    products: [
      { name: "Trek Émonda SLR", price: "650,000〜", reason: "超軽量フレーム。ヒルクライムに最適。", amazonQuery: "Trek+Emonda", rakutenQuery: "Trek%20Emonda", image: "" },
      { name: "Roval Alpinist CLX", price: "380,000", reason: "1,250g超軽量ホイール。登りで圧倒的優位。", amazonQuery: "Roval+Alpinist+CLX", rakutenQuery: "Roval%20Alpinist", image: "" },
      { name: "fi'zi:k Antares サドル", price: "28,000", reason: "後ろ乗りに最適な形状。長時間でも快適。", amazonQuery: "fizik+Antares", rakutenQuery: "fizik%20Antares", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "トルク型（70-85rpm）", detail: "重いギアでグイグイ踏む。" },
      posture: { title: "ポジション", type: "やや後ろ乗り", detail: "サドル後方でしっかり踏み込む。" },
      armSwing: { title: "ダンシング", type: "控えめに", detail: "シッティング中心で体力温存。" },
      cadence: { title: "ケイデンス", type: "70-80rpm", detail: "低めでトルクをかける。" }
    },
    guide: {
      fiveK: { title: "ヒルクライムの走り方", tips: ["最初から自分のペース", "重めギアでトルク", "シッティング中心"], avoid: "周りに惑わされない。" },
      half: { title: "ロングライドの走り方", tips: ["イーブンペース維持", "向かい風では先頭を引く"], avoid: "速い人についていきすぎない。" },
      full: { title: "レースでの走り方", tips: ["長い登りで勝負", "早めに仕掛けて独走"], avoid: "ゴール前スプリントは不利。" },
      training: { title: "おすすめトレーニング", tips: ["LSD", "峠走", "ペース走"], avoid: "スピード練習も忘れずに。" }
    }
  },
  B1: {
    name: "R-I（Rear-Inner）",
    sub: "後体幹 × 内側荷重",
    icon: "wave",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
    traits: ["後体幹で内側荷重", "首・肩甲骨・腰が連動", "内側で安定して進む"],
    description: "身体全体を一体で使い、流れるように前へ進むタイプ。効率的。",
    strengths: ["ペダリング効率", "平地巡航", "集団走行"],
    weaknesses: ["ダンシング", "急な地形変化"],
    radarData: [55, 70, 95, 75, 70],
    bodyMechanics: {
      trunk: { type: "Rタイプ（後体幹）", description: "首・肩甲骨・腰主導", detail: "身体を「一体」で使う。" },
      movement: { type: "パラレル（同側連動）", description: "平行の動きが自然", detail: "捻じらず安定したフォーム。" },
      balance: { type: "内側荷重（Inner）", description: "母指球・内側で踏む", detail: "膝がまっすぐ〜やや内向き。内転筋を使いやすい。" }
    },
    // フィッティング詳細
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.875〜0.885", detail: "効率重視のやや高めセッティング" },
        setback: { position: "ニュートラル（0mm前後）", detail: "膝がペダル軸の真上" },
        tilt: { angle: "完全水平", detail: "骨盤の安定を最優先" },
      },
      handlebar: {
        drop: { range: "中程度（-30〜-50mm）", detail: "効率と快適性のバランス" },
        reach: { range: "標準", detail: "自然な肘の曲がりを維持" },
        width: { guide: "肩幅と同じ", detail: "自然な姿勢を維持" },
      },
      cleat: {
        position: { fore_aft: "標準（母指球の真下）", detail: "バランスの取れた位置" },
        angle: { rotation: "ニュートラル", detail: "自然な足の向き" },
        float: { degree: "標準（4.5°）", detail: "適度な自由度" },
      },
      crank: {
        length: { guide: "股下 × 0.205", detail: "標準的な長さで効率重視" },
      },
    },
    selfCheck: [
      { name: "片足立ちバランス", method: "目を閉じて30秒片足立ち", good: "ほぼ動かない", action: "体幹が安定している" },
      { name: "スムーズペダリング", method: "片足ペダリング30秒", good: "カクつかない", action: "効率型確定" },
    ],
    shoes: {
      type: { name: "オールラウンドフレーム", reason: "効率的なペダリングを活かす" },
      drop: { name: "標準セッティング", reason: "バランス重視" },
      cushion: { name: "40-50mmミドルディープ", reason: "巡航効率を最大化" },
      examples: ["Canyon Ultimate", "Cannondale SuperSix", "BMC Teammachine"]
    },
    products: [
      { name: "Canyon Ultimate CF SLX", price: "450,000〜", reason: "コスパ最強のオールラウンダー。効率重視のライダーに。", amazonQuery: "Canyon+Ultimate", rakutenQuery: "Canyon%20Ultimate", image: "" },
      { name: "DT Swiss ARC 1400", price: "350,000", reason: "50mmディープ。巡航効率と軽さのバランス◎", amazonQuery: "DT+Swiss+ARC+1400", rakutenQuery: "DT%20Swiss%20ARC%201400", image: "" },
      { name: "Wahoo KICKR", price: "180,000", reason: "スマートローラー。効率的なペダリング練習に最適。", amazonQuery: "Wahoo+KICKR", rakutenQuery: "Wahoo%20KICKR", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "高効率型", detail: "綺麗な円運動でロスなく回す。" },
      posture: { title: "ポジション", type: "ニュートラル", detail: "標準的なポジションで効率重視。" },
      armSwing: { title: "ダンシング", type: "あまり使わない", detail: "シッティングで効率よく。" },
      cadence: { title: "ケイデンス", type: "90rpm前後", detail: "一定リズムを維持。" }
    },
    guide: {
      fiveK: { title: "ヒルクライムの走り方", tips: ["シッティングメイン", "高回転（90rpm+）維持", "同じリズムキープ"], avoid: "無理にダンシングしない。" },
      half: { title: "ロングライドの走り方", tips: ["一定ケイデンス維持", "ドラフティング最大活用"], avoid: "ペースの上げ下げに付き合わない。" },
      full: { title: "レースでの走り方", tips: ["集団内で脚を溜める", "効率で消耗を抑える"], avoid: "単独逃げは不向き。" },
      training: { title: "おすすめトレーニング", tips: ["テンポ走", "ペダリングドリル", "ローラー台"], avoid: "フォームを崩す追い込みは逆効果。" }
    }
  },
  B2: {
    name: "R-O（Rear-Outer）",
    sub: "後体幹 × 外側荷重",
    icon: "crosshair",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899, #db2777)",
    traits: ["後体幹で外側荷重", "首・肩甲骨・腰が連動", "外側でどっしり安定"],
    description: "身体全体を一体で使い、安定感を持って進むタイプ。適応力が高い。",
    strengths: ["適応力", "安定感", "レース全般"],
    weaknesses: ["突出した武器がない（逆に強み）"],
    radarData: [70, 75, 75, 95, 80],
    bodyMechanics: {
      trunk: { type: "Rタイプ（後体幹）", description: "首・肩甲骨・腰主導", detail: "身体を「一体」で使う。" },
      movement: { type: "クロス（対角連動）", description: "捻じりの動きが自然", detail: "対角線の動きが得意。" },
      balance: { type: "外側荷重（Outer）", description: "小指球・外側も使う", detail: "膝がやや外向き。外側広筋を使いやすい。" }
    },
    // フィッティング詳細
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.865〜0.875", detail: "やや低めで安定感重視" },
        setback: { position: "やや後ろ（+5〜+15mm）", detail: "安定した踏み込みのため" },
        tilt: { angle: "水平〜やや後ろ上がり", detail: "長時間でも快適に" },
      },
      handlebar: {
        drop: { range: "控えめ（-10〜-30mm）", detail: "アップライト気味で快適性重視" },
        reach: { range: "やや短め", detail: "リラックスしたポジション" },
        width: { guide: "肩幅〜やや広め", detail: "安定感とコントロール性" },
      },
      cleat: {
        position: { fore_aft: "やや浅め（後ろ寄り）", detail: "安定したペダリングのため" },
        angle: { rotation: "自然な足の向き", detail: "無理のない角度" },
        float: { degree: "多め（6°）", detail: "膝への負担軽減" },
      },
      crank: {
        length: { guide: "股下 × 0.205〜0.21", detail: "標準〜やや長めで安定感" },
      },
    },
    selfCheck: [
      { name: "両足スクワット", method: "ゆっくり10回、膝の向きを確認", good: "膝がつま先と同じ方向", action: "安定型のペダリングが合う" },
      { name: "腰回旋チェック", method: "座って上体だけ左右に捻る", good: "左右差が少ない", action: "パラレルタイプ確定" },
    ],
    shoes: {
      type: { name: "オールラウンドレースフレーム", reason: "あらゆる状況に対応" },
      drop: { name: "標準〜やや後ろ乗り", reason: "安定重視" },
      cushion: { name: "40-50mm汎用性重視", reason: "状況を選ばない" },
      examples: ["Pinarello Dogma F", "Colnago V4Rs", "Factor O2"]
    },
    products: [
      { name: "Pinarello Dogma F", price: "800,000〜", reason: "最高峰のオールラウンドフレーム。プロも愛用。", amazonQuery: "Pinarello+Dogma", rakutenQuery: "Pinarello%20Dogma", image: "" },
      { name: "Campagnolo Bora WTO 45", price: "400,000", reason: "45mmオールラウンドホイール。どんな状況にも対応。", amazonQuery: "Campagnolo+Bora+WTO", rakutenQuery: "Campagnolo%20Bora%20WTO", image: "" },
      { name: "Garmin Edge 840", price: "60,000", reason: "高機能サイコン。データ分析で走りを改善。", amazonQuery: "Garmin+Edge+840", rakutenQuery: "Garmin%20Edge%20840", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "臨機応変型", detail: "状況に応じてペダリングを変える。" },
      posture: { title: "ポジション", type: "ニュートラル〜やや後ろ", detail: "安定感重視。" },
      armSwing: { title: "ダンシング", type: "状況に応じて", detail: "使い分けられる。" },
      cadence: { title: "ケイデンス", type: "75-90rpm", detail: "状況に応じて変える。" }
    },
    guide: {
      fiveK: { title: "ヒルクライムの走り方", tips: ["シッティングとダンシング使い分け", "周りを見ながら対応"], avoid: "どっちつかずにならない。" },
      half: { title: "ロングライドの走り方", tips: ["臨機応変に動く", "先頭交代にも参加"], avoid: "周りに合わせすぎない。" },
      full: { title: "レースでの走り方", tips: ["展開を見ながら動く", "逃げも集団戦もOK"], avoid: "戦略にこだわりすぎない。" },
      training: { title: "おすすめトレーニング", tips: ["バランスよく色々", "弱点を補う練習"], avoid: "偏りすぎない。" }
    }
  },
};

// スポーツ別TYPE_INFOを取得
const getTypeInfo = (sport, type) => {
  const sportData = TYPE_INFO_CYCLING;
  return sportData[type];
};

// Premium Card コンポーネント
const Card = ({ children, style = {}, pressed = false }) => (
  <div style={{ 
    background: theme.card,
    borderRadius: 0, 
    padding: 32,
    border: `1px solid ${theme.cardBorder}`,
    boxShadow: "none",
    transition: "all 0.3s ease",
    ...style 
  }}>
    {children}
  </div>
);

// Premium ボタン
const NeuButton = ({ children, onClick, active = false, color = C.accent, style = {} }) => (
  <button
    onClick={onClick}
    style={{
      background: active ? color : "transparent",
      border: `1px solid ${active ? color : theme.cardBorder}`,
      borderRadius: 0,
      padding: "14px 28px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "none",
      color: active ? "#fff" : C.textMuted,
      fontWeight: 500,
      fontSize: 13,
      letterSpacing: "1px",
      textTransform: "uppercase",
      ...style
    }}
  >
    {children}
  </button>
);

// 星評価コンポーネント
const StarRating = ({ stars, maxStars = 5, color = C.accent, size = 14 }) => (
  <div style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: maxStars }, (_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < stars ? color : C.shadowDark} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

export default function App() {
  const [mode, setMode] = useState("start");
  const [sport, setSport] = useState("cycling"); // "cycling" only
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skipped, setSkipped] = useState(new Set());
  const [scores, setScores] = useState({
    typeA: 0, typeB: 0, num1: 0, num2: 0, high: 0, low: 0, open: 0, forward: 0,
    aggressive: 0, steady: 0, solo: 0, team: 0,
    cross: 0, parallel: 0, // クロス/パラレル（横の動き）
  });
  const [showingAnswer, setShowingAnswer] = useState(false);
  const [result, setResult] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [savedResult, setSavedResult] = useState(null);
  
  // シューズ/ギアフィルター用state
  const [shoeFilters, setShoeFilters] = useState({
    priceMax: 999999,
    brands: [],
    use: null,
    category: null, // サイクリング用カテゴリ
  });
  
  // 商品シャッフル用state（カテゴリごと）
  const [shuffleKey, setShuffleKey] = useState({});
  
  // フィッティング計算用state
  const [bodyMetrics, setBodyMetrics] = useState({
    height: "", // 身長(cm)
    inseam: "", // 股下(cm)
    armSpan: "", // 腕の長さ(cm) - オプション
    shoulderWidth: "", // 肩幅(cm) - オプション
    bodyType: "", // 体型タイプ: "long" | "standard" | "short" | ""
    shoulderType: "standard", // 肩幅タイプ: "wide" | "standard" | "narrow"
  });
  const [showFittingCalc, setShowFittingCalc] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // 回答履歴表示
  const [stageUp, setStageUp] = useState(null); // ステージアップ演出 { level, message }
  const [prevAccuracyLevel, setPrevAccuracyLevel] = useState(0); // 前回の精度レベル
  
  // 初期化：質問シャッフル＆保存結果ロード
  useEffect(() => {
    const shuffled = [...QUESTION_POOL].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    
    // LocalStorageから保存された結果を読み込み
    try {
      const saved = localStorage.getItem("stancecore_result");
      if (saved) {
        const parsed = JSON.parse(saved);
        setSavedResult(parsed);
      }
      // フィッティングデータも読み込み
      const savedMetrics = localStorage.getItem("stancecore_metrics");
      if (savedMetrics) {
        const parsedMetrics = JSON.parse(savedMetrics);
        setBodyMetrics(prev => ({ ...prev, ...parsedMetrics }));
      }
    } catch (e) {
      console.log("No saved result");
    }
  }, []);
  
  // bodyMetricsが変更されたら保存
  useEffect(() => {
    if (bodyMetrics.height || bodyMetrics.inseam) {
      try {
        localStorage.setItem("stancecore_metrics", JSON.stringify(bodyMetrics));
      } catch (e) {
        console.log("Failed to save metrics");
      }
    }
  }, [bodyMetrics]);
  
  const getAccuracyLevel = () => {
    const count = Object.keys(answers).length;
    let level = ACCURACY_LEVELS[0];
    for (const l of ACCURACY_LEVELS) {
      if (count >= l.min) level = l;
    }
    return { ...level, count };
  };
  
  // ステージアップチェック
  const STAGE_THRESHOLDS = [
    { min: 5, level: 1, label: "基本解析", message: "基本解析モード突入" },
    { min: 10, level: 2, label: "標準解析", message: "標準解析モードへ" },
    { min: 20, level: 3, label: "高精度", message: "高精度モードへ" },
    { min: 30, level: 4, label: "完全解析", message: "完全解析達成" },
  ];
  
  const checkStageUp = (answerCount, newScores) => {
    const newStage = STAGE_THRESHOLDS.filter(s => answerCount >= s.min).pop();
    const newLevel = newStage?.level || 0;
    
    if (newLevel > prevAccuracyLevel) {
      setPrevAccuracyLevel(newLevel);
      
      // 僅差チェック
      const typeABDiff = Math.abs(newScores.typeA - newScores.typeB);
      const num12Diff = Math.abs(newScores.num1 - newScores.num2);
      const isClose = typeABDiff <= 2 || num12Diff <= 2;
      
      // 完全解析達成時
      if (newLevel === 4) {
        if (isClose) {
          // 僅差の場合は警告付きで表示、自動遷移しない
          setStageUp({
            ...newStage,
            isClose: true,
            message: "完全解析達成！でも判定が僅差..."
          });
          setTimeout(() => setStageUp(null), 2500);
        } else {
          // 僅差でなければ自動で結果画面へ
          setStageUp(newStage);
          setTimeout(() => {
            setStageUp(null);
            calculateResult();
          }, 2500);
        }
      } else {
        setStageUp(newStage);
        setTimeout(() => setStageUp(null), 2000);
      }
    }
  };
  
  const handleAnswer = (choice) => {
    // 処理中または回答済みならスキップ
    if (showingAnswer) return;
    
    const q = questions[currentIndex];
    if (!q) return;
    if (answers[q.id] !== undefined) return;
    
    setShowingAnswer(true);
    
    const newAnswers = { ...answers, [q.id]: choice };
    setAnswers(newAnswers);
    
    const newScores = { ...scores };
    Object.entries(q.weight).forEach(([key, values]) => {
      newScores[key] = (newScores[key] || 0) + values[choice === "a" ? 0 : 1];
    });
    setScores(newScores);
    
    // ステージアップチェック（newScoresを渡す）
    checkStageUp(Object.keys(newAnswers).length, newScores);
    
    setTimeout(() => {
      setShowingAnswer(false);
      goToNext(newAnswers, newScores);
    }, 250);
  };
  
  const handleSkip = () => {
    const q = questions[currentIndex];
    const newSkipped = new Set([...skipped, q.id]);
    setSkipped(newSkipped);
    setShowingAnswer(true);
    setTimeout(() => {
      setShowingAnswer(false);
      goToNext();
    }, 200);
  };
  
  // 回答を削除（履歴から修正）
  const removeAnswer = (questionId) => {
    const newAnswers = { ...answers };
    delete newAnswers[questionId];
    setAnswers(newAnswers);
    
    // スコアを再計算
    const newScores = { typeA: 0, typeB: 0, num1: 0, num2: 0, high: 0, low: 0, open: 0, forward: 0, aggressive: 0, steady: 0, solo: 0, team: 0 };
    Object.entries(newAnswers).forEach(([qId, ans]) => {
      const q = questions.find(q => q.id === qId);
      if (!q || !q.weight) return;
      
      Object.entries(q.weight).forEach(([key, val]) => {
        if (Array.isArray(val)) {
          newScores[key] += val[ans === "a" ? 0 : 1];
        }
      });
    });
    setScores(newScores);
    
    // その質問に移動
    const qIndex = questions.findIndex(q => q.id === questionId);
    if (qIndex >= 0) {
      setCurrentIndex(qIndex);
      setShowHistory(false);
    }
  };
  
  const goToNext = (latestAnswers, latestScores) => {
    // 未回答・未スキップの質問を取得
    const currentAnswers = latestAnswers || answers;
    const currentScores = latestScores || scores;
    const unanswered = questions.filter(q => !currentAnswers[q.id] && !skipped.has(q.id));
    
    if (unanswered.length === 0) return;
    
    // 同点チェック
    const typeATied = currentScores.typeA === currentScores.typeB;
    const numTied = currentScores.num1 === currentScores.num2;
    
    // 優先すべきカテゴリを決定
    let priorityCat = null;
    if (typeATied && numTied) {
      // 両方同点 → trunk（体幹）を優先
      priorityCat = "trunk";
    } else if (typeATied) {
      // A/B同点 → trunk（体幹）質問を優先
      priorityCat = "trunk";
    } else if (numTied) {
      // 1/2同点 → balance（重心）質問を優先
      priorityCat = "balance";
    }
    
    // 優先カテゴリの質問を探す
    let nextQuestion = null;
    if (priorityCat) {
      nextQuestion = unanswered.find(q => q.cat === priorityCat || q.cat === "both");
    }
    
    // なければ順番通り
    if (!nextQuestion) {
      nextQuestion = unanswered[0];
    }
    
    // 質問のインデックスを取得して移動
    const nextIndex = questions.findIndex(q => q.id === nextQuestion.id);
    if (nextIndex >= 0) {
      setCurrentIndex(nextIndex);
    }
  };
  
  // 残り質問数
  const remainingQuestions = questions.filter(q => !answers[q.id] && !skipped.has(q.id)).length;
  const isAllDone = remainingQuestions === 0;
  

  const calculateResult = () => {
    const isA = scores.typeA >= scores.typeB;
    const is1 = scores.num1 >= scores.num2;
    const isCross = scores.cross >= scores.parallel;
    
    // 僅差判定（同点または差が2以下）
    const typeABDiff = Math.abs(scores.typeA - scores.typeB);
    const num12Diff = Math.abs(scores.num1 - scores.num2);
    const isTypeABClose = typeABDiff <= 2;
    const isNum12Close = num12Diff <= 2;
    
    // 基本判定（A/Bと1/2）
    let baseType;
    if (isA && is1) baseType = "A1";
    else if (isA && !is1) baseType = "A2";
    else if (!isA && is1) baseType = "B1";
    else baseType = "B2";
    
    // クロス/パラレルによる補正
    // A1/B2はクロス派、A2/B1はパラレル派が理論的に整合
    // 矛盾がある場合は、クロス/パラレルのスコア差が大きければ補正
    let type = baseType;
    const crossDiff = Math.abs(scores.cross - scores.parallel);
    
    // クロス/パラレルが明確で、A/Bまたは1/2が僅差の場合に補正
    if (crossDiff > 3) {
      if (isCross) {
        // クロス派 → A1かB2が自然
        if (baseType === "A2" && num12Diff < 3) type = "A1";
        if (baseType === "B1" && num12Diff < 3) type = "B2";
      } else {
        // パラレル派 → A2かB1が自然
        if (baseType === "A1" && num12Diff < 3) type = "A2";
        if (baseType === "B2" && num12Diff < 3) type = "B1";
      }
    }
    
    const cadence = scores.high > scores.low ? "high" : "low";
    const posture = scores.open > scores.forward ? "open" : "forward";
    const aggression = scores.aggressive > scores.steady ? "aggressive" : "steady";
    const teamwork = scores.team > scores.solo ? "team" : "solo";
    
    const resultData = {
      type,
      cadence,
      posture,
      aggression,
      teamwork,
      scores: { ...scores },
      answerCount: Object.keys(answers).length,
      savedAt: new Date().toISOString(),
      // 僅差フラグ
      isClose: {
        typeAB: isTypeABClose,
        num12: isNum12Close,
        any: isTypeABClose || isNum12Close,
      },
      scoreDiff: {
        typeAB: typeABDiff,
        num12: num12Diff,
      }
    };
    
    setResult(resultData);
    
    // LocalStorageに保存（スポーツ共通）
    try {
      localStorage.setItem("stancecore_result", JSON.stringify(resultData));
      setSavedResult(resultData);
    } catch (e) {
      console.log("Failed to save result");
    }
    
    setMode("result");
  };
  
  // スタート画面
  if (mode === "start") {
    // 前回の結果を使う関数
    const useSavedResult = () => {
      if (savedResult) {
        setResult(savedResult);
        setMode("result");
      }
    };
    
    return (
      <>
      <GlobalStyles />
      <div style={{ minHeight: "100vh", background: theme.aurora || theme.bg, backgroundColor: theme.bgSolid, padding: "32px 20px" }}>
        <div style={{ maxWidth: 440, margin: "0 auto", animation: "fadeIn 0.5s ease-out" }}>
          {/* ロゴ・ヘッダー */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ 
              display: "inline-flex", 
              padding: 12, 
              borderRadius: 24, 
              background: `${theme.accent}10`,
              border: `1px solid ${theme.accent}15`,
              boxShadow: `0 8px 24px ${theme.accent}15`,
              marginBottom: 20 
            }}>
              {Icons.stanceCore(theme.accent, 64)}
            </div>
            <h1 style={{ color: theme.accent, fontSize: 28, fontWeight: 600, margin: "0 0 4px", letterSpacing: "6px", textTransform: "uppercase" }}>
              STANCE
            </h1>
            <p style={{ color: C.text, fontSize: 18, fontWeight: 500, margin: "0 0 8px", letterSpacing: "4px" }}>
              CORE
            </p>
            <p style={{ color: C.textMuted, fontSize: 11, fontWeight: 500, margin: 0, letterSpacing: "2px", textTransform: "uppercase" }}>
              Body Type Diagnosis
            </p>
          </div>
          
          {/* ストーリーセクション */}
          <Card style={{ marginBottom: 24 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: C.orange, fontSize: 15, fontWeight: 600, margin: "0 0 16px", lineHeight: 1.8 }}>
                「踏め」「いや、回せ」<br/>
                <span style={{ color: C.textMuted, fontSize: 13, fontWeight: 400 }}>
                  人によって真逆のアドバイス...
                </span>
              </p>
              
              <div style={{ 
                width: 40, 
                height: 1, 
                background: theme.cardBorder,
                margin: "0 auto 16px"
              }}/>
              
              <p style={{ color: C.text, fontSize: 14, margin: "0 0 12px", lineHeight: 1.8 }}>
                実は<span style={{ color: C.green, fontWeight: 600 }}>どちらも正解</span>。<br/>
                ただし「その人にとって」は。
              </p>
              
              <p style={{ color: C.textMuted, fontSize: 13, margin: 0, lineHeight: 1.8 }}>
                人には生まれ持った<span style={{ color: C.text, fontWeight: 500 }}>身体の使い方</span>がある。<br/>
                自分のタイプを知れば、もう迷わない。
              </p>
            </div>
          </Card>
          
          {/* STANCE TYPE 理論説明 */}
          <Card style={{ marginBottom: 24, background: `${theme.accent}05`, border: `1px solid ${theme.accent}20` }}>
            <p style={{ 
              color: theme.accent, 
              fontSize: 11, 
              fontWeight: 600, 
              margin: "0 0 16px", 
              letterSpacing: "2px", 
              textTransform: "uppercase",
              textAlign: "center"
            }}>
              Stance Type Theory
            </p>
            
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.9 }}>
              <p style={{ margin: "0 0 12px" }}>
                人は動作の直前、無意識に姿勢を調整している。
                この<span style={{ color: theme.accent, fontWeight: 500 }}>予測的姿勢制御（APA）</span>の傾向は、
                足裏や足首に現れやすい。
              </p>
              
              <p style={{ margin: 0, color: C.textMuted }}>
                STANCE COREは、APAの傾向を4つのタイプに分類し、
                あなたに合った身体の使い方を導き出します。
              </p>
            </div>
          </Card>
          
          {/* リピーター向け：前回の結果カード */}
          {savedResult && (() => {
            const savedTypeInfo = getTypeInfo("cycling", savedResult.type);
            if (!savedTypeInfo) return null;
            return (
            <Card style={{ marginBottom: 20, background: `linear-gradient(135deg, ${savedTypeInfo.color}15, ${savedTypeInfo.color}05)`, border: `1px solid ${savedTypeInfo.color}30` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ 
                  padding: 12, 
                  borderRadius: 14, 
                  background: savedTypeInfo.color + "20",
                  boxShadow: `0 0 15px ${savedTypeInfo.color}30`,
                }}>
                  {Icons.save(savedTypeInfo.color, 20)}
                </div>
                <div>
                  <p style={{ color: C.textDim, fontSize: 10, fontWeight: 600, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Previous Result</p>
                  <p style={{ color: savedTypeInfo.color, fontSize: 18, fontWeight: 800, margin: 0, textShadow: `0 0 10px ${savedTypeInfo.color}50` }}>{savedTypeInfo.name}</p>
                </div>
              </div>
              
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={useSavedResult}
                  style={{
                    flex: 1, padding: "14px", borderRadius: 14, border: "none",
                    background: `linear-gradient(135deg, ${savedTypeInfo.color}, ${savedTypeInfo.color}cc)`,
                    color: "#fff",
                    fontSize: 13, fontWeight: 700, cursor: "pointer",
                    boxShadow: `4px 4px 12px ${savedTypeInfo.color}40`,
                  }}
                >
                  結果を見る
                </button>
                <button
                  onClick={() => setMode("quiz")}
                  style={{
                    padding: "14px 20px", borderRadius: 14,
                    border: "none",
                    background: C.bg,
                    color: C.textMuted,
                    fontSize: 13, fontWeight: 600, cursor: "pointer",
                    ...neu.raised
                  }}
                >
                  再診断
                </button>
              </div>
            </Card>
          );})()}
          
          {/* 初回ユーザー向け */}
          {!savedResult && (
          <Card>
            <p style={{ color: C.textDim, fontSize: 11, fontWeight: 700, margin: "0 0 20px", letterSpacing: "1px", textTransform: "uppercase", textAlign: "center" }}>
              What You'll Learn
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: Icons.user, color: C.pink, label: "体幹タイプ", desc: "F or R" },
                { icon: Icons.foot, color: C.cyan, label: "荷重タイプ", desc: "Inner or Outer" },
                { icon: Icons.activity, color: C.orange, label: "リズム", desc: "ピッチ or ストライド" },
                { icon: Icons.zap, color: C.green, label: "メンタル", desc: "攻撃性 & チーム性" },
              ].map(item => (
                <div key={item.label} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 14, 
                  background: C.bg, 
                  borderRadius: 14, 
                  padding: "12px 16px",
                  ...neu.pressedSm
                }}>
                  <div style={{ 
                    padding: 8, 
                    borderRadius: 10, 
                    background: C.bg,
                    ...neu.raised
                  }}>
                    {item.icon(item.color, 20)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: C.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{item.label}</p>
                    <p style={{ color: C.textDim, fontSize: 12, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          )}
          
          {/* 精度説明カード */}
          <Card style={{ marginTop: 20 }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 10px" }}>
                質問に答えるほど精度が上がります
              </p>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                <StarRating stars={3} color={C.accent} size={18} />
              </div>
              <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
                最低5問〜 / 20問で高精度 / いつでも結果を見れます
              </p>
            </div>
          </Card>
          
          {/* 初回ユーザー向けボタン */}
          {!savedResult && (
          <button
            onClick={() => setMode("quiz")}
            style={{
              width: "100%", 
              marginTop: 28, 
              padding: "18px 24px", 
              borderRadius: 16, 
              border: "none",
              background: theme.accentGradient,
              color: "#fff", 
              fontSize: 16, 
              fontWeight: 700, 
              cursor: "pointer",
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              gap: 10,
              boxShadow: `0 8px 24px ${theme.accent}40`,
              letterSpacing: "0.5px",
              transition: "all 0.3s ease",
            }}
          >
            診断をはじめる {Icons.arrowRight("#fff", 18)}
          </button>
          )}
        </div>
      </div>
      </>
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
        <div style={{ minHeight: "100vh", background: theme.aurora || theme.bg, backgroundColor: theme.bgSolid, padding: "24px 16px" }}>
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
      trunk: { icon: Icons.user(C.pink, 14), label: "体幹" },
      balance: { icon: Icons.foot(C.cyan, 14), label: "荷重" },
      both: { icon: Icons.target(C.accent, 14), label: "総合" },
      cadence: { icon: Icons.activity(C.orange, 14), label: "リズム" },
      posture: { icon: Icons.user(C.green, 14), label: "姿勢" },
      mental_agg: { icon: Icons.zap(C.orange, 14), label: "メンタル" },
      mental_team: { icon: Icons.target(C.accent, 14), label: "チーム" },
    };
    const cat = catInfo[q.cat] || catInfo.trunk;
    
    return (
      <div style={{ minHeight: "100vh", background: theme.aurora || theme.bg, backgroundColor: theme.bgSolid, padding: "24px 20px", position: "relative" }}>
        
        {/* ステージアップ演出 */}
        {stageUp && (
          <div 
            onClick={() => setStageUp(null)}
            style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease-out",
            cursor: "pointer",
          }}>
            <div style={{
              textAlign: "center",
              padding: 40,
              animation: "slideUp 0.5s ease-out",
            }}>
              <div style={{
                marginBottom: 24,
                opacity: 0.9,
              }}>
                {Icons.stanceCore(stageUp.level === 4 ? (stageUp.isClose ? C.orange : C.green) : C.accent, 80)}
              </div>
              <h2 style={{
                color: "#fff",
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: "2px",
                margin: "0 0 12px",
                textTransform: "uppercase",
              }}>
                {stageUp.message}
              </h2>
              <p style={{
                color: C.textMuted,
                fontSize: 14,
                margin: 0,
                letterSpacing: "1px",
              }}>
                {stageUp.level === 4 
                  ? (stageUp.isClose 
                      ? "追加質問で精度を上げられます" 
                      : "診断精度が最大になりました")
                  : `LEVEL ${stageUp.level} — ${stageUp.label}`
                }
              </p>
              {stageUp.level === 4 && !stageUp.isClose && (
                <div style={{
                  marginTop: 24,
                  display: "flex",
                  justifyContent: "center",
                  gap: 4,
                }}>
                  {[...Array(5)].map((_, i) => (
                    <div key={i} style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: C.green,
                      animation: `pulse 0.6s ease-in-out ${i * 0.1}s infinite`,
                    }} />
                  ))}
                </div>
              )}
              <p style={{ color: C.textDim, fontSize: 12, marginTop: 24, opacity: 0.7 }}>
                タップして続ける
              </p>
            </div>
          </div>
        )}
        
        <div style={{ maxWidth: 440, margin: "0 auto" }}>
          {/* 精度メーター */}
          <Card style={{ 
            marginBottom: 24, 
            padding: "16px 20px", 
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: C.textDim, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>精度</span>
                <StarRating stars={accuracy.stars} color={accuracy.color} size={12} />
              </div>
              <span style={{ color: accuracy.color, fontSize: 12, fontWeight: 700 }}>{accuracy.label}</span>
            </div>
            
            <div style={{ 
              width: "100%", 
              height: 8, 
              background: `${theme.accent}15`, 
              borderRadius: 4,
            }}>
              <div style={{
                width: `${progress}%`, height: "100%",
                background: theme.accentGradient,
                borderRadius: 4, transition: "width 0.5s ease"
              }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
              <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>回答: {accuracy.count}</p>
              <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>残り: {remainingQuestions}</p>
            </div>
            
            {/* 履歴ボタン */}
            {accuracy.count > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                style={{
                  width: "100%",
                  marginTop: 12,
                  padding: "8px",
                  borderRadius: 8,
                  border: "none",
                  background: showHistory ? `${theme.accent}15` : "transparent",
                  color: showHistory ? theme.accent : C.textDim,
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                📋 回答履歴 {showHistory ? "を閉じる" : "を見る・修正する"}
              </button>
            )}
          </Card>
          
          {/* 回答履歴パネル */}
          {showHistory && (
            <Card style={{ marginBottom: 16, padding: 16 }}>
              <p style={{ color: C.text, fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>
                📋 回答履歴（タップで修正）
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 200, overflowY: "auto" }}>
                {questions.filter(q => answers[q.id] !== undefined).map((q, i) => {
                  const ans = answers[q.id];
                  const answerText = ans === "a" ? q.a : q.b;
                  return (
                    <div 
                      key={q.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 12px",
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ 
                          color: C.textMuted, 
                          fontSize: 11, 
                          margin: "0 0 4px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          {q.q.replace(/^[^\s]+\s/, "")}
                        </p>
                        <p style={{ 
                          color: C.text, 
                          fontSize: 12, 
                          fontWeight: 600, 
                          margin: 0,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}>
                          → {answerText.slice(0, 25)}{answerText.length > 25 ? "..." : ""}
                        </p>
                      </div>
                      <button
                        onClick={() => removeAnswer(q.id)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: 6,
                          border: "none",
                          background: `${C.orange}20`,
                          color: C.orange,
                          fontSize: 10,
                          fontWeight: 700,
                          cursor: "pointer",
                          marginLeft: 8,
                          whiteSpace: "nowrap",
                        }}
                      >
                        修正
                      </button>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}
          
          {/* 質問カード */}
          <Card style={{ 
            transform: showingAnswer ? "scale(0.98)" : "scale(1)",
            opacity: showingAnswer ? 0.9 : 1,
            transition: "all 0.2s ease"
          }}>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <span style={{ 
                display: "inline-flex", alignItems: "center", gap: 6,
                background: C.bg, padding: "8px 14px", borderRadius: 20,
                ...neu.pressedSm,
                marginBottom: 20
              }}>
                {cat.icon}
                <span style={{ color: C.textMuted, fontSize: 11, fontWeight: 600 }}>{cat.label}</span>
              </span>
              <p style={{ color: C.text, fontSize: 18, fontWeight: 700, margin: 0, lineHeight: 1.6 }}>
                {q.q}
              </p>
              {/* 体験型の説明 */}
              {q.type === "action" && q.instruction && (
                <p style={{ color: C.textMuted, fontSize: 14, margin: "12px 0 0", lineHeight: 1.6 }}>
                  {q.instruction}
                </p>
              )}
            </div>
            
            {/* テキスト2択（通常・体験型） */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["a", "b"].map((choice) => (
                <button
                  key={choice}
                  onClick={() => handleAnswer(choice)}
                  disabled={showingAnswer}
                  style={{
                    width: "100%", padding: "16px 20px", borderRadius: 16,
                    border: "none", 
                    background: C.bg,
                    color: C.text, fontSize: 15, fontWeight: 500, 
                    cursor: showingAnswer ? "default" : "pointer",
                    textAlign: "left", transition: "all 0.15s",
                    opacity: showingAnswer ? 0.6 : 1,
                    ...neu.raised,
                  }}
                >
                  <span style={{ color: choice === "a" ? C.accent : C.pink, fontWeight: 700, marginRight: 10 }}>
                    {choice.toUpperCase()}.
                  </span>
                  {q[choice]}
                </button>
              ))}
              
              <button
                onClick={handleSkip}
                disabled={showingAnswer}
                style={{
                  width: "100%", padding: "12px", borderRadius: 10, border: "none",
                  background: "transparent", color: C.textDim, fontSize: 12, 
                  cursor: showingAnswer ? "default" : "pointer", marginTop: 8
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
                  width: "100%", padding: "16px", borderRadius: 16,
                  border: "none", 
                  background: C.bg,
                  color: C.accent, fontSize: 14, fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  ...neu.raised,
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
    const { type, cadence, posture } = result;
    const typeInfo = getTypeInfo(sport, type);
    const TypeIcon = Icons[typeInfo.icon];
    
    
    return (
      <div style={{ minHeight: "100vh", background: theme.aurora || theme.bg, backgroundColor: theme.bgSolid, padding: "24px 16px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          
          {/* タイプカード（レーダーチャート統合） */}
          <Card style={{ 
            textAlign: "center", 
            padding: 32,
          }}>
            {/* 精度表示 */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <StarRating stars={accuracy.stars} color={typeInfo.color} size={18} />
            </div>
            <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 24px", fontWeight: 500 }}>
              {accuracy.label}（{result.answerCount}問回答）
            </p>
            
            {/* アイコン */}
            <div style={{ 
              display: "inline-flex", 
              padding: 28, 
              borderRadius: "50%", 
              background: typeInfo.color, 
              marginBottom: 20,
              boxShadow: `0 8px 24px ${typeInfo.color}40`,
            }}>
              {TypeIcon && TypeIcon("#fff", 48)}
            </div>
            
            {/* タイプ名 */}
            <h2 style={{ 
              color: typeInfo.color, 
              fontSize: 28, 
              fontWeight: 800, 
              margin: "0 0 6px",
            }}>
              {typeInfo.name}
            </h2>
            <p style={{ color: C.textMuted, fontSize: 14, margin: "0 0 16px", fontWeight: 600 }}>
              {typeInfo.sub}
            </p>
            
            {/* 説明 */}
            <p style={{ color: C.text, fontSize: 14, lineHeight: 1.8, margin: "0 0 24px" }}>
              {typeInfo.description}
            </p>
            
            {/* レーダーチャート（統合） */}
            <div style={{ 
              background: theme.bg, 
              borderRadius: 16, 
              padding: 16,
              marginTop: 8,
            }}>
              <p style={{ color: C.textMuted, fontSize: 11, fontWeight: 700, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                能力バランス
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RadarChart data={typeInfo.radarData} size={220} color={typeInfo.color} />
              </div>
            </div>
          </Card>
          
          {/* 僅差警告（残り質問あり） */}
          {result.isClose?.any && remainingQuestions > 0 && (
            <Card style={{ 
              marginTop: 16, 
              background: `${C.orange}08`,
              border: `1px solid ${C.orange}`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                {Icons.alertTriangle(C.orange, 20)}
                <div style={{ flex: 1 }}>
                  <p style={{ color: C.orange, fontSize: 14, fontWeight: 700, margin: "0 0 8px" }}>
                    判定が僅差です
                  </p>
                  <p style={{ color: C.text, fontSize: 13, margin: "0 0 12px", lineHeight: 1.6 }}>
                    {result.isClose?.typeAB && result.isClose?.num12 
                      ? "体幹タイプ（F/R）と荷重タイプ（I/O）の両方"
                      : result.isClose?.typeAB 
                        ? "体幹タイプ（A/B）"
                        : "荷重タイプ（I/O）"
                    }の判定が僅差のため、結果が変わる可能性があります。
                  </p>
                  <button
                    onClick={() => {
                      setMode("quiz");
                      setStageUp(null);
                      setPrevAccuracyLevel(Math.min(3, prevAccuracyLevel));
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      borderRadius: 0,
                      border: "none",
                      background: C.orange,
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 500,
                      letterSpacing: "1px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                    }}
                  >
                    追加の質問に回答する（残り{remainingQuestions}問）
                  </button>
                </div>
              </div>
            </Card>
          )}
          
          {/* 僅差だが全質問終了 */}
          {result.isClose?.any && remainingQuestions === 0 && (
            <Card style={{ 
              marginTop: 16, 
              background: `${C.accent}08`,
              border: `1px solid ${C.accent}`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                {Icons.check(C.accent, 20)}
                <div style={{ flex: 1 }}>
                  <p style={{ color: C.accent, fontSize: 14, fontWeight: 600, margin: "0 0 8px", letterSpacing: "1px" }}>
                    全ての質問に回答しました
                  </p>
                  <p style={{ color: C.textMuted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
                    判定に僅差がありますが、これ以上の質問はありません。
                    上記の結果を参考に、実際に試してみてください。
                  </p>
                </div>
              </div>
            </Card>
          )}
          
          {/* だから納得セクション（改善版） */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              {Icons.sparkles(typeInfo.color, 18)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>だから納得</p>
            </div>
            
            <p style={{ color: C.text, fontSize: 14, margin: "0 0 20px", lineHeight: 1.7 }}>
              こんな経験、ありませんか？
            </p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* 過去のあるある */}
              <div style={{ 
                background: `${typeInfo.color}12`, 
                borderRadius: 16, 
                padding: 16,
                border: `1px solid ${typeInfo.color}25`,
              }}>
                <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: "0 0 10px" }}>
                  こう言われて困惑したことは？
                </p>
                <p style={{ color: C.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
                  {type === "A1" && "「もっと腰を安定させて」「後ろ体重で粘って」と言われても、なんかしっくりこなかった"}
                  {type === "A2" && "「もっと前に突っ込んで」「軽やかに動いて」と言われても、逆に力が入らなかった"}
                  {type === "B1" && "「腰をもっと回して」「捻りを使え」と言われても、動きがギクシャクした"}
                  {type === "B2" && "「前傾でアグレッシブに」「つま先で軽く」と言われても、バランスを崩しやすかった"}
                </p>
              </div>
              
              {/* 本当の理由 */}
              <div style={{ 
                background: C.green + "15", 
                borderRadius: 16, 
                padding: 16,
                border: `1px solid ${C.green}30`,
              }}>
                <p style={{ color: C.green, fontSize: 13, fontWeight: 700, margin: "0 0 10px" }}>
                  ✓ それは、あなたの身体に合わなかっただけ
                </p>
                <p style={{ color: C.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
                  {type === "A1" && "あなたは「捻りながら前へ」が自然。指導者と身体の使い方が違っただけです。"}
                  {type === "A2" && "あなたは「捻りながら溜める」が自然。前傾より後ろで力を溜める方が合っています。"}
                  {type === "B1" && "あなたは「一体で前へ」が自然。捻りより身体全体で動く方が力が出ます。"}
                  {type === "B2" && "あなたは「一体で安定」が自然。前傾より後ろでどっしり構える方が安定します。"}
                </p>
              </div>
              
              {/* 今後のヒント */}
              <div style={{ 
                background: theme.bg, 
                borderRadius: 16, 
                padding: 16,
              }}>
                <p style={{ color: C.textMuted, fontSize: 13, fontWeight: 700, margin: "0 0 10px" }}>
                  📌 これからのアドバイス
                </p>
                <p style={{ color: C.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
                  {type === "A1" && "「前に踏み込め」「高回転で」「瞬発力で勝負」というアドバイスを積極的に取り入れてみて。"}
                  {type === "A2" && "「後ろで溜めろ」「じっくり粘れ」「重いギアでグイグイ」が合うはず。"}
                  {type === "B1" && "「滑らかに」「一定ペースで」「効率重視」を意識すると本来の力が出せます。"}
                  {type === "B2" && "「安定感を活かして」「リズムを大切に」「適応力で勝負」がおすすめ。"}
                </p>
              </div>
            </div>
          </Card>
          
          {/* 身体の使い方 */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.user(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>あなたの身体の使い方</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* 体幹タイプ */}
              <div style={{ background: theme.bg, borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>体幹タイプ</p>
                  <p style={{ color: typeInfo.color, fontSize: 14, fontWeight: 700, margin: 0 }}>{typeInfo.bodyMechanics.trunk.type}</p>
                </div>
                <p style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{typeInfo.bodyMechanics.trunk.description}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{typeInfo.bodyMechanics.trunk.detail}</p>
              </div>
              
              {/* 連動パターン */}
              <div style={{ background: theme.bg, borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>連動パターン</p>
                  <p style={{ color: typeInfo.color, fontSize: 14, fontWeight: 700, margin: 0 }}>{typeInfo.bodyMechanics.movement.type}</p>
                </div>
                <p style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{typeInfo.bodyMechanics.movement.description}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{typeInfo.bodyMechanics.movement.detail}</p>
              </div>
              
              {/* 重心 */}
              <div style={{ background: theme.bg, borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>重心</p>
                  <p style={{ color: typeInfo.color, fontSize: 14, fontWeight: 700, margin: 0 }}>{typeInfo.bodyMechanics.balance.type}</p>
                </div>
                <p style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{typeInfo.bodyMechanics.balance.description}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{typeInfo.bodyMechanics.balance.detail}</p>
              </div>
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
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "theme.bg", borderRadius: 10, padding: 12 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 3, background: typeInfo.color }} />
                  <p style={{ color: C.text, fontSize: 14, margin: 0 }}>{trait}</p>
                </div>
              ))}
            </div>
          </Card>
          
          {/* リズム・姿勢傾向 */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.activity(C.pink, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>リズム・姿勢傾向</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ marginBottom: 8 }}>{cadence === "high" ? Icons.rotate(C.cyan, 28) : Icons.zap(C.orange, 28)}</div>
                <p style={{ color: cadence === "high" ? C.cyan : C.orange, fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>
                  {cadence === "high" ? "高ピッチ型" : "ストライド型"}
                </p>
                <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
                  {cadence === "high" ? "180spm+で軽快に" : "大きな一歩で力強く"}
                </p>
              </div>
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ marginBottom: 8 }}>{posture === "open" ? Icons.user(C.green, 28) : Icons.activity(C.accent, 28)}</div>
                <p style={{ color: posture === "open" ? C.green : C.accent, fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>
                  {posture === "open" ? "胸開きタイプ" : "前傾タイプ"}
                </p>
                <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
                  {posture === "open" ? "上体を起こして走る" : "前傾姿勢で走る"}
                </p>
              </div>
            </div>
          </Card>
          
          {/* メンタル傾向 */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.sparkles(C.accent, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>メンタル傾向</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ marginBottom: 8 }}>{result.aggression === "aggressive" ? Icons.zap(C.orange, 28) : Icons.target(C.cyan, 28)}</div>
                <p style={{ color: result.aggression === "aggressive" ? C.orange : C.cyan, fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>
                  {result.aggression === "aggressive" ? "アグレッシブ" : "ステディ"}
                </p>
                <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
                  {result.aggression === "aggressive" ? "攻め・飛び出し型" : "堅実・確実型"}
                </p>
              </div>
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 14, textAlign: "center" }}>
                <div style={{ marginBottom: 8 }}>{result.teamwork === "solo" ? Icons.user(C.pink, 28) : Icons.target(C.green, 28)}</div>
                <p style={{ color: result.teamwork === "solo" ? C.pink : C.green, fontSize: 14, fontWeight: 700, margin: "0 0 2px" }}>
                  {result.teamwork === "solo" ? "ソロ型" : "チーム型"}
                </p>
                <p style={{ color: C.textDim, fontSize: 11, margin: 0 }}>
                  {result.teamwork === "solo" ? "単独で力を発揮" : "集団で活きる"}
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
          
          {/* フィットスタイル */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.bike(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>
                フィットスタイル
              </p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* タイプ */}
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  {sport === "cycling" ? Icons.bike(C.accent, 18) : Icons.shoe(C.accent, 18)}
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {sport === "cycling" ? "フレーム" : "シューズタイプ"}
                  </p>
                </div>
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{typeInfo.shoes.type.name}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>{typeInfo.shoes.type.reason}</p>
              </div>
              
              {/* ポジション/ドロップ */}
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  {Icons.activity(C.pink, 18)}
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {sport === "cycling" ? "ポジション" : "ドロップ"}
                  </p>
                </div>
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{typeInfo.shoes.drop.name}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>{typeInfo.shoes.drop.reason}</p>
              </div>
              
              {/* ホイール/クッション */}
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  {sport === "cycling" ? Icons.wheel(C.cyan, 18) : Icons.foot(C.cyan, 18)}
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>
                    {sport === "cycling" ? "ホイール" : "クッション"}
                  </p>
                </div>
                <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{typeInfo.shoes.cushion.name}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>{typeInfo.shoes.cushion.name}</p>
                <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>{typeInfo.shoes.cushion.reason}</p>
              </div>
            </div>
          </Card>
          
          {/* 機材セレクト */}
          <Card style={{ marginTop: 16, padding: "24px 0" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "0 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${typeInfo.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {Icons.settings(typeInfo.color, 20)}
                </div>
                <div>
                  <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>機材セレクト</p>
                  <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>あなたのタイプに合ったパーツ</p>
                </div>
              </div>
              <span style={{ background: typeInfo.color, color: "#fff", fontSize: 10, fontWeight: 700, padding: "5px 10px", borderRadius: 20 }}>
                {typeInfo.name.split("（")[0]}
              </span>
            </div>
            
            {/* タイプ条件表示 */}
            <div style={{ background: `${typeInfo.color}08`, border: `1px solid ${typeInfo.color}20`, borderRadius: 12, padding: 14, marginBottom: 16, marginLeft: 24, marginRight: 24 }}>
              <p style={{ color: C.textMuted, fontSize: 11, margin: "0 0 4px", fontWeight: 600 }}>あなたに合うスタイル</p>
              <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 600, margin: 0 }}>
                {type === "A1" && "高剛性・前乗り・ダイレクト感重視"}
                {type === "A2" && "軽量・後ろ乗り・快適性重視"}
                {type === "B1" && "バランス・効率重視・オールラウンド"}
                {type === "B2" && "快適性・安定感・ロングライド向け"}
              </p>
            </div>
            
            {/* カテゴリ選択 */}
            <div style={{ marginBottom: 16, padding: "0 24px" }}>
              <p style={{ color: C.textMuted, fontSize: 12, fontWeight: 700, margin: "0 0 10px" }}>カテゴリ</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {CYCLING_CATEGORIES.map(cat => {
                  const isSelected = shoeFilters.category === cat.id;
                  return (
                  <button
                    key={cat.id}
                    onClick={() => setShoeFilters(f => ({ ...f, category: f.category === cat.id ? null : cat.id }))}
                    style={{
                      padding: "10px 16px", borderRadius: 12, fontSize: 13, fontWeight: 600,
                      border: isSelected ? `2px solid ${typeInfo.color}` : `1px solid ${theme.cardBorder}`,
                      background: isSelected ? `${typeInfo.color}10` : theme.card,
                      color: isSelected ? typeInfo.color : C.textMuted,
                      cursor: "pointer",
                      boxShadow: isSelected ? `0 2px 8px ${typeInfo.color}20` : "none",
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {Icons[cat.icon] && Icons[cat.icon](isSelected ? typeInfo.color : C.textMuted, 16)}
                    {cat.label}
                  </button>
                  );
                })}
              </div>
            </div>
            
            {/* ブランド選択 */}
            <div style={{ marginBottom: 20, padding: "0 24px" }}>
              <p style={{ color: C.textMuted, fontSize: 12, fontWeight: 700, margin: "0 0 10px" }}>ブランド</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {CYCLING_BRANDS.map(brand => {
                  const isSelected = shoeFilters.brands.includes(brand);
                  return (
                    <button
                      key={brand}
                      onClick={() => setShoeFilters(f => ({
                        ...f,
                        brands: isSelected ? f.brands.filter(b => b !== brand) : [...f.brands, brand]
                      }))}
                      style={{
                        padding: "8px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                        border: isSelected ? `2px solid ${typeInfo.color}` : `1px solid ${theme.cardBorder}`,
                        background: isSelected ? `${typeInfo.color}10` : theme.card,
                        color: isSelected ? typeInfo.color : C.textMuted,
                        cursor: "pointer",
                        boxShadow: isSelected ? `0 2px 8px ${typeInfo.color}20` : "none",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {brand}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* フィルター結果 */}
            {(() => {
              const filtered = CYCLING_GEAR_DB.filter(gear => {
                // タイプ条件
                if (!gear.type.includes(type)) return false;
                // カテゴリ
                if (shoeFilters.category && gear.category !== shoeFilters.category) return false;
                // ブランド
                if (shoeFilters.brands.length > 0 && !shoeFilters.brands.includes(gear.brand)) return false;
                return true;
              });
              
              // カテゴリでグループ化
              const grouped = {};
              filtered.forEach(gear => {
                if (!grouped[gear.category]) grouped[gear.category] = [];
                grouped[gear.category].push(gear);
              });
              
              // カテゴリごとのシャッフル状態を適用
              Object.keys(grouped).forEach(cat => {
                const catShuffleKey = shuffleKey[cat] || 0;
                if (catShuffleKey > 0) {
                  // シード値を使って同じshuffleKeyなら同じ順序になるように
                  const shuffled = [...grouped[cat]];
                  for (let i = shuffled.length - 1; i > 0; i--) {
                    const seed = (catShuffleKey * 9301 + 49297) % 233280;
                    const j = Math.floor((seed / 233280 + i * catShuffleKey) % (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                  }
                  grouped[cat] = shuffled;
                }
              });
              
              return (
                <div>
                  <p style={{ color: C.textDim, fontSize: 12, marginBottom: 12, padding: "0 24px" }}>
                    {filtered.length}件の機材がマッチ
                  </p>
                  
                  {filtered.length === 0 ? (
                    <div style={{ background: theme.bg, borderRadius: 12, padding: 20, textAlign: "center", margin: "0 24px" }}>
                      <p style={{ color: C.textMuted, fontSize: 14, margin: 0 }}>条件に合う機材がありません</p>
                      <p style={{ color: C.textDim, fontSize: 12, marginTop: 8 }}>フィルターを調整してみてください</p>
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                      {Object.entries(grouped).map(([catId, gears]) => {
                        const catInfo = CYCLING_CATEGORIES.find(c => c.id === catId);
                        return (
                          <div key={catId}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 0 12px", padding: "0 24px" }}>
                              <p style={{ color: C.text, fontSize: 14, fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                                {catInfo?.icon && Icons[catInfo.icon] && Icons[catInfo.icon](typeInfo.color, 20)}
                                {catInfo?.label}
                                <span style={{ color: C.textDim, fontSize: 11, fontWeight: 500, marginLeft: 4 }}>
                                  ({gears.length})
                                </span>
                              </p>
                              {gears.length > 1 && (
                                <button
                                  onClick={() => setShuffleKey(prev => ({ ...prev, [catId]: (prev[catId] || 0) + 1 }))}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 4,
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                    border: `1px solid ${theme.cardBorder}`,
                                    background: theme.bg,
                                    color: C.textDim,
                                    fontSize: 10,
                                    cursor: "pointer",
                                  }}
                                >
                                  {Icons.refresh(C.textDim, 12)}
                                  他を見る
                                </button>
                              )}
                            </div>
                            
                            {/* カルーセル */}
                            <div style={{ 
                              display: "flex", 
                              overflowX: "auto",
                              scrollSnapType: "x mandatory",
                              WebkitOverflowScrolling: "touch",
                              gap: 12,
                              paddingLeft: 24,
                              paddingRight: 24,
                              paddingBottom: 8,
                              msOverflowStyle: "none",
                              scrollbarWidth: "none",
                            }}>
                              {gears.slice(0, 5).map((gear, i) => (
                                <div key={gear.id} style={{ 
                                  minWidth: "calc(100% - 48px)",
                                  maxWidth: "calc(100% - 48px)",
                                  scrollSnapAlign: "start",
                                  background: theme.card, 
                                  borderRadius: 16, 
                                  padding: 0,
                                  overflow: "hidden",
                                  border: `1px solid ${theme.cardBorder}`,
                                  boxShadow: theme.shadowCard || theme.shadow,
                                  flexShrink: 0,
                                }}>
                                  {/* 商品アイコンエリア */}
                                  <div style={{
                                    height: 100,
                                    background: `linear-gradient(135deg, ${typeInfo.color}08, ${typeInfo.color}15)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                    overflow: "hidden",
                                  }}>
                                    {catInfo?.icon && Icons[catInfo.icon] && Icons[catInfo.icon](typeInfo.color, 40)}
                                    {/* ブランドバッジ */}
                                    <div style={{
                                      position: "absolute",
                                      top: 10,
                                      left: 10,
                                      background: "rgba(255,255,255,0.95)",
                                      padding: "4px 10px",
                                      borderRadius: 20,
                                      fontSize: 10,
                                      fontWeight: 700,
                                      color: C.text,
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                    }}>
                                      {gear.brand}
                                    </div>
                                    {/* インジケーター */}
                                    <div style={{
                                      position: "absolute",
                                      bottom: 8,
                                      left: "50%",
                                      transform: "translateX(-50%)",
                                      display: "flex",
                                      gap: 6,
                                    }}>
                                      {gears.slice(0, 5).map((_, idx) => (
                                        <div key={idx} style={{
                                          width: idx === i ? 16 : 6,
                                          height: 6,
                                          borderRadius: 3,
                                          background: idx === i ? typeInfo.color : "rgba(0,0,0,0.2)",
                                          transition: "all 0.2s ease",
                                        }} />
                                      ))}
                                    </div>
                                  </div>
                                  
                                  {/* 商品情報 */}
                                  <div style={{ padding: 16 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                                      <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0, flex: 1 }}>
                                        {gear.name}
                                      </p>
                                      <p style={{ color: C.textMuted, fontSize: 13, fontWeight: 600, margin: 0, marginLeft: 8, whiteSpace: "nowrap" }}>
                                        ¥{gear.price.toLocaleString()}
                                      </p>
                                    </div>
                                    <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 14px", lineHeight: 1.6 }}>
                                      {gear.reason}
                                    </p>
                                    
                                    {/* 購入リンク（アイコンのみ） */}
                                    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                                      <a
                                        href={`https://www.amazon.co.jp/s?k=${gear.amazonQuery}&tag=stancecore-22`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="Amazonで見る"
                                        style={{
                                          width: 40, height: 40, borderRadius: 10,
                                          background: "#FF9900",
                                          display: "flex", alignItems: "center", justifyContent: "center",
                                          textDecoration: "none",
                                          color: "#fff",
                                          fontSize: 10,
                                          fontWeight: 800,
                                        }}
                                      >
                                        a
                                      </a>
                                      <a
                                        href={`https://hb.afl.rakuten.co.jp/ichiba/50df1b4b.7f702b2c.50df1b4c.1f8e3d5f/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F${gear.rakutenQuery}%2F`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title="楽天で見る"
                                        style={{
                                          width: 40, height: 40, borderRadius: 10,
                                          background: "#BF0000",
                                          display: "flex", alignItems: "center", justifyContent: "center",
                                          textDecoration: "none",
                                          color: "#fff",
                                          fontSize: 10,
                                          fontWeight: 800,
                                        }}
                                      >
                                        R
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            {/* スワイプヒント（複数ある場合のみ） */}
                            {gears.length > 1 && (
                              <p style={{ 
                                color: C.textDim, 
                                fontSize: 10, 
                                textAlign: "center", 
                                margin: "8px 0 0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 4,
                              }}>
                                ← スワイプで他の商品を見る →
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}
            
            <p style={{ color: C.textDim, fontSize: 10, marginTop: 16, textAlign: "center", padding: "0 24px" }}>
              ※ 価格は変動する場合があります。リンクはアフィリエイトを含みます。
            </p>
          </Card>
          
          {/* フィッティング計算機 */}
          {typeInfo.fitting && (
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {Icons.target(typeInfo.color, 20)}
                <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>フィッティング計算機</p>
              </div>
              <span style={{ background: `${typeInfo.color}22`, color: typeInfo.color, fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 12 }}>
                {typeInfo.name}
              </span>
            </div>
            
            {/* モード切替 */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button
                onClick={() => setShowFittingCalc("simple")}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: C.bg,
                  cursor: "pointer",
                  ...(showFittingCalc === "simple" ? neu.pressed : neu.raised),
                  color: showFittingCalc === "simple" ? typeInfo.color : C.textMuted,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                🔧 現在値から調整
              </button>
              <button
                onClick={() => setShowFittingCalc("detail")}
                style={{
                  flex: 1,
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "none",
                  background: C.bg,
                  cursor: "pointer",
                  ...(showFittingCalc === "detail" ? neu.pressed : neu.raised),
                  color: showFittingCalc === "detail" ? typeInfo.color : C.textMuted,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                股下から計算
              </button>
            </div>
            
            {/* ===== 簡易モード: 現在値から調整 ===== */}
            {showFittingCalc === "simple" && (
            <>
              <div style={{ background: C.bg, borderRadius: 16, padding: 16, marginBottom: 16, ...neu.pressedSm }}>
                <p style={{ color: C.text, fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>現在のセッティング</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <label style={{ color: C.textDim, fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>サドル高 (mm)</label>
                    <input
                      type="number"
                      placeholder="720"
                      value={bodyMetrics.currentSaddleHeight || ""}
                      onChange={(e) => setBodyMetrics({...bodyMetrics, currentSaddleHeight: e.target.value})}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        borderRadius: 10,
                        border: "none",
                        background: C.bg,
                        color: C.text,
                        fontSize: 16,
                        fontWeight: 700,
                        ...neu.pressed,
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ color: C.textDim, fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>クランク長 (mm)</label>
                      <select
                        value={bodyMetrics.currentCrank || ""}
                        onChange={(e) => setBodyMetrics({...bodyMetrics, currentCrank: e.target.value})}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: "none",
                          background: C.bg,
                          color: C.text,
                          fontSize: 14,
                          fontWeight: 700,
                          ...neu.pressed,
                        }}
                      >
                        <option value="">選択</option>
                        <option value="165">165mm</option>
                        <option value="167.5">167.5mm</option>
                        <option value="170">170mm</option>
                        <option value="172.5">172.5mm</option>
                        <option value="175">175mm</option>
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ color: C.textDim, fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>ハンドル落差 (mm)</label>
                      <input
                        type="number"
                        placeholder="-30"
                        value={bodyMetrics.currentDrop || ""}
                        onChange={(e) => setBodyMetrics({...bodyMetrics, currentDrop: e.target.value})}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: "none",
                          background: C.bg,
                          color: C.text,
                          fontSize: 16,
                          fontWeight: 700,
                          ...neu.pressed,
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 調整アドバイス */}
              {bodyMetrics.currentSaddleHeight && (() => {
                const currentSaddle = parseFloat(bodyMetrics.currentSaddleHeight);
                const currentCrank = parseFloat(bodyMetrics.currentCrank) || 170;
                const currentDrop = parseFloat(bodyMetrics.currentDrop) || -30;
                
                // タイプ別の推奨傾向
                const advice = {
                  A1: { 
                    saddle: "高め", saddleAdj: "+5〜15mm", 
                    drop: "深め", dropRange: "-40〜-60mm",
                    setback: "前寄り", setbackAdj: "-5〜10mm前へ",
                    crank: "短め", crankAdj: "165〜170mm推奨",
                  },
                  A2: { 
                    saddle: "標準〜やや低め", saddleAdj: "±5mm", 
                    drop: "控えめ", dropRange: "-20〜-40mm",
                    setback: "後ろ寄り", setbackAdj: "+10〜20mm後ろへ",
                    crank: "長め", crankAdj: "170〜175mm推奨",
                  },
                  B1: { 
                    saddle: "高め", saddleAdj: "+5〜10mm", 
                    drop: "中程度", dropRange: "-30〜-50mm",
                    setback: "ニュートラル", setbackAdj: "±5mm",
                    crank: "短め〜標準", crankAdj: "165〜170mm推奨",
                  },
                  B2: { 
                    saddle: "低め", saddleAdj: "-5〜10mm", 
                    drop: "控えめ", dropRange: "-10〜-30mm",
                    setback: "やや後ろ", setbackAdj: "+5〜15mm後ろへ",
                    crank: "標準〜長め", crankAdj: "170〜172.5mm推奨",
                  },
                };
                const adv = advice[type];
                
                // 落差の判定
                const dropRanges = {
                  A1: { min: -60, max: -40 },
                  A2: { min: -40, max: -20 },
                  B1: { min: -50, max: -30 },
                  B2: { min: -30, max: -10 },
                };
                const dropRange = dropRanges[type];
                const dropStatus = currentDrop < dropRange.min ? "深すぎ" : currentDrop > dropRange.max ? "浅すぎ" : "適正";
                
                return (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <p style={{ color: C.text, fontSize: 13, fontWeight: 700, margin: 0 }}>
                    Tip: {typeInfo.name}への調整アドバイス
                  </p>
                  
                  {/* サドル高 */}
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>サドル高</span>
                      <span style={{ color: typeInfo.color, fontSize: 14, fontWeight: 800 }}>{adv.saddleAdj}</span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      現在 {currentSaddle}mm → {typeInfo.name}は{adv.saddle}がおすすめ
                    </p>
                  </div>
                  
                  {/* ハンドル落差 */}
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>ハンドル落差</span>
                      <span style={{ 
                        color: dropStatus === "適正" ? C.green : C.orange, 
                        fontSize: 14, 
                        fontWeight: 800 
                      }}>
                        {dropStatus === "適正" ? "✓ 適正範囲" : dropStatus}
                      </span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      現在 {currentDrop}mm → 推奨 {adv.dropRange}（{adv.drop}）
                    </p>
                  </div>
                  
                  {/* サドル前後 */}
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>サドル前後</span>
                      <span style={{ color: typeInfo.color, fontSize: 14, fontWeight: 800 }}>{adv.setbackAdj}</span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      {typeInfo.name}は{adv.setback}がおすすめ
                    </p>
                  </div>
                  
                  {/* クランク長 */}
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>クランク長</span>
                      <span style={{ color: typeInfo.color, fontSize: 14, fontWeight: 800 }}>{adv.crankAdj}</span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      現在 {currentCrank}mm → {typeInfo.name}は{adv.crank}
                    </p>
                  </div>
                  
                  {/* クリート */}
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>クリート</span>
                      <span style={{ color: typeInfo.color, fontSize: 14, fontWeight: 700 }}>{typeInfo.fitting.cleat.position.fore_aft}</span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      フロート: {typeInfo.fitting.cleat.float.degree} | 角度: {typeInfo.fitting.cleat.angle.rotation}
                    </p>
                  </div>
                </div>
                );
              })()}
              
              {!bodyMetrics.currentSaddleHeight && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p style={{ color: C.textMuted, fontSize: 13, margin: 0 }}>
                    ↑ 現在のサドル高を入力すると<br/>{typeInfo.name}向けの調整アドバイスを表示
                  </p>
                </div>
              )}
            </>
            )}
            
            {/* ===== 詳細モード: 股下から計算 ===== */}
            {showFittingCalc === "detail" && (
            <>
              <div style={{ background: C.bg, borderRadius: 16, padding: 16, marginBottom: 16, ...neu.pressedSm }}>
                <p style={{ color: C.text, fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>身体データを入力</p>
                
                {/* 身長（必須） */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ color: C.textDim, fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>
                    身長 (cm) <span style={{ color: typeInfo.color }}>*必須</span>
                  </label>
                  <input
                    type="number"
                    placeholder="175"
                    value={bodyMetrics.height}
                    onChange={(e) => setBodyMetrics({...bodyMetrics, height: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "none",
                      background: C.bg,
                      color: C.text,
                      fontSize: 16,
                      fontWeight: 700,
                      ...neu.pressed,
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                
                {/* 体型タイプ選択 */}
                <div style={{ marginBottom: 12 }}>
                  <label style={{ color: C.textDim, fontSize: 11, fontWeight: 600, display: "block", marginBottom: 6 }}>
                    体型タイプ
                  </label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[
                      { value: "long", label: "脚長め", ratio: 0.48 },
                      { value: "standard", label: "標準", ratio: 0.46 },
                      { value: "short", label: "脚短め", ratio: 0.44 },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setBodyMetrics({...bodyMetrics, bodyType: opt.value})}
                        style={{
                          flex: 1,
                          padding: "10px 4px",
                          borderRadius: 8,
                          border: "none",
                          background: C.bg,
                          cursor: "pointer",
                          ...(bodyMetrics.bodyType === opt.value ? neu.pressed : neu.raised),
                          color: bodyMetrics.bodyType === opt.value ? typeInfo.color : C.textMuted,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  {bodyMetrics.height && bodyMetrics.bodyType && (
                    <p style={{ color: typeInfo.color, fontSize: 11, margin: "8px 0 0", textAlign: "center" }}>
                      → 推定股下: {Math.round(parseFloat(bodyMetrics.height) * (bodyMetrics.bodyType === "long" ? 0.48 : bodyMetrics.bodyType === "standard" ? 0.46 : 0.44))}cm
                    </p>
                  )}
                </div>
                
                {/* 肩幅タイプ */}
                <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 12 }}>
                  <label style={{ color: C.textDim, fontSize: 11, fontWeight: 600, display: "block", marginBottom: 8 }}>
                    肩幅タイプ
                  </label>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[
                      { value: "wide", label: "広め", adj: 20 },
                      { value: "standard", label: "標準", adj: 0 },
                      { value: "narrow", label: "狭め", adj: -20 },
                    ].map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setBodyMetrics({...bodyMetrics, shoulderType: opt.value})}
                        style={{
                          flex: 1,
                          padding: "10px 4px",
                          borderRadius: 8,
                          border: "none",
                          background: C.bg,
                          cursor: "pointer",
                          ...(bodyMetrics.shoulderType === opt.value ? neu.pressed : neu.raised),
                          color: bodyMetrics.shoulderType === opt.value ? typeInfo.color : C.textMuted,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* 股下（任意） */}
                <div style={{ borderTop: `1px solid ${C.cardBorder}`, paddingTop: 12 }}>
                  <label style={{ color: C.textDim, fontSize: 11, fontWeight: 600, display: "block", marginBottom: 4 }}>
                    股下 (cm) <span style={{ color: C.textMuted }}>※任意・入力すると優先</span>
                  </label>
                  <input
                    type="number"
                    placeholder={bodyMetrics.height && bodyMetrics.bodyType ? `推定: ${Math.round(parseFloat(bodyMetrics.height) * (bodyMetrics.bodyType === "long" ? 0.48 : bodyMetrics.bodyType === "standard" ? 0.46 : 0.44))}` : "測定値があれば入力"}
                    value={bodyMetrics.inseam}
                    onChange={(e) => setBodyMetrics({...bodyMetrics, inseam: e.target.value})}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "none",
                      background: C.bg,
                      color: C.text,
                      fontSize: 16,
                      fontWeight: 700,
                      ...neu.pressed,
                      boxSizing: "border-box",
                    }}
                  />
                  <p style={{ color: C.textDim, fontSize: 10, margin: "6px 0 0" }}>
                    測定方法: 壁に背中をつけて立ち、本を股に挟む
                  </p>
                </div>
              </div>
              
              {/* 計算結果 */}
              {(bodyMetrics.inseam || (bodyMetrics.height && bodyMetrics.bodyType)) && (() => {
                // 股下の決定: 入力値優先、なければ身長×体型係数で推定
                const height = parseFloat(bodyMetrics.height);
                const bodyTypeRatio = { long: 0.48, standard: 0.46, short: 0.44 };
                const inseam = bodyMetrics.inseam 
                  ? parseFloat(bodyMetrics.inseam) 
                  : height * (bodyTypeRatio[bodyMetrics.bodyType] || 0.46);
                
                const isEstimated = !bodyMetrics.inseam; // 推定値かどうか
                
                // 体型タイプによるサドル高係数補正
                const bodyTypeAdj = {
                  "long": 0,        // 脚長め: 欧米基準そのまま
                  "standard": -0.005, // 標準: やや低め補正
                  "short": -0.010,   // 脚短め: 低め補正
                };
                const adj = bodyTypeAdj[bodyMetrics.bodyType] || -0.003;
                
                const coefficients = {
                  A1: { saddleMin: 0.875 + adj, saddleMax: 0.885 + adj, crankMin: 0.200, crankMax: 0.205, dropMin: -60, dropMax: -40 },
                  A2: { saddleMin: 0.870 + adj, saddleMax: 0.880 + adj, crankMin: 0.205, crankMax: 0.215, dropMin: -40, dropMax: -20 },
                  B1: { saddleMin: 0.875 + adj, saddleMax: 0.885 + adj, crankMin: 0.200, crankMax: 0.205, dropMin: -50, dropMax: -30 },
                  B2: { saddleMin: 0.865 + adj, saddleMax: 0.875 + adj, crankMin: 0.205, crankMax: 0.210, dropMin: -30, dropMax: -10 },
                };
                const coef = coefficients[type];
                
                const saddleHeightMin = Math.round(inseam * 10 * coef.saddleMin);
                const saddleHeightMax = Math.round(inseam * 10 * coef.saddleMax);
                const crankLengthMin = Math.round(inseam * 10 * coef.crankMin);
                const crankLengthMax = Math.round(inseam * 10 * coef.crankMax);
                
                // 肩幅タイプによるハンドル幅調整
                const shoulderAdj = { wide: 20, standard: 0, narrow: -20 };
                const handlebarBase = Math.round(height * 2.4); // 身長(cm)×2.4 → mm
                const handlebarWidth = handlebarBase + (shoulderAdj[bodyMetrics.shoulderType] || 0);
                
                const standardCranks = [165, 167.5, 170, 172.5, 175];
                const avgCrank = (crankLengthMin + crankLengthMax) / 2;
                const recommendedCrank = standardCranks.reduce((prev, curr) => 
                  Math.abs(curr - avgCrank) < Math.abs(prev - avgCrank) ? curr : prev
                );
                
                return (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* 計算条件の表示 */}
                  <div style={{ background: `${typeInfo.color}15`, borderRadius: 10, padding: 10 }}>
                    <p style={{ color: typeInfo.color, fontSize: 11, fontWeight: 600, margin: 0, textAlign: "center" }}>
                      脚: {bodyMetrics.bodyType === "long" ? "長め" : bodyMetrics.bodyType === "standard" ? "標準" : "短め"}
                      {" | "}肩: {bodyMetrics.shoulderType === "wide" ? "広め" : bodyMetrics.shoulderType === "narrow" ? "狭め" : "標準"}
                      {" | "}股下 {Math.round(inseam)}cm {isEstimated ? "（推定）" : "（実測）"}
                    </p>
                  </div>
                  
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        
                        <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>サドル高</span>
                      </div>
                      <span style={{ color: typeInfo.color, fontSize: 18, fontWeight: 800 }}>
                        {saddleHeightMin}〜{saddleHeightMax}mm
                      </span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      BB中心〜サドル上面 | {typeInfo.fitting.saddle.height.detail}
                    </p>
                  </div>
                  
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        
                        <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>サドル前後</span>
                      </div>
                      <span style={{ color: typeInfo.color, fontSize: 18, fontWeight: 800 }}>
                        {typeInfo.fitting.saddle.setback.position}
                      </span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      {typeInfo.fitting.saddle.setback.detail}
                    </p>
                  </div>
                  
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        
                        <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>クランク長</span>
                      </div>
                      <span style={{ color: typeInfo.color, fontSize: 18, fontWeight: 800 }}>
                        {recommendedCrank}mm
                      </span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      計算値: {crankLengthMin}〜{crankLengthMax}mm | {typeInfo.fitting.crank.length.detail}
                    </p>
                  </div>
                  
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        
                        <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>ハンドル落差</span>
                      </div>
                      <span style={{ color: typeInfo.color, fontSize: 18, fontWeight: 800 }}>
                        {coef.dropMin}〜{coef.dropMax}mm
                      </span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      サドル上面〜ハンドル上面 | {typeInfo.fitting.handlebar.drop.detail}
                    </p>
                  </div>
                  
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        
                        <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>ハンドル幅</span>
                      </div>
                      <span style={{ color: typeInfo.color, fontSize: 18, fontWeight: 800 }}>
                        {handlebarWidth}mm前後
                      </span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      芯-芯 | {typeInfo.fitting.handlebar.width.guide}
                    </p>
                  </div>
                  
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        
                        <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>クリート</span>
                      </div>
                      <span style={{ color: typeInfo.color, fontSize: 14, fontWeight: 700 }}>
                        {typeInfo.fitting.cleat.position.fore_aft}
                      </span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      フロート: {typeInfo.fitting.cleat.float.degree} | {typeInfo.fitting.cleat.angle.rotation}
                    </p>
                  </div>
                  
                  <div style={{ background: C.bg, borderRadius: 12, padding: 14, ...neu.raised }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        
                        <span style={{ color: C.text, fontSize: 13, fontWeight: 700 }}>サドル角度</span>
                      </div>
                      <span style={{ color: typeInfo.color, fontSize: 14, fontWeight: 700 }}>
                        {typeInfo.fitting.saddle.tilt.angle}
                      </span>
                    </div>
                    <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>
                      {typeInfo.fitting.saddle.tilt.detail}
                    </p>
                  </div>
                </div>
                );
              })()}
              
              {!(bodyMetrics.inseam || (bodyMetrics.height && bodyMetrics.bodyType)) && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <p style={{ color: C.textMuted, fontSize: 13, margin: 0 }}>
                    ↑ 身長と体型タイプを選択すると<br/>{typeInfo.name}に最適なフィッティング数値を計算します
                  </p>
                </div>
              )}
            </>
            )}
            
            {/* モード未選択時 */}
            {!showFittingCalc && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <p style={{ color: C.textMuted, fontSize: 13, margin: 0 }}>
                  ↑ モードを選択して<br/>フィッティングを計算
                </p>
              </div>
            )}
            
            {/* 注意書き */}
            {(showFittingCalc === "simple" || showFittingCalc === "detail") && (
              <p style={{ color: C.textDim, fontSize: 10, margin: "12px 0 0", textAlign: "center", lineHeight: 1.5 }}>
                ※ 計算値は目安です。体の柔軟性や経験によって調整が必要です。
              </p>
            )}
          </Card>
          )}
          
          {/* フォームガイド */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.user(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>あなたに合ったライドスタイル</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {Object.entries(typeInfo.form).map(([key, item]) => (
                <div key={key} style={{ background: "theme.bg", borderRadius: 12, padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>{item.title}</p>
                    <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: 0 }}>{item.type}</p>
                  </div>
                  <p style={{ color: C.textMuted, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </Card>
          
          
          {/* 走り方ガイド */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.activity(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>距離別・走り方ガイド</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* 5K・10K */}
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  {Icons.zap(C.accent, 20)}
                  <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0 }}>{typeInfo.guide.fiveK.title}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  {typeInfo.guide.fiveK.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      {Icons.check(C.green, 14)}
                      <p style={{ color: C.textMuted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: `${C.orange}12`, borderRadius: 8, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    {Icons.alertTriangle(C.orange, 14)}
                    <p style={{ color: C.orange, fontSize: 12, margin: 0 }}>{typeInfo.guide.fiveK.avoid}</p>
                  </div>
                </div>
              </div>
              
              {/* ハーフ */}
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  {Icons.road(C.pink, 20)}
                  <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0 }}>{typeInfo.guide.half.title}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  {typeInfo.guide.half.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      {Icons.check(C.green, 14)}
                      <p style={{ color: C.textMuted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: `${C.orange}12`, borderRadius: 8, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    {Icons.alertTriangle(C.orange, 14)}
                    <p style={{ color: C.orange, fontSize: 12, margin: 0 }}>{typeInfo.guide.half.avoid}</p>
                  </div>
                </div>
              </div>
              
              {/* フル */}
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  {Icons.mountain(C.green, 20)}
                  <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0 }}>{typeInfo.guide.full.title}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  {typeInfo.guide.full.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      {Icons.check(C.green, 14)}
                      <p style={{ color: C.textMuted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: `${C.orange}12`, borderRadius: 8, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    {Icons.alertTriangle(C.orange, 14)}
                    <p style={{ color: C.orange, fontSize: 12, margin: 0 }}>{typeInfo.guide.full.avoid}</p>
                  </div>
                </div>
              </div>
              
              {/* トレーニング */}
              <div style={{ background: "theme.bg", borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  {Icons.target(C.cyan, 20)}
                  <p style={{ color: C.text, fontSize: 15, fontWeight: 700, margin: 0 }}>{typeInfo.guide.training.title}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  {typeInfo.guide.training.tips.map((tip, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      {Icons.check(C.green, 14)}
                      <p style={{ color: C.textMuted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{tip}</p>
                    </div>
                  ))}
                </div>
                <div style={{ background: `${C.orange}12`, borderRadius: 8, padding: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    {Icons.alertTriangle(C.orange, 14)}
                    <p style={{ color: C.orange, fontSize: 12, margin: 0 }}>{typeInfo.guide.training.avoid}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <button
            onClick={() => {
              setMode("start");
              setAnswers({});
              setSkipped(new Set());
              setScores({ typeA: 0, typeB: 0, num1: 0, num2: 0, high: 0, low: 0, open: 0, forward: 0, aggressive: 0, steady: 0, solo: 0, team: 0 });
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
          
          {/* フィッター紹介 */}
          {sport === "cycling" && (
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: `${typeInfo.color}15`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {Icons.stanceCore(typeInfo.color, 28)}
              </div>
              <div>
                <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>プロのフィッティング</p>
                <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>あなたのタイプを活かすポジションへ</p>
              </div>
            </div>
            
            <p style={{ color: C.textMuted, fontSize: 13, margin: "0 0 16px", lineHeight: 1.7 }}>
              診断結果をさらに活かすなら、プロのバイクフィッターに相談してみませんか？
              身体の使い方に合った最適なポジションを導き出してくれます。
            </p>
            
            {/* フィッターリスト */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "ACTIVIKE", area: "東京", desc: "理学療法士による身体評価ベース", url: "https://activike.com/bikefitting_activike/", color: "#4A90D9" },
                { name: "カミハギサイクル", area: "名古屋", desc: "Retül Fit対応・実績豊富", url: "https://kamihagi.com/retul/", color: "#E85A4F" },
                { name: "ベックオン", area: "大阪", desc: "各種フィッティング対応", url: "https://beckon.jp/pages/bikefitting", color: "#F5A623" },
                { name: "自転車のウエサカ", area: "中部", desc: "idmatch BIKELAB・複数資格保有", url: "http://jitensha-uesaka.sun.bindcloud.jp/idmatch/idmatchbikelab.html", color: "#7ED321" },
                { name: "一条サイクル", area: "大阪・京都・兵庫", desc: "元プロMTBライダーによるフィッティング", url: "https://www.1jyo.com/enjoy-bike/36843", color: "#9B59B6" },
              ].map((fitter, i) => (
                <a
                  key={i}
                  href={fitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    borderRadius: 12,
                    background: theme.bg,
                    border: `1px solid ${theme.cardBorder}`,
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: fitter.color,
                    }} />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <p style={{ color: C.text, fontSize: 14, fontWeight: 700, margin: 0 }}>{fitter.name}</p>
                        <span style={{ 
                          color: C.textDim, 
                          fontSize: 10, 
                          background: `${C.textDim}15`,
                          padding: "2px 8px",
                          borderRadius: 10,
                        }}>{fitter.area}</span>
                      </div>
                      <p style={{ color: C.textMuted, fontSize: 11, margin: "4px 0 0" }}>{fitter.desc}</p>
                    </div>
                  </div>
                  <div style={{ color: C.textDim }}>
                    {Icons.arrowRight(C.textDim, 16)}
                  </div>
                </a>
              ))}
            </div>
            
            <p style={{ color: C.textDim, fontSize: 10, margin: "16px 0 0", textAlign: "center", lineHeight: 1.5 }}>
              ※ 各店舗の予約・詳細は直接お問い合わせください
            </p>
          </Card>
          )}
          
          {/* シェア */}
          <Card style={{ marginTop: 20, background: `linear-gradient(135deg, ${C.accent}10, ${C.pink}08)`, border: `1px solid ${C.accent}20` }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ color: C.text, fontSize: 14, fontWeight: 600, margin: "0 0 12px" }}>結果をシェア</p>
              <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 16px", lineHeight: 1.6 }}>
                「私は<span style={{ color: typeInfo.color, fontWeight: 600 }}>{typeInfo.name}</span>タイプ」<br/>
                友達も診断してみよう！
              </p>
              
              <button
                onClick={() => {
                  const bodyStyle = type === "A1" ? "捻りながら前に踏み込む" 
                    : type === "A2" ? "捻りながら後ろで溜める"
                    : type === "B1" ? "身体を一体で前に押し出す"
                    : "身体を一体で安定させる";
                  const text = `「コーチの言うことがしっくりこない」の正体がわかった。

私は "${typeInfo.name}" タイプ。
「${bodyStyle}」のが自然な身体の使い方らしい。

合わないアドバイスに悩んでたのは、身体の使い方が違っただけだった。

あなたも自分のタイプ、調べてみて
https://stancecore.vercel.app

#STANCECORE #StanceType`;
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
                  window.open(url, '_blank');
                }}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  borderRadius: 12,
                  border: "none",
                  background: "#000",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter) でシェア
              </button>
              
              <button
                onClick={() => {
                  const text = `自分の身体の使い方がわかった。私は "${typeInfo.name}" タイプ。 https://stancecore.vercel.app`;
                  if (navigator.share) {
                    navigator.share({ title: 'STANCE CORE 診断結果', text: text, url: 'https://stancecore.vercel.app' });
                  } else {
                    navigator.clipboard.writeText(text);
                    alert('クリップボードにコピーしました！');
                  }
                }}
                style={{
                  width: "100%",
                  marginTop: 8,
                  padding: "12px 20px",
                  borderRadius: 12,
                  border: `1px solid ${C.cardBorder}`,
                  background: "transparent",
                  color: C.textMuted,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                テキストをコピー
              </button>
            </div>
          </Card>
          
          {/* ABOUT - 理論説明 */}
          <Card style={{ marginTop: 24 }}>
            <p style={{ 
              color: theme.accent, 
              fontSize: 11, 
              fontWeight: 600, 
              margin: "0 0 20px", 
              letterSpacing: "3px", 
              textTransform: "uppercase",
              textAlign: "center"
            }}>
              About Stance Type
            </p>
            
            <div style={{ fontSize: 13, color: C.text, lineHeight: 2 }}>
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: theme.accent, fontWeight: 600, margin: "0 0 8px", fontSize: 12, letterSpacing: "1px" }}>
                  予測的姿勢制御（APA）とは
                </p>
                <p style={{ margin: 0, color: C.textMuted }}>
                  人は動作の直前、無意識に姿勢を調整している。
                  この働きは神経科学・リハビリテーション分野で
                  「Anticipatory Postural Adjustments（APA）」として研究されている。
                </p>
              </div>
              
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: theme.accent, fontWeight: 600, margin: "0 0 8px", fontSize: 12, letterSpacing: "1px" }}>
                  足裏に現れる傾向
                </p>
                <p style={{ margin: 0, color: C.textMuted }}>
                  APAの傾向は特に足裏の荷重位置に現れやすい。
                  前側（つま先寄り）か後側（かかと寄り）か、内側か外側か。
                </p>
              </div>
              
              <div style={{ marginBottom: 20 }}>
                <p style={{ color: theme.accent, fontWeight: 600, margin: "0 0 8px", fontSize: 12, letterSpacing: "1px" }}>
                  4つのStance Type
                </p>
                <p style={{ margin: 0, color: C.textMuted }}>
                  STANCE COREでは、これらの傾向から4タイプ（A1/A2/B1/B2）に分類。
                  それぞれに適した身体の使い方、機材選びがある。
                </p>
              </div>
              
              <div style={{ 
                borderTop: `1px solid ${theme.cardBorder}`, 
                paddingTop: 16,
                marginTop: 16 
              }}>
                <p style={{ color: C.textDim, fontWeight: 500, margin: "0 0 8px", fontSize: 10, letterSpacing: "1px", textTransform: "uppercase" }}>
                  References
                </p>
                <p style={{ margin: 0, color: C.textDim, fontSize: 11, lineHeight: 1.8 }}>
                  Massion, J. (1992). Movement, posture and equilibrium<br/>
                  Aruin, A.S., Latash, M.L. (1995). Directional specificity of postural muscles
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }
  
  return null;
}
