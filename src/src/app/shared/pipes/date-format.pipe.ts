
import { Injectable } from '@angular/core';
let momentTz = require('moment-timezone');

@Injectable({
    providedIn: 'root'
})
export class DateFormatPipe {
    defaultDisplayDateFormat(date: any) {
        if (date) {
            let  d = new Date(date);
            d.setMinutes(d.getMinutes() + d.getTimezoneOffset());
            return {
                singleDate: {
                    date: {
                        year: d.getFullYear(),
                        month: d.getMonth() + 1,
                        day: d.getDate()
                    },
                    jsDate: d
                }
            }
        }
       return '';
    }

    defaultDisplayDateFormatPlusOneDay(date: any) {
        if (date) {
            let d = momentTz(date).tz('UTC').utc().toDate();
            return {
                singleDate: {
                    date: {
                        year: d.getFullYear(),
                        month: d.getMonth() + 1,
                        day: d.getDate() + 1
                    },
                    jsDate: d
                }
            }
        }
        return '';
    }
}
