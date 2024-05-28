import Tabs, {
  TabContent,
  TabLink,
  TabLinks,
  TabPane,
} from "@/component/ui/Tabs";
import ProfileDraftsContainer from "./posts/ProfileDraftsContainer";

const ProfileTabContainer = () => {
  return (
    <div>
      <Tabs active={"posts"}>
        <TabLinks>
          <TabLink target="posts">All Post</TabLink>
          <TabLink target="drafts">Drafts</TabLink>
        </TabLinks>
        <TabContent>
          <TabPane id="posts">All Posts</TabPane>
          <TabPane id="drafts">
            <ProfileDraftsContainer />
          </TabPane>
        </TabContent>
      </Tabs>
    </div>
  );
};

export default ProfileTabContainer;
