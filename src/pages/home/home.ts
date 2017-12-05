import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, Nav, IonicPage } from 'ionic-angular';
import { FeedProvider, Feed } from '../../providers/feed/feed';
import { InAppBrowser } from '@ionic-native/in-app-browser';
 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  /*template: `
      <div class = "gone" *ngIf= "show" >
      <button ion-button full (click)="gone()" action secondary>
        <ion-icon name="add"></ion-icon> Remove Feed
      </button>
        
    </div>`*/
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
 
  rootPage = 'FeedListPage';
  feeds: Feed[];
  isenabled:boolean=true;
 
  constructor(private navController: NavController, private feedProvider: FeedProvider, public alertCtrl: AlertController,private iab: InAppBrowser) { }

  show = true;
    public gone(){
      this.show = !this.show;
    }
 
  public addFeed() {
    let arr = [];
    let newFeed1 = new Feed("News", 'https://web01.up.edu.ph/index.php/category/news/feed/');
    //this.feedProvider.addFeed(newFeed1);
    arr.push(newFeed1);
    this.loadFeeds();
      
  
    let newFeed2 = new Feed("Announcements", 'https://web01.up.edu.ph/index.php/category/announcements/feed/');
    //this.feedProvider.addFeed(newFeed2);
    arr.push(newFeed2);
    this.loadFeeds();
      
    //this.feedProvider.addFeed(arr);

    let newFeed3 = new Feed("Breakthroughs", 'https://web01.up.edu.ph/index.php/category/breakthroughs/feed/');
    arr.push(newFeed3);
    this.loadFeeds();

    let newFeed4 = new Feed("Profiles", 'https://web01.up.edu.ph/index.php/category/profiles/feed/');
    arr.push(newFeed4);
    this.loadFeeds();
    
    this.feedProvider.addFeed(arr);
  }
  public removeFeed(){
    this.feedProvider.clear();
  }
 
  private loadFeeds() {
    //this.feedProvider.clear();
    console.log("loadFeeds runs . . .");
    this.feedProvider.getSavedFeeds().then(
      allFeeds => {
        this.feeds = allFeeds;
      });
  }
 
  public openFeed(feed: Feed) {
    this.nav.setRoot('FeedListPage', { 'selectedFeed': feed });
  }
 
  public ionViewWillEnter() {
    this.loadFeeds();
  }

  public openAlumni(url: string) {
    this.iab.create(url, '_blank');
    //console.log(url);
    window.open(url, '_blank');
  }
  
  /*hide:boolean = true;
  public ngIfCtrl() {
   hide = !this.hide;
  }*/

}

