export type FieldType = {
  username?: string;
  password?: string;
};

export interface AuthPopupLoginProps {
  setIsAuthActive: (isActive: string) => void;
}
