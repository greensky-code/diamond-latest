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

import { IdCardNarrativeService } from './id-card-narrative.service';
import { IdCardNarrative } from '../api-models/id-card-narrative.model'
import { IdCardNarratives } from "../api-models/testing/fake-id-card-narrative.model"

describe('IdCardNarrativeService', () => {
  let injector: TestBed;
  let service: IdCardNarrativeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IdCardNarrativeService]
    });
    injector = getTestBed();
    service = injector.get(IdCardNarrativeService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getIdCardNarratives', () => {
    it('should return an Promise<IdCardNarrative[]>', () => {
      const idCardNarrative = [
       {seqNarrative:1234, description:'sample data', narrative:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'},
       {seqNarrative:1234, description:'sample data', narrative:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'},
       {seqNarrative:1234, description:'sample data', narrative:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'}

      ];
      service.getIdCardNarratives().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/idcardnarratives/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(idCardNarrative);
    });
  });


  describe('#createIdCardNarrative', () => {
    var id = 1;
    it('should return an Promise<IdCardNarrative>', () => {
      const idCardNarrative: IdCardNarrative = {seqNarrative:1234, description:'sample data', narrative:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'};
      service.createIdCardNarrative(idCardNarrative).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/idcardnarratives`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateIdCardNarrative', () => {
    var id = 1;
    it('should return an Promise<IdCardNarrative>', () => {
      const idCardNarrative: IdCardNarrative = {seqNarrative:1234, description:'sample data', narrative:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data', userDefined1:'sample data', userDefined2:'sample data', userDefined3:'sample data', userDefined4:'sample data', userDefined5:'sample data', userDefined6:'sample data', userDefined7:'sample data', userDefined8:'sample data', userDefined9:'sample data', userDefined10:'sample data', userDefined11:'sample data', userDefined12:'sample data', userDefined13:'sample data', userDefined14:'sample data', userDefined15:'sample data', userDefined16:'sample data', userDefined17:'sample data', userDefined18:'sample data', userDefined19:'sample data', userDefined20:'sample data'};
      service.updateIdCardNarrative(idCardNarrative, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/idcardnarratives/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteIdCardNarrative', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteIdCardNarrative(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/idcardnarratives/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});