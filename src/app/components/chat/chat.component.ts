import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { message } from '../../models/message'
import {ChatsService } from "../../services/chats.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat: any

  public messages = [];
  public message : message;
  public msg : string

  public room: any;
  
  constructor(private navParams: NavParams, private modalController: ModalController,
              private chatsService: ChatsService) { }

  ngOnInit() {
    this.chatsService.getChatRoom(this.chat.id).subscribe(room => {
      console.log(room)
      this.room = room
    })
    this.chat = this.navParams.get('chat')

  }

  closeChat(){
    this.modalController.dismiss();
  }

  sendMessage(){
    
    const message : message = {
      content : this.msg,
      type: 'text',
      date: new Date()
    }
    this.chatsService.sendMsgToFirebase(message, this.chat.id)
    this.msg = "";
  }


}
