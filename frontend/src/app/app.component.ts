/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { Component, inject } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import {CommonModule, DOCUMENT} from '@angular/common'
import { dom } from '@fortawesome/fontawesome-svg-core'
import {NavigationEnd, Router, RouterOutlet} from '@angular/router'
import { WelcomeComponent } from './welcome/welcome.component'
import { ChallengeSolvedNotificationComponent } from './challenge-solved-notification/challenge-solved-notification.component'
import { ServerStartedNotificationComponent } from './server-started-notification/server-started-notification.component'
import { NavbarComponent } from './navbar/navbar.component'
import { SidenavComponent } from './sidenav/sidenav.component'
import { MatSidenavContainer, MatSidenav } from '@angular/material/sidenav'
import {CtcSession} from "./crack-the-code/services/ctc-session/ctc-session";
import {combineLatest, Observable, startWith} from "rxjs";
import {filter, map} from "rxjs/operators";

dom.watch()

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatSidenavContainer, MatSidenav, SidenavComponent, NavbarComponent, ServerStartedNotificationComponent, ChallengeSolvedNotificationComponent, WelcomeComponent, RouterOutlet, CommonModule]
})
export class AppComponent {
  private readonly _document = inject<HTMLDocument>(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router)
  private readonly ctcSession = inject(CtcSession)

  showChrome$: Observable<boolean>

  constructor () {
    this.translate.setDefaultLang('en')

    const url$ = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.router.url),
      startWith(this.router.url)
    )

    this.showChrome$ = combineLatest([url$, this.ctcSession.getStatus$()]).pipe(
      map(([url, status]) => {
        // TODO: revisit this logic once CTC has proper auth handling
        // const isCtcRoute = url.startsWith('/ctc')
        // if (!isCtcRoute) return true
        return status === 'authenticated'
      })
    )
  }
}
