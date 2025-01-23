"use client";

// Shared UI Components
function AuthCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow-xl rounded-xl px-8 py-10 sm:px-10">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
            {title}
          </h2>
          {children}
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Secure authentication powered by Next.js & NextAuth
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthCard;
