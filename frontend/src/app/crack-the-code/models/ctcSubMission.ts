export default interface CtcSubMission {
    _id: string
    missionId: string
    associatedChallengeId: string
    title: string
    objective?: string
    target?: string
    order: number
    difficulty?: string | number
    image?: string
    status?: 'active' | 'locked' | 'completed' | string
}
