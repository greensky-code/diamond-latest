/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router'
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import { async, ComponentFixture, TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment'
import { RouterTestingModule } from '@angular/router/testing';

import { AuthPhysAdvisorService } from './auth-phys-advisor.service';
import { AuthPhysAdvisor } from '../../api-models/authorization/auth-phys-advisor.model'

describe('AuthPhysAdvisorService', () => {
  let injector: TestBed;
  let service: AuthPhysAdvisorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthPhysAdvisorService]
    });
    injector = getTestBed();
    service = injector.get(AuthPhysAdvisorService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getAuthPhysAdvisors', () => {
    it('should return an Promise<AuthPhysAdvisor[]>', () => {
      const authPhysAdvisor = [
       {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAdv:1234, seqProvId:1234, contactDate:'2018-01-01', recommendationCode:'sample data', decisionDate:'2018-01-01', advisorDecision:'sample data', advisorService:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAdv:1234, seqProvId:1234, contactDate:'2018-01-01', recommendationCode:'sample data', decisionDate:'2018-01-01', advisorDecision:'sample data', advisorService:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAdv:1234, seqProvId:1234, contactDate:'2018-01-01', recommendationCode:'sample data', decisionDate:'2018-01-01', advisorDecision:'sample data', advisorService:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getAuthPhysAdvisors().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/authphysadvisors/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(authPhysAdvisor);
    });
  });


  // describe('#createAuthPhysAdvisor', () => {
  //   var id = 1;
  //   it('should return an Promise<AuthPhysAdvisor>', () => {
  //     const authPhysAdvisor: AuthPhysAdvisor = {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAdv:1234, seqProvId:1234, contactDate:'2018-01-01', recommendationCode:'sample data', decisionDate:'2018-01-01', advisorDecision:'sample data', advisorService:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
  //     service.createAuthPhysAdvisor(authPhysAdvisor).subscribe(response => {
  //        expect(response).toEqual(null);
  //     });
  //     const req = httpMock.expectOne(`${environment.apiUrl}/authphysadvisors`);
  //     expect(req.request.method).toBe("POST");
  //     req.flush(null, { status: 200, statusText: 'Ok' });
  //
  //   });
  // });


  // describe('#updateAuthPhysAdvisor', () => {
  //   var id = 1;
  //   it('should return an Promise<AuthPhysAdvisor>', () => {
  //     const authPhysAdvisor: AuthPhysAdvisor = {authNumber:1234, secondaryAuthNo:'sample data', seqAuthAdv:1234, seqProvId:1234, contactDate:'2018-01-01', recommendationCode:'sample data', decisionDate:'2018-01-01', advisorDecision:'sample data', advisorService:'sample data', comments:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
  //     service.updateAuthPhysAdvisor(authPhysAdvisor, id).subscribe(response => {
  //        expect(response).toEqual(null);
  //     });
  //     const req = httpMock.expectOne(`${environment.apiUrl}/authphysadvisors/${id}`);
  //     expect(req.request.method).toBe("PUT");
  //     req.flush(null, { status: 200, statusText: 'Ok' });
  //   });
  // });


  describe('#deleteAuthPhysAdvisor', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteAuthPhysAdvisor(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/authphysadvisors/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});