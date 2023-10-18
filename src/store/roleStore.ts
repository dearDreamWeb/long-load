import { action, makeAutoObservable, observable, configure } from 'mobx';
import { TextureCacheObj, PunishEnum } from '@/typings';
import message from '@/components/message/message';
import { MINVIEWDISTANCE } from '@/const';
import * as PIXI from 'pixi.js';

configure({ enforceActions: 'never' });

class RoleStore {
  // 视野距离
  viewDistance = 5;
  // 人物textures
  heroTextures: TextureCacheObj = { left: [], right: [], up: [], down: [] };
  // 人物组帧动画精灵图
  animatedSprite: PIXI.AnimatedSprite | any = {};
  // 人物方向
  direction: keyof TextureCacheObj = 'down';
  // 是否反向
  isReverse = false;
  mainPosition = {
    x: 12,
    y: 24,
  };
  endRect = {
    x: 12,
    y: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  /**新的视野范围 */
  @action
  getNewView(type: 'add' | 'reduce') {
    if (type === 'add') {
      this.viewDistance++;
      return;
    }
    this.viewDistance = Math.max(this.viewDistance - 1, MINVIEWDISTANCE);
  }
}

const roleStore = new RoleStore();

export default roleStore;