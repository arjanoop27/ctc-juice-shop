import {inject, Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {environment} from "../../../../environments/environment";
import {CtcCurrentSelection} from "../ctc-current-selection/ctc-current-selection";
import {CtcNarrativeSelection} from "../ctc-narrative-selection/ctc-narrative-selection";
import {CtcNotificationHelper} from "../ctc-notification-helper/ctc-notification-helper";

@Injectable({
    providedIn: 'root',
})
export class CtcNotification {
    private socket?: Socket;
    private readonly ctcBffServer = environment.ctcBffServer
    private readonly currentChallenge = inject(CtcCurrentSelection)
    private readonly currentNarrative = inject(CtcNarrativeSelection)
    private readonly notificationHelper = inject(CtcNotificationHelper)

    connect(accessToken?: string) {

        this.socket = io(this.ctcBffServer, {
            transports: ['websocket'],
            withCredentials: true,
            auth: accessToken ? {token: accessToken} : undefined,
        });

        this.socket.on('connect', () => {
            console.log('WS connected');
        });

        this.socket.on('challengeSolved', (msg) => {
            this.notificationHelper.open('Challenge Solved!');
            import('../../../../confetti').then(module => {
                module.shootConfetti()
            })
            this.currentChallenge.clear();
            this.currentNarrative.clear();
        });

        this.socket.on('connect_error', (err) => {
            console.error('ws connect_error', err.message);
        });
    }

    disconnect() {
        this.socket?.disconnect();
        this.socket = undefined;
    }
}
