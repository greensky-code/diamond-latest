import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbNav} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'pharmacy',
    templateUrl: './pharmacy.html',
    styleUrls: ['./pharmacy.component.scss']
})
export class PharmacyComponent implements OnInit {
    public subActiveTab = 1;

    @Input() groupNumber: string;
    @Input() groupName: string;
    @Input() seqGroupId: number;

    private tabSet: NgbNav;

    @ViewChild(NgbNav) set content(content: NgbNav) {
        this.tabSet = content;
    };

    constructor(public ngbActiveModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        console.log(this.seqGroupId);
    }

    ngAfterViewInit() {
        this.tabSet.select(this.subActiveTab);
    }
}
