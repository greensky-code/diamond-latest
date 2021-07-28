/* Copyright (c) 2020 . All Rights Reserved. */

import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "../../environments/environment";
import { MemberWorkingAged } from "../api-models/member-working-aged.model";
import { MemberWorkingAgedService } from "./member-working-aged.service";


describe('MemberWorkingAgedService', () => {
  let injector: TestBed;
  let service: MemberWorkingAgedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberWorkingAgedService]
    });
    injector = getTestBed();
    service = injector.get(MemberWorkingAgedService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
      httpMock.verify();
  });
  describe('#getMemberWorkingAgeds', () => {
    it('should return an Promise<MemberWorkingAged[]>', () => {
      const memberWorkingAged = [
       {seqMembId:1234, seqMembWaId:1234, dateSent:'2018-01-01', dateReceived:'2018-01-01', memwaUserDefined1:'sample data', memwaUserDefined2:'sample data', memwaUserDate1:'2018-01-01', memwaUserDate2:'2018-01-01', surveyEffectiveDate:'2018-01-01', surveyTermDate:'2018-01-01', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'},
       {seqMembId:1234, seqMembWaId:1234, dateSent:'2018-01-01', dateReceived:'2018-01-01', memwaUserDefined1:'sample data', memwaUserDefined2:'sample data', memwaUserDate1:'2018-01-01', memwaUserDate2:'2018-01-01', surveyEffectiveDate:'2018-01-01', surveyTermDate:'2018-01-01', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'},
       {seqMembId:1234, seqMembWaId:1234, dateSent:'2018-01-01', dateReceived:'2018-01-01', memwaUserDefined1:'sample data', memwaUserDefined2:'sample data', memwaUserDate1:'2018-01-01', memwaUserDate2:'2018-01-01', surveyEffectiveDate:'2018-01-01', surveyTermDate:'2018-01-01', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'}

      ];
      service.getMemberWorkingAgeds().then(users => {
        expect(users.length).toBe(3);
      });

      const req = httpMock.expectOne(`${environment.apiUrl}/memberworkingageds/?use-pagination=false&page=0&size=0`);
      expect(req.request.method).toBe("GET");
      req.flush(memberWorkingAged);
    });
  });


  describe('#createMemberWorkingAged', () => {
    var id = 1;
    it('should return an Promise<MemberWorkingAged>', () => {
      const memberWorkingAged: MemberWorkingAged = {seqMembId:1234, seqMembWaId:1234, dateSent:'2018-01-01', dateReceived:'2018-01-01', memwaUserDefined1:'sample data', memwaUserDefined2:'sample data', memwaUserDate1:'2018-01-01', memwaUserDate2:'2018-01-01', surveyEffectiveDate:'2018-01-01', surveyTermDate:'2018-01-01', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'};
      service.createMemberWorkingAged(memberWorkingAged).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberworkingageds`);
      expect(req.request.method).toBe("POST");
      req.flush(null, { status: 200, statusText: 'Ok' });

    });
  });


  describe('#updateMemberWorkingAged', () => {
    var id = 1;
    it('should return an Promise<MemberWorkingAged>', () => {
      const memberWorkingAged: MemberWorkingAged = {seqMembId:1234, seqMembWaId:1234, dateSent:'2018-01-01', dateReceived:'2018-01-01', memwaUserDefined1:'sample data', memwaUserDefined2:'sample data', memwaUserDate1:'2018-01-01', memwaUserDate2:'2018-01-01', surveyEffectiveDate:'2018-01-01', surveyTermDate:'2018-01-01', insertDatetime:'2018-01-01', insertProcess:'sample data', insertUser:'sample data', updateDatetime:'2018-01-01', updateProcess:'sample data', updateUser:'sample data', securityCode:'sample data'};
      service.updateMemberWorkingAged(memberWorkingAged, id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberworkingageds/${id}`);
      expect(req.request.method).toBe("PUT");
      req.flush(null, { status: 200, statusText: 'Ok' });
    });
  });


  describe('#deleteMemberWorkingAged', () => {
    var id = 1;
    it('should call delete method with correct parameter', () => {
      service.deleteMemberWorkingAged(id).then(response => {
         expect(response).toEqual(null);
      });
      const req = httpMock.expectOne(`${environment.apiUrl}/memberworkingageds/${id}`);
      expect(req.request.method).toBe("DELETE");
      req.flush(null, { status: 400, statusText: 'Ok' });
    });
  });


});