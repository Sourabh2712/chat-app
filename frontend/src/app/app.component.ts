import { ChatService } from './services/chat.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass, TitleCasePipe } from '@angular/common';

export interface UserInfo {
    userId: string;
    name: string;
}

export interface ChatMessage {
    messageId: string;
    text: string;
    userId: string;
    userName: string;
    sentiment: 'positive' | 'neutral' | 'negative';
}

@Component({
    selector: 'app-root',
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        TitleCasePipe,
        NgClass,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
    title = 'Wellcome to Chat App';
    isJoined: boolean = false;
    username: FormControl = new FormControl('', [Validators.required]);
    joinedUser: UserInfo = {
        userId: '',
        name: '',
    };

    message: FormControl = new FormControl('', [Validators.required]);
    messages: any[] = [];

    private ChatService = inject(ChatService);

    constructor() {
        this.ChatService.messages$.subscribe((msgs) => {
            if (this.isJoined) {
                this.messages = msgs;
            }
        });
    }

    ngOnInit(): void {
        console.log('Chat App initialized');
    }

    joinChat(): void {
        this.ChatService.joinChat({
            userName: this.username.value,
        }).subscribe({
            next: (response: UserInfo) => {
                this.joinedUser = response;
                this.isJoined = true;
                this.username.reset();
            },
            error: (error) => {
                console.error('Error joining chat:', error);
            },
            complete: () => {
                console.log('Chat joined successfully');
            },
        });
    }

    sendMessage(): void {
        this.ChatService.sendMessage({
            userId: this.joinedUser.userId,
            userName: this.joinedUser.name,
            text: this.message.value,
        }).subscribe({
            next: (response: any) => {
                console.log('Message sent successfully:', response);
                this.message.reset();
            },
            error: (error) => {
                console.error('Error sending message:', error);
            },
            complete: () => {
                console.log('Message sent successfully');
            },
        });
    }
}
