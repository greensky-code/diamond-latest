export class Form {

    public static getValue(form: any, field: any){
        if(form.get(field) === null || form.get(field).value === null){
            return '';
        } else {
            return form.get(field).value;
        }

    }

    public static getDatePickerValue(form: any, field: any) {
        if(form.get(field) === null || form.get(field).value === null || form.get(field).value.date === null){
            return '';
        } else {
            const date = form.get(field).value.date;
            if(date){
                return `${date.year}-${date.month}-${date.day}`;
            }    
            else {
                return ''
            }
        }
    }

}