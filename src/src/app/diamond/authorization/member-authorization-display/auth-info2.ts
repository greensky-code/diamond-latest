import { Component, OnInit, AfterViewInit, Input } from "@angular/core";
import {AuditService} from "../../../shared/services/audit.service";

@Component({

    selector: 'info2',
    templateUrl: './auth-info2.html',
    providers: []

})
export class AuthInfo2  implements OnInit, AfterViewInit {
    constructor(
        private auditService: AuditService,
    ) {
    }

    ngOnInit(): void {
        this.data.intakeDateTime = this.auditService.intakeDateTime(this.data.intakeDateTime);
    }
    ngAfterViewInit(): void {
        this.createForm();
    }
    formData: any ={};

    @Input() data:any;


    createForm() {
        this.patchForm1Info(this.data);

    }

    patchForm1Info(authMaster:any){
        this.formData = authMaster;

    }

}
