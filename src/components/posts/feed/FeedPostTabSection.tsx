import Tabs, { TabContent, TabLink, TabLinks, TabPane } from '@/components/ui/Tabs';
import FeedPostListCard from './FeedPostListCard';
// import PostsList from './PostsList';

const TabContentSection = ({ options, setOptions, data, followingPosts }) => (
  <Tabs active="feed" className="">
    <TabLinks className="grid grid-cols-2 w-[400px]">
      <TabLink target="feed">For You</TabLink>
      <span onClick={() => setOptions({ ...options, is_following: true })}>
        <TabLink target="is_following">Following</TabLink>
      </span>
    </TabLinks>

    <TabContent>
      <TabPane id="feed">
        <FeedPostListCard posts={data} />
      </TabPane>
      <TabPane id="is_following">
        <FeedPostListCard posts={followingPosts} />
      </TabPane>
    </TabContent>
  </Tabs>
);

export default TabContentSection;
