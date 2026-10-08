export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];
export const LOCALE_COOKIE = "portfolio-locale";
export function parseLocale(value: string | undefined): Locale {
  return value === "vi" ? "vi" : "en";
}

const en = {
  meta: {
    title: "Dương Minh Hiếu — Flutter Developer",
    description: "Flutter Developer based in Hanoi with over a year of experience. Co-founder & Lead Developer of Capple and WeDream AI.",
  },
  nav: { work: "Work", experience: "Experience", contact: "Contact", cv: "Download CV", language: "Language", light: "Switch to light theme", dark: "Switch to dark theme" },
  hero: {
    role: "Flutter Developer",
    intro: "Co-founder of Capple and WeDream AI, building the apps and their backends.",
    opportunities: "Seeking a Flutter Developer role at fresher level; also open to native mobile development internships.",
    availability: "Hanoi · Onsite or remote · Available to start immediately",
    explore: "View projects",
    gallery: "Explore three mobile app projects",
  },
  work: { label: "Selected work", navigation: "Project navigation", caseStudy: "View case study", allWork: "All work", otherProjects: "Other projects" },
  preview: {
    explore: "Explore {name}", region: "{name} screen preview", experience: "App experience", visual: "Visual preview",
    soon: "App screens coming soon", scroll: "Scroll to explore", scrollInside: "Scroll inside the phone", swipeWidgets: "Swipe the widget",
    widgetStack: "{name} widgets", widgetPosition: "Widget {current} of {total}", showWidget: "Show the {name} widget",
    scrollRegion: "{name} scrollable screenshot", previousScreen: "Previous {name} screen", screensIn: "{name} screens", nextScreen: "Next {name} screen",
    website: "Visit website", code: "View code", behind: "My contribution & technologies", technologies: "Technologies",
  },
  features: {
    title: "More features",
    exploreSteps: "Explore {count} screens", exploreFeature: "Explore feature", close: "Close feature preview",
    region: "{name} preview", steps: "{name} steps", step: "Step {current} of {total}", closer: "A closer look",
    previous: "Previous", next: "Next", previousStep: "Previous preview screen", nextStep: "Next preview screen",
  },
  typing: { replay: "Replay", replayLabel: "Replay dream typing animation" },
  shop: {
    title: "Shop", back: "Back", balance: "{count} coins", logo: "LOGO", other: "OTHER", free: "Free", owned: "Owned",
    payWith: "Pay with {count} coin", activate: "Activate", activated: "Activated", notEnough: "Not enough coins",
    purchased: "Purchase successful!", mysteryBox: "Mystery box", scanTag: "1–3 Scan", logoTag: "1 Logo",
    openBox: "Open the mystery box for {count} coins", logoTitle: "Congratulations!", logoDesc: "You got a new logo: {name}",
    scanTitle: "Jackpot!", scanDesc: "You got {count} free scans!", gotIt: "Got it",
    iconChanged: "You have changed the icon for “{name}”.", ok: "OK", selectLogo: "{name} logo",
  },
  scan: {
    ready: "Tap to scan", capturing: "Photo captured", scanning: "Scanning your meal…", complete: "Scan complete",
    again: "Take another photo and scan the meal", capture: "Take a photo and scan the meal", replay: "Tap to scan again", photo: "Take a photo",
  },
  contact: { title: "Contact", email: "Email me", phone: "Call {number}" },
};

export type Messages = typeof en;
const vi: Messages = {
  meta: {
    title: "Dương Minh Hiếu — Lập trình viên Flutter",
    description: "Lập trình viên Flutter tại Hà Nội với hơn một năm kinh nghiệm. Đồng sáng lập và lập trình viên chính của Capple và WeDream AI.",
  },
  nav: { work: "Dự án", experience: "Kinh nghiệm", contact: "Liên hệ", cv: "Tải CV", language: "Ngôn ngữ", light: "Chuyển sang giao diện sáng", dark: "Chuyển sang giao diện tối" },
  hero: {
    role: "Lập trình viên Flutter",
    intro: "Đồng sáng lập Capple và WeDream AI, trực tiếp phát triển ứng dụng và backend.",
    opportunities: "Tìm cơ hội Flutter Developer ở cấp Fresher; đồng thời mở với vị trí thực tập phát triển ứng dụng native.",
    availability: "Hà Nội · Onsite hoặc remote · Có thể bắt đầu ngay",
    explore: "Xem dự án",
    gallery: "Khám phá ba dự án ứng dụng di động",
  },
  work: { label: "Dự án tiêu biểu", navigation: "Điều hướng dự án", caseStudy: "Xem chi tiết dự án", allWork: "Tất cả dự án", otherProjects: "Dự án khác" },
  preview: {
    explore: "Khám phá {name}", region: "Xem trước màn hình {name}", experience: "Trải nghiệm ứng dụng", visual: "Xem trước thiết kế",
    soon: "Sắp cập nhật màn hình ứng dụng", scroll: "Cuộn để xem thêm", scrollInside: "Cuộn bên trong điện thoại", swipeWidgets: "Vuốt widget để xem",
    widgetStack: "Widget {name}", widgetPosition: "Widget {current} trên {total}", showWidget: "Xem widget {name}",
    scrollRegion: "Ảnh màn hình {name} có thể cuộn", previousScreen: "Màn hình trước của {name}", screensIn: "Các màn hình {name}", nextScreen: "Màn hình tiếp theo của {name}",
    website: "Trang web ứng dụng", code: "Xem mã nguồn", behind: "Đóng góp & công nghệ", technologies: "Công nghệ",
  },
  features: {
    title: "Tính năng khác",
    exploreSteps: "Xem {count} màn hình", exploreFeature: "Khám phá tính năng", close: "Đóng phần xem trước tính năng",
    region: "Xem trước {name}", steps: "Các bước {name}", step: "Bước {current} / {total}", closer: "Khám phá chi tiết",
    previous: "Quay lại", next: "Tiếp theo", previousStep: "Xem màn hình trước", nextStep: "Xem màn hình tiếp theo",
  },
  typing: { replay: "Xem lại", replayLabel: "Xem lại hiệu ứng nhập nội dung giấc mơ" },
  shop: {
    title: "Cửa hàng", back: "Quay lại", balance: "{count} coin", logo: "LOGO", other: "KHÁC", free: "Miễn phí", owned: "Đã mua",
    payWith: "Thanh toán {count} coin", activate: "Kích hoạt", activated: "Đã kích hoạt", notEnough: "Không đủ coin",
    purchased: "Mua thành công!", mysteryBox: "Hộp bí ẩn", scanTag: "1–3 lượt quét", logoTag: "1 Logo",
    openBox: "Mở hộp bí ẩn với {count} coin", logoTitle: "Chúc mừng!", logoDesc: "Bạn nhận được logo mới: {name}",
    scanTitle: "Trúng lớn!", scanDesc: "Bạn nhận được {count} lượt quét miễn phí!", gotIt: "Đã hiểu",
    iconChanged: "Bạn đã thay đổi biểu tượng cho “{name}”.", ok: "OK", selectLogo: "Logo {name}",
  },
  scan: {
    ready: "Chạm để quét", capturing: "Đã chụp ảnh", scanning: "Đang quét món ăn…", complete: "Quét hoàn tất",
    again: "Chụp ảnh mới và quét món ăn", capture: "Chụp ảnh và quét món ăn", replay: "Chạm để quét lại", photo: "Chụp ảnh",
  },
  contact: { title: "Liên hệ", email: "Gửi email", phone: "Gọi {number}" },
};

export const messages: Record<Locale, Messages> = { en, vi };

export function formatMessage(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}
