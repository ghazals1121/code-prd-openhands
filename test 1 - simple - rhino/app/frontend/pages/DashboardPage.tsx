import { BaseAuthedPage, Link } from '@rhino-project/ui-heroui';
import { useUser, useBaseOwnerId } from '@rhino-project/core/hooks';

const DashboardPage = () => {
  const user = useUser();
  const owner = String(useBaseOwnerId() ?? '');

  return (
    <BaseAuthedPage>
      <h4>Welcome {user?.name || user?.email}</h4>
      <p className="mt-2">
        <Link href={owner ? `/${owner}/appointment/form` : '#'}>
          Request an appointment
        </Link>
      </p>
      <Link href="/logout">Logout</Link>
    </BaseAuthedPage>
  );
};

export default DashboardPage;
