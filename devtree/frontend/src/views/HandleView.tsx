import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserByHandle } from "../api/DevTreeAPI";

export default function HandleViews() {
  const { handle } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-handle", handle],
    queryFn: () => getUserByHandle(handle!),
    enabled: !!handle,
    retry: 1,
  });

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 text-xl">
        Cargando perfil...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 text-xl">
        {(error as Error).message}
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6">
      <h1 className="text-4xl font-black text-slate-800">
        {data.name}
      </h1>

      <p className="text-xl text-slate-500">
        @{data.handle}
      </p>

      {data.bio && (
        <p className="text-lg text-slate-600">
          {data.bio}
        </p>
      )}

      <div className="space-y-4 mt-8">
        {data.links.map((link: any) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="block bg-slate-800 text-white py-3 rounded-lg font-bold hover:bg-slate-700 transition"
          >
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}
