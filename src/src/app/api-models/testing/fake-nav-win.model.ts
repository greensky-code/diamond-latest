/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NavWin} from "../../api-models"

var navWin1 = new NavWin();
navWin1.languageId =123;
navWin1.notesProvContext ="sample data1";
navWin1.notesGroupContext ="sample data1";
navWin1.notesMembContext ="sample data1";
navWin1.notesCname ="sample data1";
navWin1.dispOrder =123;
navWin1.updateProcess ="sample data1";
navWin1.updateUser ="sample data1";
navWin1.updateDatetime =new Date('2010-01-01');
navWin1.insertProcess ="sample data1";
navWin1.insertUser ="sample data1";
navWin1.insertDatetime =new Date('2010-01-01');
navWin1.bitmap ="sample data1";
navWin1.maxOpen =123;
navWin1.dbmaint ="sample data1";
navWin1.menu ="sample data1";
navWin1.sheet ="sample data1";
navWin1.cwinId ="sample data1";
navWin1.pwinId ="sample data1";
navWin1.pbname ="sample data1";
navWin1.winId ="sample data1";

var navWin2 = new NavWin();
navWin2.languageId =123;
navWin2.notesProvContext ="sample data2";
navWin2.notesGroupContext ="sample data2";
navWin2.notesMembContext ="sample data2";
navWin2.notesCname ="sample data2";
navWin2.dispOrder =123;
navWin2.updateProcess ="sample data2";
navWin2.updateUser ="sample data2";
navWin2.updateDatetime =new Date('2010-01-01');
navWin2.insertProcess ="sample data2";
navWin2.insertUser ="sample data2";
navWin2.insertDatetime =new Date('2010-01-01');
navWin2.bitmap ="sample data2";
navWin2.maxOpen =123;
navWin2.dbmaint ="sample data2";
navWin2.menu ="sample data2";
navWin2.sheet ="sample data2";
navWin2.cwinId ="sample data2";
navWin2.pwinId ="sample data2";
navWin2.pbname ="sample data2";
navWin2.winId ="sample data2";

var navWin3 = new NavWin();
navWin3.languageId =123;
navWin3.notesProvContext ="sample data3";
navWin3.notesGroupContext ="sample data3";
navWin3.notesMembContext ="sample data3";
navWin3.notesCname ="sample data3";
navWin3.dispOrder =123;
navWin3.updateProcess ="sample data3";
navWin3.updateUser ="sample data3";
navWin3.updateDatetime =new Date('2010-01-01');
navWin3.insertProcess ="sample data3";
navWin3.insertUser ="sample data3";
navWin3.insertDatetime =new Date('2010-01-01');
navWin3.bitmap ="sample data3";
navWin3.maxOpen =123;
navWin3.dbmaint ="sample data3";
navWin3.menu ="sample data3";
navWin3.sheet ="sample data3";
navWin3.cwinId ="sample data3";
navWin3.pwinId ="sample data3";
navWin3.pbname ="sample data3";
navWin3.winId ="sample data3";


export const NavWins: NavWin[] = [
    navWin1,
    navWin2,
    navWin3,
];