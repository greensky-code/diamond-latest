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

import { ProfsvcClaimLenrxService } from './profsvc-claim-lenrx.service';
import { ProfsvcClaimLenrx } from '../api-models/profsvc-claim-lenrx.model'
import { ProfsvcClaimLenrxes } from "../api-models/testing/fake-profsvc-claim-lenrx.model"

describe('ProfsvcClaimLenrxService', () => {
  let injector: TestBed;
  let service: ProfsvcClaimLenrxService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfsvcClaimLenrxService]
    });
    injector = getTestBed();
    service = injector.get(ProfsvcClaimLenrxService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getProfsvcClaimLenrxes', () => {
    it('should return an Promise<ProfsvcClaimLenrx[]>', () => {
      const profsvcClaimLenrx = [
       {seqClaimId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'},
       {seqClaimId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'},
       {seqClaimId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'}

      ];
      service.getProfsvcClaimLenrxes().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimlenrxes/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(profsvcClaimLenrx);
    });
  });


  describe('#createProfsvcClaimLenrx', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimLenrx>', () => {
      const profsvcClaimLenrx: ProfsvcClaimLenrx = {seqClaimId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'};
      service.createProfsvcClaimLenrx(profsvcClaimLenrx).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimlenrxes`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateProfsvcClaimLenrx', () => {
    var id = 1;
    it('should return an Promise<ProfsvcClaimLenrx>', () => {
      const profsvcClaimLenrx: ProfsvcClaimLenrx = {seqClaimId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'};
      service.updateProfsvcClaimLenrx(profsvcClaimLenrx, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimlenrxes/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteProfsvcClaimLenrx', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteProfsvcClaimLenrx(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/profsvcclaimlenrxes/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});