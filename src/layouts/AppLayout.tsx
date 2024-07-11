// import { accounts, mails } from "@/app/mail/components/data";
import { accounts } from '@/__mock__/mail/data';
import { ResizeableLayout } from '@/components/layout/ResizeableLayout';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';

const AppLayout = ({ children }) => {
  const token = cookies().get('token');

  const layout = cookies().get('react-resizable-panels:layout');
  const collapsed = cookies().get('react-resizable-panels:collapsed');

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed?.value ? JSON.parse(collapsed.value) : false;

  console.log('token', token);
  console.log('logging');

  return (
    <>
      {/* <Header />
      {children} */}
      {/* <MainLayout>{children}</MainLayout> */}
      <ResizeableLayout
        accounts={accounts}
        // mails={mails}
        defaultLayout={defaultLayout}
        defaultCollapsed={defaultCollapsed}
        navCollapsedSize={4}
      >
        {children}
      </ResizeableLayout>
    </>
  );
};

export default AppLayout;
