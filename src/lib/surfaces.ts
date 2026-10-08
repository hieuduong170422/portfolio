import type { Locale } from "./i18n/messages";

// Home-screen widgets and notifications shipped outside the app itself.
// Widget art: Figma "Capple" file, sections "Widget" (1187:9987) and "Widget android" (1298:5823).
// Notification copy: calories_app lib/core/services/notification_texts.dart.
export type WidgetPlatform = "ios" | "android";

export type SurfaceWidget = { id: string; src: string; width: number; height: number; title: string };

export type WidgetSet = { platform: WidgetPlatform; label: string; tech: string; widgets: SurfaceWidget[] };

export type SurfaceNotification = { id: string; title: string; body: string; time: string };

export type AppSurfaces = {
  title: string;
  description: string;
  widgetSets: WidgetSet[];
  notificationsTitle: string;
  notificationsDescription: string;
  notifications: SurfaceNotification[];
  iconSrc: string;
};

const WIDGET_IDS = ["today", "streak", "progress", "loss", "quick-log"] as const;
type WidgetId = (typeof WIDGET_IDS)[number];

// Exported at 3x from 164×164 (iOS small) and 176×224 (Android 2×2) frames.
const SIZES: Record<WidgetPlatform, { width: number; height: number }> = {
  ios: { width: 492, height: 492 },
  android: { width: 528, height: 672 },
};

function buildWidgets(platform: WidgetPlatform, titles: Record<WidgetId, string>): SurfaceWidget[] {
  return WIDGET_IDS.map((id) => ({
    id,
    src: `/images/capple/widgets/${platform}-${id}.png`,
    ...SIZES[platform],
    title: titles[id],
  }));
}

const titlesEn: Record<WidgetId, string> = {
  today: "Today overview",
  streak: "Streak",
  progress: "Weight gain",
  loss: "Weight loss",
  "quick-log": "Quick log",
};

const titlesVi: Record<WidgetId, string> = {
  today: "Tổng quan hôm nay",
  streak: "Chuỗi ngày",
  progress: "Tăng cân",
  loss: "Giảm cân",
  "quick-log": "Ghi nhanh",
};

const cappleEn: AppSurfaces = {
  title: "Widgets & notifications",
  description: "Five home-screen widgets on each platform keep calories, streaks and weight one glance away, and Quick log opens the camera scan in one tap.",
  widgetSets: [
    { platform: "ios", label: "iOS", tech: "Native Swift · WidgetKit · iOS 16+", widgets: buildWidgets("ios", titlesEn) },
    { platform: "android", label: "Android", tech: "Native Kotlin · AppWidgetProvider", widgets: buildWidgets("android", titlesEn) },
  ],
  notificationsTitle: "Reminders that adapt",
  notificationsDescription: "Local notifications scheduled per time zone from each user's settings. Copy rotates by weekday in 14 languages, evening reminders react to calories logged so far, and inactive users get a 3- and 7-day re-engagement nudge.",
  notifications: [
    { id: "streak", title: "Keep your streak alive 🔥", body: "One small log today keeps the habit going.", time: "now" },
    { id: "dinner", title: "Don't skip dinner 🍽", body: "You've only eaten 860 kcal (42% of goal). Add a balanced dinner to stay on track.", time: "20:00" },
    { id: "reengage", title: "We miss you! 👋", body: "It's been a few days. One quick log and you're back on track.", time: "Mon" },
  ],
  iconSrc: "/images/capple/widgets/app-icon.png",
};

const cappleVi: AppSurfaces = {
  title: "Widget & thông báo",
  description: "Mỗi nền tảng có 5 widget màn hình chính để xem calo, chuỗi ngày và cân nặng chỉ trong một cái nhìn; widget Ghi nhanh mở camera quét món ăn bằng một chạm.",
  widgetSets: [
    { platform: "ios", label: "iOS", tech: "Native Swift · WidgetKit · iOS 16+", widgets: buildWidgets("ios", titlesVi) },
    { platform: "android", label: "Android", tech: "Native Kotlin · AppWidgetProvider", widgets: buildWidgets("android", titlesVi) },
  ],
  notificationsTitle: "Nhắc nhở theo ngữ cảnh",
  notificationsDescription: "Thông báo cục bộ lên lịch theo múi giờ và cài đặt của từng người dùng. Nội dung xoay vòng theo ngày trong tuần ở 14 ngôn ngữ, nhắc nhở buổi tối dựa trên lượng calo đã ghi, và người dùng không hoạt động 3 hoặc 7 ngày sẽ nhận lời nhắc quay lại.",
  notifications: [
    { id: "streak", title: "Giữ chuỗi ngày nhé 🔥", body: "Chỉ cần một lần ghi hôm nay để duy trì thói quen.", time: "bây giờ" },
    { id: "dinner", title: "Đừng bỏ bữa tối nha 🍽", body: "Hôm nay bạn mới ăn 860 kcal (42% goal). Bổ sung thêm bữa tối để đủ năng lượng.", time: "20:00" },
    { id: "reengage", title: "Nhớ bạn quá! 👋", body: "Mấy ngày rồi không thấy. Chỉ cần 1 lần ghi là trở lại quỹ đạo.", time: "T2" },
  ],
  iconSrc: "/images/capple/widgets/app-icon.png",
};

const surfaces: Partial<Record<string, Record<Locale, AppSurfaces>>> = {
  capple: { en: cappleEn, vi: cappleVi },
};

export function getSurfaces(slug: string, locale: Locale): AppSurfaces | undefined {
  return surfaces[slug]?.[locale];
}
