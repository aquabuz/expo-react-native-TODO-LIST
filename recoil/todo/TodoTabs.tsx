import { atom } from 'recoil';

// 활성 탭
export const currentTab = atom({
  key: 'currentTab',
  default: '',
});
