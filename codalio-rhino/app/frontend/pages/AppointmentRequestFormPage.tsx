/**
 * Patient-facing appointment request form per PRD: name, contact number,
 * preferred date/time, and problem description. Submits to backend API.
 */
import { BaseAuthedPage } from '@rhino-project/ui-heroui';
import { useModelCreate } from '@rhino-project/core/hooks';
import { useUser } from '@rhino-project/core/hooks';
import { useNavigate, useParams } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Spinner
} from '@heroui/react';

const TIME_OPTIONS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
];

const AppointmentRequestFormPage = () => {
  const user = useUser();
  const navigate = useNavigate();
  const { owner } = useParams({ strict: false });
  const [name, setName] = useState(user?.name ?? '');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [description, setDescription] = useState('');

  const { mutate: createRequest, isPending, error } = useModelCreate(
    'appointment_request',
    {
      onSuccess: () => {
        navigate({ to: '/$owner/appointment/confirmation', params: { owner: owner ?? '' } });
      }
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    createRequest({
      name,
      phone_number: phoneNumber,
      preferred_date: preferredDate,
      preferred_time: preferredTime,
      description
    });
  };

  const isValid =
    name.trim() &&
    phoneNumber.trim() &&
    preferredDate &&
    preferredTime &&
    description.trim();

  return (
    <BaseAuthedPage>
      <div className="max-w-xl mx-auto py-8 px-4">
        <Card>
          <CardHeader className="flex flex-col gap-1 px-6 pt-6 pb-0">
            <h1 className="text-2xl font-semibold">Request an Appointment</h1>
            <p className="text-default-500 text-sm">
              Fill in your details and preferred time. The clinic will contact you to confirm.
            </p>
          </CardHeader>
          <CardBody className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="Full name"
                placeholder="Your name"
                value={name}
                onValueChange={setName}
                isRequired
                isDisabled={isPending}
              />
              <Input
                label="Contact number"
                placeholder="+1-555-000-0000"
                value={phoneNumber}
                onValueChange={setPhoneNumber}
                isRequired
                isDisabled={isPending}
              />
              <Input
                type="date"
                label="Preferred date"
                value={preferredDate}
                onValueChange={setPreferredDate}
                isRequired
                isDisabled={isPending}
              />
              <select
                className="w-full px-3 py-2 rounded-lg border border-default-200 bg-default-100"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                required
                disabled={isPending}
                aria-label="Preferred time"
              >
                <option value="">Select time</option>
                {TIME_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <Textarea
                label="Describe your reason for the visit"
                placeholder="e.g. Follow-up, new symptoms, routine check-up"
                value={description}
                onValueChange={setDescription}
                minRows={3}
                isRequired
                isDisabled={isPending}
              />
              {error && (
                <p className="text-danger text-sm">
                  {error instanceof Error ? error.message : 'Failed to submit. Please try again.'}
                </p>
              )}
              <Button
                type="submit"
                color="primary"
                isDisabled={!isValid || isPending}
                isLoading={isPending}
              >
                {isPending ? <Spinner size="sm" /> : 'Submit Request'}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </BaseAuthedPage>
  );
};

export default AppointmentRequestFormPage;
