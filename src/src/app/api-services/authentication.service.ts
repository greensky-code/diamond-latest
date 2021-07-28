/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable, ViewChild } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { UserUsers } from '../api-models/user-users.model'
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from './../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {MessageType, PopUpMessage, PopUpMessageButton} from "../shared/components/pop-up-message";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PopUpMessageComponent } from '../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { CountDownPopUpMessage, CountDownPopUpMessageButton } from '../shared/components/count-down-pop-up-message';
import { CountDownPopUpMessageComponent } from '../shared/components/count-down-pop-up-message/count-down-pop-up-message/count-down-pop-up-message.component';
import {stringify} from "@angular/compiler/src/util";

@Injectable({
    providedIn: "root"
})
export class AuthenticationService {

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    private authenticateUrl: string = `${environment.apiUrl}/auth/loginUser`;
    private refreshAuthenticationUrl: string = `${environment.apiUrl}/auth/refreshUser`;
    private contentHeaders = new HttpHeaders();
    /**
     *  if password is in gracePeriod then user cannot login in first 2 attempts
     */
    authenticateCount = 0;

    constructor(
        private httpClient: HttpClient,
        private sharedService: SharedService,
        private router: Router,
        private modalService: NgbModal,
    ) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }



    authenticate(username: string, password: string): Observable<any> {
        let blockIfGracePeriod = this.authenticateCount != 2;
        let headers = new HttpHeaders({'userName': `${username}`, 'password': `${password}`});
        let options = {headers: headers,}
        return this.httpClient.post<any>(`${this.authenticateUrl}/?blockIfGracePeriod=${blockIfGracePeriod}`, {}, options).pipe(map(data => {
                if (data.success) {
                    /**
                     *  set count to 0, for default value
                     */
                    this.authenticateCount = 0;
                    sessionStorage.setItem(AUTHENTICATED_USER, username);
                    sessionStorage.setItem(ACCESS_TOKEN, `Bearer ${data.accessToken}`);
                    sessionStorage.setItem(REFRESH_TOKEN, `${data.refreshToken}`);
                }
                return data;
            }),
            catchError((error: any) => {
                return this.sharedService.handleError(error)
            }));
    }

    refreshAuthentication(refreshToken: string): Observable<any> {
        let headers = new HttpHeaders({ 'refreshToken': `${refreshToken}`, 'Accept': 'application/json', 'Content-Type': 'application/json, charset=utf-8' });
        let options = {
            headers: headers
        }

        return this.httpClient.post<any>(this.refreshAuthenticationUrl, null, options).pipe().map(data => {
            sessionStorage.setItem(ACCESS_TOKEN, `Bearer ${data.accessToken}`);
            sessionStorage.setItem(REFRESH_TOKEN, `${data.refreshToken}`);
            return data;
        }).pipe(map(response => response),
            catchError((error: any) => {
                return this.sharedService.handleError(error)
            }));
    }

    getIpAddress(): Observable<any> {
        let options = {};
        return this.httpClient.get<any>(`${environment.apiUrl}/common/ipAddress`, {}).pipe().map(data => {
            return data;
        }).pipe(map(response => response as any),
            catchError((error: any) => {
                return this.sharedService.handleError(error)
            }))
    }

    logout() {
        sessionStorage.removeItem(AUTHENTICATED_USER);
        sessionStorage.removeItem(ACCESS_TOKEN);
        sessionStorage.removeItem(REFRESH_TOKEN);
        sessionStorage.setItem('isLogin', "false");
        sessionStorage.removeItem("functionIds");
        sessionStorage.removeItem("isSuperUser");
        this.authenticateCount = 0;
    }

    setAuthenticated() {
        sessionStorage.setItem('isLogin', "true");
    }

    setActiveUser(user: string) {
        sessionStorage.setItem(AUTHENTICATED_USER, user);
    }

    getActiveUser() {
        return sessionStorage.getItem(AUTHENTICATED_USER)
    }

    isAuthenticated() {
        // const isLogin = localStorage.getItem('isLogin');
        // if (isLogin === "true") {
        //     return true;
        // } else {
        //     return false;
        // }
        const user = sessionStorage.getItem(AUTHENTICATED_USER);
        return !(user === null);
    }

    getAuthenticatedToken() {
        if (this.isAuthenticated()) {
            return sessionStorage.getItem(ACCESS_TOKEN);
        }
    }

    showAuthCountDown() {
        const buttons = [
            new CountDownPopUpMessageButton('Keep', 'yes, Keep me signed in', 'btn btn-info'),
            new CountDownPopUpMessageButton('Sign Out', 'No, Sign me out', 'btn btn-primary')
        ];
        const popUpMessage = new CountDownPopUpMessage('editConfirmation', 'Your session is about to expire!', "You will be logged out in ", 'icon', buttons, MessageType.WARNING, false, null, " seconds.Do you want to stay signed in?");
        const ref = this.modalService.open(CountDownPopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe((result: { name: string; }) => {
            if (result && result.name) {
                ref.componentInstance.subscription.unsubscribe();
                if (result.name === 'Keep') {
                    this.refreshAuthentication(sessionStorage.getItem(REFRESH_TOKEN))
                        .subscribe((token: any) => {

                        }, (error: any) => {
                            this.signOutNRedirect();
                            return;
                        });
                } else {
                    this.signOutNRedirect();
                }
            }
        });
    }

    signOutNRedirect() {
        sessionStorage.clear();
        this.modalService.dismissAll();
        this.router.navigate(['diamond/user/login']);
    }
}

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const AUTHENTICATED_USER = 'user';
