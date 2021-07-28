import { Component, Input, AfterViewInit, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FormValidation } from "../../../shared/validators/form-validation.pipe";

@Component({

    selector: 'info1',
    templateUrl: './auth-info1.html',
    providers: []

})
export class AuthInfo1  implements OnInit, AfterViewInit {
    ngOnInit(): void {
       console.log('inside authInfo1');
    }
    ngAfterViewInit(): void {
     debugger;
        this.createForm();
    }
    formData: any ={};
    formValidation: FormValidation;

    @Input() data:any;
    constructor(private formBuilder:FormBuilder)
    {
        

    }

    createForm() {
        this.patchForm1Info(this.data);
       
    }

    patchForm1Info(authMaster:any){
        this.formData = authMaster;
        }

}
