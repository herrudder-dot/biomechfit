/**
 * STANCE CORE - Cycling Body Mechanics Analysis App
 * 
 * APAに基づいた身体タイプ診断アプリ
 * 8つのStance Type（F/R × I/O × X/II）を判定し、
 * 最適なフィッティングと機材を提案
 * 
 * @version 2.0.0
 * @license MIT
 */

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
    
    // タイプ別カラー（8タイプ対応）
    typeColors: {
      FIX:  { main: "#F59E0B", gradient: "linear-gradient(135deg, #F59E0B, #D97706)", glow: "rgba(245, 158, 11, 0.15)" },
      FIII: { main: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, #0891B2)", glow: "rgba(6, 182, 212, 0.15)" },
      FOX:  { main: "#EF4444", gradient: "linear-gradient(135deg, #EF4444, #DC2626)", glow: "rgba(239, 68, 68, 0.15)" },
      FOII: { main: "#10B981", gradient: "linear-gradient(135deg, #10B981, #059669)", glow: "rgba(16, 185, 129, 0.15)" },
      RIX:  { main: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)", glow: "rgba(139, 92, 246, 0.15)" },
      RIII: { main: "#6366F1", gradient: "linear-gradient(135deg, #6366F1, #4F46E5)", glow: "rgba(99, 102, 241, 0.15)" },
      ROX:  { main: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #DB2777)", glow: "rgba(236, 72, 153, 0.15)" },
      ROII: { main: "#64748B", gradient: "linear-gradient(135deg, #64748B, #475569)", glow: "rgba(100, 116, 139, 0.15)" },
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
      FIX:  { main: "#F59E0B", gradient: "linear-gradient(135deg, #F59E0B, #D97706)", glow: "rgba(245, 158, 11, 0.3)" },
      FIII: { main: "#06B6D4", gradient: "linear-gradient(135deg, #06B6D4, #0891B2)", glow: "rgba(6, 182, 212, 0.3)" },
      FOX:  { main: "#EF4444", gradient: "linear-gradient(135deg, #EF4444, #DC2626)", glow: "rgba(239, 68, 68, 0.3)" },
      FOII: { main: "#10B981", gradient: "linear-gradient(135deg, #10B981, #059669)", glow: "rgba(16, 185, 129, 0.3)" },
      RIX:  { main: "#8B5CF6", gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)", glow: "rgba(139, 92, 246, 0.3)" },
      RIII: { main: "#6366F1", gradient: "linear-gradient(135deg, #6366F1, #4F46E5)", glow: "rgba(99, 102, 241, 0.3)" },
      ROX:  { main: "#EC4899", gradient: "linear-gradient(135deg, #EC4899, #DB2777)", glow: "rgba(236, 72, 153, 0.3)" },
      ROII: { main: "#64748B", gradient: "linear-gradient(135deg, #64748B, #475569)", glow: "rgba(100, 116, 139, 0.3)" },
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
  // F-I向け（前乗り・ショートノーズ）
  { id: "power-arc", name: "Specialized Power Arc", brand: "Specialized", price: 28000, category: "saddle",
    style: "forward", type: ["A1", "B1"], 
    reason: "ショートノーズで前乗りに最適。高出力ペダリングをサポート。",
    amazonQuery: "Specialized+Power+Saddle", rakutenQuery: "Specialized%20Power%20サドル" },
  { id: "argo-r3", name: "fi'zi:k Argo Tempo R3", brand: "fi'zi:k", price: 15000, category: "saddle",
    style: "forward", type: ["A1", "B1"],
    reason: "ショートノーズの入門モデル。前乗りポジションに。",
    amazonQuery: "fizik+Argo+Tempo", rakutenQuery: "fizik%20Argo%20Tempo" },
  // F-O向け（後ろ乗り・ロングノーズ）
  { id: "antares-r3", name: "fi'zi:k Antares R3", brand: "fi'zi:k", price: 18000, category: "saddle",
    style: "rear", type: ["A2", "B2"],
    reason: "クラシックな形状で後ろ乗りに最適。ロングライドも快適。",
    amazonQuery: "fizik+Antares", rakutenQuery: "fizik%20Antares" },
  { id: "aspide", name: "Selle Italia SLR Boost", brand: "Selle Italia", price: 22000, category: "saddle",
    style: "rear", type: ["A2"],
    reason: "軽量でクライマー向け。後ろ乗りでトルクをかけやすい。",
    amazonQuery: "Selle+Italia+SLR+Boost", rakutenQuery: "Selle%20Italia%20SLR%20Boost" },
  // R-I/R-O向け（バランス型）
  { id: "romin-evo", name: "Specialized Romin Evo", brand: "Specialized", price: 25000, category: "saddle",
    style: "neutral", type: ["B1", "B2"],
    reason: "オールラウンドな形状。様々なポジションに対応。",
    amazonQuery: "Specialized+Romin+Evo", rakutenQuery: "Specialized%20Romin%20Evo" },
  { id: "cambium-c17", name: "Brooks Cambium C17", brand: "Brooks", price: 16000, category: "saddle",
    style: "neutral", type: ["B2"],
    reason: "快適性重視。ロングライドやエンデュランスに。",
    amazonQuery: "Brooks+Cambium+C17", rakutenQuery: "Brooks%20Cambium%20C17" },

  // === ペダル ===
  // F-I向け（高剛性・軽量）
  { id: "dura-ace-pedal", name: "Shimano Dura-Ace PD-R9200", brand: "Shimano", price: 35000, category: "pedal",
    style: "stiff", type: ["A1"],
    reason: "最高剛性でパワー伝達ロスなし。スプリンター向け。",
    amazonQuery: "Shimano+Dura-Ace+PD-R9200", rakutenQuery: "Shimano%20Dura-Ace%20ペダル" },
  { id: "keo-blade", name: "Look Keo Blade Carbon", brand: "Look", price: 28000, category: "pedal",
    style: "stiff", type: ["A1", "B1"],
    reason: "カーボンブレードで軽量×高剛性。反応の良いペダリングに。",
    image: "https://m.media-amazon.com/images/I/71vZ3mGnURL._AC_SX679_.jpg",
    amazonQuery: "Look+Keo+Blade+Carbon", rakutenQuery: "Look%20Keo%20Blade%20Carbon" },
  // F-O/R-O向け（バランス型）
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
  // F-I向け（高剛性）
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
  book: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  x: (color = C.accent, size = 24) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
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

// ヒルクライム完全ガイド（8タイプ別）
const HILLCLIMB_GUIDE = {
  FIX: {
    climbing: {
      pace: "変化をつけて攻める。一定ペースより緩急で勝負",
      dancing: "積極的に使う。バイクを左右に振って対角に力を伝える",
      sitting: "前乗りで母指球荷重。腰を微妙にひねりながらペダリング",
      cadence: "85-95rpm。高回転でキレを出す"
    },
    cornering: {
      entry: "ブレーキングは早めに終える。内側荷重の準備",
      mid: "内側の肩を落として体をひねる（クロス連動）。バイクを倒し込む",
      exit: "ダンシングで一気に加速。腕を引きながら反対脚で踏む"
    },
    acceleration: {
      start: "腰のひねりを起点に対角線で力を伝える",
      gear: "やや軽めで回転を上げて加速",
      upper: "ハンドルを交互に引いて、脚と連動させる",
      image: "「捻じって弾く」感覚"
    },
    gradient: {
      easy: { range: "3〜5%", tip: "ハイケイデンスで飛ばす。得意ゾーン" },
      mid: { range: "6〜9%", tip: "ダンシングを混ぜてリズム作り" },
      steep: { range: "10%〜", tip: "短いならダンシングで押し切る。長いと厳しい" }
    },
    weakness: {
      problem: "長い一定ペースの登りが苦手",
      solutions: ["ペースの波を作る。少し上げて少し落とすを繰り返す", "勾配変化や集団のペース変動を利用してリズムを作る"]
    }
  },
  FIII: {
    climbing: {
      pace: "一定ペースが得意。序盤から安定して刻む",
      dancing: "控えめ。必要なときだけ短く使う",
      sitting: "前乗りで母指球荷重。腰を固定してスムーズに回す",
      cadence: "80-90rpm。効率重視の回転数"
    },
    cornering: {
      entry: "スピードをコントロールして安定して入る",
      mid: "バイクと体を一体で傾ける。無駄な動きを減らす",
      exit: "シッティングのまま徐々に加速。急がない"
    },
    acceleration: {
      start: "脚の上下動を意識。体幹は固定",
      gear: "重すぎず軽すぎず。効率の良いギアを探す",
      upper: "安定させる。ブレない軸",
      image: "「滑らかに押し出す」感覚"
    },
    gradient: {
      easy: { range: "3〜5%", tip: "最も得意。TTのように淡々と踏む" },
      mid: { range: "6〜9%", tip: "ペースを落とさず耐える。効率で勝負" },
      steep: { range: "10%〜", tip: "無理せずギアを落として回転キープ" }
    },
    weakness: {
      problem: "急なアタックや勾配変化への対応",
      solutions: ["変化を予測して事前にギアとペースを調整", "ダンシングの練習を定期的に入れる"]
    }
  },
  FOX: {
    climbing: {
      pace: "後半勝負型。序盤は集団に潜んで脚を溜める",
      dancing: "ガンガン使う。バイクを大きく振ってパワーを出す",
      sitting: "前乗りで外側荷重。サドルの前寄りに座る",
      cadence: "75-85rpm。トルク重視"
    },
    cornering: {
      entry: "アウトから入って減速を最小限に",
      mid: "内側の肩を落として捻る。外側の脚でバイクを押さえる",
      exit: "ダンシングで爆発的に加速。ここが勝負所"
    },
    acceleration: {
      start: "腰のひねりを使い、対角線に体重を乗せる",
      gear: "重めでトルクをガツンとかける",
      upper: "ハンドルを強く引いて反対脚に力を伝える",
      image: "「捻じって踏み抜く」感覚"
    },
    gradient: {
      easy: { range: "3〜5%", tip: "独走で踏み倒す。スピードで押し切る" },
      mid: { range: "6〜9%", tip: "ダンシングを多用してパワーで勝負" },
      steep: { range: "10%〜", tip: "最も得意。パワーの見せ所" }
    },
    weakness: {
      problem: "集団内での位置取り、一定ペースの維持",
      solutions: ["単独で逃げる展開を作る", "パワーメーターでペース管理を覚える"]
    }
  },
  FOII: {
    climbing: {
      pace: "最初からマイペース。自分のリズムを崩さない",
      dancing: "控えめ。長い登りはシッティング中心",
      sitting: "前乗り〜中央で外側荷重。座面をしっかり使う",
      cadence: "75-85rpm。やや低めで安定"
    },
    cornering: {
      entry: "十分に減速して安全に",
      mid: "バイクと一体で傾く。急な動きは避ける",
      exit: "シッティングで徐々に加速"
    },
    acceleration: {
      start: "脚全体で踏み込む。足裏全体で",
      gear: "重めでゆっくりトルクをかける",
      upper: "ブラケットをしっかり握って安定",
      image: "「じわっと押し込む」感覚"
    },
    gradient: {
      easy: { range: "3〜5%", tip: "淡々と効率よく消化" },
      mid: { range: "6〜9%", tip: "得意ゾーン。粘り強く登る" },
      steep: { range: "10%〜", tip: "ペース落としても粘る。垂れない強さ" }
    },
    weakness: {
      problem: "スプリント、急加速",
      solutions: ["勝負所を見極めて早めに仕掛ける", "ダンシングでのパワー練習を追加"]
    }
  },
  RIX: {
    climbing: {
      pace: "リズムを大切に。変化を楽しむ",
      dancing: "適度に使う。リズムを変えるアクセントとして",
      sitting: "後ろ乗りで内側荷重。背中を丸めすぎない",
      cadence: "80-90rpm。リズミカルに"
    },
    cornering: {
      entry: "リズムを保ちながらスムーズに",
      mid: "体をひねって内側に重心移動",
      exit: "ダンシングでリズムよく加速"
    },
    acceleration: {
      start: "腰のひねりを使うが、大げさにならない",
      gear: "状況に応じて柔軟に",
      upper: "リズムに合わせて自然に動く",
      image: "「リズムに乗せて弾む」感覚"
    },
    gradient: {
      easy: { range: "3〜5%", tip: "リズムよくこなす" },
      mid: { range: "6〜9%", tip: "得意ゾーン。変化に対応しながら登る" },
      steep: { range: "10%〜", tip: "ダンシングとシッティングを切り替えながら" }
    },
    weakness: {
      problem: "単調な平坦区間、TTポジション",
      solutions: ["自分でリズムを作る工夫（ペダリングにアクセント）", "変化のあるコースを選ぶ"]
    }
  },
  RIII: {
    climbing: {
      pace: "超一定ペース。メトロノームのように刻む",
      dancing: "ほぼ使わない。使っても短く",
      sitting: "後ろ乗りで内側荷重。体幹を固定して回す",
      cadence: "85-95rpm。高め安定"
    },
    cornering: {
      entry: "スピードを保ちながらスムーズに",
      mid: "バイクと一体で傾く。最小限の動き",
      exit: "シッティングのまま滑らかに加速"
    },
    acceleration: {
      start: "脚の回転を意識。上下動の効率",
      gear: "軽めで回転数を維持",
      upper: "固定。ブレない",
      image: "「流れるように回す」感覚"
    },
    gradient: {
      easy: { range: "3〜5%", tip: "最も得意。効率で他を圧倒" },
      mid: { range: "6〜9%", tip: "ペースを落としすぎず耐える" },
      steep: { range: "10%〜", tip: "軽いギアで回転キープ。粘り勝負" }
    },
    weakness: {
      problem: "ダンシング、急な地形変化",
      solutions: ["勾配変化を事前に把握してギアを準備", "週1でダンシング練習を入れる"]
    }
  },
  ROX: {
    climbing: {
      pace: "臨機応変。状況を見て判断",
      dancing: "必要に応じて使う。バランス良く",
      sitting: "後ろ乗りで外側荷重。安定重視",
      cadence: "75-85rpm。状況に応じて調整"
    },
    cornering: {
      entry: "状況判断で最適なラインを選ぶ",
      mid: "体をひねりながらも安定感を保つ",
      exit: "状況に応じてダンシングかシッティングか判断"
    },
    acceleration: {
      start: "腰のひねりを使いつつ安定感も保つ",
      gear: "その場で最適なギアを選ぶ判断力",
      upper: "状況に応じて柔軟に",
      image: "「対応しながら進む」感覚"
    },
    gradient: {
      easy: { range: "3〜5%", tip: "どんなペースにも対応" },
      mid: { range: "6〜9%", tip: "バランスよくこなす" },
      steep: { range: "10%〜", tip: "粘り強く対応。状況判断で乗り切る" }
    },
    weakness: {
      problem: "突出した武器がない（でもこれが強み）",
      solutions: ["オールラウンダーとして立ち回る", "どんな状況でも80点を出せる安定感を磨く"]
    }
  },
  ROII: {
    climbing: {
      pace: "超マイペース。周りに惑わされない",
      dancing: "ほぼ使わない。座って踏む",
      sitting: "後ろ乗りで外側荷重。どっしり座る",
      cadence: "70-80rpm。低めトルク型"
    },
    cornering: {
      entry: "十分に減速して安全第一",
      mid: "バイクと一体で傾く。急な動きは避ける",
      exit: "シッティングで徐々に加速"
    },
    acceleration: {
      start: "足裏全体でじわっと踏む",
      gear: "重めでトルクをかける",
      upper: "どっしり構える",
      image: "「押し込んで進む」感覚"
    },
    gradient: {
      easy: { range: "3〜5%", tip: "マイペースで消化" },
      mid: { range: "6〜9%", tip: "粘り強く。垂れない" },
      steep: { range: "10%〜", tip: "ペース落としても最後まで踏める" }
    },
    weakness: {
      problem: "瞬発力、急なペース変化への対応",
      solutions: ["変化を予測して早めに準備", "後半勝負に持ち込む。前半は省エネ"]
    }
  }
};

// セルフチェック（タイプ別確認テスト）
const SELF_CHECK = {
  FIX: {
    checks: [
      { name: "対角連動チェック", how: "その場で軽くジョギングの動き。右脚を上げたとき、左腕が自然に前に出る？", good: "対角線で連動 → クロス型OK", bad: "腕が動かない → パラレル寄り" },
      { name: "ダンシングチェック", how: "ダンシングで30秒。バイクを左右に振ってみて", good: "振った方が踏みやすい → OK", bad: "振らない方が安定 → パラレル寄り" },
      { name: "みぞおちチェック", how: "ペダリング中、力の起点はどこ？", good: "みぞおち〜股関節 → Fタイプ OK", bad: "背中・肩甲骨 → Rタイプ寄り" },
    ]
  },
  FIII: {
    checks: [
      { name: "体幹固定チェック", how: "シッティングで1分、上半身を動かさずペダリング", good: "楽に回せる → パラレル型OK", bad: "窮屈 → クロス寄り" },
      { name: "高回転チェック", how: "100rpm以上で30秒回してみて", good: "お尻が跳ねない → 効率型OK", bad: "すぐバタつく → 踏み込み派" },
      { name: "みぞおちチェック", how: "力の起点はどこ？", good: "みぞおち〜お腹 → Fタイプ OK", bad: "背中・腰 → Rタイプ寄り" },
    ]
  },
  FOX: {
    checks: [
      { name: "パワーダンシング", how: "坂でダンシング30秒全力。バイクを大きく振って", good: "パワーが出る → FOX型OK", bad: "シッティングの方が楽 → 別タイプ" },
      { name: "外側荷重チェック", how: "ペダリング中、足裏のどこで踏んでる？", good: "小指側も使う → 外側荷重OK", bad: "親指の付け根だけ → 内側荷重" },
      { name: "トルク型チェック", how: "重めギアで70rpm、しっくりくる？", good: "踏み応えが好き → トルク型OK", bad: "軽くして回したい → 高回転型" },
    ]
  },
  FOII: {
    checks: [
      { name: "安定シッティング", how: "長い登りを一定ペースで5分以上シッティング", good: "淡々と踏める → FOII型OK", bad: "ダンシング入れたい → クロス寄り" },
      { name: "外側荷重チェック", how: "立った状態で足裏を確認。体重は？", good: "足裏全体〜外側 → 外側荷重OK", bad: "親指側に集中 → 内側荷重" },
      { name: "マイペースチェック", how: "集団のペース変化に惑わされる？", good: "自分のペース守れる → OK", bad: "つい反応する → 別タイプ" },
    ]
  },
  RIX: {
    checks: [
      { name: "リズムチェック", how: "ペダリングのリズム変化を楽しめる？", good: "変化が気持ちいい → RIX型OK", bad: "一定の方が楽 → パラレル寄り" },
      { name: "内側荷重チェック", how: "ペダリング中、膝の軌道は？", good: "まっすぐ〜やや内側 → 内側荷重OK", bad: "外に開く → 外側荷重" },
      { name: "後体幹チェック", how: "力を入れるとき、意識が向くのは？", good: "背中・肩甲骨・腰 → Rタイプ OK", bad: "お腹・みぞおち → Fタイプ寄り" },
    ]
  },
  RIII: {
    checks: [
      { name: "超安定チェック", how: "平地を一定ペースで10分。上半身は完全固定", good: "楽、自然にできる → RIII型OK", bad: "窮屈、動かしたい → 別タイプ" },
      { name: "高回転チェック", how: "90-100rpmで長時間回せる？", good: "むしろ得意 → 効率型OK", bad: "すぐ疲れる → トルク型" },
      { name: "集団走行チェック", how: "ドラフティングで省エネ走行、得意？", good: "集団の中が落ち着く → OK", bad: "前に出たい → 別タイプ" },
    ]
  },
  ROX: {
    checks: [
      { name: "適応力チェック", how: "コースの変化への対応は？", good: "自然に合わせられる → ROX型OK", bad: "自分のスタイル貫きたい → 別タイプ" },
      { name: "ひねりチェック", how: "コーナーで体をひねる動き、自然？", good: "できる → クロス型OK", bad: "一体で傾く方が楽 → パラレル寄り" },
      { name: "オールラウンドチェック", how: "登り/平地/下り、どれも80点出せる？", good: "特に苦手がない → ROX型OK", bad: "得意不得意がはっきり → 別タイプ" },
    ]
  },
  ROII: {
    checks: [
      { name: "どっしりチェック", how: "サドルにしっかり座って後ろ乗り", good: "安定する → ROII型OK", bad: "前に座りたい → 別タイプ" },
      { name: "低回転チェック", how: "70-80rpmでゆっくり踏む", good: "トルクかけやすい → OK", bad: "軽くして回したい → 別タイプ" },
      { name: "ロングライドチェック", how: "100km以上の後半、まだ踏める？", good: "垂れない → ROII型OK", bad: "後半キツい → 別タイプ" },
    ]
  },
};

// 体感ワード変換表
const BODY_FEEL_DICT = [
  { vague: "骨盤を立てる", feel: "サドルの後ろ側に座って、お尻の骨（坐骨）を感じる", check: "座面の後ろ半分にお尻が乗ってる？" },
  { vague: "骨盤を寝かせる", feel: "サドルの前側に座って、股の付け根がサドルに当たる", check: "座面の前半分に体重がかかってる？" },
  { vague: "体幹を使う", feel: "お腹に力を入れた状態でペダルを踏む", check: "咳をするときに力が入る場所を意識できる？" },
  { vague: "腰を入れる", feel: "おへそを前に突き出す感じ", check: "ベルトのバックルが前に出る？" },
  { vague: "肩の力を抜く", feel: "肘を軽く曲げて、手のひらでブラケットを包む", check: "ハンドルを握りしめてない？指に隙間ある？" },
  { vague: "引き足を使う", feel: "靴の中で足の甲がシューズの上に当たる感覚", check: "上死点で、靴の中で足が浮く？" },
  { vague: "踏む", feel: "3時の位置で、かかとを少し落として体重を乗せる", check: "かかとがつま先より低くなってる？" },
  { vague: "回す", feel: "足首を固定して、膝の上下動だけでペダルを回す", check: "足首がクニャクニャ動いてない？" },
  { vague: "ハンドルを引く", feel: "肘を脇腹に近づける動き", check: "肘が外に開いてない？" },
  { vague: "前乗り", feel: "サドルの先端から5cm以内に座る。ハンドルが近く感じる", check: "ブラケットを持ったとき、肘が曲がってる？" },
  { vague: "後ろ乗り", feel: "サドルの後ろ寄りに座る。ハンドルが遠く感じる", check: "腕がほぼまっすぐに伸びてる？" },
  { vague: "ケイデンスを上げる", feel: "太ももの動きを速くする。お尻は跳ねさせない", check: "お尻がサドルから浮いてない？" },
  { vague: "トルクをかける", feel: "ギアを1〜2枚重くして、踏み込みで「グッ」と感じる", check: "ペダルを踏んだとき、抵抗を感じる？" },
];

// 調整フローチャート（症状別）
const ADJUSTMENT_FLOW = [
  { symptom: "膝の前側が痛い", causes: ["サドルが低い", "サドルが前すぎ"], fixes: [
    { what: "サドル高さ", action: "+5mm上げる", check: "下死点で膝が伸びきらない" },
    { what: "サドル前後", action: "5mm後ろへ", check: "3時で膝がつま先より後ろ" },
  ]},
  { symptom: "膝の裏側が痛い", causes: ["サドルが高い", "サドルが後ろすぎ"], fixes: [
    { what: "サドル高さ", action: "-5mm下げる", check: "下死点で膝に余裕がある" },
    { what: "サドル前後", action: "5mm前へ", check: "3時で膝がつま先の上" },
  ]},
  { symptom: "手が痺れる", causes: ["ハンドルが低い/遠い", "体重が手にかかりすぎ"], fixes: [
    { what: "ステム", action: "短くする or 角度上げる", check: "肘に余裕がある" },
    { what: "体幹", action: "お腹に力を入れて上半身を支える", check: "手に体重かけずに走れる" },
  ]},
  { symptom: "お尻が痛い", causes: ["サドルが合ってない", "サドルが高すぎ"], fixes: [
    { what: "サドル高さ", action: "-3〜5mm下げる", check: "お尻が左右に動かない" },
    { what: "サドル角度", action: "水平に調整", check: "前にも後ろにも滑らない" },
  ]},
  { symptom: "腰が痛い", causes: ["落差が大きい", "ハンドルが遠い"], fixes: [
    { what: "ステム", action: "角度を上げる or 短くする", check: "背中が丸まりすぎてない" },
    { what: "体幹トレ", action: "プランク30秒×3を毎日", check: "1週間で改善するか" },
  ]},
  { symptom: "力が入らない", causes: ["サドルが低い", "サドル位置が合ってない"], fixes: [
    { what: "サドル高さ", action: "+5mm上げる", check: "下死点で膝に少し余裕" },
    { what: "サドル前後", action: "タイプに合わせて調整", check: "3時で膝の位置を確認" },
  ]},
  { symptom: "ケイデンスが上がらない", causes: ["サドルが高すぎ"], fixes: [
    { what: "サドル高さ", action: "-3mm下げる", check: "お尻が跳ねない" },
    { what: "練習", action: "片足ペダリング", check: "カクカクせず回せるか" },
  ]},
];

// タイプ別「しっくりこない」対処
const TYPE_TROUBLESHOOT = {
  FIX: { issue: "ダンシングで力が出ない", try: ["ギアを2枚重くして", "バイクを大きく振る", "ハンドルを引いて反対脚で踏む"] },
  FIII: { issue: "すぐ疲れる", try: ["落差を10mm減らす", "お腹に力を入れる", "ケイデンスを5rpm上げる"] },
  FOX: { issue: "パワーが出ない", try: ["サドルを5mm前へ", "クリートを外寄りに", "重いギアでダンシング練習"] },
  FOII: { issue: "長距離で垂れる", try: ["最初の1時間を抑える", "落差を10mm減らす", "ケイデンスを80rpmに"] },
  RIX: { issue: "リズムに乗れない", try: ["変化のあるコースを選ぶ", "ギアチェンジを増やす", "音楽を聴きながら走る"] },
  RIII: { issue: "集団についていけない", try: ["前方を見て変化を予測", "ギアを1枚軽めに", "ダンシングの練習を追加"] },
  ROX: { issue: "特徴がなくて物足りない", try: ["それが強み。状況判断を磨く", "弱い部分を少しずつ強化", "レースは終盤勝負"] },
  ROII: { issue: "スピードが出ない", try: ["後半勝負に持ち込む", "長い登りで差をつける", "インターバル練習を追加"] },
};

// 質問プール
// 軸1: AかBか（体幹タイプ） - A=みぞおち・股関節主導 / B=首・肩甲骨・腰主導
// 軸2: Inner/Outer（荷重タイプ） - I=内側荷重 / O=外側荷重
// APA: ケイデンス（高回転/トルク）、姿勢（胸開き/前傾）
// type: "text"（テキスト2択）, "action"（体験型）, "quad"（4択）
const QUESTION_POOL = [
  // === 基本質問（体幹タイプ） ===
  { id: "carry_bag_basic", cat: "trunk", type: "text",
    q: "重い荷物を持つとき、楽なのは？", 
    a: "体に近づけて抱えるように持つ", 
    b: "腕を伸ばして体から離して持つ",
    weight: { typeA: [1, 0], typeB: [0, 1] } },
  
  // === 体験型質問 ===
  { id: "action_push", cat: "trunk", type: "action",
    q: "壁を両手で押してみて",
    instruction: "グッと力を入れるとき、意識が向くのはどこ？",
    a: "お腹・みぞおちに力が入る", b: "背中・肩甲骨に力が入る",
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
  { id: "shoe_wear", cat: "balance", q: "靴底の減り、気になるのは？", a: "内側（親指側）が減る", b: "外側（小指側）が減る", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "knee_direction", cat: "balance", q: "スクワットすると膝は？", a: "外に開きやすい", b: "内側に入りやすい", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "one_leg_balance", cat: "balance", q: "片足立ちで踏ん張る場所は？", a: "親指の付け根あたり", b: "小指側〜外側", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "sit_legs", cat: "balance", q: "電車で座ると、膝は自然と…", a: "開く", b: "閉じる", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "stand_feet", cat: "balance", q: "リラックスして立つと、つま先は？", a: "まっすぐ〜やや内向き", b: "やや外向き（ガニ股気味）", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "walk_width", cat: "balance", q: "歩くとき、左右の足の幅は？", a: "広め", b: "狭め（一直線に近い）", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "pedal_push", cat: "balance", q: "ペダルを踏む感覚は？", a: "親指の付け根で踏む", b: "足裏全体で踏む", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "leg_cross", cat: "balance", q: "脚を組むとき、しっくりくるのは？", a: "ゆったり外に開く", b: "ギュッと内側に締める", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "squat_knee", cat: "balance", q: "深くしゃがむと、膝は？", a: "つま先より内側に入る", b: "つま先と同じか外に開く", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "ankle_injury", cat: "balance", q: "足首を捻るとしたら、どっち？", a: "内側にグキッ（よくある捻挫）", b: "外側にグキッ", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "heel_wear", cat: "balance", q: "靴の踵、減りやすいのは？", a: "外側", b: "内側", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "toe_power", cat: "balance", q: "地面を蹴るとき、力が入るのは？", a: "親指側", b: "小指側も使う", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "calf_shape", cat: "balance", q: "ふくらはぎ、張ってるのは？", a: "外側", b: "内側", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "thigh_shape", cat: "balance", q: "太もも、発達してるのは？", a: "内もも", b: "外もも", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "arch_height", cat: "balance", q: "土踏まずの高さは？", a: "高め（アーチがある）", b: "低め（偏平足気味）", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "stand_weight", cat: "balance", q: "長時間立つと、体重がかかるのは？", a: "足の内側", b: "足の外側", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "jump_land", cat: "balance", q: "ジャンプして着地、最初に着くのは？", a: "足の外側（小指側）", b: "足の内側（親指側）", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "turn_pivot", cat: "balance", q: "くるっと振り向くとき、軸足は？", a: "内側に体重をかける", b: "外側に体重をかける", weight: { num1: [1, 0], num2: [0, 1] } },
  
  // === 客観的事実（ブレにくい） ===
  { id: "leg_shape", cat: "balance", q: "脚の形、近いのは？", a: "O脚気味（膝が外に開く）", b: "X脚気味（膝が内に入る）", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "shoe_width", cat: "balance", q: "靴選びで困るのは？", a: "幅が狭くて入らない", b: "幅が広くてブカブカ", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "pants_fit", cat: "balance", q: "パンツ・ズボンで気になるのは？", a: "太もも外側がキツい", b: "太もも内側が余る", weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "flat_foot", cat: "balance", q: "偏平足って言われたことある？", a: "ある / 土踏まず低め", b: "ない / アーチしっかり", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "knock_knee", cat: "balance", q: "立ったとき、膝同士は？", a: "くっつく", b: "離れてる", weight: { num1: [1, 0], num2: [0, 1] } },
  
  // === 体験型（今すぐ確認） ===
  { id: "action_stand_now", cat: "balance", type: "action",
    q: "今、立ってみて",
    instruction: "足元を見て。つま先はどっち向いてる？",
    a: "内向き or まっすぐ", b: "外向き（ハの字）",
    weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "action_squat_now", cat: "balance", type: "action",
    q: "その場でスクワット！",
    instruction: "しゃがんだとき、膝はどう動く？",
    a: "内側に入る", b: "外に開く",
    weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "action_one_leg", cat: "balance", type: "action",
    q: "片足で10秒立ってみて",
    instruction: "グラついたら、どっちに倒れそうになった？",
    a: "内側（親指側）に倒れそう", b: "外側（小指側）に倒れそう",
    weight: { num1: [0, 1], num2: [1, 0] } },
  { id: "action_tiptoe", cat: "balance", type: "action",
    q: "つま先立ちしてみて",
    instruction: "体重がかかってるのは？",
    a: "親指の付け根", b: "小指側も使ってる",
    weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "action_heel_stand", cat: "balance", type: "action",
    q: "かかと立ちしてみて",
    instruction: "バランス取りやすいのは？",
    a: "かかとの内側に体重", b: "かかとの外側に体重",
    weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "action_walk_line", cat: "balance", type: "action",
    q: "まっすぐ線の上を歩くイメージで",
    instruction: "自然に歩くと、足は線に対して？",
    a: "線の上 or 内側に着地", b: "線の外側に着地しがち",
    weight: { num1: [1, 0], num2: [0, 1] } },
  
  // === サイクリング特化 ===
  { id: "pedal_knee", cat: "balance", q: "ペダリング中、膝の動きは？", a: "内に入りやすい", b: "外に逃げやすい", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "cleat_position", cat: "balance", q: "クリート位置、しっくりくるのは？（未経験ならイメージで）", a: "内寄り / 狭いスタンス", b: "外寄り / 広いスタンス", weight: { num1: [1, 0], num2: [0, 1] } },
  { id: "qfactor_pref", cat: "balance", q: "ペダルの幅（Qファクター）、好みは？", a: "狭め（脚がまっすぐ）", b: "広め（自然に開く）", weight: { num1: [1, 0], num2: [0, 1] } },
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
    
  // === クロス/パラレル判定（連動パターン） ===
  // クロス = 対角線の連動（右手-左足）、腰をひねって力を伝える
  // パラレル = 同側の連動、体幹を固定して安定
  
  // --- 日常動作 ---
  { id: "cross_walk", cat: "movement", q: "歩くとき、腕の振りは？", 
    a: "脚と反対の腕が大きく出る（右足と左腕）", b: "腕はあまり振らない / 意識しない", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_throw", cat: "movement", q: "ボールを投げるとき、体の使い方は？", 
    a: "腰をひねって、対角線に体重移動", b: "腕中心で投げる、体幹は安定", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_kick", cat: "movement", q: "ボールを蹴るとき、自然なのは？", 
    a: "蹴る脚と反対の腕を大きく振る", b: "両腕でバランスを取る程度", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_punch", cat: "movement", q: "パンチを打つイメージは？", 
    a: "腰を回転させて対角線に体重を乗せる", b: "肩から腕を押し出す感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_twist", cat: "movement", q: "体をひねる動きは？", 
    a: "得意、自然にできる", b: "あまり得意じゃない、硬い感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_turn", cat: "movement", q: "後ろを振り向くとき、どう動く？", 
    a: "腰からひねって振り向く", b: "体全体を回す or 首だけで振り向く", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_reach", cat: "movement", q: "右側のものを取るとき、自然なのは？", 
    a: "右手を伸ばしながら左足に体重を乗せる", b: "右手と右足側に体重を乗せる", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_run", cat: "movement", q: "走るとき、腕と脚の連動は？", 
    a: "対角線（右脚と左腕）が自然に連動", b: "あまり意識しない、腕は添える程度", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  
  // --- スポーツ動作 ---
  { id: "cross_swing", cat: "movement", q: "ゴルフや野球のスイングをイメージすると？", 
    a: "腰の回転が先で、腕がついてくる", b: "腕と体が一緒に動く感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_swim", cat: "movement", q: "泳ぎで得意（または得意そう）なのは？", 
    a: "クロール（左右交互の動き）", b: "平泳ぎ・バタフライ（左右対称）", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_squat", cat: "movement", q: "スクワットするとき、自然なのは？", 
    a: "まっすぐ上下に動く", b: "少し体をひねりながら", 
    weight: { cross: [0, 1], parallel: [1, 0] } },
  { id: "parallel_jump", cat: "movement", q: "その場でジャンプするとき、腕は？", 
    a: "両腕一緒に振り上げる", b: "左右バラバラに動くこともある", 
    weight: { cross: [0, 1], parallel: [1, 0] } },
  { id: "cross_dance", cat: "movement", q: "踊るとき、得意な動きは？", 
    a: "ツイスト、ひねりを使った動き", b: "ステップ、左右対称の動き", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_climb", cat: "movement", q: "はしごを登るイメージで近いのは？", 
    a: "手と足が対角線で交互に動く", b: "同じ側の手足が一緒に動きやすい", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  
  // --- サイクリング特化 ---
  { id: "cross_bike_stand", cat: "movement", q: "自転車でダンシングするとき、近いのは？", 
    a: "バイクを左右に振りながら体をひねる", b: "バイクをあまり振らず体幹で踏む", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "cross_pedal", cat: "movement", q: "ペダリングの感覚で近いのは？", 
    a: "腰のひねりを使って回す感じ", b: "上下にまっすぐ踏み込む感じ", 
    weight: { cross: [1, 0], parallel: [0, 1] } },
  { id: "parallel_cornering", cat: "movement", q: "コーナリングで自然なのは？", 
    a: "内側の肩を落として体をひねる", b: "バイクと一体になって傾く", 
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
  { min: 18, label: "高精度", stars: 4, color: C.accent },
  { min: 20, label: "完全解析", stars: 5, color: C.pink },
];

// タイプ定義（サイクリング用）
// ============================================
// 8タイプ構成（3軸独立）:
//   体幹: F (Front/前) / R (Rear/後)
//   荷重: I (Inner/内) / O (Outer/外)
//   連動: X (Cross/クロス) / II (Parallel/パラレル)
// 
// 内部キー → 表示名:
//   FIX  = F-I-X   前体幹 × 内側荷重 × クロス
//   FIII = F-I-II  前体幹 × 内側荷重 × パラレル
//   FOX  = F-O-X   前体幹 × 外側荷重 × クロス
//   FOII = F-O-II  前体幹 × 外側荷重 × パラレル
//   RIX  = R-I-X   後体幹 × 内側荷重 × クロス
//   RIII = R-I-II  後体幹 × 内側荷重 × パラレル
//   ROX  = R-O-X   後体幹 × 外側荷重 × クロス
//   ROII = R-O-II  後体幹 × 外側荷重 × パラレル
// ============================================
const TYPE_INFO_CYCLING = {
  FIX: {
    name: "F-I-X",
    sub: "前体幹 × 内側 × クロス",
    icon: "zap",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
    traits: ["捻りながら内側で踏む", "みぞおち主導で対角連動", "ダンシングでバイクを振る"],
    description: "身体を捻じりながら内側で踏み込むタイプ。瞬発力とキレのある加速が武器。",
    strengths: ["スプリント", "アタック", "ダンシング"],
    weaknesses: ["長時間の一定ペース"],
    radarData: [95, 50, 60, 55, 50],
    bodyMechanics: {
      trunk: { type: "Fタイプ（前体幹）", description: "みぞおち・股関節主導", detail: "身体を「折る」ように使うのが得意。" },
      movement: { 
        type: "クロス（対角連動）", 
        description: "捻じりの動きが自然", 
        detail: "右腕と左脚、左腕と右脚が連動する。",
        感覚: [
          "ペダリング中、踏み込みで腰が自然と回る",
          "ダンシングではバイクを左右に振る方が力が入る",
          "コーナーでは内側の肩を落として曲がる"
        ],
        荷重バランス: {
          ペダル: "母指球中心、内側で踏む",
          ハンドル: "下ハンで引きつける",
          サドル: "前寄りに座る"
        }
      },
      balance: { type: "内側荷重（Inner）", description: "母指球・内側で踏む", detail: "膝がまっすぐ〜やや内向き。" }
    },
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.875〜0.885", detail: "やや高めで股関節を使いやすく" },
        setback: { position: "前寄り（0〜-10mm）", detail: "前乗りセッティング" },
        tilt: { angle: "水平〜やや前下がり", detail: "骨盤前傾を促す" },
      },
      handlebar: {
        drop: { range: "大きめ（-40〜-60mm）", detail: "深い前傾" },
        reach: { range: "やや長め", detail: "前乗りに合わせる" },
        width: { guide: "肩幅〜やや狭め", detail: "エアロ効果" },
      },
      cleat: {
        position: { fore_aft: "深め（前寄り）", detail: "母指球より後ろ" },
        angle: { rotation: "浅め（つま先まっすぐ）", detail: "内股気味OK" },
        float: { degree: "少なめ（0〜4.5°）", detail: "ダイレクト感" },
        qFactor: { guide: "狭め（146〜150mm）", detail: "膝まっすぐ" },
      },
      crank: { length: { guide: "股下 × 0.20〜0.205", detail: "短めで高回転" } },
    },
    selfCheck: [
      { name: "股関節屈曲", method: "仰向けで膝を胸に", good: "120°以上", action: "深い前傾OK" },
    ],
    products: [
      { name: "Specialized Tarmac SL8", price: "550,000〜", reason: "高剛性。スプリント向き。", amazonQuery: "Specialized+Tarmac", rakutenQuery: "Specialized%20Tarmac", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "高回転型（90rpm+）", detail: "軽いギアで回す" },
      posture: { title: "ポジション", type: "前乗り", detail: "サドル前方" },
      armSwing: { title: "ダンシング", type: "積極的", detail: "バイクを振る" },
      cadence: { title: "ケイデンス", type: "85-100rpm", detail: "高回転維持" }
    },
    guide: {
      fiveK: { title: "ヒルクライム", tips: ["後半ビルドアップ", "ダンシング活用"], avoid: "序盤飛ばしすぎ" },
      training: { title: "トレーニング", tips: ["インターバル", "スプリント"], avoid: "LSDのみ" }
    }
  },
  
  FIII: {
    name: "F-I-II",
    sub: "前体幹 × 内側 × パラレル",
    icon: "activity",
    color: "#06b6d4",
    gradient: "linear-gradient(135deg, #06b6d4, #0891b2)",
    traits: ["安定して内側で踏む", "みぞおち主導で同側連動", "効率的なペダリング"],
    description: "前体幹を使いながら内側で安定して踏む。効率重視のスムーズな走り。",
    strengths: ["ペダリング効率", "平地巡航", "TTポジション"],
    weaknesses: ["急なダンシング", "テクニカルコース"],
    radarData: [60, 70, 95, 65, 75],
    bodyMechanics: {
      trunk: { type: "Fタイプ（前体幹）", description: "みぞおち・股関節主導", detail: "身体を「折る」ように使う。" },
      movement: { 
        type: "パラレル（同側連動）", 
        description: "平行の動きが自然", 
        detail: "上半身固定で脚を回す。",
        感覚: [
          "ペダリング中、腰は固定して脚だけ回す",
          "ダンシングではバイクをまっすぐ保つ",
          "コーナーではバイクと一体で傾く"
        ],
        荷重バランス: {
          ペダル: "母指球中心、まっすぐ踏む",
          ハンドル: "ブラケットで安定",
          サドル: "前寄り〜中央"
        }
      },
      balance: { type: "内側荷重（Inner）", description: "母指球・内側で踏む", detail: "膝がまっすぐ。" }
    },
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.875〜0.885", detail: "やや高め" },
        setback: { position: "前寄り〜中央（-5〜+5mm）", detail: "効率重視" },
        tilt: { angle: "水平", detail: "安定性重視" },
      },
      handlebar: {
        drop: { range: "中程度（-30〜-50mm）", detail: "効率と快適性" },
        reach: { range: "標準〜やや長め", detail: "前乗り気味" },
        width: { guide: "肩幅", detail: "自然な幅" },
      },
      cleat: {
        position: { fore_aft: "標準〜深め", detail: "母指球下" },
        angle: { rotation: "浅め", detail: "まっすぐ" },
        float: { degree: "標準（4.5°）", detail: "適度な自由度" },
        qFactor: { guide: "狭め（146〜150mm）", detail: "内側荷重に合わせる" },
      },
      crank: { length: { guide: "股下 × 0.20〜0.205", detail: "標準〜短め" } },
    },
    selfCheck: [
      { name: "片足ペダリング", method: "30秒スムーズに", good: "カクつかない", action: "効率型" },
    ],
    products: [
      { name: "Canyon Aeroad", price: "450,000〜", reason: "エアロ効率。TT向き。", amazonQuery: "Canyon+Aeroad", rakutenQuery: "Canyon%20Aeroad", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "効率型（85-95rpm）", detail: "円運動を意識" },
      posture: { title: "ポジション", type: "前乗り", detail: "エアロ姿勢" },
      armSwing: { title: "ダンシング", type: "控えめ", detail: "シッティング中心" },
      cadence: { title: "ケイデンス", type: "85-95rpm", detail: "一定リズム" }
    },
    guide: {
      fiveK: { title: "ヒルクライム", tips: ["シッティング中心", "一定ペース"], avoid: "無駄なダンシング" },
      training: { title: "トレーニング", tips: ["ペダリングドリル", "テンポ走"], avoid: "フォーム崩す追い込み" }
    }
  },
  
  FOX: {
    name: "F-O-X",
    sub: "前体幹 × 外側 × クロス",
    icon: "flame",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
    traits: ["捻りながら外側で踏む", "みぞおち主導で対角連動", "パワフルなダンシング"],
    description: "前体幹と外側荷重でパワーを出しながら、クロス連動でダイナミックに走る。",
    strengths: ["パワー系クライム", "アタック", "独走"],
    weaknesses: ["集団走行", "一定ペース維持"],
    radarData: [85, 75, 55, 70, 55],
    bodyMechanics: {
      trunk: { type: "Fタイプ（前体幹）", description: "みぞおち・股関節主導", detail: "身体を「折る」ように使う。" },
      movement: { 
        type: "クロス（対角連動）", 
        description: "捻じりの動きが自然", 
        detail: "対角で連動、ダイナミック。",
        感覚: [
          "ペダリング中、腰が左右に動く",
          "ダンシングでバイクを大きく振る",
          "コーナーで肩を入れる"
        ],
        荷重バランス: {
          ペダル: "足裏全体〜外側",
          ハンドル: "下ハンで引く",
          サドル: "前寄り"
        }
      },
      balance: { type: "外側荷重（Outer）", description: "足裏全体・外側", detail: "膝やや外向き。" }
    },
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.870〜0.880", detail: "標準〜やや低め" },
        setback: { position: "前寄り〜中央（-5〜+5mm）", detail: "パワー重視" },
        tilt: { angle: "水平", detail: "安定性" },
      },
      handlebar: {
        drop: { range: "中〜大（-35〜-55mm）", detail: "攻撃的ポジション" },
        reach: { range: "やや長め", detail: "前乗り" },
        width: { guide: "肩幅〜やや広め", detail: "パワー伝達" },
      },
      cleat: {
        position: { fore_aft: "標準〜深め", detail: "パワー重視" },
        angle: { rotation: "深め（外向き）", detail: "ガニ股OK" },
        float: { degree: "多め（6°）", detail: "膝の自由度" },
        qFactor: { guide: "広め（150〜156mm）", detail: "外側荷重に対応" },
      },
      crank: { length: { guide: "股下 × 0.205〜0.21", detail: "標準〜やや長め" } },
    },
    selfCheck: [
      { name: "ダンシングテスト", method: "1分全力", good: "バイク振れる", action: "クロス型確定" },
    ],
    products: [
      { name: "Pinarello Dogma F", price: "800,000〜", reason: "剛性とエアロ。アタック向き。", amazonQuery: "Pinarello+Dogma", rakutenQuery: "Pinarello%20Dogma", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "トルク型（75-90rpm）", detail: "力強く踏む" },
      posture: { title: "ポジション", type: "前乗り", detail: "攻撃的姿勢" },
      armSwing: { title: "ダンシング", type: "積極的", detail: "大きく振る" },
      cadence: { title: "ケイデンス", type: "75-90rpm", detail: "トルク重視" }
    },
    guide: {
      fiveK: { title: "ヒルクライム", tips: ["ダンシングでアタック", "独走で逃げる"], avoid: "集団待機" },
      training: { title: "トレーニング", tips: ["SFR", "坂道ダンシング"], avoid: "軽すぎるギア" }
    }
  },
  
  FOII: {
    name: "F-O-II",
    sub: "前体幹 × 外側 × パラレル",
    icon: "mountain",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981, #059669)",
    traits: ["安定して外側で踏む", "みぞおち主導で同側連動", "粘り強いクライム"],
    description: "前体幹を使いながら外側で安定。パラレル連動で効率よく登る。",
    strengths: ["ヒルクライム", "ロングライド", "一定ペース"],
    weaknesses: ["スプリント", "急加速"],
    radarData: [50, 95, 70, 65, 85],
    bodyMechanics: {
      trunk: { type: "Fタイプ（前体幹）", description: "みぞおち・股関節主導", detail: "身体を「折る」ように使う。" },
      movement: { 
        type: "パラレル（同側連動）", 
        description: "平行の動きが自然", 
        detail: "腰を固定して脚を回す。",
        感覚: [
          "ペダリング中、腰は固定",
          "ダンシングではバイクをまっすぐ",
          "コーナーでバイクと一体で傾く"
        ],
        荷重バランス: {
          ペダル: "足裏全体で安定",
          ハンドル: "ブラケットで押す",
          サドル: "前寄り〜中央"
        }
      },
      balance: { type: "外側荷重（Outer）", description: "足裏全体・外側", detail: "膝やや外向き。" }
    },
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.870〜0.880", detail: "標準" },
        setback: { position: "前寄り〜中央（-5〜+10mm）", detail: "前乗り寄り" },
        tilt: { angle: "水平", detail: "安定性" },
      },
      handlebar: {
        drop: { range: "中程度（-25〜-45mm）", detail: "バランス" },
        reach: { range: "標準", detail: "自然なポジション" },
        width: { guide: "肩幅〜やや広め", detail: "安定感" },
      },
      cleat: {
        position: { fore_aft: "標準", detail: "バランス" },
        angle: { rotation: "深め（外向き）", detail: "ガニ股OK" },
        float: { degree: "多め（6°）", detail: "長時間の快適性" },
        qFactor: { guide: "広め（150〜156mm）", detail: "外側荷重に対応" },
      },
      crank: { length: { guide: "股下 × 0.205〜0.215", detail: "標準〜長め" } },
    },
    selfCheck: [
      { name: "片足ペダリング", method: "30秒", good: "スムーズ", action: "効率型" },
    ],
    products: [
      { name: "Trek Émonda SLR", price: "650,000〜", reason: "軽量。ヒルクライム向き。", amazonQuery: "Trek+Emonda", rakutenQuery: "Trek%20Emonda", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "効率型（80-90rpm）", detail: "安定して回す" },
      posture: { title: "ポジション", type: "前乗り〜中央", detail: "効率重視" },
      armSwing: { title: "ダンシング", type: "控えめ", detail: "シッティング中心" },
      cadence: { title: "ケイデンス", type: "80-90rpm", detail: "安定リズム" }
    },
    guide: {
      fiveK: { title: "ヒルクライム", tips: ["自分のペース維持", "シッティング中心"], avoid: "周りに惑わされない" },
      training: { title: "トレーニング", tips: ["テンポ走", "ロングライド"], avoid: "スピード練も忘れず" }
    }
  },
  
  RIX: {
    name: "R-I-X",
    sub: "後体幹 × 内側 × クロス",
    icon: "shuffle",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    traits: ["捻りながら内側で踏む", "肩甲骨・腰主導で対角連動", "リズミカルな走り"],
    description: "後体幹で身体を一体に使いながら、クロス連動でリズムよく走る。",
    strengths: ["リズム感", "テクニカルコース", "変化への対応"],
    weaknesses: ["単調な平地", "TTポジション"],
    radarData: [70, 60, 70, 85, 70],
    bodyMechanics: {
      trunk: { type: "Rタイプ（後体幹）", description: "首・肩甲骨・腰主導", detail: "身体を「一体」で使う。" },
      movement: { 
        type: "クロス（対角連動）", 
        description: "捻じりの動きが自然", 
        detail: "対角線の連動が得意。",
        感覚: [
          "ペダリング中、自然と腰が動く",
          "ダンシングでバイクを振る",
          "歩くとき腕振りが大きい"
        ],
        荷重バランス: {
          ペダル: "母指球中心",
          ハンドル: "下ハンも使える",
          サドル: "中央〜後ろ"
        }
      },
      balance: { type: "内側荷重（Inner）", description: "母指球・内側", detail: "膝まっすぐ。" }
    },
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.870〜0.880", detail: "標準" },
        setback: { position: "中央（0〜+10mm）", detail: "バランス重視" },
        tilt: { angle: "水平", detail: "安定性" },
      },
      handlebar: {
        drop: { range: "中程度（-25〜-45mm）", detail: "バランス" },
        reach: { range: "標準", detail: "自然な位置" },
        width: { guide: "肩幅", detail: "自然な幅" },
      },
      cleat: {
        position: { fore_aft: "標準", detail: "母指球下" },
        angle: { rotation: "浅め", detail: "まっすぐ" },
        float: { degree: "標準（4.5°）", detail: "適度な自由度" },
        qFactor: { guide: "狭め（146〜150mm）", detail: "内側荷重" },
      },
      crank: { length: { guide: "股下 × 0.205", detail: "標準" } },
    },
    selfCheck: [
      { name: "腰回旋", method: "座って左右に捻る", good: "スムーズ", action: "クロス型" },
    ],
    products: [
      { name: "Cervélo R5", price: "550,000〜", reason: "バランス型。オールラウンド。", amazonQuery: "Cervelo+R5", rakutenQuery: "Cervelo%20R5", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "リズム型（80-95rpm）", detail: "リズムよく回す" },
      posture: { title: "ポジション", type: "ニュートラル", detail: "状況に応じて" },
      armSwing: { title: "ダンシング", type: "適度に", detail: "リズムに合わせて" },
      cadence: { title: "ケイデンス", type: "80-95rpm", detail: "リズム重視" }
    },
    guide: {
      fiveK: { title: "ヒルクライム", tips: ["リズムを崩さない", "ダンシング活用"], avoid: "単調になりすぎ" },
      training: { title: "トレーニング", tips: ["変化のあるコース", "テンポ走"], avoid: "同じ練習ばかり" }
    }
  },
  
  RIII: {
    name: "R-I-II",
    sub: "後体幹 × 内側 × パラレル",
    icon: "wave",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
    traits: ["安定して内側で踏む", "肩甲骨・腰主導で同側連動", "効率的で滑らか"],
    description: "身体全体を一体で使い、流れるように前へ進む。効率的。",
    strengths: ["ペダリング効率", "平地巡航", "集団走行"],
    weaknesses: ["ダンシング", "急な地形変化"],
    radarData: [55, 70, 95, 75, 70],
    bodyMechanics: {
      trunk: { type: "Rタイプ（後体幹）", description: "首・肩甲骨・腰主導", detail: "身体を「一体」で使う。" },
      movement: { 
        type: "パラレル（同側連動）", 
        description: "平行の動きが自然", 
        detail: "捻じらず安定。",
        感覚: [
          "ペダリング中、上半身固定",
          "ダンシングではバイク立てたまま",
          "腕振り控えめ"
        ],
        荷重バランス: {
          ペダル: "母指球中心、まっすぐ",
          ハンドル: "ブラケットに添える",
          サドル: "中央にどっしり"
        }
      },
      balance: { type: "内側荷重（Inner）", description: "母指球・内側", detail: "膝まっすぐ。" }
    },
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.875〜0.885", detail: "やや高めで効率" },
        setback: { position: "ニュートラル（0mm前後）", detail: "膝がペダル軸真上" },
        tilt: { angle: "完全水平", detail: "骨盤安定" },
      },
      handlebar: {
        drop: { range: "中程度（-30〜-50mm）", detail: "効率と快適性" },
        reach: { range: "標準", detail: "自然な肘曲がり" },
        width: { guide: "肩幅", detail: "自然な姿勢" },
      },
      cleat: {
        position: { fore_aft: "標準", detail: "バランス" },
        angle: { rotation: "浅め", detail: "まっすぐ" },
        float: { degree: "標準（4.5°）", detail: "適度" },
        qFactor: { guide: "狭め（146〜150mm）", detail: "内側荷重" },
      },
      crank: { length: { guide: "股下 × 0.205", detail: "標準で効率" } },
    },
    selfCheck: [
      { name: "片足立ち", method: "30秒", good: "ほぼ動かない", action: "体幹安定" },
      { name: "スムーズペダリング", method: "片足30秒", good: "カクつかない", action: "効率型" },
    ],
    products: [
      { name: "Canyon Ultimate CF SLX", price: "450,000〜", reason: "コスパ最強オールラウンダー。", amazonQuery: "Canyon+Ultimate", rakutenQuery: "Canyon%20Ultimate", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "高効率型（85-95rpm）", detail: "綺麗な円運動" },
      posture: { title: "ポジション", type: "ニュートラル", detail: "効率重視" },
      armSwing: { title: "ダンシング", type: "あまり使わない", detail: "シッティング中心" },
      cadence: { title: "ケイデンス", type: "90rpm前後", detail: "一定リズム" }
    },
    guide: {
      fiveK: { title: "ヒルクライム", tips: ["一定ペース", "シッティング"], avoid: "無駄なダンシング" },
      training: { title: "トレーニング", tips: ["テンポ走", "ペダリングドリル"], avoid: "フォーム崩す追い込み" }
    }
  },
  
  ROX: {
    name: "R-O-X",
    sub: "後体幹 × 外側 × クロス",
    icon: "crosshair",
    color: "#ec4899",
    gradient: "linear-gradient(135deg, #ec4899, #db2777)",
    traits: ["捻りながら外側で踏む", "肩甲骨・腰主導で対角連動", "適応力が高い"],
    description: "身体全体を使いながらクロス連動。あらゆる状況に対応できる。",
    strengths: ["適応力", "安定感", "レース全般"],
    weaknesses: ["突出した武器がない（逆に強み）"],
    radarData: [70, 75, 75, 95, 80],
    bodyMechanics: {
      trunk: { type: "Rタイプ（後体幹）", description: "首・肩甲骨・腰主導", detail: "身体を「一体」で使う。" },
      movement: { 
        type: "クロス（対角連動）", 
        description: "捻じりの動きが自然", 
        detail: "対角線の動きが得意。",
        感覚: [
          "ペダリング中、腰が左右に動く",
          "ダンシングでバイクを振る",
          "歩くとき腕脚が対角で連動"
        ],
        荷重バランス: {
          ペダル: "足裏外側も使う",
          ハンドル: "下ハンで引く",
          サドル: "後方、左右に動く"
        }
      },
      balance: { type: "外側荷重（Outer）", description: "足裏全体・外側", detail: "膝やや外向き。" }
    },
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.865〜0.875", detail: "やや低めで安定" },
        setback: { position: "やや後ろ（+5〜+15mm）", detail: "安定した踏み込み" },
        tilt: { angle: "水平〜やや後ろ上がり", detail: "長時間快適" },
      },
      handlebar: {
        drop: { range: "控えめ（-10〜-30mm）", detail: "アップライト" },
        reach: { range: "やや短め", detail: "リラックス" },
        width: { guide: "肩幅〜やや広め", detail: "安定とコントロール" },
      },
      cleat: {
        position: { fore_aft: "やや浅め", detail: "安定" },
        angle: { rotation: "深め（外向き）", detail: "外側荷重" },
        float: { degree: "多め（6°）", detail: "膝保護と腰の回旋" },
        qFactor: { guide: "広め（150〜156mm）", detail: "外側荷重とクロス" },
      },
      crank: { length: { guide: "股下 × 0.205〜0.21", detail: "標準〜やや長め" } },
    },
    selfCheck: [
      { name: "スクワット", method: "ゆっくり10回", good: "膝がつま先方向", action: "安定型" },
    ],
    products: [
      { name: "Pinarello Dogma F", price: "800,000〜", reason: "あらゆる状況対応。", amazonQuery: "Pinarello+Dogma", rakutenQuery: "Pinarello%20Dogma", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "適応型（75-90rpm）", detail: "状況に応じて" },
      posture: { title: "ポジション", type: "やや後ろ乗り", detail: "安定重視" },
      armSwing: { title: "ダンシング", type: "適度に", detail: "バイクを振る" },
      cadence: { title: "ケイデンス", type: "75-90rpm", detail: "適応的" }
    },
    guide: {
      fiveK: { title: "ヒルクライム", tips: ["ペース配分", "ダンシング活用"], avoid: "得意に頼りすぎ" },
      training: { title: "トレーニング", tips: ["様々なメニュー", "弱点克服"], avoid: "得意ばかり" }
    }
  },
  
  ROII: {
    name: "R-O-II",
    sub: "後体幹 × 外側 × パラレル",
    icon: "anchor",
    color: "#64748b",
    gradient: "linear-gradient(135deg, #64748b, #475569)",
    traits: ["安定して外側で踏む", "肩甲骨・腰主導で同側連動", "どっしり安定"],
    description: "後体幹と外側荷重でどっしり安定。パラレル連動で効率よく走る。",
    strengths: ["安定感", "ロングライド", "悪条件"],
    weaknesses: ["瞬発力", "急なペース変化"],
    radarData: [45, 85, 80, 80, 95],
    bodyMechanics: {
      trunk: { type: "Rタイプ（後体幹）", description: "首・肩甲骨・腰主導", detail: "身体を「一体」で使う。" },
      movement: { 
        type: "パラレル（同側連動）", 
        description: "平行の動きが自然", 
        detail: "捻じらず安定。",
        感覚: [
          "ペダリング中、上半身固定",
          "ダンシングはバイクまっすぐ",
          "腕振り控えめ"
        ],
        荷重バランス: {
          ペダル: "足裏全体でどっしり",
          ハンドル: "ブラケットで安定",
          サドル: "後方にどっしり"
        }
      },
      balance: { type: "外側荷重（Outer）", description: "足裏全体・外側", detail: "膝やや外向き。" }
    },
    fitting: {
      saddle: {
        height: { formula: "股下 × 0.860〜0.870", detail: "低めで安定" },
        setback: { position: "後ろ寄り（+10〜+20mm）", detail: "どっしり" },
        tilt: { angle: "やや後ろ上がり", detail: "快適性" },
      },
      handlebar: {
        drop: { range: "控えめ（-5〜-25mm）", detail: "アップライト" },
        reach: { range: "短め", detail: "快適性重視" },
        width: { guide: "肩幅〜やや広め", detail: "安定" },
      },
      cleat: {
        position: { fore_aft: "浅め", detail: "安定重視" },
        angle: { rotation: "深め（外向き）", detail: "ガニ股OK" },
        float: { degree: "多め（6°）", detail: "快適性" },
        qFactor: { guide: "広め（150〜156mm）", detail: "外側荷重" },
      },
      crank: { length: { guide: "股下 × 0.205〜0.215", detail: "やや長め" } },
    },
    selfCheck: [
      { name: "長時間立ち", method: "5分", good: "楽に立てる", action: "安定型" },
    ],
    products: [
      { name: "Trek Domane", price: "400,000〜", reason: "快適性重視。ロングライド向き。", amazonQuery: "Trek+Domane", rakutenQuery: "Trek%20Domane", image: "" },
    ],
    form: {
      landing: { title: "ペダリング", type: "安定型（70-85rpm）", detail: "どっしり踏む" },
      posture: { title: "ポジション", type: "後ろ乗り", detail: "安定重視" },
      armSwing: { title: "ダンシング", type: "控えめ", detail: "シッティング中心" },
      cadence: { title: "ケイデンス", type: "70-85rpm", detail: "低め安定" }
    },
    guide: {
      fiveK: { title: "ヒルクライム", tips: ["マイペース", "シッティング"], avoid: "無理なアタック" },
      training: { title: "トレーニング", tips: ["ロングライド", "耐久走"], avoid: "短時間高強度のみ" }
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
  const [extraQuestionPool, setExtraQuestionPool] = useState([]); // 僅差時の追加質問用
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
  
  // ============================================
  // 質問出題設定
  // - コア質問は必ず出題（判定に重要な質問）
  // - それ以外からランダムに追加 = 約25問で判定
  // - 僅差時のみ該当カテゴリから追加2問
  // ============================================
  const RANDOM_PER_CATEGORY = 1;  // コア以外からランダム追加する数
  const EXTRA_ON_TIE = 2;         // 僅差時に追加する問数
  
  // コア質問ID（必ず出題する質問）
  const CORE_QUESTIONS = {
    trunk: ["lift_heavy", "power_source", "push_wall"],  // 体幹判定
    balance: ["leg_shape", "action_squat_now", "shoe_wear", "action_one_leg"],  // 荷重判定（客観+体験型）
    movement: ["cross_walk", "cross_throw", "parallel_swim"],  // 連動判定
    cadence: ["pedal_pace", "ride_style"],  // ケイデンス
    posture: ["desk_posture", "breath_feel"],  // 姿勢
    mental_agg: ["game_style", "risk_take"],  // メンタル攻撃性
    mental_team: ["travel_style", "work_focus"],  // チーム性
  };
  
  // 初期化：コア質問 + ランダム追加
  useEffect(() => {
    // カテゴリごとにグループ化
    const byCategory = {};
    QUESTION_POOL.forEach(q => {
      if (!byCategory[q.cat]) byCategory[q.cat] = [];
      byCategory[q.cat].push(q);
    });
    
    const selected = [];
    const extra = [];
    
    Object.keys(byCategory).forEach(cat => {
      const coreIds = CORE_QUESTIONS[cat] || [];
      const catQuestions = byCategory[cat];
      
      // コア質問を選択
      const coreQuestions = catQuestions.filter(q => coreIds.includes(q.id));
      selected.push(...coreQuestions);
      
      // 残りをシャッフルしてランダム追加
      const nonCore = catQuestions.filter(q => !coreIds.includes(q.id));
      const shuffled = nonCore.sort(() => Math.random() - 0.5);
      selected.push(...shuffled.slice(0, RANDOM_PER_CATEGORY));
      extra.push(...shuffled.slice(RANDOM_PER_CATEGORY));
    });
    
    // 選択した質問をシャッフルしてセット
    setQuestions(selected.sort(() => Math.random() - 0.5));
    setExtraQuestionPool(extra);
    
    // 旧タイプキー → 新タイプキーのマッピング（互換性のため）
    const migrateTypeKey = (oldKey) => {
      const mapping = {
        "A1": "FIX",   // 旧: 前体幹×内側 → 新: クロスをデフォルト
        "A2": "FOII",  // 旧: 前体幹×外側 → 新: パラレルをデフォルト
        "B1": "RIII",  // 旧: 後体幹×内側 → 新: パラレルをデフォルト
        "B2": "ROX",   // 旧: 後体幹×外側 → 新: クロスをデフォルト
      };
      return mapping[oldKey] || oldKey;
    };
    
    // LocalStorageから保存された結果を読み込み
    try {
      const saved = localStorage.getItem("stancecore_result");
      if (saved) {
        const parsed = JSON.parse(saved);
        // 旧キーの場合はマイグレーション
        if (parsed.type && ["A1", "A2", "B1", "B2"].includes(parsed.type)) {
          parsed.type = migrateTypeKey(parsed.type);
          // 更新したデータを保存し直す
          localStorage.setItem("stancecore_result", JSON.stringify(parsed));
        }
        setSavedResult(parsed);
      }
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
  
  // ステージアップチェック（約20問で完了想定）
  const STAGE_THRESHOLDS = [
    { min: 5, level: 1, label: "基本解析", message: "基本解析モード突入" },
    { min: 10, level: 2, label: "標準解析", message: "標準解析モードへ" },
    { min: 15, level: 3, label: "高精度", message: "高精度モードへ" },
    { min: 18, level: 4, label: "完全解析", message: "完全解析達成" },
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
      // newSkippedを使って次の質問を探す
      const unanswered = questions.filter(qu => !answers[qu.id] && !newSkipped.has(qu.id));
      if (unanswered.length > 0) {
        const nextIndex = questions.findIndex(qu => qu.id === unanswered[0].id);
        if (nextIndex >= 0) setCurrentIndex(nextIndex);
      }
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
    
    // 3軸それぞれの僅差チェック
    const frDiff = Math.abs(currentScores.typeA - currentScores.typeB);
    const ioDiff = Math.abs(currentScores.num1 - currentScores.num2);
    const xpDiff = Math.abs(currentScores.cross - currentScores.parallel);
    const frClose = frDiff <= 2;
    const ioClose = ioDiff <= 2;
    const xpClose = xpDiff <= 2;
    
    // 質問が残っていない＆僅差 → 追加質問を投入
    if (unanswered.length === 0 && (frClose || ioClose || xpClose) && extraQuestionPool.length > 0) {
      const extraToAdd = [];
      
      if (frClose) {
        // 体幹(F/R)が僅差 → trunkカテゴリから追加
        const trunkExtras = extraQuestionPool.filter(q => q.cat === "trunk" && !currentAnswers[q.id]);
        extraToAdd.push(...trunkExtras.slice(0, EXTRA_ON_TIE));
      }
      
      if (ioClose) {
        // 荷重(I/O)が僅差 → balanceカテゴリから追加
        const balanceExtras = extraQuestionPool.filter(q => q.cat === "balance" && !currentAnswers[q.id]);
        extraToAdd.push(...balanceExtras.slice(0, EXTRA_ON_TIE));
      }
      
      if (xpClose) {
        // 連動(X/II)が僅差 → movementカテゴリから追加
        const movementExtras = extraQuestionPool.filter(q => q.cat === "movement" && !currentAnswers[q.id]);
        extraToAdd.push(...movementExtras.slice(0, EXTRA_ON_TIE));
      }
      
      if (extraToAdd.length > 0) {
        // 追加質問を現在の質問リストに追加
        const newQuestions = [...questions, ...extraToAdd];
        setQuestions(newQuestions);
        setExtraQuestionPool(prev => prev.filter(q => !extraToAdd.find(e => e.id === q.id)));
        // 追加した最初の質問のインデックスへ移動
        setCurrentIndex(questions.length);
        return;
      }
    }
    
    if (unanswered.length === 0) return;
    
    // 優先すべきカテゴリを決定（僅差の軸から優先）
    let priorityCat = null;
    if (frClose) priorityCat = "trunk";
    else if (ioClose) priorityCat = "balance";
    else if (xpClose) priorityCat = "movement";
    
    // 優先カテゴリの質問を探す
    let nextQuestion = null;
    if (priorityCat) {
      nextQuestion = unanswered.find(q => q.cat === priorityCat);
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
    // 3軸それぞれ独立判定
    const isF = scores.typeA >= scores.typeB;  // F(前) or R(後)
    const isI = scores.num1 >= scores.num2;    // I(内) or O(外)
    const isX = scores.cross >= scores.parallel; // X(クロス) or II(パラレル)
    
    // 僅差判定
    const frDiff = Math.abs(scores.typeA - scores.typeB);
    const ioDiff = Math.abs(scores.num1 - scores.num2);
    const xpDiff = Math.abs(scores.cross - scores.parallel);
    
    // 8タイプ判定
    let type;
    if (isF && isI && isX) type = "FIX";
    else if (isF && isI && !isX) type = "FIII";
    else if (isF && !isI && isX) type = "FOX";
    else if (isF && !isI && !isX) type = "FOII";
    else if (!isF && isI && isX) type = "RIX";
    else if (!isF && isI && !isX) type = "RIII";
    else if (!isF && !isI && isX) type = "ROX";
    else type = "ROII";
    
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
      // 僅差フラグ（3軸それぞれ）
      isClose: {
        fr: frDiff <= 2,
        io: ioDiff <= 2,
        xp: xpDiff <= 2,
        any: frDiff <= 2 || ioDiff <= 2 || xpDiff <= 2,
      },
      scoreDiff: {
        fr: frDiff,
        io: ioDiff,
        xp: xpDiff,
      }
    };
    
    setResult(resultData);
    
    // LocalStorageに保存
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
                {Object.entries(answers).map(([qId, ans]) => {
                  const q = QUESTION_POOL.find(qu => qu.id === qId);
                  if (!q) return null;
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
                          {q.q}
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
            
            {/* 3軸表示 */}
            {(() => {
              const isF = type.startsWith("F");
              const isInner = ["FIX", "FIII", "RIX", "RIII"].includes(type);
              const isCross = type.endsWith("X");
              return (
            <div style={{ 
              display: "flex", 
              justifyContent: "center", 
              gap: 8, 
              marginBottom: 16,
              flexWrap: "wrap"
            }}>
              {/* 体幹 */}
              <div style={{ 
                background: isF ? `${C.orange}15` : `${C.purple}15`,
                border: `1px solid ${isF ? C.orange : C.purple}30`,
                borderRadius: 8, 
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                <span style={{ color: C.textMuted, fontSize: 11, fontWeight: 600 }}>体幹</span>
                <span style={{ 
                  color: isF ? C.orange : C.purple, 
                  fontSize: 13, 
                  fontWeight: 700 
                }}>
                  {isF ? "Front" : "Rear"}
                </span>
              </div>
              
              {/* 荷重 */}
              <div style={{ 
                background: isInner ? `${C.cyan}15` : `${C.green}15`,
                border: `1px solid ${isInner ? C.cyan : C.green}30`,
                borderRadius: 8, 
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                <span style={{ color: C.textMuted, fontSize: 11, fontWeight: 600 }}>荷重</span>
                <span style={{ 
                  color: isInner ? C.cyan : C.green, 
                  fontSize: 13, 
                  fontWeight: 700 
                }}>
                  {isInner ? "Inner" : "Outer"}
                </span>
              </div>
              
              {/* 連動 */}
              <div style={{ 
                background: isCross ? `${C.pink}15` : `${"#3B82F6"}15`,
                border: `1px solid ${isCross ? C.pink : "#3B82F6"}30`,
                borderRadius: 8, 
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                <span style={{ color: C.textMuted, fontSize: 11, fontWeight: 600 }}>連動</span>
                <span style={{ 
                  color: isCross ? C.pink : "#3B82F6", 
                  fontSize: 13, 
                  fontWeight: 700 
                }}>
                  {isCross ? "Cross" : "Parallel"}
                </span>
              </div>
            </div>
              );
            })()}
            
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
                  {(type === "FIX" || type === "FOX") && "「もっと腰を安定させて」「後ろ体重で粘って」と言われても、なんかしっくりこなかった"}
                  {(type === "FIII" || type === "FOII") && "「腰をもっと回して」「捻りを使え」と言われても、動きがギクシャクした"}
                  {(type === "RIX" || type === "ROX") && "「前傾でアグレッシブに」「軽やかに」と言われても、バランスを崩しやすかった"}
                  {(type === "RIII" || type === "ROII") && "「もっとダイナミックに」「捻りを使え」と言われても、動きがぎこちなかった"}
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
                  {type === "FIX" && "あなたは「捻りながら内側で踏む」のが自然。対角連動で加速するタイプ。"}
                  {type === "FIII" && "あなたは「安定して内側で踏む」のが自然。効率的なペダリングが武器。"}
                  {type === "FOX" && "あなたは「捻りながら外側で踏む」のが自然。パワフルなダンシングが得意。"}
                  {type === "FOII" && "あなたは「安定して外側で踏む」のが自然。粘り強いクライムが持ち味。"}
                  {type === "RIX" && "あなたは「後体幹でクロス連動」が自然。リズミカルな走りが武器。"}
                  {type === "RIII" && "あなたは「後体幹で安定」が自然。効率的でスムーズな走りが得意。"}
                  {type === "ROX" && "あなたは「後体幹でクロス連動」が自然。あらゆる状況に適応できる。"}
                  {type === "ROII" && "あなたは「後体幹で安定」が自然。どっしりした安定感が持ち味。"}
                </p>
              </div>
              
              {/* 今後のヒント */}
              <div style={{ 
                background: theme.bg, 
                borderRadius: 16, 
                padding: 16,
              }}>
                <p style={{ color: C.textMuted, fontSize: 13, fontWeight: 700, margin: "0 0 10px" }}>
                  これからのアドバイス
                </p>
                <p style={{ color: C.text, fontSize: 14, margin: 0, lineHeight: 1.7 }}>
                  {type === "FIX" && "「高回転で」「瞬発力で勝負」「ダンシングでバイクを振る」を意識して。"}
                  {type === "FIII" && "「滑らかに」「一定ペースで」「効率重視」を意識すると力が出せます。"}
                  {type === "FOX" && "「ダンシングでアタック」「独走で逃げる」「パワー勝負」が合うはず。"}
                  {type === "FOII" && "「じっくり粘れ」「重いギアでグイグイ」「マイペース」が合うはず。"}
                  {type === "RIX" && "「リズムを大切に」「変化に対応」「ダンシングも活用」がおすすめ。"}
                  {type === "RIII" && "「滑らかに」「一定ペースで」「効率重視」を意識すると本来の力が出せます。"}
                  {type === "ROX" && "「適応力を活かして」「状況判断」「バランスよく」がおすすめ。"}
                  {type === "ROII" && "「安定感を活かして」「マイペース」「ロングで力を発揮」がおすすめ。"}
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
                
                {/* 体感できる特性 */}
                {typeInfo.bodyMechanics.movement.感覚 && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.cardBorder}` }}>
                    <p style={{ color: C.textDim, fontSize: 10, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      こんな感覚に心当たりは？
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {typeInfo.bodyMechanics.movement.感覚.map((s, i) => (
                        <p key={i} style={{ color: C.text, fontSize: 12, margin: 0, lineHeight: 1.6, paddingLeft: 12, borderLeft: `2px solid ${typeInfo.color}30` }}>
                          {s}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* 荷重バランス */}
                {typeInfo.bodyMechanics.movement.荷重バランス && (
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${theme.cardBorder}` }}>
                    <p style={{ color: C.textDim, fontSize: 10, fontWeight: 600, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                      荷重バランスの傾向
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {Object.entries(typeInfo.bodyMechanics.movement.荷重バランス).map(([key, val]) => (
                        <div key={key} style={{ display: "flex", gap: 8 }}>
                          <span style={{ color: typeInfo.color, fontSize: 11, fontWeight: 600, minWidth: 60 }}>{key}</span>
                          <span style={{ color: C.textMuted, fontSize: 12 }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* 荷重タイプ */}
              <div style={{ background: theme.bg, borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                  <p style={{ color: C.textDim, fontSize: 11, fontWeight: 600, margin: 0, textTransform: "uppercase" }}>荷重タイプ</p>
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
                {type === "FIX" && "高剛性・前乗り・ダイレクト感重視"}
                {type === "FIII" && "効率・前乗り・エアロ重視"}
                {type === "FOX" && "高剛性・パワー・攻撃的ポジション"}
                {type === "FOII" && "軽量・後ろ乗り・ヒルクライム向け"}
                {type === "RIX" && "バランス・適応力・リズム重視"}
                {type === "RIII" && "バランス・効率重視・オールラウンド"}
                {type === "ROX" && "適応力・安定感・レース全般"}
                {type === "ROII" && "快適性・安定感・ロングライド向け"}
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
              // 8タイプ → 旧4タイプへのマッピング（機材DBは旧キーのまま）
              // 8タイプ → 旧4タイプへのマッピング
              // 前後乗りは体幹(F/R)で決まる: F=前乗り(A1), R=後乗り(B2)
              // 荷重(I/O)で剛性・スタイルを分ける
              const typeToLegacy = {
                "FIX": ["A1"],           // 前乗り・高剛性
                "FIII": ["A1"],          // 前乗り・効率型
                "FOX": ["A1"],           // 前乗り・パワー型
                "FOII": ["A1", "A2"],    // 前乗り〜中間
                "RIX": ["B1", "B2"],     // 後乗り・バランス
                "RIII": ["B1"],          // 後乗り・効率型
                "ROX": ["B2"],           // 後乗り・適応型
                "ROII": ["B2"],          // 後乗り・安定型
              };
              const legacyTypes = typeToLegacy[type] || [];
              
              const filtered = CYCLING_GEAR_DB.filter(gear => {
                // タイプ条件（旧キーでマッチング）
                if (!legacyTypes.some(lt => gear.type.includes(lt))) return false;
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
                
                // 8タイプ別の推奨傾向
                const advice = {
                  FIX: { 
                    saddle: "高め", saddleAdj: "+5〜15mm", 
                    drop: "深め", dropRange: "-40〜-60mm",
                    setback: "前寄り", setbackAdj: "-5〜10mm前へ",
                    crank: "短め", crankAdj: "165〜170mm推奨",
                  },
                  FIII: { 
                    saddle: "高め", saddleAdj: "+5〜10mm", 
                    drop: "中〜深め", dropRange: "-30〜-50mm",
                    setback: "前寄り〜中央", setbackAdj: "-5〜+5mm",
                    crank: "短め", crankAdj: "165〜170mm推奨",
                  },
                  FOX: { 
                    saddle: "標準", saddleAdj: "±5mm", 
                    drop: "中〜深め", dropRange: "-35〜-55mm",
                    setback: "前寄り〜中央", setbackAdj: "-5〜+5mm",
                    crank: "標準", crankAdj: "170〜172.5mm推奨",
                  },
                  FOII: { 
                    saddle: "標準", saddleAdj: "±5mm", 
                    drop: "中程度", dropRange: "-25〜-45mm",
                    setback: "前寄り〜中央", setbackAdj: "-5〜+10mm",
                    crank: "標準〜長め", crankAdj: "170〜175mm推奨",
                  },
                  RIX: { 
                    saddle: "標準", saddleAdj: "±5mm", 
                    drop: "中程度", dropRange: "-25〜-45mm",
                    setback: "中央", setbackAdj: "0〜+10mm",
                    crank: "標準", crankAdj: "170mm推奨",
                  },
                  RIII: { 
                    saddle: "高め", saddleAdj: "+5〜10mm", 
                    drop: "中程度", dropRange: "-30〜-50mm",
                    setback: "ニュートラル", setbackAdj: "±5mm",
                    crank: "標準", crankAdj: "170mm推奨",
                  },
                  ROX: { 
                    saddle: "低め", saddleAdj: "-5〜10mm", 
                    drop: "控えめ", dropRange: "-10〜-30mm",
                    setback: "やや後ろ", setbackAdj: "+5〜15mm後ろへ",
                    crank: "標準〜長め", crankAdj: "170〜172.5mm推奨",
                  },
                  ROII: { 
                    saddle: "低め", saddleAdj: "-5〜15mm", 
                    drop: "控えめ", dropRange: "-5〜-25mm",
                    setback: "後ろ寄り", setbackAdj: "+10〜20mm後ろへ",
                    crank: "長め", crankAdj: "172.5〜175mm推奨",
                  },
                };
                const adv = advice[type];
                
                // 落差の判定
                const dropRanges = {
                  FIX:  { min: -60, max: -40 },
                  FIII: { min: -50, max: -30 },
                  FOX:  { min: -55, max: -35 },
                  FOII: { min: -45, max: -25 },
                  RIX:  { min: -45, max: -25 },
                  RIII: { min: -50, max: -30 },
                  ROX:  { min: -30, max: -10 },
                  ROII: { min: -25, max: -5 },
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
                    <p style={{ color: C.textMuted, fontSize: 11, margin: "0 0 6px" }}>
                      フロート: {typeInfo.fitting.cleat.float.degree} | 角度: {typeInfo.fitting.cleat.angle.rotation}
                    </p>
                    {typeInfo.fitting.cleat.qFactor && (
                      <p style={{ color: typeInfo.color, fontSize: 12, fontWeight: 600, margin: 0 }}>
                        Qファクター: {typeInfo.fitting.cleat.qFactor.guide}
                      </p>
                    )}
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
                  FIX:  { saddleMin: 0.875 + adj, saddleMax: 0.885 + adj, crankMin: 0.200, crankMax: 0.205, dropMin: -60, dropMax: -40 },
                  FIII: { saddleMin: 0.875 + adj, saddleMax: 0.885 + adj, crankMin: 0.200, crankMax: 0.205, dropMin: -50, dropMax: -30 },
                  FOX:  { saddleMin: 0.870 + adj, saddleMax: 0.880 + adj, crankMin: 0.205, crankMax: 0.210, dropMin: -55, dropMax: -35 },
                  FOII: { saddleMin: 0.870 + adj, saddleMax: 0.880 + adj, crankMin: 0.205, crankMax: 0.215, dropMin: -45, dropMax: -25 },
                  RIX:  { saddleMin: 0.870 + adj, saddleMax: 0.880 + adj, crankMin: 0.205, crankMax: 0.205, dropMin: -45, dropMax: -25 },
                  RIII: { saddleMin: 0.875 + adj, saddleMax: 0.885 + adj, crankMin: 0.200, crankMax: 0.205, dropMin: -50, dropMax: -30 },
                  ROX:  { saddleMin: 0.865 + adj, saddleMax: 0.875 + adj, crankMin: 0.205, crankMax: 0.210, dropMin: -30, dropMax: -10 },
                  ROII: { saddleMin: 0.860 + adj, saddleMax: 0.870 + adj, crankMin: 0.205, crankMax: 0.215, dropMin: -25, dropMax: -5 },
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
                    <p style={{ color: C.textMuted, fontSize: 11, margin: "0 0 6px" }}>
                      フロート: {typeInfo.fitting.cleat.float.degree} | {typeInfo.fitting.cleat.angle.rotation}
                    </p>
                    {typeInfo.fitting.cleat.qFactor && (
                      <p style={{ color: typeInfo.color, fontSize: 12, fontWeight: 600, margin: 0 }}>
                        Qファクター: {typeInfo.fitting.cleat.qFactor.guide}
                      </p>
                    )}
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
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>走り方ガイド</p>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* ヒルクライム */}
              {typeInfo.guide?.fiveK && (
              <div style={{ background: theme.bg, borderRadius: 12, padding: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  {Icons.mountain(C.accent, 20)}
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
              )}
              
              {/* トレーニング */}
              {typeInfo.guide?.training && (
              <div style={{ background: theme.bg, borderRadius: 12, padding: 16 }}>
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
              )}
            </div>
          </Card>
          
          {/* ヒルクライム完全ガイド */}
          {HILLCLIMB_GUIDE[type] && (
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.mountain(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>ヒルクライム完全ガイド</p>
            </div>
            
            {(() => {
              const guide = HILLCLIMB_GUIDE[type];
              return (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* 登り方 */}
                <div style={{ background: theme.bg, borderRadius: 12, padding: 16 }}>
                  <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: "0 0 12px", letterSpacing: "0.5px" }}>
                    登り方
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { label: "ペース配分", value: guide.climbing.pace },
                      { label: "ダンシング", value: guide.climbing.dancing },
                      { label: "シッティング", value: guide.climbing.sitting },
                      { label: "ケイデンス", value: guide.climbing.cadence },
                    ].map(item => (
                      <div key={item.label}>
                        <p style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, margin: "0 0 2px" }}>{item.label}</p>
                        <p style={{ color: C.text, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* コーナリング */}
                <div style={{ background: theme.bg, borderRadius: 12, padding: 16 }}>
                  <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: "0 0 12px", letterSpacing: "0.5px" }}>
                    コーナリング
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { label: "進入", value: guide.cornering.entry },
                      { label: "旋回", value: guide.cornering.mid },
                      { label: "立ち上がり", value: guide.cornering.exit },
                    ].map(item => (
                      <div key={item.label} style={{ display: "flex", gap: 8 }}>
                        <span style={{ color: typeInfo.color, fontSize: 12, fontWeight: 700, minWidth: 60 }}>{item.label}</span>
                        <p style={{ color: C.text, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 加速のコツ */}
                <div style={{ background: theme.bg, borderRadius: 12, padding: 16 }}>
                  <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: "0 0 12px", letterSpacing: "0.5px" }}>
                    加速のコツ
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { label: "踏み出し", value: guide.acceleration.start },
                      { label: "ギア選択", value: guide.acceleration.gear },
                      { label: "上半身", value: guide.acceleration.upper },
                    ].map(item => (
                      <div key={item.label}>
                        <p style={{ color: C.textMuted, fontSize: 11, fontWeight: 600, margin: "0 0 2px" }}>{item.label}</p>
                        <p style={{ color: C.text, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ 
                    marginTop: 12, 
                    padding: 12, 
                    background: `${typeInfo.color}15`, 
                    borderRadius: 8,
                    border: `1px solid ${typeInfo.color}30`
                  }}>
                    <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: 0 }}>
                      {guide.acceleration.image}
                    </p>
                  </div>
                </div>
                
                {/* 勾配別攻略 */}
                <div style={{ background: theme.bg, borderRadius: 12, padding: 16 }}>
                  <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: "0 0 12px", letterSpacing: "0.5px" }}>
                    勾配別攻略
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { ...guide.gradient.easy, color: C.green },
                      { ...guide.gradient.mid, color: C.orange },
                      { ...guide.gradient.steep, color: C.pink },
                    ].map(item => (
                      <div key={item.range} style={{ 
                        display: "flex", 
                        alignItems: "flex-start",
                        gap: 10,
                        padding: 10,
                        background: `${item.color}08`,
                        borderRadius: 8,
                        border: `1px solid ${item.color}20`
                      }}>
                        <span style={{ 
                          color: item.color, 
                          fontSize: 12, 
                          fontWeight: 700, 
                          minWidth: 50,
                          padding: "2px 6px",
                          background: `${item.color}15`,
                          borderRadius: 4
                        }}>{item.range}</span>
                        <p style={{ color: C.text, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{item.tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* 弱点と対策 */}
                <div style={{ background: theme.bg, borderRadius: 12, padding: 16 }}>
                  <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: "0 0 12px", letterSpacing: "0.5px" }}>
                    弱点と対策
                  </p>
                  <div style={{ 
                    padding: 12, 
                    background: `${C.orange}10`, 
                    borderRadius: 8,
                    marginBottom: 12,
                    border: `1px solid ${C.orange}20`
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      {Icons.alertTriangle(C.orange, 16)}
                      <p style={{ color: C.orange, fontSize: 13, fontWeight: 600, margin: 0 }}>{guide.weakness.problem}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {guide.weakness.solutions.map((solution, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        {Icons.check(C.green, 14)}
                        <p style={{ color: C.text, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{solution}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              );
            })()}
          </Card>
          )}
          
          {/* セルフチェック */}
          {SELF_CHECK[type] && (
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.check(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>セルフチェック</p>
            </div>
            <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 16px", lineHeight: 1.5 }}>
              このタイプで合ってるか確認しよう。2つ以上「OK」なら合ってる！
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SELF_CHECK[type].checks.map((check, i) => (
                <div key={i} style={{ background: theme.bg, borderRadius: 12, padding: 14 }}>
                  <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: "0 0 8px" }}>
                    {i + 1}. {check.name}
                  </p>
                  <p style={{ color: C.text, fontSize: 13, margin: "0 0 10px", lineHeight: 1.6 }}>
                    {check.how}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      {Icons.check(C.green, 14)}
                      <p style={{ color: C.green, fontSize: 12, margin: 0 }}>{check.good}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                      {Icons.x(C.orange, 14)}
                      <p style={{ color: C.orange, fontSize: 12, margin: 0 }}>{check.bad}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          )}
          
          {/* 体感ワード変換表 */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.book(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>体感ワード辞典</p>
            </div>
            <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 16px", lineHeight: 1.5 }}>
              曖昧なフィッティング用語を「体感できる言葉」に変換
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BODY_FEEL_DICT.slice(0, 6).map((item, i) => (
                <div key={i} style={{ 
                  background: theme.bg, 
                  borderRadius: 10, 
                  padding: 12,
                  borderLeft: `3px solid ${typeInfo.color}`
                }}>
                  <p style={{ color: C.textDim, fontSize: 11, margin: "0 0 4px", textDecoration: "line-through" }}>
                    「{item.vague}」
                  </p>
                  <p style={{ color: C.text, fontSize: 13, fontWeight: 600, margin: "0 0 6px" }}>
                    → {item.feel}
                  </p>
                  <p style={{ color: typeInfo.color, fontSize: 11, margin: 0 }}>
                    ✓ 確認: {item.check}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                const more = BODY_FEEL_DICT.slice(6);
                alert(more.map(d => `「${d.vague}」→ ${d.feel}`).join("\n\n"));
              }}
              style={{
                width: "100%", marginTop: 12, padding: 10, borderRadius: 8,
                border: `1px solid ${theme.cardBorder}`, background: "transparent",
                color: C.textMuted, fontSize: 12, cursor: "pointer"
              }}
            >
              もっと見る（+{BODY_FEEL_DICT.length - 6}語）
            </button>
          </Card>
          
          {/* 調整フローチャート */}
          <Card style={{ marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              {Icons.settings(typeInfo.color, 20)}
              <p style={{ color: C.text, fontSize: 16, fontWeight: 700, margin: 0 }}>困ったときの調整ガイド</p>
            </div>
            
            {/* タイプ別トラブルシュート */}
            {TYPE_TROUBLESHOOT[type] && (
            <div style={{ 
              background: `${typeInfo.color}10`, 
              borderRadius: 12, 
              padding: 14, 
              marginBottom: 16,
              border: `1px solid ${typeInfo.color}20`
            }}>
              <p style={{ color: typeInfo.color, fontSize: 13, fontWeight: 700, margin: "0 0 8px" }}>
                {typeInfo.name}で「{TYPE_TROUBLESHOOT[type].issue}」とき
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {TYPE_TROUBLESHOOT[type].try.map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <span style={{ color: typeInfo.color, fontSize: 12, fontWeight: 700 }}>→</span>
                    <p style={{ color: C.text, fontSize: 13, margin: 0 }}>{t}</p>
                  </div>
                ))}
              </div>
            </div>
            )}
            
            {/* 症状別 */}
            <p style={{ color: C.textMuted, fontSize: 12, margin: "0 0 12px" }}>
              症状から調整ポイントを探す
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ADJUSTMENT_FLOW.map((flow, i) => (
                <details key={i} style={{ background: theme.bg, borderRadius: 10, overflow: "hidden" }}>
                  <summary style={{ 
                    padding: 12, 
                    cursor: "pointer", 
                    color: C.text, 
                    fontSize: 13, 
                    fontWeight: 600,
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}>
                    <span style={{ color: C.orange }}>⚠</span> {flow.symptom}
                  </summary>
                  <div style={{ padding: "0 12px 12px" }}>
                    <p style={{ color: C.textDim, fontSize: 11, margin: "0 0 8px" }}>
                      原因: {flow.causes.join(" / ")}
                    </p>
                    {flow.fixes.map((fix, j) => (
                      <div key={j} style={{ 
                        padding: 10, 
                        background: `${C.green}08`, 
                        borderRadius: 8, 
                        marginBottom: 6,
                        border: `1px solid ${C.green}15`
                      }}>
                        <p style={{ color: C.text, fontSize: 12, fontWeight: 600, margin: "0 0 4px" }}>
                          {fix.what}: {fix.action}
                        </p>
                        <p style={{ color: C.green, fontSize: 11, margin: 0 }}>
                          ✓ 確認: {fix.check}
                        </p>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
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
                  const bodyStyle = type === "FIX" ? "捻りながら内側で踏み込む" 
                    : type === "FIII" ? "安定して内側で効率よく回す"
                    : type === "FOX" ? "捻りながら外側でパワーを出す"
                    : type === "FOII" ? "安定して外側で粘る"
                    : type === "RIX" ? "後体幹でリズミカルに走る"
                    : type === "RIII" ? "後体幹で効率よく滑らかに"
                    : type === "ROX" ? "後体幹であらゆる状況に適応"
                    : "後体幹でどっしり安定";
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
                  STANCE COREでは、これらの傾向から8つのStance Type（3軸の組み合わせ）に分類。
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
