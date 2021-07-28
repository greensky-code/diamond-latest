import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor() { }

    public handleError(error: any): Observable<any> {
        var errorMessage = "";
        if (parseInt(error.status) == 0) {
            errorMessage = `An Error occurred while Processing request. Cannot Connect to server. Please make sure that web service is running.`;
        } else if (parseInt(error.status) == 404) {
            errorMessage = `A 404 error occurred while accessing URL ${error.url}. Page Not Found.`;
        } else if (parseInt(error.status) == 500) {
            errorMessage = `An Internal Server Error Occurred while accessing URL ${error.url}. ${error.statusText}`;
        } else if (parseInt(error.status) == 400) {
            errorMessage = `An error occurred while accessing URL ${error.url}. Bad Request`;
        } else {
            errorMessage = `An error occurred while accessing URL ${error.url}. ${error.statusText}`;
        }

        return of(errorMessage);
    }

}
