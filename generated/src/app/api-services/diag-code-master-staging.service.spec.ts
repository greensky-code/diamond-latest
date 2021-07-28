/* Copyright (c) 2020 . All Rights Reserved. */

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

import { DiagCodeMasterStagingService } from './diag-code-master-staging.service';
import { DiagCodeMasterStaging } from '../api-models/diag-code-master-staging.model'
import { DiagCodeMasterStagings } from "../api-models/testing/fake-diag-code-master-staging.model"

describe('DiagCodeMasterStagingService', () => {
  let injector: TestBed;
  let service: DiagCodeMasterStagingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiagCodeMasterStagingService]
    });
    injector = getTestBed();
    service = injector.get(DiagCodeMasterStagingService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDiagCodeMasterStagings', () => {
    it('should return an Promise<DiagCodeMasterStaging[]>', () => {
      const diagCodeMasterStaging = [
       {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01'},
       {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01'},
       {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01'}

      ];
      service.getDiagCodeMasterStagings().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/diagcodemasterstagings/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(diagCodeMasterStaging);
    });
  });


  describe('#createDiagCodeMasterStaging', () => {
    var id = 1;
    it('should return an Promise<DiagCodeMasterStaging>', () => {
      const diagCodeMasterStaging: DiagCodeMasterStaging = {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01'};
      service.createDiagCodeMasterStaging(diagCodeMasterStaging).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/diagcodemasterstagings`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDiagCodeMasterStaging', () => {
    var id = 1;
    it('should return an Promise<DiagCodeMasterStaging>', () => {
      const diagCodeMasterStaging: DiagCodeMasterStaging = {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01'};
      service.updateDiagCodeMasterStaging(diagCodeMasterStaging, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/diagcodemasterstagings/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDiagCodeMasterStaging', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDiagCodeMasterStaging(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/diagcodemasterstagings/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});