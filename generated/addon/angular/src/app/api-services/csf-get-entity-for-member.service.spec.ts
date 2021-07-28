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

import { CsfGetEntityForMemberService } from './csf-get-entity-for-member.service';
import { CsfGetEntityForMember } from '../api-models/csf-get-entity-for-member.model'
import { CsfGetEntityForMembers } from "../api-models/testing/fake-csf-get-entity-for-member.model"

describe('CsfGetEntityForMemberService', () => {
  let injector: TestBed;
  let service: CsfGetEntityForMemberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CsfGetEntityForMemberService]
    });
    injector = getTestBed();
    service = injector.get(CsfGetEntityForMemberService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getCsfGetEntityForMembers', () => {
    it('should return an Promise<CsfGetEntityForMember[]>', () => {
      const csfGetEntityForMember = [
       {pSeqMembId:1234},
       {pSeqMembId:1234},
       {pSeqMembId:1234}

      ];
      service.getCsfGetEntityForMembers().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityformembers/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(csfGetEntityForMember);
    });
  });


  describe('#createCsfGetEntityForMember', () => {
    var id = 1;
    it('should return an Promise<CsfGetEntityForMember>', () => {
      const csfGetEntityForMember: CsfGetEntityForMember = {pSeqMembId:1234};
      service.createCsfGetEntityForMember(csfGetEntityForMember).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityformembers`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateCsfGetEntityForMember', () => {
    var id = 1;
    it('should return an Promise<CsfGetEntityForMember>', () => {
      const csfGetEntityForMember: CsfGetEntityForMember = {pSeqMembId:1234};
      service.updateCsfGetEntityForMember(csfGetEntityForMember, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityformembers/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteCsfGetEntityForMember', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteCsfGetEntityForMember(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/csfgetentityformembers/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});