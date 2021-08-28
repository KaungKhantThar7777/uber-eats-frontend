interface IButtonProps {
  canClick: boolean;
  actionText: string;
  loading: boolean;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  actionText,
  loading,
}) => {
  return (
    <button className={`btn ${canClick ? "btn-primary" : "btn-disabled"}`}>
      {loading ? "Loading..." : actionText}
    </button>
  );
};
