import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedProvider, Feed } from '../../providers/feed/feed';

/**
 * Generated class for the EncodedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-encoded',
  templateUrl: 'encoded.html',
})
export class EncodedPage {
	data: Feed;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.data = navParams.get('datum');
  }

  public show(){
  	console.log(this.data);
  }

  public back(){
  	this.navCtrl.pop();
  }


}
