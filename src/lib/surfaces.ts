import type { Locale } from "./i18n/messages";

// Home-screen widgets and notifications shipped outside the app itself.
// Widget art: Figma "Capple" file, section "Widget" (1187:9987).
// Notification copy: calories_app lib/core/services/notification_texts.dart.
export type SurfaceWidget = { id: string; src: string; width: number; height: number; title: string };

export type SurfaceNotification = { id: string; title: string; body: string; time: string };

export type AppSurfaces = {
  widgets: SurfaceWidget[];
  notifications: SurfaceNotification[];
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

const surfaces: Partial<Record<string, Record<Locale, AppSurfaces>>> = {
  capple: { en: cappleEn, vi: cappleVi },
};

export function getSurfaces(slug: string, locale: Locale): AppSurfaces | undefined {
  return surfaces[slug]?.[locale];
}
