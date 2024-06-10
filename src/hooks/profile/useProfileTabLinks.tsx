import ProfileNotificationsContainer from '@/component/profile/ProfileNotificationsContainer';
import ProfileSettingsContainer from '@/component/profile/ProfileSettingsContainer';
import React from 'react';

const useProfileTabLinks = () => {
  const tabLinks = [
    {
      label: 'Settings',
      value: 'settings',
      component: ProfileSettingsContainer,
      enabled: true
    },
    {
      label: 'Notifications',
      value: 'notifications',
      component: ProfileNotificationsContainer,
      enabled: true
    }
  ];
  return { tabLinks };
};

export default useProfileTabLinks;
