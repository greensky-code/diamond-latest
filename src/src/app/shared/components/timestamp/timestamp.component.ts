import {AfterViewInit, ChangeDetectorRef, Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuditService} from "../../services/audit.service";

@Component({
    selector: 'timestamp',
    templateUrl: './timestamp.component.html',
})
export class TimestampComponent implements OnInit, AfterViewInit {

    @Input() title: string;
    @Input() insertUser: any;
    @Input() insertDateTime: any;
    @Input() insertProcess: any;
    @Input() updateUser: any;
    @Input() updateDateTime: any;
    @Input() updateProcess: any;

    @Input() showIcon = true;

    constructor(
        public activeModal: NgbActiveModal,
        private auditService: AuditService,
        private cdr: ChangeDetectorRef,
    ) {}
    ngOnInit(): void {
        this.insertDateTime = this.auditService.timestampView(this.insertDateTime);
        this.updateDateTime = this.auditService.timestampView(this.updateDateTime);
        this.cdr.detectChanges();
    }

    ngAfterViewInit(): void {

    }

    modalClose = () => {
        this.activeModal.close();
    }
}
