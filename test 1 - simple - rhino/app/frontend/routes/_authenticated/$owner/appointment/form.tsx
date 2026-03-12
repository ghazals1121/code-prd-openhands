import { createFileRoute } from '@tanstack/react-router';
import AppointmentRequestFormPage from '../../../../pages/AppointmentRequestFormPage';

export const Route = createFileRoute('/_authenticated/$owner/appointment/form')({
  component: AppointmentRequestFormPage
});
