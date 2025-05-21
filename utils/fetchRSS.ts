import axios from 'axios';
import {XMLParser} from 'fast-xml-parser';

export async function fetchRSSFeed(url: string) {
  const {data} = await axios.get(url);
  const parser = new XMLParser({ignoreAttributes: false});
  const parsed = parser.parse(data);
  return parsed.rss.channel.item;
}
