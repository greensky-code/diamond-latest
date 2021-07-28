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

import { BatchMasterOutService } from './batch-master-out.service';
import { BatchMasterOut } from '../api-models/batch-master-out.model'
import { BatchMasterOuts } from "../api-models/testing/fake-batch-master-out.model"

describe('BatchMasterOutService', () => {
  let injector: TestBed;
  let service: BatchMasterOutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BatchMasterOutService]
    });
    injector = getTestBed();
    service = injector.get(BatchMasterOutService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getBatchMasterOuts', () => {
    it('should return an Promise<BatchMasterOut[]>', () => {
      const batchMasterOut = [
       {batchId:'sample data', totalTransactions:1234, sourceTpId:'sample data', description:'sample data', claimType:'sample data', filterText1:'sample data', filterFlag1:'sample data', filterText2:'sample data', filterFlag2:'sample data', filterText3:'sample data', filterFlag3:'sample data', filterText4:'sample data', filterFlag4:'sample data', filterText5:'sample data', filterFlag5:'sample data', filterText6:'sample data', filterFlag6:'sample data', filterText7:'sample data', filterFlag7:'sample data', filterText8:'sample data', filterFlag8:'sample data', filterText9:'sample data', filterFlag9:'sample data', filterText10:'sample data', filterFlag10:'sample data', filterDate1:'2018-01-01', filterDate2:'2018-01-01', filterDate3:'2018-01-01', filterDate4:'2018-01-01', filterDate5:'2018-01-01', filterDate6:'2018-01-01', filterDate7:'2018-01-01', filterDate8:'2018-01-01', filterDate9:'2018-01-01', filterDate10:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', filterText11:'sample data', filterFlag11:'sample data', filterText12:'sample data', filterFlag12:'sample data', filterText13:'sample data', filterFlag13:'sample data', filterText14:'sample data', filterFlag14:'sample data', filterText15:'sample data', filterFlag15:'sample data', filterText16:'sample data', filterFlag16:'sample data'},
       {batchId:'sample data', totalTransactions:1234, sourceTpId:'sample data', description:'sample data', claimType:'sample data', filterText1:'sample data', filterFlag1:'sample data', filterText2:'sample data', filterFlag2:'sample data', filterText3:'sample data', filterFlag3:'sample data', filterText4:'sample data', filterFlag4:'sample data', filterText5:'sample data', filterFlag5:'sample data', filterText6:'sample data', filterFlag6:'sample data', filterText7:'sample data', filterFlag7:'sample data', filterText8:'sample data', filterFlag8:'sample data', filterText9:'sample data', filterFlag9:'sample data', filterText10:'sample data', filterFlag10:'sample data', filterDate1:'2018-01-01', filterDate2:'2018-01-01', filterDate3:'2018-01-01', filterDate4:'2018-01-01', filterDate5:'2018-01-01', filterDate6:'2018-01-01', filterDate7:'2018-01-01', filterDate8:'2018-01-01', filterDate9:'2018-01-01', filterDate10:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', filterText11:'sample data', filterFlag11:'sample data', filterText12:'sample data', filterFlag12:'sample data', filterText13:'sample data', filterFlag13:'sample data', filterText14:'sample data', filterFlag14:'sample data', filterText15:'sample data', filterFlag15:'sample data', filterText16:'sample data', filterFlag16:'sample data'},
       {batchId:'sample data', totalTransactions:1234, sourceTpId:'sample data', description:'sample data', claimType:'sample data', filterText1:'sample data', filterFlag1:'sample data', filterText2:'sample data', filterFlag2:'sample data', filterText3:'sample data', filterFlag3:'sample data', filterText4:'sample data', filterFlag4:'sample data', filterText5:'sample data', filterFlag5:'sample data', filterText6:'sample data', filterFlag6:'sample data', filterText7:'sample data', filterFlag7:'sample data', filterText8:'sample data', filterFlag8:'sample data', filterText9:'sample data', filterFlag9:'sample data', filterText10:'sample data', filterFlag10:'sample data', filterDate1:'2018-01-01', filterDate2:'2018-01-01', filterDate3:'2018-01-01', filterDate4:'2018-01-01', filterDate5:'2018-01-01', filterDate6:'2018-01-01', filterDate7:'2018-01-01', filterDate8:'2018-01-01', filterDate9:'2018-01-01', filterDate10:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', filterText11:'sample data', filterFlag11:'sample data', filterText12:'sample data', filterFlag12:'sample data', filterText13:'sample data', filterFlag13:'sample data', filterText14:'sample data', filterFlag14:'sample data', filterText15:'sample data', filterFlag15:'sample data', filterText16:'sample data', filterFlag16:'sample data'}

      ];
      service.getBatchMasterOuts().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasterouts/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(batchMasterOut);
    });
  });


  describe('#createBatchMasterOut', () => {
    var id = 1;
    it('should return an Promise<BatchMasterOut>', () => {
      const batchMasterOut: BatchMasterOut = {batchId:'sample data', totalTransactions:1234, sourceTpId:'sample data', description:'sample data', claimType:'sample data', filterText1:'sample data', filterFlag1:'sample data', filterText2:'sample data', filterFlag2:'sample data', filterText3:'sample data', filterFlag3:'sample data', filterText4:'sample data', filterFlag4:'sample data', filterText5:'sample data', filterFlag5:'sample data', filterText6:'sample data', filterFlag6:'sample data', filterText7:'sample data', filterFlag7:'sample data', filterText8:'sample data', filterFlag8:'sample data', filterText9:'sample data', filterFlag9:'sample data', filterText10:'sample data', filterFlag10:'sample data', filterDate1:'2018-01-01', filterDate2:'2018-01-01', filterDate3:'2018-01-01', filterDate4:'2018-01-01', filterDate5:'2018-01-01', filterDate6:'2018-01-01', filterDate7:'2018-01-01', filterDate8:'2018-01-01', filterDate9:'2018-01-01', filterDate10:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', filterText11:'sample data', filterFlag11:'sample data', filterText12:'sample data', filterFlag12:'sample data', filterText13:'sample data', filterFlag13:'sample data', filterText14:'sample data', filterFlag14:'sample data', filterText15:'sample data', filterFlag15:'sample data', filterText16:'sample data', filterFlag16:'sample data'};
      service.createBatchMasterOut(batchMasterOut).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasterouts`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateBatchMasterOut', () => {
    var id = 1;
    it('should return an Promise<BatchMasterOut>', () => {
      const batchMasterOut: BatchMasterOut = {batchId:'sample data', totalTransactions:1234, sourceTpId:'sample data', description:'sample data', claimType:'sample data', filterText1:'sample data', filterFlag1:'sample data', filterText2:'sample data', filterFlag2:'sample data', filterText3:'sample data', filterFlag3:'sample data', filterText4:'sample data', filterFlag4:'sample data', filterText5:'sample data', filterFlag5:'sample data', filterText6:'sample data', filterFlag6:'sample data', filterText7:'sample data', filterFlag7:'sample data', filterText8:'sample data', filterFlag8:'sample data', filterText9:'sample data', filterFlag9:'sample data', filterText10:'sample data', filterFlag10:'sample data', filterDate1:'2018-01-01', filterDate2:'2018-01-01', filterDate3:'2018-01-01', filterDate4:'2018-01-01', filterDate5:'2018-01-01', filterDate6:'2018-01-01', filterDate7:'2018-01-01', filterDate8:'2018-01-01', filterDate9:'2018-01-01', filterDate10:'2018-01-01', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', filterText11:'sample data', filterFlag11:'sample data', filterText12:'sample data', filterFlag12:'sample data', filterText13:'sample data', filterFlag13:'sample data', filterText14:'sample data', filterFlag14:'sample data', filterText15:'sample data', filterFlag15:'sample data', filterText16:'sample data', filterFlag16:'sample data'};
      service.updateBatchMasterOut(batchMasterOut, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasterouts/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteBatchMasterOut', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteBatchMasterOut(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/batchmasterouts/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});