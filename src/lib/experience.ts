import type { Locale } from "./i18n/messages";

// Source: Hieu-Duong-Minh-TopCV.vn-061026.162216.pdf.
export type ExperienceEntry = {
  id: string;
  period: string;
  role: string;
  org: string;
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "capple-wedream",
    period: "Dec 2025 — Present",
    role: "Co-founder & Lead Developer",
    org: "Capple · WeDream AI",
    bullets: [
      "Lead development of Capple in a five-person team, owning the Flutter app, Node.js/MongoDB backend, infrastructure and releases. Implement the mobile UI from the designer’s work.",
      "Built WeDream AI from scratch with Flutter, Node.js/MongoDB, Clean Architecture, Riverpod and GPT-4o mini for dream analysis.",
      "Configured GitLab CI/CD to deploy automatically on pushes to the dev branch and managed environment variables. Took over App Store Connect and Google Play Console management in July 2026, following the initial release handled by an investor.",
      "Perform unit testing, automated testing, debugging and performance profiling with Flutter DevTools.",
    ],
  },
  {
    id: "phx-intern",
    period: "Jun 2023 — Dec 2023",
    role: "Flutter Intern",
    org: "PHX Smart School",
    bullets: [
      "Developed Flutter mobile interfaces from existing UI/UX designs for PHX Smart School and Vicostone VN.",
      "Integrated APIs and fetched and processed data for display in the mobile client.",
    ],
  },
];

const experienceVi: ExperienceEntry[] = [
  {
    id: "capple-wedream",
    period: "12/2025 — Nay",
    role: "Đồng sáng lập & Lập trình viên chính",
    org: "Capple · WeDream AI",
    bullets: [
      "Đảm nhiệm vai trò lập trình viên chính của Capple trong đội ngũ 5 người. Phụ trách ứng dụng Flutter, backend Node.js/MongoDB, hạ tầng và phát hành; triển khai giao diện từ bản thiết kế của đội ngũ thiết kế.",
      "Xây dựng WeDream AI từ đầu với Flutter, Node.js/MongoDB, Clean Architecture, Riverpod và GPT-4o mini để phân tích giấc mơ.",
      "Thiết lập GitLab CI/CD để tự động triển khai khi cập nhật mã trên nhánh dev và quản lý biến môi trường. Tiếp quản việc phát hành qua App Store Connect và Google Play Console từ 07/2026, sau bản phát hành đầu tiên do nhà đầu tư thực hiện.",
      "Viết kiểm thử đơn vị, thực hiện kiểm thử tự động, gỡ lỗi và phân tích hiệu năng bằng Flutter DevTools.",
    ],
  },
  {
    id: "phx-intern",
    period: "06/2023 — 12/2023",
    role: "Thực tập sinh Flutter",
    org: "PHX Smart School",
    bullets: [
      "Phát triển giao diện ứng dụng di động bằng Flutter theo thiết kế UI/UX có sẵn cho PHX Smart School và Vicostone VN.",
      "Tích hợp API, tải và xử lý dữ liệu để hiển thị trên ứng dụng.",
    ],
  },
];

export function getExperience(locale: Locale) {
  return locale === "vi" ? experienceVi : experience;
}

export function getEducation(locale: Locale) {
  return {
    period: "2020 — 2026",
    school: locale === "vi" ? "Đại học Phenikaa" : "Phenikaa University",
    major: locale === "vi" ? "Kỹ thuật phần mềm" : "Software Engineering",
    status: locale === "vi" ? "Đang xét tốt nghiệp" : "Graduation review pending",
  };
}
