import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { NgClass } from "@angular/common";
import { timeout } from 'rxjs';

@Component({
  selector: 'app-simple-chat',
  imports: [MatCardModule, MatToolbar, MatInputModule, MatButtonModule, MatIconModule, FormsModule, NgClass ],
  templateUrl: './simple-chat.html',
  styleUrl: './simple-chat.scss',
})
export class SimpleChat {

  userInput = '';

  messages = signal([
    { text: 'Olá, como posso te ajudar hoje?', isBot: true }
  ]);

  sendMessage(){
    this.trimUserMessage();
    if (this.userInput != ''){
      this.updateMessages(this.userInput, false);
      this.userInput = '';
      this.simulateResponse();
    }
  }

  private trimUserMessage(){
    this.userInput = this.userInput.trim();
  }

  private updateMessages(text: string, isBot = false){
    this.messages.update( messages => [ ...messages, { text: text, isBot: isBot }] );
  }

  private simulateResponse(){
    setTimeout(() => {
      const response = 'Esta é uma resposta simulada do Chat AI.';
      this.updateMessages(response, true);
    }, 2000);
  }
}
