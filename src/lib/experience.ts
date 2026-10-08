import type { Locale } from "./i18n/messages";

// Source: Hieu-Duong-Minh-CV.pdf (English edition, 10/2026).
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
      "Lead development of Capple in a five-person team, owning the Flutter app, Node.js/MongoDB backend, infrastructure and releases. Implement the mobile UI from the designer’s work with Clean Architecture, Riverpod and Dio.",
      "Integrated GPT-4o mini, Firebase Authentication, Firebase Analytics and SharedPreferences. Since February 2026, Capple has reached 10,000+ users and 100+ in-app purchases.",
      "Built WeDream AI from scratch with Flutter, Node.js/MongoDB, Clean Architecture, Riverpod and GPT-4o mini for dream analysis.",
      "Configured GitLab CI/CD to deploy automatically on pushes to the dev branch and managed environment variables. Took over App Store Connect and Google Play Console management in July 2026, following the initial release handled by an investor.",
      "Perform unit testing, automated testing, debugging and performance profiling with Flutter DevTools.",
    ],
  },
  {
    id: "dogeland-web",
    period: "Jun 2026 — Present",
    role: "Remote Frontend Developer",
    org: "Dogeland · Minecraft server network",
    bullets: [
      "Built the entire frontend of dogeland.vn from scratch in a TypeScript monorepo (Bun workspaces) with React, Vite, Tailwind CSS and TanStack Query, alongside a NestJS API and a shared Prisma/PostgreSQL schema.",
      "Developed every user-facing page: shop with categories and product pages, blog, forum, wiki, leaderboards, gift code redemption and a player dashboard with playtime and spending charts (Recharts), plus the admin panel for servers, players, shop, ranks, gift codes, blog and forum.",
      "Built the NestJS authentication API shared with the in-game AuthMe plugin by reproducing its password hashing, so one account works in game and on the web; added SMTP email confirmation and password reset, JWT and Discord OAuth2 login and linking.",
      "Built the payment API on the PayOS gateway with webhook-based bank-transfer reconciliation and server-side verification, plus promo codes and an admin approval flow.",
      "Rendered the server’s Blockbench 3D models on the web with Three.js.",
    ],
  },
  {
    id: "relabs-web",
    period: "Jan 2024 — Nov 2025",
    role: "Remote Web Developer",
    org: "Relabs Team · Web3/Crypto",
    bullets: [
      "Took over Redrop, an internal system for managing and automating airdrop campaigns, maintaining the legacy web app and smart contract features, and identified the gaps that scoped its rebuild.",
      "Rebuilt the frontend from scratch with a new UI and ESLint conventions from day one, extended the Controller–Service–Repository REST API, and added a Home dashboard, server management, per-bot conditions and an airdrop list.",
      "Built account management for Twitter, Telegram and Discord accounts: CRUD, grouping, filtering by tag, staff or server, Excel import/export and per-server bot permissions.",
      "Replaced a single shared login with multi-user auth: Google OAuth, WalletConnect and email sign-up verified by a 6-digit SMTP code, unified by email into one account; Admin / Team Manager / User roles with JWT and bcrypt.",
      "Wrote Puppeteer and Cheerio crawlers that import airdrop data from Cryptorank by project link, with batched OpenAI API translation into Vietnamese.",
      "Sped up the airdrop list with Redis caching and MongoDB indexes.",
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
      "Đảm nhiệm vai trò lập trình viên chính của Capple trong đội ngũ 5 người. Phụ trách ứng dụng Flutter, backend Node.js/MongoDB, hạ tầng và phát hành; triển khai giao diện từ bản thiết kế với Clean Architecture, Riverpod và Dio.",
      "Tích hợp GPT-4o mini, Firebase Authentication, Firebase Analytics và SharedPreferences. Từ 02/2026, Capple đạt hơn 10.000 người dùng và hơn 100 lượt mua trong ứng dụng.",
      "Xây dựng WeDream AI từ đầu với Flutter, Node.js/MongoDB, Clean Architecture, Riverpod và GPT-4o mini để phân tích giấc mơ.",
      "Thiết lập GitLab CI/CD để tự động triển khai khi cập nhật mã trên nhánh dev và quản lý biến môi trường. Tiếp quản việc phát hành qua App Store Connect và Google Play Console từ 07/2026, sau bản phát hành đầu tiên do nhà đầu tư thực hiện.",
      "Viết kiểm thử đơn vị, thực hiện kiểm thử tự động, gỡ lỗi và phân tích hiệu năng bằng Flutter DevTools.",
    ],
  },
  {
    id: "dogeland-web",
    period: "06/2026 — Nay",
    role: "Lập trình viên Frontend (Remote)",
    org: "Dogeland · Mạng máy chủ Minecraft",
    bullets: [
      "Xây dựng toàn bộ frontend của dogeland.vn từ đầu trong monorepo TypeScript (Bun workspaces) với React, Vite, Tailwind CSS và TanStack Query, cùng API NestJS và schema Prisma/PostgreSQL dùng chung.",
      "Phát triển mọi trang phía người dùng: cửa hàng theo danh mục và trang sản phẩm, blog, diễn đàn, wiki, bảng xếp hạng, đổi gift code và bảng điều khiển người chơi với biểu đồ thời gian chơi và chi tiêu (Recharts); cùng trang quản trị máy chủ, người chơi, cửa hàng, rank, gift code, blog và diễn đàn.",
      "Xây dựng API xác thực (NestJS) dùng chung với plugin AuthMe trong game bằng cách tái hiện cách băm mật khẩu của plugin, để một tài khoản dùng được cả trong game lẫn trên web; thêm xác nhận email và đặt lại mật khẩu qua SMTP, JWT và đăng nhập/liên kết Discord OAuth2.",
      "Xây dựng API thanh toán qua cổng PayOS, đối soát chuyển khoản bằng webhook và xác minh giao dịch phía server, kèm mã khuyến mãi và luồng duyệt của admin.",
      "Hiển thị mô hình 3D Blockbench của server trên web bằng Three.js.",
    ],
  },
  {
    id: "relabs-web",
    period: "01/2024 — 11/2025",
    role: "Lập trình viên Web (Remote)",
    org: "Relabs Team · Web3/Crypto",
    bullets: [
      "Tiếp quản Redrop, hệ thống nội bộ quản lý và tự động hóa chiến dịch airdrop: bảo trì web app cũ cùng các tính năng smart contract, và chỉ ra các giới hạn của hệ thống làm cơ sở cho việc xây lại.",
      "Xây lại toàn bộ frontend từ đầu với giao diện mới, thiết lập ESLint và quy chuẩn code ngay từ đầu; mở rộng REST API theo kiến trúc Controller – Service – Repository, thêm Home dashboard, quản lý máy chủ, điều kiện riêng cho từng bot và danh sách airdrop.",
      "Xây dựng chức năng quản lý tài khoản Twitter, Telegram, Discord: CRUD, gom nhóm, lọc theo tag/nhân viên/máy chủ, nhập-xuất Excel và phân quyền riêng cho từng bot trên từng máy chủ.",
      "Thay cơ chế một tài khoản đăng nhập dùng chung bằng xác thực nhiều người dùng: Google OAuth, WalletConnect và đăng ký email xác minh bằng mã 6 số qua SMTP, hợp nhất danh tính theo email; phân quyền Admin / Team Manager / User, bảo mật bằng JWT và bcrypt.",
      "Viết crawler bằng Puppeteer, Cheerio để tự động lấy dữ liệu airdrop từ Cryptorank chỉ bằng link dự án; dùng OpenAI API dịch task sang tiếng Việt theo batch.",
      "Tối ưu tốc độ hiển thị danh sách airdrop bằng Redis cache và index MongoDB.",
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
    status: locale === "vi" ? "Chờ tốt nghiệp (dự kiến 2026)" : "Awaiting graduation (expected 2026)",
  };
}
