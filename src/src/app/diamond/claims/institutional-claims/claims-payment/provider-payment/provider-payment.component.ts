import { Component, Input, OnInit } from '@angular/core';
import {InstClaimHeaderService} from '../../../../../api-services/inst-claim-header.service';
import {InstClaimHeader} from '../../../../../api-models/inst-claim-header.model';
import {ProvAddressService} from '../../../../../api-services/prov-address.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from "@angular/router"




@Component({
  selector: 'app-provider-payment',
  templateUrl: './provider-payment.component.html',
  styleUrls: ['./provider-payment.component.css'] ,
  providers:[InstClaimHeaderService , ProvAddressService]
})
export class ProviderPaymentComponent implements OnInit {
  @Input() claimNumber ;
  patchInstClaimHeader : InstClaimHeader ;
  instClaimHeader :any;
  addresses : any [];
  providerForm :FormGroup ;
  address : any [];
  
  
  

  constructor(
    private instClaimHeaderService: InstClaimHeaderService ,
    private provAddressService: ProvAddressService,
    private formBuilder: FormBuilder ,
    private route : ActivatedRoute ,


  
  ) { }


  ngOnInit(): void {
    this.createForm();
    this.getInstClaimHeaderByClaimNumber(this.route.snapshot.paramMap.get('claimNo'));
  }

  getProviderAddress(){
   
  }

  private getInstClaimHeaderByClaimNumber(value: any) {
    this.instClaimHeaderService.findByClaimNumber(value).subscribe((res) => {
        if (res) {
          this.instClaimHeader = res ;
          
            this.patchClaimDetails();
            this.getAddresses();

        }

        
    });
}

private getAddresses() {
      this.provAddressService.findBySeqProvId(this.instClaimHeader.seqProvId).subscribe((res: any) => {
          this.addresses = res;
      }, error => {
          this.addresses = [];
      });
  
}

createForm(){
  this.providerForm = this.formBuilder.group({
    providerName: ['', {validators: [Validators.required]}],
    providerAddress1: ['', {validators: [Validators.required]}],
    providerAddress2: ['', {validators: [Validators.required]}],

    providerAddress3: ['', {validators: [Validators.required]}],
    bankName: ['', {validators: [Validators.required]}],
    bankAccountNo_BAN: ['', {validators: []}],
    routingNumber: ['', {validators: [Validators.maxLength(3)]}],
    notes: ['', {validators: [Validators.maxLength(3)]}],
    isBankAddress: ['', {validators: []}],
    
  })
}

patchClaimDetails(){
  let primaryAddress = this.instClaimHeader.provAddress ;
  let firstLine = primaryAddress.addressLine1 ;
  let lastLine = `${primaryAddress.city} ${primaryAddress.state} ${primaryAddress.zipCode} ${primaryAddress.country}` ;
  this.providerForm.patchValue({
    providerName: this.instClaimHeader.provMasterC.shortName ,
    providerAddress1:firstLine,
    providerAddress2:"",
    providerAddress3:lastLine,

  });
}




  

}
