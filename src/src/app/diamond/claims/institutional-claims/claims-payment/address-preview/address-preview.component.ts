import { Component,Input, OnInit } from '@angular/core';
import { ActivatedRoute , Router ,ParamMap} from '@angular/router';
import {InstClaimHeaderService} from '../../../../../api-services/inst-claim-header.service';
import {InstClaimHeader} from '../../../../../api-models/inst-claim-header.model';
import {ProvAddressService} from '../../../../../api-services/prov-address.service';


@Component({
  selector: 'app-address-preview',
  templateUrl: './address-preview.component.html',
  styleUrls: ['./address-preview.component.css'],
  providers:[InstClaimHeaderService , ProvAddressService]

  
})
export class AddressPreviewComponent implements OnInit {
  @Input() claimData : any  ; 

  @Input() claimNumber : any = 12345 ; 

  patchInstClaimHeader : InstClaimHeader ;
  instClaimHeader :InstClaimHeader;
  addresses : any [];
  address : any [];
  

  constructor(    private route : ActivatedRoute , private router :Router ,
    private instClaimHeaderService: InstClaimHeaderService ,
    private provAddressService: ProvAddressService,
    ) { }
  ngOnInit(): void {
    // this.address = this.claimData.provAddress ;
    // this.name = this.claimData.provAddress.name1
    this.claimNumber = this.route.snapshot.paramMap.get('claimNo');
    this.getInstClaimHeaderByClaimNumber(this.claimNumber);
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
          this.addresses = res.sort(function(a){
            if(a.primaryAddress == "Y"){
              return -1 ;
            }
          });
          ;

         
      }, error => {
          this.addresses = [];
      });
  
}

}
