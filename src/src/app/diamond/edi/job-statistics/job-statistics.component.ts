import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbToastType } from "ngb-toast";
import { DddwDtlService, SecUserService } from "../../../api-services";
import { SubmitterProfileMasterService } from "../../../api-services/submitter-profile-master.service";
import { ToastService } from "../../../shared/services/toast.service";

@Component({
    selector: 'process-edi-job-statistics',
    templateUrl: './job-statistics.component.html',
    styleUrls: ['./job-statistics.component.scss'],
    providers: [SubmitterProfileMasterService,
        SecUserService]
})
export class ProcessEdiJobStatisticsComponent implements OnInit {

    @Input() processEdi: any;
    statuses: any = [];

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private dddwDtlService: DddwDtlService,
        private toastService: ToastService,
        public activeModal: NgbActiveModal,
    ) {
    }

    ngOnInit(): void {
        this.getStatuses();
    }

    getStatuses() {
        this.dddwDtlService.findByColumnNameAndDwname("status", "dw_predi_setup_pick")
            .subscribe((codes) => {
                    this.statuses = codes;
                },
                (error) => {
                    this.toastService.showToast(
                        'An Error occurred while retrieving records.',
                        NgbToastType.Danger
                    );
                }
            );
    }

    getStatus(val: any) {
        if (val) {
            return this.statuses.find((sts: any) =>
                sts.dddwDtlPrimaryKey.dataVal === val)?.dddwDtlPrimaryKey.displayVal;
        }
        return '';
    }

    modalClose() {
        this.activeModal.dismiss();
    }
}
