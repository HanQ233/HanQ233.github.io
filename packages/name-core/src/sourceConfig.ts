import type { SourceConfig } from "./types";

export const SOURCE_CONFIGS: SourceConfig[] = [
  {
    id: "modern_people",
    label: "他山石",
    priority: 1,
    weight: 16,
    category: "modern",
    description: "现代公开姓名，贴近现实语感",
  },
];

export const DEFAULT_SOURCE_ID = SOURCE_CONFIGS[0].id;

export function getSourceConfig(id: string): SourceConfig {
  const source = SOURCE_CONFIGS.find((item) => item.id === id);
  if (source) {
    return source;
  }
  return {
    id,
    label: id,
    priority: 99,
    weight: 1,
    category: "modern",
    description: "未知来源",
  };
}
