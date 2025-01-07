const Pagination = () => {
  return (
    <div className="flex items-center justify-between p-4 text-gray-500">
      <button
        disabled
        className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        Prev
      </button>
      <div className="flex items-center gap-2">
        <button className="rounded-sm bg-purple-500 px-2 text-white transition-colors duration-300 hover:bg-purple-500">
          1
        </button>
        <button className="rounded-sm bg-zinc-500 px-2 text-white transition-colors duration-300 hover:bg-purple-500">
          2
        </button>
        <button className="rounded-sm bg-zinc-500 px-2 text-white transition-colors duration-300 hover:bg-purple-500">
          3
        </button>
        ...
        <button className="rounded-sm bg-zinc-500 px-2 text-white transition-colors duration-300 hover:bg-purple-500">
          9
        </button>
        <button className="rounded-sm bg-zinc-500 px-2 text-white transition-colors duration-300 hover:bg-purple-500">
          10
        </button>
      </div>
      <button className="rounded-md bg-slate-200 px-4 py-2 text-xs font-semibold transition-colors duration-300 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50">
        Next
      </button>
    </div>
  );
};

export default Pagination;
