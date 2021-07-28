import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class InputService {

    constructor() {}

    getInput(inputMap: any, inputId: string): void {
        let nextInputId = inputMap[inputId];
        if(nextInputId) {
            let element = document.getElementById(nextInputId);
            while(element && (element.getAttributeNode("readonly") || element.getAttributeNode("disabled"))) {
                nextInputId = inputMap[nextInputId];
                element = document.getElementById(nextInputId);
            }
            if(element) {
                element.focus();
            }
        }
    }

    getPreviousInputMap(nextInputMap: any) {
        let previousInputMap: any = {};
        Object.keys(nextInputMap).forEach(key => {
            let value = nextInputMap[key];
            previousInputMap[value] = key;
        });
        return previousInputMap;
    }

}
