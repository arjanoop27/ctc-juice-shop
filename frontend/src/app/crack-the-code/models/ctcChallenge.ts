export default interface CtcChallenge {
  _id: string;
  name: string;
  description: string
  category: string
  difficulty?: number
  tags: string[]
  solved?: boolean;
}
