import { Logger } from "../util/Logging/index";
import { writeFileSync, readFileSync, unlinkSync, existsSync } from 'fs';
import * as path from 'path';

const tmpPath = path.resolve("./tests/out/", 'tmp-logger.json');

beforeEach(() => {
  const initial = { log: [], info: [], warn: [], error: [] };
  if (existsSync(tmpPath)){
    writeFileSync(tmpPath, JSON.stringify(initial));
  } else{
    
  }
});

afterAll(() => {
  if (existsSync(tmpPath)) {
    unlinkSync(tmpPath);
  }
});

describe('Logger', () => {
  test('initially loads an empty structure and can log records', () => {
    const logger = new Logger(tmpPath);
    // write a log entry
    logger.log({ message: 'hello' } as any);
    const content = JSON.parse(readFileSync(tmpPath, 'utf8')) as any;
    expect(content.log.length).toBe(1);
    expect(content.log[0]).toHaveProperty('id', 1);
    expect(content.log[0]).toHaveProperty('timestamp');
    expect(content.log[0]).toHaveProperty('data');
    expect(content.log[0].data).toEqual({ message: 'hello' });
  });

  test('grouping and id incrementation per log type', () => {
    const logger = new Logger(tmpPath);
    logger.log({ a: 1 } as any);
    logger.warn({ w: true } as any);
    logger.log({ b: 2 } as any);
    const content = JSON.parse(readFileSync(tmpPath, 'utf8')) as any;
    // two log entries in log group and one in warn
    expect(content.log.length).toBe(2);
    expect(content.log[0].id).toBe(1);
    expect(content.log[1].id).toBe(2);
    expect(content.warn.length).toBe(1);
    expect(content.warn[0].id).toBe(1);
  });
});


