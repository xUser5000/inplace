import { FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function Settings() {
  return (
    <>
      <FormLabel>Email</FormLabel>
      <Input type="email" placeholder="email" />
    </>
  );
}
