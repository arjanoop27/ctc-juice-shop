import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CtcActiveTheme, CtcApiResponse, CtcHint, CtcMission, CtcSubMissionDetails} from "../../models";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import CtcSubMission from "../../models/ctcSubMission";

@Injectable({
    providedIn: 'root',
})
export class CtcNarrative {
    private readonly http = inject(HttpClient)
    private readonly base = environment.ctcBffServer + '/ctc/api'

    getActiveTheme(): Observable<CtcActiveTheme | null> {
        return this.http
            .get<CtcApiResponse<CtcActiveTheme>>(this.base + '/theme/active')
            .pipe(map(res => (res.ok ? res.data : null)))
    }

    getMissions(): Observable<CtcMission[]> {
        return this.http
            .get<CtcApiResponse<CtcMission[]>>(this.base + '/missions')
            .pipe(map(res => (res.ok && Array.isArray(res.data) ? res.data : [])))
    }

    getSubMissions(missionId: string): Observable<CtcSubMission[]> {
        return this.http
            .get<CtcApiResponse<CtcSubMission[]>>(this.base + `/missions/${missionId}/sub-missions`)
            .pipe(map(res => (res.ok && Array.isArray(res.data) ? res.data : [])))
    }

    getSubMissionDetails(subMissionId: string): Observable<CtcSubMissionDetails | null> {
        return this.http
            .get<CtcApiResponse<CtcSubMissionDetails>>(this.base + `/missions/sub-mission/${subMissionId}/details`)
            .pipe(map(res => (res.ok ? res.data : null)))
    }

    getHintsBySubMissionId(subMissionId: string): Observable<CtcHint[]> {
        return this.http
            .get<CtcApiResponse<CtcHint[]>>(this.base + `/missions/sub-mission/${subMissionId}/hints`)
            .pipe(map(res => (res.ok && Array.isArray(res.data) ? res.data : [])))
    }

    getHintById(id: string): Observable<CtcHint | null> {
        return this.http
            .get<CtcApiResponse<CtcHint>>(this.base + `/missions/sub-mission/hint/${id}`)
            .pipe(map(res => (res.ok ? res.data : null)))
    }

}
