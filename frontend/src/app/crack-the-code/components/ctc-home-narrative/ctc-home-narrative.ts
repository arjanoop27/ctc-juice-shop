import {Component, inject} from '@angular/core';
import {MatListModule} from "@angular/material/list";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from "@angular/material/divider";
import {CtcNarrative} from "../../services/ctc-narrative/ctc-narrative";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {CtcActiveTheme, CtcMission, UserDetail} from "../../models";
import {CtcSession} from "../../services/ctc-session/ctc-session";
import {map} from "rxjs/operators";

@Component({
    selector: 'app-ctc-home-narrative',
    imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatDividerModule, MatListModule],
    standalone: true,
    templateUrl: './ctc-home-narrative.html',
    styleUrl: './ctc-home-narrative.scss',
})
export class CtcHomeNarrative {
    private readonly api = inject(CtcNarrative)
    private readonly router = inject(Router)
    private readonly session = inject(CtcSession)

    user$: Observable<UserDetail | null> = this.session.getUser$()
    theme$: Observable<CtcActiveTheme | null> = this.api.getActiveTheme()
    missions$: Observable<CtcMission[]> = this.api.getMissions()

    openMission(mission: CtcMission) {
        this.router.navigate(['/ctc/mission'], {
            state: {mission}
        })

    }

    missionImage(mission: CtcMission): string {
        return mission.image && mission.image.trim().length > 0
            ? mission.image
            : '../../../../assets/public/images/crack-the-code/mission_placeholder.png'
    }
}
