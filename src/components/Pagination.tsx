interface IPaginationProps {
  current: number;
  total: number | undefined;
  toPage: any;
}

export const Pagination: React.FC<IPaginationProps> = ({ total, current, toPage }) => {
  return total !== 1 ? (
    <div className="my-3 flex justify-center items-center">
      {Array(total)
        .fill(0)
        .map((value, i) => (
          <button
            key={i}
            className={`px-3 py-1 border-2 mr-1 ${current === i + 1 && "border-lime-500"}`}
            onClick={() => toPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
    </div>
  ) : null;
};
