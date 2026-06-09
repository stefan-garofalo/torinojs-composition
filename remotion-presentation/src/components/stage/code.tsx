import type { CSSProperties } from "react";
import { stageTokens } from "./tokens";

export interface StageCodeBlockProps {
  code: string;
  title?: string;
  maxLines?: number;
  style?: CSSProperties;
}

type TokenKind =
  | "code"
  | "comment"
  | "keyword"
  | "number"
  | "prop"
  | "punctuation"
  | "string"
  | "tag"
  | "typeName";

interface CodeToken {
  kind: TokenKind;
  text: string;
}

const KEYWORDS = new Set([
  "async",
  "await",
  "const",
  "export",
  "false",
  "function",
  "if",
  "import",
  "let",
  "return",
  "true",
  "type",
]);

const tokenColor: Record<TokenKind, string> = {
  code: stageTokens.color.codeText,
  comment: stageTokens.color.codeComment,
  keyword: stageTokens.color.codeKeyword,
  number: stageTokens.color.codeKeyword,
  prop: "#93c5fd",
  punctuation: stageTokens.color.codePunctuation,
  string: stageTokens.color.codeString,
  tag: "#67e8f9",
  typeName: "#bfdbfe",
};

export function StageCodeBlock({
  code,
  title = "stage.tsx",
  maxLines = 13,
  style,
}: StageCodeBlockProps) {
  const visibleLines = code.split("\n").slice(0, maxLines);

  return (
    <section
      aria-label={title}
      style={{
        background: stageTokens.color.surfaceCode,
        border: `1px solid ${stageTokens.color.border}`,
        borderRadius: stageTokens.radius.code,
        boxShadow: "0 28px 80px rgba(0, 0, 0, 0.34)",
        color: stageTokens.color.codeText,
        display: "flex",
        flexDirection: "column",
        fontFamily: stageTokens.font.mono,
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          alignItems: "center",
          borderBottom: `1px solid ${stageTokens.color.border}`,
          display: "flex",
          gap: 10,
          height: 48,
          padding: "0 18px",
        }}
      >
        <WindowDot background="#ff6b5f" />
        <WindowDot background="#f7c856" />
        <WindowDot background="#62d26f" />
        <span
          style={{
            color: stageTokens.color.textSubtle,
            fontSize: 18,
            marginLeft: 8,
          }}
        >
          {title}
        </span>
      </div>
      <pre
        style={{
          flex: 1,
          fontSize: 28,
          lineHeight: 1.48,
          margin: 0,
          padding: "30px 34px",
          whiteSpace: "pre-wrap",
        }}
      >
        {visibleLines.map((line, index) => (
          <code
            key={`${index}-${line}`}
            style={{
              display: "block",
              minHeight: 41,
            }}
          >
            {tokenizeLine(line).map((token, tokenIndex) => (
              <span
                key={`${tokenIndex}-${token.text}`}
                style={{ color: tokenColor[token.kind] }}
              >
                {token.text}
              </span>
            ))}
          </code>
        ))}
      </pre>
    </section>
  );
}

function WindowDot({ background }: { background: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        background,
        borderRadius: 999,
        display: "block",
        height: 12,
        opacity: 0.76,
        width: 12,
      }}
    />
  );
}

function tokenizeLine(line: string): CodeToken[] {
  if (line.trimStart().startsWith("//")) {
    return [{ kind: "comment", text: line }];
  }

  const tokens: CodeToken[] = [];
  const matcher =
    /(<\/?\s*[A-Z][\w.]*|<\/?\s*[a-z][\w.-]*|\b[A-Za-z_$][\w$-]*(?=\s*=)|"[^"]*"|'[^']*'|`[^`]*`|\b\d+\b|\b[A-Za-z_$][\w$]*\b|[{}()[\].,;:=<>/?!|&+-]|\s+|.)/g;
  let match: RegExpExecArray | null = matcher.exec(line);

  while (match !== null) {
    const text = match[0];
    if (text.startsWith("<")) {
      const tagParts = text.match(/^<\/?\s*/);
      if (tagParts?.[0]) {
        tokens.push({ kind: "punctuation", text: tagParts[0] });
        tokens.push({ kind: "tag", text: text.slice(tagParts[0].length) });
      } else {
        tokens.push({ kind: "tag", text });
      }
    } else if (
      /^[A-Za-z_$][\w$-]*$/.test(text) &&
      /^[=:]/.test(line.slice(matcher.lastIndex).trimStart())
    ) {
      tokens.push({ kind: "prop", text });
    } else if (/^["'`]/.test(text)) {
      tokens.push({ kind: "string", text });
    } else if (/^\d+$/.test(text)) {
      tokens.push({ kind: "number", text });
    } else if (KEYWORDS.has(text)) {
      tokens.push({ kind: "keyword", text });
    } else if (/^[A-Z][A-Za-z0-9_$]*$/.test(text)) {
      tokens.push({ kind: "typeName", text });
    } else if (/^[{}()[\].,;:=<>/+-]$/.test(text)) {
      tokens.push({ kind: "punctuation", text });
    } else {
      tokens.push({ kind: "code", text });
    }
    match = matcher.exec(line);
  }

  return tokens;
}
