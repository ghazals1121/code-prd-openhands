import { createFileRoute } from '@tanstack/react-router';
import AppointmentConfirmationPage from '../../../../pages/AppointmentConfirmationPage';

export const Route = createFileRoute('/_authenticated/$owner/appointment/confirmation')({
  component: AppointmentConfirmationPage
});
