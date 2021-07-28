import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subscription, throwError, timer} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';
import {ACCESS_TOKEN, AuthenticationService, REFRESH_TOKEN} from '../../../api-services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor {

    private subscription: Subscription;

    constructor(
        private injector: Injector,
        private router: Router,
        private modalService: NgbModal,
        private authenticationService: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const basicAuthHeaderString = sessionStorage.getItem(ACCESS_TOKEN);
        const username = sessionStorage.getItem('user');
        if (basicAuthHeaderString && username) {
            req = req.clone({
                setHeaders: {
                    Authorization: basicAuthHeaderString
                }
            });
            this.authTimer();
        }

        return next.handle(req)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    if (error.status === 401 && !req.url.includes('/auth/refreshUser')) {
                        return this.authenticationService.refreshAuthentication(sessionStorage.getItem(REFRESH_TOKEN))
                            .pipe(
                                mergeMap((tokens) => next.handle(req.clone({
                                    setHeaders: {
                                        Authorization: 'Bearer ' + tokens.accessToken
                                    }
                                })))
                            );
                    } else if (error.status === 401) {
                        this.authenticationService.signOutNRedirect();
                        return;
                    }
                    return throwError(error);
                })
            );
    }

    authTimer() {
        if (this.subscription != undefined) {
            this.subscription.unsubscribe();
        }
        this.subscription = timer(28 * 60 * 1000)
            .subscribe(x => {
                this.authenticationService.showAuthCountDown();
            });
    }
}
