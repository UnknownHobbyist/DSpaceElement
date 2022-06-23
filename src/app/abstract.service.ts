import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Item } from './item';
import res from './api/items/res.json';

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  private api = 'api/authors';
  private baerer = '';
  private usr: string = 'michael.koch@unibw.de';
  private pwd: string = 'Joshua01!';

  constructor(private http: HttpClient) {
  }

  getAbstracts(): Promise<Item[]>{
    const error_handler: Item[] = [];

    return this.auth()
    .then(status => {
      if(status){
        return this.performAbstractRequest();
      }else{
        console.log("fatal error occured while authentificating");
        return error_handler;
      }
      return error_handler;
    })
  }

  performAbstractRequest(): Promise<Item[]>{
    let abstracts: Item[] = [];
    let received: number = 0;

    return this.getNumberOfPages().then(length => {
      return new Promise((resolve, reject) => {
        for(let i = 0; i < length; i++){
          this.getPageByNumber(i).then(arr => {
            abstracts = abstracts.concat(arr);
            received++;
            if(length == received)
              resolve(abstracts);
          });
        }
      })
    });
  }

  getPageByNumber(num: number): Promise<Item[]>{

    return fetch('https://webtech.informatik.unibw-muenchen.de/server/api/core/items?page=' + num.toString() + '&size=100',
      {
        method: 'GET',
        headers: {
          'Authorization': this.baerer,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
        credentials: 'include'
      })
      .then(res => {
        return res.json();
      }).then(data => {
        let size = data._embedded.items.length;
        let cache1: Item[] = []

        for(let i = 0; i < size; i++){
          let item = data._embedded.items[i];
          let release = item.metadata['dc.date.accessioned'];
          let description = item.metadata['dc.description.abstract'];
          let authors = item.metadata['dc.contributor.author'].map((author: any) => author.value);

          cache1.push({
            id: item.id,
            title: item.name,
            authors: authors.join("  "),
            releaseDate: (release != null) ? release[0].value : '',
            description: (description != null) ? description[0].value : ''
          });
        }

        return cache1;
      }).then();
  }

  getNumberOfPages(): Promise<number>{
    return fetch('https://webtech.informatik.unibw-muenchen.de/server/api/core/items?page=0&size=100',
      {
        method: 'GET',
        headers: {
          'Authorization': this.baerer,
          'Content-Type': 'application/x-www-form-urlencoded'
      },
        credentials: 'include'
      })
      .then(res => {
        return res.json();
      }).then(data => {
        return data.page.totalPages;
      });
  }

  auth(): Promise<boolean> {
    return this.login(this.usr, this.pwd);
  }

  login(user: string, password: string): Promise<boolean> {
    if(this.getXSRF() != ''){
      return this.performLogin(user, password);
    }else{
      return this.generateXSRF().then(super_token => {
        if(super_token != ''){
          return this.performLogin(user, password);
        }else{
          console.log("fatal error couldnt generate xsrf token");
          return false;
        }
      });
    }
  }

  performLogin(user: string, password: string): Promise<boolean>{
    return fetch('https://webtech.informatik.unibw-muenchen.de/server/api/authn/login',
      {
        method: 'POST',
        headers: {
          'X-XSRF-TOKEN': this.getXSRF(),
          'Content-Type': 'application/x-www-form-urlencoded'
      },
        credentials: 'include',
        body: 'user=' + encodeURIComponent(user) + '&password=' + encodeURIComponent(password)
      })
      .then(res => {
        let super_token: any = res.headers.get('dspace-xsrf-token');
        if(super_token != '')
          this.updateXSRF(super_token);

        let super_baerer = res.headers.get("authorization");

        if(super_baerer != null){
          this.baerer = super_baerer;
          return true;
        }else{
          return false;
        }
      });
  }

  isAuthenticated(): Promise<boolean>{
    return fetch('https://webtech.informatik.unibw-muenchen.de/server/api/authn/status', {credentials: 'include'})
    .then(res => {
      let super_token = res.headers.get('dspace-xsrf-token');
      if(super_token != null)
        this.updateXSRF(super_token);

      return res.json()
    })
    .then(json_data => {return json_data.authenticated;})
  }

  generateXSRF(): Promise<string>{
    return fetch('https://webtech.informatik.unibw-muenchen.de/server/api/authn', {credentials: 'include'})
    .then(res => {

      res.headers.forEach(console.log);
      console.log(res);
      let super_token = res.headers.get('dspace-xsrf-token');
      if(super_token != null){
        this.updateXSRF(super_token);
        return super_token;
      }
      return '';
    });
  }

  updateXSRF(token: string): void{
    this.setCookie("DSPACE-XSRF-COOKIE", token);
  }

  getXSRF(): string{
    return this.getCookie("DSPACE-XSRF-COOKIE");
  }

  setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = name+"="+value+";path=/";
  }

  getCookie(key: string): string{
    let cache1 = ";" + document.cookie;
    let cache2 = cache1.split(";" + key + "=");
    let cache3 = cache2.pop();
    if(cache3 != null){
      return cache3.split(";")[0];
    }
    return "";
  }

}
