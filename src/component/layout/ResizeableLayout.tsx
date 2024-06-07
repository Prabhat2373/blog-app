"use client";

import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";
import * as React from "react";

// import { Nav } from "@/app/mail/components/nav";
import Header from "@/component/layout/Header";
// import { AccountSwitcher } from "@/components/ui/account-switcher";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { Nav } from "./nav";
import { AccountSwitcher } from "@/components/ui/account-switcher";
import MainHeader from "./partials/MainHeader";
// import { useMail } from "../use-mail";
// import { AccountSwitcher } from "./account-switcher";
// import { Nav } from "./nav";

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
  children,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <>
      <div className="hidden sm:block">
        <TooltipProvider delayDuration={0}>
          <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
              document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                sizes
              )}`;
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
                document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                  collapsed
                )}`;
              }}
              className={cn(
                isCollapsed &&
                  "min-w-[50px] transition-all duration-300 ease-in-out"
              )}
            >
              <div
                className={cn(
                  "flex h-[59px] items-center justify-center px-2"
                  //   isCollapsed ? "h-[52px]" : "px-2"
                )}
              >
                <AccountSwitcher
                  isCollapsed={isCollapsed}
                  accounts={accounts}
                />
              </div>
              <Separator />
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Inbox",
                    label: "128",
                    icon: Inbox,
                    variant: "default",
                    href: "/",
                  },
                  {
                    title: "Drafts",
                    label: "9",
                    icon: File,
                    variant: "ghost",
                    href: "/",
                  },
                  {
                    title: "Sent",
                    label: "",
                    icon: Send,
                    variant: "ghost",
                    href: "/",
                  },
                  {
                    title: "Junk",
                    label: "23",
                    icon: ArchiveX,
                    variant: "ghost",
                    href: "/",
                  },
                  {
                    title: "Trash",
                    label: "",
                    icon: Trash2,
                    variant: "ghost",
                    href: "/",
                  },
                  {
                    title: "Archive",
                    label: "",
                    icon: Archive,
                    variant: "ghost",
                    href: "/",
                  },
                ]}
              />
              <Separator />
              <Nav
                isCollapsed={isCollapsed}
                links={[
                  {
                    title: "Social",
                    label: "972",
                    icon: Users2,
                    variant: "ghost",
                    href: "/",
                  },
                  {
                    title: "Updates",
                    label: "342",
                    icon: AlertCircle,
                    variant: "ghost",
                    href: "/",
                  },
                  {
                    title: "Forums",
                    label: "128",
                    icon: MessagesSquare,
                    variant: "ghost",
                    href: "/",
                  },
                  {
                    title: "Shopping",
                    label: "8",
                    icon: ShoppingCart,
                    variant: "ghost",
                    href: "/",
                  },
                  {
                    title: "Promotions",
                    label: "21",
                    icon: Archive,
                    variant: "ghost",
                    href: "/",
                  },
                ]}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
              {/* <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs> */}
              {/* <Header /> */}
              <MainHeader />
              <ScrollArea className="h-screen">{children}</ScrollArea>
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
