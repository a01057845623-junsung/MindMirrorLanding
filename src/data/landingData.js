// Mind Mirror 랜딩페이지 콘텐츠 상수 — 기획서 기준

export const PROTOTYPE_URL = 'https://mind-mirror-ba.web.app/';

export const NAV_ITEMS = [
  { id: 'team', label: '01. 팀 & 역할' },
  { id: 'problem', label: '02. 문제 정의' },
  { id: 'mechanism', label: '03. BA 원리 & 연구' },
  { id: 'demo', label: '04. 라이브 시연' },
  { id: 'vision', label: '05. 비전' },
];

/* ---------- Hero ---------- */
export const HERO_METRICS = [
  { value: '5분', label: '저항 없는 미세행동' },
  { value: '1 Cycle', label: '측정 → 분석 → 수행 → 재평가' },
  { value: 'Rule-First', label: '위기 발화 즉각 차단' },
];

export const EMOTION_CHIPS = [
  {
    id: 'overwhelm',
    label: '막막함/압박감',
    reframe: '해야 할 양이 너무 커 보이면, 뇌는 시작 자체를 위협으로 느껴요.',
    action: '책상에 앉아 교재 첫 페이지만 펼쳐두기 (내용은 절대 읽지 않기)',
  },
  {
    id: 'anxiety',
    label: '불안/두려움',
    reframe: '잘 못할까 봐 두려운 마음은 게으름이 아니라 자연스러운 방어 반응이에요.',
    action: '노트북 전원 켜고 빈 문서 창만 띄우기 (글 작성 금지)',
  },
  {
    id: 'fatigue',
    label: '피로/무기력',
    reframe: '몸이 무거운 날엔, 몸을 아주 조금만 움직이는 것부터 시작해요.',
    action: '침대에서 일어나 창문 열고 물 한 컵 마시기',
  },
  {
    id: 'perfection',
    label: '완벽주의 부담',
    reframe: '완벽하게 해내려는 마음이 시작을 가장 무겁게 만들어요.',
    action: '일부러 엉성한 제목 한 줄만 적어두기 (수정 금지)',
  },
];

/* ---------- Section 1 : Team ---------- */
export const TEAM = [
  {
    name: '박준성',
    dept: '심리상담치료학과',
    role: 'Project Lead',
    roleDetail: '기획 & 풀스택 웹 개발',
    icon: 'code',
    badges: ['Clinical BA Pipeline', 'Full-Stack & LLM'],
    tasks: [
      '임상 행동활성화(BA) 단일 파이프라인 아키텍처 설계',
      'DeepSeek LLM 2-Tier 프롬프트 엔지니어링 및 코드 레벨 JSON 검증기 구현',
      '규칙 기반 최우선 위기 차단 필터(PHQ-9 9번/총점·위기 키워드) 구축',
      'Firebase(Auth, Firestore) 연동 및 웹 앱 프로토타입 배포 (mind-mirror-ba.web.app)',
    ],
  },
  {
    name: '김승선',
    dept: '국방경찰행정학과',
    role: 'Research Lead',
    roleDetail: '선행연구 & 학술 검증',
    icon: 'book',
    badges: ['Academic Evidence', 'Safety & Policy'],
    tasks: [
      '행동활성화(BA) 핵심 이론(Jacobson, Dimidjian 등) 및 임상 매뉴얼 분석',
      '국내외 디지털 정신건강 챗봇(Woebot, Wysa, Therabot) 비교 분석 연구',
      '우울 치료 미충족 수요(Treatment Gap) 및 치료 장벽 통계 근거 수집',
      '연구 논문 작성 및 학술적 한계·기대효과 정립',
    ],
  },
  {
    name: '유지성',
    dept: '스마트팜학과',
    role: 'Design Lead',
    roleDetail: 'UI/UX & 비주얼 시스템',
    icon: 'palette',
    badges: ['Low-Cognitive UI/UX', 'Design System'],
    tasks: [
      "우울·무기력 사용자의 인지 부하를 줄이는 '1화면 1질문' 인터페이스 설계",
      'Anthropic 레퍼런스 기반의 심리적 안정감을 주는 웜톤(Warm Ivory) 컬러 시스템 구축',
      '타이핑 부담을 없앤 감정 선택 칩(Quick Chips), 5분 타이머, P/M 슬라이더 UI 설계',
      '발표 쇼케이스 랜딩페이지 레이아웃 및 시각 에셋 디자인',
    ],
  },
];

/* ---------- Section 2 : Problem ---------- */
export const TREATMENT_GAP = [
  { title: '진료 기록에 대한 두려움', desc: '건강보험 청구·진료기록이 남는 것을 기피 — 취업·보험 불이익 우려와 사회적 낙인' },
  { title: '낮은 정신건강 서비스 이용률', desc: '마음이 무너져도 전문 서비스까지 도달하는 사람은 소수에 그침' },
  { title: '방 안의 고립', desc: '도움 없이 홀로 버티는 사이, 무기력과 회피가 일상으로 고착화' },
];

export const TODO_ITEMS = ['전공 시험 공부하기', '방 청소하기', '운동 1시간 하기', '과제 보고서 완성하기'];

/* ---------- Section 3 : Mechanism ---------- */
export const VICIOUS_CYCLE = [
  { label: '의욕 저하', sub: 'Low Mood' },
  { label: '회피 (TRAP)', sub: 'Avoidance', intervene: true },
  { label: '긍정경험 상실', sub: 'Loss of Reward' },
  { label: '자책 · 우울 심화', sub: 'Self-blame' },
];

export const SOLUTION_STEPS = [
  {
    no: '01',
    title: '감정 선행 파악',
    tag: 'TRAP',
    desc: "단 1턴의 질문과 Quick Chips로 회피를 '게으름'이 아닌 자연스러운 방어 반응으로 수용합니다.",
    example: '“지금 가장 크게 느껴지는 감정은?” → [막막함/압박감]',
  },
  {
    no: '02',
    title: '5분 물리적 다운사이징',
    tag: 'TRAC',
    desc: '과업을 단 하나의 물리 동작으로 분해합니다. 코드 레벨 검증기가 부담을 주는 단어를 차단합니다.',
    example: '노트북 전원 켜고 빈 문서 창만 띄우기 (글 작성 금지)',
  },
  {
    no: '03',
    title: '성취감(Mastery)의 시각화',
    tag: 'P · M',
    desc: '사전/사후 즐거움(P)·성취감(M) 점수 비교로 작은 성공의 피드백 루프를 형성합니다.',
    example: '성취감 1점 → 5점 (▲+4)',
  },
];

export const COMPARISON = {
  columns: ['기존 To-Do 생산성 앱', '일반 생성형 AI / 상담 챗봇', 'Mind Mirror'],
  rows: [
    { label: '접근 방식', values: ['“무엇을 해야 하는가” 나열', '대화·공감 중심의 자유 응답', '“무엇 때문에 시작이 어려운가” 감정 선행 파악'] },
    { label: '과업 분해', values: ['사용자가 직접 쪼개야 함', '추상적·장황한 조언', '5분 단일 물리 동작 + 부담 단어 코드 검증'] },
    { label: '맥락 관리', values: ['할 일 목록만 존재', '세션 단위로 휘발', 'PHQ-9 · 과제 이력 기반 1 Cycle 재평가'] },
    { label: '위기 대응', values: ['대응 없음', 'LLM 판단에 의존', '규칙 기반 선차단 (LLM 미호출) + 고정 안내'] },
  ],
};

export const RESEARCH = {
  clinical: [
    { cite: 'Lewinsohn, 1974', venue: 'Psychology of Depression', finding: '우울의 행동적 모델 정립 — 반응 유관 정적강화(RCPR)의 상실이 우울의 핵심 기제임을 규명' },
    { cite: 'Jacobson et al., 1996', venue: 'J. Consult. Clin. Psychol.', finding: '구성요소 분석 — BA 단독으로 인지행동치료(CBT) 전체와 동등한 치료 효과 입증' },
    { cite: 'Dimidjian et al., 2006', venue: 'J. Consult. Clin. Psychol.', finding: '중등도~중증 우울 급성기 치료에서 BA가 인지치료보다 우수하며 항우울제와 대등한 효과' },
    { cite: 'Dobson et al., 2008', venue: 'J. Consult. Clin. Psychol.', finding: '2년 추적 연구 — BA의 우울 재발 방지 효과가 인지치료와 동등하며 약물 중단군보다 우수' },
    { cite: 'Richards et al., 2016', venue: 'The Lancet (COBRA)', finding: '대규모 RCT — 비전문가가 구조화 매뉴얼로 제공한 BA가 CBT 대비 비열등·비용 효율적' },
  ],
  digital: [
    { cite: 'Fitzpatrick et al., 2017', venue: 'Woebot · JMIR Mental Health', finding: '완전 자동화 대화형 에이전트(Woebot) 2주 사용만으로 청년층 우울·불안(PHQ-9) 유의미 감소' },
    { cite: 'Inkster et al., 2018', venue: 'Wysa · JMIR mHealth uHealth', finding: '공감 기반 AI 챗봇(Wysa) 고참여 사용자 집단에서 우울 증상 개선 폭이 유의하게 높음' },
    { cite: 'Heinz et al., 2025', venue: 'Therabot · NEJM AI', finding: '생성형 AI 치료 챗봇(Therabot) 최초 RCT — 임상적 우울 및 불안 증상의 유의미한 감소 입증' },
  ],
};

export const APA_REFERENCES = [
  {
    no: '01',
    category: '임상 BA 치료효과',
    shortCite: 'Dimidjian et al. (2006)',
    authorsYear:
      'Dimidjian, S., Hollon, S. D., Dobson, K. S., Schmaling, K. B., Kohlenberg, R. J., Addis, M. E., Gallop, R., McGlinchey, J. B., Markley, D. K., Gollan, J. K., Atkins, D. C., & Jacobson, N. S. (2006).',
    title: 'Randomized trial of behavioral activation, cognitive therapy, and antidepressant medication in the acute treatment of major depression.',
    journalItalic: 'Journal of Consulting and Clinical Psychology, 74',
    journalRest: '(4), 658–670.',
    doi: 'https://doi.org/10.1037/0022-006X.74.4.658',
    roleInService: 'TRAP(회피 패턴) → TRAC(대안 행동) 전환 파이프라인의 임상적 근거',
  },
  {
    no: '02',
    category: '임상 BA 재발방지',
    shortCite: 'Dobson et al. (2008)',
    authorsYear:
      'Dobson, K. S., Hollon, S. D., Dimidjian, S., Schmaling, K. B., Kohlenberg, R. J., Gallop, R., Rizvi, S. L., Gollan, J. K., Dunner, D. L., & Jacobson, N. S. (2008).',
    title: 'Randomized trial of behavioral activation, cognitive therapy, and antidepressant medication in the prevention of relapse and recurrence in major depression.',
    journalItalic: 'Journal of Consulting and Clinical Psychology, 76',
    journalRest: '(3), 468–477.',
    doi: 'https://doi.org/10.1037/0022-006X.76.3.468',
    roleInService: '일상 속 반복적인 행동활성화 루프(1 Cycle)를 통한 장기적 우울 재발 예방 근거',
  },
  {
    no: '03',
    category: '디지털 챗봇 RCT',
    shortCite: 'Fitzpatrick et al. (2017)',
    authorsYear: 'Fitzpatrick, K. K., Darcy, A., & Vierhile, M. (2017).',
    title: 'Delivering cognitive behavior therapy to young adults with symptoms of depression and anxiety using a fully automated conversational agent (Woebot): A randomized controlled trial.',
    journalItalic: 'JMIR Mental Health, 4',
    journalRest: '(2), e7785.',
    doi: 'https://doi.org/10.2196/mental.7785',
    roleInService: '청년층 대상 자동화 대화형 인터페이스의 단기 우울 감소 효과 및 체크인 UX 참조',
  },
  {
    no: '04',
    category: '생성형 AI 치료제',
    shortCite: 'Heinz et al. (2025)',
    authorsYear: 'Heinz, M. V., et al. (2025).',
    title: 'Generative artificial intelligence conversational agents in the treatment of depression and anxiety: A randomized controlled trial (Therabot).',
    journalItalic: 'NEJM AI',
    journalRest: '.',
    doi: null,
    roleInService: '생성형 LLM 기반 치료 보조 에이전트의 임상 유효성 및 안전 가드레일 설계 참조',
  },
  {
    no: '05',
    category: '디지털 참여도 분석',
    shortCite: 'Inkster et al. (2018)',
    authorsYear: 'Inkster, B., Sarda, S., & Subramanian, V. (2018).',
    title: 'An engagement-driven approach for evaluating digital mental health interventions with a conversational agent (Wysa).',
    journalItalic: 'JMIR mHealth and uHealth, 6',
    journalRest: '(11), e11599.',
    doi: 'https://doi.org/10.2196/11599',
    roleInService: '인지 부하를 낮춘 Quick Chips·5분 미세행동으로 사용자 참여율(Engagement) 극대화',
  },
  {
    no: '06',
    category: 'BA 핵심 구성요소',
    shortCite: 'Jacobson et al. (1996)',
    authorsYear:
      'Jacobson, N. S., Dobson, K. S., Truax, P. A., Addis, M. E., Koerner, K., Gollan, J. K., Gortner, E., & Prince, S. E. (1996).',
    title: 'A component analysis of cognitive-behavioral treatment for depression.',
    journalItalic: 'Journal of Consulting and Clinical Psychology, 64',
    journalRest: '(2), 295–304.',
    doi: 'https://doi.org/10.1037/0022-006X.64.2.295',
    roleInService: '복잡한 인지 재구성 없이 ‘행동활성화(BA)’ 단독 개입만으로 충분하다는 핵심 이론 근거',
  },
  {
    no: '07',
    category: '행동이론 고전',
    shortCite: 'Lewinsohn (1974)',
    authorsYear: 'Lewinsohn, P. M. (1974).',
    title: 'A behavioral approach to depression. In R. J. Friedman & M. M. Katz (Eds.), ',
    journalItalic: 'The psychology of depression: Contemporary theory and research',
    journalRest: ' (pp. 157–185). Winston & Sons.',
    doi: null,
    roleInService: '즐거움(P)·성취감(M) 사전/사후 재평가를 통한 정적강화 피드백 루프 설계 근거',
  },
  {
    no: '08',
    category: '대규모 임상/경제성',
    shortCite: 'Richards et al. (2016)',
    authorsYear:
      "Richards, D. A., Ekers, D., McMillan, D., Taylor, R. S., Byford, S., Warren, F. C., Barrett, B., Farrand, P. A., Gilbody, S., Kuyken, W., O'Mahen, H., Watkins, E., Wright, K. A., Hollon, S. D., Reed, N., Rhodes, S., Fletcher, E., & Byng, R. (2016).",
    title: 'Cost and Outcome of Behavioural Activation versus Cognitive Behaviour Therapy for Depression (COBRA): A randomised controlled trial.',
    journalItalic: 'The Lancet, 388',
    journalRest: '(10047), 871–880.',
    doi: 'https://doi.org/10.1016/S0140-6736(16)31140-0',
    roleInService: '구조화된 BA 프로토콜의 높은 전달 용이성 및 디지털 도구화 타당성 입증',
  },
];

/* ---------- Section 4 : Demo ---------- */
export const PIPELINE = [
  { step: 'Step 0', label: '안전 필터', tab: 'safety' },
  { step: 'Step 1', label: 'PHQ-9', tab: 'safety' },
  { step: 'Step 2', label: '과제 체크인', tab: 'scenario' },
  { step: 'Step 3', label: 'TRAP', tab: 'scenario' },
  { step: 'Step 4', label: 'TRAC', tab: 'scenario' },
  { step: 'Step 5~6', label: '타이머 & 재평가', tab: 'scenario' },
];

export const PHQ9_Q9 = {
  question: '지난 2주 동안, 차라리 죽는 것이 낫겠다고 생각하거나 어떻게든 자해할 생각을 하셨나요?',
  options: [
    { score: 0, label: '전혀 없음' },
    { score: 1, label: '며칠 동안' },
    { score: 2, label: '7일 이상' },
    { score: 3, label: '거의 매일' },
  ],
};

export const CRISIS_LINES = [
  { name: '자살예방상담전화', number: '109' },
  { name: '정신건강상담전화', number: '1577-0199' },
];

export const SCENARIO_STEPS = [
  { key: 'input', title: '사용자 발화', short: '발화 입력' },
  { key: 'trap', title: 'TRAP 기능분석', short: 'TRAP' },
  { key: 'trac', title: 'TRAC 5분 다운사이징', short: 'TRAC' },
  { key: 'reassess', title: '타이머 & P/M 재평가', short: '재평가' },
];

export const SCENARIO = {
  utterance: '내일 전공 시험인데 하루 종일 침대에 누워서 릴스만 봄... 스크린타임 8시간...',
  originalTask: '전공 시험 공부하기',
  microAction: '책상에 앉아 교재 첫 페이지만 펼쳐두기 (글씨는 읽지 말기)',
  blockedWords: ['공부하기', '1시간', '완벽하게', '끝내기'],
};
