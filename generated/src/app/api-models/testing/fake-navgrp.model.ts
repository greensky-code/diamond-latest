/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Navgrp} from "../../api-models"

var navgrp1 = new Navgrp();
navgrp1.navgrpId ="sample data1";
navgrp1.sdescr ="sample data1";
navgrp1.ldescr ="sample data1";
navgrp1.insertDatetime =new Date('2010-01-01');
navgrp1.insertUser ="sample data1";
navgrp1.insertProcess ="sample data1";
navgrp1.updateDatetime =new Date('2010-01-01');
navgrp1.updateUser ="sample data1";
navgrp1.updateProcess ="sample data1";
navgrp1.bitmapGraphic ="sample data1";
navgrp1.languageId =123;

var navgrp2 = new Navgrp();
navgrp2.navgrpId ="sample data2";
navgrp2.sdescr ="sample data2";
navgrp2.ldescr ="sample data2";
navgrp2.insertDatetime =new Date('2010-01-01');
navgrp2.insertUser ="sample data2";
navgrp2.insertProcess ="sample data2";
navgrp2.updateDatetime =new Date('2010-01-01');
navgrp2.updateUser ="sample data2";
navgrp2.updateProcess ="sample data2";
navgrp2.bitmapGraphic ="sample data2";
navgrp2.languageId =123;

var navgrp3 = new Navgrp();
navgrp3.navgrpId ="sample data3";
navgrp3.sdescr ="sample data3";
navgrp3.ldescr ="sample data3";
navgrp3.insertDatetime =new Date('2010-01-01');
navgrp3.insertUser ="sample data3";
navgrp3.insertProcess ="sample data3";
navgrp3.updateDatetime =new Date('2010-01-01');
navgrp3.updateUser ="sample data3";
navgrp3.updateProcess ="sample data3";
navgrp3.bitmapGraphic ="sample data3";
navgrp3.languageId =123;


export const Navgrps: Navgrp[] = [
    navgrp1,
    navgrp2,
    navgrp3,
];