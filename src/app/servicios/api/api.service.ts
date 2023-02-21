import { Injectable } from '@angular/core';
import {LoginI} from '../../modelos/login.interface';
import {ResponseI} from '../../modelos/response.interface';
import { HttpClient,HttpHeaders,HttpInterceptor,HttpEvent, HttpHandler,HttpRequest } from '@angular/common/http';
import {Observable} from 'rxjs';
import { CovidCaseI } from 'src/app/modelos/listaCovidCase.interface';
import { CovidForStateI } from 'src/app/modelos/listaCovidForState.interface';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const apiReq = req.clone({ url: `http://localhost:5249/api/${req.url}` });
    return next.handle(apiReq);
  }
}

@Injectable()
export class ApiService {

  //url:string = "http://localhost:5249/api/"

  constructor(private http:HttpClient) { }

  loginByEmail(form:LoginI):Observable<ResponseI>{
    let direccion =  "Account/authenticate";
    return this.http.post<ResponseI>(direccion, form);
  }

  getAllCovidCase(): Observable<ResponseI> {
    let direccion =  "v1/CovidCase";
    var auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.http.get<ResponseI>(direccion, { headers: headers, responseType: 'json' });
  }


  updateCovidCase(covidCase: CovidCaseI):Observable<ResponseI>{
    let direccion =  `v1/CovidCase/${covidCase.id}`;
    var auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const body = JSON.stringify(covidCase);

    return this.http.put<ResponseI>(direccion,body ,{ headers: headers, responseType: 'json' });
  }



  deleteCovidCase(id : number):Observable<ResponseI>{
    let direccion =  `v1/CovidCase/${id}`;
    var auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });


    return this.http.delete<ResponseI>(direccion ,{ headers: headers, responseType: 'json' });
  }


  createdCovidCase(covidCase: CovidCaseI):Observable<ResponseI>{
    let direccion =  'v1/CovidCase';
    var auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const { id, ...covidCaseWithoutId } = covidCase;
    const body = JSON.stringify(covidCaseWithoutId);

    return this.http.post<ResponseI>(direccion,body ,{ headers: headers, responseType: 'json' });
  }

  //CovidForState


  getAllCovidForState(): Observable<ResponseI> {
    let direccion =  "v1/CovidForState";
    var auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    return this.http.get<ResponseI>(direccion, { headers: headers, responseType: 'json' });
  }


  updateCovidForState(covidCase: CovidForStateI):Observable<ResponseI>{
    let direccion =  `v1/CovidForState/${covidCase.id}`;
    var auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const body = JSON.stringify(covidCase);

    return this.http.put<ResponseI>(direccion,body ,{ headers: headers, responseType: 'json' });
  }



  deleteCovidForState(id : number):Observable<ResponseI>{
    let direccion =  `v1/CovidForState/${id}`;
    var auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });


    return this.http.delete<ResponseI>(direccion ,{ headers: headers, responseType: 'json' });
  }


  createdCovidForState(covidCase: CovidForStateI):Observable<ResponseI>{
    let direccion =  'v1/CovidForState';
    var auth_token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });

    const { id, ...covidCaseWithoutId } = covidCase;
    const body = JSON.stringify(covidCaseWithoutId);

    return this.http.post<ResponseI>(direccion,body ,{ headers: headers, responseType: 'json' });
  }



}
