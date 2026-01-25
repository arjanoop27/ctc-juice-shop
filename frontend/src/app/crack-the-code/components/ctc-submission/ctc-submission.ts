import {Component, inject} from '@angular/core';
import {MatDividerModule} from "@angular/material/divider";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CtcNarrativeSelection} from "../../services/ctc-narrative-selection/ctc-narrative-selection";
import {CtcNarrative} from "../../services/ctc-narrative/ctc-narrative";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";
import {filter, map, switchMap} from "rxjs/operators";
import {CtcHint, CtcSubMission, CtcSubMissionDetails} from "../../models";
import {CtcChallenge} from "../ctc-challenge/ctc-challenge";

@Component({
    selector: 'app-ctc-submission',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule, MatProgressSpinnerModule, MatDividerModule, CtcChallenge],
    standalone: true,
    templateUrl: './ctc-submission.html',
    styleUrl: './ctc-submission.scss',
})
export class CtcSubmission {
    private readonly selection = inject(CtcNarrativeSelection)
    private readonly api = inject(CtcNarrative)
    private readonly router = inject(Router)

    selected$: Observable<CtcSubMission> = this.selection.getSubMission$().pipe(
        tap((sm) => {
            if (!sm) this.router.navigate(['/ctc/home'])
        }),
        filter((sm): sm is CtcSubMission => !!sm)
    )

    narration$: Observable<CtcSubMissionDetails | null> = this.selected$.pipe(
        switchMap(sm => this.api.getSubMissionDetails(sm._id))
    )

    hintIndex$: Observable<CtcHint[]> = this.selected$.pipe(
        switchMap(sm => this.api.getHintsBySubMissionId(sm._id)),
        map(list => list.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)))
    )

    private readonly hintCache = new Map<string, CtcHint | null>()
    hintLoading: Record<string, boolean> = {}

    getCachedHint(hintId: string): CtcHint | null | undefined {
        return this.hintCache.get(hintId)
    }

    onHintOpened(h: CtcHint): void {
        const hintId = h._id
        if (this.hintCache.has(hintId)) return

        this.hintLoading[hintId] = true
        this.api.getHintById(hintId).subscribe({
            next: (detail) => {
                this.hintCache.set(hintId, detail)
                this.hintLoading[hintId] = false
            },
            error: () => {
                this.hintCache.set(hintId, null)
                this.hintLoading[hintId] = false
            }
        })
    }
}
