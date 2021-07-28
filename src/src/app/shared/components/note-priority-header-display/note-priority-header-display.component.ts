import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteMaster } from '../../../api-models';
import { NoteMasterService } from '../../../api-services/notes/note-master.service';
import { NGBModalOptions } from '../../config';
import { NotesComponent } from '../notes/notes.component';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../pop-up-message';
import { PopUpMessageComponent } from '../pop-up-message/pop-up-message/pop-up-message.component';

@Component({
	selector: 'note-priority-header-display',
	templateUrl: './note-priority-header-display.component.html',
	providers: [NoteMasterService]
})
export class NotePriorityHeaderDisplayComponent implements OnInit {

	@Input() title: string = "";
	@Input() noteWinId: any;

	private _seqSourceId: number = -1;
    @Input() set seqSourceId(val: number) {
        if (val != -1 && this._seqSourceId != val) {
            this._seqSourceId = val;
			this.onDialogDisplay();
        }
    }
    get seqSourceId(): number {
        return this._seqSourceId;
    }

	priority: number = -1; 
	highPriorityNoteMasters: NoteMaster[] = [];

	constructor(public activeModal: NgbActiveModal,
		public noteMasterService: NoteMasterService,
		private modalService: NgbModal) { }

	ngOnInit() { }

	onDialogDisplay() {
		if(this.seqSourceId != -1) {
			this.noteMasterService.findHighPriorityNotesBySourceId(this.seqSourceId).subscribe(highPriorityNoteMasters => {
				this.highPriorityNoteMasters = highPriorityNoteMasters;
				if(this.highPriorityNoteMasters.length > 0) {
					this.priority = 2;
					let openflag: boolean = false;
					for(let noteMasters of this.highPriorityNoteMasters) {
						if(noteMasters.noteWinId == this.noteWinId)	{
							openflag = true;
							break;
						}
					}
					if(openflag) {
						this.showPriorityDisplayPopUp();
					}
				} 
			});
		}
	}

	showPriorityDisplayPopUp() {
		let popUpMessage = new PopUpMessage(
            'Notes Go To Window',
            'Notes Go To Window',
            'There are notes of a high priority that must be read!',
            'info',
            [],
            MessageType.WARNING
        );
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Ok', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
				let ref = this.modalService.open(NotesComponent, {
					...NGBModalOptions,
					windowClass: "dashboard-modal",
					size: <any>"xl",
				});
				ref.componentInstance.showIcon = true;
				ref.componentInstance.winId = this.noteWinId;
				ref.componentInstance.sourceId = this.seqSourceId;
				ref.componentInstance.showHighPriorityNotesOnly = true;
            } 
        });
    }
}


