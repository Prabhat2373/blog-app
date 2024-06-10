// import { accounts, mails } from "@/app/mail/components/data";
import { accounts } from '@/__mock__/mail/data';
import { ResizeableLayout } from '@/component/layout/ResizeableLayout';
import { cookies } from 'next/headers';

const AppLayout = ({ children }) => {
  const layout = cookies().get('react-resizable-panels:layout');
  const collapsed = cookies().get('react-resizable-panels:collapsed');

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed?.value ? JSON.parse(collapsed.value) : false;
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
