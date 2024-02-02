// dateUtils.js

import { format } from 'date-fns';

class DateUtils {
    static formatDate(dateString) {
        return dateString ? format(new Date(dateString), "yyyy-MM-dd HH:mm:ss") : "N/A";
    }
}

export default DateUtils;
