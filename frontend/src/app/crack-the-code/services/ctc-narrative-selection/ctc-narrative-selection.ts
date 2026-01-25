import {Injectable} from '@angular/core';
import {CtcSubMission} from "../../models";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class CtcNarrativeSelection {
    private readonly subMission$ = new BehaviorSubject<CtcSubMission | null>(null)

    setSubMission(sm: CtcSubMission): void {
        this.subMission$.next(sm)
    }

    clear(): void {
        this.subMission$.next(null)
    }

    getSubMission$(): Observable<CtcSubMission | null> {
        return this.subMission$.asObservable()
    }

    get snapshot(): CtcSubMission | null {
        return this.subMission$.value
    }
}
