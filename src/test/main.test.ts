import { expect } from 'chai';
import { ChildProcess } from '../main';
import type { ChildProcessOnChunkHelperOutput } from '../types';

describe('Child process', async () => {
  it('should spawn a child process', async () => {
    await ChildProcess.spawn('echo', ['"Test"']);
  });
  it('should exec a child process', async () => {
    const output: ChildProcessOnChunkHelperOutput = {
      err: '',
      out: '',
    };
    await ChildProcess.advancedExec(['echo', 'Test'], {
      onChunk: ChildProcess.onChunkHelper(output),
    }).awaiter;
    expect(output.err).to.eq('');
    expect(output.out).to.eq('Test\n');
  });
  it('should fail to exec a child process', async () => {
    const output: ChildProcessOnChunkHelperOutput = {
      err: '',
      out: '',
    };
    await ChildProcess.advancedExec(['cat', '_bla'], {
      onChunk: ChildProcess.onChunkHelper(output),
      doNotThrowError: true,
    }).awaiter;
    expect(output.err).to.eq('cat: _bla: No such file or directory\n');
    expect(output.out).to.eq('');
  });
});
