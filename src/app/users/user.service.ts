import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Repo } from "../repo";
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  private username= 'tgalvinjr';
  languageMap = new Map();
  Http
  constructor(private _httpClient: HttpClient) {
    console.log('Github service init');
  }

  getUser():Observable<Repo[]> {
    return this._httpClient.get<Repo[]>(`https://api.github.com/users/${this.username}`);
      // .pipe(map(res => res.json()));
  }
  getRepos():Observable<Repo[]> {
    return this._httpClient.get<Repo[]>(`https://api.github.com/users/${this.username}/repos?per_page=100`);
      // .pipe(map(res => res.json()));
  }
  updateUsername(username: string) {
    this.username = username;
  }
  getLanguages(url: string) {
    return this._httpClient.get(url).pipe(map(res => res.json()));
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
