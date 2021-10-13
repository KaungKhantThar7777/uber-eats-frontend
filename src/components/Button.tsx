interface IButtonProps {
  canClick: boolean;
  actionText: string;
  loading: boolean;
  className?: string;
}

export const Button: React.FC<IButtonProps> = ({ canClick, actionText, loading, className }) => {
  return (
    <button className={`btn ${canClick ? "btn-primary" : "btn-disabled"} ${className}`}>
      {loading ? "Loading..." : actionText}
    </button>
  );
};
