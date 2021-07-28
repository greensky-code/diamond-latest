import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { CarrierMaster } from '../../../api-models/carrier-master.model';
import { CarrierMasterService } from '../../../api-services/carrier-master.service';
import { Mask } from '../../../shared/pipes/text-format.pipe';


@Component({
    selector: 'app-carrier-other-info',
    templateUrl: './carrier-other-info.component.html',
    styleUrls: ['./carrier-other-info.component.css'],
    providers: [
        DatePipe,
        Mask,
        CarrierMasterService,
    ],
})
export class CarrierOtherInfoComponent implements OnInit {

    @Input() showIcon: boolean = false;
    @Input() carrierCode: string;
    @Output() onSubmit = new EventEmitter<boolean>();
    carrierMaster = new CarrierMaster();

    constructor(private carrierMasterService: CarrierMasterService) { }

    ngOnInit(): void {
        console.log("this.carrierCode",this.carrierCode);
        this.carrierMasterService.getCarrierMaster(this.carrierCode).subscribe(response => {
            this.carrierMaster = response;
            console.log("this.carrierMaster",this.carrierMaster);
        });
    }

    public submitForm(): void {
        this.onSubmit.next(true);
    }

}
