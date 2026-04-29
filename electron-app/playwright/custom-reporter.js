class CustomReporter {
  constructor() {
    this.results = [];
  }

  onTestEnd(test, result) {
    const file = test.location.file;
    const fileName = file.split(/[\\/]/).pop();

    const fullTitle = test.titlePath().join(' ');
    const lang = fullTitle.includes('Greek') ? 'el' : fullTitle.includes('English') ? 'en' : 'unknown';

    this.results.push({
      title: test.title,
      status: result.status,
      duration: result.duration,
      file: fileName,
      lang,
    });
  }

  onEnd() {
    console.log('\n-- Test Summary:\n');

    for (const res of this.results) {
      let statusIcon = '❔';
      if (res.status === 'passed') statusIcon = '✅ ';
      else if (res.status === 'failed') statusIcon = '❌ ';
      else if (res.status === 'skipped') statusIcon = '⚠️';

      console.log(
        `${statusIcon} - [${res.file} | ${res.lang}] ${res.title} — ${res.status.toUpperCase()} (${res.duration ?? 0}ms)`,
      );
    }

    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    const skipped = this.results.filter(r => r.status === 'skipped').length;

    console.log(`\n✅  Passed:  ${passed}`);
    console.log(`❌  Failed:  ${failed}`);
    console.log(`⚠️ Skipped: ${skipped}`);
    console.log(`== Total:   ${this.results.length}\n`);
  }
}

module.exports = CustomReporter;
