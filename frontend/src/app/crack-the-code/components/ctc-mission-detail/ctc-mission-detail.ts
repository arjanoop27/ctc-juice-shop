import {Component, inject} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {CtcNarrative} from "../../services/ctc-narrative/ctc-narrative";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {CtcMission, CtcSubMission} from "../../models";
import {MatDividerModule} from "@angular/material/divider";
import {CtcNarrativeSelection} from "../../services/ctc-narrative-selection/ctc-narrative-selection";
import {CtcCurrentSelection} from "../../services/ctc-current-selection/ctc-current-selection";

@Component({
    selector: 'app-ctc-mission-detail',
    imports: [CommonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule],
    standalone: true,
    templateUrl: './ctc-mission-detail.html',
    styleUrl: './ctc-mission-detail.scss',
})
export class CtcMissionDetail {
    private readonly router = inject(Router)
    private readonly api = inject(CtcNarrative)
    private readonly selection = inject(CtcNarrativeSelection)
    private readonly currentChallenge = inject(CtcCurrentSelection)

    private readonly mission: CtcMission | null =
        (this.router.getCurrentNavigation()?.extras.state as any)?.mission
        ?? (history.state?.mission ?? null)

    mission$: Observable<CtcMission | null> = of(this.mission)

    subMissions$: Observable<CtcSubMission[]> = of(this.mission).pipe(
        switchMap((m) => {
            if (!m?._id) return of([])
            return this.api.getSubMissions(m._id)
        })
    )

    openSubMission(sm: CtcSubMission): void {
        if (this.isLocked(sm)) return
        this.selection.setSubMission(sm)
        this.currentChallenge.setCurrentChallenge({challengeId: sm.associatedChallengeId, ctcMode: 'narrative'})
        this.router.navigate(['/ctc/submission'])
    }

    isLocked(sm: CtcSubMission): boolean {
        return (sm.status || '').toLowerCase() === 'locked'
    }

    missionImage(m: CtcSubMission | null): string {
        if (!m?.image) return '../../../../assets/public/images/crack-the-code/mission-with-sub-placeholder.png'
        return m.image.trim().length > 0 ? m.image : '../../../../assets/public/images/crack-the-code/mission-with-sub-placeholder.png'
    }

    subMissionImage(sm: CtcSubMission): string {
        return sm.image && sm.image.trim().length > 0
            ? sm.image
            : '../../../../assets/public/images/crack-the-code/sub-mission-place-holder.png'
    }
}
