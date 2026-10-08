import type { AppCaseStudy } from "./apps";

export type ChapterRange = { start: number; count: number };

/** Screen index ranges for each showcase chapter, in order. */
export function getChapterRanges(chapters: AppCaseStudy["chapters"]): ChapterRange[] {
  return chapters.reduce<ChapterRange[]>((ranges, chapter) => {
    const previous = ranges[ranges.length - 1];
    const start = previous ? previous.start + previous.count : 0;
    return [...ranges, { start, count: Math.max(1, chapter.screenCount ?? 1) }];
  }, []);
}

/** The chapter containing a screen; screens past the last range belong to the last chapter. */
export function chapterIndexOf(ranges: ChapterRange[], screenIndex: number): number {
  const found = ranges.findIndex((range) => screenIndex >= range.start && screenIndex < range.start + range.count);
  return found === -1 ? ranges.length - 1 : found;
}
