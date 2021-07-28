/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SiteCodeMaster} from "../../api-models"

var siteCodeMaster1 = new SiteCodeMaster();
siteCodeMaster1.siteCode ="sample data1";
siteCodeMaster1.lineOfBusiness ="sample data1";
siteCodeMaster1.panelId ="sample data1";
siteCodeMaster1.ipaId ="sample data1";
siteCodeMaster1.insertProcess ="sample data1";
siteCodeMaster1.insertUser ="sample data1";
siteCodeMaster1.insertDatetime =new Date('2010-01-01');
siteCodeMaster1.updateUser ="sample data1";
siteCodeMaster1.updateProcess ="sample data1";
siteCodeMaster1.updateDatetime =new Date('2010-01-01');
siteCodeMaster1.description ="sample data1";
siteCodeMaster1.sitemUserDefined1 ="sample data1";
siteCodeMaster1.sitemUserDefined2 ="sample data1";
siteCodeMaster1.sitemUserDate1 =new Date('2010-01-01');
siteCodeMaster1.sitemUserDate2 =new Date('2010-01-01');
siteCodeMaster1.securityCode ="sample data1";

var siteCodeMaster2 = new SiteCodeMaster();
siteCodeMaster2.siteCode ="sample data2";
siteCodeMaster2.lineOfBusiness ="sample data2";
siteCodeMaster2.panelId ="sample data2";
siteCodeMaster2.ipaId ="sample data2";
siteCodeMaster2.insertProcess ="sample data2";
siteCodeMaster2.insertUser ="sample data2";
siteCodeMaster2.insertDatetime =new Date('2010-01-01');
siteCodeMaster2.updateUser ="sample data2";
siteCodeMaster2.updateProcess ="sample data2";
siteCodeMaster2.updateDatetime =new Date('2010-01-01');
siteCodeMaster2.description ="sample data2";
siteCodeMaster2.sitemUserDefined1 ="sample data2";
siteCodeMaster2.sitemUserDefined2 ="sample data2";
siteCodeMaster2.sitemUserDate1 =new Date('2010-01-01');
siteCodeMaster2.sitemUserDate2 =new Date('2010-01-01');
siteCodeMaster2.securityCode ="sample data2";

var siteCodeMaster3 = new SiteCodeMaster();
siteCodeMaster3.siteCode ="sample data3";
siteCodeMaster3.lineOfBusiness ="sample data3";
siteCodeMaster3.panelId ="sample data3";
siteCodeMaster3.ipaId ="sample data3";
siteCodeMaster3.insertProcess ="sample data3";
siteCodeMaster3.insertUser ="sample data3";
siteCodeMaster3.insertDatetime =new Date('2010-01-01');
siteCodeMaster3.updateUser ="sample data3";
siteCodeMaster3.updateProcess ="sample data3";
siteCodeMaster3.updateDatetime =new Date('2010-01-01');
siteCodeMaster3.description ="sample data3";
siteCodeMaster3.sitemUserDefined1 ="sample data3";
siteCodeMaster3.sitemUserDefined2 ="sample data3";
siteCodeMaster3.sitemUserDate1 =new Date('2010-01-01');
siteCodeMaster3.sitemUserDate2 =new Date('2010-01-01');
siteCodeMaster3.securityCode ="sample data3";


export const SiteCodeMasters: SiteCodeMaster[] = [
    siteCodeMaster1,
    siteCodeMaster2,
    siteCodeMaster3,
];