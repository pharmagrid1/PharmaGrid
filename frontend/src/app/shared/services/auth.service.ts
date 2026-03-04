import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";


export interface AuthUser{
    id: number;
    full_name:string;
    email:string;
    role:string;
}

@Injectable({providedIn:'root'})
export class AuthService{
    private apiUrl='http://localhost:5000/api/auth';
    private currentUserSubject=new BehaviorSubject<AuthUser | null> (null);
    currentUser$=this.currentUserSubject.asObservable();

    constructor(private http:HttpClient){
        const stored=localStorage.getItem('pharmagrid_user');
        if(stored) this.currentUserSubject.next(JSON.parse(stored));
    }

    register(data:{full_name:string; email:string; password:string}): Observable<any>{
        return this.http.post(`${this.apiUrl}/register`, data).pipe(
            tap((res:any) => this.storeSession(res))
        );
    }

    login(data:{email:string; password:string}):Observable<any>{
        return this.http.post(`${this.apiUrl}/login`,data).pipe(
            tap((res:any)=>this.storeSession(res))
        );
    }

    logout():void{
        localStorage.removeItem('pharmagrid_token');
        localStorage.removeItem('pharmagrid_user');
        this.currentUserSubject.next(null);
    }

    getToken(): string | null{
        return localStorage.getItem('pharmagrid_token');
    }

    isLoggedIn(): boolean{
        return !!this.getToken();
    }

    getCurrentUser():AuthUser|null{
        return this.currentUserSubject.value;
    }

    private storeSession(res:any):void{
        localStorage.setItem('pharmagrid_token', res.token);
        localStorage.setItem('pharmagrid_user', JSON.stringify(res.user));
        this.currentUserSubject.next(res.user);
    }
}