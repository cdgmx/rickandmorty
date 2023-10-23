export type CharacterCardProps = {
  id: string;
  image: string;
  title: string;
  secondaryText: string;
  description: string;
  gender: string;
  onAction1?: () => void;
  onAction2?: () => void;
};
