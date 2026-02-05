import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root',
})
export class CtcNotificationHelper {
    private readonly snackBar = inject(MatSnackBar);

    open(message: string, cssClass?: string) {
        this.snackBar.open(message, 'X', {
            duration: 2500,
            panelClass: [cssClass, 'mat-body']
        })
    }

}
