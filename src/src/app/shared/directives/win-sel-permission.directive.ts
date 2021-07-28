import { Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { SecWinViewModel } from '../../view-model/security/sec-win-view-model';
import { PopUpMessage, PopUpMessageButton } from '../../shared/components/pop-up-message';
import { PopUpMessageComponent } from './../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SecWinService } from '../../api-services/security/sec-win.service';
import { SecWin } from '../../api-models/security/sec-win.model';
import { UntilDestroy } from '@ngneat/until-destroy';

class WinSelect {
    userTemplateId: string;
    secModuleId?: string;
    secWin: SecWinViewModel;
}

@UntilDestroy({ checkProperties: true })
@Directive({
    selector: '[appWinSelect]'
})
export class WinSelPermissionDirective implements OnInit, OnChanges {
    // TODO ---- need to check if we have already module-select permission by any shared-service  var
    @Input() appWinSelect: WinSelect;

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private modalService: NgbModal,
        private secWinService: SecWinService
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        const isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (isSuperUser) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            return true;
        }

        if (this.appWinSelect.secWin) {
            if (this.appWinSelect.secModuleId) {
                this.secWinService.getSecWin(this.appWinSelect.secModuleId, this.appWinSelect.userTemplateId).subscribe((secWin: SecWin) => {
                    const secWinModal = new SecWinViewModel(secWin);
                    if (secWinModal.hasSelectPermission()) {
                        this.hasPermission();
                    } else {
                        this.showPopUp('You are not Permitted to view MEMBER Module', 'Window Error')
                    }
                })
            }
        }
    }

    ngOnInit() {

    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        if (this.appWinSelect.secWin.hasSelectPermission()) {                           // if has win select permission then enable win
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.showPopUp('You are not Permitted to view MEMBER Master', 'Window Error')

            this.viewContainer.clear();
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
