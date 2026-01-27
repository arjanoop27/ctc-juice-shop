import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {CtcUserAuth} from "../../services/ctc-user-auth/ctc-user-auth";
import {Observable} from "rxjs";
import {UserDetail} from "../../models";
import {CtcSession} from "../../services/ctc-session/ctc-session";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {CtcNarrativeSelection} from "../../services/ctc-narrative-selection/ctc-narrative-selection";

@Component({
    selector: 'app-ctc-navbar',
    imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTooltipModule],
    standalone: true,
    templateUrl: './ctc-navbar.html',
    styleUrl: './ctc-navbar.scss',
})
export class CtcNavbar {
    user$: Observable<UserDetail | null>
    modeLabel$: Observable<string>

    constructor(private readonly session: CtcSession, private readonly router: Router, private readonly auth: CtcUserAuth, private readonly narrative: CtcNarrativeSelection, private current: CtcNarrativeSelection) {
        this.user$ = this.session.getUser$()
        this.modeLabel$ = this.user$.pipe(
            map(u => (u?.ctcMode ? u.ctcMode.toUpperCase() : ''))
        )
    }

    goHome(): void {
        this.clearCurrentSelection()
        this.router.navigate(['/ctc/home'])
    }

    logout(): void {
        this.clearCurrentSelection()
        this.auth.logout().subscribe({
            next: () => {
                this.session.clear()
                this.router.navigate(['/ctc'])
            },
            error: () => {
                this.session.clear()
                this.router.navigate(['/ctc'])
            }
        })
    }

    clearCurrentSelection() {
        this.current.clear()
        this.narrative.clear()
    }
}
