export const dynamic = 'force-dynamic';
import { auth } from '@/lib/auth'; // سيتم إنشاؤه لاحقاً
import { BalanceCard } from '@/components/balance/balance-card';
import { OrdersList } from '@/components/orders/orders-list';

export default async function DashboardPage() {
  const user = await auth();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">لوحة التحكم</h1>
      <BalanceCard userId={user.id} />
      <OrdersList userId={user.id} />
    </div>
  );
}
