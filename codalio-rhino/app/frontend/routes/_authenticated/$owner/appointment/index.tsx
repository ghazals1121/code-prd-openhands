import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/$owner/appointment/')({
  beforeLoad: ({ params: { owner } }) => {
    throw redirect({ to: '/$owner/appointment/form', params: { owner } });
  }
});
