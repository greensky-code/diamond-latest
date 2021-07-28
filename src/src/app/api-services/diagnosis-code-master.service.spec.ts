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

import { DiagnosisCodeMasterService } from './diagnosis-code-master.service';
import { DiagnosisCodeMaster } from '../api-models/diagnosis-code-master.model'
import { DiagnosisCodeMasters } from "../api-models/testing/fake-diagnosis-code-master.model"

describe('DiagnosisCodeMasterService', () => {
  let injector: TestBed;
  let service: DiagnosisCodeMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DiagnosisCodeMasterService]
    });
    injector = getTestBed();
    service = injector.get(DiagnosisCodeMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getDiagnosisCodeMasters', () => {
    it('should return an Promise<DiagnosisCodeMaster[]>', () => {
      const diagnosisCodeMaster = [
       {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', productServiceIdQualifier:'sample data'},
       {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', productServiceIdQualifier:'sample data'},
       {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', productServiceIdQualifier:'sample data'}

      ];
      service.getDiagnosisCodeMasters().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/diagnosiscodemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(diagnosisCodeMaster);
    });
  });


  describe('#createDiagnosisCodeMaster', () => {
    var id = 1;
    it('should return an Promise<DiagnosisCodeMaster>', () => {
      const diagnosisCodeMaster: DiagnosisCodeMaster = {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', productServiceIdQualifier:'sample data'};
      service.createDiagnosisCodeMaster(diagnosisCodeMaster).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/diagnosiscodemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateDiagnosisCodeMaster', () => {
    var id = 1;
    it('should return an Promise<DiagnosisCodeMaster>', () => {
      const diagnosisCodeMaster: DiagnosisCodeMaster = {diagnosisCode:'sample data', shortDescription:'sample data', description:'sample data', dxClass1:'sample data', dxClass2:'sample data', dxClass3:'sample data', fromAge:1234, toAge:1234, patientGender:'sample data', traumaFlag:'sample data', caseManagement:'sample data', procedureClass:'sample data', mdcCode:'sample data', editFlag:'sample data', operProcedureFlag:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', drgDefaultBirthweight:1234, effectiveDate:'2018-01-01', termDate:'2018-01-01', productServiceIdQualifier:'sample data'};
      service.updateDiagnosisCodeMaster(diagnosisCodeMaster, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/diagnosiscodemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteDiagnosisCodeMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteDiagnosisCodeMaster(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/diagnosiscodemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});