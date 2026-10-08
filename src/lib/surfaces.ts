import type { Locale } from "./i18n/messages";

// Home-screen widgets, notifications and Live Activities shipped outside the app itself.
// Capple widget art: Figma "Capple" file, section "Widget" (1187:9987); notification copy:
// calories_app lib/core/services/notification_texts.dart. WeDream widgets: wedream_app ios/wedream
// and android .../widget. FocusLock widgets and Live Activity: focusBlock/FocusBlockWidget.
export type SurfaceWidget = { id: string; src: string; width: number; height: number; title: string };

export type SurfaceNotification = { id: string; title: string; body: string; time: string };

export type SurfaceLiveActivity = { src: string; width: number; height: number; label: string };

export type AppSurfaces = {
  widgets: SurfaceWidget[];
  notifications?: SurfaceNotification[];
  /** Shown in the top band, where a Live Activity sits on a real lock screen. */
  liveActivity?: SurfaceLiveActivity;
  /** App icon for banners and the home grid; Capple falls back to the logo picked in its shop demo. */
  iconSrc?: string;
  /** CSS background for the home screen wallpaper. */
  wallpaper?: string;
};

// Exported at 3x from 164×164 iOS small widget frames.
const IOS_WIDGET_SIZE = { width: 492, height: 492 };

const WIDGET_IDS = ["today", "streak", "progress", "loss", "quick-log"] as const;
type WidgetId = (typeof WIDGET_IDS)[number];

function buildWidgets(titles: Record<WidgetId, string>): SurfaceWidget[] {
  return WIDGET_IDS.map((id) => ({ id, src: `/images/capple/widgets/ios-${id}.png`, ...IOS_WIDGET_SIZE, title: titles[id] }));
}

const cappleEn: AppSurfaces = {
  widgets: buildWidgets({ today: "Today overview", streak: "Streak", progress: "Weight gain", loss: "Weight loss", "quick-log": "Quick log" }),
  notifications: [
    { id: "streak", title: "Keep your streak alive 🔥", body: "One small log today keeps the habit going.", time: "now" },
    { id: "dinner", title: "Don't skip dinner 🍽", body: "You've only eaten 860 kcal (42% of goal). Add a balanced dinner to stay on track.", time: "now" },
    { id: "reengage", title: "We miss you! 👋", body: "It's been a few days. One quick log and you're back on track.", time: "now" },
  ],
};

const cappleVi: AppSurfaces = {
  widgets: buildWidgets({ today: "Tổng quan hôm nay", streak: "Chuỗi ngày", progress: "Tăng cân", loss: "Giảm cân", "quick-log": "Ghi nhanh" }),
  notifications: [
    { id: "streak", title: "Giữ chuỗi ngày nhé 🔥", body: "Chỉ cần một lần ghi hôm nay để duy trì thói quen.", time: "bây giờ" },
    { id: "dinner", title: "Đừng bỏ bữa tối nha 🍽", body: "Hôm nay bạn mới ăn 860 kcal (42% goal). Bổ sung thêm bữa tối để đủ năng lượng.", time: "now" },
    { id: "reengage", title: "Nhớ bạn quá! 👋", body: "Mấy ngày rồi không thấy. Chỉ cần 1 lần ghi là trở lại quỹ đạo.", time: "bây giờ" },
  ],
};

// Exported at 1x (164×164) from the WeDream Figma frames: dark and light variants.
const WEDREAM_SIZE = { width: 164, height: 164 };
const WEDREAM_IDS = ["mood-dark", "patterns-dark", "add-dark", "mood-light", "patterns-light", "add-light"] as const;
type WeDreamId = (typeof WEDREAM_IDS)[number];

function buildWeDreamWidgets(titles: Record<WeDreamId, string>): SurfaceWidget[] {
  return WEDREAM_IDS.map((id) => ({ id, src: `/images/wedream/widgets/${id}.png`, ...WEDREAM_SIZE, title: titles[id] }));
}

const wedreamBase = {
  iconSrc: "/images/wedream/widgets/app-icon.png",
  wallpaper: "linear-gradient(170deg, #121218, #2a2540 55%, #4b3a63)",
};

const wedreamEn: AppSurfaces = {
  ...wedreamBase,
  widgets: buildWeDreamWidgets({
    "mood-dark": "Dream stability · dark", "patterns-dark": "Recurring patterns · dark", "add-dark": "Add a dream · dark",
    "mood-light": "Dream stability · light", "patterns-light": "Recurring patterns · light", "add-light": "Add a dream · light",
  }),
};

const wedreamVi: AppSurfaces = {
  ...wedreamBase,
  widgets: buildWeDreamWidgets({
    "mood-dark": "Độ ổn định · tối", "patterns-dark": "Mẫu lặp lại · tối", "add-dark": "Thêm giấc mơ · tối",
    "mood-light": "Độ ổn định · sáng", "patterns-light": "Mẫu lặp lại · sáng", "add-light": "Thêm giấc mơ · sáng",
  }),
};

// Exported at 1x (152×152) from the FocusLock widget frames.
const FOCUS_SIZE = { width: 152, height: 152 };
const FOCUS_IDS = ["time-lock-day", "day-lock-month", "locking"] as const;
type FocusId = (typeof FOCUS_IDS)[number];

function buildFocusWidgets(titles: Record<FocusId, string>): SurfaceWidget[] {
  return FOCUS_IDS.map((id) => ({ id, src: `/images/focuslock/widgets/${id}.jpg`, ...FOCUS_SIZE, title: titles[id] }));
}

const focusBase = {
  iconSrc: "/images/focuslock/widgets/app-icon.png",
  wallpaper: "linear-gradient(170deg, #0b0b0d, #1c1c22 60%, #2c2c34)",
};

const focusEn: AppSurfaces = {
  ...focusBase,
  widgets: buildFocusWidgets({ "time-lock-day": "Time locked today", "day-lock-month": "Days locked this month", locking: "Locking in progress" }),
  liveActivity: { src: "/images/focuslock/widgets/live-activity.png", width: 764, height: 320, label: "FocusLock Live Activity counting down a Social App block with 06:39:24 remaining" },
};

const focusVi: AppSurfaces = {
  ...focusBase,
  widgets: buildFocusWidgets({ "time-lock-day": "Thời gian khóa hôm nay", "day-lock-month": "Số ngày khóa trong tháng", locking: "Đang khóa" }),
  liveActivity: { src: "/images/focuslock/widgets/live-activity.png", width: 764, height: 320, label: "Live Activity của FocusLock đếm ngược phiên chặn Social App còn 06:39:24" },
};

const surfaces: Partial<Record<string, Record<Locale, AppSurfaces>>> = {
  capple: { en: cappleEn, vi: cappleVi },
  wedream: { en: wedreamEn, vi: wedreamVi },
  focuslock: { en: focusEn, vi: focusVi },
};

export function getSurfaces(slug: string, locale: Locale): AppSurfaces | undefined {
  return surfaces[slug]?.[locale];
}
