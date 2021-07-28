import {Injectable} from '@angular/core';
import {SearchModel} from '../../shared/models/models';
import {ProcedureCodeMasterLookup} from "../lookup/procedure-code-master-lookup";
import {SearchboxComponent} from "../components/searchbox/searchbox.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CompanyMasterLookup} from "../lookup/company-master-lookup";
import {GlReferenceLookup} from "../lookup/gl-reference-lookup";
import {ReasonCodeMasterCustomLookup} from "../lookup/reason-code-master-lookup";
import {InstitutionalAuthNumberLookup} from "../lookup/institutional-auth-number-lookup";
import {ProviderMasterLookup} from "../lookup/provider-master-lookup";
import {AuthCodesLookup} from "../lookup/auth-code-lookup";

export class LookupModel {
    searchModel: SearchModel;
    onRowSelected?: (response: any) => void = () => {};
}

@Injectable({
    providedIn: 'root'
})
export class LookupService {

    constructor(private modalService: NgbModal) {}

    openModal(lookupModel: LookupModel): void {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = lookupModel.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((response: any) => lookupModel.onRowSelected(response));
    }

    getProcedureCodeSearchModel(): SearchModel {
        return new SearchModel(
            "procedurecodemasters/lookup",
            ProcedureCodeMasterLookup.PROCEDURE_CODE_MASTER_ALL,
            ProcedureCodeMasterLookup.PROCEDURE_CODE_MASTER_DEFAULT,
            []
        );
    }

    openProcedureCodeModal(onRowSelected: (response: any) => void = () => {}): void {
        this.openModal({
            searchModel: this.getProcedureCodeSearchModel(),
            onRowSelected: onRowSelected
        });
    }

    getCompanyCodeSearchModel(): SearchModel {
        return new SearchModel(
            'companymasters/lookup',
            CompanyMasterLookup.ALL,
            CompanyMasterLookup.DEFAULT,
            [],
            true
        );
    }

    openCompanyCodeModal(onRowSelected: (response: any) => void = () => {}): void {
        this.openModal({
            searchModel: this.getCompanyCodeSearchModel(),
            onRowSelected: onRowSelected
        });
    }

    getGeneralLedgerReferenceSearchModel(): SearchModel {
        return new SearchModel(
            'generalledgerreferences/lookup',
            GlReferenceLookup.ALL,
            GlReferenceLookup.DEFAULT,
            [],
            true
        );
    }

    openGeneralLedgerReferenceModal(onRowSelected: (response: any) => void = () => {}): void {
        this.openModal({
            searchModel: this.getGeneralLedgerReferenceSearchModel(),
            onRowSelected: onRowSelected
        });
    }

    getReasonByTypeSearchModel(reasonCodeType: string): SearchModel {
        return new SearchModel(
            'reasoncodemasters/find-by-reasonCodeType/'+reasonCodeType,
            ReasonCodeMasterCustomLookup.REASONCODE_MASTER_ALL,
            ReasonCodeMasterCustomLookup.REASONCODE_MASTER_DEFAULT,
            [],
            false,
            false,
            'GET'
        );
    }

    openReasonByTypeModal(onRowSelected: (response: any) => void = () => {},
                          reasonCodeType: string): void {
        this.openModal({
            searchModel: this.getReasonByTypeSearchModel(reasonCodeType),
            onRowSelected: onRowSelected
        });
    }

    getAuthNumberSearchModel(): SearchModel {
        return new SearchModel(
            'instclaimheaders/lookup/authNumber',
            InstitutionalAuthNumberLookup.ALL,
            InstitutionalAuthNumberLookup.DEFAULT,
            [],
            true
        );
    }

    openAuthNumberModal(onRowSelected: (response: any) => void = () => {}): void {
        this.openModal({
            searchModel: this.getAuthNumberSearchModel(),
            onRowSelected: onRowSelected
        });
    }

    getPhysicianAdvisorSearchModel(): SearchModel {
        return new SearchModel(
            'provmasters/lookup2',
            ProviderMasterLookup.PROVIDER_MASTER_ALL2,
            ProviderMasterLookup.PROVIDER_MASTER_DEFAULT2,
            [],
            true
        );
    }

    openPhysicianAdvisorModal(onRowSelected: (response: any) => void = () => {}): void {
        this.openModal({
            searchModel: this.getPhysicianAdvisorSearchModel(),
            onRowSelected: onRowSelected
        });
    }

    getAuthCodeByTypeSearchModel(type: string): SearchModel {
        return new SearchModel(
            'authcodes/lookup/'+type,
            AuthCodesLookup.AUTH_CODE_ALL,
            AuthCodesLookup.AUTH_CODE_DEFAULT,
            [],
            true
        );
    }

    openAuthCodeByTypeModal(onRowSelected: (response: any) => void = () => {},
                          type: string): void {
        this.openModal({
            searchModel: this.getAuthCodeByTypeSearchModel(type),
            onRowSelected: onRowSelected
        });
    }

}
