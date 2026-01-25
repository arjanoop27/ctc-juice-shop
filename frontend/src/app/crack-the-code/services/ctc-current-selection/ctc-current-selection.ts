import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CtcCurrentChallenge} from "../../models";

@Injectable({
    providedIn: 'root',
})
export class CtcCurrentSelection {
    private readonly currentChallenge$ = new BehaviorSubject<CtcCurrentChallenge | null>(null)

    setCurrentChallenge(challenge: CtcCurrentChallenge): void {
        this.currentChallenge$.next(challenge)
    }

    clear(): void {
        this.currentChallenge$.next(null)
    }

    get snapshot(): CtcCurrentChallenge | null {
        return this.currentChallenge$.value
    }
    
    getCurrentChallenge$() {
        return this.currentChallenge$.asObservable()
    }

}
