// import { Injectable } from '@angular/core';
//
// import { Observable, of } from 'rxjs';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
//
// import { Item } from './item';
// import res from './api/items/res.json';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AbstractService {
//
//   private api = 'api/authors';
//   private token = '';
//   private usr: string = 'michael.koch@unibw.de';
//   private pwd: string = 'Joshua01!';
//
//   constructor(private http: HttpClient) {
//   }
//
//   //getUsers muss hier noch entfernt werden
//   getAuthors(): Observable<Item[]> {
//     return this.http.get<Item[]>(this.api);
//   }
//
//   getAbstracts(): Object[]{
//     return res._embedded.items;
//   }
//
//   auth(): void {
//     fetch('https://webtech.informatik.unibw-muenchen.de/server/api/')
//     .then(res => {
//       let super_token: any = res.headers.get('dspace-xsrf-token');
//       this.token = (super_token != null) ? super_token : '';
//
//       // fetch('https://webtech.informatik.unibw-muenchen.de/server/api/authn/login',
//       //   {
//       //     method: 'POST',
//       //     headers: {
//       //       'X-XSRF-TOKEN': this.token
//       //     },
//       //     body: 'user=' + encodeURIComponent(this.usr) + '&password=' + encodeURIComponent(this.pwd),
//       //     // body: JSON.stringify({
//       //     //   'user': encodeURIComponent('michael.koch@unibw.de'),
//       //     //   'password': 'Joshua01!'
//       //     // })
//       //   }
//       // ).then(res => console.log(res));
//     });
//   }
// }
