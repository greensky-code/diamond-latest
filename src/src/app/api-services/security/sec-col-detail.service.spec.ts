/* Copyright (c) 2020 . All Rights Reserved. */

import 'rxjs/add/operator/toPromise';
import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';


import {SecColDetailService} from './sec-col-detail.service';
import {environment} from "../../../environments/environment";
import {SecColDetail} from "../../api-models/security/sec-col-detail.model";


describe('SecColDetailService', () => {
  let injector: TestBed;
  let service: SecColDetailService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecColDetailService]
    });
    injector = getTestBed();
    service = injector.get(SecColDetailService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getSecColDetails', () => {
    it('should return an Promise<SecColDetail[]>', () => {
      const secColDetail = [
       {sfldlId:'sample data', tableName:'sample data', columnName:'sample data', functionalArea:'sample data', securityInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {sfldlId:'sample data', tableName:'sample data', columnName:'sample data', functionalArea:'sample data', securityInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'},
       {sfldlId:'sample data', tableName:'sample data', columnName:'sample data', functionalArea:'sample data', securityInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'}

      ];
      service.getSecColDetails().subscribe(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/seccoldetails/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(secColDetail);
    });
  });


  describe('#createSecColDetail', () => {
    var id = 1;
    it('should return an Promise<SecColDetail>', () => {
      const secColDetail: SecColDetail = {sfldlId:'sample data', tableName:'sample data', columnName:'sample data', functionalArea:'sample data', securityInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.createSecColDetail(secColDetail).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/seccoldetails`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateSecColDetail', () => {
    var id = "1";
    it('should return an Promise<SecColDetail>', () => {
      const secColDetail: SecColDetail = {sfldlId:'sample data', tableName:'sample data', columnName:'sample data', functionalArea:'sample data',
        securityInd:'sample data', securityCode:'sample data', insertDatetime:'2018-01-01', insertUser:'sample data', insertProcess:'sample data', updateDatetime:'2018-01-01', updateUser:'sample data', updateProcess:'sample data'};
      service.updateSecColDetail(secColDetail, id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/seccoldetails/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteSecColDetail', () => {
    var id = "1";
    it('should call delete method with correct parameter', () => {
      service.deleteSecColDetail(id).subscribe(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/seccoldetails/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});