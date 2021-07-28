import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy({checkProperties: true})
@Component({
    selector: 'member-help',
    templateUrl: './help.component.html',
})
export class HelpComponent implements OnInit {


    @Input() showIcon = true;
    @Input() currentWin = 'Enabling_Automatic_Subscriber_ID_Generation.htm';

    baseUrl = '../../../../../assets/help';
    selectedPage = null;

    ngOnInit() {
        this.getFile(this.currentWin); // get default file
    }

    constructor(private httpClient: HttpClient,
                public activeModal: NgbActiveModal) {
    }

    gotoPage($event) {
        try {
            $event.preventDefault();
            let hrefValue = '';
            if ($event.srcElement === undefined) {
                hrefValue = $event.originalTarget.attributes.href.value;
            } else {
                hrefValue = $event.srcElement.attributes.href.textContent;
                $event.srcElement.style.fontWeight = 'bold'
                $event.srcElement.style.color = 'green'
                this.selectedPage ? this.selectedPage.srcElement.style.fontWeight = '' : '';
                this.selectedPage ? this.selectedPage.srcElement.style.color = '' : '';
            }

      //      console.log(hrefValue);
            this.getFile(hrefValue);


        } catch (e) {
            // TODO catch exception
        }
        this.selectedPage = $event;
    }

    getFile(hrefValue: string) {
        if (!hrefValue) {
            return;
        }
        const headers = new HttpHeaders().set('Content-Type', 'text/html');
        this.httpClient.get(`${this.baseUrl}/${hrefValue}`, {headers, responseType: 'text'}).subscribe(resp => {
            let v = document.getElementById("myElement");
            v.innerHTML = resp;
        });
    }


}
