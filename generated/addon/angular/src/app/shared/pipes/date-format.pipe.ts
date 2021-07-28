import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatPipe {
    defaultDisplayDateFormat(date: Date) {
        return this.datePipe.transform(new Date(date), 'MM/dd/yyyy');
    }
    
    defaultDBDateFormat(date: Date) {
        return this.datePipe.transform(date, 'yyyy-MM-dd');
    }
    
    constructor(private datePipe: DatePipe) {

    }

}