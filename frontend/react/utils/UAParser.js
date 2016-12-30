import UAParserBase from 'ua-parser-js';

const parser = new UAParserBase();

export default class UAParser {
  static get device() {
    const { os, browser } = parser.getResult();
    return {
      deviceModel: os.name,
      deviceOs: os.version,
      type: this.classifyType(browser)
    };
  }

  static classifyType(browser) {
    // Chrome Web PushかSafariかFirefoxかだけ判定
    const allowedBrowsers = ['Firefox', 'Chrome', 'Safari'];
    if (allowedBrowsers.includes(browser.name)) {
      return browser.name;
    }
    return 'Other Browse';
  }

}
