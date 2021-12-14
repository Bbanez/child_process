export interface ChildProcessExecOutput {
  stop(): void;
  awaiter: Promise<void>;
}

export type ChildProcessExecChunkType = 'stdout' | 'stderr';

export interface ChildProcessOnChunkHelperOutput {
  out: string;
  err: string;
}
