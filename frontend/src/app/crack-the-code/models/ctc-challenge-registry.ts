import {Type} from "@angular/core";
import {CtcUnderConstruction} from "../components/ctc-under-construction/ctc-under-construction";
import {ContactComponent} from "../../contact/contact.component";
import {PhotoWallComponent} from "../../photo-wall/photo-wall.component";

export const CTC_CHALLENGE_REGISTRY: Record<string, Type<any>> = {
    'bf3b45eb-b2be-4ab2-ae10-02ffd1c92995': ContactComponent,
    '5610b29a-6e11-4ce8-b339-e7c3619d6065': PhotoWallComponent
}

export const CTC_CHALLENGE_FALLBACK = CtcUnderConstruction
