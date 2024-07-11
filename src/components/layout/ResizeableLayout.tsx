'use client';
import * as React from 'react';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { AccountSwitcher } from '@/components/ui/account-switcher';
import useNavLinks from '@/config/app/useNavLinks';
import { Nav } from './nav';
import MainHeader from './partials/MainHeader';

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];

  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  children: React.ReactNode;
}

export function ResizeableLayout({
  accounts,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
  children
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const { secondaryNavLinks, primaryNavLinks } = useNavLinks();
  return (
    <>
      <div className="hidden sm:block">
        <TooltipProvider delayDuration={0}>
          <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
              document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
            }}
            style={{
              overflow: 'visible'
            }}
            className="h-full max-h-[800px] items-stretch hidden "
          >
            <ResizablePanel
              defaultSize={defaultLayout[0]}
              collapsedSize={navCollapsedSize}
              collapsible={true}
              minSize={15}
              maxSize={20}
              onCollapse={(collapsed) => {
                setIsCollapsed(collapsed);
                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(collapsed)}`;
              }}
              className={cn(isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out')}
            >
              <div
                className={cn(
                  'flex h-[59px] items-center justify-center px-2'
                  //   isCollapsed ? "h-[52px]" : "px-2"
                )}
              >
                <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} />
              </div>
              <Separator />
              <Nav isCollapsed={isCollapsed} links={primaryNavLinks} />
              <Separator />
              {/* <Nav isCollapsed={isCollapsed} links={secondaryNavLinks} /> */}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel
              defaultSize={defaultLayout[1]}
              minSize={30}
              style={{
                overflow: 'visible'
              }}
            >
              <MainHeader />

              <main className="h-screen">{children}</main>
            </ResizablePanel>
          </ResizablePanelGroup>
        </TooltipProvider>
      </div>
      <div className="sm:hidden">
        <MainHeader />
        <ScrollArea className="h-screen">{children}</ScrollArea>
      </div>
    </>
  );
}
