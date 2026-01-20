import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-ctc-home-vanilla',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  standalone: true,
  templateUrl: './ctc-home-vanilla.html',
  styleUrl: './ctc-home-vanilla.scss',
})
export class CtcHomeVanilla {

}
