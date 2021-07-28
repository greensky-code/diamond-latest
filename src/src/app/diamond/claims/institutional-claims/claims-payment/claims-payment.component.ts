import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute , Router ,ParamMap} from '@angular/router' ;
import {InstClaimHeaderService} from '../../../../api-services/inst-claim-header.service';
import {InstClaimHeader} from '../../../../api-models/inst-claim-header.model';
import {ProvAddressService} from '../../../../api-services/prov-address.service';

@Component({
  selector: 'app-claims-payment',
  templateUrl: './claims-payment.component.html',
  styleUrls: ['./claims-payment.component.css']
})
export class ClaimsPaymentComponent implements OnInit {
  @Input() claimNumber : number = 12345 ; 

  patchInstClaimHeader : InstClaimHeader ;
  instClaimHeader :InstClaimHeader;
  addresses : any [];
  address : any [];
  


  constructor(
    private instClaimHeaderService: InstClaimHeaderService ,
    private provAddressService: ProvAddressService,
    private route : ActivatedRoute , 
    private router :Router
  ) { }

  ngOnInit(): void {
    this.getInstClaimHeaderByClaimNumber(this.claimNumber);

  }

  nextFunction(){
    this.router.navigate(['type-claim-payment'],{relativeTo : this.route})
  }

  backFunction(){
    this.router.navigate(['provider-claim-payment' , this.claimNumber],{relativeTo : this.route})
  } 
  addressPreview(){
    this.router.navigate(['address-preview-claim-payment' ,this.claimNumber],{relativeTo : this.route }) 

  }

  private getInstClaimHeaderByClaimNumber(value: any) {
    this.instClaimHeaderService.findByClaimNumber(value).subscribe((res) => {
        if (res) {
          this.instClaimHeader = res ;
          
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

}
