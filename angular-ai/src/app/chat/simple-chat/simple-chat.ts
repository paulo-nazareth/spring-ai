import { scrollUp, scrollDown } from './../../../../node_modules/ansi-escapes/base.d';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { NgClass } from "@angular/common";
import { timeout, catchError, of, throwError } from 'rxjs';
import { ChatService } from '../chat-service';

@Component({
  selector: 'app-simple-chat',
  imports: [MatCardModule, MatToolbar, MatInputModule, MatButtonModule, MatIconModule, FormsModule, NgClass ],
  templateUrl: './simple-chat.html',
  styleUrl: './simple-chat.scss',
})
export class SimpleChat {

  @ViewChild('chatHistory') 
  private chatHistory!: ElementRef;

  private chatService = inject(ChatService);

  userInput = '';
  isLoading = false;

  local = false;

  messages = signal([
    { text: 'Olá, como posso te ajudar hoje?', isBot: true }
  ]);

  sendMessage(){
    this.trimUserMessage();
    if (this.userInput != '' && !this.isLoading){
      this.updateMessages(this.userInput, false);
      this.isLoading = true;
      if(this.local){
        this.simulateResponse();
      } else {
        this.sendChatMessage();
      }
    }
  }

  private sendChatMessage(){
    this.chatService.sendChatMassage(this.userInput)
          .pipe(
            catchError(() => {
              this.updateMessages('Desculpe, não posso processar sua mensagem no momento!', true);
              this.isLoading = false;
              return throwError(() => new Error('Um erro ocorreu ao mandar a mensagem'))
              // return of();
            })
          )
          .subscribe(response => {
            this.updateMessages(response.message, true);
            this.userInput = '';
            this.isLoading = false;
          });
  }

  private trimUserMessage(){
    this.userInput = this.userInput.trim();
  }

  private updateMessages(text: string, isBot = false){
    this.messages.update( messages => [ ...messages, { text: text, isBot: isBot }] );
    this.scrollToBottom();
  }

  private simulateResponse(){
    setTimeout(() => {
      const response = 'Esta é uma resposta simulada do Chat AI.';
      this.updateMessages(response, true);
      this.isLoading = false;
    }, 5000);
  }

  private scrollToBottom(){
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } catch(err) {}
  }
}
