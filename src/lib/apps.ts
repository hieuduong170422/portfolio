export type AppScreen = {
  src: string;
  alt: string;
  caption: string;
  /** The screenshot already contains the device's Dynamic Island. */
  hasDynamicIsland?: boolean;
  /** Enable native scrolling in the showcase using the source image's pixel dimensions. */
  scroll?: { width: number; height: number };
  /** Short label for the screen within a multi-screen showcase chapter. */
  step?: string;
  /** Optional interactive demo shown only inside a project showcase. */
  effect?: "food-scan" | "dream-typing" | "widgets" | "shop" | "home-menu";
  /** For `home-menu`: show the home screen with its log sheet raised. */
  menuOpen?: boolean;
};

export type AppFeature = {
  slug: string;
  title: string;
  category: string;
  description: string;
  coverIndex?: number;
  screens: (AppScreen & { title: string })[];
};

export type AppCaseStudy = {
  slug: string;
  name: string;
  shortName?: string;
  tagline: string;
  description: string;
  category: string;
  /** Each chapter covers the next `screenCount` screens (default 1), in order. */
  chapters: { title: string; description: string; screenCount?: number }[];
  role?: string;
  responsibilities?: string;
  /** Verified engineering figures, e.g. from the app's repository. */
  scale?: { label: string; value: string }[];
  /** Problems solved and systems shipped, one sentence each. */
  highlights?: string[];
  tech: string[];
  screens: AppScreen[];
  features?: AppFeature[];
  links: {
    appStore?: string;
    googlePlay?: string;
    website?: string;
    github?: string;
  };
  stats?: { label: string; value: string }[];
  statsNote?: string;
  status?: "live" | "design-only" | "in-development";
  statusLabel?: string;
};

export const apps: AppCaseStudy[] = [
  {
    slug: "capple",
    name: "Capple - AI Calorie Tracker",
    shortName: "Capple",
    category: "Nutrition · AI",
    chapters: [
      { title: "Overview", screenCount: 2, description: "Calories, macros, daily tasks and meals in one dashboard, and a single sheet for every way to log." },
      { title: "Log a meal", screenCount: 4, description: "Snap a photo, describe the meal in a chat or just say it. AI estimates calories and macros, and every ingredient stays editable before it reaches the diary." },
      { title: "Shop & app icons", description: "In-app coins buy alternate app icons or a mystery box with free scans or a logo. Tap a logo to buy or activate it, then swipe to the home screen: the Capple icon changes there, as it does on a real iPhone." },
      { title: "Widgets & reminders", description: "Native home-screen widgets in Swift (WidgetKit, iOS 16+) and Kotlin keep calories and streaks one glance away. Local reminders follow each user's time zone, react to calories logged so far and nudge inactive users after 3 and 7 days." },
    ],
    tagline: "AI-powered calorie & nutrition tracking app",
    description:
      "AI calorie tracker that logs meals from a photo, a text chat or voice. Live on iOS and Android with paying users. I lead app, backend and release work in a five-person team.",
    role: "Co-founder & Lead Developer",
    // Source: calories_app lib/features and lib/l10n.
    scale: [
      { label: "Feature modules", value: "8" },
      { label: "Languages, incl. RTL", value: "14" },
    ],
    highlights: [
      "Built the Flutter codebase with Clean Architecture across 8 feature modules (auth, food scan, nutrition, cycle tracking, cheat day, subscription, shop, student verification), localized into 14 languages including Arabic.",
      "Integrated Apple HealthKit and Health Connect for steps, workouts and cycle data, and built native home-screen widgets on iOS (Swift/WidgetKit, including an iOS 16+ lock-screen widget) and Android (Kotlin).",
      "Designed retention systems: streaks with freeze and auto-rescue, badges, a shop with mystery boxes, cycle tracking whose predictions improve with each logged month, and time-zone-aware local reminders with rotating copy and re-engagement nudges.",
      "Shipped growth loops: referral and gift codes via deep links, Strava-style meal sharing, and a student plan with OTP verification and regional pricing.",
      "Ran monetization experiments on free daily scan limits and instrumented funnels with Google Analytics for Firebase. Added force update, in-app update prompts and per-version What's New.",
      "Built the Node.js/MongoDB backend and GitLab CI/CD that deploys on pushes to dev. Manage App Store Connect and Google Play Console releases since July 2026.",
    ],
    tech: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Clean Architecture",
      "GoRouter",
      "Freezed",
      "Retrofit/Dio",
      "Swift · WidgetKit",
      "Kotlin · App Widgets",
      "HealthKit · Health Connect",
      "GPT-4o mini",
      "Firebase Analytics · FCM",
      "RevenueCat",
      "i18n (14 locales)",
      "Node.js",
      "MongoDB",
      "GitLab CI/CD",
    ],
    screens: [
      {
        src: "/images/capple/home-hook.png",
        hasDynamicIsland: true,
        alt: "Capple home screen showing the weekly calendar, remaining calories, macros, daily tasks and meals",
        caption: "Daily dashboard — calories, macros, tasks and meals",
        step: "Home",
        effect: "home-menu",
      },
      {
        src: "/images/capple/menu.png",
        hasDynamicIsland: true,
        alt: "Capple quick-add sheet with Voice log, Log food, Chat and Meal scan, plus weight, water, exercise and cycle tracking shortcuts",
        caption: "One sheet for every way to log — voice, search, chat or a meal photo",
        step: "Menu",
        effect: "home-menu",
        menuOpen: true,
      },
      {
        src: "/images/capple/scan.png",
        alt: "Capple AI camera scan screen pointed at a plate of food",
        caption: "AI food scan — point the camera at your meal",
        effect: "food-scan",
        step: "Scan",
      },
      {
        src: "/images/capple/scan-result.png",
        alt: "Capple scan result screen with calories, macros and editable ingredients",
        caption: "Instant nutrition breakdown with editable ingredients",
        scroll: { width: 393, height: 1159 },
        step: "Result",
      },
      {
        src: "/images/capple/chat-log.png",
        hasDynamicIsland: true,
        alt: "Capple chat reply estimating grilled chicken rice with vegetables at 350 g and 520 kcal, with protein and carbs and an Add to Diary button",
        caption: "Chat logging — describe a meal and get calories and macros back",
        step: "Chat",
      },
      {
        src: "/images/capple/voice.png",
        hasDynamicIsland: true,
        alt: "Capple voice logging sheet with a microphone, a Listening status and Cancel and Done buttons",
        caption: "Voice logging — speech-to-text turns a spoken meal into an entry",
        step: "Voice",
      },
      {
        src: "/images/capple/shop.jpg",
        hasDynamicIsland: true,
        alt: "Capple shop with twelve app icon logos priced in coins, a mystery box offering scans or a logo, and a Pay with coin button",
        caption: "Shop — buy a logo or open a mystery box with coins",
        effect: "shop",
      },
      {
        src: "/images/capple/widgets/ios-today.png",
        alt: "iPhone home screen with a swipeable Capple widget showing today's calories, streak, weight gain, weight loss and quick log, among grey placeholder apps, with Capple reminders arriving as banners",
        caption: "Home-screen widgets and adaptive reminders",
        effect: "widgets",
      },
    ],
    features: [
      {
        slug: "personalization",
        category: "Personalization",
        title: "A plan that starts with you.",
        description: "From your personal goal to daily calorie and macro targets, follow the six-step setup that makes Capple your own.",
        coverIndex: 5,
        screens: [
          {
            title: "Your goal",
            src: "/images/capple/target-goal.png",
            alt: "Capple goal selection with lose weight, maintain and gain weight options",
            caption: "Start by choosing the goal you want Capple to help you work toward.",
          },
          {
            title: "About you",
            src: "/images/capple/gender-birthday.png",
            alt: "Capple personalization screen with gender selection and a birthday wheel picker",
            caption: "Gender and birthday provide the starting details for your personalized plan.",
          },
          {
            title: "Height & weight",
            src: "/images/capple/height-weight.png",
            alt: "Capple height and weight pickers with metric and imperial units",
            caption: "Enter height and current weight in the units that work for you.",
          },
          {
            title: "Target weight",
            src: "/images/capple/target-weight.png",
            alt: "Capple target weight screen with a horizontal weight ruler",
            caption: "Set a target weight to give your plan a clear direction.",
          },
          {
            title: "Your pace",
            src: "/images/capple/pace.png",
            alt: "Capple pace selection with a goal timeline and an adjustable slider",
            caption: "Choose a pace and see how it changes your goal timeline.",
          },
          {
            title: "Your plan",
            src: "/images/capple/plan.png",
            alt: "Capple personalized plan summary showing a calorie target, protein, carbs, fats and BMI",
            caption: "The final summary brings calorie and macro targets together in one plan.",
          },
        ],
      },
      {
        slug: "daily-progress",
        category: "Daily progress",
        title: "Small steps. A clearer picture.",
        description: "Follow your streak, weight trend, weekly calorie average and weight history in one place.",
        screens: [
          {
            title: "Track your progress",
            src: "/images/capple/daily-progress.png",
            alt: "Capple progress screen showing a daily streak, weight trend, weekly average calories and weight history",
            caption: "Scroll inside the phone to explore your trends, weekly averages and weight history.",
            scroll: { width: 393, height: 1258 },
          },
        ],
      },
      {
        slug: "cycle",
        category: "Cycle tracking",
        title: "Cycle tracking",
        description: "View cycle history, estimated dates and phase explanations. I designed and built this interface directly in the app.",
        coverIndex: 1,
        screens: [
          {
            title: "Cycle overview",
            src: "/images/capple/cycle-overview.png",
            hasDynamicIsland: true,
            alt: "Capple health screen with a cycle summary, current phase, previous cycle length and period length",
            caption: "Current phase and a summary of previously recorded cycle data.",
          },
          {
            title: "Cycle calendar",
            src: "/images/capple/cycle-calendar.png",
            hasDynamicIsland: true,
            alt: "Capple cycle calendar with recorded period days, estimated dates and color-coded phases",
            caption: "Recorded period days and estimated dates in the monthly calendar.",
          },
          {
            title: "Phase guide",
            src: "/images/capple/cycle-phases.png",
            hasDynamicIsland: true,
            alt: "Capple dialog explaining the colors and symbols used for cycle phases in the calendar",
            caption: "An in-app guide to the calendar’s phase colors and symbols.",
          },
        ],
      },
    ],
    links: {
      appStore:
        "https://apps.apple.com/us/app/capple-ai-calorie-tracker/id6756963067",
      googlePlay: "https://play.google.com/store/apps/details?id=com.capple.app",
      website: "https://capple.app",
    },
    stats: [
      { label: "Total users", value: "10,000+" },
      { label: "Paying users", value: "100+" },
      { label: "Platform", value: "App Store · Google Play" },
    ],
    status: "live",
  },
  {
    slug: "wedream",
    name: "WeDream",
    category: "Dreams · AI",
    tagline: "AI-powered dream analysis",
    description: "A dream journal with AI-suggested interpretations. I built the Flutter app and Node.js/MongoDB backend, integrating GPT-4o mini.",
    role: "Co-founder & Lead Developer",
    responsibilities: "Flutter frontend · Node.js/MongoDB backend · Clean Architecture and Riverpod · REST API · GPT-4o mini integration · Unit testing, debugging and performance profiling",
    chapters: [
      { title: "Dream journal", description: "Revisit your dream journal through illustrated cards and a quick glimpse of each interpretation." },
      { title: "New entry", description: "Open a new entry and capture the details you still remember." },
      { title: "Write a dream", description: "Watch a dream take shape with a fast typing preview, from the first line to the final thought." },
      { title: "Context & feelings", description: "Add emotional context, connect the dream to everyday life and choose a lens for the interpretation." },
      { title: "AI interpretation", description: "Scroll through the dream summary, emotion and pattern metrics, symbols and detailed interpretation." },
    ],
    tech: ["Flutter", "Dart", "Riverpod", "Clean Architecture", "Node.js", "MongoDB", "REST API", "GPT-4o mini", "Flutter DevTools"],
    screens: [
      {
        src: "/images/wedream/home.png",
        alt: "WeDream home with illustrated dream journal cards and navigation for dreams, sleep sounds, reports and profile",
        caption: "Dream journal — revisit dreams and their interpretations",
      },
      {
        src: "/images/wedream/add-new.png",
        alt: "WeDream new dream entry with a Tell me about your dream prompt and an on-screen keyboard",
        caption: "Start a new entry while the details are still fresh",
      },
      {
        src: "/images/wedream/typing.png",
        alt: "WeDream dream entry describing a silent library with floating books and pages whispering secrets, above the keyboard and Continue button",
        caption: "Capture the dream — a fast typing preview of The Floating Library",
        effect: "dream-typing",
      },
      {
        src: "/images/wedream/deep-insight.png",
        alt: "WeDream Deep Insight screen with mood choices, life context and interpretation theories from Carl Jung, Alfred Adler and Sigmund Freud",
        caption: "Deep Insight — add feelings, real-life context and an interpretation lens",
      },
      {
        src: "/images/wedream/result.png",
        alt: "WeDream The Floating Library result with an illustration, dream summary, emotional metrics, symbols, detailed interpretation and suggestions",
        caption: "Scroll inside the phone to read the complete dream interpretation",
        scroll: { width: 786, height: 3228 },
      },
    ],
    features: [
      {
        slug: "dream-report",
        category: "Dream report",
        title: "See the patterns across your dreams.",
        description: "Review your dream activity and explore the report’s summaries of stability, conflict, stress and direction.",
        screens: [{
          title: "Your dream report",
          src: "/images/wedream/report.png",
          alt: "WeDream dream report with an activity calendar, insight summary and charts for stability, conflict, stress and direction, with explanatory tips",
          caption: "Scroll inside the phone to explore the complete report and its metric explanations",
          scroll: { width: 786, height: 2324 },
        }],
      },
      {
        slug: "sleep-sounds",
        category: "Sleep sounds",
        title: "Find the sound of a quieter night.",
        description: "Wind down with ambient sounds such as rain, birds, a fan or white noise, with repeat and sleep timer controls.",
        screens: [{
          title: "Rainy day",
          src: "/images/wedream/sleep-sounds.png",
          alt: "WeDream Rainy day sleep sound player with rainy artwork, sound choices, playback controls, repeat and a sleep timer",
          caption: "Sleep sounds — a preview of the Rainy day player, repeat and timer controls",
        }],
      },
    ],
    links: {},
  },
  {
    slug: "focuslock",
    name: "FocusLock",
    category: "Focus · iOS",
    tagline: "A Swift project for more focused days",
    description: "An iOS app for blocking distractions and limiting screen time. I’m building it in Swift with substantial AI coding assistance; the demo shows design previews.",
    role: "Personal project · Swift development",
    responsibilities: "Implementation in progress with substantial AI coding assistance. These design previews show the intended experience; feature completion varies.",
    status: "in-development",
    statusLabel: "In development · approximately 60%",
    chapters: [
      {
        title: "Dashboard",
        description: "A dashboard design for screen time, pickups, notifications and the current focus session."
      },
      {
        title: "Blocking modes",
        description: "Explore the entry points for blocking now, scheduling a block or setting a usage limit."
      },
      {
        title: "Session setup",
        description: "Preview a session’s duration, difficulty and name before saving a rule."
      },
      {
        title: "App selection",
        description: "Browse the app and category selector, with blocklist and allowlist views."
      },
      {
        title: "Unlock challenges",
        description: "The lock screen concept introduces a math or exercise challenge before returning to an app."
      }
    ],
    tech: [
      "Swift"
    ],
    screens: [
      {
        src: "/images/focuslock/home.png",
        alt: "FocusLock dashboard design with screen time, pickups, notifications and an active focus timer",
        caption: "Design preview — Your focus dashboard",
        scroll: {
          width: 1179,
          height: 2832
        }
      },
      {
        src: "/images/focuslock/add.png",
        alt: "FocusLock menu design offering Block Now, Schedule Block and Set Time Limits",
        caption: "Design preview — Choose a blocking mode"
      },
      {
        src: "/images/focuslock/block-now.png",
        alt: "FocusLock Block Now design with app selection, duration, difficulty and a session name",
        caption: "Design preview — Set up a focus session",
        scroll: {
          width: 1179,
          height: 2799
        }
      },
      {
        src: "/images/focuslock/app-block.png",
        alt: "FocusLock app selection design with blocklist and allowlist tabs and app categories",
        caption: "Design preview — Choose the apps",
        scroll: {
          width: 1179,
          height: 3015
        }
      },
      {
        src: "/images/focuslock/lock-screen.png",
        alt: "FocusLock lock screen design offering exercise or math challenges before reopening an app",
        caption: "Design preview — Pause before reopening"
      }
    ],
    features: [
      {
        slug: "focus-rules",
        category: "Schedules & limits",
        title: "Make room for focused time.",
        description: "Designs for scheduled blocking, daily usage limits, location rules and editing an existing block.",
        screens: [
          {
            src: "/images/focuslock/schedule.png",
            title: "Schedule a block",
            alt: "FocusLock schedule design with start and end times, repeat, difficulty and location settings",
            caption: "Design preview — Schedule a block",
            scroll: {
              width: 1179,
              height: 2955
            }
          },
          {
            src: "/images/focuslock/time-limit.png",
            title: "Set a daily limit",
            alt: "FocusLock usage limit design with a duration picker, repeat, difficulty and location settings",
            caption: "Design preview — Set a daily limit",
            scroll: {
              width: 1179,
              height: 3357
            }
          },
          {
            src: "/images/focuslock/select-area.png",
            title: "Choose an area",
            alt: "FocusLock location design with a map, radius slider and outside-the-radius option",
            caption: "Design preview — Choose an area"
          },
          {
            src: "/images/focuslock/edit.png",
            title: "Adjust a rule",
            alt: "FocusLock rule editor design with selected apps, a schedule, difficulty, location and enabled toggle",
            caption: "Design preview — Adjust a rule",
            scroll: {
              width: 1179,
              height: 3552
            }
          }
        ]
      },
      {
        slug: "unlock-challenges",
        category: "Unlock challenges",
        title: "A moment to reconsider.",
        description: "Explore the intended math and exercise challenges, including feedback for an incorrect answer.",
        screens: [
          {
            src: "/images/focuslock/math.png",
            title: "Math challenge",
            alt: "FocusLock math challenge design showing an equation and three answer choices",
            caption: "Design preview — Math challenge"
          },
          {
            src: "/images/focuslock/math-fail.png",
            title: "Incorrect answer",
            alt: "FocusLock math challenge design highlighting an incorrect answer in red",
            caption: "Design preview — Incorrect answer"
          },
          {
            src: "/images/focuslock/exercise.png",
            title: "Exercise challenge",
            alt: "FocusLock exercise challenge design with a push-up prompt over a camera-style preview",
            caption: "Design preview — Exercise challenge"
          }
        ]
      },
      {
        slug: "focus-customization",
        category: "Personalization",
        title: "Keep focus in view.",
        description: "Preview the lock screen styling controls and the proposed Live Activity presentation.",
        screens: [
          {
            src: "/images/focuslock/block-style.png",
            title: "Lock screen style",
            alt: "FocusLock lock screen customization design with background, title and text styling controls",
            caption: "Design preview — Lock screen style"
          },
          {
            src: "/images/focuslock/live-activity.png",
            title: "Live Activity preview",
            alt: "FocusLock Live Activity design with a session timer, app icons, compact preview and visibility toggle",
            caption: "Design preview — Live Activity preview"
          }
        ]
      },
      {
        slug: "focus-report",
        category: "Daily report",
        title: "Understand where the time goes.",
        description: "The report design brings app usage, pickups, notifications and hourly screen time into one view.",
        screens: [
          {
            src: "/images/focuslock/report.png",
            title: "Your day in focus",
            alt: "FocusLock daily report design with screen time, pickups, notifications, app usage and an hourly chart",
            caption: "Design preview — Your day in focus",
            scroll: {
              width: 1179,
              height: 3261
            }
          }
        ]
      }
    ],
    links: {}
  },
];
