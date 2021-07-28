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

import { ProfsvcClaimLenrxEdiWService } from './profsvc-claim-lenrx-edi-w.service';
import { ProfsvcClaimLenrxEdiW } from '../api-models/profsvc-claim-lenrx-edi-w.model'
import { ProfsvcClaimLenrxEdiWs } from "../api-models/testing/fake-profsvc-claim-lenrx-edi-w.model"

describe('ProfsvcClaimLenrxEdiWService', () => {
  let injector: TestBed;
  let service: ProfsvcClaimLenrxEdiWService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcClaimLenrxEdiWService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcClaimLenrxEdiWService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcClaimLenrxEdiWs', () => {
    it('should return an Promise<ProfsvcClaimLenrxEdiW[]>', () => {
      const profsvcClaimLenrxEdiW = [
       {seqPrediId:1234, seqClaimId:1234, recInd:'sample data', originalClaimNumber:'sample data', odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, recInd:'sample data', originalClaimNumber:'sample data', odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'},
       {seqPrediId:1234, seqClaimId:1234, recInd:'sample data', originalClaimNumber:'sample data', odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'}

      ];
      service.getProfsvcClaimLenrxEdiWs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimlenrxediws/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcClaimLenrxEdiW);
    });
  });


  describe('#createProfsvcClaimLenrxEdiW', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimLenrxEdiW>', () => {
      const profsvcClaimLenrxEdiW: ProfsvcClaimLenrxEdiW = {seqPrediId:1234, seqClaimId:1234, recInd:'sample data', originalClaimNumber:'sample data', odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'};
      service.createProfsvcClaimLenrxEdiW(profsvcClaimLenrxEdiW).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimlenrxediws`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcClaimLenrxEdiW', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimLenrxEdiW>', () => {
      const profsvcClaimLenrxEdiW: ProfsvcClaimLenrxEdiW = {seqPrediId:1234, seqClaimId:1234, recInd:'sample data', originalClaimNumber:'sample data', odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data'};
      service.updateProfsvcClaimLenrxEdiW(profsvcClaimLenrxEdiW, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimlenrxediws/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcClaimLenrxEdiW', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcClaimLenrxEdiW(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimlenrxediws/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});