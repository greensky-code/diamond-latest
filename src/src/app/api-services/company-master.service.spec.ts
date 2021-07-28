/* Copyright (c) 2020 . All Rights Reserved. */

import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { CompanyMasterService } from './company-master.service';
import { CompanyMaster } from '../api-models/company-master.model'
import { CompanyMasters } from "../api-models/testing/fake-company-master.model"

describe('CompanyMasterService', () => {
  let injector: TestBed;
  let service: CompanyMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyMasterService]
    });
    injector = getTestBed();
    service = injector.get(CompanyMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCompanyMasters', () => {
    it('should return an Promise<CompanyMaster[]>', () => {
      const companyMaster = [
       {userDefined1:'sample data', agentCommissionPayAcct:'sample data', subscriberMinCheck:1234, vendorMinCheck:1234, country:'sample data', manCapPayAcct:'sample data', manMedPayAcct:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', irsTaxId:'sample data', tradePayAcct:'sample data', capPayAcct:'sample data', medicalPayAcct:'sample data', faxNumber:'sample data', phoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', name:'sample data', description:'sample data', companyCode:'sample data'},
       {userDefined1:'sample data', agentCommissionPayAcct:'sample data', subscriberMinCheck:1234, vendorMinCheck:1234, country:'sample data', manCapPayAcct:'sample data', manMedPayAcct:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', irsTaxId:'sample data', tradePayAcct:'sample data', capPayAcct:'sample data', medicalPayAcct:'sample data', faxNumber:'sample data', phoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', name:'sample data', description:'sample data', companyCode:'sample data'},
       {userDefined1:'sample data', agentCommissionPayAcct:'sample data', subscriberMinCheck:1234, vendorMinCheck:1234, country:'sample data', manCapPayAcct:'sample data', manMedPayAcct:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', irsTaxId:'sample data', tradePayAcct:'sample data', capPayAcct:'sample data', medicalPayAcct:'sample data', faxNumber:'sample data', phoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', name:'sample data', description:'sample data', companyCode:'sample data'}

      ];
      service.getCompanyMasters().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/companymasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(companyMaster);
    });
  });


  describe('#createCompanyMaster', () => {
    var id = 1;
    it('should return an Promise<CompanyMaster>', () => {
      const companyMaster: CompanyMaster = {userDefined1:'sample data', agentCommissionPayAcct:'sample data', subscriberMinCheck:1234, vendorMinCheck:1234, country:'sample data', manCapPayAcct:'sample data', manMedPayAcct:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', irsTaxId:'sample data', tradePayAcct:'sample data', capPayAcct:'sample data', medicalPayAcct:'sample data', faxNumber:'sample data', phoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', name:'sample data', description:'sample data', companyCode:'sample data'};
      service.createCompanyMaster(companyMaster).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/companymasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCompanyMaster', () => {
    var id = 1;
    it('should return an Promise<CompanyMaster>', () => {
      const companyMaster: CompanyMaster = {userDefined1:'sample data', agentCommissionPayAcct:'sample data', subscriberMinCheck:1234, vendorMinCheck:1234, country:'sample data', manCapPayAcct:'sample data', manMedPayAcct:'sample data', updateProcess:'sample data', updateUser:'sample data', updateDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', insertDatetime:'2018-01-01', securityCode:'sample data', irsTaxId:'sample data', tradePayAcct:'sample data', capPayAcct:'sample data', medicalPayAcct:'sample data', faxNumber:'sample data', phoneNumber:'sample data', zipCode:'sample data', state:'sample data', city:'sample data', addressLine2:'sample data', addressLine1:'sample data', name:'sample data', description:'sample data', companyCode:'sample data'};
      service.updateCompanyMaster(companyMaster, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/companymasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCompanyMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCompanyMaster(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/companymasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});
