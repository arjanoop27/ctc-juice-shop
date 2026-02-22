import {Type} from "@angular/core";
import {CtcUnderConstruction} from "../components/ctc-under-construction/ctc-under-construction";
import {ContactComponent} from "../../contact/contact.component";
import {RegisterComponent} from "../../register/register.component";
import {LoginComponent} from "../../login/login.component";
import {SearchResultComponent} from "../../search-result/search-result.component";

export const CTC_CHALLENGE_REGISTRY: Record<string, Type<any>> = {
  'a7061bc2-e8b9-4e0e-92c8-96441faf85a2': ContactComponent,
  'ecb71aed-f610-4a92-b46a-d7dc085419e2': RegisterComponent,
  '1a8bf2d6-b14c-44fd-9ef2-90df9a75fc38': LoginComponent,
  '7cf42e57-6d0f-49cb-ad28-fd4c4f48fa1f': ContactComponent,
  'a7d6ba0a-5b7e-42e7-a4eb-5157808fc3dc': ContactComponent,
  'e425c981-ea57-43b1-9623-a96884599c7d': SearchResultComponent,
}

export const CTC_CHALLENGE_FALLBACK = CtcUnderConstruction
