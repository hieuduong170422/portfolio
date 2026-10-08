import { apps, type AppCaseStudy, type AppFeature, type AppScreen } from "../apps";
import type { Locale } from "./messages";

type ScreenCopy = Pick<AppScreen, "alt" | "caption" | "step">;
type FeatureCopy = Pick<AppFeature, "title" | "category" | "description"> & { screens: (ScreenCopy & { title: string })[] };
type ProjectCopy = Pick<AppCaseStudy, "category" | "tagline" | "description" | "chapters" | "role" | "responsibilities" | "stats" | "statsNote" | "statusLabel" | "scale" | "highlights"> & {
  screens: ScreenCopy[];
  features?: FeatureCopy[];
};

export const vietnameseProjects: Record<"capple" | "wedream" | "focuslock", ProjectCopy> = {
  capple: {
    category: "Dinh dưỡng · AI",
    tagline: "Ứng dụng theo dõi calo và dinh dưỡng bằng AI",
    description: "Ứng dụng theo dõi calo bằng AI, ghi bữa ăn qua ảnh chụp, chat bằng chữ hoặc giọng nói. Đã phát hành trên iOS và Android, có người dùng trả phí. Tôi phụ trách ứng dụng, backend và phát hành trong đội ngũ 5 người.",
    role: "Đồng sáng lập & Lập trình viên chính",
    scale: [
      { label: "Feature module", value: "8" },
      { label: "Ngôn ngữ, gồm cả RTL", value: "14" },
    ],
    highlights: [
      "Xây dựng codebase Flutter theo Clean Architecture với 8 feature module (auth, quét món ăn, dinh dưỡng, theo dõi chu kỳ, cheat day, gói đăng ký, cửa hàng, xác minh sinh viên), bản địa hóa 14 ngôn ngữ gồm cả tiếng Ả Rập.",
      "Tích hợp Apple HealthKit và Health Connect cho bước chân, bài tập và chu kỳ; xây dựng widget native trên iOS (Swift/WidgetKit, gồm widget màn hình khóa iOS 16+) và Android (Kotlin).",
      "Thiết kế hệ thống giữ chân người dùng: streak có freeze và tự động cứu, huy hiệu, cửa hàng với mystery box, theo dõi chu kỳ dự đoán chính xác dần theo số tháng ghi nhận, thông báo cục bộ theo múi giờ với nội dung xoay vòng và lời nhắc quay lại.",
      "Xây dựng cơ chế tăng trưởng: mã giới thiệu và mã quà tặng qua deep link, chia sẻ bữa ăn kiểu Strava, gói sinh viên có xác minh OTP và giá theo khu vực.",
      "Thử nghiệm monetization với giới hạn lượt quét miễn phí mỗi ngày, đo funnel bằng Google Analytics for Firebase. Thêm force update, nhắc cập nhật trong ứng dụng và màn hình What's New theo từng phiên bản.",
      "Xây dựng backend Node.js/MongoDB và GitLab CI/CD tự động triển khai khi cập nhật nhánh dev. Quản lý phát hành trên App Store Connect và Google Play Console từ 07/2026.",
    ],
    chapters: [
      { title: "Tổng quan", description: "Calo, các chất dinh dưỡng, nhiệm vụ hằng ngày và bữa ăn trong một màn hình, cùng một bảng cho mọi cách ghi bữa ăn." },
      { title: "Ghi bữa ăn", description: "Chụp ảnh, mô tả bằng chat hoặc nói trực tiếp. AI ước tính calo và các chất dinh dưỡng, mọi nguyên liệu đều chỉnh được trước khi lưu vào nhật ký." },
      { title: "Widget & nhắc nhở", description: "Widget màn hình chính viết native bằng Swift (WidgetKit, iOS 16+) và Kotlin giúp xem calo và chuỗi ngày chỉ trong một cái nhìn. Nhắc nhở cục bộ chạy theo múi giờ của từng người, dựa trên lượng calo đã ghi và gọi người dùng quay lại sau 3 và 7 ngày không mở app." },
    ],
    screens: [
      { step: "Home", alt: "Màn hình Home Capple hiển thị lịch tuần, calo còn lại, các chất dinh dưỡng, nhiệm vụ và bữa ăn", caption: "Tổng quan hằng ngày — calo, dinh dưỡng, nhiệm vụ và bữa ăn" },
      { step: "Menu", alt: "Bảng thêm nhanh Capple với Voice log, Log food, Chat, Meal scan cùng lối tắt cân nặng, nước, vận động và chu kỳ", caption: "Một bảng cho mọi cách ghi — giọng nói, tìm kiếm, chat hoặc chụp ảnh" },
      { step: "Quét", alt: "Màn hình camera Capple quét món ăn bằng AI", caption: "Quét món ăn bằng AI — hướng camera vào bữa ăn" },
      { step: "Kết quả", alt: "Kết quả quét Capple với calo, các chất dinh dưỡng và danh sách nguyên liệu có thể chỉnh sửa", caption: "Kết quả AI ước tính từ ảnh — bạn có thể chỉnh lại nguyên liệu và khẩu phần" },
      { step: "Chat", alt: "Phản hồi chat Capple ước tính cơm gà nướng rau củ 350 g, 520 kcal, kèm đạm, chất bột đường và nút Add to Diary", caption: "Ghi bằng chat — mô tả bữa ăn để nhận lại calo và dinh dưỡng" },
      { step: "Giọng nói", alt: "Bảng ghi bằng giọng nói Capple với micro, trạng thái Listening và hai nút Cancel, Done", caption: "Ghi bằng giọng nói — chuyển lời nói thành mục nhật ký" },
      { alt: "Màn hình chính iPhone với widget Capple vuốt được để xem calo hôm nay, chuỗi ngày, tăng cân, giảm cân và ghi nhanh, giữa các app mẫu màu xám, kèm thông báo nhắc nhở hiện dạng banner", caption: "Widget màn hình chính và nhắc nhở theo ngữ cảnh" },
    ],
    features: [
      {
        category: "Cá nhân hóa", title: "Một kế hoạch phù hợp với bạn.",
        description: "Chọn mục tiêu, nhập thông tin cơ thể và đặt tốc độ thay đổi cân nặng mong muốn. Capple dùng những thông tin này để đề xuất mục tiêu calo và dinh dưỡng mỗi ngày.",
        screens: [
          { title: "Mục tiêu của bạn", alt: "Màn hình chọn mục tiêu Capple với các lựa chọn giảm cân, giữ cân và tăng cân", caption: "Bạn muốn giảm cân, giữ cân hay tăng cân? Bắt đầu từ điều bạn đang hướng tới." },
          { title: "Thông tin cá nhân", alt: "Màn hình cá nhân hóa Capple với lựa chọn giới tính và ngày sinh", caption: "Thông tin về giới tính và ngày sinh giúp Capple ước tính nhu cầu dinh dưỡng của bạn." },
          { title: "Chiều cao & cân nặng", alt: "Màn hình chọn chiều cao và cân nặng Capple với hệ mét và hệ đo lường Anh", caption: "Nhập chiều cao và cân nặng hiện tại theo đơn vị bạn quen dùng." },
          { title: "Cân nặng mục tiêu", alt: "Màn hình cân nặng mục tiêu Capple với thước cân nặng nằm ngang", caption: "Chọn cân nặng bạn muốn đạt được để Capple đề xuất kế hoạch." },
          { title: "Tốc độ thay đổi cân nặng", alt: "Màn hình chọn tốc độ Capple với thời gian đạt mục tiêu và thanh điều chỉnh", caption: "Điều chỉnh tốc độ thay đổi cân nặng để xem thời gian dự kiến đạt mục tiêu." },
          { title: "Kế hoạch của bạn", alt: "Tổng kết kế hoạch cá nhân Capple với mục tiêu calo, đạm, chất bột đường, chất béo và BMI", caption: "Xem mục tiêu calo, đạm, chất bột đường và chất béo mỗi ngày trong bản kế hoạch của bạn." },
        ],
      },
      {
        category: "Tiến trình hằng ngày", title: "Nhìn lại những thay đổi của bạn.",
        description: "Xem cân nặng thay đổi theo thời gian, lượng calo trung bình mỗi tuần và chuỗi ngày duy trì ghi chép. Những con số giúp bạn nhìn lại quá trình theo đuổi mục tiêu.",
        screens: [
          { title: "Theo dõi tiến trình", alt: "Màn hình tiến trình Capple hiển thị chuỗi ngày duy trì, xu hướng cân nặng, calo trung bình tuần và lịch sử cân nặng", caption: "Cuộn bên trong điện thoại để xem xu hướng, mức trung bình tuần và lịch sử cân nặng." },
        ],
      },
      {
        category: "Theo dõi chu kỳ",
        title: "Theo dõi chu kỳ",
        description: "Xem lịch sử chu kỳ, các ngày dự kiến và giải thích từng giai đoạn. Tôi tự thiết kế và triển khai giao diện này trực tiếp trong app.",
        screens: [
          {
            title: "Tổng quan chu kỳ",
            alt: "Màn hình sức khỏe Capple với giai đoạn hiện tại, độ dài chu kỳ trước và độ dài kỳ kinh trước",
            caption: "Giai đoạn hiện tại và thông tin tổng hợp từ chu kỳ đã ghi nhận.",
          },
          {
            title: "Lịch chu kỳ",
            alt: "Lịch chu kỳ Capple với ngày hành kinh đã ghi, các ngày dự kiến và màu sắc phân biệt từng giai đoạn",
            caption: "Ngày hành kinh đã ghi và các ngày dự kiến hiển thị trên lịch tháng.",
          },
          {
            title: "Giải thích các giai đoạn",
            alt: "Hộp thoại Capple giải thích các màu sắc và ký hiệu của từng giai đoạn trên lịch chu kỳ",
            caption: "Xem ý nghĩa các màu sắc và ký hiệu ngay trong lịch chu kỳ.",
          },
        ],
      },
    ],
    stats: [
      { label: "Tổng người dùng", value: "10.000+" },
      { label: "Người dùng mua gói", value: "100+" },
      { label: "Nền tảng", value: "App Store · Google Play" },
    ],
  },
  wedream: {
    category: "Giấc mơ · AI", tagline: "Phân tích giấc mơ bằng AI",
    description: "Nhật ký giấc mơ với gợi ý diễn giải từ AI. Tôi xây dựng ứng dụng Flutter và backend Node.js/MongoDB từ đầu, tích hợp GPT-4o mini.",
    role: "Đồng sáng lập & Lập trình viên chính",
    responsibilities: "Xây dựng ứng dụng Flutter và backend Node.js/MongoDB; tổ chức mã nguồn theo Clean Architecture, quản lý trạng thái bằng Riverpod và kết nối qua REST API. Tích hợp GPT-4o mini, viết kiểm thử đơn vị, gỡ lỗi và phân tích hiệu năng.",
    chapters: [
      { title: "Nhật ký giấc mơ", description: "Mở lại nhật ký để đọc những giấc mơ đã ghi chép, kèm hình minh họa và gợi ý diễn giải." },
      { title: "Thêm giấc mơ", description: "Tạo một ghi chép mới, bắt đầu từ hình ảnh, sự việc hay cảm xúc còn đọng lại khi thức dậy." },
      { title: "Ghi lại giấc mơ", description: "Kể lại giấc mơ bằng lời của bạn. Bản xem trước mô phỏng thao tác nhập một câu chuyện vào nhật ký." },
      { title: "Bối cảnh & cảm xúc", description: "Chia sẻ cảm xúc trong giấc mơ và những điều đang diễn ra trong cuộc sống để AI có thêm bối cảnh khi phân tích." },
      { title: "Phân tích giấc mơ", description: "Xem bản tóm tắt, những hình ảnh nổi bật và các góc nhìn AI gợi ý về giấc mơ của bạn." },
    ],
    screens: [
      { alt: "Trang chủ WeDream với các thẻ nhật ký giấc mơ có minh họa và thanh điều hướng giấc mơ, âm thanh ngủ, báo cáo và hồ sơ", caption: "Nhật ký lưu lại những giấc mơ cùng gợi ý diễn giải của AI" },
      { alt: "Màn hình thêm giấc mơ WeDream với lời nhắc kể lại giấc mơ và bàn phím", caption: "Bắt đầu ghi chép khi những chi tiết vẫn còn rõ trong trí nhớ" },
      { alt: "Màn hình nhập giấc mơ WeDream kể về thư viện yên lặng, những cuốn sách lơ lửng và các trang sách thì thầm bí mật, bên trên bàn phím và nút tiếp tục", caption: "Bản xem trước thao tác ghi lại giấc mơ “Thư viện lơ lửng”" },
      { alt: "Màn hình Deep Insight của WeDream với lựa chọn cảm xúc, bối cảnh cuộc sống và học thuyết của Carl Jung, Alfred Adler, Sigmund Freud", caption: "Bổ sung cảm xúc và bối cảnh cuộc sống để khám phá thêm các góc nhìn về giấc mơ" },
      { alt: "Kết quả Thư viện lơ lửng trong WeDream với minh họa, tóm tắt giấc mơ, chỉ số cảm xúc, biểu tượng, diễn giải chi tiết và gợi ý", caption: "Cuộn bên trong điện thoại để đọc toàn bộ phần diễn giải giấc mơ" },
    ],
    features: [
      {
        category: "Báo cáo giấc mơ",
        title: "Điều gì trở lại trong giấc mơ?",
        description: "Nhìn lại lịch ghi chép và những cảm xúc, chủ đề được AI tổng hợp từ nhật ký. Báo cáo gợi ý những điểm lặp lại để bạn tự suy ngẫm.",
        screens: [{
          title: "Báo cáo giấc mơ của bạn",
          alt: "Báo cáo giấc mơ WeDream với lịch hoạt động, phần tổng hợp và biểu đồ ổn định, xung đột, căng thẳng, định hướng kèm chú giải",
          caption: "Cuộn bên trong điện thoại để xem toàn bộ báo cáo và chú giải các chỉ số",
        }],
      },
      {
        category: "Âm thanh thư giãn",
        title: "Thả lỏng trước giờ ngủ.",
        description: "Chọn tiếng mưa, tiếng chim, tiếng quạt hoặc tiếng ồn trắng để thư giãn trước khi ngủ. Trình phát có chế độ lặp và hẹn giờ tắt.",
        screens: [{
          title: "Ngày mưa",
          alt: "Trình phát âm thanh ngủ Rainy day trong WeDream với ảnh mưa, các lựa chọn âm thanh, nút phát, chế độ lặp và hẹn giờ",
          caption: "Bản xem trước trình phát tiếng mưa với chế độ lặp và hẹn giờ tắt",
        }],
      },
    ],
  },
  focuslock: {
    category: "Tập trung · iOS",
    tagline: "Ứng dụng giúp chủ động quản lý thời gian dùng điện thoại",
    description: "Ứng dụng iOS giúp chặn ứng dụng gây xao nhãng và giới hạn thời gian sử dụng. Tôi đang phát triển bằng Swift với sự hỗ trợ đáng kể của AI; demo hiển thị bản thiết kế.",
    role: "Dự án cá nhân · Phát triển bằng Swift",
    responsibilities: "Tôi dùng AI hỗ trợ đáng kể trong quá trình viết mã Swift. Dự án hiện hoàn thiện khoảng 60%; các màn hình giới thiệu ở đây là bản thiết kế và chưa phải tất cả đều đã được triển khai.",
    statusLabel: "Đang phát triển · khoảng 60%",
    chapters: [
      {
        title: "Tổng quan",
        description: "Xem thiết kế màn hình tổng hợp thời gian sử dụng, số lần cầm máy, thông báo và phiên tập trung hiện tại."
      },
      {
        title: "Chế độ chặn",
        description: "Ba lựa chọn trong thiết kế: chặn ứng dụng ngay, lên lịch chặn hoặc giới hạn thời gian sử dụng."
      },
      {
        title: "Thiết lập phiên",
        description: "Chọn thời lượng chặn, độ khó của thử thách mở khóa và đặt tên cho phiên tập trung."
      },
      {
        title: "Chọn ứng dụng",
        description: "Chọn ứng dụng hoặc nhóm ứng dụng cần hạn chế, đồng thời giữ lại những ứng dụng bạn vẫn cần dùng."
      },
      {
        title: "Thử thách mở khóa",
        description: "Thiết kế yêu cầu hoàn thành một bài toán hoặc thử thách vận động trước khi mở lại ứng dụng, tạo một khoảng dừng để bạn cân nhắc."
      }
    ],
    screens: [
      {
        alt: "Thiết kế tổng quan FocusLock với thời gian màn hình, lượt cầm máy, thông báo và bộ đếm phiên tập trung",
        caption: "Xem trước thiết kế — Thời gian sử dụng và phiên tập trung"
      },
      {
        alt: "Thiết kế menu FocusLock với chặn ngay, chặn theo lịch và giới hạn thời gian",
        caption: "Xem trước thiết kế — Chọn cách chặn"
      },
      {
        alt: "Thiết kế chặn ngay FocusLock với lựa chọn ứng dụng, thời lượng, độ khó và tên phiên",
        caption: "Xem trước thiết kế — Thiết lập phiên tập trung"
      },
      {
        alt: "Thiết kế chọn ứng dụng FocusLock với danh sách chặn, danh sách cho phép và các nhóm ứng dụng",
        caption: "Xem trước thiết kế — Chọn ứng dụng"
      },
      {
        alt: "Thiết kế màn khóa FocusLock với lựa chọn thử thách vận động hoặc toán trước khi mở lại ứng dụng",
        caption: "Xem trước thiết kế — Thử thách trước khi mở ứng dụng"
      }
    ],
    features: [
      {
        category: "Lịch chặn & giới hạn",
        title: "Đặt trước khoảng thời gian tập trung.",
        description: "Xem thiết kế lên lịch chặn, đặt giới hạn sử dụng mỗi ngày và áp dụng quy tắc theo vị trí. Bạn có thể điều chỉnh từng quy tắc khi cần.",
        screens: [
          {
            title: "Lên lịch chặn",
            alt: "Thiết kế lịch chặn FocusLock với giờ bắt đầu, kết thúc, lặp lại, độ khó và vị trí",
            caption: "Xem trước thiết kế — Lên lịch chặn"
          },
          {
            title: "Đặt giới hạn mỗi ngày",
            alt: "Thiết kế giới hạn sử dụng FocusLock với thời lượng, lặp lại, độ khó và vị trí",
            caption: "Xem trước thiết kế — Đặt giới hạn mỗi ngày"
          },
          {
            title: "Chọn khu vực",
            alt: "Thiết kế vị trí FocusLock với bản đồ, thanh bán kính và tùy chọn ngoài phạm vi",
            caption: "Xem trước thiết kế — Chọn khu vực"
          },
          {
            title: "Điều chỉnh quy tắc",
            alt: "Thiết kế chỉnh quy tắc FocusLock với ứng dụng, lịch chặn, độ khó, vị trí và công tắc kích hoạt",
            caption: "Xem trước thiết kế — Điều chỉnh quy tắc"
          }
        ]
      },
      {
        category: "Thử thách mở khóa",
        title: "Bạn có cần mở ứng dụng lúc này?",
        description: "Một bài toán hoặc vài động tác vận động tạo khoảng dừng trước khi quay lại ứng dụng. Bản thiết kế gồm cả trạng thái trả lời sai để người dùng thử lại.",
        screens: [
          {
            title: "Thử thách toán",
            alt: "Thiết kế thử thách toán FocusLock với phép tính và ba lựa chọn trả lời",
            caption: "Xem trước thiết kế — Thử thách toán"
          },
          {
            title: "Trả lời sai",
            alt: "Thiết kế thử thách toán FocusLock đánh dấu câu trả lời sai bằng màu đỏ",
            caption: "Xem trước thiết kế — Trả lời sai"
          },
          {
            title: "Thử thách vận động",
            alt: "Thiết kế thử thách vận động FocusLock với yêu cầu chống đẩy trên giao diện xem trước camera",
            caption: "Xem trước thiết kế — Thử thách vận động"
          }
        ]
      },
      {
        category: "Cá nhân hóa",
        title: "Theo dõi thời gian ngay trên màn khóa.",
        description: "Xem thiết kế tùy chỉnh màn khóa và bộ đếm thời gian qua Live Activity, giúp theo dõi phiên tập trung mà không cần mở lại ứng dụng.",
        screens: [
          {
            title: "Giao diện màn khóa",
            alt: "Thiết kế tùy chỉnh màn khóa FocusLock với nền, tiêu đề và định dạng chữ",
            caption: "Xem trước thiết kế — Giao diện màn khóa"
          },
          {
            title: "Xem trước Live Activity",
            alt: "Thiết kế Live Activity FocusLock với bộ đếm phiên, biểu tượng ứng dụng, bản xem thu gọn và công tắc hiển thị",
            caption: "Xem trước thiết kế — Bộ đếm phiên tập trung trên Live Activity"
          }
        ]
      },
      {
        category: "Báo cáo hằng ngày",
        title: "Thời gian của bạn đã đi đâu?",
        description: "Bản thiết kế báo cáo cho thấy thời gian dành cho từng ứng dụng, số lần cầm máy và thời điểm dùng điện thoại trong ngày.",
        screens: [
          {
            title: "Nhìn lại một ngày",
            alt: "Thiết kế báo cáo ngày FocusLock với thời gian màn hình, lượt cầm máy, thông báo, mức dùng ứng dụng và biểu đồ theo giờ",
            caption: "Xem trước thiết kế — Nhìn lại một ngày"
          }
        ]
      }
    ]
  },
};

// Keep paths, dimensions, animation settings and IDs shared across languages.
const viApps: AppCaseStudy[] = apps.map((app) => {
  const copy = vietnameseProjects[app.slug as keyof typeof vietnameseProjects];
  return {
    ...app, ...copy,
    // Merge per index so structure (screenCount) stays shared with English.
    chapters: app.chapters.map((chapter, index) => ({ ...chapter, ...copy.chapters[index] })),
    screens: app.screens.map((screen, index) => ({ ...screen, ...copy.screens[index] })),
    features: app.features?.map((feature, index) => ({
      ...feature, ...copy.features?.[index],
      screens: feature.screens.map((screen, screenIndex) => ({ ...screen, ...copy.features?.[index].screens[screenIndex] })),
    })),
  };
});

export function getApps(locale: Locale): AppCaseStudy[] {
  return locale === "vi" ? viApps : apps;
}
