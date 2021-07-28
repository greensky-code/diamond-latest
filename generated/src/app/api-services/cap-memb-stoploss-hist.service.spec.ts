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

import { CapMembStoplossHistService } from './cap-memb-stoploss-hist.service';
import { CapMembStoplossHist } from '../api-models/cap-memb-stoploss-hist.model'
import { CapMembStoplossHists } from "../api-models/testing/fake-cap-memb-stoploss-hist.model"

describe('CapMembStoplossHistService', () => {
  let injector: TestBed;
  let service: CapMembStoplossHistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CapMembStoplossHistService]
    });
    injector = getTestBed();
    service = injector.get(CapMembStoplossHistService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCapMembStoplossHists', () => {
    it('should return an Promise<CapMembStoplossHist[]>', () => {
      const capMembStoplossHist = [
       {seqCapMemSlHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capStoplossId:'sample data', seqMembId:1234, ytdApplicableAmt:1234},
       {seqCapMemSlHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capStoplossId:'sample data', seqMembId:1234, ytdApplicableAmt:1234},
       {seqCapMemSlHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capStoplossId:'sample data', seqMembId:1234, ytdApplicableAmt:1234}

      ];
      service.getCapMembStoplossHists().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/capmembstoplosshists/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(capMembStoplossHist);
    });
  });


  describe('#createCapMembStoplossHist', () => {
    var id = 1;
    it('should return an Promise<CapMembStoplossHist>', () => {
      const capMembStoplossHist: CapMembStoplossHist = {seqCapMemSlHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capStoplossId:'sample data', seqMembId:1234, ytdApplicableAmt:1234};
      service.createCapMembStoplossHist(capMembStoplossHist).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmembstoplosshists`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCapMembStoplossHist', () => {
    var id = 1;
    it('should return an Promise<CapMembStoplossHist>', () => {
      const capMembStoplossHist: CapMembStoplossHist = {seqCapMemSlHist:1234, capModelId:'sample data', firstContractMonth:'2018-01-01', capStoplossId:'sample data', seqMembId:1234, ytdApplicableAmt:1234};
      service.updateCapMembStoplossHist(capMembStoplossHist, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmembstoplosshists/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCapMembStoplossHist', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCapMembStoplossHist(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/capmembstoplosshists/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});