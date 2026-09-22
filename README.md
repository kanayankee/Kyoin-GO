# 教員GO (Kyoin-GO)

学校内を実際に歩いて、先生カードを集める位置情報ゲーム(Pokémon GO 風)。

## 構成

- `app/` — 開発用のソース一式(Vite + React + TypeScript + Leaflet)。ここで作業する。
- `monaca/` — Monaca Education にインポートするプロジェクト。`monaca/www` は `app/` から**静的ビルドした成果物**で、直接編集しない。

```
Kyoin-GO/
├─ app/            ← 開発はここ
│  ├─ src/
│  │  ├─ data/teachers.ts   先生データ(教科・名前・レア度)
│  │  ├─ components/        MapView / Zukan / AdminCoords など
│  │  └─ store/GameStore.tsx  収集状況・座標の永続化
│  └─ public/cards/          先生の写真を {id}.jpg で置く場所
└─ monaca/
   ├─ www/          ← `npm run build` の出力(Monacaに取り込むのはここ)
   └─ config.xml / package.json  Monacaプロジェクト設定
```

## 開発

```bash
cd app
npm install
npm run dev
```

## Monaca Education への反映(静的エクスポート)

```bash
cd app
npm run build
```

`vite.config.ts` で `outDir: '../monaca/www'` を指定しているので、ビルドすると
`monaca/www` が最新の内容に上書きされます。あとは `monaca/` フォルダを
Monaca Education にインポート(またはZIPアップロード)すればOKです。
パスはすべて相対パス(`base: './'`)で出力しているので、Monacaの
プレビュー/ビルド環境でもそのまま動作します。

## ゲームの仕組み

- 地図表示: **Leaflet.js + OpenStreetMap**(無料・APIキー不要)
- 現在地取得: ブラウザ標準の **Geolocation API**(無料・追加SDK不要)
- 先生カードの座標から半径 30m 以内(`UNLOCK_RADIUS_METERS` in `GameStore.tsx`)に
  近づくと自動的にカードを獲得
- 収集状況・カードの座標は端末の `localStorage` に保存(生徒ごとに別々に貯まる)

## 座標(先生の居場所)について

`teachers.ts` の `lat` / `lng` は学校の敷地内に仮でランダムに散りばめた
ハードコード値です。実際の座席・教室に合わせたい場合だけ、アプリ内の
「設定」タブの座標登録ツールで個別に上書きできます。

1. 先生の実際の場所(職員室の席や教室など)に行く
2. 「設定」タブでその先生を選択し、「現在地をセット」を押す
   (PCで作業する場合は地図をクリックしても上書き可能)
3. 上書きした内容を正式に反映したい場合は「全データをJSONでコピー」を押し、
   その内容で `app/src/data/teachers.ts` の `lat` / `lng` を書き換える
   (それまでは `localStorage` 上の上書きとして動作)

## カード画像

`app/public/cards/{id}.jpg` を置くと、その先生のカード画像として使われます
(`id` は `teachers.ts` のローマ字表記)。画像が無い先生は教科カラーの
プレースホルダーが自動表示されます。

## レア度

`teachers.ts` の `rarity` (`N` / `R` / `SR` / `UR`) は仮の自動割り振りです。
自由に編集してバランス調整してください。
