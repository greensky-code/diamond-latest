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

import { BenefitPackageMasterService } from './benefit-package-master.service';
import { BenefitPackageMaster } from '../api-models/benefit-package-master.model'
import { BenefitPackageMasters } from "../api-models/testing/fake-benefit-package-master.model"

describe('BenefitPackageMasterService', () => {
  let injector: TestBed;
  let service: BenefitPackageMasterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BenefitPackageMasterService]
    });
    injector = getTestBed();
    service = injector.get(BenefitPackageMasterService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBenefitPackageMasters', () => {
    it('should return an Promise<BenefitPackageMaster[]>', () => {
      const benefitPackageMaster = [
       {benefitPackageId:'sample data', shortDescription:'sample data', narrative:'sample data', subPeNotCovDays:1234, subPeConditnDays:1234, depPeNotCovDays:1234, depPeConditnDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProcessingOrderId:1234, applyPatlibTo:'sample data', patientLiability:'sample data', patlibPercent:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'},
       {benefitPackageId:'sample data', shortDescription:'sample data', narrative:'sample data', subPeNotCovDays:1234, subPeConditnDays:1234, depPeNotCovDays:1234, depPeConditnDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProcessingOrderId:1234, applyPatlibTo:'sample data', patientLiability:'sample data', patlibPercent:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'},
       {benefitPackageId:'sample data', shortDescription:'sample data', narrative:'sample data', subPeNotCovDays:1234, subPeConditnDays:1234, depPeNotCovDays:1234, depPeConditnDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProcessingOrderId:1234, applyPatlibTo:'sample data', patientLiability:'sample data', patlibPercent:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'}

      ];
      service.getBenefitPackageMasters().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/benefitpackagemasters/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(benefitPackageMaster);
    });
  });


  describe('#createBenefitPackageMaster', () => {
    var id = 1;
    it('should return an Promise<BenefitPackageMaster>', () => {
      const benefitPackageMaster: BenefitPackageMaster = {benefitPackageId:'sample data', shortDescription:'sample data', narrative:'sample data', subPeNotCovDays:1234, subPeConditnDays:1234, depPeNotCovDays:1234, depPeConditnDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProcessingOrderId:1234, applyPatlibTo:'sample data', patientLiability:'sample data', patlibPercent:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'};
      service.createBenefitPackageMaster(benefitPackageMaster).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitpackagemasters`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBenefitPackageMaster', () => {
    var id = 1;
    it('should return an Promise<BenefitPackageMaster>', () => {
      const benefitPackageMaster: BenefitPackageMaster = {benefitPackageId:'sample data', shortDescription:'sample data', narrative:'sample data', subPeNotCovDays:1234, subPeConditnDays:1234, depPeNotCovDays:1234, depPeConditnDays:1234, securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', seqProcessingOrderId:1234, applyPatlibTo:'sample data', patientLiability:'sample data', patlibPercent:1234, userDate1:'2018-01-01', userDate2:'2018-01-01', userDate3:'2018-01-01', userDate4:'2018-01-01', userDate5:'2018-01-01', userDate6:'2018-01-01', userDate7:'2018-01-01', userDate8:'2018-01-01', userDate9:'2018-01-01', userDate10:'2018-01-01', userDate11:'2018-01-01', userDate12:'2018-01-01', userDate13:'2018-01-01', userDate14:'2018-01-01', userDate15:'2018-01-01', userDate16:'2018-01-01', userDate17:'2018-01-01', userDate18:'2018-01-01', userDate19:'2018-01-01', userDate20:'2018-01-01', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'};
      service.updateBenefitPackageMaster(benefitPackageMaster, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitpackagemasters/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBenefitPackageMaster', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBenefitPackageMaster(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/benefitpackagemasters/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});