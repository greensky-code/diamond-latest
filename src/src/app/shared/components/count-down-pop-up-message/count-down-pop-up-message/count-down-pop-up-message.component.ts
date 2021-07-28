import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../../../api-services/authentication.service';
import {interval} from 'rxjs/internal/observable/interval';
import {CountDownPopUpMessage} from '../count-down-pop-up-message.model';

@Component({
    selector: 'app-count-down-pop-up-message',
    templateUrl: './count-down-pop-up-message.component.html',
    styleUrls: ['./count-down-pop-up-message.component.css'],
    providers: []
})
export class CountDownPopUpMessageComponent implements OnInit {

    @Input() popupMessage: CountDownPopUpMessage;
    @ViewChild('popUpMessageModal') popUpMessageModal: any;
    @Output() buttonclickEvent = new EventEmitter<any>();
    infoIcon = faInfoCircle;

    private subscription: Subscription;
    countDownTimeSeconds = 2 * 60 * 1000;
    public dDay = this.countDownTimeSeconds;
    milliSecondsInASecond = 1000;
    SecondsInAMinute = 60;

    public timeDifference: any;
    public secondsToDday: any;

    constructor(private activeModal: NgbActiveModal, private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        this.subscription = interval(1000)
            .subscribe(x => {
                this.getTimeDifference();
            });
    }

    private getTimeDifference() {
        this.timeDifference = this.dDay - 1000;
        this.dDay = this.timeDifference;
        this.allocateTimeUnits(this.timeDifference);
        if (this.timeDifference <= 0) {
            this.subscription.unsubscribe();
            this.authenticationService.signOutNRedirect();
        }
    }

    private allocateTimeUnits(timeDifference: any) {
        this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
    }

    triggerClick(button: any) {
        button.popupMessage = this.popupMessage;
        if (button.name === 'Ok') {
            this.activeModal.close();
        } else {
            this.buttonclickEvent.next(button);
            this.activeModal.close();
        }
    }

    showMesssage() {
    }
}


