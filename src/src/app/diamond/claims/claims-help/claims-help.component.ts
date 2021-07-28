import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy({checkProperties: true})
@Component({
    selector: 'benefit-help',
    templateUrl: './claims-help.component.html',
    styleUrls: ['./claims-help.component.scss']
})
export class ClaimsHelpComponent implements OnInit {
    public subActiveTab = 1;
    baseUrl = '../../../../../assets/help';

    @Input() showIcon = true;
    @Input() defaultFile = '/Displaying_the_G_L_Reference_Codes_for_an_A_P_Transaction.htm';
    selectedPage = null;

    ngOnInit() {
        this.getFile(this.defaultFile); // get default file
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

            //     console.log(hrefValue);
            this.selectedPage = $event;
            this.getFile(hrefValue);


        } catch (e) {
            // TODO catch exception
        }
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
