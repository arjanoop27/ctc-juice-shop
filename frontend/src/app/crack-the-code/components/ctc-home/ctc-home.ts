import { Component } from '@angular/core';
import {CtcSession} from "../../services/ctc-session/ctc-session";
import {Observable} from "rxjs";
import {UserDetail} from "../../models";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-ctc-home',
  imports: [CommonModule],
  templateUrl: './ctc-home.html',
  styleUrl: './ctc-home.scss',
})
export class CtcHome {

  user$: Observable<UserDetail | null>

  constructor (private readonly session: CtcSession) {
    this.user$ = this.session.getUser$()
  }

}
