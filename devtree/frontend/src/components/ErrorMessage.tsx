type ErrorMessageProps = {
  children: React.ReactNode;
};


export default function ErrorMessage({children}: ErrorMessageProps) {
  return (
    <div className="bg-red-500 text-white p-2 uppercase rounded-lg text-center">{children}</div>
  )
}
