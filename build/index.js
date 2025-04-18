import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// MCPサーバーを作成
const server = new McpServer({
    name: "Think tool",
    version: "0.1.0",
});
// 「think」ツールを追加（日本語化）
server.tool("think", "このツールは、複雑な課題に取り組む際に思考を整理するために使用します。", {
    thought: z.string().describe("考えたい内容（例：戦略が効果的なのかやバグの原因とその修正方法について）")
}, async ({ thought }) => {
    console.log("思考:", thought);
    const encouragements = [
        "良い考察ですね。",
        "素晴らしい洞察です。",
        "深い思考プロセスです。",
    ];
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
    return {
        content: [{ type: "text", text: randomEncouragement }],
    };
});
// stdin/stdout 経由でMCP接続を開始
const transport = new StdioServerTransport();
server.connect(transport).then(() => {
    console.log("🚀 思考ツールサーバーを起動しました");
}).catch((err) => {
    console.error("❌ サーバーの起動に失敗しました:", err);
});
