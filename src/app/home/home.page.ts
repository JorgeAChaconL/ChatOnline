import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { ChatsService, chat } from '../services/chats.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import {  ChatComponent } from "../components/chat/chat.component";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public chatRooms: any = [];

  constructor(public authService: AuthService, private chatsService: ChatsService, 
              private modalController: ModalController, public actionSheetController: ActionSheetController) {}

  onLogout(){
    this.authService.logout();
  }

  ngOnInit(){
    this.chatsService.getChat().subscribe( chats =>{
      this.chatRooms = chats;
    });
  }
  
  openChat(chat){
    this.modalController.create({
      component: ChatComponent,
      componentProps: {
        chat: chat 
      }
    }).then( (modal)=> modal.present());
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Albums',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Log Out',
        role: 'destructive',
        icon: 'Log-out',
        handler: () => {
         this.onLogout();
        }
      }]
    });
    await actionSheet.present();
  }

}
