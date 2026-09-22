import type { TeacherBase } from '../types/teacher'

// レア度・座標はどちらも仮のハードコード値です。自由に書き換えてOK。
// - rarity: N < R < SR < UR
// - lat/lng: 校内の座標を適当に散りばめて割り振ったもの。実際の場所に合わせて
//   書き換えたい場合は「設定」タブの座標登録ツールでも上書きできる。
// 画像は public/cards/{id}.jpg を置くと自動的にカードに反映されます。
export const TEACHERS: TeacherBase[] = [
  { id: 'akagawa', subject: '数学', name: '赤川 良枝', romaji: 'akagawa', rarity: 'SR', lat: 35.0658069, lng: 135.7857162 },
  { id: 'kawahara', subject: '数学', name: '川原 雄一朗', romaji: 'kawahara', rarity: 'N', lat: 35.0661866, lng: 135.7858334 },
  { id: 'kesho', subject: '数学', name: '下庄 秀生', romaji: 'kesho', rarity: 'SR', lat: 35.0666362, lng: 135.7859343 },
  { id: 'nakanishi', subject: '数学', name: '仲西 亮', romaji: 'nakanishi', rarity: 'R', lat: 35.0668656, lng: 135.7860115 },
  { id: 'hanamoto', subject: '数学', name: '花本 貴雄', romaji: 'hanamoto', rarity: 'N', lat: 35.0664954, lng: 135.7860770 },
  { id: 'kitano', subject: '数学', name: '北野 直樹', romaji: 'kitano', rarity: 'R', lat: 35.0658147, lng: 135.7858379 },
  { id: 'tokunaga', subject: '数学', name: '徳永 秀也', romaji: 'tokunaga', rarity: 'N', lat: 35.0662029, lng: 135.7856506 },
  { id: 'hashizaki', subject: '英語', name: '橋崎 淳子', romaji: 'hashizaki', rarity: 'R', lat: 35.0662829, lng: 135.7860681 },
  { id: 'miyagawa', subject: '英語', name: '宮川 佳子', romaji: 'miyagawa', rarity: 'N', lat: 35.0669894, lng: 135.7856456 },
  { id: 'shirai', subject: '英語', name: '白井 利佳', romaji: 'shirai', rarity: 'N', lat: 35.0669782, lng: 135.7859534 },
  { id: 'johnson', subject: '英語', name: 'ジョンソン ゲイブリエル', romaji: 'johnson', rarity: 'N', lat: 35.0659102, lng: 135.7857463 },
  { id: 'ooka', subject: '英語', name: '大岡 創一朗', romaji: 'ooka', rarity: 'N', lat: 35.0666737, lng: 135.7856660 },
  { id: 'watari', subject: '英語', name: '渡 洋輔', romaji: 'watari', rarity: 'N', lat: 35.0659561, lng: 135.7860054 },
  { id: 'ishibashi', subject: '英語', name: '石橋 怜大', romaji: 'ishibashi', rarity: 'R', lat: 35.0658376, lng: 135.7855305 },
  { id: 'izuta', subject: '英語', name: '出田 涼子', romaji: 'izuta', rarity: 'N', lat: 35.0669071, lng: 135.7854663 },
  { id: 'yamagata', subject: '国語', name: '山縣 愛', romaji: 'yamagata', rarity: 'N', lat: 35.0658624, lng: 135.7859445 },
  { id: 'konoike', subject: '国語', name: '鴻池 雅子', romaji: 'konoike', rarity: 'N', lat: 35.0670812, lng: 135.7855233 },
  { id: 'murakami', subject: '国語', name: '村上 泰規', romaji: 'murakami', rarity: 'R', lat: 35.0666687, lng: 135.7857832 },
  { id: 'murayama', subject: '国語', name: '村山 伸一', romaji: 'murayama', rarity: 'N', lat: 35.0669194, lng: 135.7858658 },
  { id: 'murakawa', subject: '国語', name: '村川 弘樹', romaji: 'murakawa', rarity: 'N', lat: 35.0668302, lng: 135.7856892 },
  { id: 'sakasegawa', subject: '国語', name: '酒瀬川 なおみ', romaji: 'sakasegawa', rarity: 'R', lat: 35.0662591, lng: 135.7860094 },
  { id: 'hiramoto', subject: '理科', name: '平本 健太', romaji: 'hiramoto', rarity: 'UR', lat: 35.0662723, lng: 135.7857766 },
  { id: 'kogetsu', subject: '理科', name: '古結 尚', romaji: 'kogetsu', rarity: 'N', lat: 35.0661908, lng: 135.7855804 },
  { id: 'torihata', subject: '理科', name: '鳥羽田 雄志', romaji: 'torihata', rarity: 'N', lat: 35.0670247, lng: 135.7858101 },
  { id: 'hironaka', subject: '理科', name: '弘中 教雄', romaji: 'hironaka', rarity: 'UR', lat: 35.0662654, lng: 135.7858855 },
  { id: 'onishi', subject: '理科', name: '大西 愛', romaji: 'onishi', rarity: 'SR', lat: 35.0666265, lng: 135.7855313 },
  { id: 'niman', subject: '理科', name: '二万 剛士', romaji: 'niman', rarity: 'N', lat: 35.0668372, lng: 135.7860805 },
  { id: 'abe', subject: '社会', name: '阿部 康平', romaji: 'abe', rarity: 'N', lat: 35.0669316, lng: 135.7857530 },
  { id: 'ide', subject: '社会', name: '井出 教子', romaji: 'ide', rarity: 'R', lat: 35.0669657, lng: 135.7855906 },
  { id: 'kawashima', subject: '社会', name: '川島 啓一', romaji: 'kawashima', rarity: 'R', lat: 35.0666365, lng: 135.7859830 },
  { id: 'muraki', subject: '社会', name: '村木 真理', romaji: 'muraki', rarity: 'R', lat: 35.0661900, lng: 135.7857163 },
  { id: 'nakae', subject: '社会', name: '中江 彬文', romaji: 'nakae', rarity: 'SR', lat: 35.0658376, lng: 135.7855746 },
  { id: 'kato', subject: '社会', name: '加藤 未知', romaji: 'kato', rarity: 'R', lat: 35.0662187, lng: 135.7855187 },
  { id: 'suzuki', subject: '情報', name: '鈴木 潤', romaji: 'suzuki', rarity: 'N', lat: 35.0662781, lng: 135.7859275 },
  { id: 'sagawa', subject: '音楽', name: '佐川 淳', romaji: 'sagawa', rarity: 'N', lat: 35.0658208, lng: 135.7854838 },
  { id: 'kawae', subject: 'キリスト教', name: '川江 友二', romaji: 'kawae', rarity: 'R', lat: 35.0658932, lng: 135.7858906 },
  { id: 'nishioka', subject: '家庭', name: '西岡 瞳', romaji: 'nishioka', rarity: 'R', lat: 35.0659543, lng: 135.7860743 },
  { id: 'nakazawa', subject: '美術', name: '中澤 圭', romaji: 'nakazawa', rarity: 'N', lat: 35.0657739, lng: 135.7856339 },
  { id: 'miyake', subject: '保健体育', name: '三宅 快亮', romaji: 'miyake', rarity: 'N', lat: 35.0665393, lng: 135.7858128 },
  { id: 'yamaguchi', subject: '保健体育', name: '山口 拓', romaji: 'yamaguchi', rarity: 'R', lat: 35.0662534, lng: 135.7854769 },
  { id: 'nakamura', subject: '保健体育', name: '中村 紗基', romaji: 'nakamura', rarity: 'N', lat: 35.0664626, lng: 135.7854701 },
  { id: 'akiba', subject: '保健体育', name: '秋葉 尚子', romaji: 'akiba', rarity: 'N', lat: 35.0666480, lng: 135.7856877 },
  { id: 'iwamoto', subject: '保健体育', name: '岩本 卓也', romaji: 'iwamoto', rarity: 'N', lat: 35.0666843, lng: 135.7855702 },
  { id: 'nomura', subject: '保健体育', name: '野村 一成', romaji: 'nomura', rarity: 'R', lat: 35.0665942, lng: 135.7858845 },
]

export const SUBJECTS: string[] = Array.from(new Set(TEACHERS.map((t) => t.subject)))

export const SUBJECT_COLORS: Record<string, string> = {
  数学: '#3b82f6',
  英語: '#ef4444',
  国語: '#f59e0b',
  理科: '#10b981',
  社会: '#8b5cf6',
  情報: '#06b6d4',
  音楽: '#ec4899',
  キリスト教: '#6366f1',
  家庭: '#84cc16',
  美術: '#f97316',
  保健体育: '#14b8a6',
}
