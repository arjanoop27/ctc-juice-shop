import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {CtcChallenges} from "../../services/ctc-challenges/ctc-challenges";
import {Router} from "@angular/router";
import {BehaviorSubject, combineLatest, Observable, startWith} from "rxjs";
import {CtcChallenge} from "../../models";
import {map} from "rxjs/operators";
import {MatDivider} from "@angular/material/divider";
import {CtcCurrentSelection} from "../../services/ctc-current-selection/ctc-current-selection";

@Component({
    selector: 'app-ctc-home-vanilla',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressBarModule, MatChipsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatDivider],
    standalone: true,
    templateUrl: './ctc-home-vanilla.html',
    styleUrl: './ctc-home-vanilla.scss',
})
export class CtcHomeVanilla {
    private readonly challengesApi = inject(CtcChallenges)
    private readonly router = inject(Router)
    private readonly search$ = new BehaviorSubject<string>('')
    private readonly currentChallenge = inject(CtcCurrentSelection)

    challenges$: Observable<CtcChallenge[]> = this.challengesApi.getAllChallenges()

    filteredChallenges$: Observable<CtcChallenge[]> = combineLatest([
        this.challenges$,
        this.search$.pipe(startWith(''))
    ]).pipe(
        map(([challenges, q]) => {
            const query = (q || '').trim().toLowerCase()
            if (!query) return challenges

            return challenges.filter((c) =>
                c.name.toLowerCase().includes(query) ||
                c.description.toLowerCase().includes(query) ||
                c.category.toLowerCase().includes(query) ||
                (c.tags || []).some(t => (t || '').toLowerCase().includes(query))
            )
        })
    )

    stats$ = this.challenges$.pipe(
        map((challenges) => {
            const total = challenges.length
            const solved = 1
            const isCoding = (c: CtcChallenge) =>
                (c.tags || []).some(t => t.toLowerCase() === 'with coding challenge')

            const coding = challenges.filter(isCoding)
            const hacking = challenges.filter(c => !isCoding(c))

            const codingSolved = 0
            const hackingSolved = 2

            const pct = (num: number, den: number) => den === 0 ? 0 : Math.round((num / den) * 100)

            return {
                total,
                solved,
                codingTotal: coding.length,
                codingSolved,
                hackingTotal: hacking.length,
                hackingSolved,
                codingPct: pct(codingSolved, coding.length),
                hackingPct: pct(hackingSolved, hacking.length)
            }
        })
    )

    stars(count: number): number[] {
        const n = Math.max(0, Math.min(4, Number(count) || 0))
        return Array.from({length: n}, (_, i) => i)
    }

    onSearch(value: string) {
        this.search$.next(value)
    }

    startChallenge(challenge: CtcChallenge) {
        this.currentChallenge.setCurrentChallenge({challengeId: challenge._id, ctcMode: 'vanilla'})
        this.router.navigate(['/ctc/challenge'])
    }
}
