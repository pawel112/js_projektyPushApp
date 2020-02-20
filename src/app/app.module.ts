import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {OneSignal} from '@ionic-native/onesignal';
import {HTTP} from '@ionic-native/http';

// import services
import {MyDay} from '../services/myday';
// end import services

// import pages
import {LoginPage} from '../pages/login/login';
// end import pages

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MyDay,
    OneSignal,
    HTTP
    /* import services */
  ]
})
export class AppModule {
}
