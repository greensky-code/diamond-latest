import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbNav} from "@ng-bootstrap/ng-bootstrap";
import {CiebAddonMeConfigService} from '../../../api-services/addon/cieb-addon-me-config.service';

@Component({
  selector: 'cignalinks-contacts',
  templateUrl: './cignalinks-contacts.component.html',
  styleUrls: ['./cignalinks-contacts.component.scss']
})

export class CignalinksContactsComponent implements OnInit, AfterViewInit {
    @Input() activeTab = 1;
    @Input() groupNumber: string;  // default value for testing.. TODO need to remove test values
    @Input() groupName: string;
    @Input() entityType: string;
    @Input() seqEntityId: string;
    @Input() seqAddressId: number;

    @Input() seqGroupId: number;

    private tabSet: NgbNav;

    @ViewChild(NgbNav) set content(content: NgbNav) {
        this.tabSet = content;
    };


    constructor(
        private ciebAddonMeConfigService: CiebAddonMeConfigService, public ngbActiveModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        
    }

    ngAfterViewInit() {
        this.tabSet.select(this.activeTab);
    }

}
