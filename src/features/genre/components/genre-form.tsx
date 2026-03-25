import { Category } from "../../../types/category";

type GenreFormProps = {
  genre: any;
  categories: Category[];
  isLoading?: boolean;
  isDisabled?: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const GenreForm = ({
  genre,
  categories,
  isLoading = false,
  isDisabled = false,
  handleSubmit,
  handleChange,
}: GenreFormProps) => {
  return <div>Genre Form</div>;
};
