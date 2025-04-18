# Think MCP ツール

## 概要

**Think Tool** は、Claude や Cursor などの MCP 対応クライアントから呼び出される思考整理・記録用ツールです。  
外部情報の取得やデータベースの変更は行わず、**ユーザーの思考内容をログとして記録すること**を目的としています。

---

## 使いどころ

- 複雑な課題を解決する際の思考整理
- 戦略やアイデアのブレインストーミング
- テスト失敗やバグ発見後の対応策の洗い出しと評価

---

## ツール仕様（MCP準拠）

```json
{
  "name": "think",
  "description": "Use the tool to think about something. It will not obtain new information or change the database, but just append the thought to the log. Use it when complex reasoning or some cache memory is needed.",
  "input_schema": {
    "type": "object",
    "properties": {
      "thought": {
        "type": "string",
        "description": "A thought to think about."
      }
    },
    "required": ["thought"]
  }
}
