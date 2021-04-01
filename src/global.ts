import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isBetween from 'dayjs/plugin/isBetween';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn'); // 全局使用

dayjs.extend(relativeTime);
dayjs.extend(isBetween);
