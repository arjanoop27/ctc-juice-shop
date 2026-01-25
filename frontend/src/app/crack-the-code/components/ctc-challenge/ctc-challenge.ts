import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CtcCurrentSelection} from "../../services/ctc-current-selection/ctc-current-selection";
import {tap} from "rxjs";
import {filter} from "rxjs/operators";
import {CtcCurrentChallenge} from "../../models";

@Component({
    selector: 'app-ctc-challenge',
    imports: [CommonModule],
    standalone: true,
    templateUrl: './ctc-challenge.html',
    styleUrl: './ctc-challenge.scss',
})
export class CtcChallenge {
    private readonly current = inject(CtcCurrentSelection)

    currentChallenge$ = this.current.getCurrentChallenge$().pipe(
        tap((current) => {
            if (current) {
                //TODO: make API call to start the challenge timer
            }
        }),
        filter((cc): cc is CtcCurrentChallenge => !!cc)
    )
}
