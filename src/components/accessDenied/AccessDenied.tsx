type AccessDeniedProps = {
  message?: string;
};

export default function AccessDenied({
  message = "Access denied for guest users."
}: AccessDeniedProps) {
  return (
    <div className="main flex justify-center items-center">
      <h1 className="text-2xl font-bold text-gray-600">{message}</h1>
    </div>
  );
}
