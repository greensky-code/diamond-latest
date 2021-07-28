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

import { StagePsclmLensService } from './stage-psclm-lens.service';
import { StagePsclmLens } from '../api-models/stage-psclm-lens.model'
import { StagePsclmLenss } from "../api-models/testing/fake-stage-psclm-lens.model"

describe('StagePsclmLensService', () => {
  let injector: TestBed;
  let service: StagePsclmLensService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StagePsclmLensService]
    });
    injector = getTestBed();
    service = injector.get(StagePsclmLensService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getStagePsclmLenss', () => {
    it('should return an Promise<StagePsclmLens[]>', () => {
      const stagePsclmLens = [
       {batchId:'sample data', transactionId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01'},
       {batchId:'sample data', transactionId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01'}

      ];
      service.getStagePsclmLenss().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmlenss/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(stagePsclmLens);
    });
  });


  describe('#createStagePsclmLens', () => {
    var id = 1;
    it('should return an Promise<StagePsclmLens>', () => {
      const stagePsclmLens: StagePsclmLens = {batchId:'sample data', transactionId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01'};
      service.createStagePsclmLens(stagePsclmLens).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmlenss`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateStagePsclmLens', () => {
    var id = 1;
    it('should return an Promise<StagePsclmLens>', () => {
      const stagePsclmLens: StagePsclmLens = {batchId:'sample data', transactionId:1234, odSpherePm:1234, odSphere:1234, odSpherePb:1234, odCylinderPm:1234, odCylinder:1234, odAxis:1234, odPrism1Amt:1234, odPrism1Dir:1234, odPrism2Amt:1234, odPrism2Dir:1234, odAdd:1234, osSpherePm:1234, osSphere:1234, osSpherePb:1234, osCylinderPm:1234, osCylinder:1234, osAxis:1234, osPrism1Amt:1234, osPrism1Dir:1234, osPrism2Amt:1234, osPrism2Dir:1234, osAdd:1234, segType:'sample data', insertDatetime:'2018-01-01'};
      service.updateStagePsclmLens(stagePsclmLens, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmlenss/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteStagePsclmLens', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteStagePsclmLens(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/stagepsclmlenss/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});