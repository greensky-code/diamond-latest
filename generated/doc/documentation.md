## Getting Started

# Project Structure
The application is using Angular CLI(https://cli.angular.io/).
Angular cli is a command line interface to scaffold and build angular apps using nodejs style.
The advantage of using Angular cli is that developer can build application without much configuration needed and so developer can focus on what really needs to be done. 

### Angular CLI configuration
The .angular-cli.json is the main configuration of angular cli.
You can find this at the project root directory.
This is where you configure the main entry point or the main.ts file.
your index.html, polyfills, your css styles, third party css style, 
third party javascript file, the environment, unit test and e2e test configuration
and many more.

### TsConfig
The ```src/tsconfig.json``` is where you configure the target compiler 
and this application is targetting es5.

### Css styling, bootstrap, and third party css styling.
You can find the configuration in the .angular-cli.json under styles.
its a list of all css style that the application used including third party
library that has a custom css styling like ag-grid. 

```
"styles": [
"test.css",
"styles.css",
"../node_modules/bootstrap/dist/css/bootstrap.min.css",
"../node_modules/font-awesome/css/font-awesome.css",
"../node_modules/ag-grid/dist/styles/ag-grid.css",
"../node_modules/ag-grid/dist/styles/theme-fresh.css"
],
```

### Environment
Just like any other framework, angular has also an environment management
feature where you can specify what environment to use when you build and deploy.
Why you need to use different environment? 
Its because the Url that you use when you run your application is different 
from the url that you use in the production.
And not just that, environment is also usefull if you have global variable 
that is specific for your local and production.

The environment is located at src/environment.
the default environment is the environment.ts, why? because this is what configured as the
environmentSource in the ```.angular-cli.json```.
```
      "environmentSource": "environments/environment.ts",
      "environments": {
        "dev": "environments/environment.ts",
        "prod": "environments/environment.prod.ts"
      }
```
to use production environment use --prod parameter when building and compiling.
example:
ng build --prod --env=prod


## Main Entry Point
The ```src/main.ts``` is your main entry point.
The main.ts bootstrap the Appmodule.
The Appmodule(```src/app/app.module.ts```) is the main module.
This is where you import angular built-in module(CoreModule, BrowserModule, ReactiveFormsModule, etc), Featured module and third party module.
It also import the routing module where the url of your application is configured.

# Form & Form Validation
This project used Reactive form (https://angular.io/guide/reactive-forms)
The advantage using Reactive form compare to template driven form is that the
value and validity updates are always synchronous and under your control.

## Form and Form Control.

### HTML
```
            <form [formGroup]="locationForm" novalidate>
             <h4 class="mb-3">Location</h4>
            <div class="form-group row">
                <!-- Textbox with label of Location ID -->
                 <div class="col-md-2" [ngClass]="{'has-danger': formValidation.isValidField('locationId') }">
                     <label class="form-control-label" for="locationId" i18n>Location ID</label>
                     <input type="text" id="locationId"  class="form-control" formControlName="locationId"/>
                      <small class="text-danger" *ngIf="formValidation.isValidField('locationId')">
                      {{ formValidation.errorMessage('locationId') }}
                     </small>
                 </div>
            </div>
        </form>    
 ```



When creating a form you need to specify the formgroup in the example above we specify 'locationForm'

```<div class="col-md-2" [ngClass]="{'has-danger': formValidation.isValidField('locationId') }"> ```
using the ngclass directive, we specify the 'has-danger' bootstrap class when locationId is not valid.
this will prompt user that there is an error in the input.
```<input type="text" id="locationId"  class="form-control" formControlName="locationId"/>```
FormControl Name(https://angular.io/api/forms/FormControlName) 
This is where you specify the name of your form control that you want to link in your object
when setting and getting values of the form.

```                    
<small class="text-danger" *ngIf="formValidation.isValidField('locationId')">
    {{ formValidation.errorMessage('locationId') }}
</small>
```
This is a used to display error message if there is an error in the field.
It will check if field is invalid, if field is Invalid, error message will show up.
formValidation is a custom Pipe located at src/app/shared/components/form-validation.pipe
formValidation pipe is responsible for constructing error message.

### Typescript
    locationForm: FormGroup;
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.locationForm = this.formBuilder.group({
            streetAddress: ['', {updateOn: 'blur', validators: [Validators.required] }],
            postalCode: ['', {updateOn: 'blur', validators: [] }],
            city: ['', {updateOn: 'blur', validators: [] }],
            stateProvince: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

In the First Line Above we define locationForm as A formGroup. Note that is the same formGroup name that we have specify in our Html.
The createForm() method will be called on ```ngOnInit``` or when the form starts up.
In the locationForm we specify all form control name, locationId, streetAddress, postatlCode, etc.

In the line ```streetAddress: ['', {updateOn: 'blur', Validators: [Validators.required] }]```, we specify that the initial value  a form control is empty. 
If you want to specify initial value you can do something like this.
```streetAddress: ['Initial value of textbox', {updateOn: 'blur', validators: [validators.required] }]```
the ```updateOn```(https://netbasal.com/boosting-performance-with-the-new-updateon-option-in-angular-v5-18857279ace2) is a new feature of angular5 where data is set when action is triggered.
in this example the textbox data will be updated on blur or when the user leave the textbox.

```validators: [Validators.required]```
Validators key accept list of validators(https://angular.io/api/forms/Validators), this can be built it validators or custom validators.
example of built in validators are:

Validators.required
Validators.min
Validators.max
Validators.requiredTrue
Validators.email
Validators.minLength
Validators.minLength
Validators.maxLength
Validators.nullValidator

Take a look the full list here (https://angular.io/api/forms/Validators)

## API Models
Models are located at src/app/api-models.ts
model is a class that is used to hold data when calling http calls in the back end.
Take note that property naming convention is named using camelCase.
And the api back-end should be using the same naming convention.

```
export class Location {
  city: string;
  locationId: number;
  postalCode: string;
  stateProvince: string;
  streetAddress: string;
  countryId: number;
}
```

Basic Type Script Data Type:

boolean
number
string
Date

it can be also an array of object like ```string[]```

```
export class Employees {
  employeeId: number;
  firstName: string;
  hireDate: Date;
  lastName: string;
  skills: string[];
}
```

api-models also has an index.ts that export all models in the directory.
this is so, you dont need to specify the model name when you import a class.
just call the index

## API service
api-services is used to call http service in the back-end.
this is located at src/app/api-services.
this contains several method that is used for retrieving, updating, and deleting http service call.

Example of Service:

```
{{ typescript_copyright() }}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Location } from '../api-models/location.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'

@Injectable()
export class LocationService {

    private locationUrl: string = `${environment.apiUrl}/locations`;
    
    constructor(private httpClient : HttpClient) {

    }

    getLocations(): Promise<Location[]> {
        return this.httpClient.get(this.locationUrl, {observe: 'response'})
            .toPromise()
            .subscribe(response => response.body as Location[])
            .catch(this.handleError)
    }

    getLocation(locationId : number): Promise<Location> {
        return this.httpClient.get(`${this.locationUrl}/${locationId}`, {observe: 'response'})
            .toPromise()
            .subscribe(response => response.body as Location)
            .catch(this.handleError)
    }

    createLocation(location : Location): Promise<any> {
        let body = JSON.stringify(location);
        return this.httpClient.post(this.locationUrl, body, {observe: 'response'})
            .toPromise()
            .subscribe(response => response.body)
            .catch(this.handleError)
    }

    updateLocation(location : Location, locationId : number): Promise<any> {
        let body = JSON.stringify(location);
        return this.httpClient.put(`${this.locationUrl}/${locationId}`, body, {observe: 'response'})
            .toPromise()
            .subscribe(response => response.body)
            .catch(this.handleError)
    }

    deleteLocation(locationId : number): Promise<any> {
        return this.httpClient.delete(`${this.locationUrl}/${locationId}`, {observe: 'response'})
            .toPromise()
            .subscribe(response => response.body)
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        var errorMessage = "";
        if(parseInt(error.status) == 0) {
            errorMessage = `An Error occurred while Processing request. Cannot Connect to server. Please make sure that web service is running.`;
        }
        else if (parseInt(error.status) == 404) {
            errorMessage = `A 404 error occurred while accessing URL ${error.url}. Page Not Found.`;
        }
        else if (parseInt(error.status) == 500) {
            errorMessage = `An Internal Server Error Occurred while accessing URL ${error.url}. ${error.statusText}`;
        }
        else if (parseInt(error.status) == 400) {
            errorMessage = `An error occurred while accessing URL ${error.url}. Bad Request`;
        }
        else {
            errorMessage = `An error occurred while accessing URL ${error.url}. ${error.statusText}`;
        }

        return Promise.reject(errorMessage);
   }
}

```
Api-service used HttpClient module to perform http request.
The baseUrl and apiUrl is located at src/environment.
The environment.ts is used for development and the environment.prod.ts is used for production.
By default the environement.ts or the development environment is the default environment.
You can use the production by specifying --env=prod when you compile or run the application.

Service method that request list of objects.
```
    getLocations(): Promise<Location[]> {
        return this.httpClient.get(this.locationUrl, {observe: 'response'})
            .toPromise()
            .subscribe(response => response.body as Location[])
            .catch(this.handleError)
    }

```
This method Returns a Promise of List of Location.
```Location[]``` indicate that it is a list of location and not a single instance of location.
This method does NOT have any parameter.
By default httpClient.get returns an Observable and then we use the toPromise() to convert observable to Promise.

Back-end URL: http://localhost:8080/api/locations

This is how you call this method in your component.
    ```
        this.locationService.getLocations().subscribe(locations => {
            this.locations = locations;
        }, error => {
            this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    ```


Service method that request a single instance of object.
```
    getLocation(locationId : number): Promise<Location> {
        return this.httpClient.get(`${this.locationUrl}/${locationId}`, {observe: 'response'})
            .toPromise()
            .subscribe(response => response.body as Location)
            .catch(this.handleError)
    }
```

This method has a primary key ID parameter and return a Promise of Location instance.
Back-end URL: http://localhost:8080/api/locations/1

This is how you call this method in your component.
    ```
        this.locationService.getLocation(locationId).subscribe(location => {
            this.location = location;
             this.locationForm.patchValue({
                'locationId': this.location.locationId,
                'streetAddress': this.location.streetAddress,
                'postalCode': this.location.postalCode,
                'city': this.location.city,
                'stateProvince': this.location.stateProvince,
            });

        }, error => {
            this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    ```

The locationForm.patchValue is used to update the value of the form control after the http service call.

Service method that create an object.

```
    createLocation(location : Location): Promise<any> {
        let body = JSON.stringify(location);
        return this.httpClient.post(this.locationUrl, body, {observe: 'response'})
            .toPromise()
            .subscribe(response => response.body)
            .catch(this.handleError)
    }
```
Basically this method used http Post method.
It has an instance of object parameter 

Back-end URL: http://localhost:8080/api/locations/

This is how you call this method in your component.
```
    let location = new Location();
    location.streetAddress = this.locationForm.get('streetAddress').value;
    location.postalCode = this.locationForm.get('postalCode').value;
    location.city = this.locationForm.get('city').value;
    location.stateProvince = this.locationForm.get('stateProvince').value;
    this.locationService.createLocation(location).subscribe(response => {
        this.alertMessageService.info("Record successfully created.");
    }, error => {
        this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
    });
```
The first thing to do to call this method is to create an instance of your object, Then set the value of your object. 

```location.streetAddress = this.locationForm.get('streetAddress').value;``` 

This line get the value from form control and set it to streetAddress property. 
If the request is successful and the Http calls return a 200 http response code then
it will display a success message, otherwise it will display an error message.


# Installing Third Party Package
You can install third party library by using npm install command.
You can find all installed library in the package.json of project root directory.
Third party library has its own configuration on how to configure,
But at the minimum you need to import the third party library in the app module
or in the featured module/Sub module of the app and it in the import statement.

# Build & Deployment


# DataGrid/ag-grid
The application uses ag-grid library for the data grid user interface.
ag-grid is an open source data grid library.
There is also ag-grid-enterprise which is the paid version of ag-grid and has more feature
than ag-grid. But dont worry, all basic requirements of a data-grid is covered by ag-grid.

### Configuration
ag-grid is imported at the app module so it will be available in all featured module.
```
Import AgGridModule in App.Module
import {AgGridModule} from "ag-grid-angular/main";
 
 
@NgModule({
imports: [
      AgGridModule.withComponents([]),
      ...,
],

```

To use ag-grid in the component, you need to setup the GridOptions.
```
import {Component} from "@angular/core";
import {GridOptions} from "ag-grid-community";
 
 
@Component({
selector: 'fcp-app',
moduleId: module.id
templateUrl: './my-grid-application.component.html'
})
export class MyGridApplicationComponent {
    private gridOptions: GridOptions;
 
    constructor() {
        this.gridOptions = {};
        this.gridOptions.columnDefs = [
            {
                headerName: "ID",
                field: "ID",
                width: 100
            },
            {
                headerName: "Printer Name",
                field: "printername",
                width: 100
            },
                        {
                headerName: "Number of Copies",
                field: "numcopies",
                width: 200
            },
        ];
        this.gridOptions.rowData = [
            {ID: 1, printername: "Printer 1", numcopies:10},
            {ID: 2, printername: "Printer 2", numcopies:20},
            {ID: 3, printername: "Printer 3", numcopies:30}
        ]
    }
}
```
```columnDefs``` is the configuration of column where you specify the Header name which is
the text of the column header. the field which should be the same name of the model property.
and the width of the column. 
The ```rowData``` is the data that is used to populate the grid row.
in this example the row data is hard coded, this is just to show how to use
the rowData but in the reality this be set by calling the service that populate the object model
and set the rowdata.


# Reports
The application is using PdfMake Library for generating pdf reports.
A report is a Service Type and can be injected in the component and 
can be call like how the service is called. 
A report is layout in a tabular format.
you will have specify the column header, and the data in the row.


Example of ReportService:
```
import { Injectable } from '@angular/core';
import { PrintJob } from './printjob';
 
@Injectable()
export class PrintJobPdfService {
    createPdf(printjobs: PrintJob[]): any {
        var items = printjobs.map(function(item) {
            return [{
                    text: item.id.toString()
                },
                {
                    text: item.printerName
                },
                {
                    text: item.numPages
                }
            ];
        });
 
        return {
            content: [{
 
                    table: {
                        widths: [100, 100, 100],
                        body: [
                            [{
                                    text: 'ID'
                                },
                                {
                                    text: 'Printer Name'
                                },
                                {
                                    text: 'Number of Copies'
                                }
                            ]
                        ].concat(items)
                    }
                }
 
            ]
        }
    }
}
```

Below is an example on how to call a service in the component.

```
    getPrinJobs(): void {
        this.printjob_data_service
            .getPrintJobs()
            .subscribe(printjobs => this.printjobs = printjobs);
    }
    
   pdf: any;
   openPdf() {
       this.getPrinJobs();
       this.pdf = pdfMake;
       this.pdf.createPdf(this.printjobpdfservice.createPdf(this.printjobs)).open();
   }

```



# Unit Test
The application uses jasmine(https://jasmine.github.io/) framework for testing.
and a tool called Karma that is used as a test runner.
When you run the unit test, by executing ```ng test``` in the root directory
of the application
a browser will open and will perform testing. It display the test that
is being run, the passing tests, the failing tests, and show you the error 
of the unit test if there failing unit test. 

Unit test is named after module/component name with a .spec.ts file extension.
and reside at the same directory of the module/component


### How unit test is configured?
Take a look on karma.conf.js, This is where you specify 
the fremakework to use and the required plugins that is needed in order 
to run the unit test. You can also set the browser to use for testing, 
so you can be sure that it can be run in all major browser.

If you wonder how karma find the unit test files or the spec files,
There is a tsconfig for unit test and test.ts located at src/app/tsconfig.spec.json
and src/app/test.ts respectively that is used to set the pattern on how to load the unit test recursively.
```
  "files": [
    "test.ts"
  ],
  "include": [
    "**/*.spec.ts",
    "**/*.d.ts"
  ]
  ```
###Unit Testing with Services
A service is used to call http back-end to provide data into our component.
In this section We will be testing the hehavior of the Service.

Below are the example of Service
```
import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AlertMessageService, AlertMessage } from "../shared/alert-message/index";
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { DepartmentService } from './department.service';
import { Department } from '../api-models/department.model'
import { Departments } from "../api-models/testing/fake-department.model"

describe('DepartmentService', () => { //The Service that you are testing
  let injector: TestBed;
  let service: DepartmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService]
    });
    injector = getTestBed();
    service = injector.get(DepartmentService); 
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  
  describe('#getDepartments', () => {
    it('should return an Promise<Department[]>', () => {
      const department = [
       {managerId:1234, locationId:1234, departmentName:'sample data', departmentId:1234},
       {managerId:1234, locationId:1234, departmentName:'sample data', departmentId:1234},
       {managerId:1234, locationId:1234, departmentName:'sample data', departmentId:1234}

      ];
      service.getDepartments().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/departments`);
      expect(req.request.method).toBe("GET");
      req.flush(department);
    });
  });


  describe('#createDepartment', () => {
    var id = 1;
    it('should return an Promise<Department>', () => {
      const department: Department = {managerId:1234, locationId:1234, departmentName:'sample data', departmentId:1234};
      service.createDepartment(department).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/departments`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDepartment', () => {
    var id = 1;
    it('should return an Promise<Department>', () => {
      const department: Department = {managerId:1234, locationId:1234, departmentName:'sample data', departmentId:1234};
      service.updateDepartment(department, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/departments/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDepartment', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDepartment(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/departments/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});
```
Basically you need to import the service that you will be testing, as well as the model that well be used to hold the data.
```describe('DepartmentService', () => {``` This is the main body of the test, It means that you are testing the behavior of entire DepartmentService class. You will also notice that inside main body of the test you will
find another ```describe``` statement, example ```describe('#getDepartments', () => {``` this is intended
to test specific method in the service. and then inside that ```describe``` statement there are ```it``` statement example
```it('should return an Promise<Department[]>', () => {``` this is to test each behavior of the method.

Before we can test each method in the service we will first define our TestBed, 
The TestBed creates a dynamically-constructed Angular test module that emulates an Angular @NgModule.
Imagine this, Services are used in the component,
Testbed is something like a component where you can call the and test the service.
 
See example below:
```
 describe('DepartmentService', () => { 
  let injector: TestBed;
  let service: DepartmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DepartmentService]
    });
    injector = getTestBed();
    service = injector.get(DepartmentService); 
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
```

Testing Get method.
In this example, we are testing the getDepartments method.
if it calls with the correct url, and the correct http method and if 
it returns the expected list of department.
```
  describe('#getDepartments', () => {
    it('should return an Promise<Department[]>', () => {
      const department = [
       {managerId:1234, locationId:1234, departmentName:'sample data', departmentId:1234},
       {managerId:1234, locationId:1234, departmentName:'sample data', departmentId:1234},
       {managerId:1234, locationId:1234, departmentName:'sample data', departmentId:1234}
      ];
      service.getDepartments().subscribe(users => {
        expect(users.length).toBe(3);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/departments`);
      expect(req.request.method).toBe("GET");
      req.flush(department);
    });
  });
```


# E2E TEST
E2E test can be found at the e2e directory.
To run e2e test execute ```ng e2e``` angular cli command.
This will open a browser, navigate the screen and perform testing.
There are only few e2e test in the generated code but it's a Good 
starting point to create e2e test since it is already configured.

# Pipe
Aside from angular built-in  pipe
You can also find the custom pipe inside ```src/app/shared``` directory.
custom pipe are as follows:

number.format.pipe
-Transform number into decimal with thousand operator.
text-format
-This is used for masking textbox input like zip-code, phone number and driver license number.
form-validation.pipe
-This is used in the form validation. These handles the basic form validation of the form like the required field.
max length, min length, email and many more. you can also add your custom form validation error message into this pipe.



