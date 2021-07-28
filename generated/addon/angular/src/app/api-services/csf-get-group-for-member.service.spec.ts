/* Copyright (c) 2021 . All Rights Reserved. */

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

import { CsfGetGroupForMemberService } from './csf-get-group-for-member.service';
import { CsfGetGroupForMember } from '../api-models/csf-get-group-for-member.model'
import { CsfGetGroupForMembers } from "../api-models/testing/fake-csf-get-group-for-member.model"

describe('CsfGetGroupForMemberService', () => {
  let injector: TestBed;
  let service: CsfGetGroupForMemberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfGetGroupForMemberService]
    });
    injector = getTestBed();
    service = injector.get(CsfGetGroupForMemberService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfGetGroupForMembers', () => {
    it('should return an Promise<CsfGetGroupForMember[]>', () => {
      const csfGetGroupForMember = [
       {pSeqMembId:1234},
       {pSeqMembId:1234},
       {pSeqMembId:1234}

      ];
      service.getCsfGetGroupForMembers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetgroupformembers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfGetGroupForMember);
    });
  });


  describe('#createCsfGetGroupForMember', () => {
    var id = 1;
    it('should return an Promise<CsfGetGroupForMember>', () => {
      const csfGetGroupForMember: CsfGetGroupForMember = {pSeqMembId:1234};
      service.createCsfGetGroupForMember(csfGetGroupForMember).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetgroupformembers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfGetGroupForMember', () => {
    var id = 1;
    it('should return an Promise<CsfGetGroupForMember>', () => {
      const csfGetGroupForMember: CsfGetGroupForMember = {pSeqMembId:1234};
      service.updateCsfGetGroupForMember(csfGetGroupForMember, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetgroupformembers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfGetGroupForMember', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfGetGroupForMember(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetgroupformembers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});