export function ZodError({ error }: { error: string[] }) {
  if (!error) return null;
  return error.map((err: string, index: number) => (
    <div key={index} className="text-pink-500 text-xs italic mt-2 -mb-2">
      {err}
    </div>
  ));
}