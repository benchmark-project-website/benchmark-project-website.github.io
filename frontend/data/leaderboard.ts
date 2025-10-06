export type Row = {
  model: string;
  org?: string;
  group: "proprietary" | "open";
  // Pass@1
  files_p1: number; loc_p1: number; compile_p1: number; test_p1: number; crash_p1: number; success_p1: number;
  // With compilation error feedback
  files_cf: number; loc_cf: number; compile_cf: number; test_cf: number; crash_cf: number; success_cf: number;
};

export const LAST_UPDATED = "2025-10-06";

export const rows: Row[] = [
  { model: "Claude-4-Opus", group: "proprietary",
    files_p1: 9.11,  loc_p1: 396.94, compile_p1:80.20, test_p1: 28.52, crash_p1: 60.49, success_p1: 11.88,
    files_cf: 8.97,  loc_cf: 386.63, compile_cf: 90.10, test_cf: 34.22, crash_cf: 60.44, success_cf: 14.85 },
  { model: "Claude-4-Sonnet", group: "proprietary",
    files_p1: 9.61,  loc_p1: 432.17, compile_p1: 40.59, test_p1: 10.35, crash_p1: 58.54, success_p1: 0.99,
    files_cf: 9.78,  loc_cf: 437.69, compile_cf: 77.23, test_cf: 18.36, crash_cf: 26.92, success_cf: 3.96 },
  { model: "Gemini-2.5-Pro", group: "proprietary",
    files_p1: 10.74,  loc_p1: 380.31, compile_p1: 53.47, test_p1: 19.63, crash_p1: 62.96, success_p1: 7.92,
    files_cf: 10.52,  loc_cf: 361.94, compile_cf: 68.32, test_cf: 21.63, crash_cf: 75.36, success_cf: 13.86 },
  { model: "GPT-5-High", group: "proprietary",
    files_p1: 7.76,  loc_p1: 354.59, compile_p1: 45.54, test_p1: 21.90, crash_p1: 52.17, success_p1: 14.85,
    files_cf: 7.36,  loc_cf: 340.77, compile_cf: 82.18, test_cf: 29.07, crash_cf: 31.33, success_cf: 18.81 },
  { model: "GPT-4.1", group: "proprietary",
    files_p1: 8.00,  loc_p1: 367.43, compile_p1: 6.93, test_p1: 2.44, crash_p1: 28.57, success_p1: 0.99,
    files_cf: 2.68,  loc_cf: 58.41, compile_cf: 74.26, test_cf: 1.85, crash_cf: 94.67, success_cf: 0.99 },
  { model: "DeepSeek-R1", group: "open",
    files_p1: 7.00,  loc_p1: 214.33, compile_p1: 14.85, test_p1: 1.90, crash_p1: 73.33, success_p1: 0.00,
    files_cf: 7.33,  loc_cf: 233.78, compile_cf: 44.55, test_cf: 12.29, crash_cf: 62.22, success_cf: 4.95 },
  { model: "DeepSeek-V3", group: "open",
    files_p1: 5.17,  loc_p1: 164.67, compile_p1: 5.94, test_p1: 2.23, crash_p1: 83.33, success_p1: 0.99,
    files_cf: 5.33,  loc_cf: 250.19, compile_cf: 26.73, test_cf: 10.40, crash_cf: 48.15, success_cf: 4.95 },
  { model: "GLM-4.5", group: "open",
    files_p1: 7.64,  loc_p1: 256.16, compile_p1: 24.75, test_p1: 8.74, crash_p1: 72.00, success_p1: 4.95,
    files_cf: 8.51,  loc_cf: 278.91, compile_cf: 44.55, test_cf: 10.14, crash_cf: 75.56, success_cf: 4.95 },
  { model: "Kimi K2", group: "open",
    files_p1: 6.82,  loc_p1: 239.82, compile_p1: 16.83, test_p1: 4.95, crash_p1: 76.47, success_p1: 1.98,
    files_cf: 5.10,  loc_cf: 168.60, compile_cf: 41.58, test_cf: 7.76, crash_cf: 69.05, success_cf: 1.98 },
  { model: "Qwen3-Coder", group: "open",
    files_p1: 5.29,  loc_p1: 209.00, compile_p1: 27.72, test_p1: 4.42, crash_p1: 75.00, success_p1: 1.98,
    files_cf: 6.20,  loc_cf: 241.21, compile_cf: 85.15, test_cf: 21.45, crash_cf: 29.07, success_cf: 8.91 },
];
