import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbNav} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'addon-controller',
    templateUrl: './addon-controller.component.html',
    styleUrls: ['./addon-controller.component.scss']
})
export class AddonControllerComponent implements OnInit, AfterViewInit {
    @Input() activeTab = 1;

    @Input() groupNumber: string = '00008A001';  // default value for testing.. TODO need to remove test values
    @Input() groupName: string = 'DORIS';
    @Input() seqAddressId: string = '11794296';

    @Input() seqGroupId: number;

    private tabSet: NgbNav;

    @ViewChild(NgbNav) set content(content: NgbNav) {
        this.tabSet = content;
    };


    constructor(public ngbActiveModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.tabSet.select(this.activeTab);
    }


}
