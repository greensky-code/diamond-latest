import {Injectable} from '@angular/core';
import {SecWinViewModel} from '../../view-model/security/sec-win-view-model';
import {PopUpMessage, PopUpMessageButton} from './../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
    providedIn: 'root'
})
export class SecurityService {

    constructor(private modalService: NgbModal) {
    }

    getCurrentUserToken() {
        const accessToken = sessionStorage.getItem('accessToken');
        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    checkInsertUpdatePermissions(isEditState: boolean, secWin: SecWinViewModel): boolean {
        const isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (isSuperUser) {
            return true;
        }
        if (isEditState) {
            if (secWin && secWin.hasUpdatePermission()) {
                return true;
            } else {
                return false;
            }
        } else {
            if (secWin && secWin.hasInsertPermission()) {
                return true;
            } else {
                this.showPopUp('You are not permitted to insert new Member Master', 'Member Master Permissions');
                return false;
            }
        }
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }


}
