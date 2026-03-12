/**
 * Shown after a patient successfully submits an appointment request (PRD: confirmation page).
 */
import { BaseAuthedPage, Link } from '@rhino-project/ui-heroui';
import { useParams } from '@tanstack/react-router';
import { Card, CardBody, CardHeader } from '@heroui/react';

const AppointmentConfirmationPage = () => {
  const { owner } = useParams({ strict: false });
  return (
    <BaseAuthedPage>
      <div className="max-w-xl mx-auto py-8 px-4">
        <Card className="border border-success-200 bg-success-50">
          <CardHeader className="px-6 pt-6 pb-0">
            <h1 className="text-2xl font-semibold text-success-700">
              Request submitted
            </h1>
          </CardHeader>
          <CardBody className="px-6 pb-6">
            <p className="text-default-700 mb-4">
              Your appointment request has been received. The clinic will contact you within 24 hours to confirm your appointment.
            </p>
            <Link href={owner ? `/${owner}` : '#'} className="text-primary">
              Back to dashboard
            </Link>
          </CardBody>
        </Card>
      </div>
    </BaseAuthedPage>
  );
};

export default AppointmentConfirmationPage;
