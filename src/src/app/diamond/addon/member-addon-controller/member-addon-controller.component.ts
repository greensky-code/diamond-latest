import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {NgbActiveModal, NgbNav} from '@ng-bootstrap/ng-bootstrap';

@Component({
    
    selector: 'member-addon-controller',
    templateUrl: './member-addon-controller.component.html',
    styleUrls: ['./member-addon-controller.component.scss']
})
export class MemberAddonControllerComponent implements OnInit, AfterViewInit {
     @Input() activeTab = 1;

    
    @Input() seqAddressId: string = '11794296';
    @Input() subscriberId: string ;
    @Input() lastName: string;
    @Input() firstName: string;



    

    

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
