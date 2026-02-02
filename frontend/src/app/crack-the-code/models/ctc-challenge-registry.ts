import {Type} from "@angular/core";
import {CtcUnderConstruction} from "../components/ctc-under-construction/ctc-under-construction";
import {ContactComponent} from "../../contact/contact.component";
import {PhotoWallComponent} from "../../photo-wall/photo-wall.component";

export const CTC_CHALLENGE_REGISTRY: Record<string, Type<any>> = {
  'a7061bc2-e8b9-4e0e-92c8-96441faf85a2': ContactComponent,
  'ab1c0eb2-1cc4-47f1-afb2-4ae9a5eb2b8e': PhotoWallComponent
}

export const CTC_CHALLENGE_FALLBACK = CtcUnderConstruction
