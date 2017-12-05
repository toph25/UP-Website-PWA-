import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FeedProvider, FeedItem, Feed } from '../../providers/feed/feed';
import { EncodedPage } from '../encoded/encoded';
import { HomePage } from '../home/home';
 
@IonicPage({
  name: 'FeedListPage'
})
@Component({
  selector: 'page-feed-list',
  templateUrl: 'feed-list.html'
})
export class FeedListPage {
 
  rootPage = 'EncodedPage';
  articles: FeedItem[];
  selectedFeed: Feed;
  loading: Boolean;
 
  constructor(private nav: NavController, private iab: InAppBrowser, private feedProvider: FeedProvider, private navParams: NavParams,private home: HomePage) {
    this.selectedFeed = navParams.get('selectedFeed');
  }
 
  public hide(){
    this.home.addFeed();
  }

  public openArticle(url: string) {
    //this.iab.create(url, '_blank');
    console.log(url);
    // window.open(url, '_blank');
  }
 
  loadArticles() {
    this.loading = true;
    this.feedProvider.getArticlesForUrl(this.selectedFeed.url).subscribe(res => {
      this.articles = res;
      this.loading = false;
    });
  }
 
  public ionViewWillEnter() {
    if (this.selectedFeed !== undefined && this.selectedFeed !== null ) {
      this.loadArticles()
    } else {
      this.feedProvider.getSavedFeeds().then(
        feeds => {
          if (feeds.length > 0) {
            let item = feeds[0];
            this.selectedFeed = new Feed(item.title, item.url);
            this.loadArticles();
          }
        }
      );
    }
  }

  public viewMore(data1 : Feed){
    //console.log(data1);
    this.nav.push(EncodedPage,{ 'datum': data1 });
  }

}