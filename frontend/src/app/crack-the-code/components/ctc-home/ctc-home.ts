import {Component} from '@angular/core';
import {CtcSession} from "../../services/ctc-session/ctc-session";
import {Observable} from "rxjs";
import {UserDetail} from "../../models";
import {CommonModule} from "@angular/common";
import {CtcHomeVanilla} from "../ctc-home-vanilla/ctc-home-vanilla";
import {CtcHomeNarrative} from "../ctc-home-narrative/ctc-home-narrative";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-ctc-home',
  imports: [CommonModule, MatProgressSpinnerModule, CtcHomeVanilla, CtcHomeNarrative],
  standalone: true,
  templateUrl: './ctc-home.html',
  styleUrl: './ctc-home.scss',
})
export class CtcHome {

  user$: Observable<UserDetail | null>

  constructor(private readonly session: CtcSession) {
    this.user$ = this.session.getUser$()
  }

}
