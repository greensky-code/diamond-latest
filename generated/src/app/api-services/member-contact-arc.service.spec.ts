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

import { MemberContactArcService } from './member-contact-arc.service';
import { MemberContactArc } from '../api-models/member-contact-arc.model'
import { MemberContactArcs } from "../api-models/testing/fake-member-contact-arc.model"

describe('MemberContactArcService', () => {
  let injector: TestBed;
  let service: MemberContactArcService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberContactArcService]
    });
    injector = getTestBed();
    service = injector.get(MemberContactArcService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberContactArcs', () => {
    it('should return an Promise<MemberContactArc[]>', () => {
      const memberContactArc = [
       {seqMembId:1234, contactSource:'sample data', changeDateTime:'2018-01-01', primaryDistributionMethod:'sample data', emailId:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqMembId:1234, contactSource:'sample data', changeDateTime:'2018-01-01', primaryDistributionMethod:'sample data', emailId:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {seqMembId:1234, contactSource:'sample data', changeDateTime:'2018-01-01', primaryDistributionMethod:'sample data', emailId:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getMemberContactArcs().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/membercontactarcs/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberContactArc);
    });
  });


  describe('#createMemberContactArc', () => {
    var id = 1;
    it('should return an Promise<MemberContactArc>', () => {
      const memberContactArc: MemberContactArc = {seqMembId:1234, contactSource:'sample data', changeDateTime:'2018-01-01', primaryDistributionMethod:'sample data', emailId:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createMemberContactArc(memberContactArc).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membercontactarcs`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberContactArc', () => {
    var id = 1;
    it('should return an Promise<MemberContactArc>', () => {
      const memberContactArc: MemberContactArc = {seqMembId:1234, contactSource:'sample data', changeDateTime:'2018-01-01', primaryDistributionMethod:'sample data', emailId:'sample data', faxNumber:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateMemberContactArc(memberContactArc, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membercontactarcs/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberContactArc', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberContactArc(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/membercontactarcs/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});