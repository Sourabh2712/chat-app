import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../environments/environment';
import { ChatMessage } from '../app.component';

interface Message {
    id: string;
    userId: string;
    userName: string;
    text: string;
    sentiment: string;
}

interface UserInfo {
    userId: string;
    name: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
    private socket: Socket;
    public messages$ = new BehaviorSubject<Message[]>([]);

    constructor(protected http: HttpClient) {
        this.socket = io(`${Environment.API_URL}`); // adjust if needed

        this.socket.on('initMessages', (msgs: Message[]) => {
            this.messages$.next(msgs);
        });

        this.socket.on('newMessage', (msg: Message) => {
            this.messages$.next([...this.messages$.value, msg]);
        });

        this.socket.on('sentimentUpdate', (update: { id: string; sentiment: string }) => {
            const updated = this.messages$.value.map((m) =>
                m.id === update.id ? { ...m, sentiment: update.sentiment } : m
            );
            console.log(updated, 'updated');
            this.messages$.next(updated);
        });
    }

    joinChat({ userName }: { userName: string }): Observable<UserInfo> {
        return this.http.post<UserInfo>(`${Environment.API_URL}/join`, {
            name: userName,
        });
    }

    sendMessage({ userId, userName, text }: { userId: string; userName: string; text: string }): Observable<Message> {
        return this.http.post<Message>(`${Environment.API_URL}/message`, {
            userId,
            userName,
            text,
        });
    }

    onNewMessage(): Observable<ChatMessage> {
        return new Observable((subscriber) => {
            this.socket.on('newMessage', (data: ChatMessage) => {
                subscriber.next(data);
            });
        });
    }
}
