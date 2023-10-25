import { Authority } from "./Authority";

export class UserInfo {
  id: number;
  username: string;
  gamesPlayed: number;
  gamesWon: number;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: Authority[];
  credentialsNonExpired: boolean;
  enabled: boolean;

  constructor(
    id: number,
    username: string,
    gamesPlayed: number,
    gamesWon: number,
    accountNonExpired: boolean,
    accountNonLocked: boolean,
    authorities: Authority[],
    credentialsNonExpired: boolean,
    enabled: boolean
  ) {
    this.id = id;
    this.username = username;
    this.gamesPlayed = gamesPlayed;
    this.gamesWon = gamesWon;
    this.accountNonExpired = accountNonExpired;
    this.accountNonLocked = accountNonLocked;
    this.authorities = authorities;
    this.credentialsNonExpired = credentialsNonExpired;
    this.enabled = enabled;
  }
}
