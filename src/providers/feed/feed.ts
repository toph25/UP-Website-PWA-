import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

 
export class FeedItem {
  description: string;
  link: string;
  title: string;
  encoded: string;
 
  constructor(encoded: string, link: string, title: string, description: string) {
    this.description = description;
    this.link = link;
    this.title = title;
    this.encoded = encoded;
  }
}
 
export class Feed {
  title: string;
  url: string;
 
  constructor(title: string, url: string) {
    this.title = title;
    this.url = url;
  }
}


 
@Injectable()
export class FeedProvider {
 
  constructor(private http: Http, public storage: Storage) {}
 
  public getSavedFeeds() {
    return this.storage.get('savedFeeds').then(data => {
      let objFromString = JSON.parse(data);
      if (data !== null && data !== undefined) {
        console.log("in getSavedFeeds . . .");
        console.log(JSON.parse(data));
        return JSON.parse(data);
      } else {
        return [];
      }
    });
  }
  /*public addEverythingNice(newFeed: Feed){
    FeedArt.arr.push(newFeed);
    console.log(FeedArt.arr);
  }*/

  public addFeed(feeders: any[]) {
    //console.log(newFeed.title);

    return this.getSavedFeeds().then(arrayOfFeeds => {
      //arrayOfFeeds.push(newFeed)
      for(let i=0; i< 4; i++){
        console.log(feeders[i]);
        arrayOfFeeds.push(feeders[i]);
      }
      let jsonString = JSON.stringify(arrayOfFeeds);
      return this.storage.set('savedFeeds', jsonString);
    });

  }
 
  public clear(){
    this.storage.clear();
  }

  public getArticlesForUrl(feedUrl: string) {
    console.log(feedUrl);
    var url = 'https://query.yahooapis.com/v1/public/yql?q=select%20title%2Clink%2Cdescription%2Cencoded%20from%20rss%20where%20url%3D%22'+encodeURIComponent(feedUrl)+'%22&format=json';
    let articles = [];
    return this.http.get(url)
    .map(data => data.json()['query']['results'])
    .map((res) => {
      if (res == null) {
        return articles;
      }
      let objects = res['item'];
      var length = 20;
 
      for (let i = 0; i < objects.length; i++) {
        let item = objects[i];
        var trimmedDescription = item.description.length > length ?
        item.description.substring(0,80) + ". . .":
        item.description;
        console.log(item.title);
        let newFeedItem = new FeedItem(item.encoded, item.link, item.title, item.description);
        articles.push(newFeedItem);
      }
      return articles
    })
  }
}