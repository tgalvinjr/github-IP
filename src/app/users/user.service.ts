import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {

  private username= 'tgalvinjr';
  languageMap = new Map();

  constructor(private _http: Http) {
    console.log('Github service init');
  }

  getUser() {
    return this._http.get(`https://api.github.com/users/${this.username}`)
      .pipe(map(res => res.json()));
  }
  getRepos() {
    return this._http.get(`https://api.github.com/users/${this.username}/repos?per_page=100`)
      .pipe(map(res => res.json()));
  }
  updateUsername(username: string) {
    this.username = username;
  }
  getLanguages(url: string) {
    return this._http.get(url).pipe(map(res => res.json()));
  }
  storeLanguageMap(language: Object) {
    var languageArray = Object.keys(language);
    for (var j = 0; j < languageArray.length; j++) {
      var name = languageArray[j];
      var value = language[name];
      console.log(value);
      if (!this.languageMap.get(name)) {
        this.languageMap.set(name, value);
      } else {
        var tempVal = this.languageMap.get(name);
        tempVal += value;
        this.languageMap.set(name, tempVal);
      }
      
    }
  }
  getLanguageMap() {
    return this.languageMap;
  }

}
