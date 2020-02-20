import {Injectable} from "@angular/core";
import {OneSignal} from '@ionic-native/onesignal';
import {HTTP} from '@ionic-native/http';

@Injectable()

export class MyDay {
  private id: string           = "";
  private oneSignalId: string  = "";
  private googleId: string     = "";

  constructor(private http: HTTP, private oneSignal: OneSignal) {
    this.getID();
  }

  addDevice(user, pass, channel) {
	if ((user.localeCompare ("") == 0) || (pass.localeCompare ("") == 0) || (channel.localeCompare ("") == 0)) {
	  alert ("One or more fields are empty!")
      return;
	} else {
	  this.http.post('https://profil.apfeng.com/app/add?user='+user+'&pass='+pass, {}, {}).catch(error => {
	  if (error.error.localeCompare ("ok") == 0) {
		  this.oneSignal.sendTag(channel, "1");
		  alert("The device has been added successfully.");
		  return;
	    } if (error.error.localeCompare ("user-not-found") == 0) {
          alert ("The login / password provided is incorrect."); 
		  return;
        } else {
          alert("Unknown error.");
		  return;
        }
      });
	}
  }

  delDevice(user, pass, channel) {
	if ((user.localeCompare ("") == 0) || (pass.localeCompare ("") == 0) || (channel.localeCompare ("") == 0)) {
	  alert ("One or more fields are empty!")
      return;
	} else {
	  this.http.post('https://profil.apfeng.com/app/del?user='+user+'&pass='+pass, {}, {}).catch(error => {
	  if (error.error.localeCompare ("ok") == 0) {
		  this.oneSignal.deleteTag(channel);
		  alert("The device has been removed successfully.");
		  return;
	    } if (error.error.localeCompare ("user-not-found") == 0) {
          alert ("The login / password provided is incorrect.");
		  return;
        } else {
          alert("Unknown error.");
		  return;
        }
      });
	}
  }
  
  getChannels(user, pass) {
	if ((user.localeCompare ("") == 0) || (pass.localeCompare ("") == 0)) {
	  alert ("One or more fields are empty!")
      return;
	} else {
	  this.http.post('https://profil.apfeng.com/app/get?user='+user+'&pass='+pass, {}, {}).catch(error => {
	  if (error.error.localeCompare ("ok") == 0) {
		  this.oneSignal.getTags().then(function(res) {
			var res_text = "";
			for (var i=0; i<Object.keys(res).length; i++) {
			  res_text += Object.keys(res)[i];
			  res_text += ", ";
			}
			  
			alert ("Channels: "+res_text.substr(0, res_text.length-2)+".");
			return;
		  });
	    } if (error.error.localeCompare ("user-not-found") == 0) {
          alert ("The login / password provided is incorrect.");
		  return;
        }
      });
	}
  }

  getID() {
    this.oneSignal.startInit(this.oneSignalId, this.googleId);
    this.oneSignal.setSubscription(true);
    this.oneSignal.getIds().then(res => {
      this.id = res.userId;
    });
    this.oneSignal.endInit();
  }
}