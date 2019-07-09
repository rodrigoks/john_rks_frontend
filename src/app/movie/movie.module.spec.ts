import { LogbookModule } from './logbook.module';

describe('LogbookModule', () => {
  let logbookModule: LogbookModule;

  beforeEach(() => {
    logbookModule = new LogbookModule();
  });

  it('should create an instance', () => {
    expect(logbookModule).toBeTruthy();
  });
});
