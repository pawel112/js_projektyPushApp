import {Component} from '@angular/core';
import {NavController, MenuController} from 'ionic-angular';
import {MyDay} from '../../services/myday';

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account = { login: '', pass: '',  channel: ''};

  constructor(public nav: NavController, public menu: MenuController, private myday: MyDay) {
    // disable menu
    this.menu.swipeEnable(false);
  }

  add_device() {
    this.myday.addDevice(this.account.login, this.account.pass, this.account.channel);
  }

  del_device() {
    this.myday.delDevice(this.account.login, this.account.pass, this.account.channel);
  }
  
  get_channels() {
	this.myday.getChannels(this.account.login, this.account.pass);
  }
}
