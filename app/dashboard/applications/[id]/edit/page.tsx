import EditApplicationForm from "@/components/forms/EditApplicationForm";
import { getApplication } from "@/lib/getApplication";
import { getUser } from "@/lib/getUser";

interface EditApplicationPageProps {
  params: Promise<{ id: string }>;
}

export default async function Editpage({
  params,
}: EditApplicationPageProps) {
  const user = await getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-rose-100 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-100 bg-rose-50 text-lg">
              🔒
            </div>

            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Unauthorized
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { id } = await params;

  const application = await getApplication(
    id,
    user.userId
  );

  if (!application) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-lg">
              📄
            </div>

            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Application not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The application you're trying to edit could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <EditApplicationForm
          application={JSON.parse(JSON.stringify(application))}
        />
      </div>
    </main>
  );
}