import { Component, OnInit, AfterViewInit, Input } from "@angular/core";

@Component({

    selector: 'info3',
    templateUrl: './auth-info3.html',
    providers: []

})
export class AuthInfo3 implements OnInit, AfterViewInit {
    ngOnInit(): void {
       console.log('inside authInfo1');
    }
    ngAfterViewInit(): void {
     debugger;
        this.createForm();
    }
    formData: any ={};

    @Input() data:any;
    constructor()
    {
        

    }

    createForm() {
        this.patchForm1Info(this.data);
       
    }

    patchForm1Info(authMaster:any){
        this.formData = authMaster;
       
        }

}
