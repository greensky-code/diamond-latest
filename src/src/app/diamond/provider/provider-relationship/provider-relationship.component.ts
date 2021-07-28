import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { forkJoin } from 'rxjs';
import { PanelMaster } from '../../../api-models';
import { ProvContractVendor } from '../../../api-models/prov-contract-vendor.model';
import { ProvContract } from '../../../api-models/prov-contract.model';
import { ProvMaster } from '../../../api-models/prov-master.model';
import { ProvSpecialty } from '../../../api-models/prov-specialty.model';
import { ProviderMasterView } from '../../../api-models/provider-master-view';
import { ProvMasterService } from '../../../api-services';
import { ProvContractVendorService } from '../../../api-services/prov-contract-vendor.service';
import { ProvContractService } from '../../../api-services/prov-contract.service';
import { ProvSpecialtyService } from '../../../api-services/prov-specialty.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';

@Component({
  selector: 'app-provider-relationship',
  templateUrl: './provider-relationship.component.html',
  styleUrls: ['./provider-relationship.component.css'],
  providers: [
    Mask,
    AlertMessageService,
    DateFormatPipe,
    SecWinService,
    NgbModal,
    SecurityService,
    ProvMasterService,
    ProvSpecialtyService,
    ProvContractService,
    ProvContractVendorService
  ]
})
export class ProviderRelationshipComponent implements OnInit {

  providerRelationshipForm: FormGroup;
  formValidation: FormValidation;
  public alertMessage: AlertMessage;
  public displayMessage: any;
  public popUpMessage: PopUpMessage;
  public datePickerConfig = DatePickerConfig;
  public datePickerModel = DatePickerModel;
  public secWin: SecWinViewModel;
  @Input() showIcon: boolean = false;
  @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

  public dataGrid001GridOptions: GridOptions;
  public dataGrid002GridOptions: GridOptions;
  public dataGrid003GridOptions: GridOptions;
  private dataGrid001gridApi: any;
  private dataGrid001gridColumnApi: any;
  provMasters: ProvMaster[] = [];
  provMastersGrid2: ProvMaster[] = [];
  provMastersGrid3: ProvMaster[] = [];
  provSpecialtys: ProvSpecialty[] = [];
  provContractVendors: ProvContractVendor[] = [];
  provContracts: ProvContract[] = [];
  providerMasters: ProvMaster[] = [];
  
  providerMasterViews:ProviderMasterView[]=[];
  providerMasterView:ProviderMasterView;


  provSpecialty: ProvSpecialty;
  gridCount: number = 0;
  grid3Count: number = 0;
  counter1: number = 0;
  seqProvContract: number = 0;

  @Input() vendorProviderId?:any;
  apiResponse: any[] = [];

  showPopUp() {
    this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
    this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
    this.child.showMesssage()
  }

  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name == 'yes') {
      console.log("button yes has been click!");
    }
    if (button.name == 'no') {
      console.log("button No has been click!");
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name == 'poUpMessageName') {
      this.popupMessageHandler(button)
    }
  }


  constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    public activeModal: NgbActiveModal,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private provSpecialtyService: ProvSpecialtyService,
    private provMasterService: ProvMasterService,
    private provContractService: ProvContractService,
    private provContractVendorService: ProvContractVendorService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.displayMessage = {};
    this.providerMasterView=new ProviderMasterView();
    this.formValidation = new FormValidation(this.providerRelationshipForm);
    this.createDataGrid001();
    this.createDataGrid002();
    this.createDataGrid003();
    setTimeout(() => {
      this.getProvidersByVendorId(this.vendorProviderId);
    });
  }

  createForm() {
    this.providerRelationshipForm = this.formBuilder.group({
    }, { updateOn: 'submit' });
  }



  createDataGrid001(): void {
    this.dataGrid001GridOptions =
    {
      paginationPageSize: 50
    };
    this.dataGrid001GridOptions.editType = 'fullRow';
    this.dataGrid001GridOptions.columnDefs = [
      {
        headerName: "Provider ID",
        field: "providerId",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: "Short Name",
        field: "shortName",
        width: 200
      },
      {
        headerName: "Specialty",
        field: "specialtyType",
        width: 200
      }
    ];
  }
  createDataGrid002(): void {
    this.dataGrid002GridOptions =
    {
      paginationPageSize: 50
    };
    this.dataGrid002GridOptions.editType = 'fullRow';
    this.dataGrid002GridOptions.columnDefs = [
      {
        headerName: "Provider ID",
        field: "providerId",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: "Short Name",
        field: "shortName",
        width: 200
      },
      {
        headerName: "Specialty",
        field: "specialtyType",
        width: 200
      },
      {
        headerName: "Panel ID IPA",
        field: "provContract.panelId",
        width: 200
      },
      {
        headerName: "IPA",
        field: "provContract.ipaId",
        width: 200
      },
      {
        headerName: "Effective From",
        field: "provContract.effectiveDate",
        width: 200
      },
      {
        headerName: "Effective Thru",
        field: "provContract.termDate",
        width: 200
      }
    ];
    
  }
  createDataGrid003(): void {
    this.dataGrid003GridOptions =
    {
      paginationPageSize: 50
    };
    this.dataGrid003GridOptions.editType = 'fullRow';
    this.dataGrid003GridOptions.columnDefs = [
      {
        headerName: "Provider ID",
        field: "providerId",
        width: 200,
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      {
        headerName: "Short Name",
        field: "shortName",
        width: 200
      },
      {
        headerName: "Specialty",
        field: "specialtyType",
        width: 200
      },
      {
        headerName: "Panel ID",
        field: "contractPanelId",
        width: 200
      },
      {
        headerName: "IPA",
        field: "ipaId",
        width: 200
      },
      {
        headerName: "Effective From",
        field: "effectiveDate",
        width: 200
      },
      {
        headerName: "Effective Thru",
        field: "termDate",
        width: 200
      }
    ];
  }


  dataGrid001GridOptionsExportCsv() {
    var params = {
    };
    this.dataGrid001gridApi.exportDataAsCsv(params);
  }

  private dataGrid002gridApi: any;
  private dataGrid002gridColumnApi: any;

  dataGrid002GridOptionsExportCsv() {
    var params = {
    };
    this.dataGrid002gridApi.exportDataAsCsv(params);
  }

  private dataGrid003gridApi: any;
  private dataGrid003gridColumnApi: any;

  dataGrid003GridOptionsExportCsv() {
    var params = {
    };
    this.dataGrid003gridApi.exportDataAsCsv(params);
  }


  getProvidersByVendorId(seqVendId: number) {
    this.dataGrid001GridOptions.api.setRowData([]);
    this.dataGrid002GridOptions.api.setRowData([]);
    this.dataGrid003GridOptions.api.setRowData([]);
    this.provMasterService.findBySeqVendId(seqVendId).subscribe((provMasters: ProvMaster[]) => {
      if (provMasters !== null) {
        if (provMasters.length > 0) {
          this.gridCount = provMasters.length;
          provMasters.forEach(provMaster => {
            this.getProvSpecialtyBySeqVendId(provMaster);
          });
        }
      }
    }, (error: Error) => {

    });
  }



  getProvSpecialtyBySeqVendId(provMaster: ProvMaster) {
    this.provSpecialtyService.getBySeqProviderId(provMaster.seqProvId).subscribe((provSpecialtys: ProvSpecialty[]) => {
      provMaster.specialtyType = provSpecialtys[0].specialtyType;
      provMaster.provSpecialty = provSpecialtys[0];
      this.provMasters.push(provMaster);
      this.counter1 = this.counter1 + 1;
      this.showGrid001();
    }, (error: Error) => {
      this.counter1 = this.counter1 + 1;
      this.showGrid001();
    });
  }

  showGrid001() {
    if (this.gridCount === this.counter1) {
      this.dataGrid001GridOptions.api.setRowData(this.provMasters);
      this.getProviderContactBySeqProvId(this.vendorProviderId);
      this.getProviderContractVendor(this.vendorProviderId);
    }
  }



  getProviderContactBySeqProvId(vendorProviderId: any) {
    this.provContractService.findBySeqProviderId(vendorProviderId).subscribe((provContracts: ProvContract[]) => {
      let count = 0;
      if (this.provMasters.length > 0) {
        this.provMasters.forEach(provMaster => {
          if (provMaster.seqProvId === provContracts[0].seqProvId) {
            provMaster.provContract = provContracts[0];
            this.provMastersGrid2.push(provMaster);
          }
          count = count + 1;
          if (this.provMasters.length === count) {
            this.showGrid002();
          }else{
            this.dataGrid002GridOptions.api.setRowData([]);
          }
        });
      }
    }, (error: Error) => {
      this.dataGrid002GridOptions.api.setRowData([]);
    });
  }


  showGrid002() {
    if (this.provMastersGrid2.length > 0) {
      this.dataGrid002GridOptions.api.setRowData(this.provMastersGrid2);
    }else{
      this.dataGrid002GridOptions.api.setRowData([]);
    }
  }


  getProviderContractVendor(vendorProviderId: any) {
    this.provContractVendorService.findBySeqVendorId(vendorProviderId).subscribe((provContractVendors: ProvContractVendor[]) => {
      this.provContractVendors = provContractVendors;
      let count = 0;
      if (provContractVendors.length !== null) {
        this.provMastersGrid3 = [];
        if (provContractVendors.length > 0) {
          this.grid3Count = provContractVendors.length;
          provContractVendors.forEach(provContractVendor => {
            const apiResponse = this.provContractService.getProviderContract(provContractVendor.provContractVendorPrimaryKey.seqProvContract);
            this.apiResponse.push(apiResponse);
          });
          this.getContractProvider();
        }
      }
    }, (error: Error) => {
      
    });
  }

  getContractProvider() {
    forkJoin(this.apiResponse).subscribe((apiResponse: Array<any>) => {
      apiResponse.forEach((provContract: any, index) => {
        this.provContracts.push(provContract);
      });
      if (this.provContractVendors.length !== null) {
        this.provContractVendors.forEach(provContractVendor => {
          this.provMasters.forEach(provMaster => {
            this.setProviderMsterValues(provContractVendor, provMaster);
          });
        });
      }
    });
  }

  setProviderMsterValues(provContractVendor: ProvContractVendor, provMaster: ProvMaster) {
    if ((provContractVendor.provContractVendorPrimaryKey.seqProvId === provMaster.seqProvId)
      && (provContractVendor.provContractVendorPrimaryKey.seqProvId === provMaster.provSpecialty.seqProvId)
    ) {
      setTimeout(() => {
        this.proMaster(provMaster, provContractVendor.provContractVendorPrimaryKey.seqProvContract);
      });


    }
  }

  proMaster(provMaster: ProvMaster, seqProvContract: number) {
    let obj = new ProvMaster();
    obj = provMaster;
    this.seqProvContract = seqProvContract;
    obj.seqProvContract = this.seqProvContract;

    let provContract = this.getPanelId(obj.seqProvContract);
    obj.contractPanelId = provContract.panelId;
    obj.ipaId=provContract.ipaId;
   
    obj.effectiveDate=provContract.effDate;
    obj.termDate=provContract.trmDate;
    let pMaster = this.getProvMaster(obj)
   
  }

  getProvMaster(provMaster: ProvMaster) {
    this.providerMasterView=new ProviderMasterView();
    this.providerMasterView.seqProvId=provMaster.seqProvId;
    this.providerMasterView.providerId=provMaster.providerId;
    this.providerMasterView.shortName=provMaster.shortName;
    this.providerMasterView.specialtyType=provMaster.specialtyType;
    this.providerMasterView.contractPanelId=provMaster.contractPanelId;
    this.providerMasterView.seqProvContract=provMaster.seqProvContract;
    this.providerMasterView.ipaId=provMaster.ipaId;
    this.providerMasterView.effectiveDate=provMaster.effectiveDate;
    this.providerMasterView.termDate=provMaster.termDate;    
    this.providerMasterViews.push(this.providerMasterView);
    this.dataGrid003GridOptions.api.setRowData(this.providerMasterViews);
  }

  getProviderContractBySeqProvContract(seqProvContract: any, provMaster: ProvMaster) {
    this.provContractService.getProviderContract(seqProvContract).subscribe((provContract: ProvContract) => {
    }, (error: Error) => {
    });
  }


  getPanelId(seqProvContract: number): ProvContract {
    let provContractObj = new ProvContract();
    if (this.provContracts.length > 0) {
      this.provContracts.forEach(provContract => {
        if (seqProvContract === provContract.seqProvContract) {
          provContractObj = provContract;
          return provContractObj;
        }
      });
    }
    return provContractObj;
  }
}
