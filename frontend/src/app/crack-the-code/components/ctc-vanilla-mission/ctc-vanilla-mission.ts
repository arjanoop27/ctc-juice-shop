import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {CtcChallenge} from "../ctc-challenge/ctc-challenge";

@Component({
    selector: 'app-ctc-vanilla-mission',
    imports: [CommonModule, CtcChallenge],
    standalone: true,
    templateUrl: './ctc-vanilla-mission.html',
    styleUrl: './ctc-vanilla-mission.scss',
})
export class CtcVanillaMission {

}
