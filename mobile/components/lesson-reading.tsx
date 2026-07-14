import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { GLOSSARY } from "@/content/glossary";
import { LESSONS } from "@/content/lessons";
import { FONTS, RADIUS, useTheme } from "@/lib/theme";
import { AppText } from "@/components/ui";

interface Segment {
  text: string;
  bold: boolean;
  italic: boolean;
  /** Glossary key when this segment is a tap-to-define term. */
  term?: string;
  /** Lesson id when this segment is a "Lesson N" cross-reference that opens that lesson. */
  lesson?: string;
}

type Paragraph = Segment[];

/** Lesson readings only ever use <p>, <b> and <i> (see app/src/content/lessons.ts). */
function parseReading(html: string): Paragraph[] {
  const paragraphs = html
    .split(/<\/?p>/i)
    .map((p) => p.trim())
    .filter(Boolean);

  return paragraphs.map((p) => {
    const segments: Segment[] = [];
    // Tokenize on <b>/<i> boundaries, tracking nesting as flags.
    const tokens = p.split(/(<\/?[bi]>)/i).filter(Boolean);
    let bold = false;
    let italic = false;
    for (const token of tokens) {
      const tag = token.toLowerCase();
      if (tag === "<b>") bold = true;
      else if (tag === "</b>") bold = false;
      else if (tag === "<i>") italic = true;
      else if (tag === "</i>") italic = false;
      else segments.push({ text: decodeEntities(token), bold, italic });
    }
    return segments;
  });
}

function decodeEntities(text: string): string {
  return text
    .replace(/&rsquo;|&#8217;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&euro;/g, "€")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** First occurrence of each glossary term becomes a tappable definition, mirroring the web GlossaryReading. */
function linkifyGlossary(paragraphs: Paragraph[]): Paragraph[] {
  const terms = Object.keys(GLOSSARY).sort((a, b) => b.length - a.length);
  const linked = new Set<string>();

  return paragraphs.map((segments) =>
    segments.flatMap((segment) => {
      if (segment.term) return [segment];
      let parts: Segment[] = [segment];
      for (const term of terms) {
        if (linked.has(term)) continue;
        const next: Segment[] = [];
        let found = false;
        for (const part of parts) {
          if (found || part.term) {
            next.push(part);
            continue;
          }
          const re = new RegExp(`\\b(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})\\b`, "i");
          const match = re.exec(part.text);
          if (!match) {
            next.push(part);
            continue;
          }
          found = true;
          linked.add(term);
          const start = match.index;
          const end = start + match[0].length;
          if (start > 0) next.push({ ...part, text: part.text.slice(0, start) });
          next.push({ ...part, text: match[0], term });
          if (end < part.text.length) next.push({ ...part, text: part.text.slice(end) });
        }
        parts = next;
      }
      return parts;
    })
  );
}

const LESSON_IDS = new Set(LESSONS.map((l) => l.id));

/** Every "Lesson N" cross-reference becomes a tap that opens that lesson (mirrors the web GlossaryReading). */
function linkifyLessonRefs(paragraphs: Paragraph[]): Paragraph[] {
  const re = /\bLesson (\d+)\b/;
  return paragraphs.map((segments) =>
    segments.flatMap((segment) => {
      if (segment.term || segment.lesson) return [segment];
      const out: Segment[] = [];
      let rest = segment;
      for (;;) {
        const match = re.exec(rest.text);
        if (!match || !LESSON_IDS.has(`l${match[1]}`)) {
          out.push(rest);
          break;
        }
        const start = match.index;
        const end = start + match[0].length;
        if (start > 0) out.push({ ...rest, text: rest.text.slice(0, start) });
        out.push({ ...rest, text: match[0], lesson: `l${match[1]}` });
        if (end >= rest.text.length) break;
        rest = { ...rest, text: rest.text.slice(end) };
      }
      return out;
    })
  );
}

interface LessonReadingProps {
  html: string;
}

/** Renders lesson reading HTML as native text, glossary terms tappable for inline definitions. */
export function LessonReading({ html }: LessonReadingProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const paragraphs = useMemo(() => linkifyLessonRefs(linkifyGlossary(parseReading(html))), [html]);
  const [openTerm, setOpenTerm] = useState<string | null>(null);

  return (
    <View style={{ marginVertical: 14, gap: 12 }}>
      {paragraphs.map((segments, pi) => (
        <Text key={pi} style={{ color: colors.foreground, fontFamily: FONTS.body, fontSize: 15, lineHeight: 23 }}>
          {segments.map((seg, si) => (
            <Text
              key={si}
              onPress={
                seg.lesson
                  ? () => router.push(`/lesson/${seg.lesson}`)
                  : seg.term
                    ? () => setOpenTerm((prev) => (prev === seg.term ? null : seg.term ?? null))
                    : undefined
              }
              style={{
                fontFamily: seg.bold ? FONTS.bodySemiBold : FONTS.body,
                fontStyle: seg.italic ? "italic" : "normal",
                ...(seg.term || seg.lesson
                  ? {
                      color: colors.primary,
                      fontFamily: FONTS.bodySemiBold,
                      textDecorationLine: "underline",
                      textDecorationStyle: "dashed",
                    }
                  : null),
              }}
            >
              {seg.text}
            </Text>
          ))}
        </Text>
      ))}
      {openTerm && GLOSSARY[openTerm] && (
        <View
          style={{
            borderRadius: RADIUS.md,
            paddingHorizontal: 14,
            paddingVertical: 10,
            backgroundColor: colors.accent,
          }}
        >
          <AppText style={{ color: colors.accentForeground, fontSize: 13.5, lineHeight: 19 }}>
            <AppText variant="bold" style={{ color: colors.accentForeground, fontSize: 13.5 }}>
              {openTerm}:
            </AppText>{" "}
            {GLOSSARY[openTerm]}
          </AppText>
        </View>
      )}
    </View>
  );
}
