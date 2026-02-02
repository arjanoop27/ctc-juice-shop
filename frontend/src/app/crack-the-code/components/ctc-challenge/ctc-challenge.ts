import {Component, inject, Type} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CtcCurrentSelection} from "../../services/ctc-current-selection/ctc-current-selection";
import {tap} from "rxjs";
import {filter, map} from "rxjs/operators";
import {CTC_CHALLENGE_FALLBACK, CTC_CHALLENGE_REGISTRY, CtcCurrentChallenge} from "../../models";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ctc-challenge',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './ctc-challenge.html',
  styleUrl: './ctc-challenge.scss',
})
export class CtcChallenge {
  private readonly current = inject(CtcCurrentSelection)
  private readonly router = inject(Router)

  currentChallenge$ = this.current.getCurrentChallenge$().pipe(
    tap((current) => {
      if (!current) {
        this.router.navigate(['/ctc/home'])
      }
    }),
    filter((cc): cc is CtcCurrentChallenge => !!cc)
  )

  challengeComponent$ = this.currentChallenge$.pipe(
    map(cc => (CTC_CHALLENGE_REGISTRY[cc.challengeId] ?? CTC_CHALLENGE_FALLBACK) as Type<any>)
  );
}
