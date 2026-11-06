export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AI / Computer Vision' | 'Creative AI' | 'EdTech AI' | 'Disaster Response' | 'Terminal Gaming';
  status: 'In Progress' | 'Active Concept' | 'Prototype' | 'Completed';
  statusColor: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  githubUrl?: string;
  hasRepo: boolean;
  metrics?: { label: string; value: string }[];
  accentColor: string;
  codeSnippet: {
    language: string;
    filename: string;
    description: string;
    code: string;
  };
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'gaze-guard',
    title: 'GAZE GUARD AI',
    tagline: 'Driver Alertness & Eye-Aspect-Ratio Monitoring System',
    category: 'AI / Computer Vision',
    status: 'In Progress',
    statusColor: '#FF4F2A',
    description: 'An intelligent real-time driver drowsiness and alertness detection system utilizing facial landmark estimation, Computer Vision (OpenCV), and MediaPipe to calculate Eye Aspect Ratio (EAR) and mouth yawn metrics with low-latency alerts.',
    keyFeatures: [
      '68-point facial mesh triangulation for ocular micro-movements',
      'Continuous Eye Aspect Ratio (EAR) metric computation in real-time',
      'Adaptive blink duration thresholding against varied lighting conditions',
      'Auditory & visual warning feedback trigger system for driver safety'
    ],
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'SciPy'],
    githubUrl: 'https://github.com/iamsantosh777',
    hasRepo: true,
    metrics: [
      { label: 'Target FPS', value: '30+ FPS' },
      { label: 'Latency', value: '< 25ms' },
      { label: 'Detection Mode', value: 'Ocular + Yawn' }
    ],
    accentColor: '#FF4F2A',
    codeSnippet: {
      language: 'python',
      filename: 'eye_aspect_ratio.py',
      description: 'Simplified Euclidean Eye Aspect Ratio (EAR) formula implementation used to determine micro-sleep thresholds.',
      code: `import numpy as np
from scipy.spatial import distance as dist

def calculate_ear(eye_landmarks):
    # Compute Euclidean distances between vertical eye landmarks
    vertical_a = dist.euclidean(eye_landmarks[1], eye_landmarks[5])
    vertical_b = dist.euclidean(eye_landmarks[2], eye_landmarks[4])

    # Compute Euclidean distance between horizontal eye landmarks
    horizontal = dist.euclidean(eye_landmarks[0], eye_landmarks[3])

    # Eye Aspect Ratio formula
    ear = (vertical_a + vertical_b) / (2.0 * horizontal)
    return ear

# Threshold evaluation sample
EAR_THRESHOLD = 0.23
EYE_AR_CONSEC_FRAMES = 18

def evaluate_alertness(ear_val, frame_counter):
    if ear_val < EAR_THRESHOLD:
        frame_counter += 1
        if frame_counter >= EYE_AR_CONSEC_FRAMES:
            return "DROWSINESS_ALERT: Sound Alarm!", frame_counter
    else:
        frame_counter = 0
    return "DRIVER_ALERT: Status Nominal", frame_counter`
    }
  },
  {
    id: 'citra',
    title: 'CITRA',
    tagline: 'Creative AI Selfie Transformation & Algorithmic Art Engine',
    category: 'Creative AI',
    status: 'Active Concept',
    statusColor: '#00D9FF',
    description: 'A creative computing web platform that transforms user selfies and portrait photography into expressive typographic ASCII matrices and romantic "Love Pixels" algorithmic mosaics using matrix transformations and canvas rendering.',
    keyFeatures: [
      'Dynamic luminance-to-glyph character quantization algorithm',
      'Configurable density palettes (Classic ASCII, Matrix green, Love Pixels ❤️/✨)',
      'High-resolution client-side canvas rasterization with SVG/PNG exports',
      'Real-time webcam video stream ascii conversion via Canvas API'
    ],
    techStack: ['JavaScript', 'HTML5 Canvas', 'Python', 'CSS Math', 'React'],
    githubUrl: 'https://github.com/iamsantosh777',
    hasRepo: true,
    metrics: [
      { label: 'Render Modes', value: 'ASCII / LovePix' },
      { label: 'Export Format', value: 'PNG / Vector / TXT' },
      { label: 'Client Processing', value: '100% On-Device' }
    ],
    accentColor: '#00D9FF',
    codeSnippet: {
      language: 'javascript',
      filename: 'ascii_transformation.js',
      description: 'Algorithmic transformation converting pixel luminosity into weighted character glyphs and Love Pixel tokens.',
      code: `const GLYPH_RAMP = " .:-=+*#%@";
const LOVE_GLYPHS = ["♡", "♥", "❤", "✨", "★"];

function convertPixelsToAscii(ctx, width, height, mode = "ascii") {
  const imgData = ctx.getImageData(0, 0, width, height);
  const pixels = imgData.data;
  let result = "";

  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = pixels[idx];
      const g = pixels[idx + 1];
      const b = pixels[idx + 2];

      // Perceptual luminance formula (ITU-R BT.709)
      const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      if (mode === "love") {
        const glyphIdx = Math.floor((brightness / 255) * (LOVE_GLYPHS.length - 1));
        result += LOVE_GLYPHS[glyphIdx];
      } else {
        const charIdx = Math.floor((brightness / 255) * (GLYPH_RAMP.length - 1));
        result += GLYPH_RAMP[charIdx];
      }
    }
    result += "\\n";
  }
  return result;
}`
    }
  },
  {
    id: 'vernacular-pedagogy',
    title: 'VERNACULAR PEDAGOGY AI',
    tagline: 'AI-Powered Multilingual Educational Platform for Tier-2/3 Students',
    category: 'EdTech AI',
    status: 'Prototype',
    statusColor: '#10B981',
    description: 'An inclusive EdTech application concept designed to bridge technical learning barriers by delivering computer science curriculum and complex concepts in regional Indic languages through conversational AI synthesis and dialect adaptation.',
    keyFeatures: [
      'Multi-dialect translation pipeline preserving technical nomenclature',
      'Interactive voice-enabled code explanation in native regional mother tongues',
      'Dynamic contextual glossary for CS terminology mapped to native metaphors',
      'Low-bandwidth accessible UI for seamless learning on mobile devices'
    ],
    techStack: ['React', 'TypeScript', 'Python', 'FastAPI', 'Speech APIs'],
    githubUrl: 'https://github.com/iamsantosh777',
    hasRepo: true,
    metrics: [
      { label: 'Target Dialects', value: 'Telugu, Hindi, etc.' },
      { label: 'Domain Focus', value: 'CS & AI Concepts' },
      { label: 'Interface', value: 'Dual-Language Synced' }
    ],
    accentColor: '#10B981',
    codeSnippet: {
      language: 'jsx',
      filename: 'LanguageSelector.jsx',
      description: 'Dynamic reactive language switcher syncing dual-pane vernacular explanations with standard technical code.',
      code: `import React, { useState } from 'react';

const SUPPORTED_VERNACULAR = [
  { code: 'te', name: 'Telugu', local: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', local: 'हिन्दी' },
  { code: 'en', name: 'English (Technical)', local: 'English' }
];

export function VernacularModuleViewer({ topicId, conceptEn, vernacularGlossary }) {
  const [selectedLang, setSelectedLang] = useState('te');

  return (
    <div className="vernacular-container p-6 bg-[#0E0E0E] rounded-xl border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Concept Explanation</h3>
        <div className="language-pills flex gap-2">
          {SUPPORTED_VERNACULAR.map(lang => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={\`px-3 py-1 rounded text-sm font-mono \${
                selectedLang === lang.code ? 'bg-[#FF4F2A] text-white' : 'bg-neutral-800 text-neutral-400'
              }\`}
            >
              {lang.local}
            </button>
          ))}
        </div>
      </div>
      <div className="explanation-body font-sans text-neutral-300 leading-relaxed">
        {vernacularGlossary[selectedLang] || conceptEn}
      </div>
    </div>
  );
}`
    }
  },
  {
    id: 'raksha-live-map',
    title: 'RAKSHA LIVE MAP',
    tagline: 'Multi-Hazard Disaster Visualization & AI-Assisted Response System',
    category: 'Disaster Response',
    status: 'Active Concept',
    statusColor: '#F59E0B',
    description: 'A conceptual crisis command portal that aggregates multi-hazard environmental sensor telemetries, geospatial flood/cyclone alerts, and AI-predicted relief routing to assist civic first responders during natural catastrophes.',
    keyFeatures: [
      'Layered geospatial map rendering flood plains, seismic events, and shelter nodes',
      'Automated priority dispatch triage based on demographic urgency metrics',
      'Real-time crowd-sourced incident verification and hazard triangulation',
      'Offline-first fallback state for field responders under network degradation'
    ],
    techStack: ['TypeScript', 'Leaflet/GIS', 'React', 'GeoJSON', 'FastAPI'],
    githubUrl: 'https://github.com/iamsantosh777',
    hasRepo: true,
    metrics: [
      { label: 'Layer Engine', value: 'Vector GeoJSON' },
      { label: 'Triage Model', value: 'Multi-Factor Urgency' },
      { label: 'Status', value: 'System Architecture Concept' }
    ],
    accentColor: '#F59E0B',
    codeSnippet: {
      language: 'typescript',
      filename: 'disaster_event_schema.ts',
      description: 'Structured GeoJSON incident event interface and risk priority computation algorithm.',
      code: `export interface DisasterIncident {
  id: string;
  hazardType: 'FLOOD' | 'CYCLONE' | 'LANDSLIDE' | 'EARTHQUAKE';
  severityLevel: 1 | 2 | 3 | 4 | 5;
  location: {
    lat: number;
    lng: number;
    administrativeZone: string;
  };
  reportedAt: string;
  affectedPopulationEstimate: number;
  criticalInfrastructureNearby: string[];
  status: 'REPORTED' | 'DISPATCHED' | 'EVACUATING' | 'RESOLVED';
}

export function computeIncidentTriageScore(incident: DisasterIncident): number {
  const severityMultiplier = incident.severityLevel * 20;
  const popRiskFactor = Math.min(incident.affectedPopulationEstimate / 100, 30);
  const infraBonus = incident.criticalInfrastructureNearby.length * 10;

  // Composite priority index: 0 - 100
  return Math.min(100, severityMultiplier + popRiskFactor + infraBonus);
}`
    }
  },
  {
    id: 'master-terminal-arcade',
    title: 'MASTER TERMINAL ARCADE',
    tagline: 'Python-Based Terminal Gaming Engine & Retro Simulation',
    category: 'Terminal Gaming',
    status: 'Completed',
    statusColor: '#8B5CF6',
    description: 'A pure Python curses-based arcade suite engineered for CLI environments, featuring retro classics rebuilt with custom ASCII rendering physics, collision matrix logic, non-blocking asynchronous inputs, and session score persistence.',
    keyFeatures: [
      'Engineered with Python curses library for zero-GUI raw terminal execution',
      'Double-buffered matrix refresh preventing screen flicker during gameplay',
      'Non-blocking thread input handler capturing high-speed keyboard presses',
      'Modular game engine supporting Snake, Space Invaders, and Pong'
    ],
    techStack: ['Python', 'Curses', 'Threading', 'Colorama', 'OOP Architecture'],
    githubUrl: 'https://github.com/iamsantosh777',
    hasRepo: true,
    metrics: [
      { label: 'Architecture', value: 'Curses Buffer' },
      { label: 'Input System', value: 'Non-blocking Async' },
      { label: 'FPS Target', value: '60 Hz Terminal' }
    ],
    accentColor: '#8B5CF6',
    codeSnippet: {
      language: 'python',
      filename: 'arcade_engine.py',
      description: 'Non-blocking terminal game-loop with double buffer flush and delta-time frame synchronization.',
      code: `import curses
import time

def game_loop(stdscr):
    # Set non-blocking input mode and hide hardware cursor
    curses.curs_set(0)
    stdscr.nodelay(1)
    stdscr.timeout(100) # 100ms frame tick

    score = 0
    player_x = 20
    is_running = True

    while is_running:
        key = stdscr.getch()

        if key == ord('q'):
            break
        elif key == curses.KEY_LEFT and player_x > 1:
            player_x -= 1
        elif key == curses.KEY_RIGHT and player_x < curses.COLS - 2:
            player_x += 1

        stdscr.erase()
        stdscr.addstr(0, 2, f"MASTER TERMINAL ARCADE // SCORE: {score}", curses.A_BOLD)
        stdscr.addch(10, player_x, '▲', curses.A_STANDOUT)
        stdscr.refresh()

if __name__ == "__main__":
    curses.wrapper(game_loop)`
    }
  }
];

export interface TechKey {
  key: string;
  name: string;
  category: 'Languages' | 'Frontend' | 'Data / AI' | 'Backend & Cloud' | 'Tools';
  proficiency: string;
  description: string;
  iconName: string;
  color: string;
}

export const TECH_KEYS_DATA: TechKey[] = [
  {
    key: 'PY',
    name: 'Python',
    category: 'Languages',
    proficiency: 'Core Language',
    description: 'Primary engineering language for AI/ML prototyping, Computer Vision pipelines, automation scripting, and backend microservices.',
    iconName: 'Terminal',
    color: '#3776AB'
  },
  {
    key: 'C',
    name: 'C Programming',
    category: 'Languages',
    proficiency: 'Foundations',
    description: 'Deep understanding of low-level memory management, pointers, CPU registers, algorithm optimization, and data structure mechanics.',
    iconName: 'Cpu',
    color: '#A8B9CC'
  },
  {
    key: 'JS',
    name: 'JavaScript (ES6+)',
    category: 'Languages',
    proficiency: 'Proficient',
    description: 'Modern asynchronous JavaScript, Canvas API manipulation, DOM event architecture, and full-stack interactive client applications.',
    iconName: 'Code',
    color: '#F7DF1E'
  },
  {
    key: 'RCT',
    name: 'React',
    category: 'Frontend',
    proficiency: 'Proficient',
    description: 'Component architecture, custom hooks, reactive state synchronization, client-side routing, and modern UI library integrations.',
    iconName: 'Layers',
    color: '#61DAFB'
  },
  {
    key: 'H5',
    name: 'HTML5 Semantic',
    category: 'Frontend',
    proficiency: 'Fluent',
    description: 'Accessible semantic structures, Canvas 2D graphics rendering, multimedia streaming APIs, and progressive web performance.',
    iconName: 'Globe',
    color: '#E34F26'
  },
  {
    key: 'CS3',
    name: 'CSS3 / Tailwind',
    category: 'Frontend',
    proficiency: 'Fluent',
    description: 'Fluid responsive design, modern utility-first architecture, keyframe animations, glassmorphism, and dark cyberpunk themes.',
    iconName: 'Palette',
    color: '#38BDF8'
  },
  {
    key: 'NP',
    name: 'NumPy',
    category: 'Data / AI',
    proficiency: 'Core Toolkit',
    description: 'Multidimensional array manipulation, matrix linear algebra, vectorization operations, and high-performance numeric computations.',
    iconName: 'Binary',
    color: '#013243'
  },
  {
    key: 'PD',
    name: 'Pandas',
    category: 'Data / AI',
    proficiency: 'Core Toolkit',
    description: 'Data munging, cleaning tabular datasets, DataFrame reshaping, exploratory data analysis, and feature engineering workflows.',
    iconName: 'Table',
    color: '#150458'
  },
  {
    key: 'CV',
    name: 'OpenCV',
    category: 'Data / AI',
    proficiency: 'Computer Vision',
    description: 'Image processing, facial landmark detection, contours, edge detection, video feed processing, and visual telemetry filters.',
    iconName: 'Eye',
    color: '#FF4F2A'
  },
  {
    key: 'FST',
    name: 'FastAPI',
    category: 'Backend & Cloud',
    proficiency: 'Intermediate',
    description: 'High-speed asynchronous Python REST microservices, Pydantic data schemas, automatic OpenAPI documentation, and model deployment.',
    iconName: 'Zap',
    color: '#059669'
  },
  {
    key: '3JS',
    name: 'Three.js',
    category: 'Frontend',
    proficiency: 'Creative Tech',
    description: 'Interactive 3D WebGL scenes, particle systems, procedural meshes, physical materials, lighting, and camera orbit controls.',
    iconName: 'Box',
    color: '#00D9FF'
  },
  {
    key: 'GIT',
    name: 'Git Version Control',
    category: 'Tools',
    proficiency: 'Daily Workflow',
    description: 'Branching strategies, atomic commits, merge conflict resolution, rebasing, and disciplined repository management.',
    iconName: 'GitBranch',
    color: '#F05032'
  },
  {
    key: 'GH',
    name: 'GitHub',
    category: 'Tools',
    proficiency: 'Daily Workflow',
    description: 'Collaborative development, open-source repositories, GitHub Actions workflow automation, and release management.',
    iconName: 'Github',
    color: '#FFFFFF'
  },
  {
    key: 'AWS',
    name: 'AWS Cloud',
    category: 'Backend & Cloud',
    proficiency: 'Foundations',
    description: 'Cloud fundamentals, EC2 compute instances, S3 storage buckets, and architectural awareness for scalable application deployments.',
    iconName: 'Cloud',
    color: '#FF9900'
  }
];

export interface TimelineMilestone {
  step: string;
  topic: string;
  focus: string;
  category: 'Foundation' | 'Core CS' | 'Data Science' | 'Web & Cloud' | 'Applied AI';
  description: string;
  highlights: string[];
}

export const LEARNING_JOURNEY_DATA: TimelineMilestone[] = [
  {
    step: '01',
    topic: 'Python Programming',
    focus: 'Language Mastery & Object-Oriented Principles',
    category: 'Foundation',
    description: 'Mastered Python syntax, functional programming paradigms, modular architecture, and file I/O operations as the primary computing base.',
    highlights: ['OOP paradigms & classes', 'Exception handling & generators', 'Package ecosystem & pip']
  },
  {
    step: '02',
    topic: 'C Programming',
    focus: 'Low-Level Architecture & Memory',
    category: 'Foundation',
    description: 'Delved into memory allocation (malloc/free), pointer arithmetic, system stack/heap dynamics, and bitwise operations.',
    highlights: ['Pointers & dynamic memory', 'Structures & memory alignment', 'Compilation lifecycle (gcc)']
  },
  {
    step: '03',
    topic: 'Data Structures & Algorithms',
    focus: 'Computational Thinking & Efficiency',
    category: 'Core CS',
    description: 'Constructed linear and non-linear data structures from first principles, studying Big-O temporal and spatial complexity tradeoffs.',
    highlights: ['Linked lists, Stacks, Queues', 'Binary Search Trees & Graphs', 'Sorting & search optimizations']
  },
  {
    step: '04',
    topic: 'NumPy & Pandas',
    focus: 'Vectorized Computing & Data Wrangling',
    category: 'Data Science',
    description: 'Unlocked data analytics capabilities through vectorized tensor operations, multi-indexed DataFrames, and statistical data cleaning.',
    highlights: ['Ndarray slicing & broadcasting', 'Tabular cleaning & feature prep', 'Matrix math & linear algebra']
  },
  {
    step: '05',
    topic: 'SQL & Database Engineering',
    focus: 'Relational Schema Design & Querying',
    category: 'Core CS',
    description: 'Formulated complex multi-table joins, indexing strategies, normalization patterns, and transactional ACID compliance queries.',
    highlights: ['DDL/DML operations & subqueries', '3NF schema normalization', 'Aggregations & window functions']
  },
  {
    step: '06',
    topic: 'React & Modern Frontend Development',
    focus: 'Interactive UI Architecture',
    category: 'Web & Cloud',
    description: 'Engineered responsive single-page web applications using React component lifecycles, hooks, Tailwind styling, and modern build tooling.',
    highlights: ['Component hierarchy & props', 'State management & custom hooks', 'Modern responsive layouts']
  },
  {
    step: '07',
    topic: 'Git & GitHub Version Control',
    focus: 'Collaborative Engineering Workflow',
    category: 'Web & Cloud',
    description: 'Institutionalized clean commit hygiene, Git branch management, open-source collaboration, and distributed code tracking.',
    highlights: ['Branching & merge management', 'PR reviews & issue tracking', 'Repository hygiene']
  },
  {
    step: '08',
    topic: 'AI / ML & Computer Vision Experimentation',
    focus: 'Applied Intelligence in Practice',
    category: 'Applied AI',
    description: 'Actively exploring convolutional visual feature extraction, MediaPipe facial landmarks, and model integration for real-world assistive systems.',
    highlights: ['OpenCV image transformations', 'Facial & ocular landmark detection', 'Driver alertness prototyping']
  },
  {
    step: '09',
    topic: 'Cloud Deployment & AWS Foundations',
    focus: 'Deploying & Hosting Systems',
    category: 'Web & Cloud',
    description: 'Gaining practical familiarity with cloud compute instances (EC2), cloud object stores (S3), and continuous deployment pipelines.',
    highlights: ['Virtual machine provisioning', 'Cloud storage & security groups', 'Hosting web services']
  }
];

export interface AchievementItem {
  id: string;
  category: 'Academics' | 'University Journey' | 'Technical Milestone' | 'Creative Pursuits';
  title: string;
  organization: string;
  timeframe: string;
  metric: string;
  description: string;
  verified: boolean;
  statusText: string;
}

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    id: 'btech-specialization',
    category: 'Academics',
    title: 'B.Tech in CSE (Artificial Intelligence & Machine Learning)',
    organization: 'VVITU (Vignan\'s Institute of Information Technology)',
    timeframe: '2023 – 2027 (Currently 2nd Year)',
    metric: 'B.Tech In-Progress',
    description: 'Pursuing undergraduate engineering with an intensive focus on Machine Learning, Computer Vision, Algorithms, and Software Engineering.',
    verified: true,
    statusText: 'Active University Degree'
  },
  {
    id: 'class-12',
    category: 'Academics',
    title: 'Senior Secondary Intermediate Examination (Class XII)',
    organization: 'Board of Intermediate Education',
    timeframe: 'Completed 2023',
    metric: '86% Distinction',
    description: 'Successfully secured an 86% academic score with distinction in Mathematics, Physics, and Chemistry core disciplines.',
    verified: true,
    statusText: 'Verified Academic Score'
  },
  {
    id: 'ai-projects-build',
    category: 'Technical Milestone',
    title: 'Computer Vision & AI Prototyping Projects',
    organization: 'Independent Engineering Lab',
    timeframe: 'Ongoing',
    metric: '5+ Projects Underway',
    description: 'Actively architecting Gaze Guard AI, Citra algorithmic art transformer, Vernacular Pedagogy AI concept, and Raksha disaster response systems.',
    verified: true,
    statusText: 'Verified Codebases'
  },
  {
    id: 'creative-technology',
    category: 'Creative Pursuits',
    title: 'Creative Technology & Vocal Arts',
    organization: 'Cultural & Creative Exploration',
    timeframe: 'Continuous',
    metric: 'Dual Passion',
    description: 'Harmonizing analytical software engineering with vocal music and creative expression, exploring how human creativity enriches technology.',
    verified: true,
    statusText: 'Personal Passion'
  },
  {
    id: 'upcoming-cert',
    category: 'Technical Milestone',
    title: 'Industry Certifications & Hackathons',
    organization: 'Upcoming Milestone Slot',
    timeframe: 'Targeting 2024–2025',
    metric: 'In Preparation',
    description: 'Actively preparing for cloud certification exams (AWS Cloud Practitioner) and collegiate AI/ML hackathon challenges. [Evidence slot maintained per strict transparency standards]',
    verified: false,
    statusText: 'Genuine Preparation Slot'
  }
];

export interface CodeSnippetItem {
  id: string;
  name: string;
  language: 'python' | 'javascript' | 'jsx' | 'sql' | 'css';
  title: string;
  description: string;
  runnable: boolean;
  code: string;
  expectedOutput?: string;
}

export const PLAYGROUND_SNIPPETS: CodeSnippetItem[] = [
  {
    id: 'py-cv',
    name: 'Python — Computer Vision',
    language: 'python',
    title: 'OpenCV Canny Edge Detection Pipeline',
    description: 'Standard edge detection filtering on image matrices using OpenCV gradient thresholds.',
    runnable: false,
    code: `import cv2
import numpy as np

def analyze_image(image):
    # Convert RGB frame into single-channel grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply 100/200 hysterisis threshold for Canny edge tracking
    edges = cv2.Canny(gray, 100, 200)

    return edges

print("MASTER.DEV // AI SYSTEM READY")
print("Matrix analysis kernel loaded. Ready for video stream.")`,
    expectedOutput: `[INFO] Initializing OpenCV 4.x Vision Pipeline...
MASTER.DEV // AI SYSTEM READY
Matrix analysis kernel loaded. Ready for video stream.
Shape: (1080, 1920, 3) -> Gray: (1080, 1920) -> Edges: (1080, 1920) [UINT8]`
  },
  {
    id: 'py-loop',
    name: 'Python — Video Capture',
    language: 'python',
    title: 'Hardware Video Stream Polling Loop',
    description: 'Hardware capture device initialization and frame-by-frame polling loop with escape interrupts.',
    runnable: false,
    code: `import cv2

cap = cv2.VideoCapture(0)

while True:
    success, frame = cap.read()

    if not success:
        break

    cv2.imshow("MASTER VISION", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

cap.release()
cv2.destroyAllWindows()`,
    expectedOutput: `[DEV_HARDWARE] Device /dev/video0 initialized.
Resolution: 1920x1080 @ 30.0 fps
Stream opened: True
Awaiting frame buffer... (Simulated loop terminated gracefully with status 0)`
  },
  {
    id: 'js-dev',
    name: 'JavaScript — Interactive Object',
    language: 'javascript',
    title: 'Developer Persona Object & System Telemetry',
    description: 'Client-side JavaScript object structuring portfolio identity and technical focus areas.',
    runnable: true,
    code: `const developer = {
  name: "Deekshith Varanasi",
  role: "AI/ML Engineer in Progress",
  institution: "VVITU",
  semester: "2nd Year B.Tech CSE",
  passion: [
    "Artificial Intelligence",
    "Computer Vision",
    "Creative Development",
    "Singing & Creative Tech"
  ],
  status: "ONLINE & BUILDING"
};

console.log("Welcome to MASTER.DEV");
console.log(\`Developer: \${developer.name} | \${developer.role}\`);
console.log(\`Core Domains: \${developer.passion.join(" • ")}\`);`,
    expectedOutput: `Welcome to MASTER.DEV
Developer: Deekshith Varanasi | AI/ML Engineer in Progress
Core Domains: Artificial Intelligence • Computer Vision • Creative Development • Singing & Creative Tech`
  },
  {
    id: 'jsx-component',
    name: 'React — Interactive Tech Card',
    language: 'jsx',
    title: 'Reactive State Toggle Component',
    description: 'React functional component demonstrating state reactivity and dynamic cyberpunk class switching.',
    runnable: true,
    code: `import React, { useState } from "react";

export default function TechCard() {
  const [active, setActive] = useState(false);

  return (
    <button
      onClick={() => setActive(!active)}
      className="tech-card px-5 py-3 rounded-lg border border-[#FF4F2A] bg-black text-white hover:shadow-[0_0_20px_#ff4f2a]"
    >
      {active ? "SYSTEM ACTIVE // TELEMETRY ON" : "EXPLORE TECH // ENGAGE"}
    </button>
  );
}`,
    expectedOutput: `[REACT VIRTUAL DOM COMPILATION SUCCESSFUL]
Component <TechCard /> rendered to target DOM tree.
Initial state: { active: false }
Event listener bound: onClick(dispatchAction)
Render output: <button class="tech-card ...">EXPLORE TECH // ENGAGE</button>`
  },
  {
    id: 'sql-query',
    name: 'SQL — Relational Query',
    language: 'sql',
    title: 'Relational Project Pipeline Query',
    description: 'Structured database query sorting active portfolio initiatives by technology stack.',
    runnable: false,
    code: `SELECT
    project_name,
    technology,
    project_status
FROM projects
WHERE developer_id = 'DEEKSHITH_777'
ORDER BY project_name;`,
    expectedOutput: `+-------------------------+--------------------+----------------+
| project_name            | technology         | project_status |
+-------------------------+--------------------+----------------+
| CITRA                   | JavaScript / Canvas| Active Concept |
| GAZE GUARD AI           | OpenCV / MediaPipe | In Progress    |
| MASTER TERMINAL ARCADE  | Python / Curses    | Completed      |
| RAKSHA LIVE MAP         | TypeScript / GIS   | Active Concept |
| VERNACULAR PEDAGOGY AI  | React / FastAPI    | Prototype      |
+-------------------------+--------------------+----------------+
5 rows in set (0.002 sec)`
  },
  {
    id: 'css-styling',
    name: 'CSS — Cyber Visual Design',
    language: 'css',
    title: 'Cyberpunk Master Glass Card Styles',
    description: 'Custom styling featuring near-black glassmorphism, electric orange border glow, and smooth hover elevation.',
    runnable: true,
    code: `.master-card {
  background: #080808;
  border: 1px solid #ff4f2a;
  border-radius: 18px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(16px);
}

.master-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 0 30px #ff4f2a33;
}`,
    expectedOutput: `[CSS ENGINE APPLIED]
Selector: .master-card (specificity: 0,1,0)
Rules compiled:
- background: #080808
- border: 1px solid rgb(255, 79, 42)
- border-radius: 18px
- transition: transform 300ms ease, box-shadow 300ms ease
- backdrop-filter: blur(16px)`
  }
];
