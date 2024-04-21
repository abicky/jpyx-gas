import { AnyNode, Cheerio, CheerioAPI, load } from 'cheerio';

function findCell($: CheerioAPI, tag: string, name: string): Cheerio<AnyNode> {
  const elem = $(`${tag}:contains("${name}")`);
  if (elem.length === 0) {
    throw new Error(`Cell with the text "${name}" was not found`);
  }
  if (elem.length > 1) {
    throw new Error(`Multiple Cells with the text "${name}" were found`);
  }

  return elem;
}

function _jpyx(url: string, prefix: string = '') {
  const res = UrlFetchApp.fetch(url);
  const $ = load(res.getContentText());

  const ttsCol = findCell($, 'th', `${prefix}TTS`).prevAll().length + 1;
  const ttbCol = findCell($, 'th', `${prefix}TTB`).prevAll().length + 1;

  const usdRow = findCell($, 'td', 'US Dollar').parent();
  const tts = +usdRow.find(`td:nth-child(${ttsCol})`).text();
  const ttb = +usdRow.find(`td:nth-child(${ttbCol})`).text();

  return [
    ['TTS', 'TTB', 'TTM', 'Data Source'],
    [tts, ttb, (tts + ttb) / 2, url],
  ];
}

export function JPYX(date: Date | string) {
  let year: string, month: string, day: string;
  if (typeof date === 'object') {
    year = date.getFullYear().toString();
    month = (date.getMonth() + 1).toString();
    day = date.getDate().toString();
  } else {
    [year, month, day] = date.split('-');
  }
  const dateString = `${+year - 2000}${month.padStart(2, '0')}${day.padStart(2, '0')}`;
  const url = `https://www.murc-kawasesouba.jp/fx/past/index.php?id=${dateString}`;
  return _jpyx(url);
}

export function JPYXLASTMONTH() {
  return _jpyx('https://www.murc-kawasesouba.jp/fx/lastmonth.php', '月末');
}
