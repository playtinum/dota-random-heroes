const ROLE_TYPE = {
  CARRY: 'Carry',
  DISABLER: 'Disabler',
  DURABLE: 'Durable',
  ESCAPE: 'Escape',
  INITIATOR: 'Initiator',
  JUNGLER: 'Jungler',
  NUKER: 'Nuker',
  PUSHER: 'Pusher',
  SUPPORT: 'Support',
} as const;

export type Role = (typeof ROLE_TYPE)[keyof typeof ROLE_TYPE];

export type Hero = {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: 'str' | 'agi' | 'int' | 'all';
  attack_type: 'Melee' | 'Ranged';
  roles: Role[];
  legs: number;
};
