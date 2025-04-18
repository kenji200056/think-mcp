FROM node:21-alpine AS builder

# 作業ディレクトリを設定
WORKDIR /app

# すべてのソースファイルをコピー
COPY . .

# 開発用も含めたすべての依存関係をインストール
RUN npm ci

# TypeScriptファイルをビルド
RUN npm run build

# 本番用により軽量なベースイメージを使用
FROM node:21-slim AS release

# 作業ディレクトリを設定
WORKDIR /app

# builderステージからビルド済みファイルをコピー
COPY --from=builder /app/build /app/build
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/package-lock.json /app/package-lock.json

# 本番用の依存関係のみインストール（prepareスクリプトは実行しない）
RUN npm ci --omit=dev --ignore-scripts

# Node.jsの環境変数を本番モードに設定
ENV NODE_ENV=production

# エントリーポイントを設定（MCPツールの起動ファイル）
ENTRYPOINT ["node", "build/index.js"]
